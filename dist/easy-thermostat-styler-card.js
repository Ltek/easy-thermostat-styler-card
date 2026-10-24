/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, bt = K.ShadowRoot && (K.ShadyCSS === void 0 || K.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _t = Symbol(), zt = /* @__PURE__ */ new WeakMap();
let Wt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== _t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (bt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = zt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && zt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Yt = (n) => new Wt(typeof n == "string" ? n : n + "", void 0, _t), Gt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, o, s) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[s + 1], n[0]);
  return new Wt(e, n, _t);
}, me = (n, t) => {
  if (bt) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = K.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, n.appendChild(i);
  }
}, Ot = bt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Yt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ge, defineProperty: ve, getOwnPropertyDescriptor: be, getOwnPropertyNames: _e, getOwnPropertySymbols: $e, getPrototypeOf: ye } = Object, rt = globalThis, Rt = rt.trustedTypes, we = Rt ? Rt.emptyScript : "", xe = rt.reactiveElementPolyfillSupport, D = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? we : null;
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
} }, $t = (n, t) => !ge(n, t), Mt = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: $t };
Symbol.metadata ??= Symbol("metadata"), rt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Mt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && ve(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: s } = be(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: o, set(r) {
      const a = o?.call(this);
      s?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = ye(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const e = this.properties, i = [..._e(e), ...$e(e)];
      for (const o of i) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, o] of e) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const o = this._$Eu(e, i);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) e.unshift(Ot(o));
    } else t !== void 0 && e.push(Ot(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return me(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (i.converter?.toAttribute !== void 0 ? i.converter : Q).toAttribute(e, i.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = i.getPropertyOptions(o), r = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Q;
      this._$Em = o;
      const a = r.fromAttribute(e, s.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, s) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? $t)(s, e) || i.useDefault && i.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: s }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), s !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: r } = s, a = this[o];
        r !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, s, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[D("elementProperties")] = /* @__PURE__ */ new Map(), U[D("finalized")] = /* @__PURE__ */ new Map(), xe?.({ ReactiveElement: U }), (rt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis, Pt = (n) => n, tt = yt.trustedTypes, Ut = tt ? tt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Kt = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Xt = "?" + x, ke = `<${Xt}>`, R = document, j = () => R.createComment(""), I = (n) => n === null || typeof n != "object" && typeof n != "function", wt = Array.isArray, Se = (n) => wt(n) || typeof n?.[Symbol.iterator] == "function", ct = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, Bt = />/g, C = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Lt = /'/g, Ht = /"/g, Jt = /^(?:script|style|textarea|title)$/i, Ae = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), h = Ae(1), k = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Dt = /* @__PURE__ */ new WeakMap(), O = R.createTreeWalker(R, 129);
function Zt(n, t) {
  if (!wt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ut !== void 0 ? Ut.createHTML(t) : t;
}
const Ee = (n, t) => {
  const e = n.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = L;
  for (let a = 0; a < e; a++) {
    const c = n[a];
    let d, l, p = -1, m = 0;
    for (; m < c.length && (r.lastIndex = m, l = r.exec(c), l !== null); ) m = r.lastIndex, r === L ? l[1] === "!--" ? r = Nt : l[1] !== void 0 ? r = Bt : l[2] !== void 0 ? (Jt.test(l[2]) && (o = RegExp("</" + l[2], "g")), r = C) : l[3] !== void 0 && (r = C) : r === C ? l[0] === ">" ? (r = o ?? L, p = -1) : l[1] === void 0 ? p = -2 : (p = r.lastIndex - l[2].length, d = l[1], r = l[3] === void 0 ? C : l[3] === '"' ? Ht : Lt) : r === Ht || r === Lt ? r = C : r === Nt || r === Bt ? r = L : (r = C, o = void 0);
    const g = r === C && n[a + 1].startsWith("/>") ? " " : "";
    s += r === L ? c + ke : p >= 0 ? (i.push(d), c.slice(0, p) + Kt + c.slice(p) + x + g) : c + x + (p === -2 ? a : g);
  }
  return [Zt(n, s + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class F {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let s = 0, r = 0;
    const a = t.length - 1, c = this.parts, [d, l] = Ee(t, e);
    if (this.el = F.createElement(d, i), O.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = O.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(Kt)) {
          const m = l[r++], g = o.getAttribute(p).split(x), f = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: s, name: f[2], strings: g, ctor: f[1] === "." ? Te : f[1] === "?" ? ze : f[1] === "@" ? Oe : st }), o.removeAttribute(p);
        } else p.startsWith(x) && (c.push({ type: 6, index: s }), o.removeAttribute(p));
        if (Jt.test(o.tagName)) {
          const p = o.textContent.split(x), m = p.length - 1;
          if (m > 0) {
            o.textContent = tt ? tt.emptyScript : "";
            for (let g = 0; g < m; g++) o.append(p[g], j()), O.nextNode(), c.push({ type: 2, index: ++s });
            o.append(p[m], j());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Xt) c.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(x, p + 1)) !== -1; ) c.push({ type: 7, index: s }), p += x.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const i = R.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(n, t, e = n, i) {
  if (t === k) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const s = I(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(n), o._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = B(n, o._$AS(n, t.values), o, i)), t;
}
class Ce {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? R).importNode(e, !0);
    O.currentNode = o;
    let s = O.nextNode(), r = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let d;
        c.type === 2 ? d = new q(s, s.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (d = new Re(s, this, t)), this._$AV.push(d), c = i[++a];
      }
      r !== c?.index && (s = O.nextNode(), r++);
    }
    return O.currentNode = R, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class q {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, o) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = B(this, t, e), I(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Se(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(R.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = F.createElement(Zt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new Ce(o, this), r = s.u(this.options);
      s.p(e), this.T(r), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = Dt.get(t.strings);
    return e === void 0 && Dt.set(t.strings, e = new F(t)), e;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const s of t) o === e.length ? e.push(i = new q(this.O(j()), this.O(j()), this, this.options)) : i = e[o], i._$AI(s), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Pt(t).nextSibling;
      Pt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class st {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, s) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, o) {
    const s = this.strings;
    let r = !1;
    if (s === void 0) t = B(this, t, e, 0), r = !I(t) || t !== this._$AH && t !== k, r && (this._$AH = t);
    else {
      const a = t;
      let c, d;
      for (t = s[0], c = 0; c < s.length - 1; c++) d = B(this, a[i + c], e, c), d === k && (d = this._$AH[c]), r ||= !I(d) || d !== this._$AH[c], d === u ? t = u : t !== u && (t += (d ?? "") + s[c + 1]), this._$AH[c] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Te extends st {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ze extends st {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Oe extends st {
  constructor(t, e, i, o, s) {
    super(t, e, i, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = B(this, t, e, 0) ?? u) === k) return;
    const i = this._$AH, o = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== u && (i === u || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Re {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const Me = yt.litHtmlPolyfillSupport;
Me?.(F, q), (yt.litHtmlVersions ??= []).push("3.3.3");
const Pe = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    i._$litPart$ = o = new q(t.insertBefore(j(), s), s, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis;
let N = class extends U {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pe(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
};
N._$litElement$ = !0, N.finalized = !0, xt.litElementHydrateSupport?.({ LitElement: N });
const Ue = xt.litElementPolyfillSupport;
Ue?.({ LitElement: N });
(xt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: $t }, Be = (n = Ne, t, e) => {
  const { kind: i, metadata: o } = e;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), s.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, c, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const c = this[r];
      t.call(this, a), this.requestUpdate(r, c, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function kt(n) {
  return (t, e) => typeof e == "object" ? Be(n, t, e) : ((i, o, s) => {
    const r = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), r ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function E(n) {
  return kt({ ...n, state: !0, attribute: !1 });
}
const Qt = "2026.10.24.2", et = "easy-thermostat-styler-card", ut = "easy-thermostat-styler-card-editor", te = [
  "name",
  "status",
  "current",
  "unit",
  "humidity",
  "pill",
  "wheel_value",
  "wheel_neighbor",
  "bar"
], Le = [
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
], _ = {
  show_name: !0,
  show_status: !0,
  show_humidity: !0,
  show_pills: !0,
  show_current: !0,
  core_align: "center",
  toggles_zone: "bottom",
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
  glow: !0
}, ee = [
  { type: "hvac" },
  { type: "preset", display: "toggle" },
  { type: "fan_mode", display: "toggle" }
], M = (n) => !!n && typeof n == "object" && !Array.isArray(n);
function it(n) {
  if (!(n == null || n === "")) {
    if (typeof n == "number") return Number.isFinite(n) ? n : void 0;
    if (Array.isArray(n)) {
      const t = n.map(it).filter((e) => e !== void 0);
      return t.length ? t : void 0;
    }
    if (M(n)) {
      const t = {};
      for (const [e, i] of Object.entries(n)) {
        const o = it(i);
        o !== void 0 && (t[e] = o);
      }
      return Object.keys(t).length ? t : void 0;
    }
    return n;
  }
}
const X = (n, t, e) => {
  const i = typeof n == "number" ? n : typeof n == "string" && n.trim() ? Number(n) : NaN;
  return Number.isFinite(i) ? Math.min(e, Math.max(t, i)) : void 0;
};
function He(n) {
  if (!M(n) || typeof n.type != "string") return;
  const t = { ...n };
  return "columns" in t && (t.columns = X(t.columns, 0, 12) || void 0), Array.isArray(t.chips) && (t.chips = t.chips.filter((e) => M(e) && typeof e.entity == "string" && e.entity)), t;
}
function ft(n) {
  if (!M(n)) throw new Error("Invalid configuration");
  const t = { ...n };
  if (typeof t.entity != "string" || !t.entity)
    throw new Error("Easy Thermostat Styler Card: set an entity (a climate.* entity).");
  const e = M(t.setpoint) ? { ...t.setpoint } : void 0;
  return e && ("scale" in e && (e.scale = X(e.scale, 40, 250)), "neighbors" in e && (e.neighbors = X(e.neighbors, 0, 3)), "min_gap" in e && (e.min_gap = X(e.min_gap, 0, 20)), t.setpoint = e), Array.isArray(t.sets) && (t.sets = t.sets.map(He).filter(Boolean), t.sets.length === 0) ? { ...it({ ...t, sets: void 0 }), sets: [] } : it(t);
}
function De(n, t) {
  return t.split(".").reduce((e, i) => M(e) || Array.isArray(e) ? e[i] : void 0, n);
}
function lt(n, t, e) {
  const i = t.split("."), o = (s, r) => {
    const a = Array.isArray(s) ? [...s] : M(s) ? { ...s } : {}, c = i[r];
    if (r === i.length - 1)
      e === void 0 || e === "" || e === null ? Array.isArray(a) ? a.splice(Number(c), 1) : delete a[c] : a[c] = e;
    else {
      const d = o(a[c], r + 1);
      d === void 0 ? delete a[c] : a[c] = d;
    }
    if (!(!Array.isArray(a) && Object.keys(a).length === 0))
      return a;
  };
  return o(n, 0) ?? {};
}
const J = {
  hvac: "Mode",
  preset: "Preset",
  fan_mode: "Fan",
  chips: "Devices"
}, je = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, ie = {
  hvac: { list: "hvac_modes", active: null },
  preset: { list: "preset_modes", active: "preset_mode" },
  fan_mode: { list: "fan_modes", active: "fan_mode" }
}, St = {
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
}, jt = {
  heat_cool: "Heat/Cool",
  fan_only: "Fan only",
  off: "Off"
}, Ie = {
  heat: "var(--state-climate-heat-color, #ff8100)",
  cool: "var(--state-climate-cool-color, #2b9af9)",
  heat_cool: "var(--state-climate-heat-cool-color, #ffa600)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan-only-color, #009688)",
  off: "var(--state-climate-off-color, #8a8a8a)"
}, It = "var(--primary-color, #03a9f4)";
function mt(n) {
  if (jt[n]) return jt[n];
  const t = n.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Fe(n, t, e, i) {
  const o = n;
  try {
    if (e === "hvac" && o.formatEntityState) return o.formatEntityState(t, i);
    if (e !== "hvac" && e !== "chips" && o.formatEntityAttributeValue) {
      const s = e === "preset" ? "preset_mode" : "fan_mode", r = o.formatEntityAttributeValue(t, s, i);
      if (r) return r;
    }
  } catch {
  }
  return mt(i);
}
function qe(n) {
  return Array.isArray(n.sets) ? n.sets : ee;
}
function gt(n, t) {
  if (!n || t === "chips") return [];
  const e = n.attributes[ie[t].list];
  return Array.isArray(e) ? e.map(String) : [];
}
function oe(n, t) {
  if (!t?.length) return n;
  const e = /* @__PURE__ */ new Set(), i = [];
  for (const o of t) n.includes(o) && !e.has(o) && (i.push(o), e.add(o));
  for (const o of n) e.has(o) || i.push(o);
  return i;
}
function Ve(n, t) {
  const e = n.states[t.entity], i = [];
  return qe(t).forEach((o, s) => {
    if (o.hidden) return;
    const r = o.type;
    let a = [];
    if (r !== "chips") {
      if (!e) return;
      const c = gt(e, r);
      if (!c.length) return;
      const d = ie[r].active, l = d ? String(e.attributes[d] ?? "") : e.state;
      if (a = oe(c, o.order).filter((p) => !o.options?.[p]?.hide).map((p) => {
        const m = o.options?.[p];
        return {
          value: p,
          label: m?.name ?? Fe(n, e, r, p),
          icon: m?.icon ?? St[p.toLowerCase()] ?? "mdi:circle-medium",
          active: p === l,
          color: r === "hvac" ? Ie[p] ?? It : It
        };
      }), !a.length) return;
    } else if (!o.chips?.length) return;
    i.push({
      key: `${r}-${s}`,
      index: s,
      type: r,
      title: o.name ?? J[r],
      zone: o.zone ?? (t.toggles_zone || "bottom"),
      orientation: o.orientation ?? (o.zone === "left" || o.zone === "right" ? "column" : "row"),
      columns: o.columns ?? 0,
      align: o.align ?? (r === "chips" ? "center" : "stretch"),
      display: t.compact ? "toggle" : o.display ?? "always",
      toggleIcon: o.toggle_icon ?? je[r],
      options: a,
      config: o
    });
  }), i;
}
function We(n, t, e) {
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
const ne = {
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
function re(n, t) {
  const e = { ...ne };
  for (const i of [n, t])
    if (i)
      for (const o of Le) {
        const s = i[o];
        s !== void 0 && s !== "" && s !== null && (e[o] = s);
      }
  return e;
}
const H = (n) => n ? `${n}px` : void 0;
function Ye(n) {
  const t = {
    "--etc-b-radius": n.radius !== void 0 ? `${n.radius}px` : void 0,
    "--etc-b-height": H(n.height),
    "--etc-b-minw": H(n.min_width),
    "--etc-b-gap": n.gap !== void 0 ? `${n.gap}px` : void 0,
    "--etc-b-icon": H(n.icon_size),
    "--etc-b-fs": H(n.font_size),
    "--etc-b-fw": n.font_weight ? String(n.font_weight) : void 0,
    "--etc-b-bw": n.border_width !== void 0 ? `${n.border_width}px` : void 0,
    "--etc-b-bg": n.background,
    "--etc-b-fg": n.color,
    "--etc-b-bc": n.border_color,
    "--etc-b-abg": n.active_background,
    "--etc-b-afg": n.active_color,
    "--etc-b-abc": n.active_border_color
  };
  return At(t);
}
const Ge = {
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
function Ke(n) {
  const t = {};
  for (const e of te) {
    const i = n?.[e];
    if (!i) continue;
    const o = `--etc-t-${Ge[e]}`;
    t[`${o}-fs`] = H(i.size), t[`${o}-fw`] = i.weight ? String(i.weight) : void 0, t[`${o}-c`] = i.color, t[`${o}-tt`] = i.transform, t[`${o}-ls`] = i.letter_spacing !== void 0 ? `${i.letter_spacing / 100}em` : void 0, t[`${o}-fst`] = i.italic === void 0 ? void 0 : i.italic ? "italic" : "normal", t[`${o}-op`] = i.opacity !== void 0 ? String(i.opacity / 100) : void 0;
  }
  return At(t);
}
function Xe(n) {
  const t = n.card ?? {}, e = n.setpoint ?? {};
  return At({
    "--etc-card-bg": t.background,
    "--etc-card-bc": t.border_color,
    "--etc-card-bw": t.border_width !== void 0 ? `${t.border_width}px` : void 0,
    "--etc-card-r": t.radius !== void 0 ? `${t.radius}px` : void 0,
    "--etc-card-pad": t.padding !== void 0 ? `${t.padding}px` : void 0,
    "--etc-scale": e.scale !== void 0 ? String(e.scale / 100) : void 0
  });
}
function At(n) {
  const t = {};
  for (const [e, i] of Object.entries(n)) i !== void 0 && i !== "" && (t[e] = i);
  return t;
}
const Je = `
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
`, se = [
  "buttons",
  "text",
  "card",
  "compact",
  "show_name",
  "show_status",
  "show_humidity",
  "show_pills",
  "show_current",
  "core_align"
], Ft = [
  {
    id: "modern",
    name: "Modern",
    hint: "Tinted buttons, big light number (the built-in look).",
    icon: "mdi:thermostat",
    values: {}
  },
  {
    id: "solid",
    name: "Solid",
    hint: "Filled active buttons, firmer type.",
    icon: "mdi:square-rounded",
    values: {
      buttons: { variant: "filled", radius: 10, font_weight: 600 },
      text: { current: { weight: 300 }, name: { weight: 600 } }
    }
  },
  {
    id: "outline",
    name: "Outline",
    hint: "Pill outlines, thin numerals.",
    icon: "mdi:rounded-corner",
    values: {
      buttons: { variant: "outlined", radius: 999, icon_position: "left", height: 40 },
      text: { current: { weight: 100 }, status: { letter_spacing: 12 } }
    }
  },
  {
    id: "compact",
    name: "Compact",
    hint: "Smaller number, icon-only buttons, every set behind a toggle.",
    icon: "mdi:arrow-collapse-vertical",
    values: {
      compact: !0,
      show_status: !1,
      buttons: { content: "icon", radius: 12, height: 40, icon_size: 20 },
      text: { current: { size: 48 }, pill: { size: 16 } },
      card: { padding: 12 }
    }
  },
  {
    id: "minimal",
    name: "Minimal",
    hint: "Just the temperature and controls. No glow, no pills.",
    icon: "mdi:minus-box-outline",
    values: {
      show_status: !1,
      show_humidity: !1,
      show_pills: !1,
      buttons: { variant: "ghost", content: "icon" },
      text: { current: { size: 60, weight: 200 } },
      card: { glow: !1 }
    }
  }
];
function Ze(n) {
  return se.some((t) => n[t] !== void 0);
}
function Qe(n, t) {
  const e = { ...n };
  for (const i of se) delete e[i];
  return { ...e, ...structuredClone(t.values) };
}
var ti = Object.defineProperty, V = (n, t, e, i) => {
  for (var o = void 0, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = r(t, e, o) || o);
  return o && ti(t, e, o), o;
};
const Z = [
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
function ei(n) {
  const t = n == null ? "" : String(n);
  return t === "" ? "default" : /^#[0-9a-fA-F]{3,8}$/.test(t) ? "custom" : /^var\(/.test(t) && Z.some(([e]) => e === t) ? "theme" : "css";
}
const ii = {
  name: "Name",
  status: "Status (Heating / Cooling)",
  current: "Current temperature",
  unit: "Unit (°)",
  humidity: "Humidity",
  pill: "Setpoint pills",
  wheel_value: "Wheel / stepper value",
  wheel_neighbor: "Wheel next values",
  bar: "Bar labels"
}, oi = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, Ct = class Ct extends N {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(["thermostat"]), this._set = null, this._chip = null, this._cmode = {};
  }
  setConfig(t) {
    this._config = ft(t);
  }
  // ---- writes ---------------------------------------------------------------
  _emit(t) {
    this._config = ft(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  /** Set a path; `undefined`/'' or the built-in default removes the key. */
  _put(t, e, i) {
    if (!this._config) return;
    const o = e === i ? void 0 : e;
    this._emit(lt(this._config, t, o));
  }
  _get(t) {
    return De(this._config, t);
  }
  /** The configured sets, materialized from the defaults on first edit. */
  _sets() {
    return Array.isArray(this._config?.sets) ? this._config.sets : ee.map((t) => ({ ...t }));
  }
  _writeSets(t) {
    this._emit({ ...this._config, sets: t });
  }
  _patchSet(t, e, i, o) {
    const s = this._sets(), r = lt(s[t] ?? {}, e, i === o ? void 0 : i);
    s[t] = { ...r, type: s[t].type }, this._writeSets(s);
  }
  // ---- primitives -------------------------------------------------------------
  _toggleOpen(t, e) {
    const i = e.currentTarget.open, o = new Set(this._open);
    i ? o.add(t) : o.delete(t), this._open = o;
  }
  _panel(t, e, i, o) {
    return h`<details class="etce-sec" ?open=${this._open.has(t)} @toggle=${(s) => this._toggleOpen(t, s)}>
      <summary><ha-icon icon=${e}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${this._open.has(t) ? o : u}</div>
    </details>`;
  }
  _sub(t, e, i) {
    return h`<details class="etce-sub" ?open=${this._open.has(t)} @toggle=${(o) => this._toggleOpen(t, o)}>
      <summary>${e}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${this._open.has(t) ? i() : u}</div>
    </details>`;
  }
  _group(t, e = !1) {
    return h`<div class="etce-group ${e ? "first" : ""}">${t}</div>`;
  }
  _hint(t) {
    return h`<p class="etce-hint">${t}</p>`;
  }
  _check(t, e, i) {
    return h`<label class="etce-check"
      ><input type="checkbox" .checked=${e} @change=${(o) => i(o.target.checked)} />${t}</label
    >`;
  }
  _bool(t, e, i) {
    const o = this._get(t) ?? i;
    return this._check(e, o, (s) => this._put(t, s, i));
  }
  _selectRow(t, e, i, o) {
    return h`<div class="etce-row">
      <label class="lbl">${t}</label>
      <select @change=${(s) => o(s.target.value)}>
        ${i.map(([s, r]) => h`<option value=${s} ?selected=${s === e}>${r}</option>`)}
      </select>
    </div>`;
  }
  _select(t, e, i, o) {
    const s = String(this._get(t) ?? o);
    return this._selectRow(e, s, i, (r) => this._put(t, r, o));
  }
  _sliderRow(t, e, i, o, s, r, a, c = (d) => `${d}px`) {
    return h`<div class="etce-row etce-nowrap">
      <label class="lbl">${t}</label>
      <input
        type="range"
        min=${i}
        max=${o}
        step=${s}
        .value=${String(e)}
        @input=${(d) => {
      const l = d.target;
      l.nextElementSibling.textContent = c(Number(l.value));
    }}
        @change=${(d) => a(Number(d.target.value))}
      />
      <span class="etce-val">${c(e)}</span>
      ${r ? h`<button class="etce-reset" title="Back to default" @click=${() => a(void 0)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>` : u}
    </div>`;
  }
  _slider(t, e, i, o, s, r, a) {
    const c = this._get(t);
    return this._sliderRow(e, c ?? r, i, o, s, c !== void 0, (d) => this._put(t, d, r), a);
  }
  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  _colorRow(t, e, i, o, s, r) {
    const a = this._cmode[t] || ei(i);
    let c = u;
    if (a === "theme")
      c = h`<select @change=${(l) => r(l.target.value)}>
        ${Z.map(([l, p]) => h`<option value=${l} ?selected=${l === i}>${p}</option>`)}
      </select>`;
    else if (a === "custom") {
      const l = i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : s;
      c = h`<input type="color" .value=${l} @change=${(p) => r(p.target.value)} />`;
    } else a === "css" && (c = h`<input
        type="text"
        .value=${i ?? ""}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(l) => r(l.target.value || void 0)}
      />`);
    const d = (l) => {
      this._cmode = { ...this._cmode, [t]: l }, l === "default" ? r(void 0) : l === "theme" ? r(Z.some(([p]) => p === i) ? i : Z[0][0]) : l === "custom" ? r(i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : s) : this.requestUpdate();
    };
    return h`<div class="etce-row">
      <label class="lbl">${e}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(l) => d(l.target.value)}>
          ${[["default", o], ["theme", "Theme color"], ["custom", "Custom color"], ["css", "Custom CSS"]].map(
      ([l, p]) => h`<option value=${l} ?selected=${l === a}>${p}</option>`
    )}
        </select>
        ${c}
      </div>
    </div>`;
  }
  _color(t, e, i, o) {
    return this._colorRow(t, e, this._get(t), i, o, (s) => this._put(t, s));
  }
  _selector(t, e, i, o) {
    return h`<div class="etce-row">
      ${t ? h`<label class="lbl">${t}</label>` : u}
      <ha-selector
        .hass=${this.hass}
        .selector=${e}
        .value=${i}
        @value-changed=${(s) => o(s.detail.value)}
      ></ha-selector>
    </div>`;
  }
  // ---- render -----------------------------------------------------------------
  render() {
    return this._config ? h`<div class="etce">
      ${this._panel("thermostat", "mdi:thermostat", "Thermostat", this._thermostatBody())}
      ${this._panel("look", "mdi:palette-outline", "Look", this._lookBody())}
      ${this._panel("setpoint", "mdi:knob", "Setpoint control", this._setpointBody())}
      ${this._panel("sets", "mdi:gesture-tap-button", "Button sets", this._setsBody())}
      ${this._panel("buttons", "mdi:palette-swatch-outline", "Button style", this._buttonsBody())}
      ${this._panel("text", "mdi:format-text", "Text", this._textBody())}
      ${this._panel("card", "mdi:card-outline", "Card", this._cardBody())}
      <div class="etce-foot">Easy Thermostat Styler Card v${Qt}</div>
    </div>` : u;
  }
  _thermostatBody() {
    const t = this._config;
    return h`
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
        ${this._bool("show_name", "Name", _.show_name)} ${this._bool("show_status", "Status", _.show_status)}
        ${this._bool("show_humidity", "Humidity", _.show_humidity)}
        ${this._bool("show_current", "Current temperature", _.show_current)}
        ${this._bool("show_pills", "Setpoint pills", _.show_pills)}
      </div>
      ${this._group("Layout")}
      ${this._select("core_align", "Align", [["left", "Left"], ["center", "Center"], ["right", "Right"]], _.core_align)}
    `;
  }
  _lookBody() {
    const t = (e) => {
      const i = Ft.find((o) => o.id === e);
      Ze(this._config) && !window.confirm(`Apply the ${i.name} look? It replaces this card's button, text and card styling.`) || this._emit(Qe(this._config, i));
    };
    return h`
      ${this._hint("Start from a built-in look, then fine-tune under Button style, Text and Card. Your button sets and setpoint control are kept.")}
      <div class="etce-blist">
        ${Ft.map(
      (e) => h`<div class="etce-brow">
            <ha-icon class="etce-sicon" icon=${e.icon}></ha-icon>
            <span class="etce-sname">${e.name}</span>
            <span class="etce-stag">${e.hint}</span>
            <button class="etce-preset" @click=${() => t(e.id)}>Apply</button>
          </div>`
    )}
      </div>
    `;
  }
  _setpointBody() {
    const t = this._get("setpoint.control") ?? _.control;
    return h`
      ${this._hint("How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.")}
      ${this._select(
      "setpoint.control",
      "Control",
      [["wheel", "Wheel"], ["stepper", "− / + stepper"], ["bar", "Setpoint bar"], ["none", "None (display only)"]],
      _.control
    )}
      ${t === "wheel" || t === "stepper" ? h`
            ${this._select("setpoint.position", "Position", [["left", "Left"], ["right", "Right"], ["center", "Center (below)"]], _.position)}
            ${this._slider("setpoint.scale", "Size", 40, 250, 5, _.scale, (e) => `${e}%`)}
            ${t === "wheel" ? h`${this._slider("setpoint.neighbors", "Next values shown", 0, 3, 1, _.neighbors, (e) => String(e))}
                ${this._select("setpoint.nudge", "− / + buttons", [["beside", "Beside"], ["stacked", "Above & below"], ["hidden", "Hidden"]], _.nudge)}` : u}
          ` : u}
      ${t === "bar" ? this._barBody() : u}
      ${this._group("Heat / Cool")}
      ${this._slider("setpoint.min_gap", "Minimum gap", 0, 10, 0.5, this._defaultGap(), (e) => `${e}°`)}
    `;
  }
  _defaultGap() {
    return (this.hass?.config?.unit_system?.temperature ?? "").includes("C") ? 1.5 : 3;
  }
  _barBody() {
    const t = _.bar, e = this._get("setpoint.bar.look") ?? t.look, i = this._get("setpoint.bar.stops") ?? ["#2b9af9", "#7ccf8a", "#ff8100"];
    return h`
      ${this._select(
      "setpoint.bar.position",
      "Position",
      [["below", "Below (horizontal)"], ["above", "Above (horizontal)"], ["left", "Left (vertical)"], ["right", "Right (vertical)"]],
      t.position
    )}
      ${["left", "right"].includes(String(this._get("setpoint.bar.position") ?? "")) ? this._slider("setpoint.bar.length", "Height", 100, 400, 10, 200) : u}
      ${this._select("setpoint.bar.look", "Look", [["zones", "Heat / comfort / cool zones"], ["gradient", "Gradient"]], t.look)}
      ${e === "gradient" ? h`<div class="etce-row">
            <label class="lbl">Gradient (cold → hot)</label>
            <div class="etce-stops">
              ${i.map(
      (o, s) => h`<input
                  type="color"
                  .value=${o}
                  @change=${(r) => {
        const a = [...i];
        a[s] = r.target.value, this._put("setpoint.bar.stops", a);
      }}
                />`
    )}
            </div>
          </div>` : h`${this._color("setpoint.bar.heat_color", "Heat zone", "Theme heat", "#ff8100")}
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
      ${this._group("Markers")}
      ${this._bool("setpoint.bar.flags", "Value flags above handles", t.flags)}
      ${this._bool("setpoint.bar.show_current", "Current temperature marker", t.show_current)}
      ${this._slider("setpoint.bar.ticks", "Tick every", 0, 10, 0.5, t.ticks, (o) => o ? `${o}°` : "Off")}
      ${this._slider("setpoint.bar.labels", "Label every", 0, 20, 1, t.labels, (o) => o ? `${o}°` : "Off")}
      ${this._group("Range")}
      ${this._hint("Leave empty to use the thermostat’s own limits.")}
      ${["range_min", "range_max"].map(
      (o) => h`<div class="etce-row">
          <label class="lbl">${o === "range_min" ? "From" : "To"}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${o}`) ?? "")}
            @change=${(s) => {
        const r = s.target.value;
        this._put(`setpoint.bar.${o}`, r === "" ? void 0 : Number(r));
      }}
          />
        </div>`
    )}
    `;
  }
  // ---- button sets --------------------------------------------------------------
  _setsBody() {
    const t = this._sets(), e = this.hass?.states[this._config.entity], i = (o) => {
      const s = [...t, o === "chips" ? { type: o, chips: [] } : { type: o }];
      this._set = s.length - 1, this._writeSets(s);
    };
    return h`
      ${this._hint("Groups of buttons. Each set picks its side of the card, its layout, and whether it shows full time or behind a toggle button (compact).")}
      <div class="etce-addbar">
        ${["hvac", "preset", "fan_mode", "chips"].map(
      (o) => h`<button class="etce-add" @click=${() => i(o)}>+ ${J[o]}</button>`
    )}
      </div>
      <div class="etce-slist">
        ${t.map((o, s) => {
      const r = o.type === "chips" || gt(e, o.type).length > 0, a = this._set === s;
      return h`<div class="etce-srow ${o.hidden ? "off" : ""} ${a ? "open" : ""}">
              <ha-icon class="etce-sicon" icon=${oi[o.type]}></ha-icon>
              <span class="etce-sname" @click=${() => this._set = a ? null : s}>${o.name ?? J[o.type]}</span>
              <span class="etce-stag"
                >${r ? `${o.zone ?? "bottom"} · ${(this._config.compact ? "toggle" : o.display) ?? "always"}` : "not on this entity"}</span
              >
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._set = a ? null : s}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" title="Move up" ?disabled=${s === 0} @click=${() => this._moveSet(s, -1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button class="etce-act" title="Move down" ?disabled=${s === t.length - 1} @click=${() => this._moveSet(s, 1)}>
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
                <button class="etce-act etce-eye ${o.hidden ? "off" : ""}" title=${o.hidden ? "Show" : "Hide"} @click=${() => this._patchSet(s, "hidden", !o.hidden, !1)}>
                  <ha-icon icon=${o.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
                <button class="etce-act del" title="Delete" @click=${() => this._deleteSet(s)}>
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${a ? h`<div class="etce-sedit">${this._setEditor(o, s)}</div>` : u}`;
    })}
      </div>
      ${this._group("Compact")}
      ${this._bool("compact", "Compact: put every set behind a toggle button", !1)}
      ${this._select("toggles_zone", "Toggle buttons", [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], _.toggles_zone)}
    `;
  }
  _moveSet(t, e) {
    const i = this._sets(), o = t + e;
    o < 0 || o >= i.length || ([i[t], i[o]] = [i[o], i[t]], this._set === t && (this._set = o), this._writeSets(i));
  }
  _deleteSet(t) {
    const e = this._sets();
    e.splice(t, 1), this._set = null, this._writeSets(e);
  }
  _setEditor(t, e) {
    const i = t.zone ?? "bottom", o = i === "left" || i === "right", s = (r, a, c) => this._patchSet(e, r, a, c);
    return h`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${J[t.type]} @change=${(r) => s("name", r.target.value || void 0)} />
      </div>
      ${this._group("Placement")}
      ${this._selectRow("Side", i, [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], (r) => s("zone", r, "bottom"))}
      ${this._selectRow(
      "Orientation",
      t.orientation ?? (o ? "column" : "row"),
      [["row", "Row"], ["column", "Column"]],
      (r) => s("orientation", r, o ? "column" : "row")
    )}
      ${this._selectRow(
      "Align",
      t.align ?? (t.type === "chips" ? "center" : "stretch"),
      [["stretch", "Fill width"], ["start", "Start"], ["center", "Center"], ["end", "End"]],
      (r) => s("align", r, t.type === "chips" ? "center" : "stretch")
    )}
      ${(t.align ?? "stretch") === "stretch" && t.type !== "chips" ? this._sliderRow("Columns", t.columns ?? 0, 0, 8, 1, t.columns !== void 0, (r) => s("columns", r, 0), (r) => r ? String(r) : "Auto") : u}
      ${this._group("Display")}
      ${this._selectRow("Show", t.display ?? "always", [["always", "Full time"], ["toggle", "Behind a toggle button"]], (r) => s("display", r, "always"))}
      ${(t.display ?? "always") === "toggle" || this._config.compact ? this._selector("Toggle icon", { icon: {} }, t.toggle_icon, (r) => s("toggle_icon", r || void 0)) : u}
      ${t.type === "chips" ? this._sub(`set-${e}-chips`, "Chips", () => this._chipsEditor(t, e)) : this._sub(`set-${e}-options`, "Buttons in this set", () => this._optionsEditor(t, e))}
      ${this._sub(`set-${e}-style`, "Button style for this set", () => this._buttonStyleEditor(`sets.${e}.style`, !0, e))}
    `;
  }
  _optionsEditor(t, e) {
    const i = this.hass?.states[this._config.entity], o = oe(gt(i, t.type), t.order);
    if (!o.length) return this._hint("This entity has no options for this set.");
    const s = (r, a) => {
      const c = [...o], d = r + a;
      d < 0 || d >= c.length || ([c[r], c[d]] = [c[d], c[r]], this._patchSet(e, "order", c));
    };
    return h`${this._hint("Order, hide, rename and re-icon each button.")}
      <div class="etce-blist">
        ${o.map((r, a) => {
      const c = t.options?.[r] ?? {}, d = `${e}:${r}`;
      return h`<div class="etce-brow ${c.hide ? "off" : ""}">
              <ha-icon class="etce-sicon" icon=${c.icon ?? St[r.toLowerCase()] ?? "mdi:circle-medium"}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = this._chip === d ? null : d}>${c.name ?? mt(r)}</span>
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._chip = this._chip === d ? null : d}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === 0} @click=${() => s(a, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === o.length - 1} @click=${() => s(a, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act etce-eye ${c.hide ? "off" : ""}" @click=${() => this._patchSet(e, `options.${r}.hide`, !c.hide, !1)}>
                  <ha-icon icon=${c.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
              </div>
            </div>
            ${this._chip === d ? h`<div class="etce-sedit">
                  <div class="etce-row">
                    <label class="lbl">Label</label>
                    <input type="text" .value=${c.name ?? ""} placeholder=${mt(r)} @change=${(l) => this._patchSet(e, `options.${r}.name`, l.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, c.icon, (l) => this._patchSet(e, `options.${r}.icon`, l || void 0))}
                </div>` : u}`;
    })}
      </div>`;
  }
  _chipsEditor(t, e) {
    const i = t.chips ?? [], o = (r) => this._patchSet(e, "chips", r.length ? r : void 0), s = (r) => {
      const a = r === "rf_fan" ? this._firstRfFan() ?? "" : "";
      this._chip = `chip:${e}:${i.length}`;
      const c = a || Object.keys(this.hass?.states ?? {}).find((d) => d.startsWith(r === "rf_fan" ? "fan." : "sensor.")) || "";
      c && o([...i, { type: r, entity: c }]);
    };
    return h`
      ${this._hint("Status chips for linked devices. RF fan chips find the fan’s light and sleep timer automatically. Tap opens the fan card in a pop-up; hold toggles.")}
      <div class="etce-addbar">
        <button class="etce-add" @click=${() => s("rf_fan")}>+ RF fan</button>
        <button class="etce-add" @click=${() => s("entity")}>+ Entity</button>
      </div>
      <div class="etce-blist">
        ${i.map((r, a) => {
      const c = `chip:${e}:${a}`, d = this._chip === c, l = this.hass?.states[r.entity], p = r.name ?? l?.attributes.friendly_name ?? r.entity, m = (f, b, v) => {
        const y = [...i];
        y[a] = lt(y[a], f, b === v ? void 0 : b), y[a] = { ...y[a], type: r.type, entity: y[a].entity || r.entity }, o(y);
      }, g = (f) => {
        const b = [...i], v = a + f;
        v < 0 || v >= b.length || ([b[a], b[v]] = [b[v], b[a]], o(b));
      };
      return h`<div class="etce-brow">
              <ha-icon class="etce-sicon" icon=${r.icon ?? (r.type === "rf_fan" ? "mdi:ceiling-fan" : "mdi:shape-outline")}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = d ? null : c}>${p}</span>
              <span class="etce-stag">${r.type === "rf_fan" ? "RF fan" : "Entity"}</span>
              <div class="etce-sctl">
                <button class="etce-act" @click=${() => this._chip = d ? null : c}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === 0} @click=${() => g(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === i.length - 1} @click=${() => g(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act del" @click=${() => o(i.filter((f, b) => b !== a))}><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>
              </div>
            </div>
            ${d ? h`<div class="etce-sedit">
                  ${this._selector("Entity", { entity: r.type === "rf_fan" ? { domain: "fan" } : {} }, r.entity, (f) => f && m("entity", f))}
                  <div class="etce-row">
                    <label class="lbl">Name</label>
                    <input type="text" .value=${r.name ?? ""} placeholder="Entity name" @change=${(f) => m("name", f.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, r.icon, (f) => m("icon", f || void 0))}
                  <div class="etce-checks">
                    ${this._check("Show name", r.show_name ?? !0, (f) => m("show_name", f, !0))}
                    ${this._check("Show state", r.show_state ?? !0, (f) => m("show_state", f, !0))}
                  </div>
                  ${this._selectRow(
        "Tap",
        r.tap ?? (r.type === "rf_fan" ? "popup" : "more-info"),
        [["popup", "Open card in pop-up"], ["more-info", "More info"], ["toggle", "Toggle"], ["none", "Nothing"]],
        (f) => m("tap", f, r.type === "rf_fan" ? "popup" : "more-info")
      )}
                  ${this._selectRow(
        "Hold",
        r.hold ?? (r.type === "rf_fan" ? "toggle" : "none"),
        [["toggle", "Toggle"], ...r.type === "rf_fan" ? [["toggle_light", "Toggle light"]] : [], ["more-info", "More info"], ["none", "Nothing"]],
        (f) => m("hold", f, r.type === "rf_fan" ? "toggle" : "none")
      )}
                  ${(r.tap ?? (r.type === "rf_fan" ? "popup" : "more-info")) === "popup" ? h`${this._hint(
        r.type === "rf_fan" ? "Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan." : "Pop-up card config (any card)."
      )}
                      ${this._selector("", { object: {} }, r.popup_card, (f) => m("popup_card", f && Object.keys(f).length ? f : void 0))}` : u}
                </div>` : u}`;
    })}
      </div>
    `;
  }
  _firstRfFan() {
    const t = this.hass?.entities ?? {};
    return Object.values(t).find((e) => e.entity_id.startsWith("fan.") && e.platform === "esphome_rf_fan")?.entity_id;
  }
  // ---- button style (card default + per set — same property set) ---------------
  _buttonsBody() {
    return h`${this._hint("The look of every button. Each button set can override any of these under “Button style for this set”.")}
      ${this._buttonStyleEditor("buttons", !1)}`;
  }
  _buttonStyleEditor(t, e, i) {
    const o = (e ? this._sets()[i]?.style : this._config.buttons) ?? {}, s = e ? re(this._config.buttons, void 0) : ne, r = e ? "Card default" : "Built-in", a = (p, m) => {
      e ? this._patchSet(i, `style.${p}`, m) : this._put(`${t}.${p}`, m);
    }, c = (p, m, g) => {
      const f = String(s[p] ?? ""), b = g.find(([v]) => v === f)?.[1] ?? f;
      return this._selectRow(m, String(o[p] ?? ""), [["", `${r} (${b})`], ...g], (v) => a(p, v || void 0));
    }, d = (p, m, g, f) => {
      const b = Number(s[p] ?? 0), v = o[p];
      return this._sliderRow(m, v ?? b, g, f, 1, v !== void 0, (y) => a(p, y));
    }, l = (p, m, g) => this._colorRow(`${t}.${p}`, m, o[p], e ? "Card default" : "Automatic", g, (f) => a(p, f));
    return h`
      ${this._group("Shape", !0)}
      ${c("variant", "Style", [["tonal", "Tonal (tinted)"], ["filled", "Filled"], ["outlined", "Outlined"], ["ghost", "Ghost"]])}
      ${d("radius", "Corner radius", 0, 40)} ${d("height", "Min height", 0, 120)} ${d("min_width", "Min width", 0, 200)}
      ${d("gap", "Spacing", 0, 32)} ${d("border_width", "Border width", 0, 6)}
      ${this._group("Content")}
      ${c("content", "Show", [["icon_label", "Icon and label"], ["icon", "Icon only"], ["label", "Label only"]])}
      ${c("icon_position", "Icon", [["top", "Above label"], ["left", "Left of label"]])}
      ${d("icon_size", "Icon size", 10, 48)} ${d("font_size", "Text size", 8, 28)}
      ${c("font_weight", "Text weight", [["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"]])}
      ${this._group("Colors — inactive")}
      ${l("background", "Background", "#2a2a2a")} ${l("color", "Text & icon", "#cccccc")} ${l("border_color", "Border", "#555555")}
      ${this._group("Colors — active")}
      ${this._hint("Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.")}
      ${l("active_background", "Background", "#ff8100")} ${l("active_color", "Text & icon", "#ffffff")}
      ${l("active_border_color", "Border", "#ff8100")}
    `;
  }
  // ---- text ---------------------------------------------------------------------
  _textBody() {
    return h`${this._hint("Size, weight, color and case for each piece of text. Unset keeps the built-in look.")}
      ${te.map((t) => this._sub(`text-${t}`, ii[t], () => this._textRole(t)))}`;
  }
  _textRole(t) {
    const e = `text.${t}`, i = this._get(e) ?? {};
    return h`
      ${this._sliderRow(
      "Size",
      i.size ?? 0,
      0,
      160,
      1,
      i.size !== void 0,
      (o) => this._put(`${e}.size`, o || void 0),
      (o) => o ? `${o}px` : "Auto"
    )}
      ${this._selectRow(
      "Weight",
      String(i.weight ?? ""),
      [["", "Built-in"], ["100", "Thin"], ["200", "Extra light"], ["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"], ["800", "Extra bold"]],
      (o) => this._put(`${e}.weight`, o ? Number(o) : void 0)
    )}
      ${this._color(`${e}.color`, "Color", "Built-in", "#ffffff")}
      ${this._selectRow(
      "Case",
      String(i.transform ?? ""),
      [["", "Built-in"], ["none", "As written"], ["uppercase", "UPPERCASE"], ["lowercase", "lowercase"], ["capitalize", "Capitalize"]],
      (o) => this._put(`${e}.transform`, o || void 0)
    )}
      ${this._sliderRow(
      "Letter spacing",
      i.letter_spacing ?? 0,
      -10,
      30,
      1,
      i.letter_spacing !== void 0,
      (o) => this._put(`${e}.letter_spacing`, o),
      (o) => `${(o / 100).toFixed(2)}em`
    )}
      ${this._selectRow(
      "Italic",
      i.italic === void 0 ? "" : i.italic ? "on" : "off",
      [["", "Built-in"], ["off", "Off"], ["on", "On"]],
      (o) => this._put(`${e}.italic`, o === "" ? void 0 : o === "on")
    )}
      ${this._sliderRow("Opacity", i.opacity ?? 100, 10, 100, 5, i.opacity !== void 0, (o) => this._put(`${e}.opacity`, o), (o) => `${o}%`)}
    `;
  }
  // ---- card -----------------------------------------------------------------------
  _cardBody() {
    return h`
      ${this._hint("The card’s own surface.")}
      ${this._color("card.background", "Background", "Theme card", "#1c1c1c")}
      ${this._color("card.border_color", "Border", "Theme", "#444444")}
      ${this._slider("card.border_width", "Border width", 0, 8, 1, 1)}
      ${this._slider("card.radius", "Corner radius", 0, 48, 1, 16)}
      ${this._slider("card.padding", "Padding", 0, 40, 1, 16)}
      ${this._bool("card.glow", "Glow while heating or cooling", _.glow)}
    `;
  }
};
Ct.styles = [
  Yt(Je),
  Gt`
      :host { display: block; }
    `
];
let S = Ct;
V([
  kt({ attribute: !1 })
], S.prototype, "hass");
V([
  E()
], S.prototype, "_config");
V([
  E()
], S.prototype, "_open");
V([
  E()
], S.prototype, "_set");
V([
  E()
], S.prototype, "_chip");
customElements.get(ut) || customElements.define(ut, S);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = { ATTRIBUTE: 1 }, ce = (n) => (...t) => ({ _$litDirective$: n, values: t });
let le = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
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
const he = "important", ni = " !" + he, w = ce(class extends le {
  constructor(n) {
    if (super(n), n.type !== ae.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((t, e) => {
      const i = n[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(n, [t]) {
    const { style: e } = n.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const o = t[i];
      if (o != null) {
        this.ft.add(i);
        const s = typeof o == "string" && o.endsWith(ni);
        i.includes("-") || s ? e.setProperty(i, s ? o.slice(0, -11) : o, s ? he : "") : e[i] = o;
      }
    }
    return k;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = ce(class extends le {
  constructor(n) {
    if (super(n), n.type !== ae.ATTRIBUTE || n.name !== "class" || n.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return " " + Object.keys(n).filter((t) => n[t]).join(" ") + " ";
  }
  update(n, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), n.strings !== void 0 && (this.nt = new Set(n.strings.join(" ").split(/\s/).filter((i) => i !== "")));
      for (const i in t) t[i] && !this.nt?.has(i) && this.st.add(i);
      return this.render(t);
    }
    const e = n.element.classList;
    for (const i of this.st) i in t || (e.remove(i), this.st.delete(i));
    for (const i in t) {
      const o = !!t[i];
      o === this.st.has(i) || this.nt?.has(i) || (o ? (e.add(i), this.st.add(i)) : (e.remove(i), this.st.delete(i)));
    }
    return k;
  }
});
function $(n) {
  if (typeof n == "number") return Number.isFinite(n) ? n : null;
  if (typeof n == "string" && n.trim() !== "") {
    const t = Number(n);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
const vt = /* @__PURE__ */ new Set(["unavailable", "unknown", "none", ""]);
function de(n) {
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
function ri(n) {
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
function si(n, t, e) {
  return n === "off" ? "off" : t === null || e === null ? null : e.heat !== null && (n === "heat" || n === "heat_cool") && t < e.heat ? "heating" : e.cool !== null && (n === "cool" || n === "heat_cool") && t > e.cool ? "cooling" : n === "heat" || n === "cool" || n === "heat_cool" ? "idle" : null;
}
function ai(n, t) {
  if (n === "heat_cool") {
    const i = $(t.target_temp_low), o = $(t.target_temp_high);
    if (i !== null || o !== null) return { heat: i, cool: o };
    const s = $(t.temperature);
    return s === null ? null : { heat: s, cool: null };
  }
  const e = $(t.temperature);
  return e === null ? null : n === "heat" ? { heat: e, cool: null } : n === "cool" ? { heat: null, cool: e } : null;
}
function ci(n, t) {
  const e = n.states[t.entity], i = n.config?.unit_system?.temperature ?? "°", o = e?.attributes.friendly_name, s = t.name ?? (typeof o == "string" ? o : t.entity);
  if (!e || vt.has(e.state))
    return {
      available: !1,
      name: s,
      currentTemp: null,
      unit: i,
      humidity: null,
      equipment: null,
      mode: "unknown",
      state: e?.state ?? "unavailable",
      setpoints: null
    };
  const r = e.attributes, a = de(e.state), c = $(r.current_temperature), d = ai(a, r);
  return {
    available: !0,
    name: s,
    currentTemp: c,
    unit: i,
    humidity: $(r.current_humidity),
    equipment: ri(r.hvac_action) ?? si(a, c, d),
    mode: a,
    state: e.state,
    setpoints: d
  };
}
function T(n, t) {
  if (n === null) return "–";
  const e = t.includes("C"), i = e ? Math.round(n * 2) / 2 : Math.round(n);
  return e && !Number.isInteger(i) ? i.toFixed(1) : String(i);
}
const li = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan",
  idle: "Idle",
  off: "Off"
}, hi = 1, di = 0.5, pi = 3, ui = 1.5;
function fi(n) {
  return n.includes("C") ? di : hi;
}
function mi(n, t) {
  return t.setpoint?.min_gap ?? (n.includes("C") ? ui : pi);
}
function pe(n) {
  return Math.round(n * 100) / 100;
}
function z(n, t, e, i) {
  let o = i > 0 ? pe(Math.round(n / i) * i) : n;
  return t !== null && o < t && (o = t), e !== null && o > e && (o = e), o;
}
function Y(n, t, e, i, o) {
  return { setpoint: n, value: z(t, e, i, o), min: e, max: i, step: o };
}
function dt(n, t, e) {
  return { available: !1, unit: n, mode: t, heat: null, cool: null, active: e, minGap: 0 };
}
function gi(n, t) {
  const e = n.config?.unit_system?.temperature ?? "°", i = n.states[t.entity], o = i ? de(i.state) : "unknown";
  if (!i || o !== "heat" && o !== "cool" && o !== "heat_cool")
    return dt(e, o, "heat");
  const s = i.attributes, r = fi(e), a = mi(e, t), c = $(s.min_temp), d = $(s.max_temp);
  if (o === "heat_cool") {
    const p = $(s.target_temp_low), m = $(s.target_temp_high);
    if (p === null && m === null) return dt(e, o, "cool");
    const g = p !== null ? Y("heat", p, c, d, r) : null, f = m !== null ? Y("cool", m, c, d, r) : null;
    return { available: !0, unit: e, mode: o, heat: g, cool: f, active: f ? "cool" : "heat", minGap: a };
  }
  const l = $(s.temperature);
  return l === null ? dt(e, o, o === "heat" ? "heat" : "cool") : o === "heat" ? {
    available: !0,
    unit: e,
    mode: o,
    heat: Y("heat", l, c, d, r),
    cool: null,
    active: "heat",
    minGap: a
  } : {
    available: !0,
    unit: e,
    mode: o,
    heat: null,
    cool: Y("cool", l, c, d, r),
    active: "cool",
    minGap: a
  };
}
function at(n) {
  return n[n.active];
}
function Et(n, t) {
  const e = at(n);
  if (!e) return n;
  const i = n.mode === "heat_cool" ? n[e.setpoint === "cool" ? "heat" : "cool"] : null;
  if (!i) {
    const a = { ...e, value: z(t, e.min, e.max, e.step) };
    return { ...n, [e.setpoint]: a };
  }
  const o = n.minGap;
  let s = z(t, e.min, e.max, e.step), r = i.value;
  if (e.setpoint === "cool") {
    if (s - i.value < o) {
      let a = s - o;
      i.min !== null && a < i.min && (a = i.min, s = z(i.min + o, e.min, e.max, e.step)), r = z(a, i.min, i.max, i.step);
    }
  } else if (i.value - s < o) {
    let a = s + o;
    i.max !== null && a > i.max && (a = i.max, s = z(i.max - o, e.min, e.max, e.step)), r = z(a, i.min, i.max, i.step);
  }
  return {
    ...n,
    [e.setpoint]: { ...e, value: s },
    [i.setpoint]: { ...i, value: r }
  };
}
function P(n, t) {
  const e = at(n);
  return e ? Et(n, e.value + t * e.step) : n;
}
function qt(n, t) {
  return at(n) ? Et(n, t) : n;
}
function vi(n, t, e, i) {
  const o = at(n);
  if (!o) return n;
  const s = Math.round(e / i);
  return Et(n, t + s * o.step);
}
function G(n, t) {
  return n[t] === null ? n : { ...n, active: t };
}
function bi(n, t) {
  const e = [];
  for (let i = -t; i <= t; i++) {
    const o = pe(n.value + i * n.step);
    n.min !== null && o < n.min || n.max !== null && o > n.max || e.push(o);
  }
  return e;
}
function _i(n, t) {
  if (!n.available) return null;
  const e = { entity_id: t };
  if (n.mode === "heat_cool")
    n.heat && (e.target_temp_low = n.heat.value), n.cool && (e.target_temp_high = n.cool.value);
  else {
    const i = n.heat ?? n.cool;
    if (!i) return null;
    e.temperature = i.value;
  }
  return { domain: "climate", service: "set_temperature", data: e };
}
const $i = 600, yi = 8e3;
function wi(n, t) {
  return n.heat?.value === t.heat?.value && n.cool?.value === t.cool?.value;
}
class xi {
  constructor(t, e, i) {
    this.entityId = t, this.send = e, this.changed = i, this.edit = null, this.dragging = !1, this.pending = null, this.writeTimer = null, this.reconcileTimer = null, this.latest = null;
  }
  /** Feed the model derived from the latest hass. */
  sync(t) {
    if (this.latest = t, this.dragging || this.pending && t.mode === this.pending.mode && !wi(t, this.pending))
      return;
    const e = this.edit && t[this.edit.active] ? this.edit.active : t.active;
    this.edit = { ...t, active: e }, this.pending = null, this.clearReconcile();
  }
  /** Live preview without scheduling a write (used during a drag). */
  preview(t) {
    this.edit = t, this.changed();
  }
  commit(t) {
    this.edit = t, this.pending = t, this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = setTimeout(() => this.flush(), $i), this.changed();
  }
  /** Change only which setpoint is edited (no write). */
  select(t) {
    this.edit = t, this.pending && (this.pending = { ...this.pending, active: t.active }), this.changed();
  }
  flush() {
    this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = null;
    const t = this.edit ? _i(this.edit, this.entityId()) : null;
    t && this.send(t), this.clearReconcile(), this.reconcileTimer = setTimeout(() => {
      if (this.reconcileTimer = null, this.pending = null, this.latest) {
        const e = this.edit?.active;
        this.edit = { ...this.latest, active: e && this.latest[e] ? e : this.latest.active }, this.changed();
      }
    }, yi);
  }
  /** On disconnect: send anything still queued, drop timers. */
  dispose() {
    this.writeTimer && this.flush(), this.clearReconcile(), this.pending = null;
  }
  clearReconcile() {
    this.reconcileTimer && clearTimeout(this.reconcileTimer), this.reconcileTimer = null;
  }
}
function pt(n, t) {
  const e = n.heat ?? n.cool, i = n.unit.includes("C");
  let o = t?.range_min ?? e?.min ?? (i ? 10 : 50), s = t?.range_max ?? e?.max ?? (i ? 32 : 90);
  s > o || (s = o + (i ? 10 : 20));
  for (const r of [n.heat, n.cool])
    r && (o = Math.min(o, r.value), s = Math.max(s, r.value));
  return { min: o, max: s };
}
function ot(n, t) {
  return Math.min(1, Math.max(0, (n - t.min) / (t.max - t.min)));
}
function ki(n, t) {
  return t.min + Math.min(1, Math.max(0, n)) * (t.max - t.min);
}
function Si(n, t, e) {
  const i = t > 0 ? t : e > 0 ? e : 0;
  if (i <= 0) return [];
  const o = [], s = Math.ceil(n.min / i) * i;
  if ((n.max - s) / i > 200) return [];
  for (let r = s; r <= n.max + 1e-9; r = Math.round((r + i) * 1e3) / 1e3) {
    const a = e > 0 && Math.abs(r / e - Math.round(r / e)) < 1e-6;
    o.push({ value: r, fraction: ot(r, n), label: a });
  }
  return o;
}
function Ai(n, t, e) {
  if (!n.heat) return "cool";
  if (!n.cool) return "heat";
  const i = Math.abs(ot(n.heat.value, e) - t), o = Math.abs(ot(n.cool.value, e) - t);
  return Math.abs(i - o) < 1e-6 ? n.active : i < o ? "heat" : "cool";
}
const Ei = "esphome_rf_fan", Ci = "custom:rf-fan-ltek";
function ue(n, t) {
  const e = n.entities, i = e?.[t]?.device_id;
  return !e || !i ? [] : Object.values(e).filter((o) => o.device_id === i && o.entity_id !== t).map((o) => o.entity_id);
}
function Ti(n, t) {
  const e = ue(n, t).filter((o) => o.startsWith("light.")), i = n.entities ?? {};
  return e.find((o) => i[o]?.platform === Ei) ?? e[0] ?? null;
}
function zi(n, t) {
  const e = n.entities ?? {}, i = ue(n, t).filter((o) => o.startsWith("sensor."));
  return i.find((o) => e[o]?.translation_key === "sleep_timer") ?? i.find((o) => n.states[o]?.attributes.device_class === "timestamp") ?? null;
}
function Oi(n, t) {
  const e = n?.attributes.friendly_name;
  return typeof e == "string" ? e : t;
}
function Ri(n, t) {
  const e = n.split(".")[0], o = {
    fan: ["mdi:fan", "mdi:fan-off"],
    light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
    switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
    binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
    sensor: ["mdi:eye", "mdi:eye"]
  }[e ?? ""] ?? ["mdi:circle", "mdi:circle-outline"];
  return t ? o[0] : o[1];
}
function Vt(n, t, e) {
  const i = n.states[t.entity], o = !!i && !vt.has(i.state), s = o && !["off", "idle", "closed", "standby"].includes(i.state), r = {
    index: e,
    type: t.type,
    entity: t.entity,
    name: t.name ?? Oi(i, t.entity),
    icon: t.icon ?? (typeof i?.attributes.icon == "string" ? i.attributes.icon : Ri(t.entity, s)),
    on: s,
    available: o,
    state: o ? Ui(n, i) : "Unavailable",
    speed: null,
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
  if (t.type !== "rf_fan" || !i) return r;
  const a = i.attributes, c = $(a.percentage), d = $(a.speed_count) ?? ($(a.percentage_step) ? Math.round(100 / $(a.percentage_step)) : null), l = s && c !== null && d ? Math.max(1, Math.round(c * d / 100)) : null, p = Ti(n, t.entity), m = zi(n, t.entity), g = m ? n.states[m]?.state : void 0, f = g && !vt.has(g) ? new Date(g) : null, b = typeof a.preset_mode == "string" ? a.preset_mode : "";
  return {
    ...r,
    icon: t.icon ?? "mdi:ceiling-fan",
    state: o ? s ? l !== null ? String(l) : "On" : "Off" : "Unavailable",
    speed: l,
    percentage: c,
    direction: a.direction === "reverse" ? "reverse" : a.direction === "forward" ? "forward" : null,
    natural: !!b && b !== "normal",
    lightEntity: p,
    lightOn: !!p && n.states[p]?.state === "on",
    timerEnds: f && !Number.isNaN(f.getTime()) && f.getTime() > Date.now() ? f : null,
    spin: s ? Mi(c) : null
  };
}
function Mi(n) {
  const t = Math.min(100, Math.max(1, n ?? 50));
  return Math.round((3 - t / 100 * 2.4) * 100) / 100;
}
function Pi(n, t = Date.now()) {
  const e = Math.max(0, Math.round((n.getTime() - t) / 6e4)), i = Math.floor(e / 60);
  return i ? `${i}h${String(e % 60).padStart(2, "0")}` : `${e}m`;
}
function Ui(n, t) {
  const e = n;
  try {
    if (e.formatEntityState) return e.formatEntityState(t);
  } catch {
  }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state.charAt(0).toUpperCase() + t.state.slice(1);
}
function Ni(n) {
  return n.popup_card ? n.popup_card : n.type === "rf_fan" ? { type: Ci, fan_entity: n.entity } : null;
}
function Bi(n, t) {
  if (t === "toggle_light")
    return n.lightEntity ? { domain: "light", service: "toggle", data: { entity_id: n.lightEntity } } : null;
  const e = n.entity.split(".")[0];
  return ["fan", "light", "switch", "input_boolean", "climate", "humidifier", "media_player", "cover"].includes(e) ? { domain: "homeassistant", service: "toggle", data: { entity_id: n.entity } } : null;
}
const Li = Gt`
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
  ha-card.glow.eq-heating {
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--etc-heat) 55%, transparent),
      0 0 22px -4px color-mix(in srgb, var(--etc-heat) 65%, transparent);
  }
  ha-card.glow.eq-cooling {
    box-shadow:
      0 0 0 1px color-mix(in srgb, var(--etc-cool) 55%, transparent),
      0 0 22px -4px color-mix(in srgb, var(--etc-cool) 65%, transparent);
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
  .core.al-center.pos-left .main,
  .core.al-center.pos-right .main { flex: 1 1 auto; }
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
    border: 3px solid var(--c);
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
    background: var(--c);
    color: #fff;
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
    border-top-color: var(--c);
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
  .seg.full { inset: 0; }
  .bar.vertical .handle { top: auto; left: 50%; transform: translate(-50%, 50%); }
  .bar.vertical .handle.s-diamond { transform: translate(-50%, 50%) rotate(45deg); }
  .bar.vertical .handle.s-line { width: calc(var(--etc-bar-h, 14px) + 14px); height: 6px; }
  .bar.vertical .flag { bottom: auto; right: calc(100% + 14px); transform: translateY(50%); }
  .bar.vertical .flag::after { left: 100%; top: 50%; transform: translateY(-50%); border-top-color: transparent; border-left-color: var(--c); }
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
var Hi = Object.defineProperty, W = (n, t, e, i) => {
  for (var o = void 0, s = n.length - 1, r; s >= 0; s--)
    (r = n[s]) && (o = r(t, e, o) || o);
  return o && Hi(t, e, o), o;
};
const Di = 18, ji = 500, Tt = class Tt extends N {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(), this._tick = 0, this._popupOpen = !1, this._sp = new xi(
      () => this._config?.entity ?? "",
      (t) => this._call(t),
      () => this._tick += 1
    ), this._drag = null, this._barDrag = null, this._hold = null, this._wheelDown = (t) => {
      const e = this._sp.edit, i = e?.[e.active];
      if (!i) return;
      const o = t.currentTarget;
      o.focus({ preventScroll: !0 }), this._drag = { startY: t.clientY, startValue: i.value }, this._sp.dragging = !0, o.setPointerCapture?.(t.pointerId);
    }, this._wheelMove = (t) => {
      !this._drag || !this._sp.edit || this._sp.preview(vi(this._sp.edit, this._drag.startValue, t.clientY - this._drag.startY, Di));
    }, this._wheelUp = (t) => {
      const e = this._drag;
      if (!e) return;
      this._drag = null, this._sp.dragging = !1;
      const i = t.currentTarget;
      i.hasPointerCapture?.(t.pointerId) && i.releasePointerCapture(t.pointerId);
      const o = this._sp.edit;
      o && o[o.active]?.value !== e.startValue && this._sp.commit(o);
    }, this._wheelKey = (t) => {
      const e = this._sp.edit;
      e && (t.key === "ArrowUp" || t.key === "ArrowRight" ? (t.preventDefault(), this._sp.commit(P(e, 1))) : (t.key === "ArrowDown" || t.key === "ArrowLeft") && (t.preventDefault(), this._sp.commit(P(e, -1))));
    }, this._wheelScroll = (t) => {
      const e = this._sp.edit;
      !e || Math.abs(t.deltaY) < 4 || (t.preventDefault(), this._sp.commit(P(e, t.deltaY < 0 ? 1 : -1)));
    }, this._barDown = (t) => {
      const e = this._sp.edit;
      if (!e?.available) return;
      const i = t.currentTarget, o = i.getBoundingClientRect(), s = pt(e, this._config?.setpoint?.bar), r = this._barFraction(t, o), a = Ai(e, r, s);
      this._barDrag = { handle: a, rect: o }, this._sp.dragging = !0, i.setPointerCapture?.(t.pointerId), this._sp.preview(qt(G(e, a), this._barValueAt(t, o)));
    }, this._barMove = (t) => {
      !this._barDrag || !this._sp.edit || this._sp.preview(qt(this._sp.edit, this._barValueAt(t, this._barDrag.rect)));
    }, this._barUp = (t) => {
      if (!this._barDrag) return;
      this._barDrag = null, this._sp.dragging = !1;
      const e = t.currentTarget;
      e.hasPointerCapture?.(t.pointerId) && e.releasePointerCapture(t.pointerId), this._sp.edit && this._sp.commit(this._sp.edit);
    }, this._chipCancelHold = () => {
      this._hold && !this._hold.fired && clearTimeout(this._hold.timer);
    }, this._closePopup = () => {
      const t = this.renderRoot.querySelector("dialog.popup");
      t?.open && t.close(), this._popupOpen = !1, this._popupEl = void 0;
    };
  }
  // ---- Lovelace contract ----------------------------------------------------
  setConfig(t) {
    this._config = ft(t), this._open = this._loadOpen();
  }
  static getConfigElement() {
    return document.createElement(ut);
  }
  static getStubConfig(t) {
    return { entity: Object.keys(t?.states ?? {}).find((i) => i.startsWith("climate.")) ?? "climate.thermostat" };
  }
  getCardSize() {
    return 5;
  }
  getGridOptions() {
    return { columns: 6, min_columns: 4, rows: "auto" };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._sp.dispose();
  }
  willUpdate(t) {
    (t.has("hass") || t.has("_config")) && this.hass && this._config && this._sp.sync(gi(this.hass, this._config)), t.has("hass") && this._popupEl && this.hass && (this._popupEl.hass = this.hass);
  }
  /** Only re-render for state that this card reads (not every hass push). */
  shouldUpdate(t) {
    if (!t.has("hass") || t.size > 1) return !0;
    const e = t.get("hass");
    return !e || !this.hass || !this._config ? !0 : this._watched().some((i) => e.states[i] !== this.hass.states[i]);
  }
  _watched() {
    const t = this._config, e = [t.entity];
    for (const i of t.sets ?? []) for (const o of i.chips ?? []) e.push(o.entity);
    if (this.hass)
      for (const i of t.sets ?? [])
        for (const o of i.chips ?? []) {
          if (o.type !== "rf_fan") continue;
          const s = Vt(this.hass, o, 0);
          s.lightEntity && e.push(s.lightEntity);
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
    if (!this._config || !this.hass) return u;
    const t = this._config, e = ci(this.hass, t), i = Ve(this.hass, t), s = {
      glow: !!((t.card?.glow ?? _.glow) && e.equipment),
      [`eq-${e.equipment ?? "none"}`]: !0,
      [`mode-${e.mode}`]: !0
    }, r = { ...Xe(t), ...Ke(t.text), ...this._barVars() }, a = { top: [], bottom: [], left: [], right: [] }, c = i.filter((l) => l.display === "toggle");
    for (const l of i)
      l.display === "toggle" && !this._open.has(l.key) || a[l.zone].push(this._renderSet(l));
    const d = t.toggles_zone ?? _.toggles_zone;
    return c.length && a[d].push(this._renderToggles(c)), h`
      <ha-card class=${ht(s)} style=${w(r)}>
        <div class="grid">
          ${["top", "left"].map((l) => this._zone(l, a[l]))}
          ${this._renderCore(e)}
          ${["right", "bottom"].map((l) => this._zone(l, a[l]))}
        </div>
        ${this._renderPopup()}
      </ha-card>
    `;
  }
  _zone(t, e) {
    return e.length ? h`<div class="zone ${t}">${e}</div>` : u;
  }
  _barVars() {
    const t = this._config?.setpoint?.bar ?? {}, e = {};
    return t.height && (e["--etc-bar-h"] = `${t.height}px`), t.length && (e["--etc-bar-len"] = `${t.length}px`), t.heat_color && (e["--bar-heat"] = t.heat_color), t.cool_color && (e["--bar-cool"] = t.cool_color), t.comfort_color && (e["--bar-comfort"] = t.comfort_color), t.handle_color && (e["--bar-handle"] = t.handle_color), e;
  }
  // ---- core -----------------------------------------------------------------
  _renderCore(t) {
    const e = this._config, i = e.setpoint ?? {}, o = i.control ?? _.control, s = i.position ?? _.position, r = e.core_align ?? _.core_align, a = this._sp.edit, c = !!a?.available, d = c && (o === "wheel" || o === "stepper") ? this._renderControl(a, o) : null, l = c && o === "bar" ? this._renderBar(a, t) : null, p = i.bar?.position ?? _.bar.position, m = p === "above", g = p === "left" || p === "right", f = t.equipment ? `eq-${t.equipment}` : "";
    if (!t.available)
      return h`<div class="core al-${r}">
        <div class="main">
          ${e.show_name ?? _.show_name ? h`<div class="name">${t.name}</div>` : u}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    const b = h`<div class="main">
      ${e.show_name ?? _.show_name ? h`<div class="name">${t.name}</div>` : u}
      ${(e.show_status ?? _.show_status) && t.equipment ? h`<div class="status ${f}">
            <ha-icon icon=${St[t.state] ?? "mdi:thermostat"}></ha-icon>${li[t.equipment]}
          </div>` : u}
      ${(e.show_humidity ?? _.show_humidity) && t.humidity !== null ? h`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(t.humidity)}%</div>` : u}
      ${e.show_current ?? _.show_current ? h`<div class="current ${f}">
            ${T(t.currentTemp, t.unit)}<span class="unit">${t.unit}</span>
          </div>` : u}
      ${(e.show_pills ?? _.show_pills) && a?.available ? this._renderPills(a) : u}
    </div>`;
    return h`<div class="core al-${r} pos-${s}">
      ${l && m ? l : u}
      <div class="core-row">
        ${l && p === "left" ? l : u} ${d && s === "left" ? d : u} ${b}
        ${d && s === "right" ? d : u} ${l && p === "right" ? l : u}
      </div>
      ${d && s === "center" ? h`<div class="ctl-center">${d}</div>` : u}
      ${l && !m && !g ? l : u}
    </div>`;
  }
  _renderPills(t) {
    const e = !!(t.heat && t.cool), i = (o) => {
      const s = t[o];
      if (!s) return u;
      const r = h`<ha-icon icon=${o === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${T(
        s.value,
        t.unit
      )}`, a = e && t.active !== o && this._usesActive();
      return e ? h`<button
            class="pill ${o} ${a ? "dim" : ""}"
            aria-pressed=${t.active === o}
            aria-label=${`${o === "heat" ? "Heat" : "Cool"} setpoint`}
            @click=${() => this._sp.select(G(t, o))}
          >
            ${r}
          </button>` : h`<div class="pill ${o}">${r}</div>`;
    };
    return h`<div class="pills">${i("heat")} ${i("cool")}</div>`;
  }
  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  _usesActive() {
    const t = this._config?.setpoint?.control ?? _.control;
    return t === "wheel" || t === "stepper";
  }
  _renderControl(t, e) {
    const i = t[t.active];
    if (!i) return u;
    const o = t.active, s = h`<button
      class="round ${o}"
      aria-label="Increase"
      ?disabled=${i.max !== null && i.value >= i.max}
      @click=${() => this._sp.commit(P(t, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`, r = h`<button
      class="round ${o}"
      aria-label="Decrease"
      ?disabled=${i.min !== null && i.value <= i.min}
      @click=${() => this._sp.commit(P(t, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`;
    if (e === "stepper")
      return h`<div class="stepper ${o}">
        ${r}<span class="sv">${T(i.value, t.unit)}</span>${s}
      </div>`;
    const a = this._config?.setpoint ?? {}, c = a.neighbors ?? _.neighbors, d = a.nudge ?? _.nudge, l = bi(i, c), p = l.filter((b) => b > i.value).reverse(), m = l.filter((b) => b < i.value).reverse(), g = (b) => h`<div class="nb ${Math.abs(b - i.value) > i.step * 1.5 ? "far" : ""}">${T(b, t.unit)}</div>`, f = h`<div
      class="wheel-col"
      role="slider"
      tabindex="0"
      aria-label=${`${o === "cool" ? "Cool" : "Heat"} setpoint`}
      aria-valuenow=${i.value}
      aria-valuemin=${i.min ?? u}
      aria-valuemax=${i.max ?? u}
      aria-valuetext=${T(i.value, t.unit)}
      @pointerdown=${this._wheelDown}
      @pointermove=${this._wheelMove}
      @pointerup=${this._wheelUp}
      @pointercancel=${this._wheelUp}
      @keydown=${this._wheelKey}
      @wheel=${this._wheelScroll}
    >
      ${p.map(g)}
      <div class="bubble ${o}">${T(i.value, t.unit)}</div>
      ${m.map(g)}
    </div>`;
    return d === "hidden" ? h`<div class="wheel">${f}</div>` : d === "stacked" ? h`<div class="wheel nudge-stacked">${s}${f}${r}</div>` : h`<div class="wheel">${f}<div class="nudges">${s}${r}</div></div>`;
  }
  // ---- bar ------------------------------------------------------------------
  _renderBar(t, e) {
    const i = { ..._.bar, ...this._config?.setpoint?.bar ?? {} }, o = pt(t, i), s = (v) => `${(ot(v, o) * 100).toFixed(3)}%`, r = i.position === "left" || i.position === "right", a = (v) => r ? { bottom: v } : { left: v }, c = r ? "height" : "width", d = r ? "top" : "right", l = t.heat, p = t.cool, m = Si(o, i.ticks ?? 0, i.labels ?? 0), g = [];
    if (i.look === "gradient") {
      const v = i.stops?.length ? i.stops : ["#2b9af9", "#7ccf8a", "#ff8100"];
      g.push(h`<div class="seg full" style=${w({ background: `linear-gradient(to ${r ? "top" : "right"}, ${v.join(", ")})` })}></div>`);
    } else
      l && g.push(h`<div class="seg heat" style=${w({ [c]: s(l.value) })}></div>`), p && g.push(h`<div class="seg cool" style=${w({ ...a(s(p.value)), [d]: "0" })}></div>`), l && p && g.push(h`<div class="seg comfort" style=${w({ ...a(s(l.value)), [d]: `calc(100% - ${s(p.value)})` })}></div>`);
    const f = (v) => {
      const y = t[v];
      return y ? h`
        ${i.flags ? h`<div class="flag ${v}" style=${w(a(s(y.value)))}>${T(y.value, t.unit)}°</div>` : u}
        <div
          class="handle ${v} s-${i.handle_shape ?? "round"} ${t.active === v && l && p ? "active" : ""}"
          style=${w(a(s(y.value)))}
          role="slider"
          aria-orientation=${r ? "vertical" : "horizontal"}
          tabindex="0"
          aria-label=${`${v === "heat" ? "Heat" : "Cool"} setpoint`}
          aria-valuenow=${y.value}
          aria-valuemin=${o.min}
          aria-valuemax=${o.max}
          @focus=${() => this._sp.select(G(this._sp.edit, v))}
          @keydown=${(fe) => this._barKey(fe, v)}
        ></div>
      ` : u;
    }, b = e.currentTemp;
    return h`<div class="bar ${r ? `vertical side-${i.position}` : ""} ${i.flags ? "" : "no-flags"}">
      <div
        class="track"
        @pointerdown=${this._barDown}
        @pointermove=${this._barMove}
        @pointerup=${this._barUp}
        @pointercancel=${this._barUp}
      >
        ${g}
        ${i.show_current && b !== null && b >= o.min && b <= o.max ? h`<div class="marker" style=${w(a(s(b)))} title="Current"></div>` : u}
        ${f("heat")} ${f("cool")}
      </div>
      ${m.length ? h`<div class="ticks">
            ${m.map(
      (v) => h`<div class="tick ${v.label ? "lbl" : ""}" style=${w(a(`${v.fraction * 100}%`))}></div>
                ${v.label ? h`<div class="tick-l" style=${w(a(`${v.fraction * 100}%`))}>${v.value}</div>` : u}`
    )}
          </div>` : u}
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
    const i = this._sp.edit, o = pt(i, this._config?.setpoint?.bar);
    return ki(this._barFraction(t, e), o);
  }
  _barKey(t, e) {
    const i = this._sp.edit;
    if (!i) return;
    const o = t.key === "ArrowUp" || t.key === "ArrowRight" ? 1 : t.key === "ArrowDown" || t.key === "ArrowLeft" ? -1 : 0;
    o && (t.preventDefault(), this._sp.commit(P(G(i, e), o)));
  }
  // ---- button sets ------------------------------------------------------------
  _renderSet(t) {
    const e = re(this._config?.buttons, t.config.style), i = t.type !== "chips" && t.orientation === "row" && t.align === "stretch", o = { ...Ye(e) };
    i && (o["grid-template-columns"] = t.columns ? `repeat(${t.columns}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))");
    const s = {
      set: !0,
      grid: i,
      flex: !i,
      [`t-${t.type}`]: !0,
      [`o-${t.orientation}`]: !0,
      [`a-${t.align}`]: !0,
      [`v-${e.variant}`]: !0,
      [`ip-${e.icon_position}`]: !0
    };
    if (t.type === "chips") {
      const c = (t.config.chips ?? []).map((d, l) => Vt(this.hass, d, l));
      return h`<div class=${ht(s)} style=${w(o)} role="group" aria-label=${t.title}>
        ${c.map((d) => this._renderChip(d, e.content))}
      </div>`;
    }
    const r = e.content !== "label", a = e.content !== "icon";
    return h`<div class=${ht(s)} style=${w(o)} role="group" aria-label=${t.title}>
      ${t.options.map(
      (c) => h`<button
          class="btn ${c.active ? "active" : ""}"
          style=${w({ "--c": c.color })}
          aria-pressed=${c.active}
          title=${c.label}
          @click=${() => {
        const d = We(t.type, this._config.entity, c.value);
        d && this._call(d);
      }}
        >
          ${r ? h`<ha-icon icon=${c.icon}></ha-icon>` : u}
          ${a ? h`<span class="lbl">${c.label}</span>` : u}
        </button>`
    )}
    </div>`;
  }
  _renderToggles(t) {
    return h`<div class="toggles">
      ${t.map((e) => {
      const i = this._open.has(e.key);
      return h`<button class="tgl ${i ? "open" : ""}" aria-expanded=${i} @click=${() => this._toggleSet(e.key)}>
          <ha-icon icon=${e.toggleIcon}></ha-icon><span>${e.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
    })}
    </div>`;
  }
  // ---- chips --------------------------------------------------------------------
  _renderChip(t, e) {
    const i = t.config.show_name ?? e !== "icon", o = t.config.show_state ?? !0, s = t.type === "rf_fan";
    return h`<button
      class="chip ${t.on ? "on" : ""} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
      aria-label=${`${t.name}: ${t.state}`}
      title=${`${t.name}: ${t.state}`}
      @pointerdown=${(r) => this._chipDown(r, t)}
      @pointerup=${this._chipCancelHold}
      @pointerleave=${this._chipCancelHold}
      @pointercancel=${this._chipCancelHold}
      @click=${() => this._chipTap(t)}
      @contextmenu=${(r) => r.preventDefault()}
    >
      <ha-icon class=${t.spin ? "spin" : ""} style=${w(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>
      ${i ? h`<span>${t.name}</span>` : u}
      ${o && (!s || t.speed !== null || !t.on) ? h`<span class="badge">${t.state}</span>` : u}
      ${s && t.natural ? h`<span class="extra"><ha-icon icon="mdi:leaf"></ha-icon></span>` : u}
      ${s && t.lightOn ? h`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : u}
      ${s && t.timerEnds ? h`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${Pi(t.timerEnds)}</span>` : u}
    </button>`;
  }
  _chipDown(t, e) {
    if (t.pointerType === "mouse" && t.button !== 0 || (this._chipCancelHold(), e.hold === "none")) return;
    const i = { fired: !1, timer: setTimeout(() => {
      i.fired = !0, this._chipAction(e, e.hold), this._fire("haptic", "medium");
    }, ji) };
    this._hold = i;
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
        const i = Ni(t.config);
        i && this._canCreate(i) ? this._showPopup(i) : this._fire("hass-more-info", { entityId: t.entity });
        break;
      }
      case "more-info":
        this._fire("hass-more-info", { entityId: t.entity });
        break;
      case "toggle":
      case "toggle_light": {
        const i = Bi(t, e);
        i && this._call(i);
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
      const s = window.loadCardHelpers;
      if (s) e = (await s()).createCardElement(t);
      else {
        const r = String(t.type);
        e = document.createElement(r.startsWith("custom:") ? r.slice(7) : `hui-${r}-card`), e.setConfig?.(t);
      }
    } catch (s) {
      console.error("[easy-thermostat-styler-card] pop-up card failed", s);
      return;
    }
    e.hass = this.hass, this._popupEl = e, this._popupOpen = !0, await this.updateComplete;
    const i = this.renderRoot.querySelector("dialog.popup"), o = this.renderRoot.querySelector(".popup-body");
    !i || !o || (o.replaceChildren(e), i.open || i.showModal?.());
  }
  _renderPopup() {
    return this._popupOpen ? h`<dialog
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
    </dialog>` : u;
  }
};
Tt.styles = Li;
let A = Tt;
W([
  kt({ attribute: !1 })
], A.prototype, "hass");
W([
  E()
], A.prototype, "_config");
W([
  E()
], A.prototype, "_open");
W([
  E()
], A.prototype, "_tick");
W([
  E()
], A.prototype, "_popupOpen");
customElements.get(et) || customElements.define(et, A);
const nt = window;
nt.customCards = nt.customCards ?? [];
nt.customCards.some((n) => n.type === et) || nt.customCards.push({
  type: et,
  name: "Easy Thermostat Styler Card (Ltek)",
  description: "A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.",
  preview: !0
});
console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${Qt} `, "background:#ff8100;color:#fff", "background:#333;color:#fff");
