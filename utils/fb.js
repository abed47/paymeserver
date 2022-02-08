const { getDoc, collection, addDoc, updateDoc, doc } = require('firebase/firestore');
const fbApp = require('./fb_app_init');

exports.getUser = (userId) => {
    return new Promise((resolve, reject) => {
        let d = doc(fbApp, '/users/' + userId);
        getDoc(d).then(res => resolve(res.data())).catch(err => reject(err));
    });
}

exports.updateUser = (userId, data) => {
    return new Promise((resolve, reject) => {
        let d = doc(fbApp, '/users/' + userId);
        updateDoc(d, data).then(res => resolve(res)).catch(err => reject(err));
    })
}

exports.getProduct = (pId) => {
    return new Promise((resolve, reject) => {
        let d = doc(fbApp, '/products/' + pId);
        getDoc(d).then(res => resolve(res.data())).catch(err => reject(err));
    });
}

exports.createTransaction = (tId, data) => {
    return new Promise((resolve, reject) => {
        let col = collection(fbApp,'/transactions');
        addDoc(col, data).then(res => resolve(res.id)).catch(err => reject(err));
    });
};

exports.updateTransaction = (tId, data) => {
    return new Promise((resolve, reject) => {
        let d = doc(fbApp, '/transactions/' + tId);
        updateDoc(d, data).then(res => resolve(true)).catch(err => reject(err));
    });
}

exports.getTransaction = (tId) => {
    return new Promise((resolve, reject) => {
        let d = doc(fbApp, '/transactions/' + tId);
        getDoc(d).then(res => resolve(res.data())).catch(err => reject(err));
    })
}