"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Bancos_Bancos_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Bancos/Bancos.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Bancos/Bancos.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Bancos",
  created: function created() {
    this.$store.dispatch("Bancos/readBancos", this.$root);
  },
  data: function data() {
    return {
      bancoDelete: {},
      dialogDelete: false,
      snackbar: false,
      textSnackbar: ""
    };
  },
  methods: {
    editarBanco: function editarBanco(banco) {
      this.$store.dispatch("Bancos/setEditBanco", banco);
      this.$router.push({
        path: "/editar-banco"
      });
    },
    deleteBanco: function deleteBanco(banco) {
      this.bancoDelete = banco;
      this.dialogDelete = true;
    },
    fecharDelete: function fecharDelete() {
      this.dialogDelete = false;
      this.bancoDelete = {};
    },
    deletar: function deletar() {
      var _this = this;

      var data = {
        instance: this.$root,
        data: this.bancoDelete
      };
      this.$store.dispatch("Bancos/deleteBanco", data).then(function (response) {
        if (_this.$store.getters["Banco/getApi"] === "success") {
          _this.dialogDelete = false;
          _this.bancoDelete = {};
          _this.$textSnackbar = "Banco deletado com sucesso";
          _this.snackbar = true;
        } else {
          _this.dialogDelete = false;
          _this.bancoDelete = {};
          _this.textSnackbar = response;
          _this.snackbar = true;
        }
      }, function (error) {
        _this.textSnackbar = error;
        _this.snackbar = true;
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/Pages/Bancos/Bancos.vue":
/*!**********************************************!*\
  !*** ./resources/js/Pages/Bancos/Bancos.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Bancos_vue_vue_type_template_id_f3d5f894_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bancos.vue?vue&type=template&id=f3d5f894&scoped=true& */ "./resources/js/Pages/Bancos/Bancos.vue?vue&type=template&id=f3d5f894&scoped=true&");
/* harmony import */ var _Bancos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bancos.vue?vue&type=script&lang=js& */ "./resources/js/Pages/Bancos/Bancos.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Bancos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Bancos_vue_vue_type_template_id_f3d5f894_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Bancos_vue_vue_type_template_id_f3d5f894_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "f3d5f894",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/Pages/Bancos/Bancos.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/Pages/Bancos/Bancos.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/Pages/Bancos/Bancos.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Bancos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Bancos.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Bancos/Bancos.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Bancos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/Pages/Bancos/Bancos.vue?vue&type=template&id=f3d5f894&scoped=true&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/Pages/Bancos/Bancos.vue?vue&type=template&id=f3d5f894&scoped=true& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Bancos_vue_vue_type_template_id_f3d5f894_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Bancos_vue_vue_type_template_id_f3d5f894_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Bancos_vue_vue_type_template_id_f3d5f894_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Bancos.vue?vue&type=template&id=f3d5f894&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Bancos/Bancos.vue?vue&type=template&id=f3d5f894&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Bancos/Bancos.vue?vue&type=template&id=f3d5f894&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/Pages/Bancos/Bancos.vue?vue&type=template&id=f3d5f894&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-icon",
        {
          staticClass: "floatRight",
          on: {
            click: function($event) {
              return _vm.$router.go(-1)
            }
          }
        },
        [_vm._v("mdi-arrow-left")]
      ),
      _vm._v(" "),
      _c("h1", [_vm._v("Bancos")]),
      _vm._v(" "),
      _c(
        "router-link",
        { attrs: { to: "cadastrar-banco" } },
        [_c("v-btn", { staticClass: "primary" }, [_vm._v("Cadastrar Bancos")])],
        1
      ),
      _vm._v(" "),
      _c("v-simple-table", {
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function() {
              return [
                _c("thead", [
                  _c("tr", [
                    _c("th", { staticClass: "text-left" }, [_vm._v("Nome")]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [_vm._v("Agência")]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [_vm._v("Conta")]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [_vm._v("Saldo")]),
                    _vm._v(" "),
                    _c("th", { staticClass: "text-left" }, [_vm._v("Ações")])
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.$store.getters["Bancos/getBancos"], function(
                    banco,
                    id
                  ) {
                    return _c("tr", { key: id }, [
                      _c("td", [_vm._v(_vm._s(banco.nome))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(banco.agencia))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(banco.conta))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(banco.saldo))]),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c(
                            "v-icon",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.editarBanco(banco)
                                }
                              }
                            },
                            [_vm._v("mdi-pencil")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-icon",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.deleteBanco(banco)
                                }
                              }
                            },
                            [_vm._v("mdi-delete")]
                          )
                        ],
                        1
                      )
                    ])
                  }),
                  0
                )
              ]
            },
            proxy: true
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", "max-width": "550" },
          model: {
            value: _vm.dialogDelete,
            callback: function($$v) {
              _vm.dialogDelete = $$v
            },
            expression: "dialogDelete"
          }
        },
        [
          _c(
            "v-card",
            [
              _c("v-card-title", { staticClass: "text-h5" }, [
                _vm._v(
                  "\n            Deseja realmente deletar o banco " +
                    _vm._s(_vm.bancoDelete.nome) +
                    "?\n            "
                )
              ]),
              _vm._v(" "),
              _c("v-card-text", [
                _vm._v(
                  "\n                Após deletar este banco, todas as transações efetuadas por ele, serão deletadas também!!\n                "
                ),
                _c("br"),
                _vm._v(
                  "\n                Tenha muito cuidado com essa ação!\n            "
                )
              ]),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { color: "blue darken-1", text: "" },
                      on: { click: _vm.fecharDelete }
                    },
                    [_vm._v("\n                    Fechar\n                ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        color: "red darken-1",
                        text: "",
                        loading:
                          _vm.$store.getters["Bancos/getApi"] == "pending"
                      },
                      on: { click: _vm.deletar }
                    },
                    [_vm._v("\n                    Deletar\n                ")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-snackbar",
        {
          attrs: { color: _vm.$store.getters["Bancos/getApi"] },
          scopedSlots: _vm._u([
            {
              key: "action",
              fn: function(ref) {
                var attrs = ref.attrs
                return [
                  _c(
                    "v-btn",
                    _vm._b(
                      {
                        attrs: { color: "white", text: "" },
                        on: {
                          click: function($event) {
                            _vm.snackbar = false
                          }
                        }
                      },
                      "v-btn",
                      attrs,
                      false
                    ),
                    [_vm._v("\n            Fechar\n            ")]
                  )
                ]
              }
            }
          ]),
          model: {
            value: _vm.snackbar,
            callback: function($$v) {
              _vm.snackbar = $$v
            },
            expression: "snackbar"
          }
        },
        [_vm._v("\n        " + _vm._s(_vm.textSnackbar) + "\n\n        ")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);