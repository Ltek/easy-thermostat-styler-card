/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, $t = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), Rt = /* @__PURE__ */ new WeakMap();
let Xt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if ($t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Jt = (n) => new Xt(typeof n == "string" ? n : n + "", void 0, yt), Zt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, o, r) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + n[r + 1], n[0]);
  return new Xt(e, n, yt);
}, be = (n, t) => {
  if ($t) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = G.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, n.appendChild(i);
  }
}, Ot = $t ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Jt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _e, defineProperty: $e, getOwnPropertyDescriptor: ye, getOwnPropertyNames: we, getOwnPropertySymbols: xe, getPrototypeOf: ke } = Object, rt = globalThis, Pt = rt.trustedTypes, Se = Pt ? Pt.emptyScript : "", Ae = rt.reactiveElementPolyfillSupport, I = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Se : null;
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
} }, wt = (n, t) => !_e(n, t), Ut = { attribute: !0, type: String, converter: Q, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ??= Symbol("metadata"), rt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ut) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && $e(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: r } = ye(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: o, set(s) {
      const a = o?.call(this);
      r?.call(this, s), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = ke(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const e = this.properties, i = [...we(e), ...xe(e)];
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
    return be(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Q).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), s = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Q;
      this._$Em = o;
      const a = s.fromAttribute(e, r.type);
      this[o] = a ?? this._$Ej?.get(o) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, r) {
    if (t !== void 0) {
      const s = this.constructor;
      if (o === !1 && (r = this[t]), i ??= s.getPropertyOptions(t), !((i.hasChanged ?? wt)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: r }, s) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? e ?? this[t]), r !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, r] of i) {
        const { wrapped: s } = r, a = this[o];
        s !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, r, a);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[I("elementProperties")] = /* @__PURE__ */ new Map(), U[I("finalized")] = /* @__PURE__ */ new Map(), Ae?.({ ReactiveElement: U }), (rt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, Nt = (n) => n, tt = xt.trustedTypes, Bt = tt ? tt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Qt = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, te = "?" + S, Ee = `<${te}>`, R = document, j = () => R.createComment(""), F = (n) => n === null || typeof n != "object" && typeof n != "function", kt = Array.isArray, Ce = (n) => kt(n) || typeof n?.[Symbol.iterator] == "function", ct = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Lt = /-->/g, Dt = />/g, C = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, It = /"/g, ee = /^(?:script|style|textarea|title)$/i, Te = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), p = Te(1), A = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), jt = /* @__PURE__ */ new WeakMap(), M = R.createTreeWalker(R, 129);
function ie(n, t) {
  if (!kt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Bt !== void 0 ? Bt.createHTML(t) : t;
}
const ze = (n, t) => {
  const e = n.length - 1, i = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = D;
  for (let a = 0; a < e; a++) {
    const c = n[a];
    let h, d, l = -1, m = 0;
    for (; m < c.length && (s.lastIndex = m, d = s.exec(c), d !== null); ) m = s.lastIndex, s === D ? d[1] === "!--" ? s = Lt : d[1] !== void 0 ? s = Dt : d[2] !== void 0 ? (ee.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = C) : d[3] !== void 0 && (s = C) : s === C ? d[0] === ">" ? (s = o ?? D, l = -1) : d[1] === void 0 ? l = -2 : (l = s.lastIndex - d[2].length, h = d[1], s = d[3] === void 0 ? C : d[3] === '"' ? It : Ht) : s === It || s === Ht ? s = C : s === Lt || s === Dt ? s = D : (s = C, o = void 0);
    const g = s === C && n[a + 1].startsWith("/>") ? " " : "";
    r += s === D ? c + Ee : l >= 0 ? (i.push(h), c.slice(0, l) + Qt + c.slice(l) + S + g) : c + S + (l === -2 ? a : g);
  }
  return [ie(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class q {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = t.length - 1, c = this.parts, [h, d] = ze(t, e);
    if (this.el = q.createElement(h, i), M.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = M.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith(Qt)) {
          const m = d[s++], g = o.getAttribute(l).split(S), f = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: r, name: f[2], strings: g, ctor: f[1] === "." ? Re : f[1] === "?" ? Oe : f[1] === "@" ? Pe : st }), o.removeAttribute(l);
        } else l.startsWith(S) && (c.push({ type: 6, index: r }), o.removeAttribute(l));
        if (ee.test(o.tagName)) {
          const l = o.textContent.split(S), m = l.length - 1;
          if (m > 0) {
            o.textContent = tt ? tt.emptyScript : "";
            for (let g = 0; g < m; g++) o.append(l[g], j()), M.nextNode(), c.push({ type: 2, index: ++r });
            o.append(l[m], j());
          }
        }
      } else if (o.nodeType === 8) if (o.data === te) c.push({ type: 2, index: r });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(S, l + 1)) !== -1; ) c.push({ type: 7, index: r }), l += S.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const i = R.createElement("template");
    return i.innerHTML = t, i;
  }
}
function B(n, t, e = n, i) {
  if (t === A) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = F(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(n), o._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = B(n, o._$AS(n, t.values), o, i)), t;
}
class Me {
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
    M.currentNode = o;
    let r = M.nextNode(), s = 0, a = 0, c = i[0];
    for (; c !== void 0; ) {
      if (s === c.index) {
        let h;
        c.type === 2 ? h = new V(r, r.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (h = new Ue(r, this, t)), this._$AV.push(h), c = i[++a];
      }
      s !== c?.index && (r = M.nextNode(), s++);
    }
    return M.currentNode = R, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class V {
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
    t = B(this, t, e), F(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ce(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && F(this._$AH) ? this._$AA.nextSibling.data = t : this.T(R.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = q.createElement(ie(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const r = new Me(o, this), s = r.u(this.options);
      r.p(e), this.T(s), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = jt.get(t.strings);
    return e === void 0 && jt.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    kt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const r of t) o === e.length ? e.push(i = new V(this.O(j()), this.O(j()), this, this.options)) : i = e[o], i._$AI(r), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Nt(t).nextSibling;
      Nt(t).remove(), t = i;
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
  constructor(t, e, i, o, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) t = B(this, t, e, 0), s = !F(t) || t !== this._$AH && t !== A, s && (this._$AH = t);
    else {
      const a = t;
      let c, h;
      for (t = r[0], c = 0; c < r.length - 1; c++) h = B(this, a[i + c], e, c), h === A && (h = this._$AH[c]), s ||= !F(h) || h !== this._$AH[c], h === u ? t = u : t !== u && (t += (h ?? "") + r[c + 1]), this._$AH[c] = h;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Re extends st {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Oe extends st {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Pe extends st {
  constructor(t, e, i, o, r) {
    super(t, e, i, o, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = B(this, t, e, 0) ?? u) === A) return;
    const i = this._$AH, o = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== u && (i === u || o);
    o && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ue {
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
const Ne = xt.litHtmlPolyfillSupport;
Ne?.(q, V), (xt.litHtmlVersions ??= []).push("3.3.3");
const Be = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = o = new V(t.insertBefore(j(), r), r, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Be(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
};
N._$litElement$ = !0, N.finalized = !0, St.litElementHydrateSupport?.({ LitElement: N });
const Le = St.litElementPolyfillSupport;
Le?.({ LitElement: N });
(St.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: wt }, He = (n = De, t, e) => {
  const { kind: i, metadata: o } = e;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), i === "accessor") {
    const { name: s } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, c, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: s } = e;
    return function(a) {
      const c = this[s];
      t.call(this, a), this.requestUpdate(s, c, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function At(n) {
  return (t, e) => typeof e == "object" ? He(n, t, e) : ((i, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, i), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function k(n) {
  return At({ ...n, state: !0, attribute: !1 });
}
const oe = "2026.10.24.3", et = "easy-thermostat-styler-card", ut = "easy-thermostat-styler-card-editor", ne = [
  "name",
  "status",
  "current",
  "unit",
  "humidity",
  "pill",
  "wheel_value",
  "wheel_neighbor",
  "bar"
], Ie = [
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
}, re = [
  { type: "hvac" },
  { type: "preset", display: "toggle" },
  { type: "fan_mode", display: "toggle" }
], O = (n) => !!n && typeof n == "object" && !Array.isArray(n);
function it(n) {
  if (!(n == null || n === "")) {
    if (typeof n == "number") return Number.isFinite(n) ? n : void 0;
    if (Array.isArray(n)) {
      const t = n.map(it).filter((e) => e !== void 0);
      return t.length ? t : void 0;
    }
    if (O(n)) {
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
function je(n) {
  if (!O(n) || typeof n.type != "string") return;
  const t = { ...n };
  return "columns" in t && (t.columns = X(t.columns, 0, 12) || void 0), Array.isArray(t.chips) && (t.chips = t.chips.filter((e) => O(e) && typeof e.entity == "string" && e.entity)), t;
}
function ft(n) {
  if (!O(n)) throw new Error("Invalid configuration");
  const t = { ...n };
  if (typeof t.entity != "string" || !t.entity)
    throw new Error("Easy Thermostat Styler Card: set an entity (a climate.* entity).");
  const e = O(t.setpoint) ? { ...t.setpoint } : void 0;
  return e && ("scale" in e && (e.scale = X(e.scale, 40, 250)), "neighbors" in e && (e.neighbors = X(e.neighbors, 0, 3)), "min_gap" in e && (e.min_gap = X(e.min_gap, 0, 20)), t.setpoint = e), Array.isArray(t.sets) && (t.sets = t.sets.map(je).filter(Boolean), t.sets.length === 0) ? { ...it({ ...t, sets: void 0 }), sets: [] } : it(t);
}
function Fe(n, t) {
  return t.split(".").reduce((e, i) => O(e) || Array.isArray(e) ? e[i] : void 0, n);
}
function lt(n, t, e) {
  const i = t.split("."), o = (r, s) => {
    const a = Array.isArray(r) ? [...r] : O(r) ? { ...r } : {}, c = i[s];
    if (s === i.length - 1)
      e === void 0 || e === "" || e === null ? Array.isArray(a) ? a.splice(Number(c), 1) : delete a[c] : a[c] = e;
    else {
      const h = o(a[c], s + 1);
      h === void 0 ? delete a[c] : a[c] = h;
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
}, qe = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, se = {
  hvac: { list: "hvac_modes", active: null },
  preset: { list: "preset_modes", active: "preset_mode" },
  fan_mode: { list: "fan_modes", active: "fan_mode" }
}, Et = {
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
}, Ft = {
  heat_cool: "Heat/Cool",
  fan_only: "Fan only",
  off: "Off"
}, Ve = {
  heat: "var(--state-climate-heat-color, #ff8100)",
  cool: "var(--state-climate-cool-color, #2b9af9)",
  heat_cool: "var(--state-climate-heat-cool-color, #ffa600)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan-only-color, #009688)",
  off: "var(--state-climate-off-color, #8a8a8a)"
}, qt = "var(--primary-color, #03a9f4)";
function mt(n) {
  if (Ft[n]) return Ft[n];
  const t = n.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function We(n, t, e, i) {
  const o = n;
  try {
    if (e === "hvac" && o.formatEntityState) return o.formatEntityState(t, i);
    if (e !== "hvac" && e !== "chips" && o.formatEntityAttributeValue) {
      const r = e === "preset" ? "preset_mode" : "fan_mode", s = o.formatEntityAttributeValue(t, r, i);
      if (s) return s;
    }
  } catch {
  }
  return mt(i);
}
function Ye(n) {
  return Array.isArray(n.sets) ? n.sets : re;
}
function gt(n, t) {
  if (!n || t === "chips") return [];
  const e = n.attributes[se[t].list];
  return Array.isArray(e) ? e.map(String) : [];
}
function ae(n, t) {
  if (!t?.length) return n;
  const e = /* @__PURE__ */ new Set(), i = [];
  for (const o of t) n.includes(o) && !e.has(o) && (i.push(o), e.add(o));
  for (const o of n) e.has(o) || i.push(o);
  return i;
}
function Ke(n, t) {
  const e = n.states[t.entity], i = [];
  return Ye(t).forEach((o, r) => {
    if (o.hidden) return;
    const s = o.type;
    let a = [];
    if (s !== "chips") {
      if (!e) return;
      const c = gt(e, s);
      if (!c.length) return;
      const h = se[s].active, d = h ? String(e.attributes[h] ?? "") : e.state;
      if (a = ae(c, o.order).filter((l) => !o.options?.[l]?.hide).map((l) => {
        const m = o.options?.[l];
        return {
          value: l,
          label: m?.name ?? We(n, e, s, l),
          icon: m?.icon ?? Et[l.toLowerCase()] ?? "mdi:circle-medium",
          active: l === d,
          color: s === "hvac" ? Ve[l] ?? qt : qt
        };
      }), !a.length) return;
    } else if (!o.chips?.length) return;
    i.push({
      key: `${s}-${r}`,
      index: r,
      type: s,
      title: o.name ?? J[s],
      zone: o.zone ?? (t.toggles_zone || "bottom"),
      orientation: o.orientation ?? (o.zone === "left" || o.zone === "right" ? "column" : "row"),
      columns: o.columns ?? 0,
      align: o.align ?? (s === "chips" ? "center" : "stretch"),
      // Compact turns full-time sets into toggles; menus are already compact.
      display: o.display === "menu" && s !== "chips" ? "menu" : t.compact ? "toggle" : o.display ?? "always",
      menuDirection: o.menu_direction ?? vt(o.zone ?? (t.toggles_zone || "bottom")),
      menuShowName: o.menu_show_name ?? !0,
      toggleIcon: o.toggle_icon ?? qe[s],
      options: a,
      config: o
    });
  }), i;
}
function vt(n) {
  return n === "bottom" ? "up" : n === "left" ? "right" : n === "right" ? "left" : "down";
}
function Vt(n, t, e) {
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
const ce = {
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
function bt(n, t) {
  const e = { ...ce };
  for (const i of [n, t])
    if (i)
      for (const o of Ie) {
        const r = i[o];
        r !== void 0 && r !== "" && r !== null && (e[o] = r);
      }
  return e;
}
const H = (n) => n ? `${n}px` : void 0;
function Wt(n) {
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
  return Ct(t);
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
function Xe(n) {
  const t = {};
  for (const e of ne) {
    const i = n?.[e];
    if (!i) continue;
    const o = `--etc-t-${Ge[e]}`;
    t[`${o}-fs`] = H(i.size), t[`${o}-fw`] = i.weight ? String(i.weight) : void 0, t[`${o}-c`] = i.color, t[`${o}-tt`] = i.transform, t[`${o}-ls`] = i.letter_spacing !== void 0 ? `${i.letter_spacing / 100}em` : void 0, t[`${o}-fst`] = i.italic === void 0 ? void 0 : i.italic ? "italic" : "normal", t[`${o}-op`] = i.opacity !== void 0 ? String(i.opacity / 100) : void 0;
  }
  return Ct(t);
}
function Je(n) {
  const t = n.card ?? {}, e = n.setpoint ?? {};
  return Ct({
    "--etc-card-bg": t.background,
    "--etc-card-bc": t.border_color,
    "--etc-card-bw": t.border_width !== void 0 ? `${t.border_width}px` : void 0,
    "--etc-card-r": t.radius !== void 0 ? `${t.radius}px` : void 0,
    "--etc-card-pad": t.padding !== void 0 ? `${t.padding}px` : void 0,
    "--etc-scale": e.scale !== void 0 ? String(e.scale / 100) : void 0
  });
}
function Ct(n) {
  const t = {};
  for (const [e, i] of Object.entries(n)) i !== void 0 && i !== "" && (t[e] = i);
  return t;
}
const Ze = `
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
`, le = [
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
], Yt = [
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
function Qe(n) {
  return le.some((t) => n[t] !== void 0);
}
function ti(n, t) {
  const e = { ...n };
  for (const i of le) delete e[i];
  return { ...e, ...structuredClone(t.values) };
}
var ei = Object.defineProperty, W = (n, t, e, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(t, e, o) || o);
  return o && ei(t, e, o), o;
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
function ii(n) {
  const t = n == null ? "" : String(n);
  return t === "" ? "default" : /^#[0-9a-fA-F]{3,8}$/.test(t) ? "custom" : /^var\(/.test(t) && Z.some(([e]) => e === t) ? "theme" : "css";
}
const oi = {
  name: "Name",
  status: "Status (Heating / Cooling)",
  current: "Current temperature",
  unit: "Unit (°)",
  humidity: "Humidity",
  pill: "Setpoint pills",
  wheel_value: "Wheel / stepper value",
  wheel_neighbor: "Wheel next values",
  bar: "Bar labels"
}, ni = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, zt = class zt extends N {
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
    return Fe(this._config, t);
  }
  /** The configured sets, materialized from the defaults on first edit. */
  _sets() {
    return Array.isArray(this._config?.sets) ? this._config.sets : re.map((t) => ({ ...t }));
  }
  _writeSets(t) {
    this._emit({ ...this._config, sets: t });
  }
  _patchSet(t, e, i, o) {
    const r = this._sets(), s = lt(r[t] ?? {}, e, i === o ? void 0 : i);
    r[t] = { ...s, type: r[t].type }, this._writeSets(r);
  }
  // ---- primitives -------------------------------------------------------------
  _toggleOpen(t, e) {
    const i = e.currentTarget.open, o = new Set(this._open);
    i ? o.add(t) : o.delete(t), this._open = o;
  }
  _panel(t, e, i, o) {
    return p`<details class="etce-sec" ?open=${this._open.has(t)} @toggle=${(r) => this._toggleOpen(t, r)}>
      <summary><ha-icon icon=${e}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${this._open.has(t) ? o : u}</div>
    </details>`;
  }
  _sub(t, e, i) {
    return p`<details class="etce-sub" ?open=${this._open.has(t)} @toggle=${(o) => this._toggleOpen(t, o)}>
      <summary>${e}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${this._open.has(t) ? i() : u}</div>
    </details>`;
  }
  _group(t, e = !1) {
    return p`<div class="etce-group ${e ? "first" : ""}">${t}</div>`;
  }
  _hint(t) {
    return p`<p class="etce-hint">${t}</p>`;
  }
  _check(t, e, i) {
    return p`<label class="etce-check"
      ><input type="checkbox" .checked=${e} @change=${(o) => i(o.target.checked)} />${t}</label
    >`;
  }
  _bool(t, e, i) {
    const o = this._get(t) ?? i;
    return this._check(e, o, (r) => this._put(t, r, i));
  }
  _selectRow(t, e, i, o) {
    return p`<div class="etce-row">
      <label class="lbl">${t}</label>
      <select @change=${(r) => o(r.target.value)}>
        ${i.map(([r, s]) => p`<option value=${r} ?selected=${r === e}>${s}</option>`)}
      </select>
    </div>`;
  }
  _select(t, e, i, o) {
    const r = String(this._get(t) ?? o);
    return this._selectRow(e, r, i, (s) => this._put(t, s, o));
  }
  _sliderRow(t, e, i, o, r, s, a, c = (h) => `${h}px`) {
    return p`<div class="etce-row etce-nowrap">
      <label class="lbl">${t}</label>
      <input
        type="range"
        min=${i}
        max=${o}
        step=${r}
        .value=${String(e)}
        @input=${(h) => {
      const d = h.target;
      d.nextElementSibling.textContent = c(Number(d.value));
    }}
        @change=${(h) => a(Number(h.target.value))}
      />
      <span class="etce-val">${c(e)}</span>
      ${s ? p`<button class="etce-reset" title="Back to default" @click=${() => a(void 0)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>` : u}
    </div>`;
  }
  _slider(t, e, i, o, r, s, a) {
    const c = this._get(t);
    return this._sliderRow(e, c ?? s, i, o, r, c !== void 0, (h) => this._put(t, h, s), a);
  }
  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  _colorRow(t, e, i, o, r, s) {
    const a = this._cmode[t] || ii(i);
    let c = u;
    if (a === "theme")
      c = p`<select @change=${(d) => s(d.target.value)}>
        ${Z.map(([d, l]) => p`<option value=${d} ?selected=${d === i}>${l}</option>`)}
      </select>`;
    else if (a === "custom") {
      const d = i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : r;
      c = p`<input type="color" .value=${d} @change=${(l) => s(l.target.value)} />`;
    } else a === "css" && (c = p`<input
        type="text"
        .value=${i ?? ""}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(d) => s(d.target.value || void 0)}
      />`);
    const h = (d) => {
      this._cmode = { ...this._cmode, [t]: d }, d === "default" ? s(void 0) : d === "theme" ? s(Z.some(([l]) => l === i) ? i : Z[0][0]) : d === "custom" ? s(i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : r) : this.requestUpdate();
    };
    return p`<div class="etce-row">
      <label class="lbl">${e}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(d) => h(d.target.value)}>
          ${[["default", o], ["theme", "Theme color"], ["custom", "Custom color"], ["css", "Custom CSS"]].map(
      ([d, l]) => p`<option value=${d} ?selected=${d === a}>${l}</option>`
    )}
        </select>
        ${c}
      </div>
    </div>`;
  }
  _color(t, e, i, o) {
    return this._colorRow(t, e, this._get(t), i, o, (r) => this._put(t, r));
  }
  _selector(t, e, i, o) {
    return p`<div class="etce-row">
      ${t ? p`<label class="lbl">${t}</label>` : u}
      <ha-selector
        .hass=${this.hass}
        .selector=${e}
        .value=${i}
        @value-changed=${(r) => o(r.detail.value)}
      ></ha-selector>
    </div>`;
  }
  // ---- render -----------------------------------------------------------------
  render() {
    return this._config ? p`<div class="etce">
      ${this._panel("thermostat", "mdi:thermostat", "Thermostat", this._thermostatBody())}
      ${this._panel("look", "mdi:palette-outline", "Look", this._lookBody())}
      ${this._panel("setpoint", "mdi:knob", "Setpoint control", this._setpointBody())}
      ${this._panel("sets", "mdi:gesture-tap-button", "Button sets", this._setsBody())}
      ${this._panel("buttons", "mdi:palette-swatch-outline", "Button style", this._buttonsBody())}
      ${this._panel("text", "mdi:format-text", "Text", this._textBody())}
      ${this._panel("card", "mdi:card-outline", "Card", this._cardBody())}
      <div class="etce-foot">Easy Thermostat Styler Card v${oe}</div>
    </div>` : u;
  }
  _thermostatBody() {
    const t = this._config;
    return p`
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
      const i = Yt.find((o) => o.id === e);
      Qe(this._config) && !window.confirm(`Apply the ${i.name} look? It replaces this card's button, text and card styling.`) || this._emit(ti(this._config, i));
    };
    return p`
      ${this._hint("Start from a built-in look, then fine-tune under Button style, Text and Card. Your button sets and setpoint control are kept.")}
      <div class="etce-blist">
        ${Yt.map(
      (e) => p`<div class="etce-brow">
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
    return p`
      ${this._hint("How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.")}
      ${this._select(
      "setpoint.control",
      "Control",
      [["wheel", "Wheel"], ["stepper", "− / + stepper"], ["bar", "Setpoint bar"], ["none", "None (display only)"]],
      _.control
    )}
      ${t === "wheel" || t === "stepper" ? p`
            ${this._select("setpoint.position", "Position", [["left", "Left"], ["right", "Right"], ["center", "Center (below)"]], _.position)}
            ${this._slider("setpoint.scale", "Size", 40, 250, 5, _.scale, (e) => `${e}%`)}
            ${t === "wheel" ? p`${this._slider("setpoint.neighbors", "Next values shown", 0, 3, 1, _.neighbors, (e) => String(e))}
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
    return p`
      ${this._select(
      "setpoint.bar.position",
      "Position",
      [["below", "Below (horizontal)"], ["above", "Above (horizontal)"], ["left", "Left (vertical)"], ["right", "Right (vertical)"]],
      t.position
    )}
      ${["left", "right"].includes(String(this._get("setpoint.bar.position") ?? "")) ? this._slider("setpoint.bar.length", "Height", 100, 400, 10, 200) : u}
      ${this._select("setpoint.bar.look", "Look", [["zones", "Heat / comfort / cool zones"], ["gradient", "Gradient"]], t.look)}
      ${e === "gradient" ? p`<div class="etce-row">
            <label class="lbl">Gradient (cold → hot)</label>
            <div class="etce-stops">
              ${i.map(
      (o, r) => p`<input
                  type="color"
                  .value=${o}
                  @change=${(s) => {
        const a = [...i];
        a[r] = s.target.value, this._put("setpoint.bar.stops", a);
      }}
                />`
    )}
            </div>
          </div>` : p`${this._color("setpoint.bar.heat_color", "Heat zone", "Theme heat", "#ff8100")}
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
      (o) => p`<div class="etce-row">
          <label class="lbl">${o === "range_min" ? "From" : "To"}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${o}`) ?? "")}
            @change=${(r) => {
        const s = r.target.value;
        this._put(`setpoint.bar.${o}`, s === "" ? void 0 : Number(s));
      }}
          />
        </div>`
    )}
    `;
  }
  // ---- button sets --------------------------------------------------------------
  _setsBody() {
    const t = this._sets(), e = this.hass?.states[this._config.entity], i = (o) => {
      const r = [...t, o === "chips" ? { type: o, chips: [] } : { type: o }];
      this._set = r.length - 1, this._writeSets(r);
    };
    return p`
      ${this._hint("Groups of buttons. Each set picks its side of the card, its layout, and whether it shows full time or behind a toggle button (compact).")}
      <div class="etce-addbar">
        ${["hvac", "preset", "fan_mode", "chips"].map(
      (o) => p`<button class="etce-add" @click=${() => i(o)}>+ ${J[o]}</button>`
    )}
      </div>
      <div class="etce-slist">
        ${t.map((o, r) => {
      const s = o.type === "chips" || gt(e, o.type).length > 0, a = this._set === r;
      return p`<div class="etce-srow ${o.hidden ? "off" : ""} ${a ? "open" : ""}">
              <ha-icon class="etce-sicon" icon=${ni[o.type]}></ha-icon>
              <span class="etce-sname" @click=${() => this._set = a ? null : r}>${o.name ?? J[o.type]}</span>
              <span class="etce-stag"
                >${s ? `${o.zone ?? "bottom"} · ${(this._config.compact ? "toggle" : o.display) ?? "always"}` : "not on this entity"}</span
              >
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._set = a ? null : r}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" title="Move up" ?disabled=${r === 0} @click=${() => this._moveSet(r, -1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button class="etce-act" title="Move down" ?disabled=${r === t.length - 1} @click=${() => this._moveSet(r, 1)}>
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
                <button class="etce-act etce-eye ${o.hidden ? "off" : ""}" title=${o.hidden ? "Show" : "Hide"} @click=${() => this._patchSet(r, "hidden", !o.hidden, !1)}>
                  <ha-icon icon=${o.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
                <button class="etce-act del" title="Delete" @click=${() => this._deleteSet(r)}>
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${a ? p`<div class="etce-sedit">${this._setEditor(o, r)}</div>` : u}`;
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
    const i = t.zone ?? "bottom", o = i === "left" || i === "right", r = (s, a, c) => this._patchSet(e, s, a, c);
    return p`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${J[t.type]} @change=${(s) => r("name", s.target.value || void 0)} />
      </div>
      ${this._group("Placement")}
      ${this._selectRow("Side", i, [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], (s) => r("zone", s, "bottom"))}
      ${this._selectRow(
      "Orientation",
      t.orientation ?? (o ? "column" : "row"),
      [["row", "Row"], ["column", "Column"]],
      (s) => r("orientation", s, o ? "column" : "row")
    )}
      ${this._selectRow(
      "Align",
      t.align ?? (t.type === "chips" ? "center" : "stretch"),
      [["stretch", "Fill width"], ["start", "Start"], ["center", "Center"], ["end", "End"]],
      (s) => r("align", s, t.type === "chips" ? "center" : "stretch")
    )}
      ${(t.align ?? "stretch") === "stretch" && t.type !== "chips" ? this._sliderRow("Columns", t.columns ?? 0, 0, 8, 1, t.columns !== void 0, (s) => r("columns", s, 0), (s) => s ? String(s) : "Auto") : u}
      ${this._group("Display")}
      ${this._selectRow(
      "Show",
      t.display ?? "always",
      [["always", "Full time"], ["toggle", "Behind a toggle button"], ...t.type === "chips" ? [] : [["menu", "Expandable menu"]]],
      (s) => r("display", s, "always")
    )}
      ${t.display === "menu" ? p`${this._hint("One button shows the current value; tap it to open the full list.")}
          ${this._selectRow(
      "Opens",
      t.menu_direction ?? vt(i),
      [["down", "Down"], ["up", "Up"], ["right", "Right"], ["left", "Left"]],
      (s) => r("menu_direction", s, vt(i))
    )}
          ${this._check("Show the set name on the button", t.menu_show_name ?? !0, (s) => r("menu_show_name", s, !0))}` : u}
      ${(t.display ?? "always") === "toggle" || this._config.compact && t.display !== "menu" ? this._selector("Toggle icon", { icon: {} }, t.toggle_icon, (s) => r("toggle_icon", s || void 0)) : u}
      ${t.type === "chips" ? this._sub(`set-${e}-chips`, "Chips", () => this._chipsEditor(t, e)) : this._sub(`set-${e}-options`, "Buttons in this set", () => this._optionsEditor(t, e))}
      ${this._sub(`set-${e}-style`, "Button style for this set", () => this._buttonStyleEditor(`sets.${e}.style`, !0, e))}
    `;
  }
  _optionsEditor(t, e) {
    const i = this.hass?.states[this._config.entity], o = ae(gt(i, t.type), t.order);
    if (!o.length) return this._hint("This entity has no options for this set.");
    const r = (s, a) => {
      const c = [...o], h = s + a;
      h < 0 || h >= c.length || ([c[s], c[h]] = [c[h], c[s]], this._patchSet(e, "order", c));
    };
    return p`${this._hint("Order, hide, rename and re-icon each button.")}
      <div class="etce-blist">
        ${o.map((s, a) => {
      const c = t.options?.[s] ?? {}, h = `${e}:${s}`;
      return p`<div class="etce-brow ${c.hide ? "off" : ""}">
              <ha-icon class="etce-sicon" icon=${c.icon ?? Et[s.toLowerCase()] ?? "mdi:circle-medium"}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = this._chip === h ? null : h}>${c.name ?? mt(s)}</span>
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._chip = this._chip === h ? null : h}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === 0} @click=${() => r(a, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === o.length - 1} @click=${() => r(a, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act etce-eye ${c.hide ? "off" : ""}" @click=${() => this._patchSet(e, `options.${s}.hide`, !c.hide, !1)}>
                  <ha-icon icon=${c.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
              </div>
            </div>
            ${this._chip === h ? p`<div class="etce-sedit">
                  <div class="etce-row">
                    <label class="lbl">Label</label>
                    <input type="text" .value=${c.name ?? ""} placeholder=${mt(s)} @change=${(d) => this._patchSet(e, `options.${s}.name`, d.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, c.icon, (d) => this._patchSet(e, `options.${s}.icon`, d || void 0))}
                </div>` : u}`;
    })}
      </div>`;
  }
  _chipsEditor(t, e) {
    const i = t.chips ?? [], o = (s) => this._patchSet(e, "chips", s.length ? s : void 0), r = (s) => {
      const a = s === "rf_fan" ? this._firstRfFan() ?? "" : "";
      this._chip = `chip:${e}:${i.length}`;
      const c = a || Object.keys(this.hass?.states ?? {}).find((h) => h.startsWith(s === "rf_fan" ? "fan." : "sensor.")) || "";
      c && o([...i, { type: s, entity: c }]);
    };
    return p`
      ${this._hint("Status chips for linked devices. RF fan chips find the fan’s light and sleep timer automatically. Tap opens the fan card in a pop-up; hold toggles.")}
      <div class="etce-addbar">
        <button class="etce-add" @click=${() => r("rf_fan")}>+ RF fan</button>
        <button class="etce-add" @click=${() => r("entity")}>+ Entity</button>
      </div>
      <div class="etce-blist">
        ${i.map((s, a) => {
      const c = `chip:${e}:${a}`, h = this._chip === c, d = this.hass?.states[s.entity], l = s.name ?? d?.attributes.friendly_name ?? s.entity, m = (f, b, v) => {
        const w = [...i];
        w[a] = lt(w[a], f, b === v ? void 0 : b), w[a] = { ...w[a], type: s.type, entity: w[a].entity || s.entity }, o(w);
      }, g = (f) => {
        const b = [...i], v = a + f;
        v < 0 || v >= b.length || ([b[a], b[v]] = [b[v], b[a]], o(b));
      };
      return p`<div class="etce-brow">
              <ha-icon class="etce-sicon" icon=${s.icon ?? (s.type === "rf_fan" ? "mdi:ceiling-fan" : "mdi:shape-outline")}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = h ? null : c}>${l}</span>
              <span class="etce-stag">${s.type === "rf_fan" ? "RF fan" : "Entity"}</span>
              <div class="etce-sctl">
                <button class="etce-act" @click=${() => this._chip = h ? null : c}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === 0} @click=${() => g(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${a === i.length - 1} @click=${() => g(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act del" @click=${() => o(i.filter((f, b) => b !== a))}><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>
              </div>
            </div>
            ${h ? p`<div class="etce-sedit">
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
                  ${(s.tap ?? (s.type === "rf_fan" ? "popup" : "more-info")) === "popup" ? p`${this._hint(
        s.type === "rf_fan" ? "Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan." : "Pop-up card config (any card)."
      )}
                      ${this._selector("", { object: {} }, s.popup_card, (f) => m("popup_card", f && Object.keys(f).length ? f : void 0))}` : u}
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
    return p`${this._hint("The look of every button. Each button set can override any of these under “Button style for this set”.")}
      ${this._buttonStyleEditor("buttons", !1)}`;
  }
  _buttonStyleEditor(t, e, i) {
    const o = (e ? this._sets()[i]?.style : this._config.buttons) ?? {}, r = e ? bt(this._config.buttons, void 0) : ce, s = e ? "Card default" : "Built-in", a = (l, m) => {
      e ? this._patchSet(i, `style.${l}`, m) : this._put(`${t}.${l}`, m);
    }, c = (l, m, g) => {
      const f = String(r[l] ?? ""), b = g.find(([v]) => v === f)?.[1] ?? f;
      return this._selectRow(m, String(o[l] ?? ""), [["", `${s} (${b})`], ...g], (v) => a(l, v || void 0));
    }, h = (l, m, g, f) => {
      const b = Number(r[l] ?? 0), v = o[l];
      return this._sliderRow(m, v ?? b, g, f, 1, v !== void 0, (w) => a(l, w));
    }, d = (l, m, g) => this._colorRow(`${t}.${l}`, m, o[l], e ? "Card default" : "Automatic", g, (f) => a(l, f));
    return p`
      ${this._group("Shape", !0)}
      ${c("variant", "Style", [["tonal", "Tonal (tinted)"], ["filled", "Filled"], ["outlined", "Outlined"], ["ghost", "Ghost"]])}
      ${h("radius", "Corner radius", 0, 40)} ${h("height", "Min height", 0, 120)} ${h("min_width", "Min width", 0, 200)}
      ${h("gap", "Spacing", 0, 32)} ${h("border_width", "Border width", 0, 6)}
      ${this._group("Content")}
      ${c("content", "Show", [["icon_label", "Icon and label"], ["icon", "Icon only"], ["label", "Label only"]])}
      ${c("icon_position", "Icon", [["top", "Above label"], ["left", "Left of label"]])}
      ${h("icon_size", "Icon size", 10, 48)} ${h("font_size", "Text size", 8, 28)}
      ${c("font_weight", "Text weight", [["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"]])}
      ${this._group("Colors — inactive")}
      ${d("background", "Background", "#2a2a2a")} ${d("color", "Text & icon", "#cccccc")} ${d("border_color", "Border", "#555555")}
      ${this._group("Colors — active")}
      ${this._hint("Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.")}
      ${d("active_background", "Background", "#ff8100")} ${d("active_color", "Text & icon", "#ffffff")}
      ${d("active_border_color", "Border", "#ff8100")}
    `;
  }
  // ---- text ---------------------------------------------------------------------
  _textBody() {
    return p`${this._hint("Size, weight, color and case for each piece of text. Unset keeps the built-in look.")}
      ${ne.map((t) => this._sub(`text-${t}`, oi[t], () => this._textRole(t)))}`;
  }
  _textRole(t) {
    const e = `text.${t}`, i = this._get(e) ?? {};
    return p`
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
    return p`
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
zt.styles = [
  Jt(Ze),
  Zt`
      :host { display: block; }
    `
];
let E = zt;
W([
  At({ attribute: !1 })
], E.prototype, "hass");
W([
  k()
], E.prototype, "_config");
W([
  k()
], E.prototype, "_open");
W([
  k()
], E.prototype, "_set");
W([
  k()
], E.prototype, "_chip");
customElements.get(ut) || customElements.define(ut, E);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = { ATTRIBUTE: 1 }, pe = (n) => (...t) => ({ _$litDirective$: n, values: t });
let de = class {
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
const ue = "important", ri = " !" + ue, $ = pe(class extends de {
  constructor(n) {
    if (super(n), n.type !== he.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const r = typeof o == "string" && o.endsWith(ri);
        i.includes("-") || r ? e.setProperty(i, r ? o.slice(0, -11) : o, r ? ue : "") : e[i] = o;
      }
    }
    return A;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = pe(class extends de {
  constructor(n) {
    if (super(n), n.type !== he.ATTRIBUTE || n.name !== "class" || n.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
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
    return A;
  }
});
function y(n) {
  if (typeof n == "number") return Number.isFinite(n) ? n : null;
  if (typeof n == "string" && n.trim() !== "") {
    const t = Number(n);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
const _t = /* @__PURE__ */ new Set(["unavailable", "unknown", "none", ""]);
function fe(n) {
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
function si(n) {
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
function ai(n, t, e) {
  return n === "off" ? "off" : t === null || e === null ? null : e.heat !== null && (n === "heat" || n === "heat_cool") && t < e.heat ? "heating" : e.cool !== null && (n === "cool" || n === "heat_cool") && t > e.cool ? "cooling" : n === "heat" || n === "cool" || n === "heat_cool" ? "idle" : null;
}
function ci(n, t) {
  if (n === "heat_cool") {
    const i = y(t.target_temp_low), o = y(t.target_temp_high);
    if (i !== null || o !== null) return { heat: i, cool: o };
    const r = y(t.temperature);
    return r === null ? null : { heat: r, cool: null };
  }
  const e = y(t.temperature);
  return e === null ? null : n === "heat" ? { heat: e, cool: null } : n === "cool" ? { heat: null, cool: e } : null;
}
function li(n, t) {
  const e = n.states[t.entity], i = n.config?.unit_system?.temperature ?? "°", o = e?.attributes.friendly_name, r = t.name ?? (typeof o == "string" ? o : t.entity);
  if (!e || _t.has(e.state))
    return {
      available: !1,
      name: r,
      currentTemp: null,
      unit: i,
      humidity: null,
      equipment: null,
      mode: "unknown",
      state: e?.state ?? "unavailable",
      setpoints: null
    };
  const s = e.attributes, a = fe(e.state), c = y(s.current_temperature), h = ci(a, s);
  return {
    available: !0,
    name: r,
    currentTemp: c,
    unit: i,
    humidity: y(s.current_humidity),
    equipment: si(s.hvac_action) ?? ai(a, c, h),
    mode: a,
    state: e.state,
    setpoints: h
  };
}
function T(n, t) {
  if (n === null) return "–";
  const e = t.includes("C"), i = e ? Math.round(n * 2) / 2 : Math.round(n);
  return e && !Number.isInteger(i) ? i.toFixed(1) : String(i);
}
const hi = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan",
  idle: "Idle",
  off: "Off"
}, pi = 1, di = 0.5, ui = 3, fi = 1.5;
function mi(n) {
  return n.includes("C") ? di : pi;
}
function gi(n, t) {
  return t.setpoint?.min_gap ?? (n.includes("C") ? fi : ui);
}
function me(n) {
  return Math.round(n * 100) / 100;
}
function z(n, t, e, i) {
  let o = i > 0 ? me(Math.round(n / i) * i) : n;
  return t !== null && o < t && (o = t), e !== null && o > e && (o = e), o;
}
function Y(n, t, e, i, o) {
  return { setpoint: n, value: z(t, e, i, o), min: e, max: i, step: o };
}
function pt(n, t, e) {
  return { available: !1, unit: n, mode: t, heat: null, cool: null, active: e, minGap: 0 };
}
function vi(n, t) {
  const e = n.config?.unit_system?.temperature ?? "°", i = n.states[t.entity], o = i ? fe(i.state) : "unknown";
  if (!i || o !== "heat" && o !== "cool" && o !== "heat_cool")
    return pt(e, o, "heat");
  const r = i.attributes, s = mi(e), a = gi(e, t), c = y(r.min_temp), h = y(r.max_temp);
  if (o === "heat_cool") {
    const l = y(r.target_temp_low), m = y(r.target_temp_high);
    if (l === null && m === null) return pt(e, o, "cool");
    const g = l !== null ? Y("heat", l, c, h, s) : null, f = m !== null ? Y("cool", m, c, h, s) : null;
    return { available: !0, unit: e, mode: o, heat: g, cool: f, active: f ? "cool" : "heat", minGap: a };
  }
  const d = y(r.temperature);
  return d === null ? pt(e, o, o === "heat" ? "heat" : "cool") : o === "heat" ? {
    available: !0,
    unit: e,
    mode: o,
    heat: Y("heat", d, c, h, s),
    cool: null,
    active: "heat",
    minGap: a
  } : {
    available: !0,
    unit: e,
    mode: o,
    heat: null,
    cool: Y("cool", d, c, h, s),
    active: "cool",
    minGap: a
  };
}
function at(n) {
  return n[n.active];
}
function Tt(n, t) {
  const e = at(n);
  if (!e) return n;
  const i = n.mode === "heat_cool" ? n[e.setpoint === "cool" ? "heat" : "cool"] : null;
  if (!i) {
    const a = { ...e, value: z(t, e.min, e.max, e.step) };
    return { ...n, [e.setpoint]: a };
  }
  const o = n.minGap;
  let r = z(t, e.min, e.max, e.step), s = i.value;
  if (e.setpoint === "cool") {
    if (r - i.value < o) {
      let a = r - o;
      i.min !== null && a < i.min && (a = i.min, r = z(i.min + o, e.min, e.max, e.step)), s = z(a, i.min, i.max, i.step);
    }
  } else if (i.value - r < o) {
    let a = r + o;
    i.max !== null && a > i.max && (a = i.max, r = z(i.max - o, e.min, e.max, e.step)), s = z(a, i.min, i.max, i.step);
  }
  return {
    ...n,
    [e.setpoint]: { ...e, value: r },
    [i.setpoint]: { ...i, value: s }
  };
}
function P(n, t) {
  const e = at(n);
  return e ? Tt(n, e.value + t * e.step) : n;
}
function Kt(n, t) {
  return at(n) ? Tt(n, t) : n;
}
function bi(n, t, e, i) {
  const o = at(n);
  if (!o) return n;
  const r = Math.round(e / i);
  return Tt(n, t + r * o.step);
}
function K(n, t) {
  return n[t] === null ? n : { ...n, active: t };
}
function _i(n, t) {
  const e = [];
  for (let i = -t; i <= t; i++) {
    const o = me(n.value + i * n.step);
    n.min !== null && o < n.min || n.max !== null && o > n.max || e.push(o);
  }
  return e;
}
function $i(n, t) {
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
const yi = 600, wi = 8e3;
function xi(n, t) {
  return n.heat?.value === t.heat?.value && n.cool?.value === t.cool?.value;
}
class ki {
  constructor(t, e, i) {
    this.entityId = t, this.send = e, this.changed = i, this.edit = null, this.dragging = !1, this.pending = null, this.writeTimer = null, this.reconcileTimer = null, this.latest = null;
  }
  /** Feed the model derived from the latest hass. */
  sync(t) {
    if (this.latest = t, this.dragging || this.pending && t.mode === this.pending.mode && !xi(t, this.pending))
      return;
    const e = this.edit && t[this.edit.active] ? this.edit.active : t.active;
    this.edit = { ...t, active: e }, this.pending = null, this.clearReconcile();
  }
  /** Live preview without scheduling a write (used during a drag). */
  preview(t) {
    this.edit = t, this.changed();
  }
  commit(t) {
    this.edit = t, this.pending = t, this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = setTimeout(() => this.flush(), yi), this.changed();
  }
  /** Change only which setpoint is edited (no write). */
  select(t) {
    this.edit = t, this.pending && (this.pending = { ...this.pending, active: t.active }), this.changed();
  }
  flush() {
    this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = null;
    const t = this.edit ? $i(this.edit, this.entityId()) : null;
    t && this.send(t), this.clearReconcile(), this.reconcileTimer = setTimeout(() => {
      if (this.reconcileTimer = null, this.pending = null, this.latest) {
        const e = this.edit?.active;
        this.edit = { ...this.latest, active: e && this.latest[e] ? e : this.latest.active }, this.changed();
      }
    }, wi);
  }
  /** On disconnect: send anything still queued, drop timers. */
  dispose() {
    this.writeTimer && this.flush(), this.clearReconcile(), this.pending = null;
  }
  clearReconcile() {
    this.reconcileTimer && clearTimeout(this.reconcileTimer), this.reconcileTimer = null;
  }
}
function dt(n, t) {
  const e = n.heat ?? n.cool, i = n.unit.includes("C");
  let o = t?.range_min ?? e?.min ?? (i ? 10 : 50), r = t?.range_max ?? e?.max ?? (i ? 32 : 90);
  r > o || (r = o + (i ? 10 : 20));
  for (const s of [n.heat, n.cool])
    s && (o = Math.min(o, s.value), r = Math.max(r, s.value));
  return { min: o, max: r };
}
function ot(n, t) {
  return Math.min(1, Math.max(0, (n - t.min) / (t.max - t.min)));
}
function Si(n, t) {
  return t.min + Math.min(1, Math.max(0, n)) * (t.max - t.min);
}
function Ai(n, t, e) {
  const i = t > 0 ? t : e > 0 ? e : 0;
  if (i <= 0) return [];
  const o = [], r = Math.ceil(n.min / i) * i;
  if ((n.max - r) / i > 200) return [];
  for (let s = r; s <= n.max + 1e-9; s = Math.round((s + i) * 1e3) / 1e3) {
    const a = e > 0 && Math.abs(s / e - Math.round(s / e)) < 1e-6;
    o.push({ value: s, fraction: ot(s, n), label: a });
  }
  return o;
}
function Ei(n, t, e) {
  if (!n.heat) return "cool";
  if (!n.cool) return "heat";
  const i = Math.abs(ot(n.heat.value, e) - t), o = Math.abs(ot(n.cool.value, e) - t);
  return Math.abs(i - o) < 1e-6 ? n.active : i < o ? "heat" : "cool";
}
const Ci = "esphome_rf_fan", Ti = "custom:rf-fan-ltek";
function ge(n, t) {
  const e = n.entities, i = e?.[t]?.device_id;
  return !e || !i ? [] : Object.values(e).filter((o) => o.device_id === i && o.entity_id !== t).map((o) => o.entity_id);
}
function zi(n, t) {
  const e = ge(n, t).filter((o) => o.startsWith("light.")), i = n.entities ?? {};
  return e.find((o) => i[o]?.platform === Ci) ?? e[0] ?? null;
}
function Mi(n, t) {
  const e = n.entities ?? {}, i = ge(n, t).filter((o) => o.startsWith("sensor."));
  return i.find((o) => e[o]?.translation_key === "sleep_timer") ?? i.find((o) => n.states[o]?.attributes.device_class === "timestamp") ?? null;
}
function Ri(n, t) {
  const e = n?.attributes.friendly_name;
  return typeof e == "string" ? e : t;
}
function Oi(n, t) {
  const e = n.split(".")[0], o = {
    fan: ["mdi:fan", "mdi:fan-off"],
    light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
    switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
    binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
    sensor: ["mdi:eye", "mdi:eye"]
  }[e ?? ""] ?? ["mdi:circle", "mdi:circle-outline"];
  return t ? o[0] : o[1];
}
function Gt(n, t, e) {
  const i = n.states[t.entity], o = !!i && !_t.has(i.state), r = o && !["off", "idle", "closed", "standby"].includes(i.state), s = {
    index: e,
    type: t.type,
    entity: t.entity,
    name: t.name ?? Ri(i, t.entity),
    icon: t.icon ?? (typeof i?.attributes.icon == "string" ? i.attributes.icon : Oi(t.entity, r)),
    on: r,
    available: o,
    state: o ? Ni(n, i) : "Unavailable",
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
  if (t.type !== "rf_fan" || !i) return s;
  const a = i.attributes, c = y(a.percentage), h = y(a.speed_count) ?? (y(a.percentage_step) ? Math.round(100 / y(a.percentage_step)) : null), d = r && c !== null && h ? Math.max(1, Math.round(c * h / 100)) : null, l = zi(n, t.entity), m = Mi(n, t.entity), g = m ? n.states[m]?.state : void 0, f = g && !_t.has(g) ? new Date(g) : null, b = typeof a.preset_mode == "string" ? a.preset_mode : "";
  return {
    ...s,
    icon: t.icon ?? "mdi:ceiling-fan",
    state: o ? r ? d !== null ? String(d) : "On" : "Off" : "Unavailable",
    speed: d,
    percentage: c,
    direction: a.direction === "reverse" ? "reverse" : a.direction === "forward" ? "forward" : null,
    natural: !!b && b !== "normal",
    lightEntity: l,
    lightOn: !!l && n.states[l]?.state === "on",
    timerEnds: f && !Number.isNaN(f.getTime()) && f.getTime() > Date.now() ? f : null,
    spin: r ? Pi(c) : null
  };
}
function Pi(n) {
  const t = Math.min(100, Math.max(1, n ?? 50));
  return Math.round((3 - t / 100 * 2.4) * 100) / 100;
}
function Ui(n, t = Date.now()) {
  const e = Math.max(0, Math.round((n.getTime() - t) / 6e4)), i = Math.floor(e / 60);
  return i ? `${i}h${String(e % 60).padStart(2, "0")}` : `${e}m`;
}
function Ni(n, t) {
  const e = n;
  try {
    if (e.formatEntityState) return e.formatEntityState(t);
  } catch {
  }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state.charAt(0).toUpperCase() + t.state.slice(1);
}
function Bi(n) {
  return n.popup_card ? n.popup_card : n.type === "rf_fan" ? { type: Ti, fan_entity: n.entity } : null;
}
function Li(n, t) {
  if (t === "toggle_light")
    return n.lightEntity ? { domain: "light", service: "toggle", data: { entity_id: n.lightEntity } } : null;
  const e = n.entity.split(".")[0];
  return ["fan", "light", "switch", "input_boolean", "climate", "humidifier", "media_player", "cover"].includes(e) ? { domain: "homeassistant", service: "toggle", data: { entity_id: n.entity } } : null;
}
const Di = Zt`
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
var Hi = Object.defineProperty, L = (n, t, e, i) => {
  for (var o = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (o = s(t, e, o) || o);
  return o && Hi(t, e, o), o;
};
const Ii = 18, ji = 500, Mt = class Mt extends N {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(), this._tick = 0, this._popupOpen = !1, this._menu = null, this._sp = new ki(
      () => this._config?.entity ?? "",
      (t) => this._call(t),
      () => this._tick += 1
    ), this._drag = null, this._barDrag = null, this._hold = null, this._wheelDown = (t) => {
      const e = this._sp.edit, i = e?.[e.active];
      if (!i) return;
      const o = t.currentTarget;
      o.focus({ preventScroll: !0 }), this._drag = { startY: t.clientY, startValue: i.value }, this._sp.dragging = !0, o.setPointerCapture?.(t.pointerId);
    }, this._wheelMove = (t) => {
      !this._drag || !this._sp.edit || this._sp.preview(bi(this._sp.edit, this._drag.startValue, t.clientY - this._drag.startY, Ii));
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
      const i = t.currentTarget, o = i.getBoundingClientRect(), r = dt(e, this._config?.setpoint?.bar), s = this._barFraction(t, o), a = Ei(e, s, r);
      this._barDrag = { handle: a, rect: o }, this._sp.dragging = !0, i.setPointerCapture?.(t.pointerId), this._sp.preview(Kt(K(e, a), this._barValueAt(t, o)));
    }, this._barMove = (t) => {
      !this._barDrag || !this._sp.edit || this._sp.preview(Kt(this._sp.edit, this._barValueAt(t, this._barDrag.rect)));
    }, this._barUp = (t) => {
      if (!this._barDrag) return;
      this._barDrag = null, this._sp.dragging = !1;
      const e = t.currentTarget;
      e.hasPointerCapture?.(t.pointerId) && e.releasePointerCapture(t.pointerId), this._sp.edit && this._sp.commit(this._sp.edit);
    }, this._menuKey = (t) => {
      const e = [...t.currentTarget.querySelectorAll(".mi")], i = e.indexOf(this.renderRoot.activeElement);
      if (t.key === "ArrowDown" || t.key === "ArrowRight") e[(i + 1) % e.length]?.focus();
      else if (t.key === "ArrowUp" || t.key === "ArrowLeft") e[(i - 1 + e.length) % e.length]?.focus();
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
    (t.has("hass") || t.has("_config")) && this.hass && this._config && this._sp.sync(vi(this.hass, this._config)), t.has("hass") && this._popupEl && this.hass && (this._popupEl.hass = this.hass);
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
          const r = Gt(this.hass, o, 0);
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
    if (!this._config || !this.hass) return u;
    const t = this._config, e = li(this.hass, t), i = Ke(this.hass, t), r = {
      glow: !!((t.card?.glow ?? _.glow) && e.equipment),
      [`eq-${e.equipment ?? "none"}`]: !0,
      [`mode-${e.mode}`]: !0
    }, s = { ...Je(t), ...Xe(t.text), ...this._barVars() }, a = { top: [], bottom: [], left: [], right: [] }, c = i.filter((l) => l.display === "toggle"), h = { top: [], bottom: [], left: [], right: [] };
    for (const l of i) l.display === "menu" && h[l.zone].push(l);
    for (const l of i) {
      if (l.display === "menu") {
        h[l.zone][0] === l && a[l.zone].push(this._renderMenuRow(h[l.zone], l.zone));
        continue;
      }
      l.display === "toggle" && !this._open.has(l.key) || a[l.zone].push(this._renderSet(l));
    }
    const d = t.toggles_zone ?? _.toggles_zone;
    return c.length && a[d].push(this._renderToggles(c)), p`
      <ha-card class=${ht(r)} style=${$(s)}>
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
    return e.length ? p`<div class="zone ${t}">${e}</div>` : u;
  }
  _barVars() {
    const t = this._config?.setpoint?.bar ?? {}, e = {};
    return t.height && (e["--etc-bar-h"] = `${t.height}px`), t.length && (e["--etc-bar-len"] = `${t.length}px`), t.heat_color && (e["--bar-heat"] = t.heat_color), t.cool_color && (e["--bar-cool"] = t.cool_color), t.comfort_color && (e["--bar-comfort"] = t.comfort_color), t.handle_color && (e["--bar-handle"] = t.handle_color), e;
  }
  // ---- core -----------------------------------------------------------------
  _renderCore(t) {
    const e = this._config, i = e.setpoint ?? {}, o = i.control ?? _.control, r = i.position ?? _.position, s = e.core_align ?? _.core_align, a = this._sp.edit, c = !!a?.available, h = c && (o === "wheel" || o === "stepper") ? this._renderControl(a, o) : null, d = c && o === "bar" ? this._renderBar(a, t) : null, l = i.bar?.position ?? _.bar.position, m = l === "above", g = l === "left" || l === "right", f = t.equipment ? `eq-${t.equipment}` : "";
    if (!t.available)
      return p`<div class="core al-${s}">
        <div class="main">
          ${e.show_name ?? _.show_name ? p`<div class="name">${t.name}</div>` : u}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    const b = p`<div class="main">
      ${e.show_name ?? _.show_name ? p`<div class="name">${t.name}</div>` : u}
      ${(e.show_status ?? _.show_status) && t.equipment ? p`<div class="status ${f}">
            <ha-icon icon=${Et[t.state] ?? "mdi:thermostat"}></ha-icon>${hi[t.equipment]}
          </div>` : u}
      ${(e.show_humidity ?? _.show_humidity) && t.humidity !== null ? p`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(t.humidity)}%</div>` : u}
      ${e.show_current ?? _.show_current ? p`<div class="current ${f}">
            ${T(t.currentTemp, t.unit)}<span class="unit">${t.unit}</span>
          </div>` : u}
      ${(e.show_pills ?? _.show_pills) && a?.available ? this._renderPills(a) : u}
    </div>`;
    return p`<div class="core al-${s} pos-${r}">
      ${d && m ? d : u}
      <div class="core-row">
        ${d && l === "left" ? d : u} ${h && r === "left" ? h : u} ${b}
        ${h && r === "right" ? h : u} ${d && l === "right" ? d : u}
      </div>
      ${h && r === "center" ? p`<div class="ctl-center">${h}</div>` : u}
      ${d && !m && !g ? d : u}
    </div>`;
  }
  _renderPills(t) {
    const e = !!(t.heat && t.cool), i = (o) => {
      const r = t[o];
      if (!r) return u;
      const s = p`<ha-icon icon=${o === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${T(
        r.value,
        t.unit
      )}`, a = e && t.active !== o && this._usesActive();
      return e ? p`<button
            class="pill ${o} ${a ? "dim" : ""}"
            aria-pressed=${t.active === o}
            aria-label=${`${o === "heat" ? "Heat" : "Cool"} setpoint`}
            @click=${() => this._sp.select(K(t, o))}
          >
            ${s}
          </button>` : p`<div class="pill ${o}">${s}</div>`;
    };
    return p`<div class="pills">${i("heat")} ${i("cool")}</div>`;
  }
  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  _usesActive() {
    const t = this._config?.setpoint?.control ?? _.control;
    return t === "wheel" || t === "stepper";
  }
  _renderControl(t, e) {
    const i = t[t.active];
    if (!i) return u;
    const o = t.active, r = p`<button
      class="round ${o}"
      aria-label="Increase"
      ?disabled=${i.max !== null && i.value >= i.max}
      @click=${() => this._sp.commit(P(t, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`, s = p`<button
      class="round ${o}"
      aria-label="Decrease"
      ?disabled=${i.min !== null && i.value <= i.min}
      @click=${() => this._sp.commit(P(t, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`;
    if (e === "stepper")
      return p`<div class="stepper ${o}">
        ${s}<span class="sv">${T(i.value, t.unit)}</span>${r}
      </div>`;
    const a = this._config?.setpoint ?? {}, c = a.neighbors ?? _.neighbors, h = a.nudge ?? _.nudge, d = _i(i, c), l = d.filter((b) => b > i.value).reverse(), m = d.filter((b) => b < i.value).reverse(), g = (b) => p`<div class="nb ${Math.abs(b - i.value) > i.step * 1.5 ? "far" : ""}">${T(b, t.unit)}</div>`, f = p`<div
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
      ${l.map(g)}
      <div class="bubble ${o}">${T(i.value, t.unit)}</div>
      ${m.map(g)}
    </div>`;
    return h === "hidden" ? p`<div class="wheel">${f}</div>` : h === "stacked" ? p`<div class="wheel nudge-stacked">${r}${f}${s}</div>` : p`<div class="wheel">${f}<div class="nudges">${r}${s}</div></div>`;
  }
  // ---- bar ------------------------------------------------------------------
  _renderBar(t, e) {
    const i = { ..._.bar, ...this._config?.setpoint?.bar ?? {} }, o = dt(t, i), r = (v) => `${(ot(v, o) * 100).toFixed(3)}%`, s = i.position === "left" || i.position === "right", a = (v) => s ? { bottom: v } : { left: v }, c = s ? "height" : "width", h = s ? "top" : "right", d = t.heat, l = t.cool, m = Ai(o, i.ticks ?? 0, i.labels ?? 0), g = [];
    if (i.look === "gradient") {
      const v = i.stops?.length ? i.stops : ["#2b9af9", "#7ccf8a", "#ff8100"];
      g.push(p`<div class="seg full" style=${$({ background: `linear-gradient(to ${s ? "top" : "right"}, ${v.join(", ")})` })}></div>`);
    } else
      d && g.push(p`<div class="seg heat" style=${$({ [c]: r(d.value) })}></div>`), l && g.push(p`<div class="seg cool" style=${$({ ...a(r(l.value)), [h]: "0" })}></div>`), d && l && g.push(p`<div class="seg comfort" style=${$({ ...a(r(d.value)), [h]: `calc(100% - ${r(l.value)})` })}></div>`);
    const f = (v) => {
      const w = t[v];
      return w ? p`
        ${i.flags ? p`<div class="flag ${v}" style=${$(a(r(w.value)))}>${T(w.value, t.unit)}°</div>` : u}
        <div
          class="handle ${v} s-${i.handle_shape ?? "round"} ${t.active === v && d && l ? "active" : ""}"
          style=${$(a(r(w.value)))}
          role="slider"
          aria-orientation=${s ? "vertical" : "horizontal"}
          tabindex="0"
          aria-label=${`${v === "heat" ? "Heat" : "Cool"} setpoint`}
          aria-valuenow=${w.value}
          aria-valuemin=${o.min}
          aria-valuemax=${o.max}
          @focus=${() => this._sp.select(K(this._sp.edit, v))}
          @keydown=${(ve) => this._barKey(ve, v)}
        ></div>
      ` : u;
    }, b = e.currentTemp;
    return p`<div class="bar ${s ? `vertical side-${i.position}` : ""} ${i.flags ? "" : "no-flags"}">
      <div
        class="track"
        @pointerdown=${this._barDown}
        @pointermove=${this._barMove}
        @pointerup=${this._barUp}
        @pointercancel=${this._barUp}
      >
        ${g}
        ${i.show_current && b !== null && b >= o.min && b <= o.max ? p`<div class="marker" style=${$(a(r(b)))} title="Current"></div>` : u}
        ${f("heat")} ${f("cool")}
      </div>
      ${m.length ? p`<div class="ticks">
            ${m.map(
      (v) => p`<div class="tick ${v.label ? "lbl" : ""}" style=${$(a(`${v.fraction * 100}%`))}></div>
                ${v.label ? p`<div class="tick-l" style=${$(a(`${v.fraction * 100}%`))}>${v.value}</div>` : u}`
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
    const i = this._sp.edit, o = dt(i, this._config?.setpoint?.bar);
    return Si(this._barFraction(t, e), o);
  }
  _barKey(t, e) {
    const i = this._sp.edit;
    if (!i) return;
    const o = t.key === "ArrowUp" || t.key === "ArrowRight" ? 1 : t.key === "ArrowDown" || t.key === "ArrowLeft" ? -1 : 0;
    o && (t.preventDefault(), this._sp.commit(P(K(i, e), o)));
  }
  // ---- button sets ------------------------------------------------------------
  _renderSet(t) {
    const e = bt(this._config?.buttons, t.config.style), i = t.type !== "chips" && t.orientation === "row" && t.align === "stretch", o = { ...Wt(e) };
    i && (o["grid-template-columns"] = t.columns ? `repeat(${t.columns}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))");
    const r = {
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
      const c = (t.config.chips ?? []).map((h, d) => Gt(this.hass, h, d));
      return p`<div class=${ht(r)} style=${$(o)} role="group" aria-label=${t.title}>
        ${c.map((h) => this._renderChip(h, e.content))}
      </div>`;
    }
    const s = e.content !== "label", a = e.content !== "icon";
    return p`<div class=${ht(r)} style=${$(o)} role="group" aria-label=${t.title}>
      ${t.options.map(
      (c) => p`<button
          class="btn ${c.active ? "active" : ""}"
          style=${$({ "--c": c.color })}
          aria-pressed=${c.active}
          title=${c.label}
          @click=${() => {
        const h = Vt(t.type, this._config.entity, c.value);
        h && this._call(h);
      }}
        >
          ${s ? p`<ha-icon icon=${c.icon}></ha-icon>` : u}
          ${a ? p`<span class="lbl">${c.label}</span>` : u}
        </button>`
    )}
    </div>`;
  }
  // ---- expandable menus -------------------------------------------------------
  _renderMenuRow(t, e) {
    return p`<div class="menus z-${e}">${t.map((i) => this._renderMenu(i))}</div>`;
  }
  _renderMenu(t) {
    const e = bt(this._config?.buttons, t.config.style), i = t.options.find((a) => a.active), o = e.content !== "label", r = this._menu === t.key, s = typeof HTMLElement < "u" && "showPopover" in HTMLElement.prototype;
    return p`<div class="menu ${r ? "open" : ""} d-${t.menuDirection} v-${e.variant}" style=${$(Wt(e))}>
      <button
        class="mt ${i ? "has-active" : ""}"
        style=${$({ "--c": i?.color ?? "var(--primary-color)" })}
        aria-haspopup="listbox"
        aria-expanded=${r}
        aria-label=${`${t.title}: ${i?.label ?? ""}`}
        @click=${(a) => this._toggleMenu(t, a.currentTarget)}
      >
        ${o ? p`<ha-icon icon=${i?.icon ?? t.toggleIcon}></ha-icon>` : u}
        <span class="mt-text">
          ${t.menuShowName ? p`<span class="mt-name">${t.title}</span>` : u}
          <span class="mt-value">${i?.label ?? "—"}</span>
        </span>
      </button>
      <div
        class="menu-list"
        role="listbox"
        aria-label=${t.title}
        data-key=${t.key}
        popover=${s ? "auto" : u}
        @toggle=${(a) => this._menuToggled(t, a)}
        @keydown=${this._menuKey}
      >
        ${t.options.map(
      (a) => p`<button
            class="mi ${a.active ? "active" : ""}"
            role="option"
            aria-selected=${a.active}
            style=${$({ "--c": a.color })}
            @click=${() => this._pickMenu(t, a.value)}
          >
            ${o ? p`<ha-icon icon=${a.icon}></ha-icon>` : u}<span>${a.label}</span>
          </button>`
    )}
      </div>
    </div>`;
  }
  _menuList(t) {
    return this.renderRoot.querySelector(`.menu-list[data-key="${t}"]`);
  }
  _toggleMenu(t, e) {
    const i = this._menuList(t.key);
    if (!i) return;
    if (!("showPopover" in i)) {
      this._menu = this._menu === t.key ? null : t.key;
      return;
    }
    const o = i;
    if (i.matches(":popover-open")) {
      o.hidePopover();
      return;
    }
    o.showPopover(), this._placeMenu(i, e, t.menuDirection), this._menu = t.key, (i.querySelector(".mi.active") ?? i.querySelector(".mi"))?.focus({ preventScroll: !0 });
  }
  /** Fixed-position the top-layer list next to its trigger, kept on screen. */
  _placeMenu(t, e, i) {
    const o = e.getBoundingClientRect(), r = 6, s = window.innerWidth, a = window.innerHeight;
    t.style.minWidth = i === "up" || i === "down" ? `${Math.round(o.width)}px` : "";
    const c = t.getBoundingClientRect();
    let h = i === "right" ? o.right + r : i === "left" ? o.left - r - c.width : o.left, d = i === "down" ? o.bottom + r : i === "up" ? o.top - r - c.height : o.top;
    i === "down" && d + c.height > a && (d = o.top - r - c.height), i === "up" && d < 0 && (d = o.bottom + r), i === "right" && h + c.width > s && (h = o.left - r - c.width), i === "left" && h < 0 && (h = o.right + r), h = Math.max(4, Math.min(h, s - c.width - 4)), d = Math.max(4, Math.min(d, a - c.height - 4)), t.style.left = `${Math.round(h)}px`, t.style.top = `${Math.round(d)}px`;
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
    const i = Vt(t.type, this._config.entity, e);
    i && this._call(i), this._fire("haptic", "light"), this._closeMenus();
  }
  _renderToggles(t) {
    return p`<div class="toggles">
      ${t.map((e) => {
      const i = this._open.has(e.key);
      return p`<button class="tgl ${i ? "open" : ""}" aria-expanded=${i} @click=${() => this._toggleSet(e.key)}>
          <ha-icon icon=${e.toggleIcon}></ha-icon><span>${e.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
    })}
    </div>`;
  }
  // ---- chips --------------------------------------------------------------------
  _renderChip(t, e) {
    const i = t.config.show_name ?? e !== "icon", o = t.config.show_state ?? !0, r = t.type === "rf_fan";
    return p`<button
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
      <ha-icon class=${t.spin ? "spin" : ""} style=${$(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>
      ${i ? p`<span>${t.name}</span>` : u}
      ${o && (!r || t.speed !== null || !t.on) ? p`<span class="badge">${t.state}</span>` : u}
      ${r && t.natural ? p`<span class="extra"><ha-icon icon="mdi:leaf"></ha-icon></span>` : u}
      ${r && t.lightOn ? p`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : u}
      ${r && t.timerEnds ? p`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${Ui(t.timerEnds)}</span>` : u}
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
        const i = Bi(t.config);
        i && this._canCreate(i) ? this._showPopup(i) : this._fire("hass-more-info", { entityId: t.entity });
        break;
      }
      case "more-info":
        this._fire("hass-more-info", { entityId: t.entity });
        break;
      case "toggle":
      case "toggle_light": {
        const i = Li(t, e);
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
    const i = this.renderRoot.querySelector("dialog.popup"), o = this.renderRoot.querySelector(".popup-body");
    !i || !o || (o.replaceChildren(e), i.open || i.showModal?.());
  }
  _renderPopup() {
    return this._popupOpen ? p`<dialog
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
Mt.styles = Di;
let x = Mt;
L([
  At({ attribute: !1 })
], x.prototype, "hass");
L([
  k()
], x.prototype, "_config");
L([
  k()
], x.prototype, "_open");
L([
  k()
], x.prototype, "_tick");
L([
  k()
], x.prototype, "_popupOpen");
L([
  k()
], x.prototype, "_menu");
customElements.get(et) || customElements.define(et, x);
const nt = window;
nt.customCards = nt.customCards ?? [];
nt.customCards.some((n) => n.type === et) || nt.customCards.push({
  type: et,
  name: "Easy Thermostat Styler Card (Ltek)",
  description: "A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.",
  preview: !0
});
console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${oe} `, "background:#ff8100;color:#fff", "background:#333;color:#fff");
