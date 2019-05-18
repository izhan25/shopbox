const functions = require('firebase-functions');
const admin = require('firebase-admin');
const env = functions.config();
const algoliasearch = require('algoliasearch');

admin.initializeApp({
    apiKey: "AIzaSyDuLVK2-TD3zf9o0ni2C6fmMifmaLL_p9I",
    authDomain: "shopbox-35ae7.firebaseapp.com",
    databaseURL: "https://shopbox-35ae7.firebaseio.com",
    projectId: "shopbox-35ae7",
    storageBucket: "shopbox-35ae7.appspot.com",
    messagingSenderId: "486576798153"
});

// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('products');

exports.indexProducts = functions.firestore
    .document('products/{productId}')
    .onCreate((snap, context) => {
        const data = snap.data();
        const objectID = snap.id;

        const newProd = {
            objectID,
            productName: data.productName,
            originalPrice: parseInt(data.originalPrice, 10),
            discountPrice: parseInt(data.discountPrice, 10),
            description: data.description,
            category: data.category,
            productImages: data.productImages,
            productStatus: data.productStatus,
            productType: data.productType,
            createdAt: data.createdAt
        }

        // Add the data to the algolia index
        return index.addObject(newProd);
    });

exports.unindexProducts = functions.firestore
    .document('products/{productId}')
    .onDelete((snap, context) => {
        const objectId = snap.id;

        // Delete an ID from the index
        return index.deleteObject(objectId);
    });


// Deletes all products of category
exports.deleteProducts = functions.firestore
    .document('categories/{catID}')
    .onDelete((change, context) => {

        const db = admin.firestore();
        const catId = context.params.catID;

        db.collection('products').where('category.id', '==', catId).get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    db.collection('products').doc(doc.id).delete();
                });
                return catId;
            })
            .catch(error => {
                return error;
            })

    });

// Updates category of products
exports.updateProducts = functions.firestore
    .document('categories/{catID}')
    .onUpdate((change, context) => {

        const db = admin.firestore();
        // const previousValue = change.before.data();
        const newValue = change.after.data();
        const catId = context.params.catID;

        const updatedCategory = {
            id: catId,
            catName: newValue.catName,
            createdAt: newValue.createdAt,
            secured: newValue.secured
        }

        db.collection('products').where('category.id', '==', catId).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('products').doc(doc.id).update({ category: updatedCategory });
                });
                return updatedCategory;
            })
            .catch(error => {
                return error;
            })

    });

