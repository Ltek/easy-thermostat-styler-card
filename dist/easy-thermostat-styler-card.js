/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt = globalThis, Bt = lt.ShadowRoot && (lt.ShadyCSS === void 0 || lt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Lt = Symbol(), Yt = /* @__PURE__ */ new WeakMap();
let de = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== Lt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Bt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = Yt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Yt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ue = (n) => new de(typeof n == "string" ? n : n + "", void 0, Lt), fe = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((o, i, r) => o + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new de(e, n, Lt);
}, Oe = (n, t) => {
  if (Bt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), i = lt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = e.cssText, n.appendChild(o);
  }
}, Kt = Bt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return ue(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Be, defineProperty: Le, getOwnPropertyDescriptor: Ne, getOwnPropertyNames: Ue, getOwnPropertySymbols: He, getPrototypeOf: De } = Object, vt = globalThis, Xt = vt.trustedTypes, je = Xt ? Xt.emptyScript : "", Ie = vt.reactiveElementPolyfillSupport, J = (n, t) => n, dt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? je : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, Nt = (n, t) => !Be(n, t), Zt = { attribute: !0, type: String, converter: dt, reflect: !1, useDefault: !1, hasChanged: Nt };
Symbol.metadata ??= Symbol("metadata"), vt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let W = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Zt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, e);
      i !== void 0 && Le(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: i, set: r } = Ne(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: i, set(s) {
      const a = i?.call(this);
      r?.call(this, s), this.requestUpdate(t, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(J("elementProperties"))) return;
    const t = De(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(J("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(J("properties"))) {
      const e = this.properties, o = [...Ue(e), ...He(e)];
      for (const i of o) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, i] of e) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const i = this._$Eu(e, o);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const i of o) e.unshift(Kt(i));
    } else t !== void 0 && e.push(Kt(t));
    return e;
  }
  static _$Eu(t, e) {
    const o = e.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const o of e.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Oe(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, o) {
    this._$AK(t, o);
  }
  _$ET(t, e) {
    const o = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, o);
    if (i !== void 0 && o.reflect === !0) {
      const r = (o.converter?.toAttribute !== void 0 ? o.converter : dt).toAttribute(e, o.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = o.getPropertyOptions(i), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : dt;
      this._$Em = i;
      const a = s.fromAttribute(e, r.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, i = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (i === !1 && (r = this[t]), o ??= s.getPropertyOptions(t), !((o.hasChanged ?? Nt)(r, e) || o.useDefault && o.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: i, wrapped: r }, s) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? e ?? this[t]), r !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, r] of o) {
        const { wrapped: s } = r, a = this[i];
        s !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[J("elementProperties")] = /* @__PURE__ */ new Map(), W[J("finalized")] = /* @__PURE__ */ new Map(), Ie?.({ ReactiveElement: W }), (vt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = globalThis, Jt = (n) => n, ut = Ut.trustedTypes, Qt = ut ? ut.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, me = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, ge = "?" + O, Fe = `<${ge}>`, I = document, Q = () => I.createComment(""), tt = (n) => n === null || typeof n != "object" && typeof n != "function", Ht = Array.isArray, qe = (n) => Ht(n) || typeof n?.[Symbol.iterator] == "function", wt = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, te = /-->/g, ee = />/g, U = RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, ie = /"/g, be = /^(?:script|style|textarea|title)$/i, Ve = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), c = Ve(1), L = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ne = /* @__PURE__ */ new WeakMap(), j = I.createTreeWalker(I, 129);
function ve(n, t) {
  if (!Ht(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Qt !== void 0 ? Qt.createHTML(t) : t;
}
const We = (n, t) => {
  const e = n.length - 1, o = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = K;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let h, p, u = -1, m = 0;
    for (; m < l.length && (s.lastIndex = m, p = s.exec(l), p !== null); ) m = s.lastIndex, s === K ? p[1] === "!--" ? s = te : p[1] !== void 0 ? s = ee : p[2] !== void 0 ? (be.test(p[2]) && (i = RegExp("</" + p[2], "g")), s = U) : p[3] !== void 0 && (s = U) : s === U ? p[0] === ">" ? (s = i ?? K, u = -1) : p[1] === void 0 ? u = -2 : (u = s.lastIndex - p[2].length, h = p[1], s = p[3] === void 0 ? U : p[3] === '"' ? ie : oe) : s === ie || s === oe ? s = U : s === te || s === ee ? s = K : (s = U, i = void 0);
    const b = s === U && n[a + 1].startsWith("/>") ? " " : "";
    r += s === K ? l + Fe : u >= 0 ? (o.push(h), l.slice(0, u) + me + l.slice(u) + O + b) : l + O + (u === -2 ? a : b);
  }
  return [ve(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class et {
  constructor({ strings: t, _$litType$: e }, o) {
    let i;
    this.parts = [];
    let r = 0, s = 0;
    const a = t.length - 1, l = this.parts, [h, p] = We(t, e);
    if (this.el = et.createElement(h, o), j.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = j.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(me)) {
          const m = p[s++], b = i.getAttribute(u).split(O), f = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: r, name: f[2], strings: b, ctor: f[1] === "." ? Ye : f[1] === "?" ? Ke : f[1] === "@" ? Xe : _t }), i.removeAttribute(u);
        } else u.startsWith(O) && (l.push({ type: 6, index: r }), i.removeAttribute(u));
        if (be.test(i.tagName)) {
          const u = i.textContent.split(O), m = u.length - 1;
          if (m > 0) {
            i.textContent = ut ? ut.emptyScript : "";
            for (let b = 0; b < m; b++) i.append(u[b], Q()), j.nextNode(), l.push({ type: 2, index: ++r });
            i.append(u[m], Q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ge) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(O, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += O.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const o = I.createElement("template");
    return o.innerHTML = t, o;
  }
}
function Y(n, t, e = n, o) {
  if (t === L) return t;
  let i = o !== void 0 ? e._$Co?.[o] : e._$Cl;
  const r = tt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, o)), o !== void 0 ? (e._$Co ??= [])[o] = i : e._$Cl = i), i !== void 0 && (t = Y(n, i._$AS(n, t.values), i, o)), t;
}
class Ge {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: o } = this._$AD, i = (t?.creationScope ?? I).importNode(e, !0);
    j.currentNode = i;
    let r = j.nextNode(), s = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let h;
        l.type === 2 ? h = new ot(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new Ze(r, this, t)), this._$AV.push(h), l = o[++a];
      }
      s !== l?.index && (r = j.nextNode(), s++);
    }
    return j.currentNode = I, i;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class ot {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, o, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = Y(this, t, e), tt(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== L && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && tt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(I.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = et.createElement(ve(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new Ge(i, this), s = r.u(this.options);
      r.p(e), this.T(s), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ne.get(t.strings);
    return e === void 0 && ne.set(t.strings, e = new et(t)), e;
  }
  k(t) {
    Ht(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, i = 0;
    for (const r of t) i === e.length ? e.push(o = new ot(this.O(Q()), this.O(Q()), this, this.options)) : o = e[i], o._$AI(r), i++;
    i < e.length && (this._$AR(o && o._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const o = Jt(t).nextSibling;
      Jt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class _t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, i, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = d;
  }
  _$AI(t, e = this, o, i) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) t = Y(this, t, e, 0), s = !tt(t) || t !== this._$AH && t !== L, s && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = Y(this, a[o + l], e, l), h === L && (h = this._$AH[l]), s ||= !tt(h) || h !== this._$AH[l], h === d ? t = d : t !== d && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ye extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ke extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Xe extends _t {
  constructor(t, e, o, i, r) {
    super(t, e, o, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Y(this, t, e, 0) ?? d) === L) return;
    const o = this._$AH, i = t === d && o !== d || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, r = t !== d && (o === d || i);
    i && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ze {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Y(this, t);
  }
}
const Je = Ut.litHtmlPolyfillSupport;
Je?.(et, ot), (Ut.litHtmlVersions ??= []).push("3.3.3");
const Qe = (n, t, e) => {
  const o = e?.renderBefore ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    o._$litPart$ = i = new ot(t.insertBefore(Q(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis;
let G = class extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Qe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return L;
  }
};
G._$litElement$ = !0, G.finalized = !0, Dt.litElementHydrateSupport?.({ LitElement: G });
const to = Dt.litElementPolyfillSupport;
to?.({ LitElement: G });
(Dt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const eo = { attribute: !0, type: String, converter: dt, reflect: !1, hasChanged: Nt }, oo = (n = eo, t, e) => {
  const { kind: o, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), o === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), o === "accessor") {
    const { name: s } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, n, a), a;
    } };
  }
  if (o === "setter") {
    const { name: s } = e;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function jt(n) {
  return (t, e) => typeof e == "object" ? oo(n, t, e) : ((o, i, r) => {
    const s = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, o), s ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function E(n) {
  return jt({ ...n, state: !0, attribute: !1 });
}
const _e = "2026.10.24.9", ft = "easy-thermostat-styler-card", St = "easy-thermostat-styler-card-editor", $e = [
  "name",
  "status",
  "current",
  "unit",
  "humidity",
  "pill",
  "wheel_value",
  "wheel_neighbor",
  "bar"
], io = [
  "variant",
  "content",
  "icon_position",
  "radius",
  "height",
  "min_width",
  "gap",
  "icon_size",
  "font_size",
  "font_weight",
  "border_width",
  "background",
  "color",
  "border_color",
  "active_background",
  "active_color",
  "active_border_color"
], g = {
  show_name: !0,
  show_status: !0,
  show_humidity: !0,
  show_pills: !0,
  show_current: !0,
  core_align: "center",
  toggles_zone: "bottom",
  status_position: "above",
  wheel_style: "bubble",
  control: "wheel",
  position: "right",
  scale: 100,
  neighbors: 1,
  nudge: "beside",
  bar: {
    position: "below",
    look: "zones",
    height: 14,
    ticks: 1,
    labels: 5,
    show_current: !0,
    flags: !0,
    handle_shape: "round"
  },
  reveal: "always",
  reveal_from: "both",
  collapsed: "visual",
  open_in: "place",
  hide_after: 8
}, we = [
  { type: "hvac" },
  { type: "preset", display: "toggle" },
  { type: "fan_mode", display: "toggle" }
], B = (n) => !!n && typeof n == "object" && !Array.isArray(n);
function mt(n) {
  if (!(n == null || n === "")) {
    if (typeof n == "number") return Number.isFinite(n) ? n : void 0;
    if (Array.isArray(n)) {
      const t = n.map(mt).filter((e) => e !== void 0);
      return t.length ? t : void 0;
    }
    if (B(n)) {
      const t = {};
      for (const [e, o] of Object.entries(n)) {
        const i = mt(o);
        i !== void 0 && (t[e] = i);
      }
      return Object.keys(t).length ? t : void 0;
    }
    return n;
  }
}
const H = (n, t, e) => {
  const o = typeof n == "number" ? n : typeof n == "string" && n.trim() ? Number(n) : NaN;
  return Number.isFinite(o) ? Math.min(e, Math.max(t, o)) : void 0;
};
function no(n) {
  if (!B(n) || typeof n.type != "string") return;
  const t = { ...n };
  return "columns" in t && (t.columns = H(t.columns, 0, 12) || void 0), Array.isArray(t.chips) && (t.chips = t.chips.filter((e) => B(e) && typeof e.entity == "string" && e.entity)), t;
}
function At(n) {
  if (!B(n)) throw new Error("Invalid configuration");
  const t = { ...n };
  if (typeof t.entity != "string" || !t.entity)
    throw new Error("Easy Thermostat Styler Card: set an entity (a climate.* entity).");
  const e = B(t.setpoint) ? { ...t.setpoint } : void 0;
  if (e && ("scale" in e && (e.scale = H(e.scale, 40, 250)), "neighbors" in e && (e.neighbors = H(e.neighbors, 0, 3)), "min_gap" in e && (e.min_gap = H(e.min_gap, 0, 20)), "hide_after" in e && (e.hide_after = H(e.hide_after, 0, 300)), t.setpoint = e), B(t.effects)) {
    const o = { ...t.effects };
    "size" in o && (o.size = H(o.size, 2, 60)), "speed" in o && (o.speed = H(o.speed, 0.6, 8)), t.effects = o;
  }
  return Array.isArray(t.sets) && (t.sets = t.sets.map(no).filter(Boolean), t.sets.length === 0) ? { ...mt({ ...t, sets: void 0 }), sets: [] } : mt(t);
}
function ro(n, t) {
  return t.split(".").reduce((e, o) => B(e) || Array.isArray(e) ? e[o] : void 0, n);
}
function q(n, t, e) {
  const o = t.split("."), i = (r, s) => {
    const a = Array.isArray(r) ? [...r] : B(r) ? { ...r } : {}, l = o[s];
    if (s === o.length - 1)
      e === void 0 || e === "" || e === null ? Array.isArray(a) ? a.splice(Number(l), 1) : delete a[l] : a[l] = e;
    else {
      const h = i(a[l], s + 1);
      h === void 0 ? delete a[l] : a[l] = h;
    }
    if (!(!Array.isArray(a) && Object.keys(a).length === 0))
      return a;
  };
  return i(n, 0) ?? {};
}
const ct = {
  hvac: "Mode",
  preset: "Preset",
  fan_mode: "Fan",
  chips: "Devices"
}, so = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, xe = {
  hvac: { list: "hvac_modes", active: null },
  preset: { list: "preset_modes", active: "preset_mode" },
  fan_mode: { list: "fan_modes", active: "fan_mode" }
}, It = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  // presets
  none: "mdi:circle-off-outline",
  home: "mdi:home",
  away: "mdi:home-export-outline",
  sleep: "mdi:power-sleep",
  eco: "mdi:leaf",
  boost: "mdi:rocket-launch",
  comfort: "mdi:sofa",
  activity: "mdi:run",
  vacation: "mdi:airplane",
  // fan modes
  on: "mdi:fan",
  low: "mdi:fan-speed-1",
  medium: "mdi:fan-speed-2",
  middle: "mdi:fan-speed-2",
  high: "mdi:fan-speed-3",
  circulate: "mdi:autorenew",
  diffuse: "mdi:weather-windy",
  focus: "mdi:target"
}, re = {
  heat_cool: "Heat/Cool",
  fan_only: "Fan only",
  off: "Off"
}, ao = {
  heat: "var(--state-climate-heat-color, #ff8100)",
  cool: "var(--state-climate-cool-color, #2b9af9)",
  heat_cool: "var(--state-climate-heat-cool-color, #ffa600)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan-only-color, #009688)",
  off: "var(--state-climate-off-color, #8a8a8a)"
}, se = "var(--primary-color, #03a9f4)";
function Et(n) {
  if (re[n]) return re[n];
  const t = n.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function lo(n, t, e, o) {
  const i = n;
  try {
    if (e === "hvac" && i.formatEntityState) return i.formatEntityState(t, o);
    if (e !== "hvac" && e !== "chips" && i.formatEntityAttributeValue) {
      const r = e === "preset" ? "preset_mode" : "fan_mode", s = i.formatEntityAttributeValue(t, r, o);
      if (s) return s;
    }
  } catch {
  }
  return Et(o);
}
function co(n) {
  return Array.isArray(n.sets) ? n.sets : we;
}
function zt(n, t) {
  if (!n || t === "chips") return [];
  const e = n.attributes[xe[t].list];
  return Array.isArray(e) ? e.map(String) : [];
}
function ye(n, t) {
  if (!t?.length) return n;
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const i of t) n.includes(i) && !e.has(i) && (o.push(i), e.add(i));
  for (const i of n) e.has(i) || o.push(i);
  return o;
}
function ho(n, t) {
  const e = n.states[t.entity], o = [];
  return co(t).forEach((i, r) => {
    if (i.hidden) return;
    const s = i.type;
    let a = [];
    if (s !== "chips") {
      if (!e) return;
      const l = zt(e, s);
      if (!l.length) return;
      const h = xe[s].active, p = h ? String(e.attributes[h] ?? "") : e.state;
      if (a = ye(l, i.order).filter((u) => !i.options?.[u]?.hide).map((u) => {
        const m = i.options?.[u];
        return {
          value: u,
          label: m?.name ?? lo(n, e, s, u),
          icon: m?.icon ?? It[u.toLowerCase()] ?? "mdi:circle-medium",
          active: u === p,
          color: s === "hvac" ? ao[u] ?? se : se
        };
      }), !a.length) return;
    } else if (!i.chips?.length) return;
    o.push({
      key: `${s}-${r}`,
      index: r,
      type: s,
      title: i.name ?? ct[s],
      zone: i.zone ?? (t.toggles_zone || "bottom"),
      orientation: i.orientation ?? (i.zone === "left" || i.zone === "right" ? "column" : "row"),
      columns: i.columns ?? 0,
      align: i.align ?? (s === "chips" ? "center" : "stretch"),
      // Compact turns full-time sets into toggles; menus are already compact.
      display: i.display === "menu" && s !== "chips" ? "menu" : t.compact ? "toggle" : i.display ?? "always",
      menuDirection: i.menu_direction ?? Ct(i.zone ?? (t.toggles_zone || "bottom")),
      menuShowName: i.menu_show_name ?? !0,
      toggleIcon: i.toggle_icon ?? so[s],
      options: a,
      config: i
    });
  }), o;
}
function Ct(n) {
  return n === "bottom" ? "up" : n === "left" ? "right" : n === "right" ? "left" : "down";
}
function ae(n, t, e) {
  switch (n) {
    case "hvac":
      return { domain: "climate", service: "set_hvac_mode", data: { entity_id: t, hvac_mode: e } };
    case "preset":
      return { domain: "climate", service: "set_preset_mode", data: { entity_id: t, preset_mode: e } };
    case "fan_mode":
      return { domain: "climate", service: "set_fan_mode", data: { entity_id: t, fan_mode: e } };
    default:
      return null;
  }
}
const ke = {
  variant: "tonal",
  content: "icon_label",
  icon_position: "top",
  radius: 14,
  gap: 8,
  icon_size: 22,
  font_size: 13,
  font_weight: 500,
  border_width: 0
};
function Tt(n, t) {
  const e = { ...ke };
  for (const o of [n, t])
    if (o)
      for (const i of io) {
        const r = o[i];
        r !== void 0 && r !== "" && r !== null && (e[i] = r);
      }
  return e;
}
const Z = (n) => n ? `${n}px` : void 0;
function le(n) {
  const t = {
    "--etc-b-radius": n.radius !== void 0 ? `${n.radius}px` : void 0,
    "--etc-b-height": Z(n.height),
    "--etc-b-minw": Z(n.min_width),
    "--etc-b-gap": n.gap !== void 0 ? `${n.gap}px` : void 0,
    "--etc-b-icon": Z(n.icon_size),
    "--etc-b-fs": Z(n.font_size),
    "--etc-b-fw": n.font_weight ? String(n.font_weight) : void 0,
    "--etc-b-bw": n.border_width !== void 0 ? `${n.border_width}px` : void 0,
    "--etc-b-bg": n.background,
    "--etc-b-fg": n.color,
    "--etc-b-bc": n.border_color,
    "--etc-b-abg": n.active_background,
    "--etc-b-afg": n.active_color,
    "--etc-b-abc": n.active_border_color
  };
  return Ft(t);
}
const po = {
  name: "name",
  status: "status",
  current: "cur",
  unit: "unit",
  humidity: "hum",
  pill: "pill",
  wheel_value: "wv",
  wheel_neighbor: "wn",
  bar: "bar"
};
function uo(n) {
  const t = {};
  for (const e of $e) {
    const o = n?.[e];
    if (!o) continue;
    const i = `--etc-t-${po[e]}`;
    t[`${i}-fs`] = Z(o.size), t[`${i}-fw`] = o.weight ? String(o.weight) : void 0, t[`${i}-c`] = o.color, t[`${i}-tt`] = o.transform, t[`${i}-ls`] = o.letter_spacing !== void 0 ? `${o.letter_spacing / 100}em` : void 0, t[`${i}-fst`] = o.italic === void 0 ? void 0 : o.italic ? "italic" : "normal", t[`${i}-op`] = o.opacity !== void 0 ? String(o.opacity / 100) : void 0;
  }
  return Ft(t);
}
function fo(n) {
  const t = n.card ?? {}, e = n.setpoint ?? {};
  return Ft({
    "--etc-card-bg": t.background,
    "--etc-card-bc": t.border_color,
    "--etc-card-bw": t.border_width !== void 0 ? `${t.border_width}px` : void 0,
    "--etc-card-r": t.radius !== void 0 ? `${t.radius}px` : void 0,
    "--etc-card-pad": t.padding !== void 0 ? `${t.padding}px` : void 0,
    "--etc-scale": e.scale !== void 0 ? String(e.scale / 100) : void 0
  });
}
function Ft(n) {
  const t = {};
  for (const [e, o] of Object.entries(n)) o !== void 0 && o !== "" && (t[e] = o);
  return t;
}
const mo = `
        .etce {
          /* Font sizes (by role, not by pixel) */
          --ltek-fs-panel-title: 16px;  /* top-level panel / section title */
          --ltek-fs-header: 15px;       /* editor header, panel summary */
          --ltek-fs-group: 14px;        /* group heading inside a panel */
          --ltek-fs-label: 13px;        /* standard field label / row */
          --ltek-fs-body: 12px;         /* body text, most controls */
          --ltek-fs-small: 11px;        /* hints, secondary text */
          --ltek-fs-tiny: 10px;         /* badges, micro-labels */
          /* Font weights */
          --ltek-fw-normal: 400;        /* control labels (recede) */
          --ltek-fw-medium: 500;
          --ltek-fw-semibold: 600;
          --ltek-fw-bold: 700;          /* titles, values (lead) */
          /* Text colors */
          --ltek-c-text: var(--primary-text-color, #e1e1e1);  /* primary */
          --ltek-c-label: #ccc;         /* control labels */
          --ltek-c-muted: #888;         /* hints / disabled */
          --ltek-c-accent: var(--primary-color, #2196F3);
          /* Accent tints — hover / active fills (kept as rgba literals; one place
             to change). Default to the Material blue the cards shipped with. */
          --ltek-c-accent-fade: rgba(var(--rgb-primary-color,33,150,243),0.12);       /* active / pressed fill */
          --ltek-c-accent-fade-soft: rgba(var(--rgb-primary-color,33,150,243),0.08);  /* hover fill */
          --ltek-c-error-fade: rgba(244,67,54,0.15);         /* delete hover fill */
          /* Status colors — defer to the user's theme, fall back to Material. */
          --ltek-c-error: var(--error-color, #f44336);
          --ltek-c-success: var(--success-color, #4caf50);
          --ltek-c-warning: var(--warning-color, #ffb300);
          --ltek-c-info: var(--info-color, #2196F3);
          /* Second accent: the green "library / shared" grouping (distinct from
             the blue layout accent on purpose — NOT tied to --primary-color). */
          --ltek-c-accent-lib: #7fd18a;
          --ltek-c-on-accent: #fff;   /* text/icon on a solid accent fill */
          /* Action icons (edit/copy/hide/etc): neutral idle → brighten on hover.
             Delete stays a status color (error) on its own hover. */
          --ltek-c-icon: #aaa;        /* idle action icon */
          --ltek-c-icon-hover: #fff;  /* hovered action icon */
          /* Surfaces */
          --ltek-c-surface: rgba(255,255,255,0.015);        /* panels */
          --ltek-c-surface-raised: rgba(255,255,255,0.02);  /* cards / rows */
          /* Borders */
          --ltek-c-panel-border: #3a3a3a;   /* panels */
          --ltek-c-border: #444;            /* controls */
          --ltek-c-border-soft: #333;       /* subtle inner dividers */
          /* Radii */
          --ltek-r-panel: 12px;   /* panels */
          --ltek-r-card: 10px;    /* section cards */
          --ltek-r-md: 8px;       /* blocks */
          --ltek-r-ctrl: 6px;     /* inputs, selects, buttons */
          /* Spacing scale (4px base) */
          --ltek-sp-1: 4px;
          --ltek-sp-2: 6px;
          --ltek-sp-3: 8px;
          --ltek-sp-4: 10px;
          --ltek-sp-5: 12px;
          --ltek-sp-6: 16px;
          /* Control padding — uniform input/select/button height. */
          --ltek-ctrl-pad: 6px 10px;
          /* Icon sizes (two clear roles; one-off glyphs stay literal). */
          --ltek-icon-sm: 16px;   /* inline / action icons */
          --ltek-icon-lg: 20px;   /* panel-title icons */
          /* Slider row geometry (shared by every slider) */
          --ltek-slider-val-w: 44px;   /* value readout column width */
          display: flex; flex-direction: column; gap: 8px; font-family: var(--paper-font-body1_-_font-family, sans-serif);
        }
        .etce ha-icon { --mdc-icon-size: 18px; vertical-align: middle; }
        .etce-sec { border: 1px solid var(--ltek-c-panel-border); border-radius: var(--ltek-r-panel); background: var(--ltek-c-surface); overflow: hidden; }
        .etce-sec[open] { border-color: var(--ltek-c-accent); }
        .etce-sec > summary { display: flex; align-items: center; gap: var(--ltek-sp-3); padding: 14px 16px; cursor: pointer; user-select: none;
          list-style: none; font-size: var(--ltek-fs-panel-title); font-weight: var(--ltek-fw-bold); color: var(--ltek-c-text); }
        .etce-sec > summary::-webkit-details-marker, .etce-sub > summary::-webkit-details-marker { display: none; }
        .etce-sec > summary > ha-icon:not(.chev) { color: var(--ltek-c-accent); --mdc-icon-size: var(--ltek-icon-lg); }
        .etce-sec > summary .chev, .etce-sub > summary .chev { margin-left: auto; color: #999; --mdc-icon-size: 20px; transition: transform .2s ease; transform: rotate(-90deg); }
        .etce-sec[open] > summary .chev, .etce-sub[open] > summary .chev { transform: none; }
        .etce-body { padding: 0 16px 16px; }
        .etce-hint { color: var(--ltek-c-muted); font-size: var(--ltek-fs-small); margin: 0 0 var(--ltek-sp-3); }
        .etce-group { color: var(--accent-color, var(--ltek-c-accent)); font-size: var(--ltek-fs-group); font-weight: var(--ltek-fw-semibold);
          margin-top: var(--ltek-sp-4); padding-top: var(--ltek-sp-3); border-top: 1px solid var(--ltek-c-border-soft); }
        .etce-group.first { margin-top: 0; padding-top: 0; border-top: none; }
        .etce-sub { border-top: 1px solid var(--ltek-c-border-soft); border-radius: var(--ltek-r-ctrl); }
        .etce-sub + .etce-sub { margin-top: 0; }
        .etce-sub[open] { border: 1px solid var(--accent-color, var(--ltek-c-accent)); margin: var(--ltek-sp-1) 0; }
        .etce-sub > summary { display: flex; align-items: center; gap: var(--ltek-sp-2); padding: var(--ltek-sp-3) var(--ltek-sp-2); cursor: pointer;
          list-style: none; color: var(--ltek-c-accent); font-size: var(--ltek-fs-label); font-weight: var(--ltek-fw-semibold);
          text-transform: uppercase; letter-spacing: 0.04em; }
        .etce-sub-body { padding: 0 var(--ltek-sp-4) var(--ltek-sp-4); }
        .etce-row { display: flex; align-items: center; gap: var(--ltek-sp-4); padding: var(--ltek-sp-1) 0; flex-wrap: wrap; justify-content: flex-start; }
        .etce-row label.lbl { color: var(--ltek-c-label); font-size: var(--ltek-fs-body); font-weight: var(--ltek-fw-normal); flex: none; }
        .etce-row input[type="text"], .etce-row select { flex: 1 1 auto; min-width: 0; padding: var(--ltek-ctrl-pad);
          background: var(--secondary-background-color, #2a2a2a); border: 1px solid var(--ltek-c-border); border-radius: var(--ltek-r-ctrl);
          color: var(--ltek-c-text); font-size: var(--ltek-fs-body); }
        .etce-row input[type="range"] { flex: 1 1 auto; min-width: 100px; accent-color: var(--ltek-c-accent); cursor: pointer; }
        .etce-val { flex: 0 0 var(--ltek-slider-val-w); text-align: right; font-weight: var(--ltek-fw-bold); font-variant-numeric: tabular-nums;
          white-space: nowrap; color: var(--ltek-c-text); font-size: var(--ltek-fs-body); }
        .etce-nowrap { flex-wrap: nowrap; }
        .etce-check { display: flex; align-items: center; gap: var(--ltek-sp-2); padding: var(--ltek-sp-1) 0; color: var(--ltek-c-label);
          font-size: var(--ltek-fs-body); cursor: pointer; }
        .etce-check input { accent-color: var(--ltek-c-accent); }
        .etce-slist { display: flex; flex-direction: column; gap: var(--ltek-sp-2); margin-bottom: var(--ltek-sp-3); }
        .etce-srow { display: flex; align-items: center; gap: var(--ltek-sp-2); padding: 6px 8px; border-radius: var(--ltek-r-card);
          background: var(--ltek-c-surface-raised); border: 1px solid var(--ltek-c-border-soft); }
        .etce-srow.off .etce-sname, .etce-srow.off .etce-sicon { opacity: .45; }
        .etce-sicon { flex: 0 0 auto; color: var(--ltek-c-accent); --mdc-icon-size: 20px; }
        .etce-sname { flex: 1 1 auto; min-width: 0; color: var(--ltek-c-text); font-size: var(--ltek-fs-label); font-weight: var(--ltek-fw-normal);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .etce-sctl { display: flex; gap: var(--ltek-sp-3); flex: 0 1 auto; flex-wrap: wrap; justify-content: flex-end; }
        .etce-open-gap { flex: 0 0 52px; }
        .etce-act { border: none; background: none; padding: 0; color: var(--ltek-c-icon); cursor: pointer; display: flex; }
        .etce-act:hover:not([disabled]) { color: var(--ltek-c-icon-hover); }
        .etce-act[disabled] { opacity: .25; cursor: default; }
        .etce-act ha-icon { --mdc-icon-size: var(--ltek-icon-sm); }
        .etce-eye.off { color: var(--ltek-c-muted); }
        .etce-eye.lbl { gap: var(--ltek-sp-1); align-items: center; font-size: var(--ltek-fs-small); color: var(--ltek-c-label); }
        .etce-eye.lbl.off { color: var(--ltek-c-muted); }
        .etce-eye.lbl.off span { text-decoration: line-through; }
        .etce-blist { display: flex; flex-direction: column; }
        .etce-brow { display: flex; align-items: center; gap: var(--ltek-sp-2); padding: var(--ltek-sp-1); border-top: 1px solid var(--ltek-c-border-soft); }
        .etce-brow:first-child { border-top: none; }
        .etce-brow.off .etce-sname { color: var(--ltek-c-muted); }
        .etce-act.on { color: var(--ltek-c-accent); }
        .etce-warn { color: var(--warning-color, #ff9800); }
        .etce-stag { flex: 0 0 auto; font-size: var(--ltek-fs-small); color: var(--ltek-c-muted); white-space: nowrap; }
        .etce-sedit { margin: calc(-1 * var(--ltek-sp-1)) 0 var(--ltek-sp-1) 28px; padding: var(--ltek-sp-2) var(--ltek-sp-3);
          border: 1px solid var(--ltek-c-accent); border-radius: var(--ltek-r-card); background: var(--ltek-c-surface); }
        .etce-preset { padding: 3px 8px; border: 1px solid var(--ltek-c-border); border-radius: var(--ltek-r-ctrl); background: transparent;
          color: var(--ltek-c-text); font-size: var(--ltek-fs-small); cursor: pointer; }
        .etce-preset:hover { border-color: var(--ltek-c-accent); background: var(--ltek-c-accent-fade-soft); }
        .etce-checks { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 0 var(--ltek-sp-4); }
        .etce-color { display: flex; flex: 1 1 auto; gap: var(--ltek-sp-2); flex-wrap: wrap; min-width: 0; }
        .etce-color select.etce-cmode { flex: 0 0 auto; min-width: 120px; }
        .etce-color input[type="color"] { flex: 0 0 auto; width: 44px; height: 30px; padding: 0; border: none; background: none; cursor: pointer; }
        .etce-reset { border: none; background: none; padding: 0; color: var(--ltek-c-icon); cursor: pointer; }
        .etce-reset:hover { color: var(--ltek-c-icon-hover); }
        .etce-reset ha-icon { --mdc-icon-size: var(--ltek-icon-sm); }
        .etce-foot { color: var(--ltek-c-muted); font-size: var(--ltek-fs-tiny); text-align: right; }

        .etce-addbar { display: flex; flex-wrap: wrap; gap: var(--ltek-sp-2); margin-bottom: var(--ltek-sp-3); }
        .etce-add { padding: 4px 10px; border: 1px dashed var(--ltek-c-accent); border-radius: var(--ltek-r-ctrl); background: transparent;
          color: var(--ltek-c-accent); font-size: var(--ltek-fs-small); cursor: pointer; }
        .etce-add:hover { background: var(--ltek-c-accent-fade-soft); }
        .etce-act.del:hover:not([disabled]) { color: var(--ltek-c-error); }
        .etce-srow.open { border-color: var(--ltek-c-accent); }
        .etce-srow .etce-sname { cursor: pointer; }
        .etce-row ha-selector { flex: 1 1 auto; min-width: 0; display: block; }
        .etce-row input[type="number"] { width: 80px; padding: var(--ltek-ctrl-pad); background: var(--secondary-background-color, #2a2a2a);
          border: 1px solid var(--ltek-c-border); border-radius: var(--ltek-r-ctrl); color: var(--ltek-c-text); }
        .etce-stops { display: flex; gap: var(--ltek-sp-2); align-items: center; flex-wrap: wrap; }
        .etce-stops input[type="color"] { width: 44px; height: 30px; padding: 0; border: none; background: none; cursor: pointer; }
        .etce-full { width: 100%; }
        .etce-tpl { align-items: flex-start; padding: var(--ltek-sp-3) var(--ltek-sp-1); }
        .etce-tpl-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .etce-tpl-hint { color: var(--ltek-c-muted); font-size: var(--ltek-fs-small); }
        .etce-tpl-tags { display: flex; flex-wrap: wrap; gap: var(--ltek-sp-1); margin-top: 2px; }
        .etce-tpl-tags span { font-size: var(--ltek-fs-tiny); color: var(--ltek-c-label); border: 1px solid var(--ltek-c-border); border-radius: 999px; padding: 0 6px; }
        .etce-tpl .etce-preset { flex: none; align-self: center; }
`;
function S(n) {
  if (typeof n == "number") return Number.isFinite(n) ? n : null;
  if (typeof n == "string" && n.trim() !== "") {
    const t = Number(n);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
const Mt = /* @__PURE__ */ new Set(["unavailable", "unknown", "none", ""]);
function Se(n) {
  switch (n) {
    case "heat":
    case "cool":
    case "heat_cool":
    case "dry":
    case "fan_only":
    case "off":
      return n;
    case "auto":
      return "heat_cool";
    default:
      return "unknown";
  }
}
function go(n) {
  switch (n) {
    case "heating":
    case "preheating":
      return "heating";
    case "cooling":
      return "cooling";
    case "drying":
      return "drying";
    case "fan":
      return "fan";
    case "idle":
      return "idle";
    case "off":
      return "off";
    default:
      return null;
  }
}
function bo(n, t, e) {
  return n === "off" ? "off" : t === null || e === null ? null : e.heat !== null && (n === "heat" || n === "heat_cool") && t < e.heat ? "heating" : e.cool !== null && (n === "cool" || n === "heat_cool") && t > e.cool ? "cooling" : n === "heat" || n === "cool" || n === "heat_cool" ? "idle" : null;
}
function vo(n, t) {
  if (n === "heat_cool") {
    const o = S(t.target_temp_low), i = S(t.target_temp_high);
    if (o !== null || i !== null) return { heat: o, cool: i };
    const r = S(t.temperature);
    return r === null ? null : { heat: r, cool: null };
  }
  const e = S(t.temperature);
  return e === null ? null : n === "heat" ? { heat: e, cool: null } : n === "cool" ? { heat: null, cool: e } : null;
}
function _o(n, t) {
  const e = n.states[t.entity], o = n.config?.unit_system?.temperature ?? "°", i = e?.attributes.friendly_name, r = t.name ?? (typeof i == "string" ? i : t.entity);
  if (!e || Mt.has(e.state))
    return {
      available: !1,
      name: r,
      currentTemp: null,
      unit: o,
      humidity: null,
      equipment: null,
      mode: "unknown",
      state: e?.state ?? "unavailable",
      setpoints: null
    };
  const s = e.attributes, a = Se(e.state), l = S(s.current_temperature), h = vo(a, s);
  return {
    available: !0,
    name: r,
    currentTemp: l,
    unit: o,
    humidity: S(s.current_humidity),
    equipment: go(s.hvac_action) ?? bo(a, l, h),
    mode: a,
    state: e.state,
    setpoints: h
  };
}
function C(n, t) {
  if (n === null) return "–";
  const e = t.includes("C"), o = e ? Math.round(n * 2) / 2 : Math.round(n);
  return e && !Number.isInteger(o) ? o.toFixed(1) : String(o);
}
const $o = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan",
  idle: "Idle",
  off: "Off"
}, wo = "esphome_rf_fan", xo = "custom:rf-fan-ltek";
function Ae(n, t) {
  const e = n.entities, o = e?.[t]?.device_id;
  return !e || !o ? [] : Object.values(e).filter((i) => i.device_id === o && i.entity_id !== t).map((i) => i.entity_id);
}
function yo(n, t) {
  const e = Ae(n, t).filter((i) => i.startsWith("light.")), o = n.entities ?? {};
  return e.find((i) => o[i]?.platform === wo) ?? e[0] ?? null;
}
function ko(n, t) {
  const e = n.entities ?? {}, o = Ae(n, t).filter((i) => i.startsWith("sensor."));
  return o.find((i) => e[i]?.translation_key === "sleep_timer") ?? o.find((i) => n.states[i]?.attributes.device_class === "timestamp") ?? null;
}
function So(n, t) {
  const e = n?.attributes.friendly_name;
  return typeof e == "string" ? e : t;
}
function Ao(n, t) {
  const e = n.split(".")[0], i = {
    fan: ["mdi:fan", "mdi:fan-off"],
    light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
    switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
    binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
    sensor: ["mdi:eye", "mdi:eye"]
  }[e ?? ""] ?? ["mdi:circle", "mdi:circle-outline"];
  return t ? i[0] : i[1];
}
function Rt(n, t, e) {
  const o = n.states[t.entity], i = !!o && !Mt.has(o.state), r = i && !["off", "idle", "closed", "standby"].includes(o.state), s = {
    index: e,
    type: t.type,
    entity: t.entity,
    name: t.name ?? So(o, t.entity),
    icon: t.icon ?? (typeof o?.attributes.icon == "string" ? o.attributes.icon : Ao(t.entity, r)),
    on: r,
    available: i,
    state: i ? To(n, o) : "Unavailable",
    speed: null,
    speedCount: null,
    naturalLevel: null,
    naturalLevels: 0,
    percentage: null,
    direction: null,
    natural: !1,
    lightEntity: null,
    lightOn: !1,
    timerEnds: null,
    spin: null,
    tap: t.tap ?? (t.type === "rf_fan" ? "popup" : "more-info"),
    hold: t.hold ?? (t.type === "rf_fan" ? "toggle" : "none"),
    config: t
  };
  if (t.type !== "rf_fan" || !o) return s;
  const a = o.attributes, l = S(a.percentage), h = Eo(a), p = r && l !== null && h ? Math.max(1, Math.min(h, Math.round(l * h / 100))) : null, u = yo(n, t.entity), m = ko(n, t.entity), b = m ? n.states[m]?.state : void 0, f = b && !Mt.has(b) ? new Date(b) : null, v = typeof a.preset_mode == "string" ? a.preset_mode : "", $ = r && !!v && v !== "normal", x = $ ? ce(v) : null, w = Array.isArray(a.preset_modes) ? a.preset_modes.filter((_) => ce(String(_)) !== null).length : 0, M = t.speed_format ?? "number", z = p === null ? "On" : M === "fraction" && h ? `${p}/${h}` : M === "percent" && l !== null ? `${Math.round(l)}%` : String(p);
  return {
    ...s,
    icon: t.icon ?? "mdi:ceiling-fan",
    // In Breeze/natural mode the level is what matters, not the underlying speed.
    state: i ? r ? x !== null ? String(x) : z : "Off" : "Unavailable",
    speed: p,
    speedCount: h,
    naturalLevel: x,
    naturalLevels: w,
    percentage: l,
    direction: a.direction === "reverse" ? "reverse" : a.direction === "forward" ? "forward" : null,
    natural: $,
    lightEntity: u,
    lightOn: !!u && n.states[u]?.state === "on",
    timerEnds: f && !Number.isNaN(f.getTime()) && f.getTime() > Date.now() ? f : null,
    spin: r ? zo(l) : null
  };
}
function Eo(n) {
  const t = S(n.speed_count);
  if (t && t > 0) return Math.round(t);
  const e = S(n.percentage_step);
  return e && e > 0 && e < 100 ? Math.round(100 / e) : null;
}
function ce(n) {
  const t = /^natural[ _]?(\d+)$/i.exec(n.trim());
  return t ? Number(t[1]) : null;
}
function zo(n) {
  const t = Math.min(100, Math.max(1, n ?? 50));
  return Math.round((3 - t / 100 * 2.4) * 100) / 100;
}
function Co(n, t = Date.now()) {
  const e = Math.max(0, Math.round((n.getTime() - t) / 6e4)), o = Math.floor(e / 60);
  return o ? `${o}h${String(e % 60).padStart(2, "0")}` : `${e}m`;
}
function To(n, t) {
  const e = n;
  try {
    if (e.formatEntityState) return e.formatEntityState(t);
  } catch {
  }
  const o = t.attributes.unit_of_measurement;
  return o ? `${t.state} ${o}` : t.state.charAt(0).toUpperCase() + t.state.slice(1);
}
function Mo(n) {
  return n.popup_card ? n.popup_card : n.type === "rf_fan" ? { type: xo, fan_entity: n.entity } : null;
}
function Ro(n, t) {
  if (t === "toggle_light")
    return n.lightEntity ? { domain: "light", service: "toggle", data: { entity_id: n.lightEntity } } : null;
  const e = n.entity.split(".")[0];
  return ["fan", "light", "switch", "input_boolean", "climate", "humidifier", "media_player", "cover"].includes(e) ? { domain: "homeassistant", service: "toggle", data: { entity_id: n.entity } } : null;
}
const Pt = ["card", "setpoint", "pill", "mode_button", "mode_icon"], Po = {
  card: "Entire card",
  setpoint: "Setpoint value (wheel, stepper or bar handle)",
  pill: "Setpoint pill",
  mode_button: "Mode button",
  mode_icon: "Mode icon"
}, ht = { when: "running", size: 18, speed: 2.4 };
function Ot(n, t) {
  const e = n.effects?.[t];
  return e || (t === "card" && (n.card?.glow ?? !0) ? "glow" : "none");
}
function Oo(n, t) {
  if (!t.available) return null;
  if (t.equipment === "heating") return "heat";
  if (t.equipment === "cooling") return "cool";
  if ((n.effects?.when ?? ht.when) === "mode") {
    if (t.mode === "heat") return "heat";
    if (t.mode === "cool") return "cool";
  }
  return null;
}
function Bo(n, t) {
  const e = Oo(n, t), o = {};
  if (!e) return o;
  o["fx-on"] = !0, o[`fx-${e}`] = !0;
  for (const i of Pt) {
    const r = Ot(n, i);
    (r === "glow" || r === "both") && (o[`fx-${i}-glow`] = !0), (r === "pulse" || r === "both") && (o[`fx-${i}-pulse`] = !0);
  }
  return o;
}
function Lo(n) {
  const t = n.effects ?? {}, e = {};
  return t.size !== void 0 && (e["--fx-size"] = `${t.size}px`), t.speed !== void 0 && (e["--fx-speed"] = `${t.speed}s`), t.heat_color && (e["--fx-heat"] = t.heat_color), t.cool_color && (e["--fx-cool"] = t.cool_color), e;
}
const Ee = [
  "buttons",
  "text",
  "card",
  "compact",
  "show_name",
  "show_status",
  "show_humidity",
  "show_pills",
  "show_current",
  "core_align",
  "toggles_zone",
  "status_position",
  "effects",
  "setpoint",
  "sets"
], T = (n = {}) => ({ type: "hvac", ...n }), R = (n = {}) => ({ type: "preset", ...n }), P = (n = {}) => ({ type: "fan_mode", ...n }), he = [
  {
    id: "signature",
    name: "Signature",
    hint: "Big light number with the status under it, a pill-centred wheel on the right, tinted mode buttons.",
    icon: "mdi:thermostat",
    tags: ["pill wheel", "status below", "tonal"],
    values: {
      show_name: !1,
      show_pills: !1,
      status_position: "below",
      setpoint: { control: "wheel", wheel_style: "pill" },
      sets: [T(), R({ display: "toggle" }), P({ display: "toggle" })]
    }
  },
  {
    id: "mission",
    name: "Mission Control",
    hint: "Setpoint bar with flags and ticks under the number. Round icon-only modes up top, preset and fan as menus below.",
    icon: "mdi:tune-variant",
    tags: ["bar", "filled icons", "menus"],
    values: {
      setpoint: { control: "bar", bar: { position: "below", look: "zones", flags: !0, ticks: 1, labels: 5, height: 12 } },
      buttons: { variant: "filled", content: "icon", radius: 999, height: 44, min_width: 44 },
      text: { current: { size: 64, weight: 200 }, status: { letter_spacing: 10 } },
      effects: { setpoint: "glow", mode_button: "glow" },
      sets: [
        T({ zone: "top", align: "center" }),
        R({ display: "menu", zone: "bottom" }),
        P({ display: "menu", zone: "bottom" })
      ]
    }
  },
  {
    id: "tap",
    name: "Tap & Go",
    hint: "Calm until you need it: tap the temperature or a pill and the wheel takes the number’s place, then folds away after 6 s.",
    icon: "mdi:gesture-tap",
    tags: ["tap to reveal", "wheel in place", "ghost"],
    values: {
      setpoint: { control: "wheel", reveal: "tap", reveal_from: "both", collapsed: "hidden", open_in: "current", hide_after: 6, neighbors: 2, scale: 120 },
      buttons: { variant: "ghost", content: "icon", icon_size: 26 },
      text: { current: { size: 96, weight: 100 } },
      effects: { card: "none", pill: "pulse", mode_icon: "pulse" },
      sets: [T({ zone: "top", align: "center" }), R({ display: "toggle" }), P({ display: "toggle" })]
    }
  },
  {
    id: "slim",
    name: "Slim Strip",
    hint: "One short centred row: name and number with a small stepper beside them, every set as a menu.",
    icon: "mdi:view-sequential-outline",
    tags: ["stepper", "menus", "centred"],
    values: {
      core_align: "center",
      show_status: !1,
      show_humidity: !1,
      show_pills: !1,
      setpoint: { control: "stepper", position: "right", scale: 70 },
      buttons: { radius: 10 },
      text: { current: { size: 44, weight: 300 }, name: { size: 14 } },
      card: { padding: 10, glow: !1 },
      sets: [
        T({ display: "menu", menu_show_name: !1 }),
        R({ display: "menu", menu_show_name: !1 }),
        P({ display: "menu", menu_show_name: !1 })
      ]
    }
  },
  {
    id: "rail",
    name: "Side Rail",
    hint: "Modes stacked down the left as outlined circles, a vertical setpoint bar on the right, preset and fan menus below.",
    icon: "mdi:dock-left",
    tags: ["vertical bar", "outlined", "left rail"],
    values: {
      setpoint: { control: "bar", bar: { position: "right", length: 210, labels: 5, ticks: 1, handle_shape: "square" } },
      buttons: { variant: "outlined", content: "icon", radius: 999, height: 46, min_width: 46 },
      text: { current: { size: 80, weight: 200 } },
      sets: [T({ zone: "left" }), R({ display: "menu", zone: "bottom" }), P({ display: "menu", zone: "bottom" })]
    }
  },
  {
    id: "wall",
    name: "Wall Tablet",
    hint: "Big and finger-friendly: huge number, large wheel under it with three next values, chunky filled mode tiles.",
    icon: "mdi:tablet",
    tags: ["big wheel", "filled tiles", "presets full time"],
    values: {
      setpoint: { control: "wheel", position: "center", scale: 150, neighbors: 3, nudge: "beside" },
      buttons: { variant: "filled", height: 76, icon_size: 30, font_size: 15, radius: 20 },
      text: { current: { size: 120, weight: 100 }, name: { size: 20 } },
      effects: { card: "pulse", mode_button: "both", speed: 3.2 },
      card: { padding: 24 },
      sets: [T(), R({ columns: 4 }), P({ display: "toggle" })]
    }
  },
  {
    id: "glass",
    name: "Minimal Glass",
    hint: "No card background or border, no labels: just the number, a stepper and text-only mode buttons.",
    icon: "mdi:circle-opacity",
    tags: ["stepper", "ghost text", "no background"],
    values: {
      show_name: !1,
      show_status: !1,
      show_humidity: !1,
      show_pills: !1,
      setpoint: { control: "stepper", position: "center", scale: 90 },
      buttons: { variant: "ghost", content: "label", font_size: 14, font_weight: 600 },
      text: { current: { size: 76, weight: 100 } },
      card: { background: "transparent", border_width: 0, glow: !1 },
      sets: [T({ align: "center" })]
    }
  },
  {
    id: "neon",
    name: "Neon",
    hint: "A cyan-to-pink gradient bar above the number with diamond handles, square filled buttons and an accent border.",
    icon: "mdi:led-strip-variant",
    tags: ["gradient bar above", "square filled", "accent border"],
    values: {
      setpoint: {
        control: "bar",
        bar: { position: "above", look: "gradient", stops: ["#00e5ff", "#7c4dff", "#ff4081"], handle_shape: "diamond", ticks: 2, labels: 10, height: 10 }
      },
      buttons: { variant: "filled", radius: 4, border_width: 1, height: 58 },
      text: {
        name: { transform: "uppercase", letter_spacing: 15, size: 13 },
        current: { weight: 300, color: "var(--primary-color)" }
      },
      card: { border_color: "var(--primary-color)", border_width: 2, radius: 6 },
      effects: { card: "both", setpoint: "glow", mode_icon: "glow", size: 24 },
      sets: [T(), R({ display: "menu" }), P({ display: "menu" })]
    }
  },
  {
    id: "pocket",
    name: "Pocket",
    hint: "Phone-sized: small number, tiny stepper on the left, everything else behind round toggles along the top.",
    icon: "mdi:cellphone",
    tags: ["compact", "small stepper", "toggles on top"],
    values: {
      compact: !0,
      toggles_zone: "top",
      show_humidity: !1,
      setpoint: { control: "stepper", position: "left", scale: 60 },
      buttons: { content: "icon", radius: 999, height: 38, min_width: 38, icon_size: 20 },
      text: { current: { size: 40, weight: 300 }, pill: { size: 15 } },
      card: { padding: 10 },
      sets: [T(), R(), P()]
    }
  }
];
function No(n) {
  return Ee.some((t) => n[t] !== void 0);
}
const Uo = ["order", "options", "name", "toggle_icon"];
function Ho(n, t) {
  const e = n ?? [], o = /* @__PURE__ */ new Set(), i = t.map((s) => {
    const a = e.findIndex((h, p) => !o.has(p) && h.type === s.type);
    if (a < 0) return structuredClone(s);
    o.add(a);
    const l = {};
    for (const h of Uo) e[a][h] !== void 0 && (l[h] = structuredClone(e[a][h]));
    return { ...structuredClone(s), ...l };
  }), r = e.filter((s, a) => s.type === "chips" && !o.has(a));
  return [...structuredClone(r), ...i];
}
function Do(n, t) {
  const e = { ...n };
  for (const r of Ee) delete e[r];
  const o = structuredClone(t.values), i = n.setpoint ?? {};
  if (i.min_gap !== void 0 || i.bar?.range_min !== void 0 || i.bar?.range_max !== void 0) {
    const r = { ...o.setpoint ?? {} };
    i.min_gap !== void 0 && (r.min_gap = i.min_gap), (i.bar?.range_min !== void 0 || i.bar?.range_max !== void 0) && (r.bar = { ...r.bar ?? {} }, i.bar?.range_min !== void 0 && (r.bar.range_min = i.bar.range_min), i.bar?.range_max !== void 0 && (r.bar.range_max = i.bar.range_max)), o.setpoint = r;
  }
  return o.sets ? o.sets = Ho(n.sets, o.sets) : n.sets && (o.sets = n.sets), { ...e, ...o };
}
var jo = Object.defineProperty, it = (n, t, e, o) => {
  for (var i = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = s(t, e, i) || i);
  return i && jo(t, e, i), i;
};
const pt = [
  ["var(--primary-color)", "Primary"],
  ["var(--accent-color)", "Accent"],
  ["var(--primary-text-color)", "Primary text"],
  ["var(--secondary-text-color)", "Secondary text"],
  ["var(--disabled-text-color)", "Disabled text"],
  ["var(--state-active-color)", "State active"],
  ["var(--error-color)", "Error"],
  ["var(--warning-color)", "Warning"],
  ["var(--success-color)", "Success"],
  ["var(--info-color)", "Info"]
];
function Io(n) {
  const t = n == null ? "" : String(n);
  return t === "" ? "default" : /^#[0-9a-fA-F]{3,8}$/.test(t) ? "custom" : /^var\(/.test(t) && pt.some(([e]) => e === t) ? "theme" : "css";
}
const Fo = {
  name: "Name",
  status: "Status (Heating / Cooling)",
  current: "Current temperature",
  unit: "Unit (°)",
  humidity: "Humidity",
  pill: "Setpoint pills",
  wheel_value: "Wheel / stepper value",
  wheel_neighbor: "Wheel next values",
  bar: "Bar labels"
}, qo = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, Vt = class Vt extends G {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(["thermostat"]), this._set = null, this._chip = null, this._cmode = {};
  }
  setConfig(t) {
    this._config = At(t);
  }
  // ---- writes ---------------------------------------------------------------
  _emit(t) {
    this._config = At(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  /** Set a path; `undefined`/'' or the built-in default removes the key. */
  _put(t, e, o) {
    if (!this._config) return;
    const i = e === o ? void 0 : e;
    this._emit(q(this._config, t, i));
  }
  _get(t) {
    return ro(this._config, t);
  }
  /** The configured sets, materialized from the defaults on first edit. */
  _sets() {
    return Array.isArray(this._config?.sets) ? this._config.sets : we.map((t) => ({ ...t }));
  }
  _writeSets(t) {
    this._emit({ ...this._config, sets: t });
  }
  _patchSet(t, e, o, i) {
    const r = this._sets(), s = q(r[t] ?? {}, e, o === i ? void 0 : o);
    r[t] = { ...s, type: r[t].type }, this._writeSets(r);
  }
  // ---- primitives -------------------------------------------------------------
  _toggleOpen(t, e) {
    const o = e.currentTarget.open, i = new Set(this._open);
    o ? i.add(t) : i.delete(t), this._open = i;
  }
  _panel(t, e, o, i) {
    return c`<details class="etce-sec" ?open=${this._open.has(t)} @toggle=${(r) => this._toggleOpen(t, r)}>
      <summary><ha-icon icon=${e}></ha-icon>${o}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${this._open.has(t) ? i : d}</div>
    </details>`;
  }
  _sub(t, e, o) {
    return c`<details class="etce-sub" ?open=${this._open.has(t)} @toggle=${(i) => this._toggleOpen(t, i)}>
      <summary>${e}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${this._open.has(t) ? o() : d}</div>
    </details>`;
  }
  _group(t, e = !1) {
    return c`<div class="etce-group ${e ? "first" : ""}">${t}</div>`;
  }
  _hint(t) {
    return c`<p class="etce-hint">${t}</p>`;
  }
  _check(t, e, o) {
    return c`<label class="etce-check"
      ><input type="checkbox" .checked=${e} @change=${(i) => o(i.target.checked)} />${t}</label
    >`;
  }
  _bool(t, e, o) {
    const i = this._get(t) ?? o;
    return this._check(e, i, (r) => this._put(t, r, o));
  }
  _selectRow(t, e, o, i) {
    return c`<div class="etce-row">
      <label class="lbl">${t}</label>
      <select @change=${(r) => i(r.target.value)}>
        ${o.map(([r, s]) => c`<option value=${r} ?selected=${r === e}>${s}</option>`)}
      </select>
    </div>`;
  }
  _select(t, e, o, i) {
    const r = String(this._get(t) ?? i);
    return this._selectRow(e, r, o, (s) => this._put(t, s, i));
  }
  _sliderRow(t, e, o, i, r, s, a, l = (h) => `${h}px`) {
    return c`<div class="etce-row etce-nowrap">
      <label class="lbl">${t}</label>
      <input
        type="range"
        min=${o}
        max=${i}
        step=${r}
        .value=${String(e)}
        @input=${(h) => {
      const p = h.target;
      p.nextElementSibling.textContent = l(Number(p.value));
    }}
        @change=${(h) => a(Number(h.target.value))}
      />
      <span class="etce-val">${l(e)}</span>
      ${s ? c`<button class="etce-reset" title="Back to default" @click=${() => a(void 0)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>` : d}
    </div>`;
  }
  _slider(t, e, o, i, r, s, a) {
    const l = this._get(t);
    return this._sliderRow(e, l ?? s, o, i, r, l !== void 0, (h) => this._put(t, h, s), a);
  }
  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  _colorRow(t, e, o, i, r, s) {
    const a = this._cmode[t] || Io(o);
    let l = d;
    if (a === "theme")
      l = c`<select @change=${(p) => s(p.target.value)}>
        ${pt.map(([p, u]) => c`<option value=${p} ?selected=${p === o}>${u}</option>`)}
      </select>`;
    else if (a === "custom") {
      const p = o && /^#[0-9a-fA-F]{6}$/.test(o) ? o : r;
      l = c`<input type="color" .value=${p} @change=${(u) => s(u.target.value)} />`;
    } else a === "css" && (l = c`<input
        type="text"
        .value=${o ?? ""}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(p) => s(p.target.value || void 0)}
      />`);
    const h = (p) => {
      this._cmode = { ...this._cmode, [t]: p }, p === "default" ? s(void 0) : p === "theme" ? s(pt.some(([u]) => u === o) ? o : pt[0][0]) : p === "custom" ? s(o && /^#[0-9a-fA-F]{6}$/.test(o) ? o : r) : this.requestUpdate();
    };
    return c`<div class="etce-row">
      <label class="lbl">${e}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(p) => h(p.target.value)}>
          ${[["default", i], ["theme", "Theme color"], ["custom", "Custom color"], ["css", "Custom CSS"]].map(
      ([p, u]) => c`<option value=${p} ?selected=${p === a}>${u}</option>`
    )}
        </select>
        ${l}
      </div>
    </div>`;
  }
  _color(t, e, o, i) {
    return this._colorRow(t, e, this._get(t), o, i, (r) => this._put(t, r));
  }
  _selector(t, e, o, i) {
    return c`<div class="etce-row">
      ${t ? c`<label class="lbl">${t}</label>` : d}
      <ha-selector
        .hass=${this.hass}
        .selector=${e}
        .value=${o}
        @value-changed=${(r) => i(r.detail.value)}
      ></ha-selector>
    </div>`;
  }
  // ---- render -----------------------------------------------------------------
  render() {
    return this._config ? c`<div class="etce">
      ${this._panel("thermostat", "mdi:thermostat", "Thermostat", this._thermostatBody())}
      ${this._panel("templates", "mdi:palette-outline", "Quick Preset Templates", this._templatesBody())}
      ${this._panel("setpoint", "mdi:knob", "Setpoint control", this._setpointBody())}
      ${this._panel("sets", "mdi:gesture-tap-button", "Button sets", this._setsBody())}
      ${this._panel("buttons", "mdi:palette-swatch-outline", "Button style", this._buttonsBody())}
      ${this._panel("text", "mdi:format-text", "Text", this._textBody())}
      ${this._panel("card", "mdi:card-outline", "Card", this._cardBody())}
      ${this._panel("effects", "mdi:shimmer", "Effects", this._effectsBody())}
      <div class="etce-foot">Easy Thermostat Styler Card v${_e}</div>
    </div>` : d;
  }
  _thermostatBody() {
    const t = this._config;
    return c`
      ${this._hint("The climate entity this card controls, and what the centre of the card shows.")}
      ${this._selector("Entity", { entity: { domain: "climate" } }, t.entity, (e) => this._put("entity", e || void 0))}
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input
          type="text"
          .value=${t.name ?? ""}
          placeholder="Entity name"
          @change=${(e) => this._put("name", e.target.value || void 0)}
        />
      </div>
      ${this._group("Show")}
      <div class="etce-checks">
        ${this._bool("show_name", "Name", g.show_name)} ${this._bool("show_status", "Status", g.show_status)}
        ${this._bool("show_humidity", "Humidity", g.show_humidity)}
        ${this._bool("show_current", "Current temperature", g.show_current)}
        ${this._bool("show_pills", "Setpoint pills", g.show_pills)}
      </div>
      ${this._group("Layout")}
      ${this._select("core_align", "Align", [["left", "Left"], ["center", "Center"], ["right", "Right"]], g.core_align)}
      ${this._select(
      "status_position",
      "Status",
      [["above", "Above the temperature"], ["beside", "Beside the temperature"], ["below", "Below the temperature"]],
      g.status_position
    )}
    `;
  }
  _templatesBody() {
    const t = (e) => {
      const o = he.find((i) => i.id === e);
      No(this._config) && !window.confirm(
        `Apply the “${o.name}” template?

It replaces this card’s layout, setpoint control and styling. Your device chips, button order/names/icons and temperature range are kept.`
      ) || this._emit(Do(this._config, o));
    };
    return c`
      ${this._hint("One-click starting points, each with its own setpoint control, button style and layout. Fine-tune anything afterwards; nothing stays linked to the template.")}
      <div class="etce-blist">
        ${he.map(
      (e) => c`<div class="etce-brow etce-tpl">
            <ha-icon class="etce-sicon" icon=${e.icon}></ha-icon>
            <div class="etce-tpl-text">
              <span class="etce-sname">${e.name}</span>
              <span class="etce-tpl-hint">${e.hint}</span>
              <span class="etce-tpl-tags">${e.tags.map((o) => c`<span>${o}</span>`)}</span>
            </div>
            <button class="etce-preset" @click=${() => t(e.id)}>Apply</button>
          </div>`
    )}
      </div>
    `;
  }
  _setpointBody() {
    const t = this._get("setpoint.control") ?? g.control;
    return c`
      ${this._hint("How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.")}
      ${this._select(
      "setpoint.control",
      "Control",
      [["wheel", "Wheel"], ["stepper", "− / + stepper"], ["bar", "Setpoint bar"], ["none", "None (display only)"]],
      g.control
    )}
      ${t === "wheel" || t === "stepper" ? c`
            ${this._select("setpoint.position", "Position", [["left", "Left"], ["right", "Right"], ["center", "Center (below)"]], g.position)}
            ${this._slider("setpoint.scale", "Size", 40, 250, 5, g.scale, (e) => `${e}%`)}
            ${t === "wheel" ? c`${this._slider("setpoint.neighbors", "Next values shown", 0, 3, 1, g.neighbors, (e) => String(e))}
                ${this._select("setpoint.nudge", "− / + buttons", [["beside", "Beside"], ["stacked", "Above & below"], ["hidden", "Hidden"]], g.nudge)}
                ${this._select("setpoint.wheel_style", "Centre value", [["bubble", "Bubble"], ["pill", "Pill (like the setpoint pills)"]], g.wheel_style)}` : d}
          ` : d}
      ${t === "bar" ? this._barBody() : d}
      ${t !== "none" ? this._revealBody() : d}
      ${this._group("Heat / Cool")}
      ${this._slider("setpoint.min_gap", "Minimum gap", 0, 10, 0.5, this._defaultGap(), (e) => `${e}°`)}
    `;
  }
  _revealBody() {
    const t = (this._get("setpoint.reveal") ?? g.reveal) === "tap", e = this._get("setpoint.hide_after") ?? g.hide_after;
    return c`
      ${this._group("Show controls")}
      ${this._select("setpoint.reveal", "Controls", [["always", "Always shown"], ["tap", "Shown when tapped"]], g.reveal)}
      ${this._hint(
      t ? "The controls stay folded away until you tap. They fold away again after the time below without use." : "Choose “Shown when tapped” to keep the card calm: just the temperature and setpoint until you want to change it."
    )}
      ${t ? c`
            ${this._select(
      "setpoint.reveal_from",
      "Open by tapping",
      [["both", "Setpoint pill or current temperature"], ["pills", "Setpoint pill"], ["current", "Current temperature"]],
      g.reveal_from
    )}
            ${this._select(
      "setpoint.collapsed",
      "While closed show",
      [["visual", "The control’s value (tap it to open too)"], ["hidden", "Nothing — just the pill / temperature"]],
      g.collapsed
    )}
            ${this._select(
      "setpoint.open_in",
      "Opens",
      [["place", "In its own place"], ["current", "In place of the current temperature"]],
      g.open_in
    )}
            ${this._hint("“In place of the current temperature” swaps the big number for the controls while they are open.")}
            ${this._sliderRow(
      "Close after",
      e,
      0,
      60,
      1,
      this._get("setpoint.hide_after") !== void 0,
      (o) => this._put("setpoint.hide_after", o, g.hide_after),
      (o) => o ? `${o}s` : "Stay open"
    )}
          ` : d}
    `;
  }
  /** A bar-side choice: above / below for a horizontal bar, left / right for a vertical one. */
  _sidePlacement(t, e, o, i) {
    const r = String(this._get("setpoint.bar.position") ?? g.bar.position), s = r === "left" || r === "right", a = s ? [["left", "Left of the bar"], ["right", "Right of the bar"]] : [["above", "Above the bar"], ["below", "Below the bar"]], l = s ? i : o, h = String(this._get(`setpoint.bar.${t}`) ?? l);
    return this._selectRow(e, a.some(([p]) => p === h) ? h : l, a, (p) => this._put(`setpoint.bar.${t}`, p, l));
  }
  _defaultGap() {
    return (this.hass?.config?.unit_system?.temperature ?? "").includes("C") ? 1.5 : 3;
  }
  _barBody() {
    const t = g.bar, e = this._get("setpoint.bar.look") ?? t.look, o = this._get("setpoint.bar.stops") ?? ["#2b9af9", "#7ccf8a", "#ff8100"];
    return c`
      ${this._select(
      "setpoint.bar.position",
      "Position",
      [["below", "Below (horizontal)"], ["above", "Above (horizontal)"], ["left", "Left (vertical)"], ["right", "Right (vertical)"]],
      t.position
    )}
      ${["left", "right"].includes(String(this._get("setpoint.bar.position") ?? "")) ? this._slider("setpoint.bar.length", "Height", 100, 400, 10, 200) : d}
      ${this._select("setpoint.bar.look", "Look", [["zones", "Heat / comfort / cool zones"], ["gradient", "Gradient"]], t.look)}
      ${e === "gradient" ? c`<div class="etce-row">
            <label class="lbl">Gradient (cold → hot)</label>
            <div class="etce-stops">
              ${o.map(
      (i, r) => c`<input
                  type="color"
                  .value=${i}
                  @change=${(s) => {
        const a = [...o];
        a[r] = s.target.value, this._put("setpoint.bar.stops", a);
      }}
                />`
    )}
            </div>
          </div>` : c`${this._color("setpoint.bar.heat_color", "Heat zone", "Theme heat", "#ff8100")}
          ${this._color("setpoint.bar.comfort_color", "Comfort zone", "Green", "#4caf50")}
          ${this._color("setpoint.bar.cool_color", "Cool zone", "Theme cool", "#2b9af9")}`}
      ${this._slider("setpoint.bar.height", "Thickness", 6, 40, 1, t.height)}
      ${this._select(
      "setpoint.bar.handle_shape",
      "Handle",
      [["round", "Round"], ["square", "Square"], ["diamond", "Diamond"], ["line", "Line"]],
      t.handle_shape
    )}
      ${this._color("setpoint.bar.handle_color", "Handle fill", "White", "#ffffff")}
      ${this._check(
      "Handle border",
      this._get("setpoint.bar.handle_border_color") !== "none",
      (i) => this._put("setpoint.bar.handle_border_color", i ? void 0 : "none")
    )}
      ${this._get("setpoint.bar.handle_border_color") !== "none" ? this._color("setpoint.bar.handle_border_color", "Handle border colour", "Heat / cool colour", "#ffffff") : d}
      ${this._group("Value flags")}
      ${this._bool("setpoint.bar.flags", "Show value flags on the handles", t.flags)}
      ${this._get("setpoint.bar.flags") ?? t.flags ? c`${this._sidePlacement("flag_position", "Flag placement", "above", "left")}
          ${this._color("setpoint.bar.flag_color", "Flag colour", "Heat / cool colour", "#ff8100")}
          ${this._color("setpoint.bar.flag_text_color", "Flag text colour", "White", "#ffffff")}` : d}
      ${this._group("Markers")}
      ${this._bool("setpoint.bar.show_current", "Current temperature marker", t.show_current)}
      ${this._slider("setpoint.bar.ticks", "Tick every", 0, 10, 0.5, t.ticks, (i) => i ? `${i}°` : "Off")}
      ${this._slider("setpoint.bar.labels", "Label every", 0, 20, 1, t.labels, (i) => i ? `${i}°` : "Off")}
      ${(this._get("setpoint.bar.ticks") ?? t.ticks) || (this._get("setpoint.bar.labels") ?? t.labels) ? this._sidePlacement("tick_position", "Ticks & labels", "below", "right") : d}
      ${this._group("Range")}
      ${this._hint("Leave empty to use the thermostat’s own limits.")}
      ${["range_min", "range_max"].map(
      (i) => c`<div class="etce-row">
          <label class="lbl">${i === "range_min" ? "From" : "To"}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${i}`) ?? "")}
            @change=${(r) => {
        const s = r.target.value;
        this._put(`setpoint.bar.${i}`, s === "" ? void 0 : Number(s));
      }}
          />
        </div>`
    )}
    `;
  }
  // ---- button sets --------------------------------------------------------------
  _setsBody() {
    const t = this._sets(), e = this.hass?.states[this._config.entity], o = (i) => {
      const r = [...t, i === "chips" ? { type: i, chips: [] } : { type: i }];
      this._set = r.length - 1, this._writeSets(r);
    };
    return c`
      ${this._hint("Groups of buttons. Each set picks its side of the card, its layout, and how it shows: full time, behind a toggle button, or as an expandable menu.")}
      ${this._select("toggles_zone", "Default location", [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], g.toggles_zone)}
      ${this._hint("Where sets go when they have no Side of their own, and where the toggle buttons sit. A set’s own Side always wins.")}
      ${this._bool("compact", "Compact", !1)}
      ${this._hint("Puts every full-time set behind a toggle button, so the card stays small until you open one. Sets shown as expandable menus are already compact and are not changed.")}
      ${this._group("Sets")}
      <div class="etce-addbar">
        ${["hvac", "preset", "fan_mode", "chips"].map(
      (i) => c`<button class="etce-add" @click=${() => o(i)}>+ ${ct[i]}</button>`
    )}
      </div>
      <div class="etce-slist">
        ${t.map((i, r) => {
      const s = i.type === "chips" || zt(e, i.type).length > 0, a = this._set === r;
      return c`<div class="etce-srow ${i.hidden ? "off" : ""} ${a ? "open" : ""}">
              <ha-icon class="etce-sicon" icon=${qo[i.type]}></ha-icon>
              <span class="etce-sname" @click=${() => this._set = a ? null : r}>${i.name ?? ct[i.type]}</span>
              <span class="etce-stag"
                >${s ? `${i.zone ?? this._defaultZone()} · ${this._displayTag(i)}` : "not on this entity"}</span
              >
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._set = a ? null : r}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" title="Move up" ?disabled=${r === 0} @click=${() => this._moveSet(r, -1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button class="etce-act" title="Move down" ?disabled=${r === t.length - 1} @click=${() => this._moveSet(r, 1)}>
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
                <button class="etce-act etce-eye ${i.hidden ? "off" : ""}" title=${i.hidden ? "Show" : "Hide"} @click=${() => this._patchSet(r, "hidden", !i.hidden, !1)}>
                  <ha-icon icon=${i.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
                <button class="etce-act del" title="Delete" @click=${() => this._deleteSet(r)}>
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${a ? c`<div class="etce-sedit">${this._setEditor(i, r)}</div>` : d}`;
    })}
      </div>
    `;
  }
  _defaultZone() {
    return this._config?.toggles_zone ?? g.toggles_zone;
  }
  _displayTag(t) {
    return t.display === "menu" && t.type !== "chips" ? "menu" : this._config.compact || t.display === "toggle" ? "toggle" : "full time";
  }
  _moveSet(t, e) {
    const o = this._sets(), i = t + e;
    i < 0 || i >= o.length || ([o[t], o[i]] = [o[i], o[t]], this._set === t && (this._set = i), this._writeSets(o));
  }
  _deleteSet(t) {
    const e = this._sets();
    e.splice(t, 1), this._set = null, this._writeSets(e);
  }
  _setEditor(t, e) {
    const o = t.zone ?? this._defaultZone(), i = o === "left" || o === "right", r = (s, a, l) => this._patchSet(e, s, a, l);
    return c`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${ct[t.type]} @change=${(s) => r("name", s.target.value || void 0)} />
      </div>
      ${this._group("Placement")}
      ${this._selectRow(
      "Side",
      t.zone ?? "",
      [["", `Default (${this._defaultZone()})`], ["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]],
      (s) => r("zone", s || void 0)
    )}
      ${this._selectRow(
      "Orientation",
      t.orientation ?? (i ? "column" : "row"),
      [["row", "Row"], ["column", "Column"]],
      (s) => r("orientation", s, i ? "column" : "row")
    )}
      ${this._selectRow(
      "Align",
      t.align ?? (t.type === "chips" ? "center" : "stretch"),
      [["stretch", "Fill width"], ["start", "Start"], ["center", "Center"], ["end", "End"]],
      (s) => r("align", s, t.type === "chips" ? "center" : "stretch")
    )}
      ${(t.align ?? "stretch") === "stretch" && t.type !== "chips" ? this._sliderRow("Columns", t.columns ?? 0, 0, 8, 1, t.columns !== void 0, (s) => r("columns", s, 0), (s) => s ? String(s) : "Auto") : d}
      ${this._group("Display")}
      ${this._selectRow(
      "Show",
      t.display ?? "always",
      [["always", "Full time"], ["toggle", "Behind a toggle button"], ...t.type === "chips" ? [] : [["menu", "Expandable menu"]]],
      (s) => r("display", s, "always")
    )}
      ${t.display === "menu" ? c`${this._hint("One button shows the current value; tap it to open the full list.")}
          ${this._selectRow(
      "Opens",
      t.menu_direction ?? Ct(o),
      [["down", "Down"], ["up", "Up"], ["right", "Right"], ["left", "Left"]],
      (s) => r("menu_direction", s, Ct(o))
    )}
          ${this._check("Show the set name on the button", t.menu_show_name ?? !0, (s) => r("menu_show_name", s, !0))}` : d}
      ${(t.display ?? "always") === "toggle" || this._config.compact && t.display !== "menu" ? this._selector("Toggle icon", { icon: {} }, t.toggle_icon, (s) => r("toggle_icon", s || void 0)) : d}
      ${t.type === "chips" ? this._sub(`set-${e}-chips`, "Chips", () => this._chipsEditor(t, e)) : this._sub(`set-${e}-options`, "Buttons in this set", () => this._optionsEditor(t, e))}
      ${this._sub(`set-${e}-style`, "Button style for this set", () => this._buttonStyleEditor(`sets.${e}.style`, !0, e))}
    `;
  }
  _optionsEditor(t, e) {
    const o = this.hass?.states[this._config.entity], i = ye(zt(o, t.type), t.order);
    if (!i.length) return this._hint("This entity has no options for this set.");
    const r = (s, a) => {
      const l = [...i], h = s + a;
      h < 0 || h >= l.length || ([l[s], l[h]] = [l[h], l[s]], this._patchSet(e, "order", l));
    };
    return c`${this._hint("Order, hide, rename and re-icon each button.")}
      <div class="etce-blist">
        ${i.map((s, a) => {
      const l = t.options?.[s] ?? {}, h = `${e}:${s}`;
      return c`<div class="etce-brow ${l.hide ? "off" : ""}">
              <ha-icon class="etce-sicon" icon=${l.icon ?? It[s.toLowerCase()] ?? "mdi:circle-medium"}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = this._chip === h ? null : h}>${l.name ?? Et(s)}</span>
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._chip = this._chip === h ? null : h}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === 0} @click=${() => r(a, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === i.length - 1} @click=${() => r(a, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act etce-eye ${l.hide ? "off" : ""}" @click=${() => this._patchSet(e, `options.${s}.hide`, !l.hide, !1)}>
                  <ha-icon icon=${l.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
              </div>
            </div>
            ${this._chip === h ? c`<div class="etce-sedit">
                  <div class="etce-row">
                    <label class="lbl">Label</label>
                    <input type="text" .value=${l.name ?? ""} placeholder=${Et(s)} @change=${(p) => this._patchSet(e, `options.${s}.name`, p.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, l.icon, (p) => this._patchSet(e, `options.${s}.icon`, p || void 0))}
                </div>` : d}`;
    })}
      </div>`;
  }
  _chipsEditor(t, e) {
    const o = t.chips ?? [], i = (s) => this._patchSet(e, "chips", s.length ? s : void 0), r = (s) => {
      const a = s === "rf_fan" ? this._firstRfFan() ?? "" : "";
      this._chip = `chip:${e}:${o.length}`;
      const l = a || Object.keys(this.hass?.states ?? {}).find((h) => h.startsWith(s === "rf_fan" ? "fan." : "sensor.")) || "";
      l && i([...o, { type: s, entity: l }]);
    };
    return c`
      ${this._hint("Status chips for linked devices. RF fan chips find the fan’s light and sleep timer automatically. Tap opens the fan card in a pop-up; hold toggles.")}
      <div class="etce-addbar">
        <button class="etce-add" @click=${() => r("rf_fan")}>+ RF fan</button>
        <button class="etce-add" @click=${() => r("entity")}>+ Entity</button>
      </div>
      <div class="etce-blist">
        ${o.map((s, a) => {
      const l = `chip:${e}:${a}`, h = this._chip === l, p = this.hass?.states[s.entity], u = s.name ?? p?.attributes.friendly_name ?? s.entity, m = (f, v, $) => {
        const x = [...o];
        x[a] = q(x[a], f, v === $ ? void 0 : v), x[a] = { ...x[a], type: s.type, entity: x[a].entity || s.entity }, i(x);
      }, b = (f) => {
        const v = [...o], $ = a + f;
        $ < 0 || $ >= v.length || ([v[a], v[$]] = [v[$], v[a]], i(v));
      };
      return c`<div class="etce-brow">
              <ha-icon class="etce-sicon" icon=${s.icon ?? (s.type === "rf_fan" ? "mdi:ceiling-fan" : "mdi:shape-outline")}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = h ? null : l}>${u}</span>
              <span class="etce-stag">${s.type === "rf_fan" ? "RF fan" : "Entity"}</span>
              <div class="etce-sctl">
                <button class="etce-act" @click=${() => this._chip = h ? null : l}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === 0} @click=${() => b(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === o.length - 1} @click=${() => b(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act del" @click=${() => i(o.filter((f, v) => v !== a))}><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>
              </div>
            </div>
            ${h ? c`<div class="etce-sedit">
                  ${this._selector("Entity", { entity: s.type === "rf_fan" ? { domain: "fan" } : {} }, s.entity, (f) => f && m("entity", f))}
                  <div class="etce-row">
                    <label class="lbl">Name</label>
                    <input type="text" .value=${s.name ?? ""} placeholder="Entity name" @change=${(f) => m("name", f.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, s.icon, (f) => m("icon", f || void 0))}
                  <div class="etce-checks">
                    ${this._check("Show name", s.show_name ?? !0, (f) => m("show_name", f, !0))}
                    ${this._check("Show state", s.show_state ?? !0, (f) => m("show_state", f, !0))}
                  </div>
                  ${s.type === "rf_fan" ? this._rfFanInfo(s) : d}
                  ${s.type === "rf_fan" ? this._selectRow(
        "Speed shows as",
        s.speed_format ?? "number",
        [["number", "Number (4)"], ["fraction", "Fraction (4/10)"], ["percent", "Percent (40%)"]],
        (f) => m("speed_format", f, "number")
      ) : d}
                  ${this._selectRow(
        "Tap",
        s.tap ?? (s.type === "rf_fan" ? "popup" : "more-info"),
        [["popup", "Open card in pop-up"], ["more-info", "More info"], ["toggle", "Toggle"], ["none", "Nothing"]],
        (f) => m("tap", f, s.type === "rf_fan" ? "popup" : "more-info")
      )}
                  ${this._selectRow(
        "Hold",
        s.hold ?? (s.type === "rf_fan" ? "toggle" : "none"),
        [["toggle", "Toggle"], ...s.type === "rf_fan" ? [["toggle_light", "Toggle light"]] : [], ["more-info", "More info"], ["none", "Nothing"]],
        (f) => m("hold", f, s.type === "rf_fan" ? "toggle" : "none")
      )}
                  ${(s.tap ?? (s.type === "rf_fan" ? "popup" : "more-info")) === "popup" ? c`${this._hint(
        s.type === "rf_fan" ? "Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan." : "Pop-up card config (any card)."
      )}
                      ${this._selector("", { object: {} }, s.popup_card, (f) => m("popup_card", f && Object.keys(f).length ? f : void 0))}` : d}
                </div>` : d}`;
    })}
      </div>
    `;
  }
  /** What was detected for this fan (read-only hint). */
  _rfFanInfo(t) {
    if (!this.hass?.states[t.entity]) return d;
    const e = Rt(this.hass, t, 0), o = [
      e.speedCount ? `${e.speedCount} speeds` : "speed count unknown",
      e.naturalLevels ? `Breeze ${e.naturalLevels} levels` : Array.isArray(this.hass.states[t.entity].attributes.preset_modes) ? "Breeze" : "",
      e.lightEntity ? `light ${e.lightEntity}` : "no light found"
    ].filter(Boolean);
    return this._hint(`Detected: ${o.join(" · ")}.`);
  }
  _firstRfFan() {
    const t = this.hass?.entities ?? {};
    return Object.values(t).find((e) => e.entity_id.startsWith("fan.") && e.platform === "esphome_rf_fan")?.entity_id;
  }
  // ---- button style (card default + per set — same property set) ---------------
  _buttonsBody() {
    return c`${this._hint("The look of every button. Each button set can override any of these under “Button style for this set”.")}
      ${this._buttonStyleEditor("buttons", !1)}`;
  }
  _buttonStyleEditor(t, e, o) {
    const i = (e ? this._sets()[o]?.style : this._config.buttons) ?? {}, r = e ? Tt(this._config.buttons, void 0) : ke, s = e ? "Card default" : "Built-in", a = (u, m) => {
      e ? this._patchSet(o, `style.${u}`, m) : this._put(`${t}.${u}`, m);
    }, l = (u, m, b) => {
      const f = String(r[u] ?? ""), v = b.find(([$]) => $ === f)?.[1] ?? f;
      return this._selectRow(m, String(i[u] ?? ""), [["", `${s} (${v})`], ...b], ($) => a(u, $ || void 0));
    }, h = (u, m, b, f) => {
      const v = Number(r[u] ?? 0), $ = i[u];
      return this._sliderRow(m, $ ?? v, b, f, 1, $ !== void 0, (x) => a(u, x));
    }, p = (u, m, b) => this._colorRow(`${t}.${u}`, m, i[u], e ? "Card default" : "Automatic", b, (f) => a(u, f));
    return c`
      ${this._group("Shape", !0)}
      ${l("variant", "Style", [["tonal", "Tonal (tinted)"], ["filled", "Filled"], ["outlined", "Outlined"], ["ghost", "Ghost"]])}
      ${h("radius", "Corner radius", 0, 40)} ${h("height", "Min height", 0, 120)} ${h("min_width", "Min width", 0, 200)}
      ${h("gap", "Spacing", 0, 32)} ${h("border_width", "Border width", 0, 6)}
      ${this._group("Content")}
      ${l("content", "Show", [["icon_label", "Icon and label"], ["icon", "Icon only"], ["label", "Label only"]])}
      ${l("icon_position", "Icon", [["top", "Above label"], ["left", "Left of label"]])}
      ${h("icon_size", "Icon size", 10, 48)} ${h("font_size", "Text size", 8, 28)}
      ${l("font_weight", "Text weight", [["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"]])}
      ${this._group("Colors — inactive")}
      ${p("background", "Background", "#2a2a2a")} ${p("color", "Text & icon", "#cccccc")} ${p("border_color", "Border", "#555555")}
      ${this._group("Colors — active")}
      ${this._hint("Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.")}
      ${p("active_background", "Background", "#ff8100")} ${p("active_color", "Text & icon", "#ffffff")}
      ${p("active_border_color", "Border", "#ff8100")}
    `;
  }
  // ---- text ---------------------------------------------------------------------
  _textBody() {
    return c`${this._hint("Size, weight, color and case for each piece of text. Unset keeps the built-in look.")}
      ${$e.map((t) => this._sub(`text-${t}`, Fo[t], () => this._textRole(t)))}`;
  }
  _textRole(t) {
    const e = `text.${t}`, o = this._get(e) ?? {};
    return c`
      ${this._sliderRow(
      "Size",
      o.size ?? 0,
      0,
      160,
      1,
      o.size !== void 0,
      (i) => this._put(`${e}.size`, i || void 0),
      (i) => i ? `${i}px` : "Auto"
    )}
      ${this._selectRow(
      "Weight",
      String(o.weight ?? ""),
      [["", "Built-in"], ["100", "Thin"], ["200", "Extra light"], ["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"], ["800", "Extra bold"]],
      (i) => this._put(`${e}.weight`, i ? Number(i) : void 0)
    )}
      ${this._color(`${e}.color`, "Color", "Built-in", "#ffffff")}
      ${this._selectRow(
      "Case",
      String(o.transform ?? ""),
      [["", "Built-in"], ["none", "As written"], ["uppercase", "UPPERCASE"], ["lowercase", "lowercase"], ["capitalize", "Capitalize"]],
      (i) => this._put(`${e}.transform`, i || void 0)
    )}
      ${this._sliderRow(
      "Letter spacing",
      o.letter_spacing ?? 0,
      -10,
      30,
      1,
      o.letter_spacing !== void 0,
      (i) => this._put(`${e}.letter_spacing`, i),
      (i) => `${(i / 100).toFixed(2)}em`
    )}
      ${this._selectRow(
      "Italic",
      o.italic === void 0 ? "" : o.italic ? "on" : "off",
      [["", "Built-in"], ["off", "Off"], ["on", "On"]],
      (i) => this._put(`${e}.italic`, i === "" ? void 0 : i === "on")
    )}
      ${this._sliderRow("Opacity", o.opacity ?? 100, 10, 100, 5, o.opacity !== void 0, (i) => this._put(`${e}.opacity`, i), (i) => `${i}%`)}
    `;
  }
  // ---- card -----------------------------------------------------------------------
  _effectsBody() {
    const t = this._config, e = [["none", "Off"], ["glow", "Glow"], ["pulse", "Pulse"], ["both", "Glow + pulse"]], o = Pt.some((r) => Ot(t, r) !== "none"), i = (r, s) => {
      let a = q(t, `effects.${r}`, s === "none" && r !== "card" ? void 0 : s);
      r === "card" && (a = q(a, "card.glow", void 0), s === "glow" && (a = q(a, "effects.card", void 0))), this._emit(a);
    };
    return c`
      ${this._hint("Make parts of the card glow or pulse in the heat colour while heating and the cool colour while cooling.")}
      ${this._group("Parts", !0)}
      ${Pt.map((r) => this._selectRow(Po[r], Ot(t, r), e, (s) => i(r, s)))}
      ${o ? c`
            ${this._group("When")}
            ${this._select(
      "effects.when",
      "Active",
      [["running", "Only while heating or cooling"], ["mode", "Whenever the mode is Heat or Cool"]],
      ht.when
    )}
            ${this._hint("“Only while heating or cooling” follows what the system is doing right now; the other also lights up while it waits at the setpoint.")}
            ${this._group("Look")}
            ${this._slider("effects.size", "Glow size", 2, 60, 1, ht.size)}
            ${this._slider("effects.speed", "Pulse speed", 0.6, 8, 0.2, ht.speed, (r) => `${r.toFixed(1)}s`)}
            ${this._color("effects.heat_color", "Heating colour", "Theme heat", "#ff8100")}
            ${this._color("effects.cool_color", "Cooling colour", "Theme cool", "#2b9af9")}
          ` : d}
    `;
  }
  _cardBody() {
    return c`
      ${this._hint("The card’s own surface.")}
      ${this._color("card.background", "Background", "Theme card", "#1c1c1c")}
      ${this._color("card.border_color", "Border", "Theme", "#444444")}
      ${this._slider("card.border_width", "Border width", 0, 8, 1, 1)}
      ${this._slider("card.radius", "Corner radius", 0, 48, 1, 16)}
      ${this._slider("card.padding", "Padding", 0, 40, 1, 16)}
    `;
  }
};
Vt.styles = [
  ue(mo),
  fe`
      :host { display: block; }
    `
];
let N = Vt;
it([
  jt({ attribute: !1 })
], N.prototype, "hass");
it([
  E()
], N.prototype, "_config");
it([
  E()
], N.prototype, "_open");
it([
  E()
], N.prototype, "_set");
it([
  E()
], N.prototype, "_chip");
customElements.get(St) || customElements.define(St, N);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ze = { ATTRIBUTE: 1 }, Ce = (n) => (...t) => ({ _$litDirective$: n, values: t });
let Te = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, o) {
    this._$Ct = t, this._$AM = e, this._$Ci = o;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = "important", Vo = " !" + Me, y = Ce(class extends Te {
  constructor(n) {
    if (super(n), n.type !== ze.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((t, e) => {
      const o = n[e];
      return o == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`;
    }, "");
  }
  update(n, [t]) {
    const { style: e } = n.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const o of this.ft) t[o] == null && (this.ft.delete(o), o.includes("-") ? e.removeProperty(o) : e[o] = null);
    for (const o in t) {
      const i = t[o];
      if (i != null) {
        this.ft.add(o);
        const r = typeof i == "string" && i.endsWith(Vo);
        o.includes("-") || r ? e.setProperty(o, r ? i.slice(0, -11) : i, r ? Me : "") : e[o] = i;
      }
    }
    return L;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = Ce(class extends Te {
  constructor(n) {
    if (super(n), n.type !== ze.ATTRIBUTE || n.name !== "class" || n.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return " " + Object.keys(n).filter((t) => n[t]).join(" ") + " ";
  }
  update(n, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), n.strings !== void 0 && (this.nt = new Set(n.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t) t[o] && !this.nt?.has(o) && this.st.add(o);
      return this.render(t);
    }
    const e = n.element.classList;
    for (const o of this.st) o in t || (e.remove(o), this.st.delete(o));
    for (const o in t) {
      const i = !!t[o];
      i === this.st.has(o) || this.nt?.has(o) || (i ? (e.add(o), this.st.add(o)) : (e.remove(o), this.st.delete(o)));
    }
    return L;
  }
}), Wo = 1, Go = 0.5, Yo = 3, Ko = 1.5;
function Xo(n) {
  return n.includes("C") ? Go : Wo;
}
function Zo(n, t) {
  return t.setpoint?.min_gap ?? (n.includes("C") ? Ko : Yo);
}
function Re(n) {
  return Math.round(n * 100) / 100;
}
function D(n, t, e, o) {
  let i = o > 0 ? Re(Math.round(n / o) * o) : n;
  return t !== null && i < t && (i = t), e !== null && i > e && (i = e), i;
}
function at(n, t, e, o, i) {
  return { setpoint: n, value: D(t, e, o, i), min: e, max: o, step: i };
}
function yt(n, t, e) {
  return { available: !1, unit: n, mode: t, heat: null, cool: null, active: e, minGap: 0 };
}
function Jo(n, t) {
  const e = n.config?.unit_system?.temperature ?? "°", o = n.states[t.entity], i = o ? Se(o.state) : "unknown";
  if (!o || i !== "heat" && i !== "cool" && i !== "heat_cool")
    return yt(e, i, "heat");
  const r = o.attributes, s = Xo(e), a = Zo(e, t), l = S(r.min_temp), h = S(r.max_temp);
  if (i === "heat_cool") {
    const u = S(r.target_temp_low), m = S(r.target_temp_high);
    if (u === null && m === null) return yt(e, i, "cool");
    const b = u !== null ? at("heat", u, l, h, s) : null, f = m !== null ? at("cool", m, l, h, s) : null;
    return { available: !0, unit: e, mode: i, heat: b, cool: f, active: f ? "cool" : "heat", minGap: a };
  }
  const p = S(r.temperature);
  return p === null ? yt(e, i, i === "heat" ? "heat" : "cool") : i === "heat" ? {
    available: !0,
    unit: e,
    mode: i,
    heat: at("heat", p, l, h, s),
    cool: null,
    active: "heat",
    minGap: a
  } : {
    available: !0,
    unit: e,
    mode: i,
    heat: null,
    cool: at("cool", p, l, h, s),
    active: "cool",
    minGap: a
  };
}
function $t(n) {
  return n[n.active];
}
function qt(n, t) {
  const e = $t(n);
  if (!e) return n;
  const o = n.mode === "heat_cool" ? n[e.setpoint === "cool" ? "heat" : "cool"] : null;
  if (!o) {
    const a = { ...e, value: D(t, e.min, e.max, e.step) };
    return { ...n, [e.setpoint]: a };
  }
  const i = n.minGap;
  let r = D(t, e.min, e.max, e.step), s = o.value;
  if (e.setpoint === "cool") {
    if (r - o.value < i) {
      let a = r - i;
      o.min !== null && a < o.min && (a = o.min, r = D(o.min + i, e.min, e.max, e.step)), s = D(a, o.min, o.max, o.step);
    }
  } else if (o.value - r < i) {
    let a = r + i;
    o.max !== null && a > o.max && (a = o.max, r = D(o.max - i, e.min, e.max, e.step)), s = D(a, o.min, o.max, o.step);
  }
  return {
    ...n,
    [e.setpoint]: { ...e, value: r },
    [o.setpoint]: { ...o, value: s }
  };
}
function V(n, t) {
  const e = $t(n);
  return e ? qt(n, e.value + t * e.step) : n;
}
function pe(n, t) {
  return $t(n) ? qt(n, t) : n;
}
function Qo(n, t, e, o) {
  const i = $t(n);
  if (!i) return n;
  const r = Math.round(e / o);
  return qt(n, t + r * i.step);
}
function X(n, t) {
  return n[t] === null ? n : { ...n, active: t };
}
function ti(n, t) {
  const e = [];
  for (let o = -t; o <= t; o++) {
    const i = Re(n.value + o * n.step);
    n.min !== null && i < n.min || n.max !== null && i > n.max || e.push(i);
  }
  return e;
}
function ei(n, t) {
  if (!n.available) return null;
  const e = { entity_id: t };
  if (n.mode === "heat_cool")
    n.heat && (e.target_temp_low = n.heat.value), n.cool && (e.target_temp_high = n.cool.value);
  else {
    const o = n.heat ?? n.cool;
    if (!o) return null;
    e.temperature = o.value;
  }
  return { domain: "climate", service: "set_temperature", data: e };
}
const oi = 600, ii = 8e3;
function ni(n, t) {
  return n.heat?.value === t.heat?.value && n.cool?.value === t.cool?.value;
}
class ri {
  constructor(t, e, o) {
    this.entityId = t, this.send = e, this.changed = o, this.edit = null, this.dragging = !1, this.pending = null, this.writeTimer = null, this.reconcileTimer = null, this.latest = null;
  }
  /** Feed the model derived from the latest hass. */
  sync(t) {
    if (this.latest = t, this.dragging || this.pending && t.mode === this.pending.mode && !ni(t, this.pending))
      return;
    const e = this.edit && t[this.edit.active] ? this.edit.active : t.active;
    this.edit = { ...t, active: e }, this.pending = null, this.clearReconcile();
  }
  /** Live preview without scheduling a write (used during a drag). */
  preview(t) {
    this.edit = t, this.changed();
  }
  commit(t) {
    this.edit = t, this.pending = t, this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = setTimeout(() => this.flush(), oi), this.changed();
  }
  /** Change only which setpoint is edited (no write). */
  select(t) {
    this.edit = t, this.pending && (this.pending = { ...this.pending, active: t.active }), this.changed();
  }
  flush() {
    this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = null;
    const t = this.edit ? ei(this.edit, this.entityId()) : null;
    t && this.send(t), this.clearReconcile(), this.reconcileTimer = setTimeout(() => {
      if (this.reconcileTimer = null, this.pending = null, this.latest) {
        const e = this.edit?.active;
        this.edit = { ...this.latest, active: e && this.latest[e] ? e : this.latest.active }, this.changed();
      }
    }, ii);
  }
  /** On disconnect: send anything still queued, drop timers. */
  dispose() {
    this.writeTimer && this.flush(), this.clearReconcile(), this.pending = null;
  }
  clearReconcile() {
    this.reconcileTimer && clearTimeout(this.reconcileTimer), this.reconcileTimer = null;
  }
}
function kt(n, t) {
  const e = n.heat ?? n.cool, o = n.unit.includes("C");
  let i = t?.range_min ?? e?.min ?? (o ? 10 : 50), r = t?.range_max ?? e?.max ?? (o ? 32 : 90);
  r > i || (r = i + (o ? 10 : 20));
  for (const s of [n.heat, n.cool])
    s && (i = Math.min(i, s.value), r = Math.max(r, s.value));
  return { min: i, max: r };
}
function gt(n, t) {
  return Math.min(1, Math.max(0, (n - t.min) / (t.max - t.min)));
}
function si(n, t) {
  return t.min + Math.min(1, Math.max(0, n)) * (t.max - t.min);
}
function ai(n, t, e) {
  const o = t > 0 ? t : e > 0 ? e : 0;
  if (o <= 0) return [];
  const i = [], r = Math.ceil(n.min / o) * o;
  if ((n.max - r) / o > 200) return [];
  for (let s = r; s <= n.max + 1e-9; s = Math.round((s + o) * 1e3) / 1e3) {
    const a = e > 0 && Math.abs(s / e - Math.round(s / e)) < 1e-6;
    i.push({ value: s, fraction: gt(s, n), label: a });
  }
  return i;
}
function li(n, t, e) {
  if (!n.heat) return "cool";
  if (!n.cool) return "heat";
  const o = Math.abs(gt(n.heat.value, e) - t), i = Math.abs(gt(n.cool.value, e) - t);
  return Math.abs(o - i) < 1e-6 ? n.active : o < i ? "heat" : "cool";
}
const ci = fe`
  :host {
    display: block;
    --etc-heat: var(--state-climate-heat-color, #ff8100);
    --etc-cool: var(--state-climate-cool-color, #2b9af9);
    --etc-fg: var(--primary-text-color, #e1e1e1);
    --etc-muted: var(--secondary-text-color, #9b9b9b);
    --etc-surface: color-mix(in srgb, var(--primary-text-color, #fff) 6%, transparent);
  }
  ha-card {
    position: relative;
    overflow: hidden;
    background: var(--etc-card-bg, var(--ha-card-background, var(--card-background-color)));
    border-radius: var(--etc-card-r, var(--ha-card-border-radius, 16px));
    border: var(--etc-card-bw, var(--ha-card-border-width, 1px)) solid
      var(--etc-card-bc, var(--ha-card-border-color, var(--divider-color, transparent)));
    padding: var(--etc-card-pad, 16px);
    box-sizing: border-box;
    transition: box-shadow 600ms ease;
    container-type: inline-size;
  }
  /* ---- heating / cooling effects (model/effects.ts) ----
     fx-on + fx-heat|fx-cool say which side is active; fx-<target>-glow|pulse
     say which parts glow or pulse. --fx-c is the active colour. */
  ha-card {
    --fx-size: 18px;
    --fx-speed: 2.4s;
  }
  ha-card.fx-heat { --fx-c: var(--fx-heat, var(--etc-heat)); }
  ha-card.fx-cool { --fx-c: var(--fx-cool, var(--etc-cool)); }
  ha-card {
    --fx-shadow: 0 0 var(--fx-size) calc(var(--fx-size) / 6) color-mix(in srgb, var(--fx-c) 55%, transparent);
    --fx-shadow-in: 0 0 0 1px color-mix(in srgb, var(--fx-c) 55%, transparent);
  }

  /* Entire card */
  ha-card.fx-card-glow { box-shadow: var(--fx-shadow-in), 0 0 calc(var(--fx-size) * 1.2) calc(var(--fx-size) / -5) color-mix(in srgb, var(--fx-c) 65%, transparent); }
  ha-card.fx-card-pulse { animation: etc-fx-card var(--fx-speed) ease-in-out infinite; }
  ha-card.fx-card-glow.fx-card-pulse { animation-name: etc-fx-card-strong; }

  /* Setpoint value: the wheel centre, the stepper number, the bar handle. */
  ha-card.fx-heat.fx-setpoint-glow :is(.bubble.heat, .wheel-pill.heat, .handle.heat),
  ha-card.fx-cool.fx-setpoint-glow :is(.bubble.cool, .wheel-pill.cool, .handle.cool) { box-shadow: var(--fx-shadow); }
  ha-card.fx-heat.fx-setpoint-glow .stepper.heat .sv,
  ha-card.fx-cool.fx-setpoint-glow .stepper.cool .sv { text-shadow: 0 0 calc(var(--fx-size) / 1.5) var(--fx-c); }
  ha-card.fx-heat.fx-setpoint-pulse :is(.bubble.heat, .wheel-pill.heat, .stepper.heat .sv),
  ha-card.fx-cool.fx-setpoint-pulse :is(.bubble.cool, .wheel-pill.cool, .stepper.cool .sv) {
    animation: etc-fx-breathe var(--fx-speed) ease-in-out infinite;
  }

  /* Setpoint pill (and the heat/cool switch that stands in for it). */
  ha-card.fx-heat.fx-pill-glow :is(.pills .pill.heat, .hc.heat),
  ha-card.fx-cool.fx-pill-glow :is(.pills .pill.cool, .hc.cool) { box-shadow: var(--fx-shadow); }
  ha-card.fx-heat.fx-pill-pulse :is(.pills .pill.heat, .hc.heat),
  ha-card.fx-cool.fx-pill-pulse :is(.pills .pill.cool, .hc.cool) { animation: etc-fx-ring var(--fx-speed) ease-out infinite; }
  ha-card.fx-heat.fx-pill-glow.fx-pill-pulse :is(.pills .pill.heat, .hc.heat),
  ha-card.fx-cool.fx-pill-glow.fx-pill-pulse :is(.pills .pill.cool, .hc.cool) { animation-name: etc-fx-ring-glow; }

  /* Mode button: the active HVAC button, or the Mode menu's button. */
  ha-card.fx-mode_button-glow :is(.t-hvac .btn.active, .menu.t-hvac .mt) { box-shadow: var(--fx-shadow); }
  ha-card.fx-mode_button-pulse :is(.t-hvac .btn.active, .menu.t-hvac .mt) { animation: etc-fx-ring var(--fx-speed) ease-out infinite; }
  ha-card.fx-mode_button-glow.fx-mode_button-pulse :is(.t-hvac .btn.active, .menu.t-hvac .mt) { animation-name: etc-fx-ring-glow; }

  /* Mode icon: the icon in that button (or the button itself when icon-only). */
  ha-card.fx-mode_icon-glow :is(.t-hvac .btn.active, .menu.t-hvac .mt) > ha-icon {
    filter: drop-shadow(0 0 calc(var(--fx-size) / 3) var(--fx-c)) drop-shadow(0 0 calc(var(--fx-size) / 6) var(--fx-c));
  }
  ha-card.fx-mode_icon-pulse :is(.t-hvac .btn.active, .menu.t-hvac .mt) > ha-icon { animation: etc-fx-icon var(--fx-speed) ease-in-out infinite; }

  @keyframes etc-fx-card {
    0%, 100% { box-shadow: 0 0 0 0 transparent; }
    50% { box-shadow: 0 0 0 1px color-mix(in srgb, var(--fx-c) 55%, transparent), 0 0 calc(var(--fx-size) * 1.2) 0 color-mix(in srgb, var(--fx-c) 55%, transparent); }
  }
  @keyframes etc-fx-card-strong {
    0%, 100% { box-shadow: var(--fx-shadow-in), 0 0 calc(var(--fx-size) * 0.6) calc(var(--fx-size) / -5) color-mix(in srgb, var(--fx-c) 45%, transparent); }
    50% { box-shadow: var(--fx-shadow-in), 0 0 calc(var(--fx-size) * 1.8) calc(var(--fx-size) / 6) color-mix(in srgb, var(--fx-c) 80%, transparent); }
  }
  @keyframes etc-fx-breathe {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.06); filter: brightness(1.18); }
  }
  /* The handle is positioned by its transform, so it pulses with a ring instead. */
  ha-card.fx-heat.fx-setpoint-pulse .handle.heat,
  ha-card.fx-cool.fx-setpoint-pulse .handle.cool { animation: etc-fx-handle var(--fx-speed) ease-in-out infinite; }
  @keyframes etc-fx-handle {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--fx-c) 60%, transparent), 0 1px 4px rgba(0, 0, 0, 0.45); }
    50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--fx-c) 0%, transparent), 0 1px 4px rgba(0, 0, 0, 0.45); }
  }
  @keyframes etc-fx-ring {
    0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--fx-c) 60%, transparent); }
    70%, 100% { box-shadow: 0 0 0 calc(var(--fx-size) / 2) color-mix(in srgb, var(--fx-c) 0%, transparent); }
  }
  @keyframes etc-fx-ring-glow {
    0% { box-shadow: var(--fx-shadow), 0 0 0 0 color-mix(in srgb, var(--fx-c) 60%, transparent); }
    70%, 100% { box-shadow: var(--fx-shadow), 0 0 0 calc(var(--fx-size) / 2) color-mix(in srgb, var(--fx-c) 0%, transparent); }
  }
  @keyframes etc-fx-icon {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.18); opacity: 0.75; }
  }
  @media (prefers-reduced-motion: reduce) {
    ha-card, ha-card * { animation: none !important; }
  }

  .grid {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas:
      'top top top'
      'left core right'
      'bottom bottom bottom';
    gap: 12px;
  }
  .zone {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }
  .zone.top { grid-area: top; }
  .zone.bottom { grid-area: bottom; }
  .zone.left { grid-area: left; flex-direction: row; align-items: center; }
  .zone.right { grid-area: right; flex-direction: row; align-items: center; }
  .core { grid-area: core; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  .core-row { display: flex; align-items: center; gap: 16px; min-width: 0; }
  .core.al-center .core-row { justify-content: center; }
  .core.al-right .core-row { justify-content: flex-end; }
  .main { display: flex; flex-direction: column; min-width: 0; }
  .core.al-center .main { align-items: center; text-align: center; }
  .core.al-right .main { align-items: flex-end; text-align: right; }
  .core.al-left .core-row { justify-content: flex-start; }
  .ctl-center { display: flex; justify-content: center; }

  /* ---- text roles ---- */
  .name {
    font-size: var(--etc-t-name-fs, 16px);
    font-weight: var(--etc-t-name-fw, 500);
    color: var(--etc-t-name-c, var(--etc-fg));
    text-transform: var(--etc-t-name-tt, none);
    letter-spacing: var(--etc-t-name-ls, normal);
    font-style: var(--etc-t-name-fst, normal);
    opacity: var(--etc-t-name-op, 1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--etc-t-status-fs, 12px);
    font-weight: var(--etc-t-status-fw, 500);
    color: var(--etc-t-status-c, var(--etc-muted));
    text-transform: var(--etc-t-status-tt, uppercase);
    letter-spacing: var(--etc-t-status-ls, 0.06em);
    font-style: var(--etc-t-status-fst, normal);
    opacity: var(--etc-t-status-op, 1);
    --mdc-icon-size: 16px;
  }
  .status.eq-heating { color: var(--etc-t-status-c, var(--etc-heat)); }
  .status.eq-cooling { color: var(--etc-t-status-c, var(--etc-cool)); }
  .humidity {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: var(--etc-t-hum-fs, 15px);
    font-weight: var(--etc-t-hum-fw, 400);
    color: var(--etc-t-hum-c, var(--etc-cool));
    text-transform: var(--etc-t-hum-tt, none);
    letter-spacing: var(--etc-t-hum-ls, normal);
    font-style: var(--etc-t-hum-fst, normal);
    opacity: var(--etc-t-hum-op, 1);
    --mdc-icon-size: 16px;
  }
  .current {
    line-height: 1;
    font-size: calc(var(--etc-t-cur-fs, 72px) * var(--etc-scale, 1));
    font-weight: var(--etc-t-cur-fw, 200);
    color: var(--etc-t-cur-c, var(--etc-fg));
    text-transform: var(--etc-t-cur-tt, none);
    letter-spacing: var(--etc-t-cur-ls, -0.02em);
    font-style: var(--etc-t-cur-fst, normal);
    opacity: var(--etc-t-cur-op, 1);
    font-variant-numeric: tabular-nums;
    margin: 4px 0;
  }
  .current.eq-heating { color: var(--etc-t-cur-c, color-mix(in srgb, var(--etc-heat) 35%, var(--etc-fg))); }
  .current.eq-cooling { color: var(--etc-t-cur-c, color-mix(in srgb, var(--etc-cool) 35%, var(--etc-fg))); }
  .unit {
    font-size: var(--etc-t-unit-fs, 0.4em);
    font-weight: var(--etc-t-unit-fw, 300);
    color: var(--etc-t-unit-c, var(--etc-muted));
    text-transform: var(--etc-t-unit-tt, none);
    letter-spacing: var(--etc-t-unit-ls, normal);
    font-style: var(--etc-t-unit-fst, normal);
    opacity: var(--etc-t-unit-op, 1);
    vertical-align: top;
    margin-left: 2px;
  }

  /* ---- tap-to-reveal ---- */
  button.current { background: none; border: none; padding: 0; font-family: inherit; cursor: pointer; border-radius: 12px; }
  button.current.tappable:hover { filter: brightness(1.12); }
  button.current:focus-visible, .collapsed:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 4px; }
  .tappable { -webkit-tap-highlight-color: transparent; }
  .collapsed { background: none; border: none; padding: 0; font: inherit; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
  .collapsed .bubble { transition: transform 120ms ease; }
  .collapsed:hover .bubble { transform: scale(1.04); }
  .collapsed .sv { color: var(--c); }
  .bar-c { display: block; cursor: pointer; width: 100%; }
  .core-row > .bar-c { width: auto; }
  .track.ro { cursor: pointer; }
  .in-current { display: flex; justify-content: center; margin: 4px 0; }
  .core.al-left .in-current { justify-content: flex-start; }
  .core.al-right .in-current { justify-content: flex-end; }
  .in-current > .bar { width: 100%; min-width: 220px; }

  /* ---- status beside the temperature ---- */
  .cur-row { display: flex; align-items: center; gap: 12px; }
  .core.al-center .cur-row { justify-content: center; }
  .core.al-right .cur-row { justify-content: flex-end; }
  .status.sp-beside { flex-direction: column; gap: 2px; --mdc-icon-size: 22px; }
  .status.sp-below { margin-top: 2px; }

  /* ---- setpoint pills ---- */
  .pills { display: flex; gap: 8px; flex-wrap: wrap; justify-content: inherit; }
  .core.al-center .pills { justify-content: center; }
  .pill {
    --c: var(--etc-heat);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    border-radius: 999px;
    border: 2px solid color-mix(in srgb, var(--c) 80%, transparent);
    background: color-mix(in srgb, var(--c) 14%, transparent);
    color: var(--etc-t-pill-c, var(--c));
    font: inherit;
    font-size: var(--etc-t-pill-fs, 20px);
    font-weight: var(--etc-t-pill-fw, 700);
    text-transform: var(--etc-t-pill-tt, none);
    letter-spacing: var(--etc-t-pill-ls, normal);
    font-style: var(--etc-t-pill-fst, normal);
    opacity: var(--etc-t-pill-op, 1);
    font-variant-numeric: tabular-nums;
    --mdc-icon-size: 18px;
  }
  .pill.cool { --c: var(--etc-cool); }
  button.pill { cursor: pointer; }
  .pill.dim { opacity: 0.5; border-style: dashed; }

  /* ---- wheel (ecosee scrubber, inline) ---- */
  .wheel { display: flex; align-items: center; gap: calc(10px * var(--etc-scale, 1)); }
  .wheel.nudge-stacked { flex-direction: column; }
  .wheel-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(4px * var(--etc-scale, 1));
    touch-action: none;
    cursor: ns-resize;
    user-select: none;
    outline: none;
    border-radius: 16px;
  }
  .wheel-col:focus-visible { box-shadow: 0 0 0 2px var(--primary-color); }
  .nb {
    font-size: calc(var(--etc-t-wn-fs, 20px) * var(--etc-scale, 1));
    font-weight: var(--etc-t-wn-fw, 300);
    color: var(--etc-t-wn-c, var(--etc-muted));
    text-transform: var(--etc-t-wn-tt, none);
    letter-spacing: var(--etc-t-wn-ls, normal);
    font-style: var(--etc-t-wn-fst, normal);
    opacity: var(--etc-t-wn-op, 0.75);
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }
  .nb.far { font-size: calc(var(--etc-t-wn-fs, 20px) * 0.8 * var(--etc-scale, 1)); opacity: calc(var(--etc-t-wn-op, 0.75) * 0.55); }
  .bubble {
    --c: var(--etc-heat);
    min-width: calc(64px * var(--etc-scale, 1));
    padding: calc(8px * var(--etc-scale, 1)) calc(14px * var(--etc-scale, 1));
    border-radius: calc(18px * var(--etc-scale, 1));
    text-align: center;
    background: linear-gradient(160deg, color-mix(in srgb, var(--c) 75%, #fff), var(--c));
    color: var(--etc-t-wv-c, #fff);
    font-size: calc(var(--etc-t-wv-fs, 34px) * var(--etc-scale, 1));
    font-weight: var(--etc-t-wv-fw, 300);
    text-transform: var(--etc-t-wv-tt, none);
    letter-spacing: var(--etc-t-wv-ls, normal);
    font-style: var(--etc-t-wv-fst, normal);
    opacity: var(--etc-t-wv-op, 1);
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }
  .bubble.cool, .stepper.cool .sv { --c: var(--etc-cool); }
  /* Wheel centre as a pill (same look as the setpoint pills, scaled with the wheel). */
  .wheel-pill {
    font-size: calc(var(--etc-t-wv-fs, 28px) * var(--etc-scale, 1));
    padding: calc(6px * var(--etc-scale, 1)) calc(18px * var(--etc-scale, 1));
    --mdc-icon-size: calc(22px * var(--etc-scale, 1));
    line-height: 1.15;
  }
  .nudges { display: flex; flex-direction: column; gap: calc(12px * var(--etc-scale, 1)); }
  .round {
    --c: var(--etc-heat);
    width: calc(40px * var(--etc-scale, 1));
    height: calc(40px * var(--etc-scale, 1));
    border-radius: 50%;
    border: 2px solid var(--c);
    background: transparent;
    color: var(--c);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    --mdc-icon-size: calc(22px * var(--etc-scale, 1));
  }
  .round.cool { --c: var(--etc-cool); }
  .round:disabled { opacity: 0.35; cursor: default; }
  .round:hover:not(:disabled) { background: color-mix(in srgb, var(--c) 14%, transparent); }

  /* ---- heat/cool switch (Heat/Cool with the pills hidden) ---- */
  .ctl-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .hc-switch { display: inline-flex; gap: 4px; padding: 3px; border-radius: 999px; background: var(--etc-surface); }
  .hc {
    --c: var(--etc-heat);
    display: inline-flex; align-items: center; gap: 3px;
    padding: 3px 10px; border: none; border-radius: 999px;
    background: transparent; color: var(--etc-muted);
    font: inherit; font-size: 13px; font-weight: 600; font-variant-numeric: tabular-nums;
    cursor: pointer; --mdc-icon-size: 14px;
  }
  .hc.cool { --c: var(--etc-cool); }
  .hc.on { background: color-mix(in srgb, var(--c) 22%, transparent); color: var(--c); }

  /* ---- stepper ---- */
  .stepper { display: flex; align-items: center; gap: calc(12px * var(--etc-scale, 1)); }
  .sv {
    --c: var(--etc-heat);
    color: var(--etc-t-wv-c, var(--c));
    font-size: calc(var(--etc-t-wv-fs, 34px) * var(--etc-scale, 1));
    font-weight: var(--etc-t-wv-fw, 400);
    font-variant-numeric: tabular-nums;
    min-width: 2.4em;
    text-align: center;
  }

  /* ---- setpoint bar ---- */
  .bar { padding: 26px 10px 4px; user-select: none; }
  .bar.no-flags { padding-top: 6px; }
  .track {
    position: relative;
    height: var(--etc-bar-h, 14px);
    border-radius: 999px;
    background: var(--etc-surface);
    touch-action: none;
    cursor: pointer;
  }
  .seg { position: absolute; top: 0; bottom: 0; border-radius: inherit; }
  .seg.heat { left: 0; background: color-mix(in srgb, var(--bar-heat, var(--etc-heat)) 55%, transparent); }
  .seg.cool { right: 0; background: color-mix(in srgb, var(--bar-cool, var(--etc-cool)) 55%, transparent); }
  .seg.comfort { background: color-mix(in srgb, var(--bar-comfort, #4caf50) 35%, transparent); }
  .handle {
    --c: var(--etc-heat);
    position: absolute;
    top: 50%;
    width: calc(var(--etc-bar-h, 14px) + 10px);
    height: calc(var(--etc-bar-h, 14px) + 10px);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: var(--bar-handle, #fff);
    border: var(--bar-hbw, 3px) solid var(--bar-hbc, var(--c));
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
    box-sizing: border-box;
    outline: none;
  }
  .handle.cool { --c: var(--etc-cool); }
  .handle.s-square { border-radius: 4px; }
  .handle.s-diamond { transform: translate(-50%, -50%) rotate(45deg); border-radius: 3px; }
  .handle.s-line { width: 6px; border-radius: 3px; height: calc(var(--etc-bar-h, 14px) + 14px); }
  .handle.active, .handle:focus-visible { box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 35%, transparent), 0 1px 4px rgba(0, 0, 0, 0.45); }
  .flag {
    --c: var(--etc-heat);
    position: absolute;
    bottom: calc(100% + 10px);
    transform: translateX(-50%);
    background: var(--bar-flag, var(--c));
    color: var(--bar-flag-fg, #fff);
    border-radius: 6px;
    padding: 1px 7px;
    font-size: var(--etc-t-bar-fs, 12px);
    font-weight: 700;
    white-space: nowrap;
    pointer-events: none;
  }
  .flag::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--bar-flag, var(--c));
  }
  .flag.cool { --c: var(--etc-cool); }
  .marker {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 2px;
    transform: translateX(-50%);
    background: var(--etc-fg);
    border-radius: 1px;
    pointer-events: none;
  }
  .ticks { position: relative; height: 22px; margin-top: 4px; }
  .tick { position: absolute; top: 0; width: 1px; height: 4px; background: var(--etc-muted); opacity: 0.5; transform: translateX(-50%); }
  .tick.lbl { height: 7px; opacity: 0.9; }
  .tick-l {
    position: absolute;
    top: 8px;
    transform: translateX(-50%);
    font-size: var(--etc-t-bar-fs, 11px);
    font-weight: var(--etc-t-bar-fw, 400);
    color: var(--etc-t-bar-c, var(--etc-muted));
    opacity: var(--etc-t-bar-op, 1);
    font-variant-numeric: tabular-nums;
  }

  /* ---- vertical bar (beside the core; bottom = cold) ---- */
  .bar.vertical {
    display: flex;
    align-items: stretch;
    height: var(--etc-bar-len, 200px);
    padding: 12px 0 12px 46px;
    flex: none;
  }
  .bar.vertical.no-flags { padding-left: 4px; }
  .bar.vertical .track { width: var(--etc-bar-h, 14px); height: 100%; flex: none; }
  .bar.vertical .seg { left: 0; right: 0; top: auto; bottom: auto; }
  .bar.vertical .seg.heat { bottom: 0; }
  .seg.full, .bar.vertical .seg.full { inset: 0; }
  .bar.vertical .handle { top: auto; left: 50%; transform: translate(-50%, 50%); }
  .bar.vertical .handle.s-diamond { transform: translate(-50%, 50%) rotate(45deg); }
  .bar.vertical .handle.s-line { width: calc(var(--etc-bar-h, 14px) + 14px); height: 6px; }
  .bar.vertical .flag { bottom: auto; right: calc(100% + 14px); transform: translateY(50%); }
  .bar.vertical .flag::after { left: 100%; top: 50%; transform: translateY(-50%); border-top-color: transparent; border-left-color: var(--bar-flag, var(--c)); }
  /* ---- flag and tick sides (independent; same side → flags go outside the labels) ---- */
  .bar.horizontal { display: flex; flex-direction: column; }
  .bar.horizontal.ticks-above .ticks { order: -1; margin: 0 0 4px; }
  .bar.horizontal.ticks-above .tick { top: auto; bottom: 0; }
  .bar.horizontal.ticks-above .tick-l { top: auto; bottom: 8px; }
  .bar.horizontal.flags-above.ticks-above .flag { bottom: calc(100% + 36px); }
  .bar.horizontal.flags-below { padding-top: 6px; }
  .bar.horizontal.flags-below .flag { bottom: auto; top: calc(100% + 10px); }
  .bar.horizontal.flags-below .flag::after { top: auto; bottom: 100%; border-top-color: transparent; border-bottom-color: var(--bar-flag, var(--c)); }
  .bar.horizontal.flags-below.ticks-below .ticks { margin-top: 34px; }
  .bar.horizontal.flags-below.ticks-above { padding-bottom: 32px; }

  .bar.vertical.ticks-left .ticks { order: -1; margin: 0 6px 0 0; }
  .bar.vertical.ticks-left .tick { left: auto; right: 0; }
  .bar.vertical.ticks-left .tick-l { left: auto; right: 10px; }
  .bar.vertical.flags-left.ticks-left { padding-left: 56px; }
  .bar.vertical.flags-left.ticks-left .flag { right: calc(100% + 50px); }
  .bar.vertical.flags-right { padding: 12px 46px 12px 4px; }
  .bar.vertical.flags-right .flag { right: auto; left: calc(100% + 14px); }
  .bar.vertical.flags-right .flag::after { left: auto; right: 100%; border-left-color: transparent; border-right-color: var(--bar-flag, var(--c)); }
  .bar.vertical.flags-right.ticks-right { padding-right: 56px; }
  .bar.vertical.flags-right.ticks-right .flag { left: calc(100% + 50px); }
  .bar.vertical .marker { top: auto; left: -4px; right: -4px; width: auto; height: 2px; transform: translateY(50%); }
  .bar.vertical .ticks { height: 100%; width: 30px; margin: 0 0 0 6px; }
  .bar.vertical .tick { top: auto; left: 0; width: 4px; height: 1px; transform: translateY(50%); }
  .bar.vertical .tick.lbl { width: 7px; height: 1px; }
  .bar.vertical .tick-l { top: auto; left: 10px; transform: translateY(50%); }

  /* ---- button sets ---- */
  .set { min-width: 0; gap: var(--etc-b-gap, 8px); }
  .set.grid { display: grid; }
  .set.flex { display: flex; flex-wrap: wrap; }
  .set.o-column { flex-direction: column; flex-wrap: nowrap; }
  .set.a-start { justify-content: flex-start; }
  .set.a-center { justify-content: center; }
  .set.a-end { justify-content: flex-end; }
  .btn {
    --c: var(--primary-color, #03a9f4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-width: var(--etc-b-minw, 52px);
    min-height: var(--etc-b-height, 0);
    padding: 8px 10px;
    border-radius: var(--etc-b-radius, 14px);
    border: var(--etc-b-bw, 0px) solid var(--etc-b-bc, transparent);
    background: var(--etc-b-bg, var(--etc-surface));
    color: var(--etc-b-fg, var(--etc-muted));
    font: inherit;
    font-size: var(--etc-b-fs, 13px);
    font-weight: var(--etc-b-fw, 500);
    cursor: pointer;
    transition: background 160ms ease, color 160ms ease, border-color 160ms ease, transform 80ms ease;
    --mdc-icon-size: var(--etc-b-icon, 22px);
    box-sizing: border-box;
    min-inline-size: 0;
    -webkit-tap-highlight-color: transparent;
  }
  .btn:active { transform: scale(0.97); }
  .btn:hover { color: var(--etc-b-fg, var(--etc-fg)); }
  .ip-left .btn { flex-direction: row; gap: 5px; padding: 6px 8px; }
  .btn .lbl { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
  .v-tonal .btn.active {
    background: var(--etc-b-abg, color-mix(in srgb, var(--c) 22%, transparent));
    color: var(--etc-b-afg, var(--c));
    border-color: var(--etc-b-abc, color-mix(in srgb, var(--c) 50%, transparent));
  }
  .v-filled .btn.active {
    background: var(--etc-b-abg, var(--c));
    color: var(--etc-b-afg, #fff);
    border-color: var(--etc-b-abc, var(--c));
  }
  .v-outlined .btn { background: var(--etc-b-bg, transparent); border: max(var(--etc-b-bw, 1px), 1px) solid var(--etc-b-bc, color-mix(in srgb, var(--divider-color, #555) 70%, transparent)); }
  .v-outlined .btn.active { color: var(--etc-b-afg, var(--c)); border-color: var(--etc-b-abc, var(--c)); background: var(--etc-b-abg, transparent); }
  .v-ghost .btn { background: var(--etc-b-bg, transparent); }
  .v-ghost .btn:hover, .v-ghost .btn:focus-visible { background: var(--etc-b-bg, var(--etc-surface)); }
  .v-ghost .btn.active { color: var(--etc-b-afg, var(--c)); background: var(--etc-b-abg, transparent); }

  /* ---- expandable menus ---- */
  .menus { display: flex; flex-wrap: wrap; gap: var(--etc-b-gap, 8px); justify-content: center; }
  .menus.z-left, .menus.z-right { flex-direction: column; }
  .menu { position: relative; }
  .mt {
    --c: var(--primary-color, #03a9f4);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: var(--etc-b-minw, 120px);
    min-height: var(--etc-b-height, 0);
    padding: 10px 18px 10px 14px;
    border-radius: var(--etc-b-radius, 14px);
    border: var(--etc-b-bw, 0px) solid var(--etc-b-bc, transparent);
    background: var(--etc-b-bg, var(--etc-surface));
    color: var(--etc-b-fg, var(--etc-fg));
    font: inherit;
    text-align: left;
    cursor: pointer;
    --mdc-icon-size: var(--etc-b-icon, 22px);
    -webkit-tap-highlight-color: transparent;
  }
  .v-outlined .mt { background: var(--etc-b-bg, transparent); border: max(var(--etc-b-bw, 1px), 1px) solid var(--etc-b-bc, color-mix(in srgb, var(--divider-color, #555) 70%, transparent)); }
  .v-ghost .mt { background: var(--etc-b-bg, transparent); }
  .mt.has-active > ha-icon { color: var(--etc-b-afg, var(--c)); }
  .menu.open .mt, .mt[aria-expanded='true'] { border-color: var(--etc-b-abc, color-mix(in srgb, var(--c) 50%, transparent)); }
  .mt-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.2; }
  .mt-name { font-size: 12px; color: var(--etc-muted); }
  .mt-value { font-size: calc(var(--etc-b-fs, 13px) + 3px); font-weight: var(--etc-b-fw, 500); white-space: nowrap; }
  .menu-list {
    flex-direction: column;
    gap: 2px;
    padding: 6px;
    margin: 0;
    border-radius: calc(var(--etc-b-radius, 14px) - 2px);
    border: 1px solid var(--divider-color, #444);
    background: var(--card-background-color, #1c1c1c);
    color: var(--etc-fg);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
    box-sizing: border-box;
    max-height: 70vh;
    overflow: auto;
  }
  .menu-list[popover] { position: fixed; inset: auto; }
  .menu-list[popover]:popover-open { display: flex; }
  /* Fallback without the Popover API: absolute inside the card. */
  .menu-list:not([popover]) { display: none; position: absolute; z-index: 5; min-width: 100%; }
  .menu.open .menu-list:not([popover]) { display: flex; }
  .d-down .menu-list:not([popover]) { top: calc(100% + 6px); left: 0; }
  .d-up .menu-list:not([popover]) { bottom: calc(100% + 6px); left: 0; }
  .d-right .menu-list:not([popover]) { left: calc(100% + 6px); top: 0; }
  .d-left .menu-list:not([popover]) { right: calc(100% + 6px); top: 0; }
  .mi {
    --c: var(--primary-color, #03a9f4);
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 16px 10px 12px;
    border: none;
    border-radius: calc(var(--etc-b-radius, 14px) - 6px);
    background: transparent;
    color: var(--etc-b-fg, var(--etc-fg));
    font: inherit;
    font-size: calc(var(--etc-b-fs, 13px) + 3px);
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    --mdc-icon-size: var(--etc-b-icon, 22px);
  }
  .mi > ha-icon { color: var(--etc-muted); }
  .mi:hover, .mi:focus-visible { background: var(--etc-surface); outline: none; }
  .mi.active { background: var(--etc-b-abg, color-mix(in srgb, var(--c) 18%, transparent)); color: var(--etc-b-afg, var(--c)); }
  .mi.active > ha-icon { color: var(--etc-b-afg, var(--c)); }
  .v-filled .mi.active { background: var(--etc-b-abg, var(--c)); color: var(--etc-b-afg, #fff); }
  .v-filled .mi.active > ha-icon { color: var(--etc-b-afg, #fff); }

  /* ---- toggles (compact) ---- */
  .toggles { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
  .tgl {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid var(--divider-color, #444);
    background: transparent;
    color: var(--etc-muted);
    font: inherit;
    font-size: 12px;
    cursor: pointer;
    --mdc-icon-size: 18px;
  }
  .tgl.open { color: var(--primary-color); border-color: var(--primary-color); background: color-mix(in srgb, var(--primary-color) 12%, transparent); }
  .tgl .chev { --mdc-icon-size: 16px; transition: transform 160ms ease; }
  .tgl.open .chev { transform: rotate(180deg); }

  /* ---- chips ---- */
  .chip {
    --c: var(--primary-color, #03a9f4);
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px 6px 8px;
    border-radius: 999px;
    border: 1px solid var(--etc-b-bc, var(--divider-color, #444));
    background: var(--etc-b-bg, transparent);
    color: var(--etc-b-fg, var(--etc-muted));
    font: inherit;
    font-size: var(--etc-b-fs, 13px);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    --mdc-icon-size: var(--etc-b-icon, 22px);
  }
  .chip.on { color: var(--etc-b-afg, var(--c)); border-color: var(--etc-b-abc, color-mix(in srgb, var(--c) 55%, transparent)); background: var(--etc-b-abg, color-mix(in srgb, var(--c) 12%, transparent)); }
  .chip.unavailable { opacity: 0.45; }
  .chip .spin { animation: etc-spin var(--spin, 1.5s) linear infinite; }
  .chip.rev .spin { animation-direction: reverse; }
  .chip .badge { font-weight: 700; font-variant-numeric: tabular-nums; }
  .chip .badge.natural { display: inline-flex; align-items: center; gap: 1px; color: #7ccf8a; --mdc-icon-size: 15px; }
  .chip .extra { display: inline-flex; align-items: center; gap: 2px; --mdc-icon-size: 14px; opacity: 0.85; font-size: 11px; }
  .chip .extra.light { color: #ffc107; }
  @keyframes etc-spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .chip .spin { animation: none; } }

  .unavailable-msg { color: var(--etc-muted); padding: 8px 0; text-align: center; }

  /* ---- pop-up (native dialog → top layer, above HA's own dialogs) ---- */
  dialog.popup {
    border: none;
    padding: 0;
    background: transparent;
    width: min(520px, 94vw);
    max-height: 90vh;
    overflow: visible;
  }
  dialog.popup::backdrop { background: rgba(0, 0, 0, 0.55); }
  .popup-inner {
    position: relative;
    background: var(--card-background-color, #1c1c1c);
    border-radius: var(--ha-card-border-radius, 16px);
    max-height: 90vh;
    overflow: auto;
  }
  .popup-close {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 2;
    border: none;
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    --mdc-icon-size: 20px;
  }
`;
var hi = Object.defineProperty, F = (n, t, e, o) => {
  for (var i = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = s(t, e, i) || i);
  return i && hi(t, e, i), i;
};
const pi = 18, di = 500, Wt = class Wt extends G {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(), this._tick = 0, this._popupOpen = !1, this._menu = null, this._revealed = !1, this._revealTimer = null, this._sp = new ri(
      () => this._config?.entity ?? "",
      (t) => this._call(t),
      () => {
        this._tick += 1, this._revealed && this._armReveal();
      }
    ), this._drag = null, this._barDrag = null, this._hold = null, this._wheelDown = (t) => {
      const e = this._sp.edit, o = e?.[e.active];
      if (!o) return;
      const i = t.currentTarget;
      i.focus({ preventScroll: !0 }), this._drag = { startY: t.clientY, startValue: o.value }, this._sp.dragging = !0, this._armReveal(), i.setPointerCapture?.(t.pointerId);
    }, this._wheelMove = (t) => {
      !this._drag || !this._sp.edit || this._sp.preview(Qo(this._sp.edit, this._drag.startValue, t.clientY - this._drag.startY, pi));
    }, this._wheelUp = (t) => {
      const e = this._drag;
      if (!e) return;
      this._drag = null, this._sp.dragging = !1;
      const o = t.currentTarget;
      o.hasPointerCapture?.(t.pointerId) && o.releasePointerCapture(t.pointerId);
      const i = this._sp.edit;
      i && i[i.active]?.value !== e.startValue && this._sp.commit(i);
    }, this._wheelKey = (t) => {
      const e = this._sp.edit;
      e && (t.key === "ArrowUp" || t.key === "ArrowRight" ? (t.preventDefault(), this._sp.commit(V(e, 1))) : (t.key === "ArrowDown" || t.key === "ArrowLeft") && (t.preventDefault(), this._sp.commit(V(e, -1))));
    }, this._wheelScroll = (t) => {
      const e = this._sp.edit;
      !e || Math.abs(t.deltaY) < 4 || (t.preventDefault(), this._sp.commit(V(e, t.deltaY < 0 ? 1 : -1)));
    }, this._barDown = (t) => {
      const e = this._sp.edit;
      if (!e?.available) return;
      const o = t.currentTarget, i = o.getBoundingClientRect(), r = kt(e, this._config?.setpoint?.bar), s = this._barFraction(t, i), a = li(e, s, r);
      this._barDrag = { handle: a, rect: i }, this._sp.dragging = !0, this._armReveal(), o.setPointerCapture?.(t.pointerId), this._sp.preview(pe(X(e, a), this._barValueAt(t, i)));
    }, this._barMove = (t) => {
      !this._barDrag || !this._sp.edit || this._sp.preview(pe(this._sp.edit, this._barValueAt(t, this._barDrag.rect)));
    }, this._barUp = (t) => {
      if (!this._barDrag) return;
      this._barDrag = null, this._sp.dragging = !1;
      const e = t.currentTarget;
      e.hasPointerCapture?.(t.pointerId) && e.releasePointerCapture(t.pointerId), this._sp.edit && this._sp.commit(this._sp.edit);
    }, this._menuKey = (t) => {
      const e = [...t.currentTarget.querySelectorAll(".mi")], o = e.indexOf(this.renderRoot.activeElement);
      if (t.key === "ArrowDown" || t.key === "ArrowRight") e[(o + 1) % e.length]?.focus();
      else if (t.key === "ArrowUp" || t.key === "ArrowLeft") e[(o - 1 + e.length) % e.length]?.focus();
      else if (t.key === "Escape") this._closeMenus();
      else return;
      t.preventDefault();
    }, this._chipCancelHold = () => {
      this._hold && !this._hold.fired && clearTimeout(this._hold.timer);
    }, this._closePopup = () => {
      const t = this.renderRoot.querySelector("dialog.popup");
      t?.open && t.close(), this._popupOpen = !1, this._popupEl = void 0;
    };
  }
  // ---- Lovelace contract ----------------------------------------------------
  setConfig(t) {
    this._config = At(t), this._open = this._loadOpen();
  }
  static getConfigElement() {
    return document.createElement(St);
  }
  static getStubConfig(t) {
    return { entity: Object.keys(t?.states ?? {}).find((o) => o.startsWith("climate.")) ?? "climate.thermostat" };
  }
  getCardSize() {
    return 5;
  }
  getGridOptions() {
    return { columns: 6, min_columns: 4, rows: "auto" };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._sp.dispose(), this._revealTimer && clearTimeout(this._revealTimer);
  }
  willUpdate(t) {
    (t.has("hass") || t.has("_config")) && this.hass && this._config && this._sp.sync(Jo(this.hass, this._config)), t.has("hass") && this._popupEl && this.hass && (this._popupEl.hass = this.hass);
  }
  /** Only re-render for state that this card reads (not every hass push). */
  shouldUpdate(t) {
    if (!t.has("hass") || t.size > 1) return !0;
    const e = t.get("hass");
    return !e || !this.hass || !this._config ? !0 : this._watched().some((o) => e.states[o] !== this.hass.states[o]);
  }
  _watched() {
    const t = this._config, e = [t.entity];
    for (const o of t.sets ?? []) for (const i of o.chips ?? []) e.push(i.entity);
    if (this.hass)
      for (const o of t.sets ?? [])
        for (const i of o.chips ?? []) {
          if (i.type !== "rf_fan") continue;
          const r = Rt(this.hass, i, 0);
          r.lightEntity && e.push(r.lightEntity);
        }
    return e;
  }
  // ---- helpers --------------------------------------------------------------
  _call(t) {
    this.hass?.callService(t.domain, t.service, t.data).catch((e) => {
      console.error(`[easy-thermostat-styler-card] ${t.domain}.${t.service} failed`, e);
    });
  }
  _fire(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  _openKey() {
    return `easy-thermostat-styler-card:open:${this._config?.entity ?? ""}`;
  }
  _loadOpen() {
    try {
      const t = window.localStorage?.getItem(this._openKey());
      return new Set(t ? JSON.parse(t) : []);
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }
  _toggleSet(t) {
    const e = new Set(this._open);
    e.has(t) ? e.delete(t) : e.add(t), this._open = e;
    try {
      window.localStorage?.setItem(this._openKey(), JSON.stringify([...e]));
    } catch {
    }
  }
  // ---- render ---------------------------------------------------------------
  render() {
    if (!this._config || !this.hass) return d;
    const t = this._config, e = _o(this.hass, t), o = ho(this.hass, t), i = {
      [`eq-${e.equipment ?? "none"}`]: !0,
      [`mode-${e.mode}`]: !0,
      ...Bo(t, e)
    }, r = { ...fo(t), ...uo(t.text), ...this._barVars(), ...Lo(t) }, s = { top: [], bottom: [], left: [], right: [] }, a = o.filter((p) => p.display === "toggle"), l = { top: [], bottom: [], left: [], right: [] };
    for (const p of o) p.display === "menu" && l[p.zone].push(p);
    for (const p of o) {
      if (p.display === "menu") {
        l[p.zone][0] === p && s[p.zone].push(this._renderMenuRow(l[p.zone], p.zone));
        continue;
      }
      p.display === "toggle" && !this._open.has(p.key) || s[p.zone].push(this._renderSet(p));
    }
    const h = t.toggles_zone ?? g.toggles_zone;
    return a.length && s[h].push(this._renderToggles(a)), c`
      <ha-card class=${xt(i)} style=${y(r)}>
        <div class="grid">
          ${["top", "left"].map((p) => this._zone(p, s[p]))}
          ${this._renderCore(e)}
          ${["right", "bottom"].map((p) => this._zone(p, s[p]))}
        </div>
        ${this._renderPopup()}
      </ha-card>
    `;
  }
  _zone(t, e) {
    return e.length ? c`<div class="zone ${t}">${e}</div>` : d;
  }
  _barVars() {
    const t = this._config?.setpoint?.bar ?? {}, e = {};
    return t.height && (e["--etc-bar-h"] = `${t.height}px`), t.length && (e["--etc-bar-len"] = `${t.length}px`), t.heat_color && (e["--bar-heat"] = t.heat_color), t.cool_color && (e["--bar-cool"] = t.cool_color), t.comfort_color && (e["--bar-comfort"] = t.comfort_color), t.handle_color && (e["--bar-handle"] = t.handle_color), t.handle_border_color === "none" ? e["--bar-hbw"] = "0px" : t.handle_border_color && (e["--bar-hbc"] = t.handle_border_color), t.flag_color && (e["--bar-flag"] = t.flag_color), t.flag_text_color && (e["--bar-flag-fg"] = t.flag_text_color), e;
  }
  // ---- core -----------------------------------------------------------------
  /** Tap-to-reveal is on (and there is a control to reveal). */
  _tapMode() {
    const t = this._config?.setpoint ?? {};
    return (t.reveal ?? g.reveal) === "tap" && (t.control ?? g.control) !== "none";
  }
  _setRevealed(t) {
    this._revealed = t, this._armReveal();
  }
  /** (Re)start the auto-close countdown; called on every interaction. */
  _armReveal() {
    if (this._revealTimer && clearTimeout(this._revealTimer), this._revealTimer = null, !this._revealed || !this._tapMode()) return;
    const t = this._config?.setpoint?.hide_after ?? g.hide_after;
    t <= 0 || (this._revealTimer = setTimeout(() => {
      if (this._revealTimer = null, this._sp.dragging) {
        this._armReveal();
        return;
      }
      this._revealed = !1;
    }, t * 1e3));
  }
  _renderCore(t) {
    const e = this._config, o = e.setpoint ?? {}, i = o.control ?? g.control, r = o.position ?? g.position, s = e.core_align ?? g.core_align, a = this._sp.edit, l = !!a?.available && i !== "none", h = o.bar?.position ?? g.bar.position, p = h === "above", u = h === "left" || h === "right", m = t.equipment ? `eq-${t.equipment}` : "", b = l && this._tapMode(), f = !b || this._revealed, v = o.reveal_from ?? g.reveal_from, $ = b && (v === "both" || v === "current"), x = b && (v === "both" || v === "pills"), w = b && f && (o.open_in ?? g.open_in) === "current", M = l ? i === "bar" ? this._renderBar(a, t) : this._renderControl(a, i) : null;
    let z = null;
    l && (b ? f ? z = w ? null : M : (o.collapsed ?? g.collapsed) === "visual" && (z = this._renderCollapsed(a, t, i)) : z = M);
    const _ = i !== "bar" ? z : null, k = i === "bar" ? z : null;
    if (!t.available)
      return c`<div class="core al-${s}">
        <div class="main">
          ${e.show_name ?? g.show_name ? c`<div class="name">${t.name}</div>` : d}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    const nt = c`${C(t.currentTemp, t.unit)}<span class="unit">${t.unit}</span>`, rt = e.status_position ?? g.status_position, st = (e.show_status ?? g.show_status) && t.equipment ? c`<div class="status ${m} sp-${rt}">
            <ha-icon icon=${It[t.state] ?? "mdi:thermostat"}></ha-icon>${$o[t.equipment]}
          </div>` : d, Gt = w ? c`<div class="in-current">${M}</div>` : e.show_current ?? g.show_current ? $ ? c`<button
              class="current tappable ${m}"
              aria-expanded=${f}
              aria-label="Show temperature controls"
              @click=${() => this._setRevealed(!this._revealed)}
            >
              ${nt}
            </button>` : c`<div class="current ${m}">${nt}</div>` : d, Pe = c`<div class="main">
      ${e.show_name ?? g.show_name ? c`<div class="name">${t.name}</div>` : d}
      ${rt === "above" ? st : d}
      ${(e.show_humidity ?? g.show_humidity) && t.humidity !== null ? c`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(t.humidity)}%</div>` : d}
      ${rt === "beside" && st !== d ? c`<div class="cur-row">${Gt}${st}</div>` : Gt}
      ${rt === "below" ? st : d}
      ${(e.show_pills ?? g.show_pills) && a?.available ? this._renderPills(a, x, f) : d}
    </div>`;
    return c`<div class="core al-${s} pos-${r}">
      ${k && p ? k : d}
      <div class="core-row">
        ${k && h === "left" ? k : d} ${_ && r === "left" ? _ : d} ${Pe}
        ${_ && r === "right" ? _ : d} ${k && h === "right" ? k : d}
      </div>
      ${_ && r === "center" ? c`<div class="ctl-center">${_}</div>` : d}
      ${k && !p && !u ? k : d}
    </div>`;
  }
  /** The control's own value while it is folded away; tap to open. */
  _renderCollapsed(t, e, o) {
    const i = t[t.active];
    if (!i) return d;
    const r = () => this._setRevealed(!0);
    if (o === "bar")
      return c`<div
        class="collapsed bar-c"
        role="button"
        tabindex="0"
        aria-label="Show temperature controls"
        @click=${r}
        @keydown=${(a) => {
        (a.key === "Enter" || a.key === " ") && (a.preventDefault(), r());
      }}
      >
        ${this._renderBar(t, e, !0)}
      </div>`;
    const s = C(i.value, t.unit);
    return c`<button class="collapsed" aria-label="Show temperature controls" @click=${r}>
      ${o === "wheel" ? this._wheelCentre(t.active, s) : c`<span class="sv" style=${y({ "--c": t.active === "cool" ? "var(--etc-cool)" : "var(--etc-heat)" })}
            >${s}</span
          >`}
    </button>`;
  }
  /** `tapOpens`: the pills open the control (tap-to-reveal). In Heat/Cool a
   *  pill also picks which setpoint the wheel/stepper edits. */
  _renderPills(t, e = !1, o = !0) {
    const i = !!(t.heat && t.cool), r = (s) => {
      const a = t[s];
      if (!a) return d;
      const l = c`<ha-icon icon=${s === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${C(
        a.value,
        t.unit
      )}`, h = i && t.active !== s && this._usesActive() && o;
      return !i && !e ? c`<div class="pill ${s}">${l}</div>` : c`<button
        class="pill ${s} ${h ? "dim" : ""} ${e ? "tappable" : ""}"
        aria-pressed=${i ? String(t.active === s) : d}
        aria-expanded=${e ? String(o) : d}
        aria-label=${`${s === "heat" ? "Heat" : "Cool"} setpoint`}
        @click=${() => this._pillTap(t, s, i, e, o)}
      >
        ${l}
      </button>`;
    };
    return c`<div class="pills">${r("heat")} ${r("cool")}</div>`;
  }
  _pillTap(t, e, o, i, r) {
    o && this._sp.select(X(t, e)), i && (r ? !o || t.active === e ? this._setRevealed(!1) : this._armReveal() : this._setRevealed(!0));
  }
  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  _usesActive() {
    const t = this._config?.setpoint?.control ?? g.control;
    return t === "wheel" || t === "stepper";
  }
  _renderControl(t, e) {
    const o = t[t.active];
    if (!o) return d;
    const i = t.active, r = c`<button
      class="round ${i}"
      aria-label="Increase"
      ?disabled=${o.max !== null && o.value >= o.max}
      @click=${() => this._sp.commit(V(t, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`, s = c`<button
      class="round ${i}"
      aria-label="Decrease"
      ?disabled=${o.min !== null && o.value <= o.min}
      @click=${() => this._sp.commit(V(t, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`, l = (this._config?.show_pills ?? g.show_pills) === !1 && t.heat && t.cool ? c`<div class="hc-switch" role="group" aria-label="Setpoint">
            ${["heat", "cool"].map(
      (w) => c`<button
                class="hc ${w} ${t.active === w ? "on" : ""}"
                aria-pressed=${String(t.active === w)}
                aria-label=${w === "heat" ? "Edit heat setpoint" : "Edit cool setpoint"}
                @click=${() => {
        this._sp.select(X(t, w)), this._armReveal();
      }}
              >
                <ha-icon icon=${w === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${C(t[w].value, t.unit)}
              </button>`
    )}
          </div>` : d;
    if (e === "stepper")
      return c`<div class="ctl-wrap">${l}<div class="stepper ${i}">
        ${s}<span class="sv">${C(o.value, t.unit)}</span>${r}
      </div></div>`;
    const h = this._config?.setpoint ?? {}, p = h.neighbors ?? g.neighbors, u = h.nudge ?? g.nudge, m = ti(o, p), b = m.filter((w) => w > o.value).reverse(), f = m.filter((w) => w < o.value).reverse(), v = (w) => c`<div class="nb ${Math.abs(w - o.value) > o.step * 1.5 ? "far" : ""}">${C(w, t.unit)}</div>`, $ = c`<div
      class="wheel-col"
      role="slider"
      tabindex="0"
      aria-label=${`${i === "cool" ? "Cool" : "Heat"} setpoint`}
      aria-valuenow=${o.value}
      aria-valuemin=${o.min ?? d}
      aria-valuemax=${o.max ?? d}
      aria-valuetext=${C(o.value, t.unit)}
      @pointerdown=${this._wheelDown}
      @pointermove=${this._wheelMove}
      @pointerup=${this._wheelUp}
      @pointercancel=${this._wheelUp}
      @keydown=${this._wheelKey}
      @wheel=${this._wheelScroll}
    >
      ${b.map(v)}
      ${this._wheelCentre(i, C(o.value, t.unit))}
      ${f.map(v)}
    </div>`, x = u === "hidden" ? c`<div class="wheel">${$}</div>` : u === "stacked" ? c`<div class="wheel nudge-stacked">${r}${$}${s}</div>` : c`<div class="wheel">${$}<div class="nudges">${r}${s}</div></div>`;
    return l === d ? x : c`<div class="ctl-wrap">${l}${x}</div>`;
  }
  _wheelCentre(t, e) {
    return (this._config?.setpoint?.wheel_style ?? g.wheel_style) === "pill" ? c`<div class="pill wheel-pill ${t}">
        <ha-icon icon=${t === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${e}
      </div>` : c`<div class="bubble ${t}">${e}</div>`;
  }
  // ---- bar ------------------------------------------------------------------
  _renderBar(t, e, o = !1) {
    const i = { ...g.bar, ...this._config?.setpoint?.bar ?? {} }, r = kt(t, i), s = (_) => `${(gt(_, r) * 100).toFixed(3)}%`, a = i.position === "left" || i.position === "right", l = (_) => a ? { bottom: _ } : { left: _ }, h = a ? "height" : "width", p = a ? "top" : "right", u = t.heat, m = t.cool, b = ai(r, i.ticks ?? 0, i.labels ?? 0), f = [];
    if (i.look === "gradient") {
      const _ = i.stops?.length ? i.stops : ["#2b9af9", "#7ccf8a", "#ff8100"];
      f.push(c`<div class="seg full" style=${y({ background: `linear-gradient(to ${a ? "top" : "right"}, ${_.join(", ")})` })}></div>`);
    } else
      u && f.push(c`<div class="seg heat" style=${y({ [h]: s(u.value) })}></div>`), m && f.push(c`<div class="seg cool" style=${y({ ...l(s(m.value)), [p]: "0" })}></div>`), u && m && f.push(c`<div class="seg comfort" style=${y({ ...l(s(u.value)), [p]: `calc(100% - ${s(m.value)})` })}></div>`);
    const v = (_) => {
      const k = t[_];
      return k ? c`
        ${i.flags ? c`<div class="flag ${_}" style=${y(l(s(k.value)))}>${C(k.value, t.unit)}°</div>` : d}
        <div
          class="handle ${_} s-${i.handle_shape ?? "round"} ${t.active === _ && u && m ? "active" : ""}"
          style=${y(l(s(k.value)))}
          role=${o ? d : "slider"}
          aria-orientation=${a ? "vertical" : "horizontal"}
          tabindex=${o ? d : "0"}
          aria-label=${`${_ === "heat" ? "Heat" : "Cool"} setpoint`}
          aria-valuenow=${k.value}
          aria-valuemin=${r.min}
          aria-valuemax=${r.max}
          @focus=${() => this._sp.select(X(this._sp.edit, _))}
          @keydown=${(nt) => this._barKey(nt, _)}
        ></div>
      ` : d;
    }, $ = e.currentTemp, x = i.show_current && $ !== null && $ >= r.min && $ <= r.max ? c`<div class="marker" style=${y(l(s($)))} title="Current"></div>` : d, w = o ? c`<div class="track ro">${f}${x}${v("heat")} ${v("cool")}</div>` : c`<div
          class="track"
          @pointerdown=${this._barDown}
          @pointermove=${this._barMove}
          @pointerup=${this._barUp}
          @pointercancel=${this._barUp}
        >
          ${f}${x}${v("heat")} ${v("cool")}
        </div>`, M = a ? i.flag_position === "right" ? "right" : "left" : i.flag_position === "below" ? "below" : "above", z = a ? i.tick_position === "left" ? "left" : "right" : i.tick_position === "above" ? "above" : "below";
    return c`<div class="bar ${a ? `vertical side-${i.position}` : "horizontal"} ${i.flags ? `flags-${M}` : "no-flags"} ticks-${z}">
      ${w}
      ${b.length ? c`<div class="ticks">
            ${b.map(
      (_) => c`<div class="tick ${_.label ? "lbl" : ""}" style=${y(l(`${_.fraction * 100}%`))}></div>
                ${_.label ? c`<div class="tick-l" style=${y(l(`${_.fraction * 100}%`))}>${_.value}</div>` : d}`
    )}
          </div>` : d}
    </div>`;
  }
  _barVertical() {
    const t = this._config?.setpoint?.bar?.position;
    return t === "left" || t === "right";
  }
  /** Pointer position as a 0–1 fraction along the bar (vertical: bottom = 0). */
  _barFraction(t, e) {
    return this._barVertical() ? (e.bottom - t.clientY) / Math.max(1, e.height) : (t.clientX - e.left) / Math.max(1, e.width);
  }
  _barValueAt(t, e) {
    const o = this._sp.edit, i = kt(o, this._config?.setpoint?.bar);
    return si(this._barFraction(t, e), i);
  }
  _barKey(t, e) {
    const o = this._sp.edit;
    if (!o) return;
    const i = t.key === "ArrowUp" || t.key === "ArrowRight" ? 1 : t.key === "ArrowDown" || t.key === "ArrowLeft" ? -1 : 0;
    i && (t.preventDefault(), this._sp.commit(V(X(o, e), i)));
  }
  // ---- button sets ------------------------------------------------------------
  _renderSet(t) {
    const e = Tt(this._config?.buttons, t.config.style), o = t.type !== "chips" && t.orientation === "row" && t.align === "stretch", i = { ...le(e) };
    o && (i["grid-template-columns"] = t.columns ? `repeat(${t.columns}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))");
    const r = {
      set: !0,
      grid: o,
      flex: !o,
      [`t-${t.type}`]: !0,
      [`o-${t.orientation}`]: !0,
      [`a-${t.align}`]: !0,
      [`v-${e.variant}`]: !0,
      [`ip-${e.icon_position}`]: !0
    };
    if (t.type === "chips") {
      const l = (t.config.chips ?? []).map((h, p) => Rt(this.hass, h, p));
      return c`<div class=${xt(r)} style=${y(i)} role="group" aria-label=${t.title}>
        ${l.map((h) => this._renderChip(h, e.content))}
      </div>`;
    }
    const s = e.content !== "label", a = e.content !== "icon";
    return c`<div class=${xt(r)} style=${y(i)} role="group" aria-label=${t.title}>
      ${t.options.map(
      (l) => c`<button
          class="btn ${l.active ? "active" : ""}"
          style=${y({ "--c": l.color })}
          aria-pressed=${l.active}
          title=${l.label}
          @click=${() => {
        const h = ae(t.type, this._config.entity, l.value);
        h && this._call(h);
      }}
        >
          ${s ? c`<ha-icon icon=${l.icon}></ha-icon>` : d}
          ${a ? c`<span class="lbl">${l.label}</span>` : d}
        </button>`
    )}
    </div>`;
  }
  // ---- expandable menus -------------------------------------------------------
  _renderMenuRow(t, e) {
    return c`<div class="menus z-${e}">${t.map((o) => this._renderMenu(o))}</div>`;
  }
  _renderMenu(t) {
    const e = Tt(this._config?.buttons, t.config.style), o = t.options.find((a) => a.active), i = e.content !== "label", r = this._menu === t.key, s = typeof HTMLElement < "u" && "showPopover" in HTMLElement.prototype;
    return c`<div class="menu t-${t.type} ${r ? "open" : ""} d-${t.menuDirection} v-${e.variant}" style=${y(le(e))}>
      <button
        class="mt ${o ? "has-active" : ""}"
        style=${y({ "--c": o?.color ?? "var(--primary-color)" })}
        aria-haspopup="listbox"
        aria-expanded=${r}
        aria-label=${`${t.title}: ${o?.label ?? ""}`}
        @click=${(a) => this._toggleMenu(t, a.currentTarget)}
      >
        ${i ? c`<ha-icon icon=${o?.icon ?? t.toggleIcon}></ha-icon>` : d}
        <span class="mt-text">
          ${t.menuShowName ? c`<span class="mt-name">${t.title}</span>` : d}
          <span class="mt-value">${o?.label ?? "—"}</span>
        </span>
      </button>
      <div
        class="menu-list"
        role="listbox"
        aria-label=${t.title}
        data-key=${t.key}
        popover=${s ? "auto" : d}
        @toggle=${(a) => this._menuToggled(t, a)}
        @keydown=${this._menuKey}
      >
        ${t.options.map(
      (a) => c`<button
            class="mi ${a.active ? "active" : ""}"
            role="option"
            aria-selected=${a.active}
            style=${y({ "--c": a.color })}
            @click=${() => this._pickMenu(t, a.value)}
          >
            ${i ? c`<ha-icon icon=${a.icon}></ha-icon>` : d}<span>${a.label}</span>
          </button>`
    )}
      </div>
    </div>`;
  }
  _menuList(t) {
    return this.renderRoot.querySelector(`.menu-list[data-key="${t}"]`);
  }
  _toggleMenu(t, e) {
    const o = this._menuList(t.key);
    if (!o) return;
    if (!("showPopover" in o)) {
      this._menu = this._menu === t.key ? null : t.key;
      return;
    }
    const i = o;
    if (o.matches(":popover-open")) {
      i.hidePopover();
      return;
    }
    i.showPopover(), this._placeMenu(o, e, t.menuDirection), this._menu = t.key, (o.querySelector(".mi.active") ?? o.querySelector(".mi"))?.focus({ preventScroll: !0 });
  }
  /** Fixed-position the top-layer list next to its trigger, kept on screen. */
  _placeMenu(t, e, o) {
    const i = e.getBoundingClientRect(), r = 6, s = window.innerWidth, a = window.innerHeight;
    t.style.minWidth = o === "up" || o === "down" ? `${Math.round(i.width)}px` : "";
    const l = t.getBoundingClientRect();
    let h = o === "right" ? i.right + r : o === "left" ? i.left - r - l.width : i.left, p = o === "down" ? i.bottom + r : o === "up" ? i.top - r - l.height : i.top;
    o === "down" && p + l.height > a && (p = i.top - r - l.height), o === "up" && p < 0 && (p = i.bottom + r), o === "right" && h + l.width > s && (h = i.left - r - l.width), o === "left" && h < 0 && (h = i.right + r), h = Math.max(4, Math.min(h, s - l.width - 4)), p = Math.max(4, Math.min(p, a - l.height - 4)), t.style.left = `${Math.round(h)}px`, t.style.top = `${Math.round(p)}px`;
  }
  _menuToggled(t, e) {
    !(e.newState === "open") && this._menu === t.key && (this._menu = null);
  }
  _closeMenus() {
    for (const t of this.renderRoot.querySelectorAll(".menu-list"))
      t.hidePopover && t.matches(":popover-open") && t.hidePopover();
    this._menu = null;
  }
  _pickMenu(t, e) {
    const o = ae(t.type, this._config.entity, e);
    o && this._call(o), this._fire("haptic", "light"), this._closeMenus();
  }
  _renderToggles(t) {
    return c`<div class="toggles">
      ${t.map((e) => {
      const o = this._open.has(e.key);
      return c`<button class="tgl ${o ? "open" : ""}" aria-expanded=${o} @click=${() => this._toggleSet(e.key)}>
          <ha-icon icon=${e.toggleIcon}></ha-icon><span>${e.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
    })}
    </div>`;
  }
  // ---- chips --------------------------------------------------------------------
  _renderChip(t, e) {
    const o = t.config.show_name ?? e !== "icon", i = t.config.show_state ?? !0, r = t.type === "rf_fan";
    return c`<button
      class="chip ${t.on ? "on" : ""} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
      aria-label=${`${t.name}: ${t.state}`}
      title=${`${t.name}: ${t.state}`}
      @pointerdown=${(s) => this._chipDown(s, t)}
      @pointerup=${this._chipCancelHold}
      @pointerleave=${this._chipCancelHold}
      @pointercancel=${this._chipCancelHold}
      @click=${() => this._chipTap(t)}
      @contextmenu=${(s) => s.preventDefault()}
    >
      <ha-icon class=${t.spin ? "spin" : ""} style=${y(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>
      ${o ? c`<span>${t.name}</span>` : d}
      ${r && t.natural ? c`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
            ><ha-icon icon="mdi:leaf"></ha-icon>${i && t.naturalLevel !== null ? t.naturalLevel : d}</span
          >` : i && (!r || t.speed !== null || !t.on) ? c`<span class="badge">${t.state}</span>` : d}
      ${r && t.lightOn ? c`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : d}
      ${r && t.timerEnds ? c`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${Co(t.timerEnds)}</span>` : d}
    </button>`;
  }
  _chipDown(t, e) {
    if (t.pointerType === "mouse" && t.button !== 0 || (this._chipCancelHold(), e.hold === "none")) return;
    const o = { fired: !1, timer: setTimeout(() => {
      o.fired = !0, this._chipAction(e, e.hold), this._fire("haptic", "medium");
    }, di) };
    this._hold = o;
  }
  _chipTap(t) {
    if (this._hold?.fired) {
      this._hold = null;
      return;
    }
    this._hold = null, this._chipAction(t, t.tap);
  }
  _chipAction(t, e) {
    switch (e) {
      case "popup": {
        const o = Mo(t.config);
        o && this._canCreate(o) ? this._showPopup(o) : this._fire("hass-more-info", { entityId: t.entity });
        break;
      }
      case "more-info":
        this._fire("hass-more-info", { entityId: t.entity });
        break;
      case "toggle":
      case "toggle_light": {
        const o = Ro(t, e);
        o && this._call(o);
        break;
      }
    }
  }
  // ---- pop-up ------------------------------------------------------------------
  _canCreate(t) {
    const e = String(t.type ?? "");
    return !e.startsWith("custom:") || !!customElements.get(e.slice(7));
  }
  async _showPopup(t) {
    let e;
    try {
      const r = window.loadCardHelpers;
      if (r) e = (await r()).createCardElement(t);
      else {
        const s = String(t.type);
        e = document.createElement(s.startsWith("custom:") ? s.slice(7) : `hui-${s}-card`), e.setConfig?.(t);
      }
    } catch (r) {
      console.error("[easy-thermostat-styler-card] pop-up card failed", r);
      return;
    }
    e.hass = this.hass, this._popupEl = e, this._popupOpen = !0, await this.updateComplete;
    const o = this.renderRoot.querySelector("dialog.popup"), i = this.renderRoot.querySelector(".popup-body");
    !o || !i || (i.replaceChildren(e), o.open || o.showModal?.());
  }
  _renderPopup() {
    return this._popupOpen ? c`<dialog
      class="popup"
      @cancel=${this._closePopup}
      @click=${(t) => {
      t.target === t.currentTarget && this._closePopup();
    }}
    >
      <div class="popup-inner">
        <button class="popup-close" aria-label="Close" @click=${this._closePopup}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="popup-body"></div>
      </div>
    </dialog>` : d;
  }
};
Wt.styles = ci;
let A = Wt;
F([
  jt({ attribute: !1 })
], A.prototype, "hass");
F([
  E()
], A.prototype, "_config");
F([
  E()
], A.prototype, "_open");
F([
  E()
], A.prototype, "_tick");
F([
  E()
], A.prototype, "_popupOpen");
F([
  E()
], A.prototype, "_menu");
F([
  E()
], A.prototype, "_revealed");
customElements.get(ft) || customElements.define(ft, A);
const bt = window;
bt.customCards = bt.customCards ?? [];
bt.customCards.some((n) => n.type === ft) || bt.customCards.push({
  type: ft,
  name: "Easy Thermostat Styler Card (Ltek)",
  description: "A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.",
  preview: !0
});
console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${_e} `, "background:#ff8100;color:#fff", "background:#333;color:#fff");
