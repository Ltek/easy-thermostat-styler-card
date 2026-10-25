/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis, It = gt.ShadowRoot && (gt.ShadyCSS === void 0 || gt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, jt = Symbol(), re = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== jt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (It && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = re.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && re.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ee = (r) => new Ce(typeof r == "string" ? r : r + "", void 0, jt), qt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, o, n) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + r[n + 1], r[0]);
  return new Ce(e, r, jt);
}, ii = (r, t) => {
  if (It) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), o = gt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, r.appendChild(i);
  }
}, ae = It ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ee(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oi, defineProperty: ri, getOwnPropertyDescriptor: ai, getOwnPropertyNames: ni, getOwnPropertySymbols: si, getPrototypeOf: li } = Object, zt = globalThis, ne = zt.trustedTypes, ci = ne ? ne.emptyScript : "", di = zt.reactiveElementPolyfillSupport, ot = (r, t) => r, wt = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? ci : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Vt = (r, t) => !oi(r, t), se = { attribute: !0, type: String, converter: wt, reflect: !1, useDefault: !1, hasChanged: Vt };
Symbol.metadata ??= Symbol("metadata"), zt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let K = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = se) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && ri(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: o, set: n } = ai(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: o, set(a) {
      const s = o?.call(this);
      n?.call(this, a), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ot("elementProperties"))) return;
    const t = li(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ot("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ot("properties"))) {
      const e = this.properties, i = [...ni(e), ...si(e)];
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
      for (const o of i) e.unshift(ae(o));
    } else t !== void 0 && e.push(ae(t));
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
    return ii(t, this.constructor.elementStyles), t;
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : wt).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = i.getPropertyOptions(o), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : wt;
      this._$Em = o;
      const s = a.fromAttribute(e, n.type);
      this[o] = s ?? this._$Ej?.get(o) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, o = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[t]), i ??= a.getPropertyOptions(t), !((i.hasChanged ?? Vt)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: o, wrapped: n }, a) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: a } = n, s = this[o];
        a !== !0 || this._$AL.has(o) || s === void 0 || this.C(o, void 0, n, s);
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
K.elementStyles = [], K.shadowRootOptions = { mode: "open" }, K[ot("elementProperties")] = /* @__PURE__ */ new Map(), K[ot("finalized")] = /* @__PURE__ */ new Map(), di?.({ ReactiveElement: K }), (zt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = globalThis, le = (r) => r, $t = Yt.trustedTypes, ce = $t ? $t.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Me = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, Re = "?" + D, hi = `<${Re}>`, W = document, rt = () => W.createComment(""), at = (r) => r === null || typeof r != "object" && typeof r != "function", Wt = Array.isArray, pi = (r) => Wt(r) || typeof r?.[Symbol.iterator] == "function", Et = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, he = />/g, q = RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, ue = /"/g, Pe = /^(?:script|style|textarea|title)$/i, ui = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), d = ui(1), I = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), Y = W.createTreeWalker(W, 129);
function Oe(r, t) {
  if (!Wt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ce !== void 0 ? ce.createHTML(t) : t;
}
const fi = (r, t) => {
  const e = r.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Q;
  for (let s = 0; s < e; s++) {
    const l = r[s];
    let c, p, h = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, p = a.exec(l), p !== null); ) f = a.lastIndex, a === Q ? p[1] === "!--" ? a = de : p[1] !== void 0 ? a = he : p[2] !== void 0 ? (Pe.test(p[2]) && (o = RegExp("</" + p[2], "g")), a = q) : p[3] !== void 0 && (a = q) : a === q ? p[0] === ">" ? (a = o ?? Q, h = -1) : p[1] === void 0 ? h = -2 : (h = a.lastIndex - p[2].length, c = p[1], a = p[3] === void 0 ? q : p[3] === '"' ? ue : pe) : a === ue || a === pe ? a = q : a === de || a === he ? a = Q : (a = q, o = void 0);
    const b = a === q && r[s + 1].startsWith("/>") ? " " : "";
    n += a === Q ? l + hi : h >= 0 ? (i.push(c), l.slice(0, h) + Me + l.slice(h) + D + b) : l + D + (h === -2 ? s : b);
  }
  return [Oe(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class nt {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, a = 0;
    const s = t.length - 1, l = this.parts, [c, p] = fi(t, e);
    if (this.el = nt.createElement(c, i), Y.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = Y.nextNode()) !== null && l.length < s; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Me)) {
          const f = p[a++], b = o.getAttribute(h).split(D), g = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: n, name: g[2], strings: b, ctor: g[1] === "." ? mi : g[1] === "?" ? bi : g[1] === "@" ? vi : Tt }), o.removeAttribute(h);
        } else h.startsWith(D) && (l.push({ type: 6, index: n }), o.removeAttribute(h));
        if (Pe.test(o.tagName)) {
          const h = o.textContent.split(D), f = h.length - 1;
          if (f > 0) {
            o.textContent = $t ? $t.emptyScript : "";
            for (let b = 0; b < f; b++) o.append(h[b], rt()), Y.nextNode(), l.push({ type: 2, index: ++n });
            o.append(h[f], rt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Re) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(D, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += D.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = W.createElement("template");
    return i.innerHTML = t, i;
  }
}
function J(r, t, e = r, i) {
  if (t === I) return t;
  let o = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = at(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(r), o._$AT(r, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = o : e._$Cl = o), o !== void 0 && (t = J(r, o._$AS(r, t.values), o, i)), t;
}
class gi {
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
    const { el: { content: e }, parts: i } = this._$AD, o = (t?.creationScope ?? W).importNode(e, !0);
    Y.currentNode = o;
    let n = Y.nextNode(), a = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new st(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new _i(n, this, t)), this._$AV.push(c), l = i[++s];
      }
      a !== l?.index && (n = Y.nextNode(), a++);
    }
    return Y.currentNode = W, o;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class st {
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
    t = J(this, t, e), at(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && at(this._$AH) ? this._$AA.nextSibling.data = t : this.T(W.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = nt.createElement(Oe(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const n = new gi(o, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = fe.get(t.strings);
    return e === void 0 && fe.set(t.strings, e = new nt(t)), e;
  }
  k(t) {
    Wt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t) o === e.length ? e.push(i = new st(this.O(rt()), this.O(rt()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = le(t).nextSibling;
      le(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = J(this, t, e, 0), a = !at(t) || t !== this._$AH && t !== I, a && (this._$AH = t);
    else {
      const s = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = J(this, s[i + l], e, l), c === I && (c = this._$AH[l]), a ||= !at(c) || c !== this._$AH[l], c === u ? t = u : t !== u && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class mi extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class bi extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class vi extends Tt {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = J(this, t, e, 0) ?? u) === I) return;
    const i = this._$AH, o = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== u && (i === u || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class _i {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    J(this, t);
  }
}
const wi = Yt.litHtmlPolyfillSupport;
wi?.(nt, st), (Yt.litHtmlVersions ??= []).push("3.3.3");
const $i = (r, t, e) => {
  const i = e?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = o = new st(t.insertBefore(rt(), n), n, void 0, e ?? {});
  }
  return o._$AI(r), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = globalThis;
let Z = class extends K {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $i(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return I;
  }
};
Z._$litElement$ = !0, Z.finalized = !0, Gt.litElementHydrateSupport?.({ LitElement: Z });
const yi = Gt.litElementPolyfillSupport;
yi?.({ LitElement: Z });
(Gt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xi = { attribute: !0, type: String, converter: wt, reflect: !1, hasChanged: Vt }, ki = (r = xi, t, e) => {
  const { kind: i, metadata: o } = e;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), i === "accessor") {
    const { name: a } = e;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(a, l, r, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, r, s), s;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(s) {
      const l = this[a];
      t.call(this, s), this.requestUpdate(a, l, r, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Xt(r) {
  return (t, e) => typeof e == "object" ? ki(r, t, e) : ((i, o, n) => {
    const a = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), a ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(r) {
  return Xt({ ...r, state: !0, attribute: !1 });
}
const Le = "2026.10.25.16", yt = "easy-thermostat-styler-card", Pt = "easy-thermostat-styler-card-editor", Be = [
  "name",
  "status",
  "current",
  "unit",
  "humidity",
  "pill",
  "wheel_value",
  "wheel_neighbor",
  "bar"
], Si = [
  "look",
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
  "icon_gap",
  "scale",
  "border_width",
  "background",
  "color",
  "border_color",
  "active_background",
  "active_color",
  "active_border_color"
], v = {
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
}, Ne = [
  { type: "hvac" },
  { type: "preset", display: "toggle" },
  { type: "fan_mode", display: "toggle" }
], B = (r) => !!r && typeof r == "object" && !Array.isArray(r);
function xt(r) {
  if (!(r == null || r === "")) {
    if (typeof r == "number") return Number.isFinite(r) ? r : void 0;
    if (Array.isArray(r)) {
      const t = r.map(xt).filter((e) => e !== void 0);
      return t.length ? t : void 0;
    }
    if (B(r)) {
      const t = {};
      for (const [e, i] of Object.entries(r)) {
        const o = xt(i);
        o !== void 0 && (t[e] = o);
      }
      return Object.keys(t).length ? t : void 0;
    }
    return r;
  }
}
const A = (r, t, e) => {
  const i = typeof r == "number" ? r : typeof r == "string" && r.trim() ? Number(r) : NaN;
  return Number.isFinite(i) ? Math.min(e, Math.max(t, i)) : void 0;
};
function Ai(r) {
  if (!B(r) || typeof r.type != "string") return;
  const t = { ...r };
  return "columns" in t && (t.columns = A(t.columns, 0, 12) || void 0), Array.isArray(t.chips) && (t.chips = t.chips.filter((e) => B(e) && typeof e.entity == "string" && e.entity)), t;
}
function Ot(r) {
  if (!B(r)) throw new Error("Invalid configuration");
  const t = { ...r };
  if (delete t.test_mode, typeof t.entity != "string" || !t.entity)
    throw new Error("Easy Thermostat Styler Card: set an entity (a climate.* entity).");
  const e = B(t.setpoint) ? { ...t.setpoint } : void 0;
  if (e && ("scale" in e && (e.scale = A(e.scale, 40, 250)), "neighbors" in e && (e.neighbors = A(e.neighbors, 0, 3)), "min_gap" in e && (e.min_gap = A(e.min_gap, 0, 20)), "hide_after" in e && (e.hide_after = A(e.hide_after, 0, 300)), t.setpoint = e), B(t.background)) {
    const i = { ...t.background };
    if ("strength" in i && (i.strength = A(i.strength, 0, 100)), "speed" in i && (i.speed = A(i.speed, 25, 300)), "scrim" in i && (i.scrim = A(i.scrim, -60, 60) || void 0), "vignette" in i && (i.vignette = A(i.vignette, 0, 100) || void 0), "grain" in i && (i.grain = A(i.grain, 0, 100) || void 0), "frost_blur" in i && (i.frost_blur = A(i.frost_blur, 0, 40)), "air_max" in i && (i.air_max = A(i.air_max, 0.01, 1e6)), B(i.image)) {
      const o = { ...i.image };
      "blur" in o && (o.blur = A(o.blur, 0, 40) || void 0), "darken" in o && (o.darken = A(o.darken, 0, 90) || void 0), i.image = o;
    }
    B(i.gradient) && "angle" in i.gradient && (i.gradient = { ...i.gradient, angle: A(i.gradient.angle, 0, 360) }), t.background = i;
  }
  if ("frost_blur" in t && (t.frost_blur = A(t.frost_blur, 0, 40)), B(t.effects)) {
    const i = { ...t.effects };
    "size" in i && (i.size = A(i.size, 2, 60)), "speed" in i && (i.speed = A(i.speed, 0.6, 8)), t.effects = i;
  }
  return Array.isArray(t.sets) && (t.sets = t.sets.map(Ai).filter(Boolean), t.sets.length === 0) ? { ...xt({ ...t, sets: void 0 }), sets: [] } : xt(t);
}
function zi(r, t) {
  return t.split(".").reduce((e, i) => B(e) || Array.isArray(e) ? e[i] : void 0, r);
}
function T(r, t, e) {
  const i = t.split("."), o = (n, a) => {
    const s = Array.isArray(n) ? [...n] : B(n) ? { ...n } : {}, l = i[a];
    if (a === i.length - 1)
      e === void 0 || e === "" || e === null ? Array.isArray(s) ? s.splice(Number(l), 1) : delete s[l] : s[l] = e;
    else {
      const c = o(s[l], a + 1);
      c === void 0 ? delete s[l] : s[l] = c;
    }
    if (!(!Array.isArray(s) && Object.keys(s).length === 0))
      return s;
  };
  return o(r, 0) ?? {};
}
const et = {
  hvac: "Mode",
  preset: "Preset",
  fan_mode: "Fan",
  chips: "Devices"
}, Ti = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, Fe = {
  hvac: { list: "hvac_modes", active: null },
  preset: { list: "preset_modes", active: "preset_mode" },
  fan_mode: { list: "fan_modes", active: "fan_mode" }
}, Kt = {
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
}, ge = {
  heat_cool: "Heat/Cool",
  fan_only: "Fan only",
  off: "Off"
}, Ci = {
  heat: "var(--state-climate-heat-color, #ff8100)",
  cool: "var(--state-climate-cool-color, #2b9af9)",
  heat_cool: "var(--state-climate-heat-cool-color, #ffa600)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan-only-color, #009688)",
  off: "var(--state-climate-off-color, #8a8a8a)"
}, me = "var(--primary-color, #03a9f4)";
function Lt(r) {
  if (ge[r]) return ge[r];
  const t = r.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Ei(r, t, e, i) {
  const o = r;
  try {
    if (e === "hvac" && o.formatEntityState) return o.formatEntityState(t, i);
    if (e !== "hvac" && e !== "chips" && o.formatEntityAttributeValue) {
      const n = e === "preset" ? "preset_mode" : "fan_mode", a = o.formatEntityAttributeValue(t, n, i);
      if (a) return a;
    }
  } catch {
  }
  return Lt(i);
}
function Mi(r) {
  return Array.isArray(r.sets) ? r.sets : Ne;
}
function Bt(r, t) {
  if (!r || t === "chips") return [];
  const e = r.attributes[Fe[t].list];
  return Array.isArray(e) ? e.map(String) : [];
}
function He(r, t) {
  if (!t?.length) return r;
  const e = /* @__PURE__ */ new Set(), i = [];
  for (const o of t) r.includes(o) && !e.has(o) && (i.push(o), e.add(o));
  for (const o of r) e.has(o) || i.push(o);
  return i;
}
function Ri(r, t) {
  const e = r.states[t.entity], i = [];
  return Mi(t).forEach((o, n) => {
    if (o.hidden) return;
    const a = o.type;
    let s = [];
    if (a !== "chips") {
      if (!e) return;
      const l = Bt(e, a);
      if (!l.length) return;
      const c = Fe[a].active, p = c ? String(e.attributes[c] ?? "") : e.state;
      if (s = He(l, o.order).filter((h) => !o.options?.[h]?.hide).map((h) => {
        const f = o.options?.[h];
        return {
          value: h,
          label: f?.name ?? Ei(r, e, a, h),
          icon: f?.icon ?? Kt[h.toLowerCase()] ?? "mdi:circle-medium",
          active: h === p,
          color: a === "hvac" ? Ci[h] ?? me : me
        };
      }), !s.length) return;
    } else if (!o.chips?.length) return;
    i.push({
      key: `${a}-${n}`,
      index: n,
      type: a,
      title: o.name ?? et[a],
      zone: o.zone ?? (t.toggles_zone || "bottom"),
      orientation: o.orientation ?? (o.zone === "left" || o.zone === "right" ? "column" : "row"),
      columns: o.columns ?? 0,
      align: o.align ?? (a === "chips" ? "center" : "stretch"),
      // Compact turns full-time sets into toggles; menus are already compact.
      display: o.display === "menu" && a !== "chips" ? "menu" : t.compact ? "toggle" : o.display ?? "always",
      menuDirection: o.menu_direction ?? Nt(o.zone ?? (t.toggles_zone || "bottom")),
      menuShowName: o.menu_show_name ?? !0,
      toggleIcon: o.toggle_icon ?? Ti[a],
      options: s,
      config: o
    });
  }), i;
}
function Nt(r) {
  return r === "bottom" ? "up" : r === "left" ? "right" : r === "right" ? "left" : "down";
}
function be(r, t, e) {
  switch (r) {
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
function z(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string" && r.trim() !== "") {
    const t = Number(r);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
const kt = /* @__PURE__ */ new Set(["unavailable", "unknown", "none", ""]);
function Ue(r) {
  switch (r) {
    case "heat":
    case "cool":
    case "heat_cool":
    case "dry":
    case "fan_only":
    case "off":
      return r;
    case "auto":
      return "heat_cool";
    default:
      return "unknown";
  }
}
function Pi(r) {
  switch (r) {
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
function Oi(r, t, e) {
  return r === "off" ? "off" : t === null || e === null ? null : e.heat !== null && (r === "heat" || r === "heat_cool") && t < e.heat ? "heating" : e.cool !== null && (r === "cool" || r === "heat_cool") && t > e.cool ? "cooling" : r === "heat" || r === "cool" || r === "heat_cool" ? "idle" : null;
}
function Li(r, t) {
  if (r === "heat_cool") {
    const i = z(t.target_temp_low), o = z(t.target_temp_high);
    if (i !== null || o !== null) return { heat: i, cool: o };
    const n = z(t.temperature);
    return n === null ? null : { heat: n, cool: null };
  }
  const e = z(t.temperature);
  return e === null ? null : r === "heat" ? { heat: e, cool: null } : r === "cool" ? { heat: null, cool: e } : null;
}
function Bi(r, t) {
  const e = r.states[t.entity], i = r.config?.unit_system?.temperature ?? "°", o = e?.attributes.friendly_name, n = t.name ?? (typeof o == "string" ? o : t.entity);
  if (!e || kt.has(e.state))
    return {
      available: !1,
      name: n,
      currentTemp: null,
      unit: i,
      humidity: null,
      equipment: null,
      mode: "unknown",
      state: e?.state ?? "unavailable",
      setpoints: null
    };
  const a = e.attributes, s = Ue(e.state), l = z(a.current_temperature), c = Li(s, a);
  return {
    available: !0,
    name: n,
    currentTemp: l,
    unit: i,
    humidity: z(a.current_humidity),
    equipment: Pi(a.hvac_action) ?? Oi(s, l, c),
    mode: s,
    state: e.state,
    setpoints: c
  };
}
function H(r, t) {
  if (r === null) return "–";
  const e = t.includes("C"), i = e ? Math.round(r * 2) / 2 : Math.round(r);
  return e && !Number.isInteger(i) ? i.toFixed(1) : String(i);
}
const Ni = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan",
  idle: "Idle",
  off: "Off"
}, ve = [
  ["none", "None", ""],
  ["plasma", "Liquid Plasma", "Soft glowing blobs that drift and blend into each other."],
  ["lava", "Lava Lamp", "Molten blobs that merge and split, rising from a pool."],
  ["aurora", "Aurora", "Ribbons of light flowing across the card."],
  ["flow", "Thermal Flow", "Bands of colour streaming up while heating and down while cooling."],
  ["shimmer", "Heat Shimmer / Frost", "Rising heat haze, or cold mist sinking with sparkles."],
  ["particles", "Embers / Snow", "Sparks floating up, or snowflakes drifting down."],
  ["core", "Breathing Core", "A glow behind the temperature that slowly swells."],
  ["mesh", "Mesh Gradient", "Large soft colour fields that slowly orbit and blend."],
  ["beam", "Glow Beam", "A soft diagonal beam of light that drifts."]
], Fi = [
  ["heating", "Heating"],
  ["cooling", "Cooling"],
  ["idle_heat", "Idle (heat)"],
  ["idle_cool", "Idle (cool)"],
  ["fan", "Air movement"],
  ["off", "Off"]
], _e = "var(--state-climate-heat-color, #ff8100)", we = "var(--state-climate-cool-color, #2b9af9)", mt = {
  heating: { main: _e, second: "#d1342a" },
  cooling: { main: we, second: "#3446d6" },
  idle_heat: { main: _e, second: "#7a3d14" },
  idle_cool: { main: we, second: "#1b4c86" },
  fan: { main: "var(--state-climate-fan-only-color, #00bfa5)", second: "#3d8fd1" },
  off: { main: "#8a8a92", second: "#3a3a4a" }
}, E = {
  strength: 85,
  speed: 100,
  follow_gap: !0,
  off: "calm",
  quality: "smooth",
  frost_blur: 12
}, $e = {
  quiet: 0.2,
  silent: 0.2,
  sleep: 0.2,
  lowest: 0.15,
  low: 0.33,
  "medium-low": 0.45,
  medium_low: 0.45,
  med: 0.6,
  medium: 0.6,
  middle: 0.6,
  mid: 0.6,
  "medium-high": 0.8,
  medium_high: 0.8,
  high: 0.9,
  highest: 1,
  max: 1,
  turbo: 1,
  boost: 1,
  powerful: 1
}, ye = /* @__PURE__ */ new Set(["off", "idle", "closed", "false", "no", "none", "stopped", "standby", "0", "not_running", "clear"]), Hi = /* @__PURE__ */ new Set(["on", "true", "yes", "open", "running", "detected", "active"]), G = (r) => Math.min(1, Math.max(0.05, r));
function Zt(r) {
  return r.background?.air_entity || r.background?.fan_entity || void 0;
}
function De(r, t, e) {
  if (!t) return null;
  const i = r.states[t];
  if (!i || kt.has(i.state)) return null;
  const o = String(i.state).trim().toLowerCase(), n = t.split(".")[0];
  if (ye.has(o)) return null;
  const a = i.attributes;
  if (n === "fan") {
    const p = z(a.percentage);
    return p === null ? 0.6 : p <= 0 ? null : G(p / 100);
  }
  const s = z(i.state);
  if (s !== null) {
    if (s <= 0) return null;
    if (e) return G(s / e);
    const p = z(a.min), h = z(a.max);
    if (h !== null && h > (p ?? 0)) return G((s - (p ?? 0)) / (h - (p ?? 0)));
    if (String(a.unit_of_measurement ?? "").trim() === "%") return G(s / 100);
    const f = s <= 1 ? 1 : s <= 10 ? 10 : 10 ** Math.ceil(Math.log10(s));
    return G(s / f);
  }
  if ($e[o] !== void 0) return $e[o];
  const l = Array.isArray(a.options) ? a.options.map((p) => String(p).toLowerCase()).filter((p) => !ye.has(p) && p !== "auto") : [], c = l.indexOf(o);
  return c >= 0 ? G((c + 1) / l.length) : Hi.has(o) ? 0.6 : 0.5;
}
function Ui(r, t) {
  const e = r.states[t.entity], i = String(e?.attributes.fan_mode ?? "").toLowerCase(), o = { quiet: 0.2, low: 0.33, medium: 0.6, middle: 0.6, high: 1, max: 1, turbo: 1 };
  if (o[i] !== void 0) return o[i];
  const n = (Array.isArray(e?.attributes.fan_modes) ? e.attributes.fan_modes : []).map((s) => String(s).toLowerCase()).filter((s) => !["auto", "off", "on", "circulate", "diffuse", "focus"].includes(s)), a = n.indexOf(i);
  return a >= 0 && n.length ? (a + 1) / n.length : 0.5;
}
function Di(r, t, e) {
  if (!e.available) return "off";
  if (e.equipment === "heating") return "heating";
  if (e.equipment === "cooling") return "cooling";
  if (e.mode === "fan_only" || e.equipment === "fan" || De(r, Zt(t), t.background?.air_max) !== null) return "fan";
  if (e.mode === "off") return "off";
  if (e.mode === "cool" || e.mode === "dry" || e.equipment === "drying") return "idle_cool";
  if (e.mode === "heat_cool" && e.setpoints && e.currentTemp !== null) {
    const { heat: i, cool: o } = e.setpoints;
    if (i !== null && o !== null) return e.currentTemp >= (i + o) / 2 ? "idle_cool" : "idle_heat";
    if (o !== null && i === null) return "idle_cool";
  }
  return "idle_heat";
}
function Ii(r, t) {
  const e = r.currentTemp, i = r.setpoints, o = t === "heating" ? i?.heat ?? i?.cool : i?.cool ?? i?.heat;
  if (e === null || o === null || o === void 0) return 0.7;
  const n = r.unit.includes("C") ? 3 : 5;
  return Math.round(Math.min(1, Math.abs(o - e) / n) * 10) / 10;
}
const ji = (r) => Math.max(0.1, Math.round(r * 4) / 4);
function qi(r, t, e) {
  const i = t.background ?? {}, o = i.style ?? "none";
  if (o === "none") return null;
  const n = Di(r, t, e);
  if (n === "off" && (i.off ?? E.off) === "none") return null;
  const a = (i.speed ?? E.speed) / 100, s = (i.strength ?? E.strength) / 100;
  let l, c;
  if (n === "heating" || n === "cooling") {
    const f = i.follow_gap ?? E.follow_gap ? Ii(e, n) : 0.7;
    l = 0.6 + 1.4 * f, c = 0.6 + 0.4 * f;
  } else n === "fan" ? (l = 0.4 + 2.6 * (De(r, Zt(t), i.air_max) ?? Ui(r, t)), c = 0.8) : n === "off" ? (l = 0.2, c = 0.35) : (l = 0.35, c = 0.55);
  const p = i.colors?.[n] ?? {}, h = mt[n];
  return {
    style: o,
    state: n,
    dir: n === "fan" ? "swirl" : n === "off" ? "still" : n === "heating" || n === "idle_heat" ? "up" : "down",
    rate: ji(l * a),
    opacity: Math.round(c * s * 100) / 100,
    main: p.main || h.main,
    second: p.second || h.second,
    blades: n === "fan"
  };
}
function Ie(r) {
  return !!(r.frosted ?? r.background?.frosted);
}
function Vi(r) {
  const t = r.background ?? {}, e = t.gradient?.stops?.filter(Boolean) ?? [];
  return t.fill === "gradient" && e.length >= 2 ? t.gradient?.type === "radial" ? `radial-gradient(circle at 50% 40%, ${e.join(", ")})` : `linear-gradient(${t.gradient?.angle ?? 135}deg, ${e.join(", ")})` : t.color ?? r.card?.background;
}
function Yi(r) {
  return r.replace(/[\\"]/g, (t) => `\\${t}`).replace(/[\n\r]/g, "");
}
function Wi(r, t) {
  const e = r.background ?? {}, i = {};
  t && (i["--etc-bg-a"] = t.main, i["--etc-bg-b"] = t.second, i["--etc-bg-op"] = String(t.opacity), i["--bg-rate"] = String(t.rate)), (e.quality ?? E.quality) === "light" && (i["--bg-blur-k"] = "0.6"), e.scrim && (i["--bg-scrim"] = String(Math.abs(e.scrim) / 100), i["--bg-scrim-c"] = e.scrim > 0 ? "#000" : "#fff"), e.vignette && (i["--bg-vig"] = String(e.vignette / 100)), e.grain && (i["--bg-grain"] = String(e.grain / 100));
  const o = r.frost_blur ?? e.frost_blur;
  return Ie(r) && o !== void 0 && (i["--frost"] = `${o}px`), e.fill === "image" && e.image?.url && (i["--bg-img"] = `url("${Yi(e.image.url)}")`, e.image.blur && (i["--bg-img-blur"] = `${e.image.blur}px`), e.image.darken && (i["--bg-img-dark"] = String(e.image.darken / 100))), i;
}
function je(r, t) {
  const e = t === "light", o = {
    plasma: [5, 4, 45, 75, 18, 30],
    lava: [6, 4, 18, 34, 16, 26],
    shimmer: [7, 4, 40, 70, 9, 15],
    particles: [22, 10, 3, 9, 10, 20],
    aurora: [3, 2, 30, 42, 14, 22]
  }[r];
  if (!o) return [];
  const [n, a, s, l, c, p] = o, h = e ? a : n;
  let f = r.length * 9973 + 17;
  const b = () => (f = (f * 1664525 + 1013904223) % 4294967296, f / 4294967296);
  return Array.from({ length: h }, (g, w) => {
    const y = Math.round(c + b() * (p - c));
    return {
      x: Math.round(8 + b() * 84),
      y: r === "aurora" ? [12, 38, 62][w % 3] : Math.round(10 + b() * 80),
      s: Math.round(s + b() * (l - s)),
      d: y,
      // Spread evenly through the cycle, with a little jitter.
      dl: -Math.round((w + b() * 0.5) / h * y * 10) / 10
    };
  });
}
const qe = {
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
function Ft(r, t) {
  const e = { ...qe };
  for (const i of [r, t])
    if (i)
      for (const o of Si) {
        const n = i[o];
        n !== void 0 && n !== "" && n !== null && (e[o] = n);
      }
  return e;
}
const it = (r) => r ? `${r}px` : void 0;
function xe(r) {
  const t = {
    "--etc-b-radius": r.radius !== void 0 ? `${r.radius}px` : void 0,
    "--etc-b-height": it(r.height),
    "--etc-b-minw": it(r.min_width),
    "--etc-b-gap": r.gap !== void 0 ? `${r.gap}px` : void 0,
    "--etc-b-icon": it(r.icon_size),
    "--etc-b-fs": it(r.font_size),
    "--etc-b-fw": r.font_weight ? String(r.font_weight) : void 0,
    "--etc-b-igap": r.icon_gap !== void 0 ? `${r.icon_gap}px` : void 0,
    "--etc-b-scale": r.scale !== void 0 && r.scale !== 100 ? String(r.scale / 100) : void 0,
    "--etc-b-bw": r.border_width !== void 0 ? `${r.border_width}px` : void 0,
    "--etc-b-bg": r.background,
    "--etc-b-fg": r.color,
    "--etc-b-bc": r.border_color,
    "--etc-b-abg": r.active_background,
    "--etc-b-afg": r.active_color,
    "--etc-b-abc": r.active_border_color
  };
  return Jt(t);
}
const Gi = {
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
function Xi(r) {
  const t = {};
  for (const e of Be) {
    const i = r?.[e];
    if (!i) continue;
    const o = `--etc-t-${Gi[e]}`;
    t[`${o}-fs`] = it(i.size), t[`${o}-fw`] = i.weight ? String(i.weight) : void 0, t[`${o}-c`] = i.color, t[`${o}-tt`] = i.transform, t[`${o}-ls`] = i.letter_spacing !== void 0 ? `${i.letter_spacing / 100}em` : void 0, t[`${o}-fst`] = i.italic === void 0 ? void 0 : i.italic ? "italic" : "normal", t[`${o}-op`] = i.opacity !== void 0 ? String(i.opacity / 100) : void 0;
  }
  return Jt(t);
}
function Ki(r) {
  const t = r.card ?? {}, e = r.setpoint ?? {};
  return Jt({
    "--etc-card-bg": Vi(r),
    "--etc-card-bc": t.border_color,
    "--etc-card-bw": t.border_width !== void 0 ? `${t.border_width}px` : void 0,
    "--etc-card-r": t.radius !== void 0 ? `${t.radius}px` : void 0,
    "--etc-card-pad": t.padding !== void 0 ? `${t.padding}px` : void 0,
    "--etc-scale": e.scale !== void 0 ? String(e.scale / 100) : void 0
  });
}
function Jt(r) {
  const t = {};
  for (const [e, i] of Object.entries(r)) i !== void 0 && i !== "" && (t[e] = i);
  return t;
}
const Zi = `
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
        .etce-test { border: 1px dashed var(--ltek-c-border); border-radius: var(--ltek-r-panel); padding: var(--ltek-sp-2) var(--ltek-sp-6); }
        .etce-test.on { border-color: var(--ltek-c-warning); background: color-mix(in srgb, var(--ltek-c-warning) 8%, transparent); }
        .etce-test .etce-hint { margin: 0 0 var(--ltek-sp-1); }
        .etce-tpl { align-items: flex-start; padding: var(--ltek-sp-3) var(--ltek-sp-1); }
        .etce-tpl-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .etce-tpl-hint { color: var(--ltek-c-muted); font-size: var(--ltek-fs-small); }
        .etce-tpl-tags { display: flex; flex-wrap: wrap; gap: var(--ltek-sp-1); margin-top: 2px; }
        .etce-tpl-tags span { font-size: var(--ltek-fs-tiny); color: var(--ltek-c-label); border: 1px solid var(--ltek-c-border); border-radius: 999px; padding: 0 6px; }
        .etce-tpl .etce-preset { flex: none; align-self: center; }
`, Ji = "esphome_rf_fan", Qi = "custom:rf-fan-ltek";
function Ve(r, t) {
  const e = r.entities, i = e?.[t]?.device_id;
  return !e || !i ? [] : Object.values(e).filter((o) => o.device_id === i && o.entity_id !== t).map((o) => o.entity_id);
}
function to(r, t) {
  const e = Ve(r, t).filter((o) => o.startsWith("light.")), i = r.entities ?? {};
  return e.find((o) => i[o]?.platform === Ji) ?? e[0] ?? null;
}
function eo(r, t) {
  const e = r.entities ?? {}, i = Ve(r, t).filter((o) => o.startsWith("sensor."));
  return i.find((o) => e[o]?.translation_key === "sleep_timer") ?? i.find((o) => r.states[o]?.attributes.device_class === "timestamp") ?? null;
}
function io(r, t) {
  const e = r?.attributes.friendly_name;
  return typeof e == "string" ? e : t;
}
function oo(r, t) {
  const e = r.split(".")[0], o = {
    fan: ["mdi:fan", "mdi:fan-off"],
    light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
    switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
    binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
    sensor: ["mdi:eye", "mdi:eye"]
  }[e ?? ""] ?? ["mdi:circle", "mdi:circle-outline"];
  return t ? o[0] : o[1];
}
function Ht(r, t, e) {
  const i = r.states[t.entity], o = !!i && !kt.has(i.state), n = o && !["off", "idle", "closed", "standby"].includes(i.state), a = {
    index: e,
    type: t.type,
    entity: t.entity,
    name: t.name ?? io(i, t.entity),
    icon: t.icon ?? (typeof i?.attributes.icon == "string" ? i.attributes.icon : oo(t.entity, n)),
    on: n,
    available: o,
    state: o ? no(r, i) : "Unavailable",
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
  if (t.type !== "rf_fan" || !i) return a;
  const s = i.attributes, l = z(s.percentage), c = ro(s), p = n && l !== null && c ? Math.max(1, Math.min(c, Math.round(l * c / 100))) : null, h = to(r, t.entity), f = eo(r, t.entity), b = f ? r.states[f]?.state : void 0, g = b && !kt.has(b) ? new Date(b) : null, w = typeof s.preset_mode == "string" ? s.preset_mode : "", y = n && !!w && w !== "normal", k = y ? ke(w) : null, m = Array.isArray(s.preset_modes) ? s.preset_modes.filter(($) => ke(String($)) !== null).length : 0, _ = t.speed_format ?? "number", S = p === null ? "On" : _ === "fraction" && c ? `${p}/${c}` : _ === "percent" && l !== null ? `${Math.round(l)}%` : String(p);
  return {
    ...a,
    icon: t.icon ?? "mdi:ceiling-fan",
    // In Breeze/natural mode the level is what matters, not the underlying speed.
    state: o ? n ? k !== null ? String(k) : S : "Off" : "Unavailable",
    speed: p,
    speedCount: c,
    naturalLevel: k,
    naturalLevels: m,
    percentage: l,
    direction: s.direction === "reverse" ? "reverse" : s.direction === "forward" ? "forward" : null,
    natural: y,
    lightEntity: h,
    lightOn: !!h && r.states[h]?.state === "on",
    timerEnds: g && !Number.isNaN(g.getTime()) && g.getTime() > Date.now() ? g : null,
    spin: n ? ao(l) : null
  };
}
function ro(r) {
  const t = z(r.speed_count);
  if (t && t > 0) return Math.round(t);
  const e = z(r.percentage_step);
  return e && e > 0 && e < 100 ? Math.round(100 / e) : null;
}
function ke(r) {
  const t = /^natural[ _]?(\d+)$/i.exec(r.trim());
  return t ? Number(t[1]) : null;
}
function ao(r) {
  const t = Math.min(100, Math.max(1, r ?? 50));
  return Math.round((3 - t / 100 * 2.4) * 100) / 100;
}
function Se(r, t = Date.now()) {
  const e = Math.max(0, Math.round((r.getTime() - t) / 6e4)), i = Math.floor(e / 60);
  return i ? `${i}h${String(e % 60).padStart(2, "0")}` : `${e}m`;
}
function no(r, t) {
  const e = r;
  try {
    if (e.formatEntityState) return e.formatEntityState(t);
  } catch {
  }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state.charAt(0).toUpperCase() + t.state.slice(1);
}
function so(r) {
  return r.popup_card ? r.popup_card : r.type === "rf_fan" ? { type: Qi, fan_entity: r.entity } : null;
}
function lo(r, t) {
  if (t === "toggle_light")
    return r.lightEntity ? { domain: "light", service: "toggle", data: { entity_id: r.lightEntity } } : null;
  const e = r.entity.split(".")[0];
  return ["fan", "light", "switch", "input_boolean", "climate", "humidifier", "media_player", "cover"].includes(e) ? { domain: "homeassistant", service: "toggle", data: { entity_id: r.entity } } : null;
}
const Ye = ["card", "setpoint", "pill", "mode_button", "mode_icon"], co = {
  card: "Entire card",
  setpoint: "Setpoint value (wheel, stepper or bar handle)",
  pill: "Setpoint pill",
  mode_button: "Mode button",
  mode_icon: "Mode icon"
}, bt = { when: "running", size: 18, speed: 2.4 };
function We(r, t) {
  const e = r.effects?.[t];
  return e || (t === "card" && (r.card?.glow ?? !0) ? "glow" : "none");
}
function ho(r, t) {
  if (!t.available) return null;
  if (t.equipment === "heating") return "heat";
  if (t.equipment === "cooling") return "cool";
  if ((r.effects?.when ?? bt.when) === "mode") {
    if (t.mode === "heat") return "heat";
    if (t.mode === "cool") return "cool";
  }
  return null;
}
function po(r, t) {
  const e = ho(r, t), i = {};
  if (!e) return i;
  i["fx-on"] = !0, i[`fx-${e}`] = !0;
  for (const o of Ye) {
    const n = We(r, o);
    (n === "glow" || n === "both") && (i[`fx-${o}-glow`] = !0), (n === "pulse" || n === "both") && (i[`fx-${o}-pulse`] = !0);
  }
  return i;
}
function uo(r) {
  const t = r.effects ?? {}, e = {};
  return t.size !== void 0 && (e["--fx-size"] = `${t.size}px`), t.speed !== void 0 && (e["--fx-speed"] = `${t.speed}s`), t.heat_color && (e["--fx-heat"] = t.heat_color), t.cool_color && (e["--fx-cool"] = t.cool_color), e;
}
const Ge = [
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
  "background",
  "frosted",
  "frost_blur",
  "setpoint",
  "sets"
], M = (r = {}) => ({ type: "hvac", ...r }), L = (r = {}) => ({ type: "preset", ...r }), F = (r = {}) => ({ type: "fan_mode", ...r }), Ut = [
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
      sets: [M(), L({ display: "toggle" }), F({ display: "toggle" })]
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
        M({ zone: "top", align: "center" }),
        L({ display: "menu", zone: "bottom" }),
        F({ display: "menu", zone: "bottom" })
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
      sets: [M({ zone: "top", align: "center" }), L({ display: "toggle" }), F({ display: "toggle" })]
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
        M({ display: "menu", menu_show_name: !1 }),
        L({ display: "menu", menu_show_name: !1 }),
        F({ display: "menu", menu_show_name: !1 })
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
      sets: [M({ zone: "left" }), L({ display: "menu", zone: "bottom" }), F({ display: "menu", zone: "bottom" })]
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
      sets: [M(), L({ columns: 4 }), F({ display: "toggle" })]
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
      background: { color: "transparent" },
      card: { border_width: 0, glow: !1 },
      sets: [M({ align: "center" })]
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
      sets: [M(), L({ display: "menu" }), F({ display: "menu" })]
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
      sets: [M(), L(), F()]
    }
  }
];
Ut.push(
  {
    id: "lava",
    name: "Lava Lamp",
    hint: "Molten blobs rise while heating and sink while cooling, behind frosted menus and a big light number.",
    icon: "mdi:lava-lamp",
    tags: ["lava background", "frosted", "menus"],
    values: {
      show_name: !1,
      status_position: "below",
      show_pills: !1,
      setpoint: { control: "wheel", wheel_style: "pill", position: "right" },
      text: { current: { size: 84, weight: 200 } },
      buttons: { radius: 16 },
      frosted: !0,
      background: { style: "lava", strength: 90, vignette: 35 },
      effects: { card: "none" },
      sets: [M({ display: "menu" }), L({ display: "menu" }), F({ display: "menu" })]
    }
  },
  {
    id: "aurora",
    name: "Northern Lights",
    hint: "Aurora ribbons that drift with the system, a gradient bar under the number, and ghost buttons.",
    icon: "mdi:weather-night",
    tags: ["aurora background", "gradient bar", "ghost"],
    values: {
      setpoint: { control: "bar", bar: { look: "gradient", position: "below", flags: !0, ticks: 0, labels: 5 } },
      buttons: { variant: "ghost", icon_position: "left" },
      text: { name: { transform: "uppercase", letter_spacing: 12, size: 12 }, current: { weight: 100 } },
      frosted: !0,
      background: { style: "aurora", strength: 85, grain: 15 },
      effects: { card: "none" },
      sets: [M(), L({ display: "toggle" }), F({ display: "toggle" })]
    }
  },
  {
    id: "frost",
    name: "Frosted Glass",
    hint: "A soft light beam behind frosted glass controls, with a vignette and fine grain.",
    icon: "mdi:blur",
    tags: ["beam background", "frosted", "stepper"],
    values: {
      setpoint: { control: "stepper", position: "center", scale: 110 },
      buttons: { variant: "outlined", radius: 999, content: "icon", height: 46, min_width: 46 },
      text: { current: { size: 92, weight: 100 } },
      card: { border_width: 0 },
      frosted: !0,
      frost_blur: 16,
      background: { color: "#050507", style: "beam", strength: 95, vignette: 45, grain: 20 },
      effects: { card: "none" },
      sets: [M({ align: "center" }), L({ display: "menu" })]
    }
  }
);
function fo(r) {
  return Ge.some((t) => r[t] !== void 0);
}
const go = ["order", "options", "name", "toggle_icon"];
function mo(r, t) {
  const e = r ?? [], i = /* @__PURE__ */ new Set(), o = t.map((a) => {
    const s = e.findIndex((c, p) => !i.has(p) && c.type === a.type);
    if (s < 0) return structuredClone(a);
    i.add(s);
    const l = {};
    for (const c of go) e[s][c] !== void 0 && (l[c] = structuredClone(e[s][c]));
    return { ...structuredClone(a), ...l };
  }), n = e.filter((a, s) => a.type === "chips" && !i.has(s));
  return [...structuredClone(n), ...o];
}
function bo(r, t) {
  const e = { ...r };
  for (const a of Ge) delete e[a];
  const i = structuredClone(t.values), o = r.setpoint ?? {};
  if (o.min_gap !== void 0 || o.bar?.range_min !== void 0 || o.bar?.range_max !== void 0) {
    const a = { ...i.setpoint ?? {} };
    o.min_gap !== void 0 && (a.min_gap = o.min_gap), (o.bar?.range_min !== void 0 || o.bar?.range_max !== void 0) && (a.bar = { ...a.bar ?? {} }, o.bar?.range_min !== void 0 && (a.bar.range_min = o.bar.range_min), o.bar?.range_max !== void 0 && (a.bar.range_max = o.bar.range_max)), i.setpoint = a;
  }
  const n = r.background;
  return n?.fill === "image" && n.image?.url && !i.background?.fill && (i.background = { ...i.background ?? {}, fill: "image", image: structuredClone(n.image) }), i.sets ? i.sets = mo(r.sets, i.sets) : r.sets && (i.sets = r.sets), { ...e, ...i };
}
const Ae = ["heating", "cooling", "idle", "fan", "off"], vo = 6e3, _o = {
  heating: "Heating",
  cooling: "Cooling",
  idle: "Idle",
  fan: "Fan",
  off: "Off"
};
function ze(r, t) {
  if (!r.available) return r;
  const e = r.setpoints, i = r.unit.includes("C") ? 2 : 4, o = e?.heat ?? e?.cool ?? r.currentTemp ?? 70, n = e?.cool ?? e?.heat ?? r.currentTemp ?? 74;
  switch (t) {
    case "heating":
      return { ...r, equipment: "heating", mode: r.mode === "heat_cool" ? "heat_cool" : "heat", currentTemp: o - i, setpoints: e ?? { heat: o, cool: null } };
    case "cooling":
      return { ...r, equipment: "cooling", mode: r.mode === "heat_cool" ? "heat_cool" : "cool", currentTemp: n + i, setpoints: e ?? { heat: null, cool: n } };
    case "idle": {
      const a = r.mode === "heat" || r.mode === "cool" || r.mode === "heat_cool" ? r.mode : "heat";
      return { ...r, equipment: "idle", mode: a, currentTemp: a === "cool" ? n : o, setpoints: e ?? { heat: o, cool: null } };
    }
    case "fan":
      return { ...r, equipment: "fan", mode: "fan_only" };
    case "off":
      return { ...r, equipment: "off", mode: "off", setpoints: null };
  }
}
const Dt = "etc-test-mode";
function Xe() {
  const r = window;
  return r.__etcTest ??= {};
}
function vt(r) {
  return r && Xe()[r] || null;
}
function ht(r, t) {
  if (!r) return;
  const e = Xe();
  t ? e[r] = t : delete e[r], window.dispatchEvent(new CustomEvent(Dt, { detail: { entity: r } }));
}
function wo(r, t) {
  return r ? r === "cycle" ? Ae[t % Ae.length] : r : null;
}
var $o = Object.defineProperty, lt = (r, t, e, i) => {
  for (var o = void 0, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (o = a(t, e, o) || o);
  return o && $o(t, e, o), o;
};
const _t = [
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
function yo(r) {
  const t = r == null ? "" : String(r);
  return t === "" ? "default" : t === "transparent" ? "transparent" : /^#[0-9a-fA-F]{3,8}$/.test(t) ? "custom" : /^var\(/.test(t) && _t.some(([e]) => e === t) ? "theme" : "css";
}
const xo = {
  name: "Name",
  status: "Status (Heating / Cooling)",
  current: "Current temperature",
  unit: "Unit (°)",
  humidity: "Humidity",
  pill: "Setpoint pills",
  wheel_value: "Wheel / stepper value",
  wheel_neighbor: "Wheel next values",
  bar: "Bar labels"
}, ko = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, te = class te extends Z {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(["thermostat"]), this._set = null, this._chip = null, this._cmode = {}, this._panels = /* @__PURE__ */ new Set();
  }
  setConfig(t) {
    const e = this._config?.entity;
    if (this._config = Ot(t), e && e !== this._config.entity) {
      const i = vt(e);
      i && (ht(e, null), ht(this._config.entity, i));
    }
  }
  // ---- writes ---------------------------------------------------------------
  _emit(t) {
    this._config = Ot(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  /** Set a path; `undefined`/'' or the built-in default removes the key. */
  _put(t, e, i) {
    if (!this._config) return;
    const o = e === i ? void 0 : e;
    this._emit(T(this._config, t, o));
  }
  _get(t) {
    return zi(this._config, t);
  }
  /** The configured sets, materialized from the defaults on first edit. */
  _sets() {
    return Array.isArray(this._config?.sets) ? this._config.sets : Ne.map((t) => ({ ...t }));
  }
  _writeSets(t) {
    this._emit({ ...this._config, sets: t });
  }
  _patchSet(t, e, i, o) {
    const n = this._sets(), a = T(n[t] ?? {}, e, i === o ? void 0 : i);
    n[t] = { ...a, type: n[t].type }, this._writeSets(n);
  }
  // ---- primitives -------------------------------------------------------------
  _toggleOpen(t, e, i = !1) {
    const o = e.currentTarget.open;
    if (o === this._open.has(t)) return;
    const n = new Set(this._open);
    if (o) {
      if (i)
        for (const a of this._panels) a !== t && n.delete(a);
      n.add(t);
    } else n.delete(t);
    this._open = n;
  }
  /** Closing the editor always ends test mode. */
  disconnectedCallback() {
    super.disconnectedCallback(), vt(this._config?.entity) && ht(this._config?.entity, null);
  }
  _panel(t, e, i, o) {
    return this._panels.add(t), d`<details class="etce-sec" ?open=${this._open.has(t)} @toggle=${(n) => this._toggleOpen(t, n, !0)}>
      <summary><ha-icon icon=${e}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${o}</div>
    </details>`;
  }
  _sub(t, e, i) {
    return d`<details class="etce-sub" ?open=${this._open.has(t)} @toggle=${(o) => this._toggleOpen(t, o)}>
      <summary>${e}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${i()}</div>
    </details>`;
  }
  _group(t, e = !1) {
    return d`<div class="etce-group ${e ? "first" : ""}">${t}</div>`;
  }
  _hint(t) {
    return d`<p class="etce-hint">${t}</p>`;
  }
  _check(t, e, i) {
    return d`<label class="etce-check"
      ><input type="checkbox" .checked=${e} @change=${(o) => i(o.target.checked)} />${t}</label
    >`;
  }
  _bool(t, e, i) {
    const o = this._get(t) ?? i;
    return this._check(e, o, (n) => this._put(t, n, i));
  }
  _selectRow(t, e, i, o) {
    return d`<div class="etce-row">
      <label class="lbl">${t}</label>
      <select @change=${(n) => o(n.target.value)}>
        ${i.map(([n, a]) => d`<option value=${n} ?selected=${n === e}>${a}</option>`)}
      </select>
    </div>`;
  }
  _select(t, e, i, o) {
    const n = String(this._get(t) ?? o);
    return this._selectRow(e, n, i, (a) => this._put(t, a, o));
  }
  _sliderRow(t, e, i, o, n, a, s, l = (c) => `${c}px`) {
    return d`<div class="etce-row etce-nowrap">
      <label class="lbl">${t}</label>
      <input
        type="range"
        min=${i}
        max=${o}
        step=${n}
        .value=${String(e)}
        @input=${(c) => {
      const p = c.target;
      p.nextElementSibling.textContent = l(Number(p.value));
    }}
        @change=${(c) => s(Number(c.target.value))}
      />
      <span class="etce-val">${l(e)}</span>
      ${a ? d`<button class="etce-reset" title="Back to default" @click=${() => s(void 0)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>` : u}
    </div>`;
  }
  _slider(t, e, i, o, n, a, s) {
    const l = this._get(t);
    return this._sliderRow(e, l ?? a, i, o, n, l !== void 0, (c) => this._put(t, c, a), s);
  }
  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  _colorRow(t, e, i, o, n, a, s = {}) {
    let l = this._cmode[t] || yo(i);
    l === "transparent" && !s.transparent && (l = "css");
    let c = u;
    if (l === "theme")
      c = d`<select @change=${(h) => a(h.target.value)}>
        ${_t.map(([h, f]) => d`<option value=${h} ?selected=${h === i}>${f}</option>`)}
      </select>`;
    else if (l === "custom") {
      const h = i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : n;
      c = d`<input type="color" .value=${h} @change=${(f) => a(f.target.value)} />`;
    } else l === "css" && (c = d`<input
        type="text"
        .value=${i ?? ""}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(h) => a(h.target.value || void 0)}
      />`);
    const p = (h) => {
      this._cmode = { ...this._cmode, [t]: h }, h === "default" ? a(void 0) : h === "transparent" ? a("transparent") : h === "theme" ? a(_t.some(([f]) => f === i) ? i : _t[0][0]) : h === "custom" ? a(i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : n) : this.requestUpdate();
    };
    return d`<div class="etce-row">
      <label class="lbl">${e}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(h) => p(h.target.value)}>
          ${[
      ["default", o],
      ...s.transparent ? [["transparent", "Transparent"]] : [],
      ["theme", "Theme color"],
      ["custom", "Custom color"],
      ["css", "Custom CSS"]
    ].map(
      ([h, f]) => d`<option value=${h} ?selected=${h === l}>${f}</option>`
    )}
        </select>
        ${c}
      </div>
    </div>`;
  }
  _color(t, e, i, o) {
    return this._colorRow(t, e, this._get(t), i, o, (n) => this._put(t, n));
  }
  _selector(t, e, i, o) {
    return d`<div class="etce-row">
      ${t ? d`<label class="lbl">${t}</label>` : u}
      <ha-selector
        .hass=${this.hass}
        .selector=${e}
        .value=${i}
        @value-changed=${(n) => o(n.detail.value)}
      ></ha-selector>
    </div>`;
  }
  // ---- render -----------------------------------------------------------------
  render() {
    return this._config ? d`<div class="etce">
      ${this._testBar()}
      ${this._panel("thermostat", "mdi:thermostat", "Thermostat", this._thermostatBody())}
      ${this._panel("templates", "mdi:palette-outline", "Quick Preset Templates", this._templatesBody())}
      ${this._panel("setpoint", "mdi:knob", "Setpoint control", this._setpointBody())}
      ${this._panel("sets", "mdi:gesture-tap-button", "Button sets", this._setsBody())}
      ${this._panel("buttons", "mdi:palette-swatch-outline", "Button style", this._buttonsBody())}
      ${this._panel("text", "mdi:format-text", "Text", this._textBody())}
      ${this._panel("card", "mdi:card-outline", "Card Shape", this._cardBody())}
      ${this._panel("background", "mdi:image-filter-hdr", "Background", this._backgroundBody())}
      ${this._panel("effects", "mdi:shimmer", "Heating & Cooling Effects", this._effectsBody())}
      <div class="etce-foot">Easy Thermostat Styler Card v${Le}</div>
    </div>` : u;
  }
  _testBar() {
    const t = vt(this._config.entity) ?? "";
    return d`<div class="etce-test ${t ? "on" : ""}">
      ${this._selectRow(
      "Test mode",
      t,
      [
        ["", "Off"],
        ["heating", "Heating"],
        ["cooling", "Cooling"],
        ["idle", "Idle"],
        ["fan", "Fan / air movement"],
        ["off", "System off"],
        ["cycle", "Cycle through all (6 s each)"]
      ],
      (e) => {
        ht(this._config.entity, e || null), this.requestUpdate();
      }
    )}
      <p class="etce-hint">
        ${t ? "The card acts as if it were in that state so you can see the effects and moving background. It is not saved with the card and switches off when you close the editor." : "Preview the heating, cooling, idle, fan and off looks (effects and moving background) without waiting for the real thing."}
      </p>
    </div>`;
  }
  _thermostatBody() {
    const t = this._config;
    return d`
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
        ${this._bool("show_name", "Name", v.show_name)} ${this._bool("show_status", "Status", v.show_status)}
        ${this._bool("show_humidity", "Humidity", v.show_humidity)}
        ${this._bool("show_current", "Current temperature", v.show_current)}
        ${this._bool("show_pills", "Setpoint pills", v.show_pills)}
      </div>
      ${this._group("Layout")}
      ${this._select("core_align", "Align", [["left", "Left"], ["center", "Center"], ["right", "Right"]], v.core_align)}
      ${this._select(
      "status_position",
      "Status",
      [["above", "Above the temperature"], ["beside", "Beside the temperature"], ["below", "Below the temperature"]],
      v.status_position
    )}
    `;
  }
  _templatesBody() {
    const t = (e) => {
      const i = Ut.find((o) => o.id === e);
      fo(this._config) && !window.confirm(
        `Apply the “${i.name}” template?

It replaces this card’s layout, setpoint control and styling. Your device chips, button order/names/icons and temperature range are kept.`
      ) || this._emit(bo(this._config, i));
    };
    return d`
      ${this._hint("One-click starting points, each with its own setpoint control, button style and layout. Fine-tune anything afterwards; nothing stays linked to the template.")}
      <div class="etce-blist">
        ${Ut.map(
      (e) => d`<div class="etce-brow etce-tpl">
            <ha-icon class="etce-sicon" icon=${e.icon}></ha-icon>
            <div class="etce-tpl-text">
              <span class="etce-sname">${e.name}</span>
              <span class="etce-tpl-hint">${e.hint}</span>
              <span class="etce-tpl-tags">${e.tags.map((i) => d`<span>${i}</span>`)}</span>
            </div>
            <button class="etce-preset" @click=${() => t(e.id)}>Apply</button>
          </div>`
    )}
      </div>
    `;
  }
  _setpointBody() {
    const t = this._get("setpoint.control") ?? v.control;
    return d`
      ${this._hint("How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.")}
      ${this._select(
      "setpoint.control",
      "Control",
      [["wheel", "Wheel"], ["stepper", "− / + stepper"], ["bar", "Setpoint bar"], ["none", "None (display only)"]],
      v.control
    )}
      ${t === "wheel" || t === "stepper" ? d`
            ${this._select("setpoint.position", "Position", [["left", "Left"], ["right", "Right"], ["center", "Center (below)"]], v.position)}
            ${this._slider("setpoint.scale", "Size", 40, 250, 5, v.scale, (e) => `${e}%`)}
            ${this._hint("Size scales the controls only; the current temperature has its own size under Text.")}
            ${this._nudgeSelect(t)}
            ${t === "wheel" ? d`${this._slider("setpoint.neighbors", "Next values shown", 0, 3, 1, v.neighbors, (e) => String(e))}
                ${this._select("setpoint.wheel_style", "Centre value", [["bubble", "Bubble"], ["pill", "Pill (like the setpoint pills)"]], v.wheel_style)}` : u}
          ` : u}
      ${t === "bar" ? this._barBody() : u}
      ${t !== "none" ? this._revealBody() : u}
      ${this._group("Heat / Cool")}
      ${this._slider("setpoint.min_gap", "Minimum gap", 0, 10, 0.5, this._defaultGap(), (e) => `${e}°`)}
    `;
  }
  /** − / + placement; the wheel defaults to Right, the stepper to Either side. */
  _nudgeSelect(t) {
    const e = t === "stepper" ? "around" : "right", i = this._get("setpoint.nudge"), o = i === "beside" ? "right" : i ?? e, n = [
      ["right", "Right"],
      ["left", "Left"],
      ["above", "Both above"],
      ["below", "Both below"],
      ["stacked", "+ above, − below"],
      ["around", "− left, + right"],
      ["hidden", "Hidden"]
    ];
    return this._selectRow("− / + buttons", o, n, (a) => this._put("setpoint.nudge", a === e ? void 0 : a));
  }
  _revealBody() {
    const t = (this._get("setpoint.reveal") ?? v.reveal) === "tap", e = this._get("setpoint.hide_after") ?? v.hide_after;
    return d`
      ${this._group("Show controls")}
      ${this._select("setpoint.reveal", "Controls", [["always", "Always shown"], ["tap", "Shown when tapped"]], v.reveal)}
      ${this._hint(
      t ? "The controls stay folded away until you tap. They fold away again after the time below without use." : "Choose “Shown when tapped” to keep the card calm: just the temperature and setpoint until you want to change it."
    )}
      ${t ? d`
            ${this._select(
      "setpoint.reveal_from",
      "Open by tapping",
      [["both", "Setpoint pill or current temperature"], ["pills", "Setpoint pill"], ["current", "Current temperature"]],
      v.reveal_from
    )}
            ${this._select(
      "setpoint.collapsed",
      "While closed show",
      [["visual", "The control’s value (tap it to open too)"], ["hidden", "Nothing — just the pill / temperature"]],
      v.collapsed
    )}
            ${this._select(
      "setpoint.open_in",
      "Opens",
      [["place", "In its own place"], ["current", "In place of the current temperature"]],
      v.open_in
    )}
            ${this._hint("“In place of the current temperature” swaps the big number for the controls while they are open.")}
            ${this._bool("setpoint.hide_pills_open", "Hide the setpoint pill while the controls are open", !1)}
            ${this._hint("The control already shows the setpoint. In Heat / Cool a small heat/cool switch appears on the control instead. Tap the wheel (without dragging) to close it.")}
            ${this._bool("setpoint.hide_at_target", "Hide the setpoint once the room reaches it", !1)}
            ${this._hint("While closed, only the current temperature shows once it matches the setpoint; until then the setpoint shows beside it. Tap the temperature to open the controls at any time.")}
            ${this._sliderRow(
      "Close after",
      e,
      0,
      60,
      1,
      this._get("setpoint.hide_after") !== void 0,
      (i) => this._put("setpoint.hide_after", i, v.hide_after),
      (i) => i ? `${i}s` : "Stay open"
    )}
          ` : u}
    `;
  }
  /** A bar-side choice: above / below for a horizontal bar, left / right for a vertical one. */
  _sidePlacement(t, e, i, o) {
    const n = String(this._get("setpoint.bar.position") ?? v.bar.position), a = n === "left" || n === "right", s = a ? [["left", "Left of the bar"], ["right", "Right of the bar"]] : [["above", "Above the bar"], ["below", "Below the bar"]], l = a ? o : i, c = String(this._get(`setpoint.bar.${t}`) ?? l);
    return this._selectRow(e, s.some(([p]) => p === c) ? c : l, s, (p) => this._put(`setpoint.bar.${t}`, p, l));
  }
  _defaultGap() {
    return (this.hass?.config?.unit_system?.temperature ?? "").includes("C") ? 1.5 : 3;
  }
  _barBody() {
    const t = v.bar, e = this._get("setpoint.bar.look") ?? t.look, i = this._get("setpoint.bar.stops") ?? ["#2b9af9", "#7ccf8a", "#ff8100"];
    return d`
      ${this._select(
      "setpoint.bar.position",
      "Position",
      [["below", "Below (horizontal)"], ["above", "Above (horizontal)"], ["left", "Left (vertical)"], ["right", "Right (vertical)"]],
      t.position
    )}
      ${["left", "right"].includes(String(this._get("setpoint.bar.position") ?? "")) ? this._slider("setpoint.bar.length", "Height", 100, 400, 10, 200) : u}
      ${this._select("setpoint.bar.look", "Look", [["zones", "Heat / comfort / cool zones"], ["gradient", "Gradient"]], t.look)}
      ${e === "gradient" ? d`<div class="etce-row">
            <label class="lbl">Gradient (cold → hot)</label>
            <div class="etce-stops">
              ${i.map(
      (o, n) => d`<input
                  type="color"
                  .value=${o}
                  @change=${(a) => {
        const s = [...i];
        s[n] = a.target.value, this._put("setpoint.bar.stops", s);
      }}
                />`
    )}
            </div>
          </div>` : d`${this._color("setpoint.bar.heat_color", "Heat zone", "Theme heat", "#ff8100")}
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
      (o) => this._put("setpoint.bar.handle_border_color", o ? void 0 : "none")
    )}
      ${this._get("setpoint.bar.handle_border_color") !== "none" ? this._color("setpoint.bar.handle_border_color", "Handle border colour", "Heat / cool colour", "#ffffff") : u}
      ${this._group("Value flags")}
      ${this._bool("setpoint.bar.flags", "Show value flags on the handles", t.flags)}
      ${this._get("setpoint.bar.flags") ?? t.flags ? d`${this._sidePlacement("flag_position", "Flag placement", "above", "left")}
          ${this._color("setpoint.bar.flag_color", "Flag colour", "Heat / cool colour", "#ff8100")}
          ${this._color("setpoint.bar.flag_text_color", "Flag text colour", "White", "#ffffff")}` : u}
      ${this._group("Markers")}
      ${this._bool("setpoint.bar.show_current", "Current temperature marker", t.show_current)}
      ${this._slider("setpoint.bar.ticks", "Tick every", 0, 10, 0.5, t.ticks, (o) => o ? `${o}°` : "Off")}
      ${this._slider("setpoint.bar.labels", "Label every", 0, 20, 1, t.labels, (o) => o ? `${o}°` : "Off")}
      ${(this._get("setpoint.bar.ticks") ?? t.ticks) || (this._get("setpoint.bar.labels") ?? t.labels) ? this._sidePlacement("tick_position", "Ticks & labels", "below", "right") : u}
      ${this._group("Range")}
      ${this._hint("Leave empty to use the thermostat’s own limits.")}
      ${["range_min", "range_max"].map(
      (o) => d`<div class="etce-row">
          <label class="lbl">${o === "range_min" ? "From" : "To"}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${o}`) ?? "")}
            @change=${(n) => {
        const a = n.target.value;
        this._put(`setpoint.bar.${o}`, a === "" ? void 0 : Number(a));
      }}
          />
        </div>`
    )}
    `;
  }
  // ---- button sets --------------------------------------------------------------
  _setsBody() {
    const t = this._sets(), e = this.hass?.states[this._config.entity], i = (o) => {
      const n = [...t, o === "chips" ? { type: o, chips: [] } : { type: o }];
      this._set = n.length - 1, this._writeSets(n);
    };
    return d`
      ${this._hint("Groups of buttons. Each set picks its side of the card, its layout, and how it shows: full time, behind a toggle button, or as an expandable menu.")}
      ${this._select("toggles_zone", "Default location", [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], v.toggles_zone)}
      ${this._hint("Where sets go when they have no Side of their own, and where the toggle buttons sit. A set’s own Side always wins.")}
      ${this._bool("zones.centered", "Keep the main area centred", !0)}
      ${this._hint("Balances the left and right sides so the temperature and controls stay on the card’s centre, whatever sits beside them.")}
      ${this._slider("zones.gap", "Distance from the main area", 0, 48, 1, 12)}
      ${this._sub("zone-gaps", "Distance per side", () => d`${this._hint("Overrides the distance above for one side.")}
        ${["top", "bottom", "left", "right"].map((o) => {
      const n = this._get(`zones.${o}`), a = this._get("zones.gap") ?? 12;
      return this._sliderRow(o.charAt(0).toUpperCase() + o.slice(1), n ?? a, 0, 48, 1, n !== void 0, (s) => this._put(`zones.${o}`, s));
    })}`)}
      ${this._bool("compact", "Compact", !1)}
      ${this._hint("Puts every full-time set behind a toggle button, so the card stays small until you open one. Sets shown as expandable menus are already compact and are not changed.")}
      ${this._group("Sets")}
      <div class="etce-addbar">
        ${["hvac", "preset", "fan_mode", "chips"].map(
      (o) => d`<button class="etce-add" @click=${() => i(o)}>+ ${et[o]}</button>`
    )}
      </div>
      <div class="etce-slist">
        ${t.map((o, n) => {
      const a = o.type === "chips" || Bt(e, o.type).length > 0, s = this._set === n;
      return d`<div class="etce-srow ${o.hidden ? "off" : ""} ${s ? "open" : ""}">
              <ha-icon class="etce-sicon" icon=${ko[o.type]}></ha-icon>
              <span class="etce-sname" @click=${() => this._set = s ? null : n}>${o.name ?? et[o.type]}</span>
              <span class="etce-stag"
                >${a ? `${o.zone ?? this._defaultZone()} · ${this._displayTag(o)}` : "not on this entity"}</span
              >
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._set = s ? null : n}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" title="Move up" ?disabled=${n === 0} @click=${() => this._moveSet(n, -1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button class="etce-act" title="Move down" ?disabled=${n === t.length - 1} @click=${() => this._moveSet(n, 1)}>
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
                <button class="etce-act etce-eye ${o.hidden ? "off" : ""}" title=${o.hidden ? "Show" : "Hide"} @click=${() => this._patchSet(n, "hidden", !o.hidden, !1)}>
                  <ha-icon icon=${o.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
                <button class="etce-act del" title="Delete" @click=${() => this._deleteSet(n)}>
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${s ? d`<div class="etce-sedit">${this._setEditor(o, n)}</div>` : u}`;
    })}
      </div>
    `;
  }
  _defaultZone() {
    return this._config?.toggles_zone ?? v.toggles_zone;
  }
  _displayTag(t) {
    return t.display === "menu" && t.type !== "chips" ? "menu" : this._config.compact || t.display === "toggle" ? "toggle" : "full time";
  }
  /** "Share a row with": own row, or any other set (by id, added on demand). */
  _shareRow(t, e) {
    const i = this._sets(), o = (l, c) => `${l.name ?? et[l.type]} (#${c + 1})`, n = i.map((l, c) => [l, c]).filter(([, l]) => l !== e), a = t.row_with ? i.findIndex((l) => l.id === t.row_with) : -1, s = (l) => {
      const c = i.map((h) => ({ ...h }));
      if (l === "") delete c[e].row_with;
      else {
        const h = Number(l);
        let f = c[h].id;
        if (!f) {
          const b = new Set(c.map((w) => w.id).filter(Boolean));
          let g = 1;
          for (; b.has(`set${g}`); ) g++;
          f = `set${g}`, c[h].id = f;
        }
        c[e].row_with = f;
      }
      const p = new Set(c.map((h) => h.row_with).filter(Boolean));
      for (const h of c) h.id && !p.has(h.id) && delete h.id;
      this._writeSets(c);
    };
    return d`${this._selectRow(
      "Share a row with",
      a >= 0 ? String(a) : "",
      [["", "Own row"], ...n.map(([l, c]) => [String(c), o(l, c)])],
      s
    )}
      ${a >= 0 ? this._hint("Sits in that set’s row, on its side of the card; this set’s own Side is ignored.") : u}`;
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
    const i = t.zone ?? this._defaultZone(), o = i === "left" || i === "right", n = (a, s, l) => this._patchSet(e, a, s, l);
    return d`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${et[t.type]} @change=${(a) => n("name", a.target.value || void 0)} />
      </div>
      ${this._group("Placement")}
      ${this._selectRow(
      "Side",
      t.zone ?? "",
      [["", `Default (${this._defaultZone()})`], ["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]],
      (a) => n("zone", a || void 0)
    )}
      ${this._selectRow(
      "Orientation",
      t.orientation ?? (o ? "column" : "row"),
      [["row", "Row"], ["column", "Column"]],
      (a) => n("orientation", a, o ? "column" : "row")
    )}
      ${this._selectRow(
      "Align",
      t.align ?? (t.type === "chips" ? "center" : "stretch"),
      [["stretch", "Fill width"], ["start", "Start"], ["center", "Center"], ["end", "End"]],
      (a) => n("align", a, t.type === "chips" ? "center" : "stretch")
    )}
      ${(t.align ?? "stretch") === "stretch" && t.type !== "chips" ? this._sliderRow("Columns", t.columns ?? 0, 0, 8, 1, t.columns !== void 0, (a) => n("columns", a, 0), (a) => a ? String(a) : "Auto") : u}
      ${this._shareRow(t, e)}
      ${this._group("Display")}
      ${this._selectRow(
      "Show",
      t.display ?? "always",
      [["always", "Full time"], ["toggle", "Behind a toggle button"], ...t.type === "chips" ? [] : [["menu", "Expandable menu"]]],
      (a) => n("display", a, "always")
    )}
      ${t.display === "menu" ? d`${this._hint("One button shows the current value; tap it to open the full list.")}
          ${this._selectRow(
      "Opens",
      t.menu_direction ?? Nt(i),
      [["down", "Down"], ["up", "Up"], ["right", "Right"], ["left", "Left"]],
      (a) => n("menu_direction", a, Nt(i))
    )}
          ${this._check("Show the set name on the button", t.menu_show_name ?? !0, (a) => n("menu_show_name", a, !0))}` : u}
      ${(t.display ?? "always") === "toggle" || this._config.compact && t.display !== "menu" ? this._selector("Toggle icon", { icon: {} }, t.toggle_icon, (a) => n("toggle_icon", a || void 0)) : u}
      ${t.type === "chips" ? this._sub(`set-${e}-chips`, "Chips", () => this._chipsEditor(t, e)) : this._sub(`set-${e}-options`, "Buttons in this set", () => this._optionsEditor(t, e))}
      ${this._sub(`set-${e}-style`, "Button style for this set", () => this._buttonStyleEditor(`sets.${e}.style`, !0, e))}
    `;
  }
  _optionsEditor(t, e) {
    const i = this.hass?.states[this._config.entity], o = He(Bt(i, t.type), t.order);
    if (!o.length) return this._hint("This entity has no options for this set.");
    const n = (a, s) => {
      const l = [...o], c = a + s;
      c < 0 || c >= l.length || ([l[a], l[c]] = [l[c], l[a]], this._patchSet(e, "order", l));
    };
    return d`${this._hint("Order, hide, rename and re-icon each button.")}
      <div class="etce-blist">
        ${o.map((a, s) => {
      const l = t.options?.[a] ?? {}, c = `${e}:${a}`;
      return d`<div class="etce-brow ${l.hide ? "off" : ""}">
              <ha-icon class="etce-sicon" icon=${l.icon ?? Kt[a.toLowerCase()] ?? "mdi:circle-medium"}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = this._chip === c ? null : c}>${l.name ?? Lt(a)}</span>
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._chip = this._chip === c ? null : c}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === 0} @click=${() => n(s, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === o.length - 1} @click=${() => n(s, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act etce-eye ${l.hide ? "off" : ""}" @click=${() => this._patchSet(e, `options.${a}.hide`, !l.hide, !1)}>
                  <ha-icon icon=${l.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
              </div>
            </div>
            ${this._chip === c ? d`<div class="etce-sedit">
                  <div class="etce-row">
                    <label class="lbl">Label</label>
                    <input type="text" .value=${l.name ?? ""} placeholder=${Lt(a)} @change=${(p) => this._patchSet(e, `options.${a}.name`, p.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, l.icon, (p) => this._patchSet(e, `options.${a}.icon`, p || void 0))}
                </div>` : u}`;
    })}
      </div>`;
  }
  _chipsEditor(t, e) {
    const i = t.chips ?? [], o = (a) => this._patchSet(e, "chips", a.length ? a : void 0), n = (a) => {
      const s = a === "rf_fan" ? this._firstRfFan() ?? "" : "";
      this._chip = `chip:${e}:${i.length}`;
      const l = s || Object.keys(this.hass?.states ?? {}).find((c) => c.startsWith(a === "rf_fan" ? "fan." : "sensor.")) || "";
      l && o([...i, { type: a, entity: l }]);
    };
    return d`
      ${this._hint("Status chips for linked devices. RF fan chips find the fan’s light and sleep timer automatically. Tap opens the fan card in a pop-up; hold toggles.")}
      <div class="etce-addbar">
        <button class="etce-add" @click=${() => n("rf_fan")}>+ RF fan</button>
        <button class="etce-add" @click=${() => n("entity")}>+ Entity</button>
      </div>
      <div class="etce-blist">
        ${i.map((a, s) => {
      const l = `chip:${e}:${s}`, c = this._chip === l, p = this.hass?.states[a.entity], h = a.name ?? p?.attributes.friendly_name ?? a.entity, f = (g, w, y) => {
        const k = [...i];
        k[s] = T(k[s], g, w === y ? void 0 : w), k[s] = { ...k[s], type: a.type, entity: k[s].entity || a.entity }, o(k);
      }, b = (g) => {
        const w = [...i], y = s + g;
        y < 0 || y >= w.length || ([w[s], w[y]] = [w[y], w[s]], o(w));
      };
      return d`<div class="etce-brow">
              <ha-icon class="etce-sicon" icon=${a.icon ?? (a.type === "rf_fan" ? "mdi:ceiling-fan" : "mdi:shape-outline")}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = c ? null : l}>${h}</span>
              <span class="etce-stag">${a.type === "rf_fan" ? "RF fan" : "Entity"}</span>
              <div class="etce-sctl">
                <button class="etce-act" @click=${() => this._chip = c ? null : l}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === 0} @click=${() => b(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === i.length - 1} @click=${() => b(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act del" @click=${() => o(i.filter((g, w) => w !== s))}><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>
              </div>
            </div>
            ${c ? d`<div class="etce-sedit">
                  ${this._selector("Entity", { entity: a.type === "rf_fan" ? { domain: "fan" } : {} }, a.entity, (g) => g && f("entity", g))}
                  <div class="etce-row">
                    <label class="lbl">Name</label>
                    <input type="text" .value=${a.name ?? ""} placeholder="Entity name" @change=${(g) => f("name", g.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, a.icon, (g) => f("icon", g || void 0))}
                  <div class="etce-checks">
                    ${this._check("Show name", a.show_name ?? !0, (g) => f("show_name", g, !0))}
                    ${this._check("Show state", a.show_state ?? !0, (g) => f("show_state", g, !0))}
                  </div>
                  ${a.type === "rf_fan" ? this._rfFanInfo(a) : u}
                  ${a.type === "rf_fan" ? this._selectRow(
        "Speed shows as",
        a.speed_format ?? "number",
        [["number", "Number (4)"], ["fraction", "Fraction (4/10)"], ["percent", "Percent (40%)"]],
        (g) => f("speed_format", g, "number")
      ) : u}
                  ${this._selectRow(
        "Tap",
        a.tap ?? (a.type === "rf_fan" ? "popup" : "more-info"),
        [["popup", "Open card in pop-up"], ["more-info", "More info"], ["toggle", "Toggle"], ["none", "Nothing"]],
        (g) => f("tap", g, a.type === "rf_fan" ? "popup" : "more-info")
      )}
                  ${this._selectRow(
        "Hold",
        a.hold ?? (a.type === "rf_fan" ? "toggle" : "none"),
        [["toggle", "Toggle"], ...a.type === "rf_fan" ? [["toggle_light", "Toggle light"]] : [], ["more-info", "More info"], ["none", "Nothing"]],
        (g) => f("hold", g, a.type === "rf_fan" ? "toggle" : "none")
      )}
                  ${(a.tap ?? (a.type === "rf_fan" ? "popup" : "more-info")) === "popup" ? d`${this._hint(
        a.type === "rf_fan" ? "Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan." : "Pop-up card config (any card)."
      )}
                      ${this._selector("", { object: {} }, a.popup_card, (g) => f("popup_card", g && Object.keys(g).length ? g : void 0))}` : u}
                </div>` : u}`;
    })}
      </div>
    `;
  }
  /** What was detected for this fan (read-only hint). */
  _rfFanInfo(t) {
    if (!this.hass?.states[t.entity]) return u;
    const e = Ht(this.hass, t, 0), i = [
      e.speedCount ? `${e.speedCount} speeds` : "speed count unknown",
      e.naturalLevels ? `Breeze ${e.naturalLevels} levels` : Array.isArray(this.hass.states[t.entity].attributes.preset_modes) ? "Breeze" : "",
      e.lightEntity ? `light ${e.lightEntity}` : "no light found"
    ].filter(Boolean);
    return this._hint(`Detected: ${i.join(" · ")}.`);
  }
  _firstRfFan() {
    const t = this.hass?.entities ?? {};
    return Object.values(t).find((e) => e.entity_id.startsWith("fan.") && e.platform === "esphome_rf_fan")?.entity_id;
  }
  // ---- button style (card default + per set — same property set) ---------------
  _buttonsBody() {
    const t = this._config, e = !!(t.frosted ?? t.background?.frosted), i = (n, a) => {
      let s = T(t, "background.frosted", void 0);
      if (s = T(s, "background.frost_blur", void 0), n === "frosted") {
        s = T(s, "frosted", a ? !0 : void 0);
        const l = t.frost_blur ?? t.background?.frost_blur;
        s = T(s, "frost_blur", a ? l : void 0);
      } else
        s = T(s, "frosted", !0), s = T(s, "frost_blur", a === E.frost_blur ? void 0 : a);
      this._emit(s);
    }, o = t.frost_blur ?? t.background?.frost_blur;
    return d`${this._hint("The look of every button. Each button set can override any of these under “Button style for this set”.")}
      ${this._buttonStyleEditor("buttons", !1)}
      ${this._group("Frosted glass")}
      ${this._check("Frosted glass controls", e, (n) => i("frosted", n))}
      ${this._hint("Buttons, menus, chips, toggles, setpoint pills and the wheel’s setpoint bubble turn see-through with a blur. Best over a moving background or an image.")}
      ${e ? this._sliderRow("Blur", o ?? E.frost_blur, 0, 40, 1, o !== void 0, (n) => i("frost_blur", n)) : u}`;
  }
  _buttonStyleEditor(t, e, i) {
    const o = (e ? this._sets()[i]?.style : this._config.buttons) ?? {}, n = e ? Ft(this._config.buttons, void 0) : qe, a = e ? "Card default" : "Built-in", s = (h, f) => {
      e ? this._patchSet(i, `style.${h}`, f) : this._put(`${t}.${h}`, f);
    }, l = (h, f, b) => {
      const g = String(n[h] ?? ""), w = b.find(([y]) => y === g)?.[1] ?? g;
      return this._selectRow(f, String(o[h] ?? ""), [["", `${a} (${w})`], ...b], (y) => s(h, y || void 0));
    }, c = (h, f, b, g, w, y = 1, k = 0) => {
      const m = Number(n[h] ?? k), _ = o[h];
      return this._sliderRow(f, _ ?? m, b, g, y, _ !== void 0, (S) => s(h, S), w);
    }, p = (h, f, b) => this._colorRow(`${t}.${h}`, f, o[h], e ? "Card default" : "Automatic", b, (g) => s(h, g));
    return d`
      ${this._group("Look", !0)}
      ${this._selectRow(
      "Look",
      String(o.look ?? ""),
      [
        ["", e ? `Card default (${this._config.buttons?.look === "chip" ? "Chip" : this._config.buttons?.look === "button" ? "Button" : i !== void 0 && this._sets()[i]?.type === "chips" ? "Chip" : "Button"})` : "Built-in (Chips for device sets, buttons for the rest)"],
        ["button", "Button"],
        ["chip", "Chip"]
      ],
      (h) => s("look", h || void 0)
    )}
      ${this._group("Size")}
      ${c("scale", "Scale", 50, 200, (h) => `${h}%`, 5, 100)}
      ${this._hint(e ? "Scales every button in this set. Card default comes from Button style." : "Scales every button in every set. Each set can override it under “Button style for this set”.")}
      ${this._group("Shape")}
      ${l("variant", "Style", [["tonal", "Tonal (tinted)"], ["filled", "Filled"], ["outlined", "Outlined"], ["ghost", "Ghost"]])}
      ${c("radius", "Corner radius", 0, 40)} ${c("height", "Min height", 0, 120)} ${c("min_width", "Min width", 0, 200)}
      ${c("gap", "Spacing", 0, 32)} ${c("border_width", "Border width", 0, 6)}
      ${this._group("Content")}
      ${l("content", "Show", [["icon_label", "Icon and label"], ["icon", "Icon only"], ["label", "Label only"]])}
      ${l("icon_position", "Icon", [["top", "Above label"], ["left", "Left of label"]])}
      ${c("icon_size", "Icon size", 10, 48)} ${c("font_size", "Text size", 8, 28)}
      ${c("icon_gap", "Icon to text spacing", 0, 30, void 0, 1, 4)}
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
    return d`${this._hint("Size, weight, color and case for each piece of text. Unset keeps the built-in look.")}
      ${Be.map((t) => this._sub(`text-${t}`, xo[t], () => this._textRole(t)))}`;
  }
  _textRole(t) {
    const e = `text.${t}`, i = this._get(e) ?? {};
    return d`
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
  _effectsBody() {
    const t = this._config, e = [["none", "Off"], ["glow", "Glow"], ["pulse", "Pulse"], ["both", "Glow + pulse"]], i = (o, n) => {
      let a = T(t, `effects.${o}`, n === "none" && o !== "card" ? void 0 : n);
      o === "card" && (a = T(a, "card.glow", void 0), n === "glow" && (a = T(a, "effects.card", void 0))), this._emit(a);
    };
    return d`
      ${this._hint("Make parts of the card glow or pulse in the heat colour while heating and the cool colour while cooling.")}
      ${this._group("Parts", !0)}
      ${Ye.map((o) => this._selectRow(co[o], We(t, o), e, (n) => i(o, n)))}
      ${this._group("When")}
      ${this._select(
      "effects.when",
      "Active",
      [["running", "Only while heating or cooling"], ["mode", "Whenever the mode is Heat or Cool"]],
      bt.when
    )}
      ${this._hint("“Only while heating or cooling” follows what the system is doing right now; the other also lights up while it waits at the setpoint.")}
      ${this._group("Look")}
      ${this._slider("effects.size", "Glow size", 2, 60, 1, bt.size)}
      ${this._slider("effects.speed", "Pulse speed", 0.6, 8, 0.2, bt.speed, (o) => `${o.toFixed(1)}s`)}
      ${this._color("effects.heat_color", "Heating colour", "Theme heat", "#ff8100")}
      ${this._color("effects.cool_color", "Cooling colour", "Theme cool", "#2b9af9")}
    `;
  }
  _backgroundBody() {
    const t = this._config, e = t.background ?? {}, i = e.fill ?? "color", o = e.style ?? "none", n = (l, c, p) => this._put(`background.${l}`, c, p), a = (l) => {
      let c = T(t, "card.background", void 0);
      c = T(c, "background.color", l), this._emit(c);
    }, s = (l) => `${l}%`;
    return d`
      ${this._hint("The card’s surface. A moving background follows what the thermostat is doing: heat rises, cold sinks, a fan swirls, idle barely drifts.")}
      ${this._group("Base", !0)}
      ${this._selectRow("Fill", i, [["color", "Colour"], ["gradient", "Gradient"], ["image", "Image"]], (l) => n("fill", l, "color"))}
      ${i === "color" ? this._colorRow("background.color", "Colour", e.color ?? t.card?.background, "Theme card", "#1c1c1c", a, { transparent: !0 }) : u}
      ${i === "gradient" ? this._gradientEditor() : u}
      ${i === "image" ? this._imageEditor() : u}

      ${this._group("Moving background")}
      ${this._selectRow("Style", o, ve.map(([l, c]) => [l, c]), (l) => n("style", l, "none"))}
      ${o !== "none" ? d`
            ${this._hint(ve.find(([l]) => l === o)?.[2] ?? "")}
            ${this._slider("background.strength", "Strength", 0, 100, 5, E.strength, s)}
            ${this._slider("background.speed", "Speed", 25, 300, 5, E.speed, s)}
            ${this._bool("background.follow_gap", "Follow the work", E.follow_gap)}
            ${this._hint("Moves faster and glows stronger the further the room is from the setpoint, and settles as it gets close.")}
            ${this._select("background.off", "When off", [["calm", "A calm, near-still background"], ["none", "No moving background"]], E.off)}
            ${this._selector("Sync to Air Movement", { entity: {} }, e.air_entity ?? e.fan_entity, (l) => {
      let c = T(t, "background.fan_entity", void 0);
      c = T(c, "background.air_entity", l || void 0), this._emit(c);
    })}
            ${this._hint("Optional. Any entity that says how much air is moving: a fan (%), speed levels, on/off, low / medium / high, or an airflow sensor. While it shows air moving, the background swirls at that speed. Without one, Fan Only mode uses the thermostat’s own fan speed.")}
            ${e.air_entity || e.fan_entity ? d`<div class="etce-row">
                    <label class="lbl">Full speed at</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Automatic"
                      .value=${e.air_max !== void 0 ? String(e.air_max) : ""}
                      @change=${(l) => {
      const c = l.target.value;
      n("air_max", c === "" ? void 0 : Number(c));
    }}
                    />
                  </div>
                  ${this._hint("For raw numbers only, e.g. 1200 for a 1200 CFM airflow sensor. Leave empty and percentages, number entities and speed names work on their own.")}` : u}
            ${this._sub("bg-colours", "Colours by state", () => this._bgColours())}
            ${this._select("background.quality", "Quality", [["smooth", "Smooth"], ["light", "Light (older tablets)"]], E.quality)}
          ` : u}

      ${this._group("Finish")}
      ${this._slider("background.scrim", "Lighten / darken", -60, 60, 5, 0, (l) => l > 0 ? `Darken ${l}%` : l < 0 ? `Lighten ${-l}%` : "None")}
      ${this._slider("background.vignette", "Vignette", 0, 100, 5, 0, s)}
      ${this._slider("background.grain", "Grain", 0, 100, 5, 0, s)}

    `;
  }
  _gradientEditor() {
    const t = this._config.background?.gradient ?? {}, e = t.stops?.length ? [...t.stops] : ["#1c2a3a", "#3a1c2a"], i = (o) => this._put("background.gradient.stops", o);
    return d`
      ${this._selectRow("Type", t.type ?? "linear", [["linear", "Linear"], ["radial", "Radial"]], (o) => this._put("background.gradient.type", o, "linear"))}
      ${(t.type ?? "linear") === "linear" ? this._slider("background.gradient.angle", "Angle", 0, 360, 5, 135, (o) => `${o}°`) : u}
      ${e.map(
      (o, n) => d`${this._colorRow(`bg-stop-${n}`, `Colour ${n + 1}`, o, "Card colour", "#1c2a3a", (a) => {
        const s = [...e];
        s[n] = a ?? "var(--card-background-color)", i(s);
      })}
          ${e.length > 2 ? d`<div class="etce-row"><button class="etce-act del" title="Remove colour" @click=${() => i(e.filter((a, s) => s !== n))}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon></button></div>` : u}`
    )}
      ${e.length < 4 ? d`<div class="etce-addbar"><button class="etce-add" @click=${() => i([...e, "#000000"])}>+ Colour</button></div>` : u}
    `;
  }
  _imageEditor() {
    const t = this._config.background?.image ?? {};
    return d`
      <div class="etce-row">
        <label class="lbl">Image</label>
        <input
          type="text"
          .value=${t.url ?? ""}
          placeholder="/local/backgrounds/living-room.jpg"
          @change=${(e) => this._put("background.image.url", e.target.value.trim() || void 0)}
        />
      </div>
      ${this._hint("A URL, or a file in your config’s www folder as /local/…")}
      ${this._selectRow("Fit", t.fit ?? "cover", [["cover", "Fill (crop)"], ["contain", "Fit (whole image)"], ["tile", "Tile"]], (e) => this._put("background.image.fit", e, "cover"))}
      ${this._slider("background.image.blur", "Blur", 0, 40, 1, 0)}
      ${this._slider("background.image.darken", "Darken", 0, 90, 5, 0, (e) => `${e}%`)}
    `;
  }
  _bgColours() {
    const t = this._config.background?.colors ?? {};
    return d`${this._hint("Two colours per state. Unset follows your theme’s heat, cool and fan colours.")}
      ${Fi.map(
      ([e, i]) => d`<div class="etce-group">${i}</div>
          ${this._colorRow(
        `bg-${e}-main`,
        "Main",
        t[e]?.main,
        "Automatic",
        /^#/.test(mt[e].main) ? mt[e].main : e.includes("cool") ? "#2b9af9" : e === "fan" ? "#00bfa5" : "#ff8100",
        (o) => this._put(`background.colors.${e}.main`, o)
      )}
          ${this._colorRow(`bg-${e}-second`, "Second", t[e]?.second, "Automatic", mt[e].second, (o) => this._put(`background.colors.${e}.second`, o))}`
    )}`;
  }
  _cardBody() {
    return d`
      ${this._hint("The card’s border, corners and padding. Its fill and moving background are under Background.")}
      ${this._color("card.border_color", "Border", "Theme", "#444444")}
      ${this._slider("card.border_width", "Border width", 0, 8, 1, 1)}
      ${this._slider("card.radius", "Corner radius", 0, 48, 1, 16)}
      ${this._slider("card.padding", "Padding", 0, 40, 1, 16)}
    `;
  }
};
te.styles = [
  Ee(Zi),
  qt`
      :host { display: block; }
    `
];
let j = te;
lt([
  Xt({ attribute: !1 })
], j.prototype, "hass");
lt([
  P()
], j.prototype, "_config");
lt([
  P()
], j.prototype, "_open");
lt([
  P()
], j.prototype, "_set");
lt([
  P()
], j.prototype, "_chip");
customElements.get(Pt) || customElements.define(Pt, j);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = { ATTRIBUTE: 1 }, Ze = (r) => (...t) => ({ _$litDirective$: r, values: t });
let Je = class {
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
const Qe = "important", So = " !" + Qe, x = Ze(class extends Je {
  constructor(r) {
    if (super(r), r.type !== Ke.ATTRIBUTE || r.name !== "style" || r.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return Object.keys(r).reduce((t, e) => {
      const i = r[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(r, [t]) {
    const { style: e } = r.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const o = t[i];
      if (o != null) {
        this.ft.add(i);
        const n = typeof o == "string" && o.endsWith(So);
        i.includes("-") || n ? e.setProperty(i, n ? o.slice(0, -11) : o, n ? Qe : "") : e[i] = o;
      }
    }
    return I;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = Ze(class extends Je {
  constructor(r) {
    if (super(r), r.type !== Ke.ATTRIBUTE || r.name !== "class" || r.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return " " + Object.keys(r).filter((t) => r[t]).join(" ") + " ";
  }
  update(r, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), r.strings !== void 0 && (this.nt = new Set(r.strings.join(" ").split(/\s/).filter((i) => i !== "")));
      for (const i in t) t[i] && !this.nt?.has(i) && this.st.add(i);
      return this.render(t);
    }
    const e = r.element.classList;
    for (const i of this.st) i in t || (e.remove(i), this.st.delete(i));
    for (const i in t) {
      const o = !!t[i];
      o === this.st.has(i) || this.nt?.has(i) || (o ? (e.add(i), this.st.add(i)) : (e.remove(i), this.st.delete(i)));
    }
    return I;
  }
}), Ao = 1, zo = 0.5, To = 3, Co = 1.5;
function Eo(r) {
  return r.includes("C") ? zo : Ao;
}
function Mo(r, t) {
  return t.setpoint?.min_gap ?? (r.includes("C") ? Co : To);
}
function ti(r) {
  return Math.round(r * 100) / 100;
}
function V(r, t, e, i) {
  let o = i > 0 ? ti(Math.round(r / i) * i) : r;
  return t !== null && o < t && (o = t), e !== null && o > e && (o = e), o;
}
function ut(r, t, e, i, o) {
  return { setpoint: r, value: V(t, e, i, o), min: e, max: i, step: o };
}
function Mt(r, t, e) {
  return { available: !1, unit: r, mode: t, heat: null, cool: null, active: e, minGap: 0 };
}
function Ro(r, t) {
  const e = r.config?.unit_system?.temperature ?? "°", i = r.states[t.entity], o = i ? Ue(i.state) : "unknown";
  if (!i || o !== "heat" && o !== "cool" && o !== "heat_cool")
    return Mt(e, o, "heat");
  const n = i.attributes, a = Eo(e), s = Mo(e, t), l = z(n.min_temp), c = z(n.max_temp);
  if (o === "heat_cool") {
    const h = z(n.target_temp_low), f = z(n.target_temp_high);
    if (h === null && f === null) return Mt(e, o, "cool");
    const b = h !== null ? ut("heat", h, l, c, a) : null, g = f !== null ? ut("cool", f, l, c, a) : null;
    return { available: !0, unit: e, mode: o, heat: b, cool: g, active: g ? "cool" : "heat", minGap: s };
  }
  const p = z(n.temperature);
  return p === null ? Mt(e, o, o === "heat" ? "heat" : "cool") : o === "heat" ? {
    available: !0,
    unit: e,
    mode: o,
    heat: ut("heat", p, l, c, a),
    cool: null,
    active: "heat",
    minGap: s
  } : {
    available: !0,
    unit: e,
    mode: o,
    heat: null,
    cool: ut("cool", p, l, c, a),
    active: "cool",
    minGap: s
  };
}
function Ct(r) {
  return r[r.active];
}
function Qt(r, t) {
  const e = Ct(r);
  if (!e) return r;
  const i = r.mode === "heat_cool" ? r[e.setpoint === "cool" ? "heat" : "cool"] : null;
  if (!i) {
    const s = { ...e, value: V(t, e.min, e.max, e.step) };
    return { ...r, [e.setpoint]: s };
  }
  const o = r.minGap;
  let n = V(t, e.min, e.max, e.step), a = i.value;
  if (e.setpoint === "cool") {
    if (n - i.value < o) {
      let s = n - o;
      i.min !== null && s < i.min && (s = i.min, n = V(i.min + o, e.min, e.max, e.step)), a = V(s, i.min, i.max, i.step);
    }
  } else if (i.value - n < o) {
    let s = n + o;
    i.max !== null && s > i.max && (s = i.max, n = V(i.max - o, e.min, e.max, e.step)), a = V(s, i.min, i.max, i.step);
  }
  return {
    ...r,
    [e.setpoint]: { ...e, value: n },
    [i.setpoint]: { ...i, value: a }
  };
}
function X(r, t) {
  const e = Ct(r);
  return e ? Qt(r, e.value + t * e.step) : r;
}
function Te(r, t) {
  return Ct(r) ? Qt(r, t) : r;
}
function Po(r, t, e, i) {
  const o = Ct(r);
  if (!o) return r;
  const n = Math.round(e / i);
  return Qt(r, t + n * o.step);
}
function tt(r, t) {
  return r[t] === null ? r : { ...r, active: t };
}
function Oo(r, t) {
  const e = [];
  for (let i = -t; i <= t; i++) {
    const o = ti(r.value + i * r.step);
    r.min !== null && o < r.min || r.max !== null && o > r.max || e.push(o);
  }
  return e;
}
function Lo(r, t) {
  if (!r.available) return null;
  const e = { entity_id: t };
  if (r.mode === "heat_cool")
    r.heat && (e.target_temp_low = r.heat.value), r.cool && (e.target_temp_high = r.cool.value);
  else {
    const i = r.heat ?? r.cool;
    if (!i) return null;
    e.temperature = i.value;
  }
  return { domain: "climate", service: "set_temperature", data: e };
}
const Bo = 600, No = 8e3;
function Fo(r, t) {
  return r.heat?.value === t.heat?.value && r.cool?.value === t.cool?.value;
}
class Ho {
  constructor(t, e, i) {
    this.entityId = t, this.send = e, this.changed = i, this.edit = null, this.dragging = !1, this.pending = null, this.writeTimer = null, this.reconcileTimer = null, this.latest = null;
  }
  /** Feed the model derived from the latest hass. */
  sync(t) {
    if (this.latest = t, this.dragging || this.pending && t.mode === this.pending.mode && !Fo(t, this.pending))
      return;
    const e = this.edit && t[this.edit.active] ? this.edit.active : t.active;
    this.edit = { ...t, active: e }, this.pending = null, this.clearReconcile();
  }
  /** Live preview without scheduling a write (used during a drag). */
  preview(t) {
    this.edit = t, this.changed();
  }
  commit(t) {
    this.edit = t, this.pending = t, this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = setTimeout(() => this.flush(), Bo), this.changed();
  }
  /** Change only which setpoint is edited (no write). */
  select(t) {
    this.edit = t, this.pending && (this.pending = { ...this.pending, active: t.active }), this.changed();
  }
  flush() {
    this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = null;
    const t = this.edit ? Lo(this.edit, this.entityId()) : null;
    t && this.send(t), this.clearReconcile(), this.reconcileTimer = setTimeout(() => {
      if (this.reconcileTimer = null, this.pending = null, this.latest) {
        const e = this.edit?.active;
        this.edit = { ...this.latest, active: e && this.latest[e] ? e : this.latest.active }, this.changed();
      }
    }, No);
  }
  /** On disconnect: send anything still queued, drop timers. */
  dispose() {
    this.writeTimer && this.flush(), this.clearReconcile(), this.pending = null;
  }
  clearReconcile() {
    this.reconcileTimer && clearTimeout(this.reconcileTimer), this.reconcileTimer = null;
  }
}
function Rt(r, t) {
  const e = r.heat ?? r.cool, i = r.unit.includes("C");
  let o = t?.range_min ?? e?.min ?? (i ? 10 : 50), n = t?.range_max ?? e?.max ?? (i ? 32 : 90);
  n > o || (n = o + (i ? 10 : 20));
  for (const a of [r.heat, r.cool])
    a && (o = Math.min(o, a.value), n = Math.max(n, a.value));
  return { min: o, max: n };
}
function St(r, t) {
  return Math.min(1, Math.max(0, (r - t.min) / (t.max - t.min)));
}
function Uo(r, t) {
  return t.min + Math.min(1, Math.max(0, r)) * (t.max - t.min);
}
function Do(r, t, e) {
  const i = t > 0 ? t : e > 0 ? e : 0;
  if (i <= 0) return [];
  const o = [], n = Math.ceil(r.min / i) * i;
  if ((r.max - n) / i > 200) return [];
  for (let a = n; a <= r.max + 1e-9; a = Math.round((a + i) * 1e3) / 1e3) {
    const s = e > 0 && Math.abs(a / e - Math.round(a / e)) < 1e-6;
    o.push({ value: a, fraction: St(a, r), label: s });
  }
  return o;
}
function Io(r, t, e) {
  if (!r.heat) return "cool";
  if (!r.cool) return "heat";
  const i = Math.abs(St(r.heat.value, e) - t), o = Math.abs(St(r.cool.value, e) - t);
  return Math.abs(i - o) < 1e-6 ? r.active : i < o ? "heat" : "cool";
}
const jo = qt`
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
    gap: 0;
  }
  /* Keep the main area centred: both side columns as wide as the wider side
     (--side-w is measured), so the temperature stays on the card's centre. */
  .grid.centered.has-sides {
    grid-template-columns: minmax(0, var(--side-w, auto)) minmax(min-content, 1fr) minmax(0, var(--side-w, auto));
  }
  /* Too narrow to balance both sides without overlap: the plain layout. */
  .grid.centered.has-sides.no-center { grid-template-columns: auto minmax(0, 1fr) auto; }
  .grid.centered .zone.left { justify-content: flex-end; }
  .grid.centered .zone.right { justify-content: flex-start; }
  .zone {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }
  /* Distance from the main area: per side, else the card default. */
  .zone.top { grid-area: top; margin-bottom: var(--zg-top, var(--zg, 12px)); }
  .zone.bottom { grid-area: bottom; margin-top: var(--zg-bottom, var(--zg, 12px)); }
  .zone.left { grid-area: left; flex-direction: row; align-items: center; margin-right: var(--zg-left, var(--zg, 12px)); }
  .zone.right { grid-area: right; flex-direction: row; align-items: center; margin-left: var(--zg-right, var(--zg, 12px)); }
  /* Sets sharing one row. */
  .row-group { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: calc(var(--etc-b-gap, 8px)); min-width: 0; }
  .zone.left .row-group, .zone.right .row-group { flex-direction: column; flex-wrap: nowrap; }
  .row-group > .set { flex: 1 1 auto; }
  .row-group > .set.a-center, .row-group > .set.a-start, .row-group > .set.a-end { flex: 0 1 auto; }
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
    font-size: var(--etc-t-cur-fs, 72px);
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

  /* ---- test mode badge (editing only) ---- */
  .test-badge {
    position: absolute;
    top: 6px;
    right: 8px;
    z-index: 3;
    padding: 1px 8px;
    border-radius: 999px;
    background: var(--warning-color, #ffb300);
    color: #000;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    pointer-events: none;
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
  /* − / + placement: left, right, both above, both below, above & below, either side */
  :is(.wheel, .stepper).nud-above, :is(.wheel, .stepper).nud-below, :is(.wheel, .stepper).nud-stacked { flex-direction: column; }
  .nudges.row { flex-direction: row; }
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
  /* --etc-b-k: the set's Scale (Button style → Scale), 1 = 100 %. */
  .set, .menus, .menu { --etc-b-k: var(--etc-b-scale, 1); }
  .set { min-width: 0; gap: calc(var(--etc-b-gap, 8px) * var(--etc-b-k, 1)); }
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
    text-align: center;
    gap: calc(var(--etc-b-igap, 4px) * var(--etc-b-k, 1));
    min-width: calc(var(--etc-b-minw, 52px) * var(--etc-b-k, 1));
    min-height: calc(var(--etc-b-height, 0px) * var(--etc-b-k, 1));
    padding: calc(8px * var(--etc-b-k, 1)) calc(10px * var(--etc-b-k, 1));
    border-radius: calc(var(--etc-b-radius, 14px) * var(--etc-b-k, 1));
    border: var(--etc-b-bw, 0px) solid var(--etc-b-bc, transparent);
    background: var(--etc-b-bg, var(--etc-surface));
    color: var(--etc-b-fg, var(--etc-muted));
    font: inherit;
    font-size: calc(var(--etc-b-fs, 13px) * var(--etc-b-k, 1));
    font-weight: var(--etc-b-fw, 500);
    cursor: pointer;
    transition: background 160ms ease, color 160ms ease, border-color 160ms ease, transform 80ms ease;
    --mdc-icon-size: calc(var(--etc-b-icon, 22px) * var(--etc-b-k, 1));
    box-sizing: border-box;
    min-inline-size: 0;
    -webkit-tap-highlight-color: transparent;
  }
  .btn:active { transform: scale(0.97); }
  .btn:hover { color: var(--etc-b-fg, var(--etc-fg)); }
  .ip-left .btn { flex-direction: row; gap: calc(var(--etc-b-igap, 5px) * var(--etc-b-k, 1)); padding: calc(6px * var(--etc-b-k, 1)) calc(8px * var(--etc-b-k, 1)); }
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
  .menus { display: flex; flex-wrap: wrap; gap: calc(var(--etc-b-gap, 8px) * var(--etc-b-k, 1)); justify-content: center; }
  .menus.z-left, .menus.z-right { flex-direction: column; }
  .menu { position: relative; }
  .mt {
    --c: var(--primary-color, #03a9f4);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--etc-b-igap, 12px) * var(--etc-b-k, 1));
    min-width: calc(var(--etc-b-minw, 120px) * var(--etc-b-k, 1));
    min-height: calc(var(--etc-b-height, 0px) * var(--etc-b-k, 1));
    padding: calc(10px * var(--etc-b-k, 1)) calc(16px * var(--etc-b-k, 1));
    border-radius: calc(var(--etc-b-radius, 14px) * var(--etc-b-k, 1));
    border: var(--etc-b-bw, 0px) solid var(--etc-b-bc, transparent);
    background: var(--etc-b-bg, var(--etc-surface));
    color: var(--etc-b-fg, var(--etc-fg));
    font: inherit;
    text-align: left;
    cursor: pointer;
    --mdc-icon-size: calc(var(--etc-b-icon, 22px) * var(--etc-b-k, 1));
    -webkit-tap-highlight-color: transparent;
  }
  .v-outlined .mt { background: var(--etc-b-bg, transparent); border: max(var(--etc-b-bw, 1px), 1px) solid var(--etc-b-bc, color-mix(in srgb, var(--divider-color, #555) 70%, transparent)); }
  .v-ghost .mt { background: var(--etc-b-bg, transparent); }
  .mt.has-active > ha-icon { color: var(--etc-b-afg, var(--c)); }
  .menu.open .mt, .mt[aria-expanded='true'] { border-color: var(--etc-b-abc, color-mix(in srgb, var(--c) 50%, transparent)); }
  .mt-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.2; }
  .mt-name { font-size: calc(12px * var(--etc-b-k, 1)); color: var(--etc-muted); }
  .mt-value { font-size: calc((var(--etc-b-fs, 13px) + 3px) * var(--etc-b-k, 1)); font-weight: var(--etc-b-fw, 500); white-space: nowrap; }
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
    gap: calc(var(--etc-b-igap, 14px) * var(--etc-b-k, 1));
    padding: calc(10px * var(--etc-b-k, 1)) calc(16px * var(--etc-b-k, 1)) calc(10px * var(--etc-b-k, 1)) calc(12px * var(--etc-b-k, 1));
    border: none;
    border-radius: calc((var(--etc-b-radius, 14px) - 6px) * var(--etc-b-k, 1));
    background: transparent;
    color: var(--etc-b-fg, var(--etc-fg));
    font: inherit;
    font-size: calc((var(--etc-b-fs, 13px) + 3px) * var(--etc-b-k, 1));
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    --mdc-icon-size: calc(var(--etc-b-icon, 22px) * var(--etc-b-k, 1));
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
    justify-content: center;
    gap: calc(var(--etc-b-igap, 6px) * var(--etc-b-k, 1));
    padding: calc(6px * var(--etc-b-k, 1)) calc(11px * var(--etc-b-k, 1));
    border-radius: 999px;
    border: 1px solid var(--etc-b-bc, var(--divider-color, #444));
    background: var(--etc-b-bg, transparent);
    color: var(--etc-b-fg, var(--etc-muted));
    font: inherit;
    font-size: calc(var(--etc-b-fs, 13px) * var(--etc-b-k, 1));
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    --mdc-icon-size: calc(var(--etc-b-icon, 22px) * var(--etc-b-k, 1));
  }
  .chip.on { color: var(--etc-b-afg, var(--c)); border-color: var(--etc-b-abc, color-mix(in srgb, var(--c) 55%, transparent)); background: var(--etc-b-abg, color-mix(in srgb, var(--c) 12%, transparent)); }
:is(.chip, .dev).unavailable { opacity: 0.45; }
  :is(.chip, .dev) .spin { animation: etc-spin var(--spin, 1.5s) linear infinite; }
  :is(.chip, .dev).rev .spin { animation-direction: reverse; }
  :is(.chip, .dev) .badge { font-weight: 700; font-variant-numeric: tabular-nums; }
  .dev .dev-row { display: inline-flex; align-items: center; gap: 4px; }
  :is(.chip, .dev) .badge.natural { display: inline-flex; align-items: center; gap: 1px; color: #7ccf8a; --mdc-icon-size: 15px; }
  :is(.chip, .dev) .extra { display: inline-flex; align-items: center; gap: 2px; --mdc-icon-size: 14px; opacity: 0.85; font-size: 11px; }
  :is(.chip, .dev) .extra.light { color: #ffc107; }
  @keyframes etc-spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { :is(.chip, .dev) .spin { animation: none; } }

  /* ---- Look: Chip for any set (mode, preset, fan buttons and menu buttons) ---- */
  .look-chip .btn, .look-chip .mt {
    flex-direction: row;
    border-radius: 999px;
    border: max(var(--etc-b-bw, 1px), 1px) solid var(--etc-b-bc, var(--divider-color, #444));
    padding: calc(6px * var(--etc-b-k, 1)) calc(12px * var(--etc-b-k, 1));
    gap: calc(var(--etc-b-igap, 6px) * var(--etc-b-k, 1));
    min-width: 0;
    min-height: 0;
  }
  .look-chip.v-tonal .btn:not(.active), .look-chip.v-tonal .mt { background: var(--etc-b-bg, transparent); }
  .look-chip .btn.active { border-color: var(--etc-b-abc, color-mix(in srgb, var(--c) 55%, transparent)); }
  .set.look-chip.grid { display: flex; flex-wrap: wrap; justify-content: center; }

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
`, qo = Array.from({ length: 14 }, (r, t) => ({
  x: (t * 37 + 11) % 92 + 4,
  y: (t * 53 + 7) % 86 + 6,
  d: 3 + t * 7 % 5,
  dl: -(t * 1.3 % 5)
}));
function ft(r, t, e) {
  return d`<div class="lay">
    ${je(r.style, t).map(
    (i) => d`<i
          class="col"
          style=${x({ "--x": `${i.x}%`, "--sz": `${i.s}${e}`, "--d": `${i.d}s`, "--dl": `${i.dl}s` })}
          ><b></b
        ></i>`
  )}
  </div>`;
}
function Vo(r, t) {
  switch (r.style) {
    case "plasma":
      return ft(r, t, "%");
    case "lava":
      return d`<svg class="defs" width="0" height="0" aria-hidden="true">
          <filter id="etc-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </svg>
        ${ft(r, t, "%")}`;
    case "shimmer":
      return d`${ft(r, t, "%")}
        <div class="spark">
          ${qo.map(
        (e) => d`<i style=${x({ left: `${e.x}%`, top: `${e.y}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s` })}></i>`
      )}
        </div>`;
    case "particles":
      return ft(r, t, "px");
    case "aurora":
      return d`${je("aurora", t).map(
        (e) => d`<i
            class="rib"
            style=${x({ "--y": `${e.y}%`, "--h": `${e.s}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s` })}
          ></i>`
      )}`;
    case "flow":
      return d`<i class="band b1"></i><i class="band b2"></i>`;
    case "core":
      return d`<i class="c1"></i><i class="c2"></i>`;
    case "mesh":
      return d`<div class="lay">
        <i class="m m1"><b></b></i><i class="m m2"><b></b></i><i class="m m3"><b></b></i><i class="m m4"><b></b></i>
      </div>`;
    case "beam":
      return d`<div class="beam"><i class="r1"></i><i class="r2"></i><i class="r3"></i></div>`;
  }
}
function Yo(r, t) {
  const e = r.background ?? {}, i = e.quality ?? E.quality, o = e.fill === "image" && e.image?.url ? d`<div class="bg-base" aria-hidden="true">
          <div class="bg-img fit-${e.image.fit ?? "cover"}"></div>
          ${e.image.darken ? d`<div class="bg-dark"></div>` : u}
        </div>` : u, n = t ? d`<div class="bg s-${t.style} st-${t.state} dir-${t.dir} q-${i}" aria-hidden="true">
        ${Vo(t, i)}${t.blades ? d`<i class="blades"></i>` : u}
      </div>` : u, a = e.scrim || e.vignette || e.grain ? d`<div class="bg-finish" aria-hidden="true">
          ${e.scrim ? d`<i class="scrim"></i>` : u} ${e.vignette ? d`<i class="vig"></i>` : u}
          ${e.grain ? d`<i class="grain"></i>` : u}
        </div>` : u;
  return d`${o}${n}${a}`;
}
const Wo = globalThis.CSS;
for (const [r, t, e] of [
  ["--etc-bg-a", "<color>", "transparent"],
  ["--etc-bg-b", "<color>", "transparent"],
  ["--etc-bg-op", "<number>", "1"]
])
  try {
    Wo?.registerProperty?.({ name: r, syntax: t, inherits: !0, initialValue: e });
  } catch {
  }
const Go = qt`
  ha-card {
    transition:
      box-shadow 600ms ease,
      --etc-bg-a 1.5s ease,
      --etc-bg-b 1.5s ease,
      --etc-bg-op 1.5s ease;
  }
  .grid { position: relative; z-index: 1; }
  .bg-base, .bg, .bg-finish {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .bg { opacity: var(--etc-bg-op, 1); }
  .bg i, .bg b, .bg .lay, .bg .beam, .bg .spark, .bg-finish i { position: absolute; display: block; }
  .bg .defs { position: absolute; width: 0; height: 0; }
  ha-card.bg-paused .bg, ha-card.bg-paused .bg * { animation-play-state: paused !important; }

  /* ---- base image ---- */
  .bg-img {
    position: absolute;
    inset: calc(var(--bg-img-blur, 0px) * -2);
    background-image: var(--bg-img);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(var(--bg-img-blur, 0px));
  }
  .bg-img.fit-contain { background-size: contain; }
  .bg-img.fit-tile { background-size: auto; background-repeat: repeat; }
  .bg-dark { position: absolute; inset: 0; background: #000; opacity: var(--bg-img-dark, 0); }

  /* ---- finish ---- */
  .bg-finish .scrim { inset: 0; background: var(--bg-scrim-c, #000); opacity: var(--bg-scrim, 0); }
  .bg-finish .vig { inset: 0; background: radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(0, 0, 0, 0.85) 100%); opacity: var(--bg-vig, 0); }
  .bg-finish .grain {
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: var(--bg-grain, 0);
    mix-blend-mode: overlay;
  }

  /* ---- shared motion ---- */
  @keyframes bg-rise { from { transform: translateY(var(--travel, 80%)); } to { transform: translateY(calc(var(--travel, 80%) * -1)); } }
  @keyframes bg-fall { from { transform: translateY(calc(var(--travel, 80%) * -1)); } to { transform: translateY(var(--travel, 80%)); } }
  @keyframes bg-spin { to { transform: rotate(360deg); } }
  @keyframes bg-bob { from { transform: translate(-3%, 3%); } to { transform: translate(3%, -3%); } }

  /* Columns: a full-card wrapper that travels; the blob inside sits at --x. */
  .bg .lay { inset: 0; }
  .bg .col {
    inset: 0;
    animation-duration: calc(var(--d, 20s) / var(--bg-rate, 1));
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .bg .col > b { left: var(--x); top: 50%; width: var(--sz); aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; }
  .bg.dir-up .col { animation-name: bg-rise; }
  .bg.dir-down .col { animation-name: bg-fall; }
  .bg.dir-swirl .col { animation-name: bg-spin; animation-duration: calc(var(--d, 20s) * 0.45 / var(--bg-rate, 1)); }
  .bg.dir-still .col { animation-name: bg-bob; animation-timing-function: ease-in-out; animation-direction: alternate; }

  /* ---- Liquid Plasma ---- */
  .s-plasma { --travel: 115%; }
  .s-plasma .lay { filter: blur(calc(30px * var(--bg-blur-k, 1))); }
  .s-plasma .col > b {
    background: radial-gradient(circle at 40% 40%, var(--etc-bg-a), color-mix(in srgb, var(--etc-bg-b) 80%, transparent) 55%, transparent 70%);
    mix-blend-mode: screen;
  }
  .s-plasma::before, .s-particles::before, .s-shimmer::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 115%, color-mix(in srgb, var(--etc-bg-b) 45%, transparent), transparent 70%);
  }
  .bg.dir-down.s-plasma::before, .bg.dir-down.s-particles::before, .bg.dir-down.s-shimmer::before {
    background: radial-gradient(ellipse at 50% -15%, color-mix(in srgb, var(--etc-bg-b) 45%, transparent), transparent 70%);
  }

  /* ---- Lava Lamp (SVG goo: blobs merge and split) ---- */
  .s-lava { --travel: 95%; }
  .s-lava .lay { filter: url(#etc-goo); }
  .s-lava .col > b {
    background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--etc-bg-a) 65%, #fff), var(--etc-bg-a) 40%, var(--etc-bg-b));
    animation: bg-squish calc(var(--d, 20s) * 0.3 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  @keyframes bg-squish { from { transform: translate(-50%, -50%) scale(1, 1); } to { transform: translate(-50%, -50%) scale(0.86, 1.16); } }
  .s-lava .lay::after {
    content: '';
    position: absolute;
    left: -10%;
    right: -10%;
    bottom: -16%;
    height: 28%;
    border-radius: 50%;
    background: linear-gradient(var(--etc-bg-a), var(--etc-bg-b));
  }
  .bg.dir-down.s-lava .lay::after { bottom: auto; top: -16%; }
  .bg.dir-swirl.s-lava .lay::after, .bg.dir-still.s-lava .lay::after { height: 18%; }

  /* ---- Aurora ---- */
  .s-aurora .rib {
    left: -50%;
    width: 200%;
    top: var(--y);
    height: var(--h, 34%);
    border-radius: 50%;
    background: linear-gradient(90deg, transparent 5%, var(--etc-bg-a) 30%, var(--etc-bg-b) 50%, var(--etc-bg-a) 70%, transparent 95%);
    filter: blur(calc(28px * var(--bg-blur-k, 1)));
    opacity: 0.85;
    mix-blend-mode: screen;
    animation: bg-aur-up calc(var(--d, 18s) / var(--bg-rate, 1)) ease-in-out infinite alternate;
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
  }
  .bg.dir-down.s-aurora .rib { animation-name: bg-aur-down; }
  .bg.dir-still.s-aurora .rib { animation-name: bg-aur-still; }
  .bg.dir-swirl.s-aurora .rib {
    top: calc(50% - var(--h, 34%) / 2);
    animation: bg-spin calc(var(--d, 18s) * 0.6 / var(--bg-rate, 1)) linear infinite;
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
  }
  @keyframes bg-aur-up { from { transform: translate(-14%, 60%) rotate(-4deg) scaleY(0.8); } to { transform: translate(14%, -60%) rotate(-12deg) scaleY(1.2); } }
  @keyframes bg-aur-down { from { transform: translate(-14%, -60%) rotate(4deg) scaleY(0.8); } to { transform: translate(14%, 60%) rotate(12deg) scaleY(1.2); } }
  @keyframes bg-aur-still { from { transform: translateX(-6%); } to { transform: translateX(6%); } }

  /* ---- Thermal Flow ---- */
  .s-flow .band {
    left: -15%;
    right: -15%;
    top: -100%;
    height: 300%;
    background: linear-gradient(to top, transparent 0%, var(--etc-bg-a) 22%, var(--etc-bg-b) 40%, transparent 62%, transparent 100%);
    background-size: 100% 33.333%;
    filter: blur(calc(26px * var(--bg-blur-k, 1)));
    animation: bg-flow-up calc(14s / var(--bg-rate, 1)) linear infinite;
  }
  .s-flow .b2 { opacity: 0.5; animation-duration: calc(23s / var(--bg-rate, 1)); animation-delay: calc(-7s / var(--bg-rate, 1)); }
  .bg.dir-down.s-flow .band { animation-name: bg-flow-down; }
  .bg.dir-swirl.s-flow .band { animation-name: bg-spin; }
  .bg.dir-still.s-flow .band { animation-duration: calc(60s / var(--bg-rate, 1)); }
  @keyframes bg-flow-up { from { transform: translateY(0); } to { transform: translateY(-33.333%); } }
  @keyframes bg-flow-down { from { transform: translateY(-33.333%); } to { transform: translateY(0); } }

  /* ---- Heat Shimmer / Frost ---- */
  .s-shimmer { --travel: 75%; }
  .s-shimmer .lay, .s-particles .lay {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 22%, #000 72%, transparent);
    mask-image: linear-gradient(to top, transparent, #000 22%, #000 72%, transparent);
  }
  .s-shimmer .col > b {
    height: calc(var(--sz) * 0.35);
    aspect-ratio: auto;
    background: radial-gradient(ellipse, color-mix(in srgb, var(--etc-bg-a) 85%, transparent), transparent 70%);
    filter: blur(calc(14px * var(--bg-blur-k, 1)));
    animation: bg-waver calc(var(--d, 12s) * 0.37 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .bg.dir-down.s-shimmer .col > b { background: radial-gradient(ellipse, color-mix(in srgb, var(--etc-bg-a) 55%, #fff 15%), transparent 70%); }
  @keyframes bg-waver { from { transform: translate(-50%, -50%) scaleX(0.85) skewX(-8deg); } to { transform: translate(-50%, -50%) scaleX(1.15) skewX(8deg); } }
  .s-shimmer .spark { inset: 0; display: none; }
  .bg.dir-down.s-shimmer .spark { display: block; }
  .s-shimmer .spark i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 6px var(--etc-bg-a);
    opacity: 0;
    animation: bg-twinkle calc(var(--d, 4s) / var(--bg-rate, 1)) ease-in-out infinite;
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
  }
  @keyframes bg-twinkle { 0%, 100% { opacity: 0; transform: scale(0.6); } 50% { opacity: 0.9; transform: scale(1.2); } }

  /* ---- Embers / Snow ---- */
  .s-particles { --travel: 58%; }
  .s-particles .col > b {
    background: radial-gradient(circle, color-mix(in srgb, var(--etc-bg-a) 40%, #fff) 0%, var(--etc-bg-a) 45%, transparent 70%);
    animation: bg-sway calc(var(--d, 14s) * 0.3 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .bg.dir-down.s-particles .col > b { background: radial-gradient(circle, #fff 0%, color-mix(in srgb, var(--etc-bg-a) 50%, #fff) 50%, transparent 72%); }
  @keyframes bg-sway { from { transform: translate(-50%, -50%) translateX(-14px); } to { transform: translate(-50%, -50%) translateX(14px); } }

  /* ---- Breathing Core ---- */
  .s-core .c1, .s-core .c2 { inset: -25%; }
  .s-core .c1 {
    background: radial-gradient(circle at 50% 45%, var(--etc-bg-a) 0%, color-mix(in srgb, var(--etc-bg-b) 70%, transparent) 28%, transparent 55%);
    filter: blur(calc(20px * var(--bg-blur-k, 1)));
    animation: bg-breathe calc(7s / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .s-core .c2 {
    background: radial-gradient(circle at 50% 45%, transparent 30%, color-mix(in srgb, var(--etc-bg-a) 35%, transparent) 38%, transparent 48%);
    filter: blur(calc(14px * var(--bg-blur-k, 1)));
    animation: bg-breathe calc(7s / var(--bg-rate, 1)) ease-in-out infinite alternate-reverse;
  }
  .bg.dir-up.s-core .c1 { animation-name: bg-breathe-up; }
  .bg.dir-down.s-core .c1 { animation-name: bg-breathe-down; }
  .bg.dir-swirl.s-core .c2 {
    background: repeating-conic-gradient(from 0deg at 50% 45%, color-mix(in srgb, var(--etc-bg-a) 45%, transparent) 0deg 30deg, transparent 30deg 90deg);
    -webkit-mask-image: radial-gradient(circle at 50% 45%, transparent 10%, #000 25%, transparent 55%);
    mask-image: radial-gradient(circle at 50% 45%, transparent 10%, #000 25%, transparent 55%);
    animation: bg-spin calc(5s / var(--bg-rate, 1)) linear infinite;
  }
  @keyframes bg-breathe { from { transform: scale(0.82); opacity: 0.75; } to { transform: scale(1.12); opacity: 1; } }
  @keyframes bg-breathe-up { from { transform: translateY(6%) scale(0.82); opacity: 0.75; } to { transform: translateY(-6%) scale(1.12); opacity: 1; } }
  @keyframes bg-breathe-down { from { transform: translateY(-6%) scale(0.82); opacity: 0.75; } to { transform: translateY(6%) scale(1.12); opacity: 1; } }

  /* ---- Mesh Gradient ---- */
  .s-mesh .lay { filter: blur(calc(40px * var(--bg-blur-k, 1))); animation: bg-mesh-up calc(30s / var(--bg-rate, 1)) ease-in-out infinite alternate; }
  .bg.dir-down.s-mesh .lay { animation-name: bg-mesh-down; }
  .bg.dir-swirl.s-mesh .lay, .bg.dir-still.s-mesh .lay { animation: none; }
  .s-mesh .m { width: 90%; aspect-ratio: 1; margin: -45% 0 0 -45%; transform-origin: 62% 50%; animation: bg-spin calc(var(--md, 26s) / var(--bg-rate, 1)) linear infinite; }
  .s-mesh .m > b { inset: 0; border-radius: 50%; }
  .s-mesh .m1 { left: 15%; top: 20%; --md: 26s; }
  .s-mesh .m2 { left: 85%; top: 25%; --md: 34s; animation-direction: reverse; }
  .s-mesh .m3 { left: 80%; top: 85%; --md: 30s; }
  .s-mesh .m4 { left: 20%; top: 80%; --md: 38s; animation-direction: reverse; }
  .s-mesh .m1 > b, .s-mesh .m3 > b { background: radial-gradient(circle, var(--etc-bg-a), transparent 65%); }
  .s-mesh .m2 > b, .s-mesh .m4 > b { background: radial-gradient(circle, var(--etc-bg-b), transparent 65%); }
  .bg.dir-swirl.s-mesh .m { animation-duration: calc(var(--md, 26s) * 0.35 / var(--bg-rate, 1)); }
  @keyframes bg-mesh-up { from { transform: translateY(6%); } to { transform: translateY(-6%); } }
  @keyframes bg-mesh-down { from { transform: translateY(-6%); } to { transform: translateY(6%); } }

  /* ---- Glow Beam ---- */
  .s-beam .beam { inset: -45%; animation: bg-beam-up calc(24s / var(--bg-rate, 1)) ease-in-out infinite alternate; }
  .bg.dir-down.s-beam .beam { animation-name: bg-beam-down; }
  .bg.dir-swirl.s-beam .beam { animation: bg-beam-spin calc(10s / var(--bg-rate, 1)) linear infinite; }
  .bg.dir-still.s-beam .beam { animation: none; transform: rotate(-40deg); }
  .s-beam .beam i { border-radius: 40%; filter: blur(calc(38px * var(--bg-blur-k, 1))); }
  .s-beam .r1 { left: 44%; top: 5%; width: 20%; height: 90%; background: linear-gradient(to right, var(--etc-bg-a), color-mix(in srgb, var(--etc-bg-b) 60%, transparent) 50%, transparent); }
  .s-beam .r2 { left: 22%; top: 0; width: 18%; height: 65%; background: var(--etc-bg-b); opacity: 0.45; }
  .s-beam .r3 { left: 62%; top: 25%; width: 28%; height: 50%; background: linear-gradient(135deg, color-mix(in srgb, var(--etc-bg-b) 70%, transparent), transparent); opacity: 0.7; }
  @keyframes bg-beam-up { from { transform: rotate(-40deg) translate(-6%, 8%); } to { transform: rotate(-40deg) translate(6%, -8%); } }
  @keyframes bg-beam-down { from { transform: rotate(-40deg) translate(-6%, -8%); } to { transform: rotate(-40deg) translate(6%, 8%); } }
  @keyframes bg-beam-spin { from { transform: rotate(-40deg); } to { transform: rotate(320deg); } }

  /* ---- Fan: soft blades sweeping round, speed from the fan ---- */
  .bg .blades {
    inset: -30%;
    background: repeating-conic-gradient(from 0deg, color-mix(in srgb, var(--etc-bg-a) 50%, transparent) 0deg 30deg, transparent 30deg 90deg);
    filter: blur(calc(22px * var(--bg-blur-k, 1)));
    opacity: 0.5;
    -webkit-mask-image: radial-gradient(circle, transparent 8%, #000 22%, #000 55%, transparent 72%);
    mask-image: radial-gradient(circle, transparent 8%, #000 22%, #000 55%, transparent 72%);
    animation: bg-spin calc(5s / var(--bg-rate, 1)) linear infinite;
  }

  /* ---- Frosted controls ---- */
  ha-card.frosted :is(.btn, .mt, .chip, .tgl, .round, .hc-switch, .pill) {
    -webkit-backdrop-filter: blur(var(--frost, 12px)) saturate(140%);
    backdrop-filter: blur(var(--frost, 12px)) saturate(140%);
  }
  ha-card.frosted :is(.btn, .mt, .tgl, .hc-switch) {
    background: var(--etc-b-bg, rgba(255, 255, 255, 0.08));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  }
  ha-card.frosted .round { background: rgba(255, 255, 255, 0.06); }
  /* The wheel's setpoint bubble: tinted glass in the heat / cool colour. */
  ha-card.frosted .bubble {
    background: color-mix(in srgb, var(--c) 32%, rgba(255, 255, 255, 0.06));
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--c) 60%, rgba(255, 255, 255, 0.25));
    -webkit-backdrop-filter: blur(var(--frost, 12px)) saturate(150%);
    backdrop-filter: blur(var(--frost, 12px)) saturate(150%);
  }
  ha-card.frosted .chip { background: var(--etc-b-bg, rgba(255, 255, 255, 0.07)); }
  ha-card.frosted .menu-list {
    background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 72%, transparent);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    backdrop-filter: blur(18px) saturate(140%);
  }
`;
var Xo = Object.defineProperty, U = (r, t, e, i) => {
  for (var o = void 0, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (o = a(t, e, o) || o);
  return o && Xo(t, e, o), o;
};
const Ko = 18;
function Zo(r, t) {
  const e = r.currentTemp;
  if (e === null || !t?.available) return !1;
  const i = (t.heat ?? t.cool).step / 2, o = t.heat?.value, n = t.cool?.value;
  return o !== void 0 && n !== void 0 ? e >= o - i && e <= n + i : o !== void 0 ? e >= o - i : n !== void 0 ? e <= n + i : !1;
}
const Jo = 500, ee = class ee extends Z {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(), this._tick = 0, this._popupOpen = !1, this._menu = null, this._revealed = !1, this._bgPaused = !1, this._cycle = 0, this._cycleTimer = null, this._onScreen = !0, this._revealTimer = null, this._sp = new Ho(
      () => this._config?.entity ?? "",
      (t) => this._call(t),
      () => {
        this._tick += 1, this._revealed && this._armReveal();
      }
    ), this._drag = null, this._barDrag = null, this._hold = null, this._onTest = (t) => {
      t.detail?.entity === this._config?.entity && this.requestUpdate();
    }, this._updatePause = () => {
      const t = !this._onScreen || document.visibilityState === "hidden";
      t !== this._bgPaused && (this._bgPaused = t);
    }, this._wheelDown = (t) => {
      const e = this._sp.edit, i = e?.[e.active];
      if (!i) return;
      const o = t.currentTarget;
      o.focus({ preventScroll: !0 }), this._drag = { startY: t.clientY, startValue: i.value }, this._sp.dragging = !0, this._armReveal(), o.setPointerCapture?.(t.pointerId);
    }, this._wheelMove = (t) => {
      !this._drag || !this._sp.edit || this._sp.preview(Po(this._sp.edit, this._drag.startValue, t.clientY - this._drag.startY, Ko));
    }, this._wheelUp = (t) => {
      const e = this._drag;
      if (!e) return;
      this._drag = null, this._sp.dragging = !1;
      const i = t.currentTarget;
      i.hasPointerCapture?.(t.pointerId) && i.releasePointerCapture(t.pointerId);
      const o = this._sp.edit;
      o && o[o.active]?.value !== e.startValue ? this._sp.commit(o) : this._tapMode() && this._revealed && Math.abs(t.clientY - e.startY) < 6 && this._setRevealed(!1);
    }, this._wheelKey = (t) => {
      const e = this._sp.edit;
      e && (t.key === "ArrowUp" || t.key === "ArrowRight" ? (t.preventDefault(), this._sp.commit(X(e, 1))) : (t.key === "ArrowDown" || t.key === "ArrowLeft") && (t.preventDefault(), this._sp.commit(X(e, -1))));
    }, this._wheelScroll = (t) => {
      const e = this._sp.edit;
      !e || Math.abs(t.deltaY) < 4 || (t.preventDefault(), this._sp.commit(X(e, t.deltaY < 0 ? 1 : -1)));
    }, this._barDown = (t) => {
      const e = this._sp.edit;
      if (!e?.available) return;
      const i = t.currentTarget, o = i.getBoundingClientRect(), n = Rt(e, this._config?.setpoint?.bar), a = this._barFraction(t, o), s = Io(e, a, n);
      this._barDrag = { handle: s, rect: o }, this._sp.dragging = !0, this._armReveal(), i.setPointerCapture?.(t.pointerId), this._sp.preview(Te(tt(e, s), this._barValueAt(t, o)));
    }, this._barMove = (t) => {
      !this._barDrag || !this._sp.edit || this._sp.preview(Te(this._sp.edit, this._barValueAt(t, this._barDrag.rect)));
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
    this._config = Ot(t), this._open = this._loadOpen();
  }
  static getConfigElement() {
    return document.createElement(Pt);
  }
  static getStubConfig(t) {
    return { entity: Object.keys(t?.states ?? {}).find((i) => i.startsWith("climate.")) ?? "climate.thermostat" };
  }
  /** Test mode, as set in the open editor for this thermostat (never saved). */
  _testMode() {
    return vt(this._config?.entity);
  }
  _syncCycleTimer() {
    const t = this._testMode() === "cycle";
    t && !this._cycleTimer && (this._cycleTimer = setInterval(() => this._cycle += 1, vo)), !t && this._cycleTimer && (clearInterval(this._cycleTimer), this._cycleTimer = null);
  }
  getCardSize() {
    return 5;
  }
  getGridOptions() {
    return { columns: 6, min_columns: 4, rows: "auto" };
  }
  connectedCallback() {
    super.connectedCallback(), typeof IntersectionObserver < "u" && (this._io = new IntersectionObserver((t) => {
      this._onScreen = t.some((e) => e.isIntersecting), this._updatePause();
    }), this._io.observe(this)), document.addEventListener("visibilitychange", this._updatePause), window.addEventListener(Dt, this._onTest);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._io?.disconnect(), this._io = void 0, this._cycleTimer && clearInterval(this._cycleTimer), this._cycleTimer = null, this._sideRO?.disconnect(), document.removeEventListener("visibilitychange", this._updatePause), window.removeEventListener(Dt, this._onTest), this._sp.dispose(), this._revealTimer && clearTimeout(this._revealTimer);
  }
  willUpdate(t) {
    (t.has("hass") || t.has("_config")) && this.hass && this._config && this._sp.sync(Ro(this.hass, this._config)), t.has("hass") && this._popupEl && this.hass && (this._popupEl.hass = this.hass);
  }
  /** Only re-render for state that this card reads (not every hass push). */
  shouldUpdate(t) {
    if (!t.has("hass") || t.size > 1) return !0;
    const e = t.get("hass");
    return !e || !this.hass || !this._config ? !0 : this._watched().some((i) => e.states[i] !== this.hass.states[i]);
  }
  _watched() {
    const t = this._config, e = [t.entity], i = Zt(t);
    i && e.push(i);
    for (const o of t.sets ?? []) for (const n of o.chips ?? []) e.push(n.entity);
    if (this.hass)
      for (const o of t.sets ?? [])
        for (const n of o.chips ?? []) {
          if (n.type !== "rf_fan") continue;
          const a = Ht(this.hass, n, 0);
          a.lightEntity && e.push(a.lightEntity);
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
    const t = this._config, e = Bi(this.hass, t);
    this._syncCycleTimer();
    const i = wo(this._testMode(), this._cycle), o = i ? { ...ze(e, i), currentTemp: e.currentTemp, setpoints: e.setpoints } : e, n = i ? ze(e, i) : e, a = Ri(this.hass, t), s = qi(this.hass, t, n), l = {
      [`eq-${o.equipment ?? "none"}`]: !0,
      [`mode-${o.mode}`]: !0,
      ...po(t, n),
      frosted: Ie(t),
      "bg-paused": !!s && this._bgPaused
    }, c = { ...Ki(t), ...Xi(t.text), ...this._barVars(), ...uo(t), ...Wi(t, s) }, p = { top: [], bottom: [], left: [], right: [] }, h = a.filter((m) => m.display === "toggle"), f = (m) => m.display !== "toggle" || this._open.has(m.key), b = new Map(a.filter((m) => m.config.id).map((m) => [m.config.id, m])), g = (m) => {
      let _ = m;
      const S = /* @__PURE__ */ new Set([m]);
      for (; _.config.row_with; ) {
        const $ = b.get(_.config.row_with);
        if (!$ || S.has($) || !f($)) break;
        S.add($), _ = $;
      }
      return _;
    }, w = /* @__PURE__ */ new Map();
    for (const m of a) {
      if (!f(m)) continue;
      const _ = g(m);
      w.has(_) || w.set(_, []), w.get(_).push(m);
    }
    const y = { top: [], bottom: [], left: [], right: [] };
    for (const [m, _] of w) _.length === 1 && m.display === "menu" && y[m.zone].push(m);
    for (const m of a) {
      const _ = w.get(m);
      if (_) {
        if (_.length === 1 && m.display === "menu") {
          y[m.zone][0] === m && p[m.zone].push(this._renderMenuRow(y[m.zone], m.zone));
          continue;
        }
        if (_.length === 1) {
          p[m.zone].push(this._renderSet(m));
          continue;
        }
        p[m.zone].push(d`<div class="row-group">
        ${_.map((S) => S.display === "menu" ? this._renderMenuRow([S], m.zone) : this._renderSet(S))}
      </div>`);
      }
    }
    const k = t.toggles_zone ?? v.toggles_zone;
    return h.length && p[k].push(this._renderToggles(h)), d`
      <ha-card class=${pt(l)} style=${x(c)}>
        ${Yo(t, s)}
        ${i ? d`<div class="test-badge" title="Test mode switches off when the editor closes">TEST · ${_o[i]}</div>` : u}
        <div class=${pt({ grid: !0, centered: t.zones?.centered ?? !0, "has-sides": !!(p.left.length || p.right.length) })} style=${x(this._zoneVars())}>
          ${["top", "left"].map((m) => this._zone(m, p[m]))}
          ${this._renderCore(o)}
          ${["right", "bottom"].map((m) => this._zone(m, p[m]))}
        </div>
        ${this._renderPopup()}
      </ha-card>
    `;
  }
  _zoneVars() {
    const t = this._config?.zones ?? {}, e = {};
    t.gap !== void 0 && (e["--zg"] = `${t.gap}px`);
    for (const i of ["top", "bottom", "left", "right"]) t[i] !== void 0 && (e[`--zg-${i}`] = `${t[i]}px`);
    return e;
  }
  updated() {
    const t = this.renderRoot.querySelector(".grid");
    if (!t || typeof ResizeObserver > "u") return;
    const e = [...t.querySelectorAll(":scope > .zone.left, :scope > .zone.right")];
    if (this._sideRO?.disconnect(), !e.length || !t.classList.contains("centered")) {
      t.style.removeProperty("--side-w");
      return;
    }
    const i = () => {
      t.classList.remove("no-center");
      const o = Math.ceil(
        Math.max(
          ...e.map((a) => {
            const s = getComputedStyle(a), l = [...a.children].map((h) => h.getBoundingClientRect().width), c = parseFloat(s.columnGap) || 0;
            return (s.flexDirection === "row" ? l.reduce((h, f) => h + f, 0) + c * Math.max(0, l.length - 1) : Math.max(0, ...l)) + parseFloat(s.marginLeft) + parseFloat(s.marginRight);
          })
        )
      );
      t.style.getPropertyValue("--side-w") !== `${o}px` && t.style.setProperty("--side-w", `${o}px`), e.some((a) => {
        const s = getComputedStyle(a);
        return a.getBoundingClientRect().width + parseFloat(s.marginLeft) + parseFloat(s.marginRight) + 1 < o && [...a.children].reduce((l, c) => l + c.getBoundingClientRect().width, 0) > a.getBoundingClientRect().width + 1;
      }) && t.classList.add("no-center");
    };
    this._sideRO ??= new ResizeObserver(() => i());
    for (const o of e) this._sideRO.observe(o);
    i();
  }
  _zone(t, e) {
    return e.length ? d`<div class="zone ${t}">${e}</div>` : u;
  }
  _barVars() {
    const t = this._config?.setpoint?.bar ?? {}, e = {};
    return t.height && (e["--etc-bar-h"] = `${t.height}px`), t.length && (e["--etc-bar-len"] = `${t.length}px`), t.heat_color && (e["--bar-heat"] = t.heat_color), t.cool_color && (e["--bar-cool"] = t.cool_color), t.comfort_color && (e["--bar-comfort"] = t.comfort_color), t.handle_color && (e["--bar-handle"] = t.handle_color), t.handle_border_color === "none" ? e["--bar-hbw"] = "0px" : t.handle_border_color && (e["--bar-hbc"] = t.handle_border_color), t.flag_color && (e["--bar-flag"] = t.flag_color), t.flag_text_color && (e["--bar-flag-fg"] = t.flag_text_color), e;
  }
  // ---- core -----------------------------------------------------------------
  /** Tap-to-reveal is on (and there is a control to reveal). */
  _tapMode() {
    const t = this._config?.setpoint ?? {};
    return (t.reveal ?? v.reveal) === "tap" && (t.control ?? v.control) !== "none";
  }
  _setRevealed(t) {
    this._revealed = t, this._armReveal();
  }
  /** (Re)start the auto-close countdown; called on every interaction. */
  _armReveal() {
    if (this._revealTimer && clearTimeout(this._revealTimer), this._revealTimer = null, !this._revealed || !this._tapMode()) return;
    const t = this._config?.setpoint?.hide_after ?? v.hide_after;
    t <= 0 || (this._revealTimer = setTimeout(() => {
      if (this._revealTimer = null, this._sp.dragging) {
        this._armReveal();
        return;
      }
      this._revealed = !1;
    }, t * 1e3));
  }
  _renderCore(t) {
    const e = this._config, i = e.setpoint ?? {}, o = i.control ?? v.control, n = i.position ?? v.position, a = e.core_align ?? v.core_align, s = this._sp.edit, l = !!s?.available && o !== "none", c = i.bar?.position ?? v.bar.position, p = c === "above", h = c === "left" || c === "right", f = t.equipment ? `eq-${t.equipment}` : "", b = l && this._tapMode(), g = !b || this._revealed, w = i.reveal_from ?? v.reveal_from, y = b && (w === "both" || w === "current"), k = b && (w === "both" || w === "pills"), m = b && g && (i.open_in ?? v.open_in) === "current", _ = b && !g && !!i.hide_at_target && Zo(t, s), S = y || _, $ = l ? o === "bar" ? this._renderBar(s, t) : this._renderControl(s, o) : null;
    let C = null;
    l && (b ? g ? C = m ? null : $ : !_ && (i.collapsed ?? v.collapsed) === "visual" && (C = this._renderCollapsed(s, t, o)) : C = $);
    const N = o !== "bar" ? C : null, O = o === "bar" ? C : null;
    if (!t.available)
      return d`<div class="core al-${a}">
        <div class="main">
          ${e.show_name ?? v.show_name ? d`<div class="name">${t.name}</div>` : u}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    const ie = d`${H(t.currentTemp, t.unit)}<span class="unit">${t.unit}</span>`, ct = e.status_position ?? v.status_position, dt = (e.show_status ?? v.show_status) && t.equipment ? d`<div class="status ${f} sp-${ct}">
            <ha-icon icon=${Kt[t.state] ?? "mdi:thermostat"}></ha-icon>${Ni[t.equipment]}
          </div>` : u, oe = m ? d`<div class="in-current">${$}</div>` : e.show_current ?? v.show_current ? S ? d`<button
              class="current tappable ${f}"
              aria-expanded=${g}
              aria-label="Show temperature controls"
              @click=${() => this._setRevealed(!this._revealed)}
            >
              ${ie}
            </button>` : d`<div class="current ${f}">${ie}</div>` : u, ei = d`<div class="main">
      ${e.show_name ?? v.show_name ? d`<div class="name">${t.name}</div>` : u}
      ${ct === "above" ? dt : u}
      ${(e.show_humidity ?? v.show_humidity) && t.humidity !== null ? d`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(t.humidity)}%</div>` : u}
      ${ct === "beside" && dt !== u ? d`<div class="cur-row">${oe}${dt}</div>` : oe}
      ${ct === "below" ? dt : u}
      ${(e.show_pills ?? v.show_pills) && s?.available && !_ && !(b && g && i.hide_pills_open) ? this._renderPills(s, k, g) : u}
    </div>`;
    return d`<div class="core al-${a} pos-${n}">
      ${O && p ? O : u}
      <div class="core-row">
        ${O && c === "left" ? O : u} ${N && n === "left" ? N : u} ${ei}
        ${N && n === "right" ? N : u} ${O && c === "right" ? O : u}
      </div>
      ${N && n === "center" ? d`<div class="ctl-center">${N}</div>` : u}
      ${O && !p && !h ? O : u}
    </div>`;
  }
  /** The control's own value while it is folded away; tap to open. */
  _renderCollapsed(t, e, i) {
    const o = t[t.active];
    if (!o) return u;
    const n = () => this._setRevealed(!0);
    if (i === "bar")
      return d`<div
        class="collapsed bar-c"
        role="button"
        tabindex="0"
        aria-label="Show temperature controls"
        @click=${n}
        @keydown=${(s) => {
        (s.key === "Enter" || s.key === " ") && (s.preventDefault(), n());
      }}
      >
        ${this._renderBar(t, e, !0)}
      </div>`;
    const a = H(o.value, t.unit);
    return d`<button class="collapsed" aria-label="Show temperature controls" @click=${n}>
      ${i === "wheel" ? this._wheelCentre(t.active, a) : d`<span class="sv" style=${x({ "--c": t.active === "cool" ? "var(--etc-cool)" : "var(--etc-heat)" })}
            >${a}</span
          >`}
    </button>`;
  }
  /** `tapOpens`: the pills open the control (tap-to-reveal). In Heat/Cool a
   *  pill also picks which setpoint the wheel/stepper edits. */
  _renderPills(t, e = !1, i = !0) {
    const o = !!(t.heat && t.cool), n = (a) => {
      const s = t[a];
      if (!s) return u;
      const l = d`<ha-icon icon=${a === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${H(
        s.value,
        t.unit
      )}`, c = o && t.active !== a && this._usesActive() && i;
      return !o && !e ? d`<div class="pill ${a}">${l}</div>` : d`<button
        class="pill ${a} ${c ? "dim" : ""} ${e ? "tappable" : ""}"
        aria-pressed=${o ? String(t.active === a) : u}
        aria-expanded=${e ? String(i) : u}
        aria-label=${`${a === "heat" ? "Heat" : "Cool"} setpoint`}
        @click=${() => this._pillTap(t, a, o, e, i)}
      >
        ${l}
      </button>`;
    };
    return d`<div class="pills">${n("heat")} ${n("cool")}</div>`;
  }
  _pillTap(t, e, i, o, n) {
    i && this._sp.select(tt(t, e)), o && (n ? !i || t.active === e ? this._setRevealed(!1) : this._armReveal() : this._setRevealed(!0));
  }
  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  _usesActive() {
    const t = this._config?.setpoint?.control ?? v.control;
    return t === "wheel" || t === "stepper";
  }
  _renderControl(t, e) {
    const i = t[t.active];
    if (!i) return u;
    const o = t.active, n = d`<button
      class="round ${o}"
      aria-label="Increase"
      ?disabled=${i.max !== null && i.value >= i.max}
      @click=${() => this._sp.commit(X(t, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`, a = d`<button
      class="round ${o}"
      aria-label="Decrease"
      ?disabled=${i.min !== null && i.value <= i.min}
      @click=${() => this._sp.commit(X(t, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`, l = ((this._config?.show_pills ?? v.show_pills) === !1 || this._tapMode() && this._revealed && !!this._config?.setpoint?.hide_pills_open) && t.heat && t.cool ? d`<div class="hc-switch" role="group" aria-label="Setpoint">
            ${["heat", "cool"].map(
      (_) => d`<button
                class="hc ${_} ${t.active === _ ? "on" : ""}"
                aria-pressed=${String(t.active === _)}
                aria-label=${_ === "heat" ? "Edit heat setpoint" : "Edit cool setpoint"}
                @click=${() => {
        this._sp.select(tt(t, _)), this._armReveal();
      }}
              >
                <ha-icon icon=${_ === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${H(t[_].value, t.unit)}
              </button>`
    )}
          </div>` : u, c = this._config?.setpoint?.nudge, p = c === "beside" ? "right" : c ?? (e === "stepper" ? "around" : "right"), h = (_, S) => {
      const $ = d`<div class="nudges">${n}${a}</div>`, C = d`<div class="nudges row">${a}${n}</div>`, N = p === "hidden" ? S : p === "left" ? d`${$}${S}` : p === "above" ? d`${C}${S}` : p === "below" ? d`${S}${C}` : p === "stacked" ? d`${n}${S}${a}` : p === "around" ? d`${a}${S}${n}` : d`${S}${$}`, O = d`<div class="${_} nud-${p}">${N}</div>`;
      return l === u ? O : d`<div class="ctl-wrap">${l}${O}</div>`;
    };
    if (e === "stepper")
      return h(`stepper ${o}`, d`<span class="sv">${H(i.value, t.unit)}</span>`);
    const b = (this._config?.setpoint ?? {}).neighbors ?? v.neighbors, g = Oo(i, b), w = g.filter((_) => _ > i.value).reverse(), y = g.filter((_) => _ < i.value).reverse(), k = (_) => d`<div class="nb ${Math.abs(_ - i.value) > i.step * 1.5 ? "far" : ""}">${H(_, t.unit)}</div>`, m = d`<div
      class="wheel-col"
      role="slider"
      tabindex="0"
      aria-label=${`${o === "cool" ? "Cool" : "Heat"} setpoint`}
      aria-valuenow=${i.value}
      aria-valuemin=${i.min ?? u}
      aria-valuemax=${i.max ?? u}
      aria-valuetext=${H(i.value, t.unit)}
      @pointerdown=${this._wheelDown}
      @pointermove=${this._wheelMove}
      @pointerup=${this._wheelUp}
      @pointercancel=${this._wheelUp}
      @keydown=${this._wheelKey}
      @wheel=${this._wheelScroll}
    >
      ${w.map(k)}
      ${this._wheelCentre(o, H(i.value, t.unit))}
      ${y.map(k)}
    </div>`;
    return h("wheel", m);
  }
  _wheelCentre(t, e) {
    return (this._config?.setpoint?.wheel_style ?? v.wheel_style) === "pill" ? d`<div class="pill wheel-pill ${t}">
        <ha-icon icon=${t === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${e}
      </div>` : d`<div class="bubble ${t}">${e}</div>`;
  }
  // ---- bar ------------------------------------------------------------------
  _renderBar(t, e, i = !1) {
    const o = { ...v.bar, ...this._config?.setpoint?.bar ?? {} }, n = Rt(t, o), a = ($) => `${(St($, n) * 100).toFixed(3)}%`, s = o.position === "left" || o.position === "right", l = ($) => s ? { bottom: $ } : { left: $ }, c = s ? "height" : "width", p = s ? "top" : "right", h = t.heat, f = t.cool, b = Do(n, o.ticks ?? 0, o.labels ?? 0), g = [];
    if (o.look === "gradient") {
      const $ = o.stops?.length ? o.stops : ["#2b9af9", "#7ccf8a", "#ff8100"];
      g.push(d`<div class="seg full" style=${x({ background: `linear-gradient(to ${s ? "top" : "right"}, ${$.join(", ")})` })}></div>`);
    } else
      h && g.push(d`<div class="seg heat" style=${x({ [c]: a(h.value) })}></div>`), f && g.push(d`<div class="seg cool" style=${x({ ...l(a(f.value)), [p]: "0" })}></div>`), h && f && g.push(d`<div class="seg comfort" style=${x({ ...l(a(h.value)), [p]: `calc(100% - ${a(f.value)})` })}></div>`);
    const w = ($) => {
      const C = t[$];
      return C ? d`
        ${o.flags ? d`<div class="flag ${$}" style=${x(l(a(C.value)))}>${H(C.value, t.unit)}°</div>` : u}
        <div
          class="handle ${$} s-${o.handle_shape ?? "round"} ${t.active === $ && h && f ? "active" : ""}"
          style=${x(l(a(C.value)))}
          role=${i ? u : "slider"}
          aria-orientation=${s ? "vertical" : "horizontal"}
          tabindex=${i ? u : "0"}
          aria-label=${`${$ === "heat" ? "Heat" : "Cool"} setpoint`}
          aria-valuenow=${C.value}
          aria-valuemin=${n.min}
          aria-valuemax=${n.max}
          @focus=${() => this._sp.select(tt(this._sp.edit, $))}
          @keydown=${(N) => this._barKey(N, $)}
        ></div>
      ` : u;
    }, y = e.currentTemp, k = o.show_current && y !== null && y >= n.min && y <= n.max ? d`<div class="marker" style=${x(l(a(y)))} title="Current"></div>` : u, m = i ? d`<div class="track ro">${g}${k}${w("heat")} ${w("cool")}</div>` : d`<div
          class="track"
          @pointerdown=${this._barDown}
          @pointermove=${this._barMove}
          @pointerup=${this._barUp}
          @pointercancel=${this._barUp}
        >
          ${g}${k}${w("heat")} ${w("cool")}
        </div>`, _ = s ? o.flag_position === "right" ? "right" : "left" : o.flag_position === "below" ? "below" : "above", S = s ? o.tick_position === "left" ? "left" : "right" : o.tick_position === "above" ? "above" : "below";
    return d`<div class="bar ${s ? `vertical side-${o.position}` : "horizontal"} ${o.flags ? `flags-${_}` : "no-flags"} ticks-${S}">
      ${m}
      ${b.length ? d`<div class="ticks">
            ${b.map(
      ($) => d`<div class="tick ${$.label ? "lbl" : ""}" style=${x(l(`${$.fraction * 100}%`))}></div>
                ${$.label ? d`<div class="tick-l" style=${x(l(`${$.fraction * 100}%`))}>${$.value}</div>` : u}`
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
    const i = this._sp.edit, o = Rt(i, this._config?.setpoint?.bar);
    return Uo(this._barFraction(t, e), o);
  }
  _barKey(t, e) {
    const i = this._sp.edit;
    if (!i) return;
    const o = t.key === "ArrowUp" || t.key === "ArrowRight" ? 1 : t.key === "ArrowDown" || t.key === "ArrowLeft" ? -1 : 0;
    o && (t.preventDefault(), this._sp.commit(X(tt(i, e), o)));
  }
  // ---- button sets ------------------------------------------------------------
  _renderSet(t) {
    const e = Ft(this._config?.buttons, t.config.style), i = e.look ?? (t.type === "chips" ? "chip" : "button"), o = (t.type !== "chips" || i === "button") && t.orientation === "row" && t.align === "stretch", n = { ...xe(e) };
    o && (n["grid-template-columns"] = t.columns ? `repeat(${t.columns}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))");
    const a = {
      set: !0,
      grid: o,
      flex: !o,
      [`t-${t.type}`]: !0,
      [`o-${t.orientation}`]: !0,
      [`a-${t.align}`]: !0,
      [`v-${e.variant}`]: !0,
      [`ip-${e.icon_position}`]: !0,
      [`look-${i}`]: !0
    };
    if (t.type === "chips") {
      const c = (t.config.chips ?? []).map((p, h) => Ht(this.hass, p, h));
      return d`<div class=${pt(a)} style=${x(n)} role="group" aria-label=${t.title}>
        ${c.map((p) => this._renderChip(p, e.content, i))}
      </div>`;
    }
    const s = e.content !== "label", l = e.content !== "icon";
    return d`<div class=${pt(a)} style=${x(n)} role="group" aria-label=${t.title}>
      ${t.options.map(
      (c) => d`<button
          class="btn ${c.active ? "active" : ""}"
          style=${x({ "--c": c.color })}
          aria-pressed=${c.active}
          title=${c.label}
          @click=${() => {
        const p = be(t.type, this._config.entity, c.value);
        p && this._call(p);
      }}
        >
          ${s ? d`<ha-icon icon=${c.icon}></ha-icon>` : u}
          ${l ? d`<span class="lbl">${c.label}</span>` : u}
        </button>`
    )}
    </div>`;
  }
  // ---- expandable menus -------------------------------------------------------
  _renderMenuRow(t, e) {
    return d`<div class="menus z-${e}">${t.map((i) => this._renderMenu(i))}</div>`;
  }
  _renderMenu(t) {
    const e = Ft(this._config?.buttons, t.config.style), i = t.options.find((l) => l.active), o = e.content !== "label", n = this._menu === t.key, a = typeof HTMLElement < "u" && "showPopover" in HTMLElement.prototype, s = e.look ?? "button";
    return d`<div class="menu t-${t.type} look-${s} ${n ? "open" : ""} d-${t.menuDirection} v-${e.variant}" style=${x(xe(e))}>
      <button
        class="mt ${i ? "has-active" : ""}"
        style=${x({ "--c": i?.color ?? "var(--primary-color)" })}
        aria-haspopup="listbox"
        aria-expanded=${n}
        aria-label=${`${t.title}: ${i?.label ?? ""}`}
        @click=${(l) => this._toggleMenu(t, l.currentTarget)}
      >
        ${o ? d`<ha-icon icon=${i?.icon ?? t.toggleIcon}></ha-icon>` : u}
        <span class="mt-text">
          ${t.menuShowName ? d`<span class="mt-name">${t.title}</span>` : u}
          <span class="mt-value">${i?.label ?? "—"}</span>
        </span>
      </button>
      <div
        class="menu-list"
        role="listbox"
        aria-label=${t.title}
        data-key=${t.key}
        popover=${a ? "auto" : u}
        @toggle=${(l) => this._menuToggled(t, l)}
        @keydown=${this._menuKey}
      >
        ${t.options.map(
      (l) => d`<button
            class="mi ${l.active ? "active" : ""}"
            role="option"
            aria-selected=${l.active}
            style=${x({ "--c": l.color })}
            @click=${() => this._pickMenu(t, l.value)}
          >
            ${o ? d`<ha-icon icon=${l.icon}></ha-icon>` : u}<span>${l.label}</span>
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
    const o = e.getBoundingClientRect(), n = 6, a = window.innerWidth, s = window.innerHeight;
    t.style.minWidth = i === "up" || i === "down" ? `${Math.round(o.width)}px` : "";
    const l = t.getBoundingClientRect();
    let c = i === "right" ? o.right + n : i === "left" ? o.left - n - l.width : o.left, p = i === "down" ? o.bottom + n : i === "up" ? o.top - n - l.height : o.top;
    i === "down" && p + l.height > s && (p = o.top - n - l.height), i === "up" && p < 0 && (p = o.bottom + n), i === "right" && c + l.width > a && (c = o.left - n - l.width), i === "left" && c < 0 && (c = o.right + n), c = Math.max(4, Math.min(c, a - l.width - 4)), p = Math.max(4, Math.min(p, s - l.height - 4)), t.style.left = `${Math.round(c)}px`, t.style.top = `${Math.round(p)}px`;
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
    const i = be(t.type, this._config.entity, e);
    i && this._call(i), this._fire("haptic", "light"), this._closeMenus();
  }
  _renderToggles(t) {
    return d`<div class="toggles">
      ${t.map((e) => {
      const i = this._open.has(e.key);
      return d`<button class="tgl ${i ? "open" : ""}" aria-expanded=${i} @click=${() => this._toggleSet(e.key)}>
          <ha-icon icon=${e.toggleIcon}></ha-icon><span>${e.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
    })}
    </div>`;
  }
  // ---- chips --------------------------------------------------------------------
  _renderChip(t, e, i = "chip") {
    const o = t.config.show_name ?? e !== "icon", n = t.config.show_state ?? !0, a = t.type === "rf_fan", s = i === "button", l = !s || e !== "label", c = s ? `btn dev ${t.on ? "active" : ""}` : `chip ${t.on ? "on" : ""}`, p = a && t.natural ? d`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
          ><ha-icon icon="mdi:leaf"></ha-icon>${n && t.naturalLevel !== null ? t.naturalLevel : u}</span
        >` : n && (!a || t.speed !== null || !t.on) ? d`<span class="badge">${t.state}</span>` : u, h = d`${a && t.lightOn ? d`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : u}
      ${a && t.timerEnds ? d`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${Se(t.timerEnds)}</span>` : u}`;
    return s ? d`<button
        class="${c} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
        aria-label=${`${t.name}: ${t.state}`}
        title=${`${t.name}: ${t.state}`}
        @pointerdown=${(f) => this._chipDown(f, t)}
        @pointerup=${this._chipCancelHold}
        @pointerleave=${this._chipCancelHold}
        @pointercancel=${this._chipCancelHold}
        @click=${() => this._chipTap(t)}
        @contextmenu=${(f) => f.preventDefault()}
      >
        ${l ? d`<ha-icon class=${t.spin ? "spin" : ""} style=${x(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>` : u}
        <span class="lbl dev-row">${o ? d`<span>${t.name}</span>` : u}${p}${h}</span>
      </button>` : d`<button
      class="${c} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
      aria-label=${`${t.name}: ${t.state}`}
      title=${`${t.name}: ${t.state}`}
      @pointerdown=${(f) => this._chipDown(f, t)}
      @pointerup=${this._chipCancelHold}
      @pointerleave=${this._chipCancelHold}
      @pointercancel=${this._chipCancelHold}
      @click=${() => this._chipTap(t)}
      @contextmenu=${(f) => f.preventDefault()}
    >
      <ha-icon class=${t.spin ? "spin" : ""} style=${x(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>
      ${o ? d`<span>${t.name}</span>` : u}
      ${a && t.natural ? d`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
            ><ha-icon icon="mdi:leaf"></ha-icon>${n && t.naturalLevel !== null ? t.naturalLevel : u}</span
          >` : n && (!a || t.speed !== null || !t.on) ? d`<span class="badge">${t.state}</span>` : u}
      ${a && t.lightOn ? d`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : u}
      ${a && t.timerEnds ? d`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${Se(t.timerEnds)}</span>` : u}
    </button>`;
  }
  _chipDown(t, e) {
    if (t.pointerType === "mouse" && t.button !== 0 || (this._chipCancelHold(), e.hold === "none")) return;
    const i = { fired: !1, timer: setTimeout(() => {
      i.fired = !0, this._chipAction(e, e.hold), this._fire("haptic", "medium");
    }, Jo) };
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
        const i = so(t.config);
        i && this._canCreate(i) ? this._showPopup(i) : this._fire("hass-more-info", { entityId: t.entity });
        break;
      }
      case "more-info":
        this._fire("hass-more-info", { entityId: t.entity });
        break;
      case "toggle":
      case "toggle_light": {
        const i = lo(t, e);
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
      const n = window.loadCardHelpers;
      if (n) e = (await n()).createCardElement(t);
      else {
        const a = String(t.type);
        e = document.createElement(a.startsWith("custom:") ? a.slice(7) : `hui-${a}-card`), e.setConfig?.(t);
      }
    } catch (n) {
      console.error("[easy-thermostat-styler-card] pop-up card failed", n);
      return;
    }
    e.hass = this.hass, this._popupEl = e, this._popupOpen = !0, await this.updateComplete;
    const i = this.renderRoot.querySelector("dialog.popup"), o = this.renderRoot.querySelector(".popup-body");
    !i || !o || (o.replaceChildren(e), i.open || i.showModal?.());
  }
  _renderPopup() {
    return this._popupOpen ? d`<dialog
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
ee.styles = [jo, Go];
let R = ee;
U([
  Xt({ attribute: !1 })
], R.prototype, "hass");
U([
  P()
], R.prototype, "_config");
U([
  P()
], R.prototype, "_open");
U([
  P()
], R.prototype, "_tick");
U([
  P()
], R.prototype, "_popupOpen");
U([
  P()
], R.prototype, "_menu");
U([
  P()
], R.prototype, "_revealed");
U([
  P()
], R.prototype, "_bgPaused");
U([
  P()
], R.prototype, "_cycle");
customElements.get(yt) || customElements.define(yt, R);
const At = window;
At.customCards = At.customCards ?? [];
At.customCards.some((r) => r.type === yt) || At.customCards.push({
  type: yt,
  name: "Easy Thermostat Styler Card (Ltek)",
  description: "A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.",
  preview: !0
});
console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${Le} `, "background:#ff8100;color:#fff", "background:#333;color:#fff");
