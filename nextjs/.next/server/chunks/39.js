"use strict";
exports.id = 39;
exports.ids = [39];
exports.modules = {

/***/ 864:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ initializeFirebase)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(745);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401);
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(937);
/* harmony import */ var _moralisweb3_client_firebase_auth_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(583);
/* harmony import */ var _moralisweb3_client_firebase_auth_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_moralisweb3_client_firebase_auth_utils__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_functions__WEBPACK_IMPORTED_MODULE_2__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_functions__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




async function initializeFirebase() {
    const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)({
        apiKey: String("replace_me"),
        authDomain: String("replace_me"),
        projectId: String("replace_me"),
        storageBucket: String("replace_me"),
        messagingSenderId: String("replace_me"),
        appId: String("replace_me")
    });
    const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);
    await auth.setPersistence(firebase_auth__WEBPACK_IMPORTED_MODULE_1__.browserSessionPersistence);
    const functions = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_2__.getFunctions)(app);
    if (window.location.hostname === "localhost") {
        (0,firebase_functions__WEBPACK_IMPORTED_MODULE_2__.connectFunctionsEmulator)(functions, "localhost", 5001);
    }
    const moralisAuth = (0,_moralisweb3_client_firebase_auth_utils__WEBPACK_IMPORTED_MODULE_3__.getMoralisAuth)(app, {
        auth,
        functions
    });
    return {
        app,
        auth,
        functions,
        moralisAuth
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 39:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ FirebaseInitializer),
/* harmony export */   "f": () => (/* binding */ useFirebase)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(864);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Firebase__WEBPACK_IMPORTED_MODULE_2__]);
_Firebase__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const firebaseContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function useFirebase() {
    const firebase = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(firebaseContext);
    if (!firebase) {
        throw new Error("Cannot find Firebase context");
    }
    return firebase;
}
function FirebaseInitializer(props) {
    const [firebase, setFirebase] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleSuccess = setFirebase;
        const handleError = alert;
        (0,_Firebase__WEBPACK_IMPORTED_MODULE_2__/* .initializeFirebase */ .m)().then(handleSuccess, handleError);
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(firebaseContext.Provider, {
        value: firebase,
        children: firebase ? props.initialized() : props.initializing()
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;