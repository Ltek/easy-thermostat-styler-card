/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = globalThis, Gt = wt.ShadowRoot && (wt.ShadyCSS === void 0 || wt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Kt = Symbol(), le = /* @__PURE__ */ new WeakMap();
let Le = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== Kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Gt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = le.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && le.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (r) => new Le(typeof r == "string" ? r : r + "", void 0, Kt), Xt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((o, i, n) => o + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Le(e, r, Kt);
}, po = (r, t) => {
  if (Gt) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), i = wt.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = e.cssText, r.appendChild(o);
  }
}, pe = Gt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return Be(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ho, defineProperty: uo, getOwnPropertyDescriptor: fo, getOwnPropertyNames: go, getOwnPropertySymbols: mo, getPrototypeOf: bo } = Object, Pt = globalThis, de = Pt.trustedTypes, vo = de ? de.emptyScript : "", _o = Pt.reactiveElementPolyfillSupport, ct = (r, t) => r, St = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? vo : null;
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
} }, Zt = (r, t) => !ho(r, t), he = { attribute: !0, type: String, converter: St, reflect: !1, useDefault: !1, hasChanged: Zt };
Symbol.metadata ??= Symbol("metadata"), Pt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let et = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = he) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(t, o, e);
      i !== void 0 && uo(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: i, set: n } = fo(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const s = i?.call(this);
      n?.call(this, a), this.requestUpdate(t, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? he;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ct("elementProperties"))) return;
    const t = bo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ct("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ct("properties"))) {
      const e = this.properties, o = [...go(e), ...mo(e)];
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
      for (const i of o) e.unshift(pe(i));
    } else t !== void 0 && e.push(pe(t));
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
    return po(t, this.constructor.elementStyles), t;
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
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : St).toAttribute(e, o.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const o = this.constructor, i = o._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = o.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : St;
      this._$Em = i;
      const s = a.fromAttribute(e, n.type);
      this[i] = s ?? this._$Ej?.get(i) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, i = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), o ??= a.getPropertyOptions(t), !((o.hasChanged ?? Zt)(n, e) || o.useDefault && o.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: i, wrapped: n }, a) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, n] of o) {
        const { wrapped: a } = n, s = this[i];
        a !== !0 || this._$AL.has(i) || s === void 0 || this.C(i, void 0, n, s);
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
et.elementStyles = [], et.shadowRootOptions = { mode: "open" }, et[ct("elementProperties")] = /* @__PURE__ */ new Map(), et[ct("finalized")] = /* @__PURE__ */ new Map(), _o?.({ ReactiveElement: et }), (Pt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Jt = globalThis, ue = (r) => r, Tt = Jt.trustedTypes, fe = Tt ? Tt.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ne = "$lit$", q = `lit$${Math.random().toFixed(9).slice(2)}$`, Fe = "?" + q, wo = `<${Fe}>`, J = document, pt = () => J.createComment(""), dt = (r) => r === null || typeof r != "object" && typeof r != "function", Qt = Array.isArray, $o = (r) => Qt(r) || typeof r?.[Symbol.iterator] == "function", Bt = `[ 	
\f\r]`, rt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ge = /-->/g, me = />/g, Y = RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, ve = /"/g, Ie = /^(?:script|style|textarea|title)$/i, yo = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = yo(1), V = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), _e = /* @__PURE__ */ new WeakMap(), Z = J.createTreeWalker(J, 129);
function De(r, t) {
  if (!Qt(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(t) : t;
}
const xo = (r, t) => {
  const e = r.length - 1, o = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = rt;
  for (let s = 0; s < e; s++) {
    const c = r[s];
    let l, d, h = -1, f = 0;
    for (; f < c.length && (a.lastIndex = f, d = a.exec(c), d !== null); ) f = a.lastIndex, a === rt ? d[1] === "!--" ? a = ge : d[1] !== void 0 ? a = me : d[2] !== void 0 ? (Ie.test(d[2]) && (i = RegExp("</" + d[2], "g")), a = Y) : d[3] !== void 0 && (a = Y) : a === Y ? d[0] === ">" ? (a = i ?? rt, h = -1) : d[1] === void 0 ? h = -2 : (h = a.lastIndex - d[2].length, l = d[1], a = d[3] === void 0 ? Y : d[3] === '"' ? ve : be) : a === ve || a === be ? a = Y : a === ge || a === me ? a = rt : (a = Y, i = void 0);
    const g = a === Y && r[s + 1].startsWith("/>") ? " " : "";
    n += a === rt ? c + wo : h >= 0 ? (o.push(l), c.slice(0, h) + Ne + c.slice(h) + q + g) : c + q + (h === -2 ? s : g);
  }
  return [De(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class ht {
  constructor({ strings: t, _$litType$: e }, o) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const s = t.length - 1, c = this.parts, [l, d] = xo(t, e);
    if (this.el = ht.createElement(l, o), Z.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = Z.nextNode()) !== null && c.length < s; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Ne)) {
          const f = d[a++], g = i.getAttribute(h).split(q), m = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: n, name: m[2], strings: g, ctor: m[1] === "." ? So : m[1] === "?" ? To : m[1] === "@" ? Ao : Ot }), i.removeAttribute(h);
        } else h.startsWith(q) && (c.push({ type: 6, index: n }), i.removeAttribute(h));
        if (Ie.test(i.tagName)) {
          const h = i.textContent.split(q), f = h.length - 1;
          if (f > 0) {
            i.textContent = Tt ? Tt.emptyScript : "";
            for (let g = 0; g < f; g++) i.append(h[g], pt()), Z.nextNode(), c.push({ type: 2, index: ++n });
            i.append(h[f], pt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Fe) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(q, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += q.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const o = J.createElement("template");
    return o.innerHTML = t, o;
  }
}
function it(r, t, e = r, o) {
  if (t === V) return t;
  let i = o !== void 0 ? e._$Co?.[o] : e._$Cl;
  const n = dt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, o)), o !== void 0 ? (e._$Co ??= [])[o] = i : e._$Cl = i), i !== void 0 && (t = it(r, i._$AS(r, t.values), i, o)), t;
}
class ko {
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
    const { el: { content: e }, parts: o } = this._$AD, i = (t?.creationScope ?? J).importNode(e, !0);
    Z.currentNode = i;
    let n = Z.nextNode(), a = 0, s = 0, c = o[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new ut(n, n.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (l = new Co(n, this, t)), this._$AV.push(l), c = o[++s];
      }
      a !== c?.index && (n = Z.nextNode(), a++);
    }
    return Z.currentNode = J, i;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class ut {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, o, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = it(this, t, e), dt(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : $o(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && dt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: o } = t, i = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = ht.createElement(De(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new ko(i, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = _e.get(t.strings);
    return e === void 0 && _e.set(t.strings, e = new ht(t)), e;
  }
  k(t) {
    Qt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, i = 0;
    for (const n of t) i === e.length ? e.push(o = new ut(this.O(pt()), this.O(pt()), this, this.options)) : o = e[i], o._$AI(n), i++;
    i < e.length && (this._$AR(o && o._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const o = ue(t).nextSibling;
      ue(t).remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, i, n) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = u;
  }
  _$AI(t, e = this, o, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = it(this, t, e, 0), a = !dt(t) || t !== this._$AH && t !== V, a && (this._$AH = t);
    else {
      const s = t;
      let c, l;
      for (t = n[0], c = 0; c < n.length - 1; c++) l = it(this, s[o + c], e, c), l === V && (l = this._$AH[c]), a ||= !dt(l) || l !== this._$AH[c], l === u ? t = u : t !== u && (t += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class So extends Ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class To extends Ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ao extends Ot {
  constructor(t, e, o, i, n) {
    super(t, e, o, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = it(this, t, e, 0) ?? u) === V) return;
    const o = this._$AH, i = t === u && o !== u || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== u && (o === u || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Co {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    it(this, t);
  }
}
const zo = Jt.litHtmlPolyfillSupport;
zo?.(ht, ut), (Jt.litHtmlVersions ??= []).push("3.3.3");
const Eo = (r, t, e) => {
  const o = e?.renderBefore ?? t;
  let i = o._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    o._$litPart$ = i = new ut(t.insertBefore(pt(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = globalThis;
let ot = class extends et {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Eo(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return V;
  }
};
ot._$litElement$ = !0, ot.finalized = !0, te.litElementHydrateSupport?.({ LitElement: ot });
const Mo = te.litElementPolyfillSupport;
Mo?.({ LitElement: ot });
(te.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ro = { attribute: !0, type: String, converter: St, reflect: !1, hasChanged: Zt }, Po = (r = Ro, t, e) => {
  const { kind: o, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), o === "accessor") {
    const { name: a } = e;
    return { set(s) {
      const c = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(a, c, r, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, r, s), s;
    } };
  }
  if (o === "setter") {
    const { name: a } = e;
    return function(s) {
      const c = this[a];
      t.call(this, s), this.requestUpdate(a, c, r, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function ee(r) {
  return (t, e) => typeof e == "object" ? Po(r, t, e) : ((o, i, n) => {
    const a = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), a ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(r) {
  return ee({ ...r, state: !0, attribute: !1 });
}
const He = "2026.10.30.27", At = "easy-thermostat-styler-card", Ut = "easy-thermostat-styler-card-editor", Ue = [
  "name",
  "status",
  "current",
  "unit",
  "humidity",
  "pill",
  "wheel_value",
  "wheel_neighbor",
  "bar"
], Oo = [
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
}, je = [
  { type: "hvac" },
  { type: "preset", display: "toggle" },
  { type: "fan_mode", display: "toggle" }
], R = (r) => !!r && typeof r == "object" && !Array.isArray(r);
function Ct(r) {
  if (!(r == null || r === "")) {
    if (typeof r == "number") return Number.isFinite(r) ? r : void 0;
    if (Array.isArray(r)) {
      const t = r.map(Ct).filter((e) => e !== void 0);
      return t.length ? t : void 0;
    }
    if (R(r)) {
      const t = {};
      for (const [e, o] of Object.entries(r)) {
        const i = Ct(o);
        i !== void 0 && (t[e] = i);
      }
      return Object.keys(t).length ? t : void 0;
    }
    return r;
  }
}
const T = (r, t, e) => {
  const o = typeof r == "number" ? r : typeof r == "string" && r.trim() ? Number(r) : NaN;
  return Number.isFinite(o) ? Math.min(e, Math.max(t, o)) : void 0;
};
function Lo(r) {
  if (!R(r) || typeof r.type != "string") return;
  const t = { ...r };
  return "columns" in t && (t.columns = T(t.columns, 0, 12) || void 0), Array.isArray(t.chips) && (t.chips = t.chips.filter((e) => R(e) && typeof e.entity == "string" && e.entity)), Array.isArray(t.items) && (t.items = t.items.filter((e) => R(e) ? e.kind === "mode" ? typeof e.value == "string" && !!e.value && typeof e.source == "string" : e.kind === "device" ? typeof e.entity == "string" && !!e.entity : e.kind === "action" ? !0 : e.kind === "popup" ? typeof e.popup == "string" && !!e.popup : !1 : !1)), t;
}
function jt(r) {
  if (!R(r)) throw new Error("Invalid configuration");
  const t = { ...r };
  if (delete t.test_mode, typeof t.entity != "string" || !t.entity)
    throw new Error("Easy Thermostat Styler Card: set an entity (a climate.* entity).");
  const e = R(t.setpoint) ? { ...t.setpoint } : void 0;
  if (e && ("scale" in e && (e.scale = T(e.scale, 40, 250)), "neighbors" in e && (e.neighbors = T(e.neighbors, 0, 3)), "min_gap" in e && (e.min_gap = T(e.min_gap, 0, 20)), "hide_after" in e && (e.hide_after = T(e.hide_after, 0, 300)), t.setpoint = e), R(t.background)) {
    const o = { ...t.background };
    if ("strength" in o && (o.strength = T(o.strength, 0, 100)), "speed" in o && (o.speed = T(o.speed, 25, 800)), "angle" in o && (o.angle = T(o.angle, -180, 180) || void 0), "variation" in o && (o.variation = T(o.variation, 0, 100) || void 0), "scrim" in o && (o.scrim = T(o.scrim, -60, 60) || void 0), "vignette" in o && (o.vignette = T(o.vignette, 0, 100) || void 0), "grain" in o && (o.grain = T(o.grain, 0, 100) || void 0), "frost_blur" in o && (o.frost_blur = T(o.frost_blur, 0, 40)), "air_max" in o && (o.air_max = T(o.air_max, 0.01, 1e6)), R(o.image)) {
      const i = { ...o.image };
      "blur" in i && (i.blur = T(i.blur, 0, 40) || void 0), "darken" in i && (i.darken = T(i.darken, 0, 90) || void 0), o.image = i;
    }
    R(o.gradient) && "angle" in o.gradient && (o.gradient = { ...o.gradient, angle: T(o.gradient.angle, 0, 360) }), t.background = o;
  }
  if ("frost_blur" in t && (t.frost_blur = T(t.frost_blur, 0, 40)), "popup_auto_close" in t && (t.popup_auto_close = T(t.popup_auto_close, 0, 3600)), Array.isArray(t.popups) && (t.popups = t.popups.filter((o) => R(o) && typeof o.id == "string" && o.id).map((o) => {
    const i = { ...o };
    for (const [n, a, s] of [["width", 0, 4e3], ["height", 0, 4e3], ["auto_close", 0, 3600], ["dim", 0, 100], ["blur", 0, 40]])
      n in i && (i[n] = T(i[n], a, s));
    return i;
  })), R(t.effects)) {
    const o = { ...t.effects };
    "size" in o && (o.size = T(o.size, 2, 60)), "speed" in o && (o.speed = T(o.speed, 0.6, 8)), t.effects = o;
  }
  return Array.isArray(t.sets) && (t.sets = t.sets.map(Lo).filter(Boolean), t.sets.length === 0) ? { ...Ct({ ...t, sets: void 0 }), sets: [] } : Ct(t);
}
function Bo(r, t) {
  return t.split(".").reduce((e, o) => R(e) || Array.isArray(e) ? e[o] : void 0, r);
}
function C(r, t, e) {
  const o = t.split("."), i = (n, a) => {
    const s = Array.isArray(n) ? [...n] : R(n) ? { ...n } : {}, c = o[a];
    if (a === o.length - 1)
      e === void 0 || e === "" || e === null ? Array.isArray(s) ? s.splice(Number(c), 1) : delete s[c] : s[c] = e;
    else {
      const l = i(s[c], a + 1);
      l === void 0 ? delete s[c] : s[c] = l;
    }
    if (!(!Array.isArray(s) && Object.keys(s).length === 0))
      return s;
  };
  return i(r, 0) ?? {};
}
const j = {
  hvac: "Mode",
  preset: "Preset",
  fan_mode: "Fan",
  custom: "Buttons",
  chips: "Devices"
}, No = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  custom: "mdi:gesture-tap-button",
  chips: "mdi:devices"
}, qe = {
  hvac: { list: "hvac_modes", active: null },
  preset: { list: "preset_modes", active: "preset_mode" },
  fan_mode: { list: "fan_modes", active: "fan_mode" }
}, zt = {
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
}, we = {
  heat_cool: "Heat/Cool",
  fan_only: "Fan only",
  off: "Off"
}, Fo = {
  heat: "var(--state-climate-heat-color, #ff8100)",
  cool: "var(--state-climate-cool-color, #2b9af9)",
  heat_cool: "var(--state-climate-heat-cool-color, #ffa600)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan-only-color, #009688)",
  off: "var(--state-climate-off-color, #8a8a8a)"
}, $e = "var(--primary-color, #03a9f4)";
function K(r) {
  if (we[r]) return we[r];
  const t = r.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Io(r, t, e, o) {
  const i = r;
  try {
    if (e === "hvac" && i.formatEntityState) return i.formatEntityState(t, o);
    if (e !== "hvac" && e !== "chips" && i.formatEntityAttributeValue) {
      const n = e === "preset" ? "preset_mode" : "fan_mode", a = i.formatEntityAttributeValue(t, n, o);
      if (a) return a;
    }
  } catch {
  }
  return K(o);
}
function Do(r) {
  return Array.isArray(r.sets) ? r.sets : je;
}
function X(r) {
  return r === "hvac" || r === "preset" || r === "fan_mode";
}
function D(r, t) {
  if (!r || !X(t)) return [];
  const e = r.attributes[qe[t].list];
  return Array.isArray(e) ? e.map(String) : [];
}
function Ve(r, t) {
  if (!t?.length) return r;
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const i of t) r.includes(i) && !e.has(i) && (o.push(i), e.add(i));
  for (const i of r) e.has(i) || o.push(i);
  return o;
}
function Ho(r, t) {
  const e = r.states[t.entity], o = [], i = (n, a, s, c) => {
    const l = qe[n].active, d = l ? String(e.attributes[l] ?? "") : e.state;
    return {
      value: a,
      label: s ?? Io(r, e, n, a),
      icon: c ?? zt[a.toLowerCase()] ?? "mdi:circle-medium",
      active: a === d,
      color: n === "hvac" ? Fo[a] ?? $e : $e
    };
  };
  return Do(t).forEach((n, a) => {
    if (n.hidden) return;
    const s = n.type, c = [];
    if (X(s) && e)
      for (const d of Ve(D(e, s), n.order)) {
        const h = n.options?.[d];
        h?.hide || c.push({ kind: "mode", source: s, option: i(s, d, h?.name, h?.icon) });
      }
    for (const d of n.chips ?? []) d.hide_when_off && ye(r, d.entity) || c.push({ kind: "device", chip: d });
    for (const d of n.items ?? [])
      if (!d.hide)
        if (d.kind === "mode") {
          if (!e || !D(e, d.source).includes(d.value)) continue;
          c.push({ kind: "mode", source: d.source, option: i(d.source, d.value, d.name, d.icon) });
        } else if (d.kind === "device") {
          const { kind: h, hide: f, ...g } = d;
          if (d.hide_when_off && ye(r, d.entity)) continue;
          c.push({ kind: "device", chip: g });
        } else if (d.kind === "popup") {
          const h = t.popups?.find((m) => m.id === d.popup);
          if (!h) continue;
          const f = d.entity && d.show_state !== !1 ? r.states[d.entity] : void 0, g = f?.attributes.unit_of_measurement;
          c.push({
            kind: "popup",
            item: d,
            popup: h,
            label: d.name ?? h.name ?? "Open",
            icon: d.icon ?? h.icon ?? "mdi:card-text-outline",
            value: f ? `${f.state}${g ? ` ${g}` : ""}` : null
          });
        } else
          c.push({ kind: "action", item: d, label: d.name ?? Vt(r, d), icon: d.icon ?? We(d) });
    if (!c.length) return;
    const l = c.flatMap((d) => d.kind === "mode" ? [d.option] : []);
    o.push({
      key: `${s}-${a}`,
      index: a,
      type: s,
      title: n.name ?? j[s],
      zone: n.zone ?? (t.toggles_zone || "bottom"),
      orientation: n.orientation ?? (n.zone === "left" || n.zone === "right" ? "column" : "row"),
      columns: n.columns ?? 0,
      align: n.align ?? (s === "chips" ? "center" : "stretch"),
      // Compact turns full-time sets into toggles; menus are already compact.
      display: n.display === "menu" ? "menu" : t.compact ? "toggle" : n.display ?? "always",
      menuDirection: n.menu_direction ?? qt(n.zone ?? (t.toggles_zone || "bottom")),
      menuShowName: n.menu_show_name ?? !1,
      toggleIcon: n.toggle_icon ?? No[s],
      options: l,
      tiles: c,
      config: n
    });
  }), o;
}
function qt(r) {
  return r === "bottom" ? "up" : r === "left" ? "right" : r === "right" ? "left" : "down";
}
const Uo = /* @__PURE__ */ new Set(["off", "none", "idle", "closed", "false", "no", "standby", "stopped", "not_home", "unavailable", "unknown", ""]);
function ye(r, t) {
  const e = r.states[t];
  if (!e) return !0;
  const o = String(e.state).trim().toLowerCase();
  if (Uo.has(o)) return !0;
  const i = Number(o);
  return o !== "" && Number.isFinite(i) && i <= 0;
}
const jo = { script: "mdi:script-text-play-outline", scene: "mdi:palette-outline", service: "mdi:flash-outline" };
function We(r) {
  return jo[r.action ?? (r.entity?.startsWith("scene.") ? "scene" : r.entity ? "script" : "service")];
}
function Vt(r, t) {
  const e = t.entity ? r.states[t.entity]?.attributes.friendly_name : void 0;
  return typeof e == "string" ? e : t.service ? K(t.service.split(".").pop() ?? t.service) : t.entity ?? "Action";
}
function qo(r) {
  const t = r.action ?? (r.entity?.startsWith("scene.") ? "scene" : r.entity?.startsWith("script.") ? "script" : "service");
  if (t === "script" || t === "scene")
    return r.entity ? { domain: t, service: "turn_on", data: { entity_id: r.entity } } : null;
  const e = /^([a-z0-9_]+)\.([a-z0-9_]+)$/.exec(r.service ?? "");
  return e ? { domain: e[1], service: e[2], data: { ...r.data ?? {}, ...r.entity ? { entity_id: r.entity } : {} } } : null;
}
function Vo(r, t, e) {
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
function A(r) {
  if (typeof r == "number") return Number.isFinite(r) ? r : null;
  if (typeof r == "string" && r.trim() !== "") {
    const t = Number(r);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
const Et = /* @__PURE__ */ new Set(["unavailable", "unknown", "none", ""]);
function Ye(r) {
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
function Wo(r) {
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
function Yo(r, t, e) {
  return r === "off" ? "off" : t === null || e === null ? null : e.heat !== null && (r === "heat" || r === "heat_cool") && t < e.heat ? "heating" : e.cool !== null && (r === "cool" || r === "heat_cool") && t > e.cool ? "cooling" : r === "heat" || r === "cool" || r === "heat_cool" ? "idle" : null;
}
function Go(r, t) {
  if (r === "heat_cool") {
    const o = A(t.target_temp_low), i = A(t.target_temp_high);
    if (o !== null || i !== null) return { heat: o, cool: i };
    const n = A(t.temperature);
    return n === null ? null : { heat: n, cool: null };
  }
  const e = A(t.temperature);
  return e === null ? null : r === "heat" ? { heat: e, cool: null } : r === "cool" ? { heat: null, cool: e } : null;
}
function Ko(r, t) {
  const e = r.states[t.entity], o = r.config?.unit_system?.temperature ?? "°", i = e?.attributes.friendly_name, n = t.name ?? (typeof i == "string" ? i : t.entity);
  if (!e || Et.has(e.state))
    return {
      available: !1,
      name: n,
      currentTemp: null,
      unit: o,
      humidity: null,
      equipment: null,
      mode: "unknown",
      state: e?.state ?? "unavailable",
      setpoints: null
    };
  const a = e.attributes, s = Ye(e.state), c = A(a.current_temperature), l = Go(s, a);
  return {
    available: !0,
    name: n,
    currentTemp: c,
    unit: o,
    humidity: A(a.current_humidity),
    equipment: Wo(a.hvac_action) ?? Yo(s, c, l),
    mode: s,
    state: e.state,
    setpoints: l
  };
}
function U(r, t) {
  if (r === null) return "–";
  const e = t.includes("C"), o = e ? Math.round(r * 2) / 2 : Math.round(r);
  return e && !Number.isInteger(o) ? o.toFixed(1) : String(o);
}
const Xo = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan",
  idle: "Idle",
  off: "Off"
}, xe = [
  ["none", "None", ""],
  ["plasma", "Liquid Plasma", "Soft glowing blobs that drift and blend into each other."],
  ["lava", "Lava Lamp", "Molten blobs that merge and split, rising from a pool."],
  ["aurora", "Aurora", "Ribbons of light flowing across the card."],
  ["flow", "Thermal Flow", "Bands of color streaming up while heating and down while cooling."],
  ["shimmer", "Heat Shimmer / Frost", "Rising heat haze, or cold mist sinking with sparkles."],
  ["particles", "Embers / Snow", "Sparks floating up, or snowflakes drifting down."],
  ["core", "Breathing Core", "A glow behind the temperature that slowly swells."],
  ["mesh", "Mesh Gradient", "Large soft color fields that slowly orbit and blend."],
  ["beam", "Glow Beam", "A soft diagonal beam of light that drifts."]
], Zo = [
  ["heating", "Heating"],
  ["cooling", "Cooling"],
  ["idle_heat", "Idle (heat)"],
  ["idle_cool", "Idle (cool)"],
  ["fan", "Air movement"],
  ["off", "Off"]
], ke = "var(--state-climate-heat-color, #ff8100)", Se = "var(--state-climate-cool-color, #2b9af9)", $t = {
  heating: { main: ke, second: "#d1342a" },
  cooling: { main: Se, second: "#3446d6" },
  idle_heat: { main: ke, second: "#7a3d14" },
  idle_cool: { main: Se, second: "#1b4c86" },
  fan: { main: "var(--state-climate-fan-only-color, #00bfa5)", second: "#3d8fd1" },
  off: { main: "#8a8a92", second: "#3a3a4a" }
}, P = {
  strength: 85,
  speed: 100,
  follow_gap: !0,
  off: "calm",
  quality: "smooth",
  frost_blur: 12
}, Te = {
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
}, Ae = /* @__PURE__ */ new Set(["off", "idle", "closed", "false", "no", "none", "stopped", "standby", "0", "not_running", "clear"]), Jo = /* @__PURE__ */ new Set(["on", "true", "yes", "open", "running", "detected", "active"]), Q = (r) => Math.min(1, Math.max(0.05, r));
function oe(r) {
  return r.background?.air_entity || r.background?.fan_entity || void 0;
}
function Ge(r, t, e) {
  if (!t) return null;
  const o = r.states[t];
  if (!o || Et.has(o.state)) return null;
  const i = String(o.state).trim().toLowerCase(), n = t.split(".")[0];
  if (Ae.has(i)) return null;
  const a = o.attributes;
  if (n === "fan") {
    const d = A(a.percentage);
    return d === null ? 0.6 : d <= 0 ? null : Q(d / 100);
  }
  const s = A(o.state);
  if (s !== null) {
    if (s <= 0) return null;
    if (e) return Q(s / e);
    const d = A(a.min), h = A(a.max);
    if (h !== null && h > (d ?? 0)) return Q((s - (d ?? 0)) / (h - (d ?? 0)));
    if (String(a.unit_of_measurement ?? "").trim() === "%") return Q(s / 100);
    const f = s <= 1 ? 1 : s <= 10 ? 10 : 10 ** Math.ceil(Math.log10(s));
    return Q(s / f);
  }
  if (Te[i] !== void 0) return Te[i];
  const c = Array.isArray(a.options) ? a.options.map((d) => String(d).toLowerCase()).filter((d) => !Ae.has(d) && d !== "auto") : [], l = c.indexOf(i);
  return l >= 0 ? Q((l + 1) / c.length) : Jo.has(i) ? 0.6 : 0.5;
}
function Qo(r, t) {
  const e = r.states[t.entity], o = String(e?.attributes.fan_mode ?? "").toLowerCase(), i = { quiet: 0.2, low: 0.33, medium: 0.6, middle: 0.6, high: 1, max: 1, turbo: 1 };
  if (i[o] !== void 0) return i[o];
  const n = (Array.isArray(e?.attributes.fan_modes) ? e.attributes.fan_modes : []).map((s) => String(s).toLowerCase()).filter((s) => !["auto", "off", "on", "circulate", "diffuse", "focus"].includes(s)), a = n.indexOf(o);
  return a >= 0 && n.length ? (a + 1) / n.length : 0.5;
}
function ti(r, t, e) {
  if (!e.available) return "off";
  if (e.equipment === "heating") return "heating";
  if (e.equipment === "cooling") return "cooling";
  if (e.mode === "fan_only" || e.equipment === "fan" || Ge(r, oe(t), t.background?.air_max) !== null) return "fan";
  if (e.mode === "off") return "off";
  if (e.mode === "cool" || e.mode === "dry" || e.equipment === "drying") return "idle_cool";
  if (e.mode === "heat_cool" && e.setpoints && e.currentTemp !== null) {
    const { heat: o, cool: i } = e.setpoints;
    if (o !== null && i !== null) return e.currentTemp >= (o + i) / 2 ? "idle_cool" : "idle_heat";
    if (i !== null && o === null) return "idle_cool";
  }
  return "idle_heat";
}
function ei(r, t) {
  const e = r.currentTemp, o = r.setpoints, i = t === "heating" ? o?.heat ?? o?.cool : o?.cool ?? o?.heat;
  if (e === null || i === null || i === void 0) return 0.7;
  const n = r.unit.includes("C") ? 3 : 5;
  return Math.round(Math.min(1, Math.abs(i - e) / n) * 10) / 10;
}
const oi = (r) => Math.max(0.1, Math.round(r * 4) / 4);
function ii(r, t, e) {
  const o = t.background ?? {}, i = o.style ?? "none";
  if (i === "none") return null;
  const n = ti(r, t, e);
  if (n === "off" && (o.off ?? P.off) === "none") return null;
  const a = (o.speed ?? P.speed) / 100, s = (o.strength ?? P.strength) / 100;
  let c, l;
  if (n === "heating" || n === "cooling") {
    const f = o.follow_gap ?? P.follow_gap ? ei(e, n) : 0.7;
    c = 0.6 + 1.4 * f, l = 0.6 + 0.4 * f;
  } else n === "fan" ? (c = 0.4 + 2.6 * (Ge(r, oe(t), o.air_max) ?? Qo(r, t)), l = 0.8) : n === "off" ? (c = 0.2, l = 0.35) : (c = 0.35, l = 0.55);
  const d = o.colors?.[n] ?? {}, h = $t[n];
  return {
    style: i,
    state: n,
    dir: n === "fan" ? "swirl" : n === "off" ? "still" : n === "heating" || n === "idle_heat" ? "up" : "down",
    rate: oi(c * a),
    opacity: Math.round(l * s * 100) / 100,
    main: d.main || h.main,
    second: d.second || h.second,
    blades: n === "fan"
  };
}
function Ke(r) {
  return !!(r.frosted ?? r.background?.frosted);
}
function ri(r) {
  const t = r.background ?? {}, e = t.gradient?.stops?.filter(Boolean) ?? [];
  return t.fill === "gradient" && e.length >= 2 ? t.gradient?.type === "radial" ? `radial-gradient(circle at 50% 40%, ${e.join(", ")})` : `linear-gradient(${t.gradient?.angle ?? 135}deg, ${e.join(", ")})` : t.color ?? r.card?.background;
}
function ni(r) {
  return r.replace(/[\\"]/g, (t) => `\\${t}`).replace(/[\n\r]/g, "");
}
function ai(r, t) {
  const e = r.background ?? {}, o = {};
  t && (o["--etc-bg-a"] = t.main, o["--etc-bg-b"] = t.second, o["--etc-bg-op"] = String(t.opacity), o["--bg-rate"] = String(t.rate)), (e.quality ?? P.quality) === "light" && (o["--bg-blur-k"] = "0.6"), t && e.angle && (o["--bg-angle"] = `${e.angle}deg`), t && e.variation && (o["--bg-var"] = String(e.variation)), e.scrim && (o["--bg-scrim"] = String(Math.abs(e.scrim) / 100), o["--bg-scrim-c"] = e.scrim > 0 ? "#000" : "#fff"), e.vignette && (o["--bg-vig"] = String(e.vignette / 100)), e.grain && (o["--bg-grain"] = String(e.grain / 100));
  const i = r.frost_blur ?? e.frost_blur;
  return Ke(r) && i !== void 0 && (o["--frost"] = `${i}px`), e.fill === "image" && e.image?.url && (o["--bg-img"] = `url("${ni(e.image.url)}")`, e.image.blur && (o["--bg-img-blur"] = `${e.image.blur}px`), e.image.darken && (o["--bg-img-dark"] = String(e.image.darken / 100))), o;
}
function Xe(r, t) {
  const e = t === "light", i = {
    plasma: [5, 4, 45, 75, 18, 30],
    lava: [6, 4, 18, 34, 16, 26],
    shimmer: [7, 4, 40, 70, 9, 15],
    particles: [22, 10, 3, 9, 10, 20],
    aurora: [3, 2, 30, 42, 14, 22]
  }[r];
  if (!i) return [];
  const [n, a, s, c, l, d] = i, h = e ? a : n;
  let f = r.length * 9973 + 17;
  const g = () => (f = (f * 1664525 + 1013904223) % 4294967296, f / 4294967296);
  return Array.from({ length: h }, (m, w) => {
    const $ = Math.round(l + g() * (d - l));
    return {
      x: Math.round(8 + g() * 84),
      y: r === "aurora" ? [12, 38, 62][w % 3] : Math.round(10 + g() * 80),
      s: Math.round(s + g() * (c - s)),
      d: $,
      // Spread evenly through the cycle, with a little jitter.
      dl: -Math.round((w + g() * 0.5) / h * $ * 10) / 10
    };
  });
}
const Ze = {
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
function lt(r, t) {
  const e = { ...Ze };
  for (const o of [r, t])
    if (o)
      for (const i of Oo) {
        const n = o[i];
        n !== void 0 && n !== "" && n !== null && (e[i] = n);
      }
  return e;
}
const at = (r) => r ? `${r}px` : void 0;
function Nt(r) {
  const t = {
    "--etc-b-radius": r.radius !== void 0 ? `${r.radius}px` : void 0,
    "--etc-b-height": at(r.height),
    "--etc-b-minw": at(r.min_width),
    "--etc-b-gap": r.gap !== void 0 ? `${r.gap}px` : void 0,
    "--etc-b-icon": at(r.icon_size),
    "--etc-b-fs": at(r.font_size),
    "--etc-b-fw": r.font_weight ? String(r.font_weight) : void 0,
    "--etc-b-igap": r.icon_gap !== void 0 ? `${r.icon_gap}px` : void 0,
    "--etc-b-scale": r.scale !== void 0 && r.scale !== 100 ? String(r.scale / 100) : void 0,
    "--etc-b-bw": r.border_width !== void 0 ? `${r.border_width}px` : void 0,
    "--etc-b-bg": r.background,
    "--etc-b-fg": r.color,
    "--etc-b-bc": r.border_color,
    // Border: None also switches off Frosted Glass's thin rim.
    "--etc-b-ring": r.border_color === "transparent" ? "0px" : void 0,
    "--etc-b-aring": (r.active_border_color ?? r.border_color) === "transparent" ? "0px" : void 0,
    "--etc-b-abg": r.active_background,
    "--etc-b-afg": r.active_color,
    "--etc-b-abc": r.active_border_color
  };
  return ie(t);
}
const si = {
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
function ci(r) {
  const t = {};
  for (const e of Ue) {
    const o = r?.[e];
    if (!o) continue;
    const i = `--etc-t-${si[e]}`;
    t[`${i}-fs`] = at(o.size), t[`${i}-fw`] = o.weight ? String(o.weight) : void 0, t[`${i}-c`] = o.color, t[`${i}-tt`] = o.transform, t[`${i}-ls`] = o.letter_spacing !== void 0 ? `${o.letter_spacing / 100}em` : void 0, t[`${i}-fst`] = o.italic === void 0 ? void 0 : o.italic ? "italic" : "normal", t[`${i}-op`] = o.opacity !== void 0 ? String(o.opacity / 100) : void 0;
  }
  return ie(t);
}
function li(r) {
  const t = r.card ?? {}, e = r.setpoint ?? {};
  return ie({
    "--etc-card-bg": ri(r),
    "--etc-card-bc": t.border_color,
    "--etc-card-bw": t.border_width !== void 0 ? `${t.border_width}px` : void 0,
    "--etc-card-r": t.radius !== void 0 ? `${t.radius}px` : void 0,
    "--etc-card-pad": t.padding !== void 0 ? `${t.padding}px` : void 0,
    "--etc-scale": e.scale !== void 0 ? String(e.scale / 100) : void 0
  });
}
function ie(r) {
  const t = {};
  for (const [e, o] of Object.entries(r)) o !== void 0 && o !== "" && (t[e] = o);
  return t;
}
const pi = `
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
        .etce-row > .etce-clear { flex: none; }
        /* Row sub-panels (a set, a button): same flat section as every other,
           with the row's name in normal case and its actions before the chevron. */
        .etce-rows { display: flex; flex-direction: column; margin-bottom: var(--ltek-sp-3); }
        .etce-rowsub > summary { text-transform: none; letter-spacing: normal; color: var(--ltek-c-text); font-weight: var(--ltek-fw-normal); }
        .etce-rowsub[open] > summary .etce-sname { color: var(--accent-color, var(--ltek-c-accent)); font-weight: var(--ltek-fw-semibold); }
        .etce-rowsub > summary .etce-sctl { margin-left: auto; flex-wrap: nowrap; }
        .etce-rowsub > summary .chev { margin-left: var(--ltek-sp-2); }
        .etce-rowsub.off > summary .etce-sname, .etce-rowsub.off > summary .etce-sicon { opacity: .45; }
        /* An opened set / button is a heading, not a box: no border and no inset,
           so its sections and fields sit exactly where every other panel's do
           (one box deep). It keeps the top divider like a closed flat row. */
        .etce-sub.etce-rowsub[open] { border: 1px solid var(--accent-color, var(--ltek-c-accent)); border-radius: var(--ltek-r-ctrl); margin: var(--ltek-sp-1) 0; }
        .etce-sub.etce-rowsub > .etce-sub-body { padding: 0 var(--ltek-sp-2) var(--ltek-sp-2); }
        .etce-sub.etce-rowsub[open] > summary { border-bottom: 1px solid var(--ltek-c-border-soft); margin-bottom: var(--ltek-sp-2); }
        .etce-test { border: 1px dashed var(--ltek-c-border); border-radius: var(--ltek-r-panel); padding: var(--ltek-sp-2) var(--ltek-sp-6); }
        .etce-test.on { border-color: var(--ltek-c-warning); background: color-mix(in srgb, var(--ltek-c-warning) 8%, transparent); }
        .etce-test .etce-hint { margin: 0 0 var(--ltek-sp-1); }
        .etce-tpl { align-items: flex-start; padding: var(--ltek-sp-3) var(--ltek-sp-1); }
        .etce-tpl-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .etce-tpl-hint { color: var(--ltek-c-muted); font-size: var(--ltek-fs-small); }
        .etce-tpl-tags { display: flex; flex-wrap: wrap; gap: var(--ltek-sp-1); margin-top: 2px; }
        .etce-tpl-tags span { font-size: var(--ltek-fs-tiny); color: var(--ltek-c-label); border: 1px solid var(--ltek-c-border); border-radius: 999px; padding: 0 6px; }
        .etce-tpl .etce-preset { flex: none; align-self: center; }
`, di = "esphome_rf_fan", hi = "custom:rf-fan-ltek";
function Je(r, t) {
  const e = r.entities, o = e?.[t]?.device_id;
  return !e || !o ? [] : Object.values(e).filter((i) => i.device_id === o && i.entity_id !== t).map((i) => i.entity_id);
}
function ui(r, t) {
  const e = Je(r, t).filter((i) => i.startsWith("light.")), o = r.entities ?? {};
  return e.find((i) => o[i]?.platform === di) ?? e[0] ?? null;
}
function fi(r, t) {
  const e = r.entities ?? {}, o = Je(r, t).filter((i) => i.startsWith("sensor."));
  return o.find((i) => e[i]?.translation_key === "sleep_timer") ?? o.find((i) => r.states[i]?.attributes.device_class === "timestamp") ?? null;
}
function gi(r, t) {
  const e = r?.attributes.friendly_name;
  return typeof e == "string" ? e : t;
}
function mi(r, t) {
  const e = r.split(".")[0], i = {
    fan: ["mdi:fan", "mdi:fan-off"],
    light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
    switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
    binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
    sensor: ["mdi:eye", "mdi:eye"]
  }[e ?? ""] ?? ["mdi:circle", "mdi:circle-outline"];
  return t ? i[0] : i[1];
}
function st(r, t, e) {
  const o = r.states[t.entity], i = !!o && !Et.has(o.state), n = i && !["off", "idle", "closed", "standby"].includes(o.state), a = {
    index: e,
    type: t.type,
    entity: t.entity,
    name: t.name ?? gi(o, t.entity),
    icon: t.icon ?? (typeof o?.attributes.icon == "string" ? o.attributes.icon : mi(t.entity, n)),
    on: n,
    available: i,
    state: i ? _i(r, o) : "Unavailable",
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
  if (t.type !== "rf_fan" || !o) return a;
  const s = o.attributes, c = A(s.percentage), l = bi(s), d = n && c !== null && l ? Math.max(1, Math.min(l, Math.round(c * l / 100))) : null, h = ui(r, t.entity), f = fi(r, t.entity), g = f ? r.states[f]?.state : void 0, m = g && !Et.has(g) ? new Date(g) : null, w = typeof s.preset_mode == "string" ? s.preset_mode : "", $ = n && !!w && w !== "normal", x = $ ? Ce(w) : null, b = Array.isArray(s.preset_modes) ? s.preset_modes.filter((y) => Ce(String(y)) !== null).length : 0, _ = t.speed_format ?? "number", k = d === null ? "On" : _ === "fraction" && l ? `${d}/${l}` : _ === "percent" && c !== null ? `${Math.round(c)}%` : String(d);
  return {
    ...a,
    icon: t.icon ?? "mdi:ceiling-fan",
    // In Breeze/natural mode the level is what matters, not the underlying speed.
    state: i ? n ? x !== null ? String(x) : k : "Off" : "Unavailable",
    speed: d,
    speedCount: l,
    naturalLevel: x,
    naturalLevels: b,
    percentage: c,
    direction: s.direction === "reverse" ? "reverse" : s.direction === "forward" ? "forward" : null,
    natural: $,
    lightEntity: h,
    lightOn: !!h && r.states[h]?.state === "on",
    timerEnds: m && !Number.isNaN(m.getTime()) && m.getTime() > Date.now() ? m : null,
    spin: n ? vi(c) : null
  };
}
function bi(r) {
  const t = A(r.speed_count);
  if (t && t > 0) return Math.round(t);
  const e = A(r.percentage_step);
  return e && e > 0 && e < 100 ? Math.round(100 / e) : null;
}
function Ce(r) {
  const t = /^natural[ _]?(\d+)$/i.exec(r.trim());
  return t ? Number(t[1]) : null;
}
function vi(r) {
  const t = Math.min(100, Math.max(1, r ?? 50));
  return Math.round((3 - t / 100 * 2.4) * 100) / 100;
}
function ze(r, t = Date.now()) {
  const e = Math.max(0, Math.round((r.getTime() - t) / 6e4)), o = Math.floor(e / 60);
  return o ? `${o}h${String(e % 60).padStart(2, "0")}` : `${e}m`;
}
function _i(r, t) {
  const e = r;
  try {
    if (e.formatEntityState) return e.formatEntityState(t);
  } catch {
  }
  const o = t.attributes.unit_of_measurement;
  return o ? `${t.state} ${o}` : t.state.charAt(0).toUpperCase() + t.state.slice(1);
}
function wi(r) {
  return r.popup_card ? r.popup_card : r.popup ? null : r.type === "rf_fan" ? { type: hi, fan_entity: r.entity } : null;
}
function $i(r, t) {
  if (t === "toggle_light")
    return r.lightEntity ? { domain: "light", service: "toggle", data: { entity_id: r.lightEntity } } : null;
  const e = r.entity.split(".")[0];
  return ["fan", "light", "switch", "input_boolean", "climate", "humidifier", "media_player", "cover"].includes(e) ? { domain: "homeassistant", service: "toggle", data: { entity_id: r.entity } } : null;
}
const Qe = ["card", "setpoint", "pill", "mode_button", "mode_icon"], yi = {
  card: "Entire card",
  setpoint: "Setpoint value (wheel, stepper or bar handle)",
  pill: "Setpoint pill",
  mode_button: "Mode button",
  mode_icon: "Mode icon"
}, yt = { when: "running", size: 18, speed: 2.4 };
function to(r, t) {
  const e = r.effects?.[t];
  return e || (t === "card" && (r.card?.glow ?? !0) ? "glow" : "none");
}
function xi(r, t) {
  if (!t.available) return null;
  if (t.equipment === "heating") return "heat";
  if (t.equipment === "cooling") return "cool";
  if ((r.effects?.when ?? yt.when) === "mode") {
    if (t.mode === "heat") return "heat";
    if (t.mode === "cool") return "cool";
  }
  return null;
}
function ki(r, t) {
  const e = xi(r, t), o = {};
  if (!e) return o;
  o["fx-on"] = !0, o[`fx-${e}`] = !0;
  for (const i of Qe) {
    const n = to(r, i);
    (n === "glow" || n === "both") && (o[`fx-${i}-glow`] = !0), (n === "pulse" || n === "both") && (o[`fx-${i}-pulse`] = !0);
  }
  return o;
}
function Si(r) {
  const t = r.effects ?? {}, e = {};
  return t.size !== void 0 && (e["--fx-size"] = `${t.size}px`), t.speed !== void 0 && (e["--fx-speed"] = `${t.speed}s`), t.heat_color && (e["--fx-heat"] = t.heat_color), t.cool_color && (e["--fx-cool"] = t.cool_color), e;
}
const eo = [
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
], L = (r = {}) => ({ type: "hvac", ...r }), N = (r = {}) => ({ type: "preset", ...r }), H = (r = {}) => ({ type: "fan_mode", ...r }), Wt = [
  {
    id: "signature",
    name: "Signature",
    hint: "Big light number with the status under it, a pill-centered wheel on the right, tinted mode buttons.",
    icon: "mdi:thermostat",
    tags: ["pill wheel", "status below", "tonal"],
    values: {
      show_name: !1,
      show_pills: !1,
      status_position: "below",
      setpoint: { control: "wheel", wheel_style: "pill" },
      sets: [L(), N({ display: "toggle" }), H({ display: "toggle" })]
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
        L({ zone: "top", align: "center" }),
        N({ display: "menu", zone: "bottom" }),
        H({ display: "menu", zone: "bottom" })
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
      sets: [L({ zone: "top", align: "center" }), N({ display: "toggle" }), H({ display: "toggle" })]
    }
  },
  {
    id: "slim",
    name: "Slim Strip",
    hint: "One short centered row: name and number with a small stepper beside them, every set as a menu.",
    icon: "mdi:view-sequential-outline",
    tags: ["stepper", "menus", "centered"],
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
        L({ display: "menu", menu_show_name: !1 }),
        N({ display: "menu", menu_show_name: !1 }),
        H({ display: "menu", menu_show_name: !1 })
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
      sets: [L({ zone: "left" }), N({ display: "menu", zone: "bottom" }), H({ display: "menu", zone: "bottom" })]
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
      sets: [L(), N({ columns: 4 }), H({ display: "toggle" })]
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
      sets: [L({ align: "center" })]
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
      sets: [L(), N({ display: "menu" }), H({ display: "menu" })]
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
      sets: [L(), N(), H()]
    }
  }
];
Wt.push(
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
      sets: [L({ display: "menu" }), N({ display: "menu" }), H({ display: "menu" })]
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
      sets: [L(), N({ display: "toggle" }), H({ display: "toggle" })]
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
      sets: [L({ align: "center" }), N({ display: "menu" })]
    }
  }
);
function Ti(r) {
  return eo.some((t) => r[t] !== void 0);
}
const Ai = ["order", "options", "name", "toggle_icon"];
function Ci(r, t) {
  const e = r ?? [], o = /* @__PURE__ */ new Set(), i = t.map((a) => {
    const s = e.findIndex((l, d) => !o.has(d) && l.type === a.type);
    if (s < 0) return structuredClone(a);
    o.add(s);
    const c = {};
    for (const l of Ai) e[s][l] !== void 0 && (c[l] = structuredClone(e[s][l]));
    return { ...structuredClone(a), ...c };
  }), n = e.filter((a, s) => a.type === "chips" && !o.has(s));
  return [...structuredClone(n), ...i];
}
function zi(r, t) {
  const e = { ...r };
  for (const a of eo) delete e[a];
  const o = structuredClone(t.values), i = r.setpoint ?? {};
  if (i.min_gap !== void 0 || i.bar?.range_min !== void 0 || i.bar?.range_max !== void 0) {
    const a = { ...o.setpoint ?? {} };
    i.min_gap !== void 0 && (a.min_gap = i.min_gap), (i.bar?.range_min !== void 0 || i.bar?.range_max !== void 0) && (a.bar = { ...a.bar ?? {} }, i.bar?.range_min !== void 0 && (a.bar.range_min = i.bar.range_min), i.bar?.range_max !== void 0 && (a.bar.range_max = i.bar.range_max)), o.setpoint = a;
  }
  const n = r.background;
  return n?.fill === "image" && n.image?.url && !o.background?.fill && (o.background = { ...o.background ?? {}, fill: "image", image: structuredClone(n.image) }), o.sets ? o.sets = Ci(r.sets, o.sets) : r.sets && (o.sets = r.sets), { ...e, ...o };
}
const Ee = ["heating", "cooling", "idle", "fan", "off"], Ei = 6e3, Mi = {
  heating: "Heating",
  cooling: "Cooling",
  idle: "Idle",
  fan: "Fan",
  off: "Off"
};
function Me(r, t) {
  if (!r.available) return r;
  const e = r.setpoints, o = r.unit.includes("C") ? 2 : 4, i = e?.heat ?? e?.cool ?? r.currentTemp ?? 70, n = e?.cool ?? e?.heat ?? r.currentTemp ?? 74;
  switch (t) {
    case "heating":
      return { ...r, equipment: "heating", mode: r.mode === "heat_cool" ? "heat_cool" : "heat", currentTemp: i - o, setpoints: e ?? { heat: i, cool: null } };
    case "cooling":
      return { ...r, equipment: "cooling", mode: r.mode === "heat_cool" ? "heat_cool" : "cool", currentTemp: n + o, setpoints: e ?? { heat: null, cool: n } };
    case "idle": {
      const a = r.mode === "heat" || r.mode === "cool" || r.mode === "heat_cool" ? r.mode : "heat";
      return { ...r, equipment: "idle", mode: a, currentTemp: a === "cool" ? n : i, setpoints: e ?? { heat: i, cool: null } };
    }
    case "fan":
      return { ...r, equipment: "fan", mode: "fan_only" };
    case "off":
      return { ...r, equipment: "off", mode: "off", setpoints: null };
  }
}
const Yt = "etc-test-mode";
function oo() {
  const r = window;
  return r.__etcTest ??= {};
}
function xt(r) {
  return r && oo()[r] || null;
}
function bt(r, t) {
  if (!r) return;
  const e = oo();
  t ? e[r] = t : delete e[r], window.dispatchEvent(new CustomEvent(Yt, { detail: { entity: r } }));
}
function Ri(r, t) {
  return r ? r === "cycle" ? Ee[t % Ee.length] : r : null;
}
var Pi = Object.defineProperty, ft = (r, t, e, o) => {
  for (var i = void 0, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = a(t, e, i) || i);
  return i && Pi(t, e, i), i;
};
const kt = [
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
function Oi(r) {
  const t = r == null ? "" : String(r);
  return t === "" ? "default" : t === "transparent" ? "transparent" : /^#[0-9a-fA-F]{3,8}$/.test(t) ? "custom" : /^var\(/.test(t) && kt.some(([e]) => e === t) ? "theme" : "css";
}
const Li = {
  name: "Name",
  status: "Status (Heating / Cooling)",
  current: "Current temperature",
  unit: "Unit (°)",
  humidity: "Humidity",
  pill: "Setpoint pills",
  wheel_value: "Wheel / stepper value",
  wheel_neighbor: "Wheel next values",
  bar: "Bar labels"
}, Bi = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  custom: "mdi:gesture-tap-button",
  chips: "mdi:devices"
}, Re = { hvac: "Mode", preset: "Preset", fan_mode: "Fan" }, Ft = { mode: "mdi:thermostat", device: "mdi:shape-outline", popup: "mdi:card-text-outline" }, Ni = /* @__PURE__ */ new Set(["a", "an", "the", "and", "or", "nor", "of", "to", "in", "on", "at", "by", "for", "with", "from", "as", "per", "via", "vs"]);
function O(r) {
  let t = !0;
  return r.split(/(\s+)/).map((e) => {
    if (/^\s+$/.test(e) || e === "") return e;
    const o = /^([^A-Za-z]*)([A-Za-z].*)$/.exec(e);
    let i = e;
    if (o) {
      const [, n, a] = o, s = a.toLowerCase(), c = !t && !n.includes("(") && Ni.has(s.replace(/[^a-z]/g, ""));
      i = /[A-Z]/.test(a.slice(1)) || c ? e : n + a.charAt(0).toUpperCase() + a.slice(1);
    }
    return t = /[(:·—/]$/.test(e) || /^[(:·—/]+$/.test(e), i;
  }).join("");
}
const ne = class ne extends ot {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(["thermostat"]), this._set = null, this._chip = null, this._cmode = {}, this._panels = /* @__PURE__ */ new Set();
  }
  setConfig(t) {
    const e = this._config?.entity;
    if (this._config = jt(t), e && e !== this._config.entity) {
      const o = xt(e);
      o && (bt(e, null), bt(this._config.entity, o));
    }
  }
  // ---- writes ---------------------------------------------------------------
  _emit(t) {
    this._config = jt(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  /** Set a path; `undefined`/'' or the built-in default removes the key. */
  _put(t, e, o) {
    if (!this._config) return;
    const i = e === o ? void 0 : e;
    this._emit(C(this._config, t, i));
  }
  _get(t) {
    return Bo(this._config, t);
  }
  /** The configured sets, materialized from the defaults on first edit. */
  _sets() {
    return Array.isArray(this._config?.sets) ? this._config.sets : je.map((t) => ({ ...t }));
  }
  _writeSets(t) {
    this._emit({ ...this._config, sets: t });
  }
  _patchSet(t, e, o, i) {
    const n = this._sets(), a = C(n[t] ?? {}, e, o === i ? void 0 : o);
    n[t] = { ...a, type: n[t].type }, this._writeSets(n);
  }
  // ---- primitives -------------------------------------------------------------
  _toggleOpen(t, e, o = !1) {
    const i = e.currentTarget.open;
    if (i === this._open.has(t)) return;
    const n = new Set(this._open);
    if (i) {
      if (o)
        for (const a of this._panels) a !== t && n.delete(a);
      n.add(t);
    } else n.delete(t);
    this._open = n;
  }
  /** Closing the editor always ends test mode. */
  disconnectedCallback() {
    super.disconnectedCallback(), xt(this._config?.entity) && bt(this._config?.entity, null);
  }
  _panel(t, e, o, i) {
    return this._panels.add(t), p`<details class="etce-sec" ?open=${this._open.has(t)} @toggle=${(n) => this._toggleOpen(t, n, !0)}>
      <summary><ha-icon icon=${e}></ha-icon>${O(o)}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${i}</div>
    </details>`;
  }
  _sub(t, e, o) {
    return p`<details class="etce-sub" ?open=${this._open.has(t)} @toggle=${(i) => this._toggleOpen(t, i)}>
      <summary>${O(e)}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${o()}</div>
    </details>`;
  }
  /** A list row that is itself a sub-panel: the row is the summary (icon,
   *  name, tag, action buttons, chevron) and its settings open right under it,
   *  exactly like every other section. Action buttons don't toggle it. */
  _rowSub(t, e, o, i, n) {
    return p`<details
      class="etce-sub etce-rowsub ${o.cls ?? ""} ${o.off ? "off" : ""}"
      ?open=${t}
      @toggle=${(a) => {
      a.stopPropagation();
      const s = a.currentTarget.open;
      s !== t && e(s);
    }}
    >
      <summary>
        <ha-icon class="etce-sicon" icon=${o.icon}></ha-icon>
        <span class="etce-sname">${o.name}</span>
        ${o.tag ? p`<span class="etce-stag">${O(o.tag)}</span>` : u}
        <span
          class="etce-sctl"
          @click=${(a) => {
      a.target.closest("button") && a.preventDefault();
    }}
          >${i}</span
        >
        <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
      </summary>
      <div class="etce-sub-body">${t ? n() : u}</div>
    </details>`;
  }
  _group(t, e = !1) {
    return p`<div class="etce-group ${e ? "first" : ""}">${O(t)}</div>`;
  }
  _hint(t) {
    return p`<p class="etce-hint">${t}</p>`;
  }
  _check(t, e, o) {
    return p`<label class="etce-check"
      ><input type="checkbox" .checked=${e} @change=${(i) => o(i.target.checked)} />${O(t)}</label
    >`;
  }
  _bool(t, e, o) {
    const i = this._get(t) ?? o;
    return this._check(e, i, (n) => this._put(t, n, o));
  }
  _selectRow(t, e, o, i, n = !1) {
    return p`<div class="etce-row">
      <label class="lbl">${O(t)}</label>
      <select @change=${(a) => i(a.target.value)}>
        ${o.map(([a, s], c) => p`<option value=${a} ?selected=${a === e}>${n && c > 0 ? s : O(s)}</option>`)}
      </select>
    </div>`;
  }
  _select(t, e, o, i) {
    const n = String(this._get(t) ?? i);
    return this._selectRow(e, n, o, (a) => this._put(t, a, i));
  }
  _sliderRow(t, e, o, i, n, a, s, c = (l) => `${l}px`) {
    return p`<div class="etce-row etce-nowrap">
      <label class="lbl">${O(t)}</label>
      <input
        type="range"
        min=${o}
        max=${i}
        step=${n}
        .value=${String(e)}
        @input=${(l) => {
      const d = l.target;
      d.nextElementSibling.textContent = c(Number(d.value));
    }}
        @change=${(l) => s(Number(l.target.value))}
      />
      <span class="etce-val">${c(e)}</span>
      ${a ? p`<button class="etce-reset" title="Back to default" @click=${() => s(void 0)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>` : u}
    </div>`;
  }
  _slider(t, e, o, i, n, a, s) {
    const c = this._get(t);
    return this._sliderRow(e, c ?? a, o, i, n, c !== void 0, (l) => this._put(t, l, a), s);
  }
  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  _colorRow(t, e, o, i, n, a, s = {}) {
    const c = s.transparentValue ?? "transparent";
    let l = this._cmode[t] || (s.transparent && o === c ? "transparent" : Oi(o));
    l === "transparent" && !s.transparent && (l = "css");
    let d = u;
    if (l === "theme")
      d = p`<select @change=${(f) => a(f.target.value)}>
        ${kt.map(([f, g]) => p`<option value=${f} ?selected=${f === o}>${g}</option>`)}
      </select>`;
    else if (l === "custom") {
      const f = o && /^#[0-9a-fA-F]{6}$/.test(o) ? o : n;
      d = p`<input type="color" .value=${f} @change=${(g) => a(g.target.value)} />`;
    } else l === "css" && (d = p`<input
        type="text"
        .value=${o ?? ""}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(f) => a(f.target.value || void 0)}
      />`);
    const h = (f) => {
      this._cmode = { ...this._cmode, [t]: f }, f === "default" ? a(void 0) : f === "transparent" ? a(c) : f === "theme" ? a(kt.some(([g]) => g === o) ? o : kt[0][0]) : f === "custom" ? a(o && /^#[0-9a-fA-F]{6}$/.test(o) ? o : n) : this.requestUpdate();
    };
    return p`<div class="etce-row">
      <label class="lbl">${O(e)}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(f) => h(f.target.value)}>
          ${[
      ["default", i],
      ...s.transparent ? [["transparent", s.transparentLabel ?? "Transparent"]] : [],
      ["theme", "Theme color"],
      ["custom", "Custom color"],
      ["css", "Custom CSS"]
    ].map(
      ([f, g]) => p`<option value=${f} ?selected=${f === l}>${O(g)}</option>`
    )}
        </select>
        ${d}
      </div>
    </div>`;
  }
  _color(t, e, o, i, n = {}) {
    return this._colorRow(t, e, this._get(t), o, i, (a) => this._put(t, a), n);
  }
  _selector(t, e, o, i, n) {
    const a = (n ?? ("icon" in e || /optional/i.test(t))) && o !== void 0 && o !== null && o !== "";
    return p`<div class="etce-row">
      ${t ? p`<label class="lbl">${O(t)}</label>` : u}
      <ha-selector
        .hass=${this.hass}
        .selector=${e}
        .value=${o}
        @value-changed=${(s) => i(s.detail.value)}
      ></ha-selector>
      ${a ? p`<button class="etce-reset etce-clear" title="Clear" @click=${() => i(void 0)}><ha-icon icon="mdi:close-circle-outline"></ha-icon></button>` : u}
    </div>`;
  }
  // ---- render -----------------------------------------------------------------
  render() {
    return this._config ? p`<div class="etce">
      ${this._testBar()}
      ${this._panel("thermostat", "mdi:thermostat", "Thermostat", this._thermostatBody())}
      ${this._panel("templates", "mdi:palette-outline", "Quick Preset Templates", this._templatesBody())}
      ${this._panel("setpoint", "mdi:knob", "Setpoint control", this._setpointBody())}
      ${this._panel("sets", "mdi:gesture-tap-button", "Button sets", this._setsBody())}
      ${this._panel("popups", "mdi:card-text-outline", "Pop-up cards", this._popupsBody())}
      ${this._panel("buttons", "mdi:palette-swatch-outline", "Button style", this._buttonsBody())}
      ${this._panel("text", "mdi:format-text", "Text", this._textBody())}
      ${this._panel("card", "mdi:card-outline", "Card Shape", this._cardBody())}
      ${this._panel("background", "mdi:image-filter-hdr", "Background", this._backgroundBody())}
      ${this._panel("effects", "mdi:shimmer", "Heating & Cooling Effects", this._effectsBody())}
      <div class="etce-foot">Easy Thermostat Styler Card v${He}</div>
    </div>` : u;
  }
  _testBar() {
    const t = xt(this._config.entity) ?? "";
    return p`<div class="etce-test ${t ? "on" : ""}">
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
        bt(this._config.entity, e || null), this.requestUpdate();
      }
    )}
      <p class="etce-hint">
        ${t ? "The card acts as if it were in that state so you can see the effects and moving background. It is not saved with the card and switches off when you close the editor." : "Preview the heating, cooling, idle, fan and off looks (effects and moving background) without waiting for the real thing."}
      </p>
    </div>`;
  }
  _thermostatBody() {
    const t = this._config;
    return p`
      ${this._hint("The climate entity this card controls, and what the center of the card shows.")}
      ${this._selector("Entity", { entity: { domain: "climate" } }, t.entity, (e) => this._put("entity", e || void 0))}
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder="Entity name" @change=${(e) => this._put("name", e.target.value || void 0)} />
      </div>
      ${this._sub("th-show", "Show", () => p`
        <div class="etce-checks">
          ${this._bool("show_name", "Name", v.show_name)} ${this._bool("show_status", "Status", v.show_status)}
          ${this._bool("show_humidity", "Humidity", v.show_humidity)}
          ${this._bool("show_current", "Current temperature", v.show_current)}
          ${this._bool("show_pills", "Setpoint pills", v.show_pills)}
        </div>`)}
      ${this._sub("th-layout", "Layout", () => p`
        ${this._select("core_align", "Align", [["left", "Left"], ["center", "Center"], ["right", "Right"]], v.core_align)}
        ${this._select(
      "status_position",
      "Status",
      [["above", "Above the temperature"], ["beside", "Beside the temperature"], ["below", "Below the temperature"]],
      v.status_position
    )}`)}
    `;
  }
  _templatesBody() {
    const t = (e) => {
      const o = Wt.find((i) => i.id === e);
      Ti(this._config) && !window.confirm(
        `Apply the “${o.name}” template?

It replaces this card’s layout, setpoint control and styling. Your device chips, button order/names/icons and temperature range are kept.`
      ) || this._emit(zi(this._config, o));
    };
    return p`
      ${this._hint("One-click starting points, each with its own setpoint control, button style and layout. Fine-tune anything afterwards; nothing stays linked to the template.")}
      <div class="etce-blist">
        ${Wt.map(
      (e) => p`<div class="etce-brow etce-tpl">
            <ha-icon class="etce-sicon" icon=${e.icon}></ha-icon>
            <div class="etce-tpl-text">
              <span class="etce-sname">${e.name}</span>
              <span class="etce-tpl-hint">${e.hint}</span>
              <span class="etce-tpl-tags">${e.tags.map((o) => p`<span>${o}</span>`)}</span>
            </div>
            <button class="etce-preset" @click=${() => t(e.id)}>Apply</button>
          </div>`
    )}
      </div>
    `;
  }
  _setpointBody() {
    const t = this._get("setpoint.control") ?? v.control, e = t === "wheel" ? "Wheel" : t === "stepper" ? "Stepper" : "Bar";
    return p`
      ${this._hint("How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.")}
      ${this._select(
      "setpoint.control",
      "Control",
      [["wheel", "Wheel"], ["stepper", "− / + stepper"], ["bar", "Setpoint bar"], ["none", "None (display only)"]],
      v.control
    )}
      ${t === "wheel" || t === "stepper" ? this._sub("sp-ctl", e, () => p`
            ${this._group("Placement & size", !0)}
            ${this._select("setpoint.position", "Position", [["left", "Left"], ["right", "Right"], ["center", "Center (below)"]], v.position)}
            ${this._slider("setpoint.scale", "Size", 40, 250, 5, v.scale, (o) => `${o}%`)}
            ${this._hint("Size scales the controls only; the current temperature has its own size under Text.")}
            ${this._group("Buttons")}
            ${this._nudgeSelect(t)}
            ${t === "wheel" ? p`${this._group("Wheel")}
                ${this._slider("setpoint.neighbors", "Next values shown", 0, 3, 1, v.neighbors, (o) => String(o))}
                ${this._select("setpoint.wheel_style", "Center value", [["bubble", "Bubble"], ["pill", "Pill (like the setpoint pills)"]], v.wheel_style)}` : u}`) : u}
      ${t === "bar" ? this._barBody() : u}
      ${t !== "none" ? this._sub("sp-reveal", "Show controls", () => this._revealBody()) : u}
      ${this._sub("sp-hc", "Heat / Cool", () => p`
        ${this._slider("setpoint.min_gap", "Minimum gap", 0, 10, 0.5, this._defaultGap(), (o) => `${o}°`)}
        ${this._hint("In Heat / Cool the two setpoints stay at least this far apart; dragging one pushes the other.")}`)}
    `;
  }
  _nudgeSelect(t) {
    const e = t === "stepper" ? "around" : "right", o = this._get("setpoint.nudge"), i = o === "beside" ? "right" : o ?? e, n = [
      ["right", "Right"],
      ["left", "Left"],
      ["above", "Both above"],
      ["below", "Both below"],
      ["stacked", "+ above, − below"],
      ["around", "− left, + right"],
      ["hidden", "Hidden"]
    ];
    return this._selectRow("− / + buttons", i, n, (a) => this._put("setpoint.nudge", a === e ? void 0 : a));
  }
  _revealBody() {
    const t = (this._get("setpoint.reveal") ?? v.reveal) === "tap", e = this._get("setpoint.hide_after") ?? v.hide_after;
    return p`
      ${this._select("setpoint.reveal", "Controls", [["always", "Always shown"], ["tap", "Shown when tapped"]], v.reveal)}
      ${this._hint(
      t ? "The controls stay folded away until you tap. They fold away again after the time below without use." : "Choose “Shown when tapped” to keep the card calm: just the temperature and setpoint until you want to change it."
    )}
      ${t ? p`
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
      (o) => this._put("setpoint.hide_after", o, v.hide_after),
      (o) => o ? `${o}s` : "Stay open"
    )}
          ` : u}
    `;
  }
  /** A bar-side choice: above / below for a horizontal bar, left / right for a vertical one. */
  _sidePlacement(t, e, o, i) {
    const n = String(this._get("setpoint.bar.position") ?? v.bar.position), a = n === "left" || n === "right", s = a ? [["left", "Left of the bar"], ["right", "Right of the bar"]] : [["above", "Above the bar"], ["below", "Below the bar"]], c = a ? i : o, l = String(this._get(`setpoint.bar.${t}`) ?? c);
    return this._selectRow(e, s.some(([d]) => d === l) ? l : c, s, (d) => this._put(`setpoint.bar.${t}`, d, c));
  }
  _defaultGap() {
    return (this.hass?.config?.unit_system?.temperature ?? "").includes("C") ? 1.5 : 3;
  }
  _barBody() {
    return p`${this._sub("sp-bar", "Bar", () => this._barLook())}
      ${this._sub("sp-flags", "Value flags", () => this._barFlags())}
      ${this._sub("sp-markers", "Ticks, markers & range", () => this._barMarkers())}`;
  }
  _barFlags() {
    const t = v.bar;
    return p`
      ${this._bool("setpoint.bar.flags", "Show value flags on the handles", t.flags)}
      ${this._get("setpoint.bar.flags") ?? t.flags ? p`${this._sidePlacement("flag_position", "Flag placement", "above", "left")}
          ${this._color("setpoint.bar.flag_color", "Flag color", "Heat / cool color", "#ff8100", { transparent: !0 })}
          ${this._color("setpoint.bar.flag_text_color", "Flag text color", "White", "#ffffff")}` : u}
    `;
  }
  _barMarkers() {
    const t = v.bar;
    return p`
      ${this._group("Ticks & markers", !0)}
      ${this._bool("setpoint.bar.show_current", "Current temperature marker", t.show_current)}
      ${this._slider("setpoint.bar.ticks", "Tick every", 0, 10, 0.5, t.ticks, (e) => e ? `${e}°` : "Off")}
      ${this._slider("setpoint.bar.labels", "Label every", 0, 20, 1, t.labels, (e) => e ? `${e}°` : "Off")}
      ${(this._get("setpoint.bar.ticks") ?? t.ticks) || (this._get("setpoint.bar.labels") ?? t.labels) ? this._sidePlacement("tick_position", "Ticks & labels", "below", "right") : u}
      ${this._group("Range")}
      ${this._hint("Leave empty to use the thermostat’s own limits.")}
      ${["range_min", "range_max"].map(
      (e) => p`<div class="etce-row">
          <label class="lbl">${e === "range_min" ? "From" : "To"}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${e}`) ?? "")}
            @change=${(o) => {
        const i = o.target.value;
        this._put(`setpoint.bar.${e}`, i === "" ? void 0 : Number(i));
      }}
          />
        </div>`
    )}
    `;
  }
  _barLook() {
    const t = v.bar, e = this._get("setpoint.bar.look") ?? t.look, o = this._get("setpoint.bar.stops") ?? ["#2b9af9", "#7ccf8a", "#ff8100"];
    return p`
      ${this._group("Placement", !0)}
      ${this._select(
      "setpoint.bar.position",
      "Position",
      [["below", "Below (horizontal)"], ["above", "Above (horizontal)"], ["left", "Left (vertical)"], ["right", "Right (vertical)"]],
      t.position
    )}
      ${["left", "right"].includes(String(this._get("setpoint.bar.position") ?? "")) ? this._slider("setpoint.bar.length", "Height", 100, 400, 10, 200) : u}
      ${this._slider("setpoint.bar.height", "Thickness", 6, 40, 1, t.height)}
      ${this._group("Colors")}
      ${this._select("setpoint.bar.look", "Look", [["zones", "Heat / comfort / cool zones"], ["gradient", "Gradient"]], t.look)}
      ${e === "gradient" ? p`<div class="etce-row">
            <label class="lbl">Gradient (Cold → Hot)</label>
            <div class="etce-stops">
              ${o.map(
      (i, n) => p`<input
                  type="color"
                  .value=${i}
                  @change=${(a) => {
        const s = [...o];
        s[n] = a.target.value, this._put("setpoint.bar.stops", s);
      }}
                />`
    )}
            </div>
          </div>` : p`${this._color("setpoint.bar.heat_color", "Heat zone", "Theme heat", "#ff8100", { transparent: !0 })}
          ${this._color("setpoint.bar.comfort_color", "Comfort zone", "Green", "#4caf50", { transparent: !0 })}
          ${this._color("setpoint.bar.cool_color", "Cool zone", "Theme cool", "#2b9af9", { transparent: !0 })}`}
      ${this._group("Handles")}
      ${this._select(
      "setpoint.bar.handle_shape",
      "Handle",
      [["round", "Round"], ["square", "Square"], ["diamond", "Diamond"], ["line", "Line"]],
      t.handle_shape
    )}
      ${this._color("setpoint.bar.handle_color", "Handle fill", "White", "#ffffff", { transparent: !0 })}
      ${this._color("setpoint.bar.handle_border_color", "Handle border", "Heat / cool color", "#ffffff", { transparent: !0, transparentLabel: "None", transparentValue: "none" })}
    `;
  }
  // ---- button sets --------------------------------------------------------------
  _setsBody() {
    const t = this._sets(), e = this.hass?.states[this._config.entity], o = (i) => {
      const n = t.filter((s) => s.type === "custom" || s.type === "chips").length + 1, a = [...t, i === "custom" ? { type: i, name: `Buttons ${n}` } : { type: i }];
      this._set = a.length - 1, this._writeSets(a);
    };
    return p`
      ${this._hint("Groups of buttons. Each set picks its side of the card, its layout, and how it shows: full time, behind a toggle button, or as an expandable menu.")}
      <div class="etce-addbar">
        ${["hvac", "preset", "fan_mode", "custom"].map(
      (i) => p`<button class="etce-add" @click=${() => o(i)}>+ ${j[i]}</button>`
    )}
      </div>
      <div class="etce-rows">
        ${t.map((i, n) => {
      const a = (i.items?.length ?? 0) + (i.chips?.length ?? 0), s = X(i.type) ? D(e, i.type).length > 0 || a > 0 : !0, c = X(i.type) && t.filter((d) => d.type === i.type).length === 1, l = this._set === n;
      return this._rowSub(
        l,
        (d) => this._set = d ? n : null,
        {
          icon: Bi[i.type],
          name: i.name ?? j[i.type],
          tag: s ? `${i.zone ?? this._defaultZone()} · ${this._displayTag(i)}` : "not on this entity",
          off: i.hidden,
          cls: "set-row"
        },
        p`<button class="etce-act" title="Move up" ?disabled=${n === 0} @click=${() => this._moveSet(n, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="etce-act" title="Move down" ?disabled=${n === t.length - 1} @click=${() => this._moveSet(n, 1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="etce-act" title="Duplicate" @click=${() => this._duplicateSet(n)}>
                <ha-icon icon="mdi:content-copy"></ha-icon>
              </button>
              <button class="etce-act etce-eye ${i.hidden ? "off" : ""}" title=${i.hidden ? "Show" : "Hide"} @click=${() => this._patchSet(n, "hidden", !i.hidden, !1)}>
                <ha-icon icon=${i.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
              </button>
              <button class="etce-act del" title=${c ? "Built-in set: hide it instead" : "Delete"} ?disabled=${c} @click=${() => this._deleteSet(n)}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon>
              </button>`,
        () => this._setEditor(i, n)
      );
    })}
      </div>
      ${this._sub("sets-layout", "Layout & spacing", () => p`
        ${this._group("Location", !0)}
        ${this._select("toggles_zone", "Default location", [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], v.toggles_zone)}
        ${this._hint("Where sets go when they have no Side of their own, and where the toggle buttons sit. A set’s own Side always wins.")}
        ${this._group("Centering")}
        ${this._bool("zones.centered", "Keep the main area centered", !0)}
        ${this._hint("Balances the left and right sides so the temperature and controls stay on the card’s center, whatever sits beside them.")}
        ${this._group("Distance from the main area")}
        ${this._slider("zones.gap", "All sides", 0, 48, 1, 12)}
        ${["top", "bottom", "left", "right"].map((i) => {
      const n = this._get(`zones.${i}`), a = this._get("zones.gap") ?? 12;
      return this._sliderRow(i.charAt(0).toUpperCase() + i.slice(1), n ?? a, 0, 48, 1, n !== void 0, (s) => this._put(`zones.${i}`, s));
    })}
        ${this._hint("Top, Bottom, Left and Right override “All sides” for one side; ↺ puts it back.")}`)}
      ${this._sub("sets-compact", "Compact", () => p`
        ${this._bool("compact", "Put every full-time set behind a toggle button", !1)}
        ${this._hint("Keeps the card small until you open a set. Sets shown as expandable menus are already compact and are not changed.")}`)}
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
    const o = this._sets(), i = (c, l) => `${c.name ?? j[c.type]} (#${l + 1})`, n = o.map((c, l) => [c, l]).filter(([, c]) => c !== e), a = t.row_with ? o.findIndex((c) => c.id === t.row_with) : -1, s = (c) => {
      const l = o.map((h) => ({ ...h }));
      if (c === "") delete l[e].row_with;
      else {
        const h = Number(c);
        let f = l[h].id;
        if (!f) {
          const g = new Set(l.map((w) => w.id).filter(Boolean));
          let m = 1;
          for (; g.has(`set${m}`); ) m++;
          f = `set${m}`, l[h].id = f;
        }
        l[e].row_with = f;
      }
      const d = new Set(l.map((h) => h.row_with).filter(Boolean));
      for (const h of l) h.id && !d.has(h.id) && delete h.id;
      this._writeSets(l);
    };
    return p`${this._selectRow(
      "Share a row with",
      a >= 0 ? String(a) : "",
      [["", "Own row"], ...n.map(([c, l]) => [String(l), i(c, l)])],
      s,
      !0
    )}
      ${a >= 0 ? this._hint("Sits in that set’s row, on its side of the card; this set’s own Side is ignored.") : u}`;
  }
  _moveSet(t, e) {
    const o = this._sets(), i = t + e;
    i < 0 || i >= o.length || ([o[t], o[i]] = [o[i], o[t]], this._set === t && (this._set = i), this._writeSets(o));
  }
  _duplicateSet(t) {
    const e = this._sets(), o = structuredClone(e[t]);
    delete o.id, o.name = `${e[t].name ?? j[e[t].type]} copy`, e.splice(t + 1, 0, o), this._set = t + 1, this._writeSets(e);
  }
  _deleteSet(t) {
    const e = this._sets();
    e.splice(t, 1), this._set = null, this._writeSets(e);
  }
  _setEditor(t, e) {
    const o = t.zone ?? this._defaultZone(), i = o === "left" || o === "right", n = (a, s, c) => this._patchSet(e, a, s, c);
    return p`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${j[t.type]} @change=${(a) => n("name", a.target.value || void 0)} />
      </div>
      ${this._sub(`set-${e}-buttons`, "Buttons in this set", () => this._buttonsEditor(t, e))}
      ${this._sub(`set-${e}-place`, "Placement", () => p`
      ${this._group("Side & layout", !0)}
      ${this._selectRow(
      "Side",
      t.zone ?? "",
      [["", `Default (${this._defaultZone()})`], ["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]],
      (a) => n("zone", a || void 0)
    )}
      ${this._selectRow(
      "Orientation",
      t.orientation ?? (i ? "column" : "row"),
      [["row", "Row"], ["column", "Column"]],
      (a) => n("orientation", a, i ? "column" : "row")
    )}
      ${this._selectRow(
      "Align",
      t.align ?? (t.type === "chips" ? "center" : "stretch"),
      [["stretch", "Fill width"], ["start", "Start"], ["center", "Center"], ["end", "End"]],
      (a) => n("align", a, t.type === "chips" ? "center" : "stretch")
    )}
      ${(t.align ?? "stretch") === "stretch" && t.type !== "chips" ? this._sliderRow("Columns", t.columns ?? 0, 0, 8, 1, t.columns !== void 0, (a) => n("columns", a, 0), (a) => a ? String(a) : "Auto") : u}
      ${this._group("Row")}
      ${this._shareRow(t, e)}`)}
      ${this._sub(`set-${e}-display`, "Display", () => p`
      ${this._selectRow(
      "Show",
      t.display ?? "always",
      [["always", "Full time"], ["toggle", "Behind a toggle button"], ["menu", "Expandable menu"]],
      (a) => n("display", a, "always")
    )}
      ${t.display === "menu" ? p`${this._hint("One button shows the current value; tap it to open the full list.")}
          ${this._selectRow(
      "Opens",
      t.menu_direction ?? qt(o),
      [["down", "Down"], ["up", "Up"], ["right", "Right"], ["left", "Left"]],
      (a) => n("menu_direction", a, qt(o))
    )}
          ${this._check("Show the set name on the button", t.menu_show_name ?? !1, (a) => n("menu_show_name", a, !1))}` : u}
      ${(t.display ?? "always") === "toggle" || this._config.compact && t.display !== "menu" ? this._selector("Toggle icon", { icon: {} }, t.toggle_icon, (a) => n("toggle_icon", a || void 0)) : u}`)}
      ${this._sub(`set-${e}-style`, "Button style for this set", () => p`${this._buttonStyleEditor(`sets.${e}.style`, !0, e)}${this._copyStyle(e)}`)}
    `;
  }
  _optionsEditor(t, e) {
    const o = this.hass?.states[this._config.entity], i = Ve(D(o, t.type), t.order);
    if (!i.length) return this._hint("The thermostat offers nothing for this set right now.");
    const n = (a, s) => {
      const c = [...i], l = a + s;
      l < 0 || l >= c.length || ([c[a], c[l]] = [c[l], c[a]], this._patchSet(e, "order", c));
    };
    return p`${this._hint("Built-in buttons from the thermostat: order, hide, rename and re-icon them. They can’t be deleted.")}
      <div class="etce-rows">
        ${i.map((a, s) => {
      const c = t.options?.[a] ?? {}, l = `${e}:${a}`;
      return this._rowSub(
        this._chip === l,
        (d) => this._chip = d ? l : null,
        { icon: c.icon ?? zt[a.toLowerCase()] ?? "mdi:circle-medium", name: c.name ?? K(a), off: c.hide, cls: "item-row" },
        p`<button class="etce-act" title="Move up" ?disabled=${s === 0} @click=${() => n(s, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button class="etce-act" title="Move down" ?disabled=${s === i.length - 1} @click=${() => n(s, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button class="etce-act etce-eye ${c.hide ? "off" : ""}" title=${c.hide ? "Show" : "Hide"} @click=${() => this._patchSet(e, `options.${a}.hide`, !c.hide, !1)}>
                <ha-icon icon=${c.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
              </button>`,
        () => p`<div class="etce-row">
                <label class="lbl">Label</label>
                <input type="text" .value=${c.name ?? ""} placeholder=${K(a)} @change=${(d) => this._patchSet(e, `options.${a}.name`, d.target.value || void 0)} />
              </div>
              ${this._selector("Icon", { icon: {} }, c.icon, (d) => this._patchSet(e, `options.${a}.icon`, d || void 0))}
              ${this._copyTo(e, { kind: "mode", source: t.type, value: a, name: c.name, icon: c.icon })}`
      );
    })}
      </div>`;
  }
  /** The set's added buttons (older device-only sets are read as device buttons). */
  _itemsOf(t) {
    return [...(t.chips ?? []).map((e) => ({ kind: "device", ...e })), ...t.items ?? []];
  }
  /** Write a set's buttons. An older device-only set becomes a Buttons set that
   *  keeps its chip look, so nothing changes on the card. */
  _setItems(t, e, o) {
    const i = { ...t[e] };
    delete i.chips, o.length ? i.items = o : delete i.items, i.type === "chips" && (i.type = "custom", i.style?.look || (i.style = { ...i.style ?? {}, look: "chip" }), i.align ??= "center"), t[e] = i;
  }
  _writeItems(t, e) {
    const o = this._sets();
    this._setItems(o, t, e), this._writeSets(o);
  }
  /** "Copy to set": add a copy of this button to another set. */
  _copyTo(t, e) {
    const i = this._sets().map((n, a) => [n, a]).filter(([, n]) => n !== t);
    return i.length ? this._selectRow(
      "Copy to set",
      "",
      [["", "Choose a set…"], ...i.map(([n, a]) => [String(a), `${n.name ?? j[n.type]} (#${a + 1})`])],
      (n) => {
        if (n === "") return;
        const a = this._sets(), s = Number(n), c = structuredClone(e);
        delete c.hide, this._setItems(a, s, [...this._itemsOf(a[s]), c]), this._writeSets(a);
      },
      !0
    ) : p``;
  }
  _buttonsEditor(t, e) {
    const o = this.hass?.states[this._config.entity], i = this._itemsOf(t), n = ["hvac", "preset", "fan_mode"].filter((s) => D(o, s).length), a = (s, c = !1) => {
      let l = null;
      if (s === "popup") {
        const d = this._config.popups?.[0];
        if (!d) {
          const h = this._sets();
          this._setItems(h, e, [...i, { kind: "popup", popup: "popup1" }]), this._chip = `item:${e}:${i.length}`, this._emit({ ...this._config, sets: h, popups: [{ id: "popup1", name: "Pop-up 1" }] });
          return;
        }
        l = { kind: "popup", popup: d.id };
      } else if (s === "mode") {
        const d = X(t.type) && n.includes(t.type) ? t.type : n[0];
        d && (l = { kind: "mode", source: d, value: D(o, d)[0] });
      } else if (s === "device") {
        const h = (c ? this._firstRfFan() : void 0) || Object.keys(this.hass?.states ?? {}).find((f) => f.startsWith(c ? "fan." : "sensor."));
        h && (l = { kind: "device", type: c ? "rf_fan" : "entity", entity: h });
      } else {
        const d = Object.keys(this.hass?.states ?? {}).find((h) => h.startsWith("script."));
        l = d ? { kind: "action", action: "script", entity: d } : { kind: "action", action: "service" };
      }
      l && (this._chip = `item:${e}:${i.length}`, this._writeItems(e, [...i, l]));
    };
    return p`
      ${X(t.type) ? p`${this._group("From the thermostat", !0)}${this._optionsEditor(t, e)}${this._group("Added buttons")}` : u}
      ${this._hint(
      X(t.type) ? "Add any button to this set: another mode, a device or sensor, or an action." : "Add mode buttons, devices and sensors (shown with their value), or actions (script, scene or service)."
    )}
      <div class="etce-addbar">
        ${n.length ? p`<button class="etce-add" @click=${() => a("mode")}>+ Mode button</button>` : u}
        <button class="etce-add" @click=${() => a("device")}>+ Device / sensor</button>
        <button class="etce-add" @click=${() => a("device", !0)}>+ RF fan</button>
        <button class="etce-add" @click=${() => a("action")}>+ Action</button>
        <button class="etce-add" @click=${() => a("popup")}>+ Pop-up card</button>
      </div>
      <div class="etce-rows">
        ${i.map((s, c) => {
      const l = `item:${e}:${c}`, d = this._chip === l, h = ($, x, b) => {
        const _ = [...i], k = C(_[c], $, x === b ? void 0 : x);
        _[c] = { ...k, kind: s.kind }, s.kind === "device" && (_[c].entity ||= s.entity), this._writeItems(e, _);
      }, f = ($) => {
        const x = [...i], b = c + $;
        b < 0 || b >= x.length || ([x[c], x[b]] = [x[b], x[c]], this._writeItems(e, x));
      }, { name: g, icon: m, tag: w } = this._itemSummary(s);
      return this._rowSub(
        d,
        ($) => this._chip = $ ? l : null,
        { icon: m, name: g, tag: w, off: s.hide, cls: "item-row" },
        p`<button class="etce-act" title="Move up" ?disabled=${c === 0} @click=${() => f(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button class="etce-act" title="Move down" ?disabled=${c === i.length - 1} @click=${() => f(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button class="etce-act" title="Duplicate" @click=${() => {
          const $ = [...i];
          $.splice(c + 1, 0, structuredClone(s)), this._writeItems(e, $);
        }}><ha-icon icon="mdi:content-copy"></ha-icon></button>
              <button class="etce-act etce-eye ${s.hide ? "off" : ""}" title=${s.hide ? "Show" : "Hide"} @click=${() => h("hide", !s.hide, !1)}>
                <ha-icon icon=${s.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
              </button>
              <button class="etce-act del" title="Delete" @click=${() => this._writeItems(e, i.filter(($, x) => x !== c))}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon>
              </button>`,
        () => p`${this._itemFields(s, h, lt(this._config.buttons, t.style).content)}${this._copyTo(e, s)}`
      );
    })}
      </div>
    `;
  }
  _popupItemFields(t, e, o, i = "icon_label") {
    const n = this._config.popups ?? [], a = i !== "label", s = i !== "icon", c = n.find((l) => l.id === t.popup);
    return p`${this._selectRow(
      "Opens",
      t.popup,
      [...c ? [] : [[t.popup, `${t.popup} (missing)`]], ...n.map((l) => [l.id, l.name ?? l.id])],
      (l) => e("popup", l),
      !0
    )}
      ${n.length ? u : this._hint("Create a pop-up under Pop-up Cards first.")}
      ${o(c?.name ?? "Open")}
      ${this._hint(`Empty label = the pop-up’s name (${c?.name ?? "—"}). Empty icon = the pop-up’s icon.`)}
      <div class="etce-checks">
        ${this._check("Show icon", t.show_icon ?? a, (l) => e("show_icon", l, a))}
        ${this._check("Show label", t.show_name ?? s, (l) => e("show_name", l, s))}
      </div>
      ${s ? u : this._hint("This set shows icons only (Button Style → Content); Show Label turns the label on for this button.")}
      ${this._group("Value on the button")}
      ${this._selector("Entity (optional)", { entity: {} }, t.entity, (l) => e("entity", l || void 0))}
      ${t.entity ? this._check("Show value", t.show_state ?? !0, (l) => e("show_state", l, !0)) : u}
      ${this._hint("Shows that entity’s value on the button, e.g. how many windows are open.")}`;
  }
  /** Add an empty pop-up and return its id. */
  _newPopup() {
    const t = [...this._config.popups ?? []], e = new Set(t.map((n) => n.id));
    let o = 1;
    for (; e.has(`popup${o}`); ) o++;
    const i = `popup${o}`;
    return t.push({ id: i, name: `Pop-up ${o}` }), this._emit({ ...this._config, popups: t }), i;
  }
  _popupsBody() {
    const t = this._config, e = t.popups ?? [], o = (n) => this._sets().reduce((a, s) => a + (s.items ?? []).filter((c) => c.kind === "popup" && c.popup === n || c.kind === "device" && c.popup === n).length + (s.chips ?? []).filter((c) => c.popup === n).length, 0), i = (n) => this._emit({ ...t, popups: n.length ? n : void 0 });
    return p`
      ${this._hint("Cards that open in a pop-up from any button. Define a card once here, then add an “Open card” button for it to any set, or pick it as a device button’s pop-up.")}
      ${this._sliderRow(
      "Auto-close after",
      t.popup_auto_close ?? 30,
      0,
      300,
      5,
      t.popup_auto_close !== void 0,
      (n) => this._put("popup_auto_close", n, 30),
      (n) => n ? `${n}s` : "Never"
    )}
      ${this._hint("Default for every pop-up and expandable menu: it closes after this long without use. Each pop-up can override it.")}
      <div class="etce-addbar"><button class="etce-add" @click=${() => {
      this._chip = `pop:${e.length}`, this._newPopup();
    }}>+ Pop-up</button></div>
      <div class="etce-rows">
        ${e.map((n, a) => {
      const s = `pop:${a}`, c = o(n.id);
      return this._rowSub(
        this._chip === s,
        (l) => this._chip = l ? s : null,
        { icon: n.icon ?? "mdi:card-text-outline", name: n.name ?? n.id, tag: `${n.size ?? "medium"} · ${c} button${c === 1 ? "" : "s"}`, cls: "pop-row" },
        p`<button class="etce-act" title="Preview" @click=${() => window.dispatchEvent(new CustomEvent("etc-popup-preview", { detail: { entity: t.entity, popup: n } }))}>
                <ha-icon icon="mdi:eye-outline"></ha-icon>
              </button>
              <button class="etce-act" title="Duplicate" @click=${() => {
          const l = new Set(e.map((f) => f.id));
          let d = 1;
          for (; l.has(`popup${d}`); ) d++;
          const h = [...e];
          h.splice(a + 1, 0, { ...structuredClone(n), id: `popup${d}`, name: `${n.name ?? n.id} copy` }), i(h);
        }}><ha-icon icon="mdi:content-copy"></ha-icon></button>
              <button class="etce-act del" title="Delete" @click=${() => {
          c && !window.confirm(`${c} button${c === 1 ? " uses" : "s use"} this pop-up. Delete it anyway? Those buttons will be hidden.`) || i(e.filter((l, d) => d !== a));
        }}><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>`,
        () => this._popupFields(n, a)
      );
    })}
      </div>
    `;
  }
  _popupFields(t, e) {
    const o = (a, s, c) => {
      const l = [...this._config.popups ?? []], d = C(l[e], a, s === c ? void 0 : s);
      l[e] = { ...d, id: t.id }, this._emit({ ...this._config, popups: l });
    }, i = t.size ?? "medium", n = this._config.popup_auto_close ?? 30;
    return p`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${t.id} @change=${(a) => o("name", a.target.value || void 0)} />
      </div>
      ${this._selector("Icon", { icon: {} }, t.icon, (a) => o("icon", a || void 0))}
      ${this._group("Size")}
      ${this._selectRow(
      "Size",
      i,
      [["small", "Small (next to its button)"], ["medium", "Medium"], ["large", "Large"], ["full", "Full screen"]],
      (a) => o("size", a, "medium")
    )}
      ${i === "small" ? this._selectRow("Opens", t.direction ?? "", [["", "Automatic"], ["down", "Down"], ["up", "Up"], ["right", "Right"], ["left", "Left"]], (a) => o("direction", a || void 0)) : u}
      ${this._sliderRow("Width", t.width ?? 0, 0, 1600, 10, t.width !== void 0, (a) => o("width", a || void 0), (a) => a ? `${a}px` : "Auto")}
      ${this._sliderRow("Height", t.height ?? 0, 0, 1200, 10, t.height !== void 0, (a) => o("height", a || void 0), (a) => a ? `${a}px` : "Auto")}
      ${this._group("Behavior")}
      ${this._check("Title bar with close button", t.title ?? !0, (a) => o("title", a, !0))}
      ${this._sliderRow(
      "Auto-close after",
      t.auto_close ?? n,
      0,
      300,
      5,
      t.auto_close !== void 0,
      (a) => o("auto_close", a),
      (a) => a ? `${a}s` : "Never"
    )}
      ${this._hint(`Unset follows the default above (${n ? `${n}s` : "never"}). Tap outside or press Escape to close at any time.`)}
      ${this._group("Backdrop")}
      ${this._sliderRow("Dim", t.dim ?? (i === "small" ? 15 : 55), 0, 100, 5, t.dim !== void 0, (a) => o("dim", a), (a) => `${a}%`)}
      ${this._sliderRow("Blur", t.blur ?? 0, 0, 40, 1, t.blur !== void 0, (a) => o("blur", a))}
      ${this._group("Card")}
      ${this._hint("Paste any card’s YAML here, e.g. a whole Easy Entity Styler card.")}
      ${this._selector("", { object: {} }, t.card, (a) => o("card", a && Object.keys(a).length ? a : void 0))}
    `;
  }
  _itemSummary(t) {
    if (t.kind === "mode") return { name: t.name ?? K(t.value), icon: t.icon ?? zt[t.value.toLowerCase()] ?? Ft.mode, tag: Re[t.source] };
    if (t.kind === "device") {
      const e = this.hass?.states[t.entity];
      return {
        name: t.name ?? e?.attributes.friendly_name ?? t.entity,
        icon: t.icon ?? (t.type === "rf_fan" ? "mdi:ceiling-fan" : Ft.device),
        tag: t.type === "rf_fan" ? "RF fan" : "Device"
      };
    }
    if (t.kind === "popup") {
      const e = this._config.popups?.find((o) => o.id === t.popup);
      return { name: t.name ?? e?.name ?? "Pop-up", icon: t.icon ?? e?.icon ?? Ft.popup, tag: e ? "Pop-up" : "Pop-up (missing)" };
    }
    return { name: t.name ?? (this.hass ? Vt(this.hass, t) : "Action"), icon: t.icon ?? We(t), tag: "Action" };
  }
  _itemFields(t, e, o = "icon_label") {
    const i = (a) => p`<div class="etce-row">
        <label class="lbl">Label</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${a} @change=${(s) => e("name", s.target.value || void 0)} />
      </div>
      ${this._selector("Icon", { icon: {} }, t.icon, (s) => e("icon", s || void 0))}`;
    if (t.kind === "mode") {
      const a = this.hass?.states[this._config.entity], s = ["hvac", "preset", "fan_mode"].filter((l) => D(a, l).length || l === t.source), c = D(a, t.source);
      return p`${this._selectRow("Sets", t.source, s.map((l) => [l, Re[l]]), (l) => {
        const d = D(a, l)[0];
        e("source", l), d && !D(a, l).includes(t.value) && e("value", d);
      })}
        ${this._selectRow("Value", t.value, (c.includes(t.value) ? c : [t.value, ...c]).map((l) => [l, K(l)]), (l) => e("value", l))}
        ${i(K(t.value))}`;
    }
    if (t.kind === "popup") return this._popupItemFields(t, e, i, o);
    if (t.kind === "action") {
      const a = t.action ?? (t.entity?.startsWith("scene.") ? "scene" : t.entity ? "script" : "service");
      return p`${this._selectRow("Runs", a, [["script", "A script"], ["scene", "A scene"], ["service", "A service"]], (s) => e("action", s))}
        ${a === "script" || a === "scene" ? this._selector(a === "script" ? "Script" : "Scene", { entity: { domain: a } }, t.entity, (s) => e("entity", s || void 0)) : p`<div class="etce-row">
                <label class="lbl">Service</label>
                <input type="text" .value=${t.service ?? ""} placeholder="light.turn_on" @change=${(s) => e("service", s.target.value.trim() || void 0)} />
              </div>
              ${this._selector("Target (optional)", { entity: {} }, t.entity, (s) => e("entity", s || void 0))}
              ${this._hint("Extra service data (optional).")}
              ${this._selector("", { object: {} }, t.data, (s) => e("data", s && Object.keys(s).length ? s : void 0))}`}
        ${i(this.hass ? Vt(this.hass, t) : "Action")}`;
    }
    const n = t;
    return p`
      ${this._selector("Entity", { entity: n.type === "rf_fan" ? { domain: "fan" } : {} }, n.entity, (a) => a && e("entity", a))}
      ${i("Entity name")}
      <div class="etce-checks">
        ${this._check("Show name", n.show_name ?? !0, (a) => e("show_name", a, !0))}
        ${this._check("Show value", n.show_state ?? !0, (a) => e("show_state", a, !0))}
      </div>
      ${this._check("Hide when off, 0 or none", !!n.hide_when_off, (a) => e("hide_when_off", a, !1))}
      ${this._hint("Hides this button while the value is off, 0, none, idle, closed or unavailable, and shows it again when there is something to show.")}
      ${n.type === "rf_fan" ? this._rfFanInfo(n) : u}
      ${n.type === "rf_fan" ? this._selectRow(
      "Speed shows as",
      n.speed_format ?? "number",
      [["number", "Number (4)"], ["fraction", "Fraction (4/10)"], ["percent", "Percent (40%)"]],
      (a) => e("speed_format", a, "number")
    ) : u}
      ${this._selectRow(
      "Tap",
      n.tap ?? (n.type === "rf_fan" ? "popup" : "more-info"),
      [["popup", "Open card in pop-up"], ["more-info", "More info"], ["toggle", "Toggle"], ["none", "Nothing"]],
      (a) => e("tap", a, n.type === "rf_fan" ? "popup" : "more-info")
    )}
      ${this._selectRow(
      "Hold",
      n.hold ?? (n.type === "rf_fan" ? "toggle" : "none"),
      [["toggle", "Toggle"], ...n.type === "rf_fan" ? [["toggle_light", "Toggle light"]] : [], ["more-info", "More info"], ["none", "Nothing"]],
      (a) => e("hold", a, n.type === "rf_fan" ? "toggle" : "none")
    )}
      ${(n.tap ?? (n.type === "rf_fan" ? "popup" : "more-info")) === "popup" ? p`${this._selectRow(
      "Pop-up",
      n.popup ?? "",
      [["", "Its own card (below)"], ...(this._config.popups ?? []).map((a) => [a.id, a.name ?? a.id])],
      (a) => e("popup", a || void 0),
      !0
    )}
          ${n.popup ? u : p`${this._hint(n.type === "rf_fan" ? "Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan." : "Pop-up card config (any card).")}
              ${this._selector("", { object: {} }, n.popup_card, (a) => e("popup_card", a && Object.keys(a).length ? a : void 0))}`}` : u}
    `;
  }
  /** Copy this set's button style to other sets. */
  _copyStyle(t) {
    const o = this._sets().map((i, n) => [i, n]).filter(([, i]) => i !== t);
    return o.length ? p`${this._group("Copy style")}
      ${this._selectRow(
      "Copy this style to",
      "",
      [["", "Choose…"], ["all", "All other sets"], ...o.map(([i, n]) => [String(n), `${i.name ?? j[i.type]} (#${n + 1})`])],
      (i) => {
        if (i === "") return;
        const n = this._sets(), a = i === "all" ? o.map(([, l]) => l) : [Number(i)], s = a.filter((l) => n[l].style && Object.keys(n[l].style).length);
        if (s.length && !window.confirm(`Replace the button style of ${s.length === 1 ? "that set" : `${s.length} sets`}?`)) {
          this.requestUpdate();
          return;
        }
        const c = n[t].style;
        for (const l of a) {
          const d = { ...n[l] };
          c && Object.keys(c).length ? d.style = structuredClone(c) : delete d.style, n[l] = d;
        }
        this._writeSets(n);
      },
      !0
    )}
      ${this._hint("Gives the chosen sets exactly this set’s button style (a set with no style of its own follows the card’s Button style).")}` : p``;
  }
  /** What was detected for this fan (read-only hint). */
  _rfFanInfo(t) {
    if (!this.hass?.states[t.entity]) return u;
    const e = st(this.hass, t, 0), o = [
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
    const t = this._config, e = !!(t.frosted ?? t.background?.frosted), o = (n, a) => {
      let s = C(t, "background.frosted", void 0);
      if (s = C(s, "background.frost_blur", void 0), n === "frosted") {
        s = C(s, "frosted", a ? !0 : void 0);
        const c = t.frost_blur ?? t.background?.frost_blur;
        s = C(s, "frost_blur", a ? c : void 0);
      } else
        s = C(s, "frosted", !0), s = C(s, "frost_blur", a === P.frost_blur ? void 0 : a);
      this._emit(s);
    }, i = t.frost_blur ?? t.background?.frost_blur;
    return p`${this._hint("The look of every button. Each button set can override any of these under “Button style for this set”.")}
      ${this._buttonStyleEditor("buttons", !1)}
      ${this._sub("bs-frost", "Frosted glass", () => p`
        ${this._check("Frosted glass controls", e, (n) => o("frosted", n))}
        ${this._hint("Buttons, menus, chips, toggles, setpoint pills and the wheel’s setpoint bubble turn see-through with a blur. Best over a moving background or an image.")}
        ${e ? this._sliderRow("Blur", i ?? P.frost_blur, 0, 40, 1, i !== void 0, (n) => o("frost_blur", n)) : u}`)}`;
  }
  _buttonStyleEditor(t, e, o) {
    const i = (e ? this._sets()[o]?.style : this._config.buttons) ?? {}, n = e ? lt(this._config.buttons, void 0) : Ze, a = e ? "Card default" : "Built-in", s = (g, m) => {
      e ? this._patchSet(o, `style.${g}`, m) : this._put(`${t}.${g}`, m);
    }, c = (g, m, w) => {
      const $ = String(n[g] ?? ""), x = w.find(([b]) => b === $)?.[1] ?? $;
      return this._selectRow(m, String(i[g] ?? ""), [["", `${a} (${x})`], ...w], (b) => s(g, b || void 0));
    }, l = (g, m, w, $, x, b = 1, _ = 0) => {
      const k = Number(n[g] ?? _), y = i[g];
      return this._sliderRow(m, y ?? k, w, $, b, y !== void 0, (z) => s(g, z), x);
    }, d = (g, m, w) => this._colorRow(`${t}.${g}`, m, i[g], e ? "Card default" : "Automatic", w, ($) => s(g, $), {
      // Backgrounds can be see-through; borders can be switched off.
      transparent: /background|border/.test(String(g)),
      transparentLabel: /border/.test(String(g)) ? "None" : "Transparent"
    });
    let h = !0;
    const f = (g, m, w) => {
      if (!e) return this._sub(`bs-${g}`, m, w);
      const $ = p`${this._group(m, h)}${w()}`;
      return h = !1, $;
    };
    return p`
      ${f("look", "Look & size", () => p`
      ${this._selectRow(
      "Look",
      String(i.look ?? ""),
      [
        ["", e ? `Card default (${this._config.buttons?.look === "chip" ? "Chip" : this._config.buttons?.look === "button" ? "Button" : o !== void 0 && this._sets()[o]?.type === "chips" ? "Chip" : "Button"})` : "Built-in (Chips for device sets, buttons for the rest)"],
        ["button", "Button"],
        ["chip", "Chip"]
      ],
      (g) => s("look", g || void 0)
    )}
      ${l("scale", "Scale", 50, 200, (g) => `${g}%`, 5, 100)}
      ${this._hint(e ? "Scales every button in this set. Card default comes from Button style." : "Scales every button in every set. Each set can override it under “Button style for this set”.")}`)}
      ${f("shape", "Shape", () => p`
      ${c("variant", "Style", [["tonal", "Tonal (tinted)"], ["filled", "Filled"], ["outlined", "Outlined"], ["ghost", "Ghost"]])}
      ${l("radius", "Corner radius", 0, 40)} ${l("height", "Min height", 0, 120)} ${l("min_width", "Min width", 0, 200)}
      ${l("gap", "Spacing", 0, 32)} ${l("border_width", "Border width", 0, 6)}`)}
      ${f("content", "Content", () => p`
      ${c("content", "Show", [["icon_label", "Icon and label"], ["icon", "Icon only"], ["label", "Label only"]])}
      ${c("icon_position", "Icon", [["top", "Above label"], ["left", "Left of label"]])}
      ${l("icon_size", "Icon size", 10, 48)} ${l("font_size", "Text size", 8, 28)}
      ${l("icon_gap", "Icon to text spacing", 0, 30, void 0, 1, 4)}
      ${c("font_weight", "Text weight", [["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"]])}
      `)}
      ${f("inactive", "Colors: inactive", () => p`
      ${d("background", "Background", "#2a2a2a")} ${d("color", "Text & icon", "#cccccc")} ${d("border_color", "Border", "#555555")}`)}
      ${f("active", "Colors: active", () => p`
      ${this._hint("Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.")}
      ${d("active_background", "Background", "#ff8100")} ${d("active_color", "Text & icon", "#ffffff")}
      ${d("active_border_color", "Border", "#ff8100")}`)}
    `;
  }
  // ---- text ---------------------------------------------------------------------
  _textBody() {
    return p`${this._hint("Size, weight, color and case for each piece of text. Unset keeps the built-in look.")}
      ${Ue.map((t) => this._sub(`text-${t}`, Li[t], () => this._textRole(t)))}`;
  }
  _textRole(t) {
    const e = `text.${t}`, o = this._get(e) ?? {};
    return p`
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
    const t = this._config, e = [["none", "Off"], ["glow", "Glow"], ["pulse", "Pulse"], ["both", "Glow + pulse"]], o = (i, n) => {
      let a = C(t, `effects.${i}`, n === "none" && i !== "card" ? void 0 : n);
      i === "card" && (a = C(a, "card.glow", void 0), n === "glow" && (a = C(a, "effects.card", void 0))), this._emit(a);
    };
    return p`
      ${this._hint("Make parts of the card glow or pulse in the heat color while heating and the cool color while cooling.")}
      ${this._sub("fx-parts", "Parts", () => p`${Qe.map((i) => this._selectRow(yi[i], to(t, i), e, (n) => o(i, n)))}`)}
      ${this._sub("fx-when", "When", () => p`
      ${this._select(
      "effects.when",
      "Active",
      [["running", "Only while heating or cooling"], ["mode", "Whenever the mode is Heat or Cool"]],
      yt.when
    )}
      ${this._hint("“Only while heating or cooling” follows what the system is doing right now; the other also lights up while it waits at the setpoint.")}`)}
      ${this._sub("fx-look", "Look", () => p`
      ${this._slider("effects.size", "Glow size", 2, 60, 1, yt.size)}
      ${this._slider("effects.speed", "Pulse speed", 0.6, 8, 0.2, yt.speed, (i) => `${i.toFixed(1)}s`)}
      ${this._color("effects.heat_color", "Heating color", "Theme heat", "#ff8100")}
      ${this._color("effects.cool_color", "Cooling color", "Theme cool", "#2b9af9")}`)}
    `;
  }
  _backgroundBody() {
    const t = this._config, e = t.background ?? {}, o = e.fill ?? "color", i = e.style ?? "none", n = (c, l, d) => this._put(`background.${c}`, l, d), a = (c) => {
      let l = C(t, "card.background", void 0);
      l = C(l, "background.color", c), this._emit(l);
    }, s = (c) => `${c}%`;
    return p`
      ${this._hint("The card’s surface. A moving background follows what the thermostat is doing: heat rises, cold sinks, a fan swirls, idle barely drifts.")}
      ${this._sub("bg-base", "Base fill", () => p`
      ${this._selectRow("Fill", o, [["color", "Color"], ["gradient", "Gradient"], ["image", "Image"]], (c) => n("fill", c, "color"))}
      ${o === "color" ? this._colorRow("background.color", "Color", e.color ?? t.card?.background, "Theme card", "#1c1c1c", a, { transparent: !0 }) : u}
      ${o === "gradient" ? this._gradientEditor() : u}
      ${o === "image" ? this._imageEditor() : u}`)}
      ${this._sub("bg-move", "Moving background", () => p`
      ${this._selectRow("Style", i, xe.map(([c, l]) => [c, l]), (c) => n("style", c, "none"))}
      ${i !== "none" ? p`
            ${this._hint(xe.find(([c]) => c === i)?.[2] ?? "")}
            ${this._group("Motion")}
            ${this._slider("background.strength", "Strength", 0, 100, 5, P.strength, s)}
            ${this._slider("background.speed", "Speed", 25, 800, 5, P.speed, s)}
            ${this._slider("background.angle", "Angle", -180, 180, 5, 0, (c) => `${c}°`)}
            ${this._hint("Tilts the motion: 0° goes straight up (heating) or down (cooling); 30° leans it to the right.")}
            ${this._slider("background.variation", "Color variation", 0, 100, 5, 0, s)}
            ${this._hint("How much each shape’s color strays from the state colors, e.g. some more orange, some more red, while heating.")}
            ${this._bool("background.follow_gap", "Follow the work", P.follow_gap)}
            ${this._hint("Moves faster and glows stronger the further the room is from the setpoint, and settles as it gets close.")}
            ${this._select("background.off", "When off", [["calm", "A calm, near-still background"], ["none", "No moving background"]], P.off)}
            ${this._select("background.quality", "Quality", [["smooth", "Smooth"], ["light", "Light (older tablets)"]], P.quality)}
            ${this._group("Sync to Air Movement")}
            ${this._selector("Entity", { entity: {} }, e.air_entity ?? e.fan_entity, (c) => {
      let l = C(t, "background.fan_entity", void 0);
      l = C(l, "background.air_entity", c || void 0), this._emit(l);
    })}
            ${this._hint("Optional. Any entity that says how much air is moving: a fan (%), speed levels, on/off, low / medium / high, or an airflow sensor. While it shows air moving, the background swirls at that speed. Without one, Fan Only mode uses the thermostat’s own fan speed.")}
            ${e.air_entity || e.fan_entity ? p`<div class="etce-row">
                    <label class="lbl">Full Speed at</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Automatic"
                      .value=${e.air_max !== void 0 ? String(e.air_max) : ""}
                      @change=${(c) => {
      const l = c.target.value;
      n("air_max", l === "" ? void 0 : Number(l));
    }}
                    />
                  </div>
                  ${this._hint("For raw numbers only, e.g. 1200 for a 1200 CFM airflow sensor. Leave empty and percentages, number entities and speed names work on their own.")}` : u}
          ` : u}`)}
      ${i !== "none" ? this._sub("bg-colors", "Colors by state", () => this._bgColors()) : u}
      ${this._sub("bg-finish", "Finish", () => p`
      ${this._slider("background.scrim", "Lighten / darken", -60, 60, 5, 0, (c) => c > 0 ? `Darken ${c}%` : c < 0 ? `Lighten ${-c}%` : "None")}
      ${this._slider("background.vignette", "Vignette", 0, 100, 5, 0, s)}
      ${this._slider("background.grain", "Grain", 0, 100, 5, 0, s)}`)}
    `;
  }
  _gradientEditor() {
    const t = this._config.background?.gradient ?? {}, e = t.stops?.length ? [...t.stops] : ["#1c2a3a", "#3a1c2a"], o = (i) => this._put("background.gradient.stops", i);
    return p`
      ${this._selectRow("Type", t.type ?? "linear", [["linear", "Linear"], ["radial", "Radial"]], (i) => this._put("background.gradient.type", i, "linear"))}
      ${(t.type ?? "linear") === "linear" ? this._slider("background.gradient.angle", "Angle", 0, 360, 5, 135, (i) => `${i}°`) : u}
      ${e.map(
      (i, n) => p`${this._colorRow(`bg-stop-${n}`, `Color ${n + 1}`, i, "Card color", "#1c2a3a", (a) => {
        const s = [...e];
        s[n] = a ?? "var(--card-background-color)", o(s);
      }, { transparent: !0 })}
          ${e.length > 2 ? p`<div class="etce-row"><button class="etce-act del" title="Remove color" @click=${() => o(e.filter((a, s) => s !== n))}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon></button></div>` : u}`
    )}
      ${e.length < 4 ? p`<div class="etce-addbar"><button class="etce-add" @click=${() => o([...e, "#000000"])}>+ Color</button></div>` : u}
    `;
  }
  _imageEditor() {
    const t = this._config.background?.image ?? {};
    return p`
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
  _bgColors() {
    const t = this._config.background?.colors ?? {};
    return p`${this._hint("Two colors per state. Unset follows your theme’s heat, cool and fan colors.")}
      ${Zo.map(
      ([e, o], i) => p`<div class="etce-group ${i === 0 ? "first" : ""}">${O(o)}</div>
          ${this._colorRow(
        `bg-${e}-main`,
        "Main",
        t[e]?.main,
        "Automatic",
        /^#/.test($t[e].main) ? $t[e].main : e.includes("cool") ? "#2b9af9" : e === "fan" ? "#00bfa5" : "#ff8100",
        (n) => this._put(`background.colors.${e}.main`, n),
        { transparent: !0 }
      )}
          ${this._colorRow(`bg-${e}-second`, "Second", t[e]?.second, "Automatic", $t[e].second, (n) => this._put(`background.colors.${e}.second`, n), { transparent: !0 })}`
    )}`;
  }
  _cardBody() {
    return p`
      ${this._hint("The card’s border, corners and padding. Its fill and moving background are under Background.")}
      ${this._color("card.border_color", "Border", "Theme", "#444444", { transparent: !0, transparentLabel: "None" })}
      ${this._slider("card.border_width", "Border width", 0, 8, 1, 1)}
      ${this._slider("card.radius", "Corner radius", 0, 48, 1, 16)}
      ${this._slider("card.padding", "Padding", 0, 40, 1, 16)}
    `;
  }
};
ne.styles = [
  Be(pi),
  Xt`
      :host { display: block; }
    `
];
let W = ne;
ft([
  ee({ attribute: !1 })
], W.prototype, "hass");
ft([
  M()
], W.prototype, "_config");
ft([
  M()
], W.prototype, "_open");
ft([
  M()
], W.prototype, "_set");
ft([
  M()
], W.prototype, "_chip");
customElements.get(Ut) || customElements.define(Ut, W);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const io = { ATTRIBUTE: 1 }, ro = (r) => (...t) => ({ _$litDirective$: r, values: t });
let no = class {
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
const ao = "important", Fi = " !" + ao, S = ro(class extends no {
  constructor(r) {
    if (super(r), r.type !== io.ATTRIBUTE || r.name !== "style" || r.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return Object.keys(r).reduce((t, e) => {
      const o = r[e];
      return o == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`;
    }, "");
  }
  update(r, [t]) {
    const { style: e } = r.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const o of this.ft) t[o] == null && (this.ft.delete(o), o.includes("-") ? e.removeProperty(o) : e[o] = null);
    for (const o in t) {
      const i = t[o];
      if (i != null) {
        this.ft.add(o);
        const n = typeof i == "string" && i.endsWith(Fi);
        o.includes("-") || n ? e.setProperty(o, n ? i.slice(0, -11) : i, n ? ao : "") : e[o] = i;
      }
    }
    return V;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = ro(class extends no {
  constructor(r) {
    if (super(r), r.type !== io.ATTRIBUTE || r.name !== "class" || r.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(r) {
    return " " + Object.keys(r).filter((t) => r[t]).join(" ") + " ";
  }
  update(r, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), r.strings !== void 0 && (this.nt = new Set(r.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t) t[o] && !this.nt?.has(o) && this.st.add(o);
      return this.render(t);
    }
    const e = r.element.classList;
    for (const o of this.st) o in t || (e.remove(o), this.st.delete(o));
    for (const o in t) {
      const i = !!t[o];
      i === this.st.has(o) || this.nt?.has(o) || (i ? (e.add(o), this.st.add(o)) : (e.remove(o), this.st.delete(o)));
    }
    return V;
  }
}), Ii = 1, Di = 0.5, Hi = 3, Ui = 1.5;
function ji(r) {
  return r.includes("C") ? Di : Ii;
}
function qi(r, t) {
  return t.setpoint?.min_gap ?? (r.includes("C") ? Ui : Hi);
}
function so(r) {
  return Math.round(r * 100) / 100;
}
function G(r, t, e, o) {
  let i = o > 0 ? so(Math.round(r / o) * o) : r;
  return t !== null && i < t && (i = t), e !== null && i > e && (i = e), i;
}
function vt(r, t, e, o, i) {
  return { setpoint: r, value: G(t, e, o, i), min: e, max: o, step: i };
}
function Dt(r, t, e) {
  return { available: !1, unit: r, mode: t, heat: null, cool: null, active: e, minGap: 0 };
}
function Vi(r, t) {
  const e = r.config?.unit_system?.temperature ?? "°", o = r.states[t.entity], i = o ? Ye(o.state) : "unknown";
  if (!o || i !== "heat" && i !== "cool" && i !== "heat_cool")
    return Dt(e, i, "heat");
  const n = o.attributes, a = ji(e), s = qi(e, t), c = A(n.min_temp), l = A(n.max_temp);
  if (i === "heat_cool") {
    const h = A(n.target_temp_low), f = A(n.target_temp_high);
    if (h === null && f === null) return Dt(e, i, "cool");
    const g = h !== null ? vt("heat", h, c, l, a) : null, m = f !== null ? vt("cool", f, c, l, a) : null;
    return { available: !0, unit: e, mode: i, heat: g, cool: m, active: m ? "cool" : "heat", minGap: s };
  }
  const d = A(n.temperature);
  return d === null ? Dt(e, i, i === "heat" ? "heat" : "cool") : i === "heat" ? {
    available: !0,
    unit: e,
    mode: i,
    heat: vt("heat", d, c, l, a),
    cool: null,
    active: "heat",
    minGap: s
  } : {
    available: !0,
    unit: e,
    mode: i,
    heat: null,
    cool: vt("cool", d, c, l, a),
    active: "cool",
    minGap: s
  };
}
function Lt(r) {
  return r[r.active];
}
function re(r, t) {
  const e = Lt(r);
  if (!e) return r;
  const o = r.mode === "heat_cool" ? r[e.setpoint === "cool" ? "heat" : "cool"] : null;
  if (!o) {
    const s = { ...e, value: G(t, e.min, e.max, e.step) };
    return { ...r, [e.setpoint]: s };
  }
  const i = r.minGap;
  let n = G(t, e.min, e.max, e.step), a = o.value;
  if (e.setpoint === "cool") {
    if (n - o.value < i) {
      let s = n - i;
      o.min !== null && s < o.min && (s = o.min, n = G(o.min + i, e.min, e.max, e.step)), a = G(s, o.min, o.max, o.step);
    }
  } else if (o.value - n < i) {
    let s = n + i;
    o.max !== null && s > o.max && (s = o.max, n = G(o.max - i, e.min, e.max, e.step)), a = G(s, o.min, o.max, o.step);
  }
  return {
    ...r,
    [e.setpoint]: { ...e, value: n },
    [o.setpoint]: { ...o, value: a }
  };
}
function tt(r, t) {
  const e = Lt(r);
  return e ? re(r, e.value + t * e.step) : r;
}
function Pe(r, t) {
  return Lt(r) ? re(r, t) : r;
}
function Wi(r, t, e, o) {
  const i = Lt(r);
  if (!i) return r;
  const n = Math.round(e / o);
  return re(r, t + n * i.step);
}
function nt(r, t) {
  return r[t] === null ? r : { ...r, active: t };
}
function Yi(r, t) {
  const e = [];
  for (let o = -t; o <= t; o++) {
    const i = so(r.value + o * r.step);
    r.min !== null && i < r.min || r.max !== null && i > r.max || e.push(i);
  }
  return e;
}
function Gi(r, t) {
  if (!r.available) return null;
  const e = { entity_id: t };
  if (r.mode === "heat_cool")
    r.heat && (e.target_temp_low = r.heat.value), r.cool && (e.target_temp_high = r.cool.value);
  else {
    const o = r.heat ?? r.cool;
    if (!o) return null;
    e.temperature = o.value;
  }
  return { domain: "climate", service: "set_temperature", data: e };
}
const Ki = 600, Xi = 8e3;
function Zi(r, t) {
  return r.heat?.value === t.heat?.value && r.cool?.value === t.cool?.value;
}
class Ji {
  constructor(t, e, o) {
    this.entityId = t, this.send = e, this.changed = o, this.edit = null, this.dragging = !1, this.pending = null, this.writeTimer = null, this.reconcileTimer = null, this.latest = null;
  }
  /** Feed the model derived from the latest hass. */
  sync(t) {
    if (this.latest = t, this.dragging || this.pending && t.mode === this.pending.mode && !Zi(t, this.pending))
      return;
    const e = this.edit && t[this.edit.active] ? this.edit.active : t.active;
    this.edit = { ...t, active: e }, this.pending = null, this.clearReconcile();
  }
  /** Live preview without scheduling a write (used during a drag). */
  preview(t) {
    this.edit = t, this.changed();
  }
  commit(t) {
    this.edit = t, this.pending = t, this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = setTimeout(() => this.flush(), Ki), this.changed();
  }
  /** Change only which setpoint is edited (no write). */
  select(t) {
    this.edit = t, this.pending && (this.pending = { ...this.pending, active: t.active }), this.changed();
  }
  flush() {
    this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = null;
    const t = this.edit ? Gi(this.edit, this.entityId()) : null;
    t && this.send(t), this.clearReconcile(), this.reconcileTimer = setTimeout(() => {
      if (this.reconcileTimer = null, this.pending = null, this.latest) {
        const e = this.edit?.active;
        this.edit = { ...this.latest, active: e && this.latest[e] ? e : this.latest.active }, this.changed();
      }
    }, Xi);
  }
  /** On disconnect: send anything still queued, drop timers. */
  dispose() {
    this.writeTimer && this.flush(), this.clearReconcile(), this.pending = null;
  }
  clearReconcile() {
    this.reconcileTimer && clearTimeout(this.reconcileTimer), this.reconcileTimer = null;
  }
}
function Ht(r, t) {
  const e = r.heat ?? r.cool, o = r.unit.includes("C");
  let i = t?.range_min ?? e?.min ?? (o ? 10 : 50), n = t?.range_max ?? e?.max ?? (o ? 32 : 90);
  n > i || (n = i + (o ? 10 : 20));
  for (const a of [r.heat, r.cool])
    a && (i = Math.min(i, a.value), n = Math.max(n, a.value));
  return { min: i, max: n };
}
function Mt(r, t) {
  return Math.min(1, Math.max(0, (r - t.min) / (t.max - t.min)));
}
function Qi(r, t) {
  return t.min + Math.min(1, Math.max(0, r)) * (t.max - t.min);
}
function tr(r, t, e) {
  const o = t > 0 ? t : e > 0 ? e : 0;
  if (o <= 0) return [];
  const i = [], n = Math.ceil(r.min / o) * o;
  if ((r.max - n) / o > 200) return [];
  for (let a = n; a <= r.max + 1e-9; a = Math.round((a + o) * 1e3) / 1e3) {
    const s = e > 0 && Math.abs(a / e - Math.round(a / e)) < 1e-6;
    i.push({ value: a, fraction: Mt(a, r), label: s });
  }
  return i;
}
function er(r, t, e) {
  if (!r.heat) return "cool";
  if (!r.cool) return "heat";
  const o = Math.abs(Mt(r.heat.value, e) - t), i = Math.abs(Mt(r.cool.value, e) - t);
  return Math.abs(o - i) < 1e-6 ? r.active : o < i ? "heat" : "cool";
}
const or = Xt`
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
     say which parts glow or pulse. --fx-c is the active color. */
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

  /* Setpoint value: the wheel center, the stepper number, the bar handle. */
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
  /* Keep the main area centered: both side columns as wide as the wider side
     (--side-w is measured), so the temperature stays on the card's center. */
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
  /* Top / bottom rows reach closer to the card's sides than the main area does
     (6px from the edge instead of the card padding), so a row of buttons wraps
     later. Never wider than the card padding allows. */
  .zone.top, .zone.bottom { margin-inline: calc(-1 * max(0px, var(--etc-card-pad, 16px) - 6px)); }
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
  /* Centered: the number is centered and the unit hangs to its right, so the
     unit doesn't push the number off center. */
  .core.al-center .current { position: relative; }
  .core.al-center .current > .unit { position: absolute; left: 100%; top: 0.08em; margin-left: 2px; }
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
  /* Wheel center as a pill (same look as the setpoint pills, scaled with the wheel). */
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
    gap: calc(var(--etc-b-igap, 6px) * var(--etc-b-k, 1));
    min-width: calc(var(--etc-b-minw, 0px) * var(--etc-b-k, 1));
    min-height: calc(var(--etc-b-height, 0px) * var(--etc-b-k, 1));
    padding: calc(10px * var(--etc-b-k, 1)) calc(8px * var(--etc-b-k, 1));
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
  .mi .mi-val { margin-left: auto; padding-left: 12px; font-weight: 700; font-variant-numeric: tabular-nums; color: var(--etc-fg); }
  .mi.dev.on > ha-icon { color: var(--primary-color); }
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
    width: var(--pop-w, min(520px, 94vw));
    max-width: 100vw;
    max-height: 90vh;
    overflow: visible;
  }
  dialog.popup::backdrop {
    background: rgba(0, 0, 0, var(--pop-dim, 0.55));
    -webkit-backdrop-filter: blur(var(--pop-blur, 0px));
    backdrop-filter: blur(var(--pop-blur, 0px));
  }
  dialog.popup.size-small { width: var(--pop-w, min(380px, 94vw)); }
  dialog.popup.size-small::backdrop { background: rgba(0, 0, 0, var(--pop-dim, 0.15)); }
  dialog.popup.anchored { position: fixed; margin: 0; inset: auto; }
  dialog.popup.size-large { width: var(--pop-w, min(1200px, 90vw)); }
  dialog.popup.size-full { width: var(--pop-w, 100vw); max-height: 100vh; height: var(--pop-h, 100vh); margin: 0; inset: 0; }
  dialog.popup.size-full .popup-inner { border-radius: 0; height: 100%; max-height: 100vh; }
  .popup-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--card-background-color, #1c1c1c);
    border-radius: var(--ha-card-border-radius, 16px);
    max-height: var(--pop-h, 90vh);
    height: var(--pop-h, auto);
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }
  .popup-body { overflow: auto; flex: 1 1 auto; min-height: 0; }
  .popup-title {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 8px 10px 16px;
    border-bottom: 1px solid var(--divider-color, #333);
    color: var(--primary-text-color);
    font-size: 16px;
    font-weight: 500;
    --mdc-icon-size: 20px;
    flex: none;
  }
  .popup-title > span { flex: 1 1 auto; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .popup-x { border: none; background: transparent; color: var(--secondary-text-color); width: 36px; height: 36px; border-radius: 50%; cursor: pointer; --mdc-icon-size: 22px; }
  .popup-x:hover { background: color-mix(in srgb, var(--primary-text-color) 10%, transparent); color: var(--primary-text-color); }
  .popup-missing { padding: 24px 20px; color: var(--secondary-text-color); text-align: center; }
  ha-card.frosted ~ dialog.popup .popup-inner, dialog.popup .popup-inner.frost {
    background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 72%, transparent);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    backdrop-filter: blur(18px) saturate(140%);
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
`, ir = Array.from({ length: 14 }, (r, t) => ({
  x: (t * 37 + 11) % 92 + 4,
  y: (t * 53 + 7) % 86 + 6,
  d: 3 + t * 7 % 5,
  dl: -(t * 1.3 % 5)
})), co = (r) => ((r * 0.618034 + 0.31) % 1 * 2 - 1).toFixed(2);
function _t(r, t, e) {
  return p`<div class="lay">
    ${Xe(r.style, t).map(
    (o, i) => p`<i
          class="col"
          style=${S({ "--x": `${o.x}%`, "--sz": `${o.s}${e}`, "--d": `${o.d}s`, "--dl": `${o.dl}s`, "--hv": co(i) })}
          ><b></b
        ></i>`
  )}
  </div>`;
}
function Oe(r, t) {
  switch (r.style) {
    case "plasma":
      return _t(r, t, "%");
    case "lava":
      return p`<svg class="defs" width="0" height="0" aria-hidden="true">
          <filter id="etc-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </svg>
        ${_t(r, t, "%")}`;
    case "shimmer":
      return p`${_t(r, t, "%")}
        <div class="spark">
          ${ir.map(
        (e) => p`<i style=${S({ left: `${e.x}%`, top: `${e.y}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s` })}></i>`
      )}
        </div>`;
    case "particles":
      return _t(r, t, "px");
    case "aurora":
      return p`${Xe("aurora", t).map(
        (e, o) => p`<i
            class="rib"
            style=${S({ "--y": `${e.y}%`, "--h": `${e.s}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s`, "--hv": co(o) })}
          ></i>`
      )}`;
    case "flow":
      return p`<i class="band b1"></i><i class="band b2"></i>`;
    case "core":
      return p`<i class="c1"></i><i class="c2"></i>`;
    case "mesh":
      return p`<div class="lay">
        <i class="m m1"><b></b></i><i class="m m2"><b></b></i><i class="m m3"><b></b></i><i class="m m4"><b></b></i>
      </div>`;
    case "beam":
      return p`<div class="beam"><i class="r1"></i><i class="r2"></i><i class="r3"></i></div>`;
  }
}
function rr(r, t) {
  const e = r.background ?? {}, o = e.quality ?? P.quality, i = e.fill === "image" && e.image?.url ? p`<div class="bg-base" aria-hidden="true">
          <div class="bg-img fit-${e.image.fit ?? "cover"}"></div>
          ${e.image.darken ? p`<div class="bg-dark"></div>` : u}
        </div>` : u, n = t ? p`<div class="bg s-${t.style} st-${t.state} dir-${t.dir} q-${o} ${e.variation ? "vary" : ""}" aria-hidden="true">
        ${e.angle ? p`<div class="bg-rot">${Oe(t, o)}</div>` : Oe(t, o)}${t.blades ? p`<i class="blades"></i>` : u}
      </div>` : u, a = e.scrim || e.vignette || e.grain ? p`<div class="bg-finish" aria-hidden="true">
          ${e.scrim ? p`<i class="scrim"></i>` : u} ${e.vignette ? p`<i class="vig"></i>` : u}
          ${e.grain ? p`<i class="grain"></i>` : u}
        </div>` : u;
  return p`${i}${n}${a}`;
}
const nr = globalThis.CSS;
for (const [r, t, e] of [
  ["--etc-bg-a", "<color>", "transparent"],
  ["--etc-bg-b", "<color>", "transparent"],
  ["--etc-bg-op", "<number>", "1"]
])
  try {
    nr?.registerProperty?.({ name: r, syntax: t, inherits: !0, initialValue: e });
  } catch {
  }
const ar = Xt`
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

  /* ---- angle: the motion is tilted inside a square that covers the card ---- */
  .bg .bg-rot {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--bg-diag, 150%);
    height: var(--bg-diag, 150%);
    transform: translate(-50%, -50%) rotate(var(--bg-angle, 0deg));
  }

  /* ---- color variation: each shape strays from the state colors by its own
     amount (--hv, −1…1) times the setting (--bg-var, 0–100). Up to ±60° of
     hue, a mix toward the second color, and a little lighter / darker. Needs relative colors; without
     them the shapes simply keep the state colors. ---- */
  .s-flow .b1 { --hv: -0.7; } .s-flow .b2 { --hv: 0.85; }
  .s-mesh .m1 { --hv: -0.8; } .s-mesh .m2 { --hv: 0.5; } .s-mesh .m3 { --hv: 0.95; } .s-mesh .m4 { --hv: -0.35; }
  .s-beam .r1 { --hv: 0.1; } .s-beam .r2 { --hv: -0.9; } .s-beam .r3 { --hv: 0.8; }
  .s-core .c1 { --hv: 0.4; } .s-core .c2 { --hv: -0.85; }
  /* Flow's two bands span the whole card and would average out: with
     variation on, one leans left and the other right. Plasma's blobs blend
     with "screen", which washes their colors together: keep them distinct. */
  .bg.vary.s-flow .b1 { -webkit-mask-image: linear-gradient(to right, #000 25%, transparent 85%); mask-image: linear-gradient(to right, #000 25%, transparent 85%); }
  .bg.vary.s-flow .b2 { opacity: 1; -webkit-mask-image: linear-gradient(to right, transparent 15%, #000 75%); mask-image: linear-gradient(to right, transparent 15%, #000 75%); }
  .bg.vary.s-plasma .col > b { mix-blend-mode: normal; }
  @supports (color: oklch(from red l c h)) {
    .bg.vary :is(.col, .rib, .band, .m, .r1, .r2, .r3, .c1, .c2, .blades) {
      --ca: oklch(
        from color-mix(in oklch, var(--etc-bg-a), var(--etc-bg-b) calc(max(0, var(--hv, 0)) * var(--bg-var, 0) * 0.9%))
          calc(l + var(--hv, 0) * var(--bg-var, 0) * 0.0018) c calc(h + var(--hv, 0) * var(--bg-var, 0) * 0.6)
      );
      /* the same direction, so a whole shape turns redder or more amber rather than averaging out */
      --cb: oklch(from var(--etc-bg-b) calc(l + var(--hv, 0) * var(--bg-var, 0) * 0.0012) c calc(h + var(--hv, 0) * var(--bg-var, 0) * 0.5));
    }
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
    background: radial-gradient(circle at 40% 40%, var(--ca, var(--etc-bg-a)), color-mix(in srgb, var(--cb, var(--etc-bg-b)) 80%, transparent) 55%, transparent 70%);
    mix-blend-mode: screen;
  }
  .s-plasma::before, .s-particles::before, .s-shimmer::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 115%, color-mix(in srgb, var(--cb, var(--etc-bg-b)) 45%, transparent), transparent 70%);
  }
  .bg.dir-down.s-plasma::before, .bg.dir-down.s-particles::before, .bg.dir-down.s-shimmer::before {
    background: radial-gradient(ellipse at 50% -15%, color-mix(in srgb, var(--cb, var(--etc-bg-b)) 45%, transparent), transparent 70%);
  }

  /* ---- Lava Lamp (SVG goo: blobs merge and split) ---- */
  .s-lava { --travel: 95%; }
  .s-lava .lay { filter: url(#etc-goo); }
  .s-lava .col > b {
    background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 65%, #fff), var(--ca, var(--etc-bg-a)) 40%, var(--cb, var(--etc-bg-b)));
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
    background: linear-gradient(var(--ca, var(--etc-bg-a)), var(--cb, var(--etc-bg-b)));
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
    background: linear-gradient(90deg, transparent 5%, var(--ca, var(--etc-bg-a)) 30%, var(--cb, var(--etc-bg-b)) 50%, var(--ca, var(--etc-bg-a)) 70%, transparent 95%);
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
    background: linear-gradient(to top, transparent 0%, var(--ca, var(--etc-bg-a)) 22%, var(--cb, var(--etc-bg-b)) 40%, transparent 62%, transparent 100%);
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
    background: radial-gradient(ellipse, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 85%, transparent), transparent 70%);
    filter: blur(calc(14px * var(--bg-blur-k, 1)));
    animation: bg-waver calc(var(--d, 12s) * 0.37 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .bg.dir-down.s-shimmer .col > b { background: radial-gradient(ellipse, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 55%, #fff 15%), transparent 70%); }
  @keyframes bg-waver { from { transform: translate(-50%, -50%) scaleX(0.85) skewX(-8deg); } to { transform: translate(-50%, -50%) scaleX(1.15) skewX(8deg); } }
  .s-shimmer .spark { inset: 0; display: none; }
  .bg.dir-down.s-shimmer .spark { display: block; }
  .s-shimmer .spark i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 6px var(--ca, var(--etc-bg-a));
    opacity: 0;
    animation: bg-twinkle calc(var(--d, 4s) / var(--bg-rate, 1)) ease-in-out infinite;
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
  }
  @keyframes bg-twinkle { 0%, 100% { opacity: 0; transform: scale(0.6); } 50% { opacity: 0.9; transform: scale(1.2); } }

  /* ---- Embers / Snow ---- */
  .s-particles { --travel: 58%; }
  .s-particles .col > b {
    background: radial-gradient(circle, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 40%, #fff) 0%, var(--ca, var(--etc-bg-a)) 45%, transparent 70%);
    animation: bg-sway calc(var(--d, 14s) * 0.3 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .bg.dir-down.s-particles .col > b { background: radial-gradient(circle, #fff 0%, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 50%, #fff) 50%, transparent 72%); }
  @keyframes bg-sway { from { transform: translate(-50%, -50%) translateX(-14px); } to { transform: translate(-50%, -50%) translateX(14px); } }

  /* ---- Breathing Core ---- */
  .s-core .c1, .s-core .c2 { inset: -25%; }
  .s-core .c1 {
    background: radial-gradient(circle at 50% 45%, var(--ca, var(--etc-bg-a)) 0%, color-mix(in srgb, var(--cb, var(--etc-bg-b)) 70%, transparent) 28%, transparent 55%);
    filter: blur(calc(20px * var(--bg-blur-k, 1)));
    animation: bg-breathe calc(7s / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .s-core .c2 {
    background: radial-gradient(circle at 50% 45%, transparent 30%, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 35%, transparent) 38%, transparent 48%);
    filter: blur(calc(14px * var(--bg-blur-k, 1)));
    animation: bg-breathe calc(7s / var(--bg-rate, 1)) ease-in-out infinite alternate-reverse;
  }
  .bg.dir-up.s-core .c1 { animation-name: bg-breathe-up; }
  .bg.dir-down.s-core .c1 { animation-name: bg-breathe-down; }
  .bg.dir-swirl.s-core .c2 {
    background: repeating-conic-gradient(from 0deg at 50% 45%, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 45%, transparent) 0deg 30deg, transparent 30deg 90deg);
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
  .s-mesh .m1 > b, .s-mesh .m3 > b { background: radial-gradient(circle, var(--ca, var(--etc-bg-a)), transparent 65%); }
  .s-mesh .m2 > b, .s-mesh .m4 > b { background: radial-gradient(circle, var(--cb, var(--etc-bg-b)), transparent 65%); }
  .bg.dir-swirl.s-mesh .m { animation-duration: calc(var(--md, 26s) * 0.35 / var(--bg-rate, 1)); }
  @keyframes bg-mesh-up { from { transform: translateY(6%); } to { transform: translateY(-6%); } }
  @keyframes bg-mesh-down { from { transform: translateY(-6%); } to { transform: translateY(6%); } }

  /* ---- Glow Beam ---- */
  .s-beam .beam { inset: -45%; animation: bg-beam-up calc(24s / var(--bg-rate, 1)) ease-in-out infinite alternate; }
  .bg.dir-down.s-beam .beam { animation-name: bg-beam-down; }
  .bg.dir-swirl.s-beam .beam { animation: bg-beam-spin calc(10s / var(--bg-rate, 1)) linear infinite; }
  .bg.dir-still.s-beam .beam { animation: none; transform: rotate(-40deg); }
  .s-beam .beam i { border-radius: 40%; filter: blur(calc(38px * var(--bg-blur-k, 1))); }
  .s-beam .r1 { left: 44%; top: 5%; width: 20%; height: 90%; background: linear-gradient(to right, var(--ca, var(--etc-bg-a)), color-mix(in srgb, var(--cb, var(--etc-bg-b)) 60%, transparent) 50%, transparent); }
  .s-beam .r2 { left: 22%; top: 0; width: 18%; height: 65%; background: var(--cb, var(--etc-bg-b)); opacity: 0.45; }
  .s-beam .r3 { left: 62%; top: 25%; width: 28%; height: 50%; background: linear-gradient(135deg, color-mix(in srgb, var(--cb, var(--etc-bg-b)) 70%, transparent), transparent); opacity: 0.7; }
  @keyframes bg-beam-up { from { transform: rotate(-40deg) translate(-6%, 8%); } to { transform: rotate(-40deg) translate(6%, -8%); } }
  @keyframes bg-beam-down { from { transform: rotate(-40deg) translate(-6%, -8%); } to { transform: rotate(-40deg) translate(6%, 8%); } }
  @keyframes bg-beam-spin { from { transform: rotate(-40deg); } to { transform: rotate(320deg); } }

  /* ---- Fan: soft blades sweeping round, speed from the fan ---- */
  .bg .blades {
    inset: -30%;
    background: repeating-conic-gradient(from 0deg, color-mix(in srgb, var(--ca, var(--etc-bg-a)) 50%, transparent) 0deg 30deg, transparent 30deg 90deg);
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
    box-shadow: inset 0 0 0 var(--etc-b-ring, 1px) rgba(255, 255, 255, 0.12);
  }
  ha-card.frosted .btn.active { box-shadow: inset 0 0 0 var(--etc-b-aring, var(--etc-b-ring, 1px)) rgba(255, 255, 255, 0.12); }
  ha-card.frosted .round { background: rgba(255, 255, 255, 0.06); }
  /* The wheel's setpoint bubble: tinted glass in the heat / cool color. */
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
var sr = Object.defineProperty, F = (r, t, e, o) => {
  for (var i = void 0, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = a(t, e, i) || i);
  return i && sr(t, e, i), i;
};
const cr = 18;
function lr(r, t) {
  const e = r.currentTemp;
  if (e === null || !t?.available) return !1;
  const o = (t.heat ?? t.cool).step / 2, i = t.heat?.value, n = t.cool?.value;
  return i !== void 0 && n !== void 0 ? e >= i - o && e <= n + o : i !== void 0 ? e >= i - o : n !== void 0 ? e <= n + o : !1;
}
const pr = 500, ae = class ae extends ot {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(), this._tick = 0, this._popupOpen = !1, this._popup = null, this._popupMissing = null, this._popupAnchor = null, this._popupTimer = null, this._menuTimer = null, this._menu = null, this._revealed = !1, this._bgPaused = !1, this._cycle = 0, this._cycleTimer = null, this._onScreen = !0, this._revealTimer = null, this._sp = new Ji(
      () => this._config?.entity ?? "",
      (t) => this._call(t),
      () => {
        this._tick += 1, this._revealed && this._armReveal();
      }
    ), this._drag = null, this._barDrag = null, this._hold = null, this._onPreview = (t) => {
      const e = t.detail;
      !e || e.entity !== this._config?.entity || !this.isConnected || this.closest("easy-thermostat-styler-card-editor") || this._openPopup(e.popup, null);
    }, this._onTest = (t) => {
      t.detail?.entity === this._config?.entity && this.requestUpdate();
    }, this._updatePause = () => {
      const t = !this._onScreen || document.visibilityState === "hidden";
      t !== this._bgPaused && (this._bgPaused = t);
    }, this._wheelDown = (t) => {
      const e = this._sp.edit, o = e?.[e.active];
      if (!o) return;
      const i = t.currentTarget;
      i.focus({ preventScroll: !0 }), this._drag = { startY: t.clientY, startValue: o.value }, this._sp.dragging = !0, this._armReveal(), i.setPointerCapture?.(t.pointerId);
    }, this._wheelMove = (t) => {
      !this._drag || !this._sp.edit || this._sp.preview(Wi(this._sp.edit, this._drag.startValue, t.clientY - this._drag.startY, cr));
    }, this._wheelUp = (t) => {
      const e = this._drag;
      if (!e) return;
      this._drag = null, this._sp.dragging = !1;
      const o = t.currentTarget;
      o.hasPointerCapture?.(t.pointerId) && o.releasePointerCapture(t.pointerId);
      const i = this._sp.edit;
      i && i[i.active]?.value !== e.startValue ? this._sp.commit(i) : this._tapMode() && this._revealed && Math.abs(t.clientY - e.startY) < 6 && this._setRevealed(!1);
    }, this._wheelKey = (t) => {
      const e = this._sp.edit;
      e && (t.key === "ArrowUp" || t.key === "ArrowRight" ? (t.preventDefault(), this._sp.commit(tt(e, 1))) : (t.key === "ArrowDown" || t.key === "ArrowLeft") && (t.preventDefault(), this._sp.commit(tt(e, -1))));
    }, this._wheelScroll = (t) => {
      const e = this._sp.edit;
      !e || Math.abs(t.deltaY) < 4 || (t.preventDefault(), this._sp.commit(tt(e, t.deltaY < 0 ? 1 : -1)));
    }, this._barDown = (t) => {
      const e = this._sp.edit;
      if (!e?.available) return;
      const o = t.currentTarget, i = o.getBoundingClientRect(), n = Ht(e, this._config?.setpoint?.bar), a = this._barFraction(t, i), s = er(e, a, n);
      this._barDrag = { handle: s, rect: i }, this._sp.dragging = !0, this._armReveal(), o.setPointerCapture?.(t.pointerId), this._sp.preview(Pe(nt(e, s), this._barValueAt(t, i)));
    }, this._barMove = (t) => {
      !this._barDrag || !this._sp.edit || this._sp.preview(Pe(this._sp.edit, this._barValueAt(t, this._barDrag.rect)));
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
    }, this._armPopupTimer = () => {
      this._popupTimer && clearTimeout(this._popupTimer), this._popupTimer = null;
      const t = this._autoCloseSecs(this._popup);
      this._popupOpen && t > 0 && (this._popupTimer = setTimeout(() => this._closePopup(), t * 1e3));
    }, this._armMenuTimer = () => {
      this._menuTimer && clearTimeout(this._menuTimer), this._menuTimer = null;
      const t = this._autoCloseSecs(null);
      this._menu && t > 0 && (this._menuTimer = setTimeout(() => this._closeMenus(), t * 1e3));
    }, this._closePopup = () => {
      const t = this.renderRoot.querySelector("dialog.popup");
      t?.open && t.close(), this._popupTimer && clearTimeout(this._popupTimer), this._popupTimer = null, this._popupOpen = !1, this._popupEl = void 0, this._popup = null, this._popupMissing = null;
    };
  }
  // ---- Lovelace contract ----------------------------------------------------
  setConfig(t) {
    this._config = jt(t), this._open = this._loadOpen();
  }
  static getConfigElement() {
    return document.createElement(Ut);
  }
  static getStubConfig(t) {
    return { entity: Object.keys(t?.states ?? {}).find((o) => o.startsWith("climate.")) ?? "climate.thermostat" };
  }
  /** Test mode, as set in the open editor for this thermostat (never saved). */
  _testMode() {
    return xt(this._config?.entity);
  }
  _syncCycleTimer() {
    const t = this._testMode() === "cycle";
    t && !this._cycleTimer && (this._cycleTimer = setInterval(() => this._cycle += 1, Ei)), !t && this._cycleTimer && (clearInterval(this._cycleTimer), this._cycleTimer = null);
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
    }), this._io.observe(this)), document.addEventListener("visibilitychange", this._updatePause), window.addEventListener(Yt, this._onTest), window.addEventListener("etc-popup-preview", this._onPreview);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._io?.disconnect(), this._io = void 0, this._cycleTimer && clearInterval(this._cycleTimer), this._cycleTimer = null, this._popupTimer && clearTimeout(this._popupTimer), this._menuTimer && clearTimeout(this._menuTimer), this._sideRO?.disconnect(), this._bgRO?.disconnect(), this._bgRO = void 0, document.removeEventListener("visibilitychange", this._updatePause), window.removeEventListener(Yt, this._onTest), window.removeEventListener("etc-popup-preview", this._onPreview), this._sp.dispose(), this._revealTimer && clearTimeout(this._revealTimer);
  }
  willUpdate(t) {
    (t.has("hass") || t.has("_config")) && this.hass && this._config && this._sp.sync(Vi(this.hass, this._config)), t.has("hass") && this._popupEl && this.hass && (this._popupEl.hass = this.hass);
  }
  /** Only re-render for state that this card reads (not every hass push). */
  shouldUpdate(t) {
    if (!t.has("hass") || t.size > 1) return !0;
    const e = t.get("hass");
    return !e || !this.hass || !this._config ? !0 : this._watched().some((o) => e.states[o] !== this.hass.states[o]);
  }
  _watched() {
    const t = this._config, e = [t.entity], o = oe(t);
    o && e.push(o);
    const i = (n) => [
      ...n.chips ?? [],
      ...(n.items ?? []).filter((a) => a.kind === "device")
    ];
    for (const n of t.sets ?? []) for (const a of i(n)) e.push(a.entity);
    for (const n of t.sets ?? []) for (const a of n.items ?? []) a.kind === "action" && a.entity && e.push(a.entity);
    if (this.hass)
      for (const n of t.sets ?? [])
        for (const a of i(n)) {
          if (a.type !== "rf_fan") continue;
          const s = st(this.hass, a, 0);
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
    const t = this._config, e = Ko(this.hass, t);
    this._syncCycleTimer();
    const o = Ri(this._testMode(), this._cycle), i = o ? { ...Me(e, o), currentTemp: e.currentTemp, setpoints: e.setpoints } : e, n = o ? Me(e, o) : e, a = Ho(this.hass, t), s = ii(this.hass, t, n), c = {
      [`eq-${i.equipment ?? "none"}`]: !0,
      [`mode-${i.mode}`]: !0,
      ...ki(t, n),
      frosted: Ke(t),
      "bg-paused": !!s && this._bgPaused
    }, l = { ...li(t), ...ci(t.text), ...this._barVars(), ...Si(t), ...ai(t, s) }, d = { top: [], bottom: [], left: [], right: [] }, h = a.filter((b) => b.display === "toggle"), f = (b) => b.display !== "toggle" || this._open.has(b.key), g = new Map(a.filter((b) => b.config.id).map((b) => [b.config.id, b])), m = (b) => {
      let _ = b;
      const k = /* @__PURE__ */ new Set([b]);
      for (; _.config.row_with; ) {
        const y = g.get(_.config.row_with);
        if (!y || k.has(y) || !f(y)) break;
        k.add(y), _ = y;
      }
      return _;
    }, w = /* @__PURE__ */ new Map();
    for (const b of a) {
      if (!f(b)) continue;
      const _ = m(b);
      w.has(_) || w.set(_, []), w.get(_).push(b);
    }
    const $ = { top: [], bottom: [], left: [], right: [] };
    for (const [b, _] of w) _.length === 1 && b.display === "menu" && $[b.zone].push(b);
    for (const b of a) {
      const _ = w.get(b);
      if (_) {
        if (_.length === 1 && b.display === "menu") {
          $[b.zone][0] === b && d[b.zone].push(this._renderMenuRow($[b.zone], b.zone));
          continue;
        }
        if (_.length === 1) {
          d[b.zone].push(this._renderSet(b));
          continue;
        }
        d[b.zone].push(p`<div class="row-group">
        ${_.map((k) => k.display === "menu" ? this._renderMenuRow([k], b.zone) : this._renderSet(k))}
      </div>`);
      }
    }
    const x = t.toggles_zone ?? v.toggles_zone;
    return h.length && d[x].push(this._renderToggles(h)), p`
      <ha-card class=${It(c)} style=${S(l)}>
        ${rr(t, s)}
        ${o ? p`<div class="test-badge" title="Test mode switches off when the editor closes">TEST · ${Mi[o]}</div>` : u}
        <div class=${It({ grid: !0, centered: t.zones?.centered ?? !0, "has-sides": !!(d.left.length || d.right.length) })} style=${S(this._zoneVars())}>
          ${["top", "left"].map((b) => this._zone(b, d[b]))}
          ${this._renderCore(i)}
          ${["right", "bottom"].map((b) => this._zone(b, d[b]))}
        </div>
        ${this._renderPopup()}
      </ha-card>
    `;
  }
  _zoneVars() {
    const t = this._config?.zones ?? {}, e = {};
    t.gap !== void 0 && (e["--zg"] = `${t.gap}px`);
    for (const o of ["top", "bottom", "left", "right"]) t[o] !== void 0 && (e[`--zg-${o}`] = `${t[o]}px`);
    return e;
  }
  /** An angled background needs a square as large as the card's diagonal. */
  _syncBgDiag() {
    const t = this.renderRoot.querySelector("ha-card"), e = !!this.renderRoot.querySelector(".bg-rot");
    if (!t || !e || typeof ResizeObserver > "u") {
      this._bgRO?.disconnect(), this._bgRO = void 0;
      return;
    }
    const o = () => {
      const i = t.getBoundingClientRect(), n = `${Math.ceil(Math.hypot(i.width, i.height)) + 2}px`;
      t.style.getPropertyValue("--bg-diag") !== n && t.style.setProperty("--bg-diag", n);
    };
    this._bgRO || (this._bgRO = new ResizeObserver(o), this._bgRO.observe(t)), o();
  }
  updated() {
    this._syncBgDiag();
    const t = this.renderRoot.querySelector(".grid");
    if (!t || typeof ResizeObserver > "u") return;
    const e = [...t.querySelectorAll(":scope > .zone.left, :scope > .zone.right")];
    if (this._sideRO?.disconnect(), !e.length || !t.classList.contains("centered")) {
      t.style.removeProperty("--side-w");
      return;
    }
    const o = () => {
      t.classList.remove("no-center");
      const i = Math.ceil(
        Math.max(
          ...e.map((a) => {
            const s = getComputedStyle(a), c = [...a.children].map((h) => h.getBoundingClientRect().width), l = parseFloat(s.columnGap) || 0;
            return (s.flexDirection === "row" ? c.reduce((h, f) => h + f, 0) + l * Math.max(0, c.length - 1) : Math.max(0, ...c)) + parseFloat(s.marginLeft) + parseFloat(s.marginRight);
          })
        )
      );
      t.style.getPropertyValue("--side-w") !== `${i}px` && t.style.setProperty("--side-w", `${i}px`), e.some((a) => {
        const s = getComputedStyle(a);
        return a.getBoundingClientRect().width + parseFloat(s.marginLeft) + parseFloat(s.marginRight) + 1 < i && [...a.children].reduce((c, l) => c + l.getBoundingClientRect().width, 0) > a.getBoundingClientRect().width + 1;
      }) && t.classList.add("no-center");
    };
    this._sideRO ??= new ResizeObserver(() => o());
    for (const i of e) this._sideRO.observe(i);
    o();
  }
  _zone(t, e) {
    return e.length ? p`<div class="zone ${t}">${e}</div>` : u;
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
    const e = this._config, o = e.setpoint ?? {}, i = o.control ?? v.control, n = o.position ?? v.position, a = e.core_align ?? v.core_align, s = this._sp.edit, c = !!s?.available && i !== "none", l = o.bar?.position ?? v.bar.position, d = l === "above", h = l === "left" || l === "right", f = t.equipment ? `eq-${t.equipment}` : "", g = c && this._tapMode(), m = !g || this._revealed, w = o.reveal_from ?? v.reveal_from, $ = g && (w === "both" || w === "current"), x = g && (w === "both" || w === "pills"), b = g && m && (o.open_in ?? v.open_in) === "current", _ = g && !m && !!o.hide_at_target && lr(t, s), k = $ || _, y = c ? i === "bar" ? this._renderBar(s, t) : this._renderControl(s, i) : null;
    let z = null;
    c && (g ? m ? z = b ? null : y : !_ && (o.collapsed ?? v.collapsed) === "visual" && (z = this._renderCollapsed(s, t, i)) : z = y);
    const I = i !== "bar" ? z : null, B = i === "bar" ? z : null;
    if (!t.available)
      return p`<div class="core al-${a}">
        <div class="main">
          ${e.show_name ?? v.show_name ? p`<div class="name">${t.name}</div>` : u}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    const se = p`${U(t.currentTemp, t.unit)}<span class="unit">${t.unit}</span>`, gt = e.status_position ?? v.status_position, mt = (e.show_status ?? v.show_status) && t.equipment ? p`<div class="status ${f} sp-${gt}">
            <ha-icon icon=${zt[t.state] ?? "mdi:thermostat"}></ha-icon>${Xo[t.equipment]}
          </div>` : u, ce = b ? p`<div class="in-current">${y}</div>` : e.show_current ?? v.show_current ? k ? p`<button
              class="current tappable ${f}"
              aria-expanded=${m}
              aria-label="Show temperature controls"
              @click=${() => this._setRevealed(!this._revealed)}
            >
              ${se}
            </button>` : p`<div class="current ${f}">${se}</div>` : u, lo = p`<div class="main">
      ${e.show_name ?? v.show_name ? p`<div class="name">${t.name}</div>` : u}
      ${gt === "above" ? mt : u}
      ${(e.show_humidity ?? v.show_humidity) && t.humidity !== null ? p`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(t.humidity)}%</div>` : u}
      ${gt === "beside" && mt !== u ? p`<div class="cur-row">${ce}${mt}</div>` : ce}
      ${gt === "below" ? mt : u}
      ${(e.show_pills ?? v.show_pills) && s?.available && !_ && !(g && m && o.hide_pills_open) ? this._renderPills(s, x, m) : u}
    </div>`;
    return p`<div class="core al-${a} pos-${n}">
      ${B && d ? B : u}
      <div class="core-row">
        ${B && l === "left" ? B : u} ${I && n === "left" ? I : u} ${lo}
        ${I && n === "right" ? I : u} ${B && l === "right" ? B : u}
      </div>
      ${I && n === "center" ? p`<div class="ctl-center">${I}</div>` : u}
      ${B && !d && !h ? B : u}
    </div>`;
  }
  /** The control's own value while it is folded away; tap to open. */
  _renderCollapsed(t, e, o) {
    const i = t[t.active];
    if (!i) return u;
    const n = () => this._setRevealed(!0);
    if (o === "bar")
      return p`<div
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
    const a = U(i.value, t.unit);
    return p`<button class="collapsed" aria-label="Show temperature controls" @click=${n}>
      ${o === "wheel" ? this._wheelCenter(t.active, a) : p`<span class="sv" style=${S({ "--c": t.active === "cool" ? "var(--etc-cool)" : "var(--etc-heat)" })}
            >${a}</span
          >`}
    </button>`;
  }
  /** `tapOpens`: the pills open the control (tap-to-reveal). In Heat/Cool a
   *  pill also picks which setpoint the wheel/stepper edits. */
  _renderPills(t, e = !1, o = !0) {
    const i = !!(t.heat && t.cool), n = (a) => {
      const s = t[a];
      if (!s) return u;
      const c = p`<ha-icon icon=${a === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${U(
        s.value,
        t.unit
      )}`, l = i && t.active !== a && this._usesActive() && o;
      return !i && !e ? p`<div class="pill ${a}">${c}</div>` : p`<button
        class="pill ${a} ${l ? "dim" : ""} ${e ? "tappable" : ""}"
        aria-pressed=${i ? String(t.active === a) : u}
        aria-expanded=${e ? String(o) : u}
        aria-label=${`${a === "heat" ? "Heat" : "Cool"} setpoint`}
        @click=${() => this._pillTap(t, a, i, e, o)}
      >
        ${c}
      </button>`;
    };
    return p`<div class="pills">${n("heat")} ${n("cool")}</div>`;
  }
  _pillTap(t, e, o, i, n) {
    o && this._sp.select(nt(t, e)), i && (n ? !o || t.active === e ? this._setRevealed(!1) : this._armReveal() : this._setRevealed(!0));
  }
  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  _usesActive() {
    const t = this._config?.setpoint?.control ?? v.control;
    return t === "wheel" || t === "stepper";
  }
  _renderControl(t, e) {
    const o = t[t.active];
    if (!o) return u;
    const i = t.active, n = p`<button
      class="round ${i}"
      aria-label="Increase"
      ?disabled=${o.max !== null && o.value >= o.max}
      @click=${() => this._sp.commit(tt(t, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`, a = p`<button
      class="round ${i}"
      aria-label="Decrease"
      ?disabled=${o.min !== null && o.value <= o.min}
      @click=${() => this._sp.commit(tt(t, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`, c = ((this._config?.show_pills ?? v.show_pills) === !1 || this._tapMode() && this._revealed && !!this._config?.setpoint?.hide_pills_open) && t.heat && t.cool ? p`<div class="hc-switch" role="group" aria-label="Setpoint">
            ${["heat", "cool"].map(
      (_) => p`<button
                class="hc ${_} ${t.active === _ ? "on" : ""}"
                aria-pressed=${String(t.active === _)}
                aria-label=${_ === "heat" ? "Edit heat setpoint" : "Edit cool setpoint"}
                @click=${() => {
        this._sp.select(nt(t, _)), this._armReveal();
      }}
              >
                <ha-icon icon=${_ === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${U(t[_].value, t.unit)}
              </button>`
    )}
          </div>` : u, l = this._config?.setpoint?.nudge, d = l === "beside" ? "right" : l ?? (e === "stepper" ? "around" : "right"), h = (_, k) => {
      const y = p`<div class="nudges">${n}${a}</div>`, z = p`<div class="nudges row">${a}${n}</div>`, I = d === "hidden" ? k : d === "left" ? p`${y}${k}` : d === "above" ? p`${z}${k}` : d === "below" ? p`${k}${z}` : d === "stacked" ? p`${n}${k}${a}` : d === "around" ? p`${a}${k}${n}` : p`${k}${y}`, B = p`<div class="${_} nud-${d}">${I}</div>`;
      return c === u ? B : p`<div class="ctl-wrap">${c}${B}</div>`;
    };
    if (e === "stepper")
      return h(`stepper ${i}`, p`<span class="sv">${U(o.value, t.unit)}</span>`);
    const g = (this._config?.setpoint ?? {}).neighbors ?? v.neighbors, m = Yi(o, g), w = m.filter((_) => _ > o.value).reverse(), $ = m.filter((_) => _ < o.value).reverse(), x = (_) => p`<div class="nb ${Math.abs(_ - o.value) > o.step * 1.5 ? "far" : ""}">${U(_, t.unit)}</div>`, b = p`<div
      class="wheel-col"
      role="slider"
      tabindex="0"
      aria-label=${`${i === "cool" ? "Cool" : "Heat"} setpoint`}
      aria-valuenow=${o.value}
      aria-valuemin=${o.min ?? u}
      aria-valuemax=${o.max ?? u}
      aria-valuetext=${U(o.value, t.unit)}
      @pointerdown=${this._wheelDown}
      @pointermove=${this._wheelMove}
      @pointerup=${this._wheelUp}
      @pointercancel=${this._wheelUp}
      @keydown=${this._wheelKey}
      @wheel=${this._wheelScroll}
    >
      ${w.map(x)}
      ${this._wheelCenter(i, U(o.value, t.unit))}
      ${$.map(x)}
    </div>`;
    return h("wheel", b);
  }
  _wheelCenter(t, e) {
    return (this._config?.setpoint?.wheel_style ?? v.wheel_style) === "pill" ? p`<div class="pill wheel-pill ${t}">
        <ha-icon icon=${t === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${e}
      </div>` : p`<div class="bubble ${t}">${e}</div>`;
  }
  // ---- bar ------------------------------------------------------------------
  _renderBar(t, e, o = !1) {
    const i = { ...v.bar, ...this._config?.setpoint?.bar ?? {} }, n = Ht(t, i), a = (y) => `${(Mt(y, n) * 100).toFixed(3)}%`, s = i.position === "left" || i.position === "right", c = (y) => s ? { bottom: y } : { left: y }, l = s ? "height" : "width", d = s ? "top" : "right", h = t.heat, f = t.cool, g = tr(n, i.ticks ?? 0, i.labels ?? 0), m = [];
    if (i.look === "gradient") {
      const y = i.stops?.length ? i.stops : ["#2b9af9", "#7ccf8a", "#ff8100"];
      m.push(p`<div class="seg full" style=${S({ background: `linear-gradient(to ${s ? "top" : "right"}, ${y.join(", ")})` })}></div>`);
    } else
      h && m.push(p`<div class="seg heat" style=${S({ [l]: a(h.value) })}></div>`), f && m.push(p`<div class="seg cool" style=${S({ ...c(a(f.value)), [d]: "0" })}></div>`), h && f && m.push(p`<div class="seg comfort" style=${S({ ...c(a(h.value)), [d]: `calc(100% - ${a(f.value)})` })}></div>`);
    const w = (y) => {
      const z = t[y];
      return z ? p`
        ${i.flags ? p`<div class="flag ${y}" style=${S(c(a(z.value)))}>${U(z.value, t.unit)}°</div>` : u}
        <div
          class="handle ${y} s-${i.handle_shape ?? "round"} ${t.active === y && h && f ? "active" : ""}"
          style=${S(c(a(z.value)))}
          role=${o ? u : "slider"}
          aria-orientation=${s ? "vertical" : "horizontal"}
          tabindex=${o ? u : "0"}
          aria-label=${`${y === "heat" ? "Heat" : "Cool"} setpoint`}
          aria-valuenow=${z.value}
          aria-valuemin=${n.min}
          aria-valuemax=${n.max}
          @focus=${() => this._sp.select(nt(this._sp.edit, y))}
          @keydown=${(I) => this._barKey(I, y)}
        ></div>
      ` : u;
    }, $ = e.currentTemp, x = i.show_current && $ !== null && $ >= n.min && $ <= n.max ? p`<div class="marker" style=${S(c(a($)))} title="Current"></div>` : u, b = o ? p`<div class="track ro">${m}${x}${w("heat")} ${w("cool")}</div>` : p`<div
          class="track"
          @pointerdown=${this._barDown}
          @pointermove=${this._barMove}
          @pointerup=${this._barUp}
          @pointercancel=${this._barUp}
        >
          ${m}${x}${w("heat")} ${w("cool")}
        </div>`, _ = s ? i.flag_position === "right" ? "right" : "left" : i.flag_position === "below" ? "below" : "above", k = s ? i.tick_position === "left" ? "left" : "right" : i.tick_position === "above" ? "above" : "below";
    return p`<div class="bar ${s ? `vertical side-${i.position}` : "horizontal"} ${i.flags ? `flags-${_}` : "no-flags"} ticks-${k}">
      ${b}
      ${g.length ? p`<div class="ticks">
            ${g.map(
      (y) => p`<div class="tick ${y.label ? "lbl" : ""}" style=${S(c(`${y.fraction * 100}%`))}></div>
                ${y.label ? p`<div class="tick-l" style=${S(c(`${y.fraction * 100}%`))}>${y.value}</div>` : u}`
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
    const o = this._sp.edit, i = Ht(o, this._config?.setpoint?.bar);
    return Qi(this._barFraction(t, e), i);
  }
  _barKey(t, e) {
    const o = this._sp.edit;
    if (!o) return;
    const i = t.key === "ArrowUp" || t.key === "ArrowRight" ? 1 : t.key === "ArrowDown" || t.key === "ArrowLeft" ? -1 : 0;
    i && (t.preventDefault(), this._sp.commit(tt(nt(o, e), i)));
  }
  // ---- button sets ------------------------------------------------------------
  _renderSet(t) {
    const e = lt(this._config?.buttons, t.config.style), o = e.look ?? (t.type === "chips" ? "chip" : "button"), i = o === "button" && t.orientation === "row" && t.align === "stretch", n = { ...Nt(e) };
    i && (n["grid-template-columns"] = t.columns ? `repeat(${t.columns}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))");
    const a = {
      set: !0,
      grid: i,
      flex: !i,
      [`t-${t.type}`]: !0,
      [`o-${t.orientation}`]: !0,
      [`a-${t.align}`]: !0,
      [`v-${e.variant}`]: !0,
      [`ip-${e.icon_position}`]: !0,
      [`look-${o}`]: !0
    }, s = e.content !== "label", c = e.content !== "icon";
    return p`<div class=${It(a)} style=${S(n)} role="group" aria-label=${t.title}>
      ${t.tiles.map((l, d) => {
      if (l.kind === "device") return this._renderChip(st(this.hass, l.chip, d), e.content, o);
      const h = l.kind === "mode" ? l.option : { label: l.label, icon: l.icon, active: !1, color: "var(--primary-color)" }, f = l.kind === "popup" ? l.item : null, g = f?.show_icon ?? s, m = f?.show_name ?? c, w = l.kind === "popup" ? l.value : null;
      return p`<button
          class="btn ${h.active ? "active" : ""} ${l.kind === "action" || l.kind === "popup" ? "act" : ""} ${l.kind === "popup" ? "pop" : ""}"
          style=${S({ "--c": h.color })}
          aria-pressed=${l.kind === "mode" ? String(h.active) : u}
          aria-haspopup=${l.kind === "popup" ? "dialog" : u}
          title=${h.label}
          @click=${($) => this._tileTap(l, $.currentTarget)}
        >
          ${g ? p`<ha-icon icon=${h.icon}></ha-icon>` : u}
          ${m || w ? p`<span class="lbl dev-row">${m ? p`<span>${h.label}</span>` : u}${w ? p`<span class="badge">${w}</span>` : u}</span>` : u}
        </button>`;
    })}
    </div>`;
  }
  // ---- expandable menus -------------------------------------------------------
  _renderMenuRow(t, e) {
    const o = lt(this._config?.buttons, t[0]?.config.style), i = Nt(o), n = {};
    return i["--etc-b-gap"] && (n["--etc-b-gap"] = i["--etc-b-gap"]), i["--etc-b-scale"] && (n["--etc-b-scale"] = i["--etc-b-scale"]), p`<div class="menus z-${e}" style=${S(n)}>${t.map((a) => this._renderMenu(a))}</div>`;
  }
  /** Tap on a mode or action button (device buttons have their own gestures). */
  _tileTap(t, e) {
    if (t.kind === "popup") {
      this._openPopup(t.popup, e ?? null);
      return;
    }
    const o = t.kind === "mode" ? Vo(t.source, this._config.entity, t.option.value) : t.kind === "action" ? qo(t.item) : null;
    o && this._call(o), this._fire("haptic", "light");
  }
  _renderMenu(t) {
    const e = lt(this._config?.buttons, t.config.style), o = t.tiles.find((h) => h.kind === "device"), i = o ? st(this.hass, o.chip, 0) : null, a = t.options.find((h) => h.active) ?? (t.options.length === 0 && i ? { label: i.state, icon: i.icon, color: "var(--primary-color)" } : void 0), s = e.content !== "label", c = this._menu === t.key, l = typeof HTMLElement < "u" && "showPopover" in HTMLElement.prototype, d = e.look ?? "button";
    return p`<div class="menu t-${t.type} look-${d} ${c ? "open" : ""} d-${t.menuDirection} v-${e.variant}" style=${S(Nt(e))}>
      <button
        class="mt ${a ? "has-active" : ""}"
        style=${S({ "--c": a?.color ?? "var(--primary-color)" })}
        aria-haspopup="listbox"
        aria-expanded=${c}
        aria-label=${`${t.title}: ${a?.label ?? ""}`}
        @click=${(h) => this._toggleMenu(t, h.currentTarget)}
      >
        ${s ? p`<ha-icon icon=${a?.icon ?? t.toggleIcon}></ha-icon>` : u}
        <span class="mt-text">
          ${t.menuShowName ? p`<span class="mt-name">${t.title}</span>` : u}
          <span class="mt-value">${a?.label ?? "—"}</span>
        </span>
      </button>
      <div
        class="menu-list"
        role="listbox"
        aria-label=${t.title}
        data-key=${t.key}
        popover=${l ? "auto" : u}
        @toggle=${(h) => this._menuToggled(t, h)}
        @keydown=${(h) => {
      this._armMenuTimer(), this._menuKey(h);
    }}
        @pointermove=${this._armMenuTimer}
      >
        ${t.tiles.map((h, f) => {
      if (h.kind === "device") {
        const m = st(this.hass, h.chip, f);
        return p`<button class="mi dev ${m.on ? "on" : ""}" role="option" @click=${() => {
          this._chipTap(m), this._closeMenus();
        }}>
              ${s ? p`<ha-icon icon=${m.icon}></ha-icon>` : u}<span>${m.name}</span><span class="mi-val">${m.state}</span>
            </button>`;
      }
      const g = h.kind === "mode" ? h.option : { label: h.label, icon: h.icon, active: !1, color: "var(--primary-color)" };
      return h.kind === "popup" ? p`<button class="mi" role="option" @click=${(m) => {
        const w = m.currentTarget.closest(".menu")?.querySelector(".mt") ?? null;
        this._closeMenus(), this._openPopup(h.popup, w);
      }}>
              ${h.item.show_icon ?? s ? p`<ha-icon icon=${g.icon}></ha-icon>` : u}<span>${g.label}</span>${h.value ? p`<span class="mi-val">${h.value}</span>` : u}
            </button>` : p`<button
            class="mi ${g.active ? "active" : ""}"
            role="option"
            aria-selected=${g.active}
            style=${S({ "--c": g.color })}
            @click=${() => this._pickMenu(h)}
          >
            ${s ? p`<ha-icon icon=${g.icon}></ha-icon>` : u}<span>${g.label}</span>
          </button>`;
    })}
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
    i.showPopover(), this._placeMenu(o, e, t.menuDirection), this._menu = t.key, this._armMenuTimer(), (o.querySelector(".mi.active") ?? o.querySelector(".mi"))?.focus({ preventScroll: !0 });
  }
  /** Fixed-position the top-layer list next to its trigger, kept on screen. */
  _placeMenu(t, e, o) {
    const i = e.getBoundingClientRect(), n = 6, a = window.innerWidth, s = window.innerHeight;
    t.style.minWidth = o === "up" || o === "down" ? `${Math.round(i.width)}px` : "";
    const c = t.getBoundingClientRect();
    let l = o === "right" ? i.right + n : o === "left" ? i.left - n - c.width : i.left, d = o === "down" ? i.bottom + n : o === "up" ? i.top - n - c.height : i.top;
    o === "down" && d + c.height > s && (d = i.top - n - c.height), o === "up" && d < 0 && (d = i.bottom + n), o === "right" && l + c.width > a && (l = i.left - n - c.width), o === "left" && l < 0 && (l = i.right + n), l = Math.max(4, Math.min(l, a - c.width - 4)), d = Math.max(4, Math.min(d, s - c.height - 4)), t.style.left = `${Math.round(l)}px`, t.style.top = `${Math.round(d)}px`;
  }
  _menuToggled(t, e) {
    !(e.newState === "open") && this._menu === t.key && (this._menu = null);
  }
  _closeMenus() {
    this._menuTimer && clearTimeout(this._menuTimer), this._menuTimer = null;
    for (const t of this.renderRoot.querySelectorAll(".menu-list"))
      t.hidePopover && t.matches(":popover-open") && t.hidePopover();
    this._menu = null;
  }
  _pickMenu(t) {
    this._tileTap(t), this._closeMenus();
  }
  _renderToggles(t) {
    return p`<div class="toggles">
      ${t.map((e) => {
      const o = this._open.has(e.key);
      return p`<button class="tgl ${o ? "open" : ""}" aria-expanded=${o} @click=${() => this._toggleSet(e.key)}>
          <ha-icon icon=${e.toggleIcon}></ha-icon><span>${e.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
    })}
    </div>`;
  }
  // ---- chips --------------------------------------------------------------------
  _renderChip(t, e, o = "chip") {
    const i = t.config.show_name ?? e !== "icon", n = t.config.show_state ?? !0, a = t.type === "rf_fan", s = o === "button", c = !s || e !== "label", l = s ? `btn dev ${t.on ? "active" : ""}` : `chip ${t.on ? "on" : ""}`, d = a && t.natural ? p`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
          ><ha-icon icon="mdi:leaf"></ha-icon>${n && t.naturalLevel !== null ? t.naturalLevel : u}</span
        >` : n && (!a || t.speed !== null || !t.on) ? p`<span class="badge">${t.state}</span>` : u, h = p`${a && t.lightOn ? p`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : u}
      ${a && t.timerEnds ? p`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${ze(t.timerEnds)}</span>` : u}`;
    return s ? p`<button
        class="${l} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
        aria-label=${`${t.name}: ${t.state}`}
        title=${`${t.name}: ${t.state}`}
        @pointerdown=${(f) => this._chipDown(f, t)}
        @pointerup=${this._chipCancelHold}
        @pointerleave=${this._chipCancelHold}
        @pointercancel=${this._chipCancelHold}
        @click=${() => this._chipTap(t)}
        @contextmenu=${(f) => f.preventDefault()}
      >
        ${c ? p`<ha-icon class=${t.spin ? "spin" : ""} style=${S(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>` : u}
        <span class="lbl dev-row">${i ? p`<span>${t.name}</span>` : u}${d}${h}</span>
      </button>` : p`<button
      class="${l} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
      aria-label=${`${t.name}: ${t.state}`}
      title=${`${t.name}: ${t.state}`}
      @pointerdown=${(f) => this._chipDown(f, t)}
      @pointerup=${this._chipCancelHold}
      @pointerleave=${this._chipCancelHold}
      @pointercancel=${this._chipCancelHold}
      @click=${() => this._chipTap(t)}
      @contextmenu=${(f) => f.preventDefault()}
    >
      <ha-icon class=${t.spin ? "spin" : ""} style=${S(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>
      ${i ? p`<span>${t.name}</span>` : u}
      ${a && t.natural ? p`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
            ><ha-icon icon="mdi:leaf"></ha-icon>${n && t.naturalLevel !== null ? t.naturalLevel : u}</span
          >` : n && (!a || t.speed !== null || !t.on) ? p`<span class="badge">${t.state}</span>` : u}
      ${a && t.lightOn ? p`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : u}
      ${a && t.timerEnds ? p`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${ze(t.timerEnds)}</span>` : u}
    </button>`;
  }
  _chipDown(t, e) {
    if (t.pointerType === "mouse" && t.button !== 0 || (this._chipCancelHold(), e.hold === "none")) return;
    const o = { fired: !1, timer: setTimeout(() => {
      o.fired = !0, this._chipAction(e, e.hold), this._fire("haptic", "medium");
    }, pr) };
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
        const o = t.config.popup ? this._config?.popups?.find((n) => n.id === t.config.popup) : void 0;
        if (o) {
          this._openPopup(o, null);
          break;
        }
        const i = wi(t.config);
        i && this._canCreate(i) ? this._showPopup(i) : this._fire("hass-more-info", { entityId: t.entity });
        break;
      }
      case "more-info":
        this._fire("hass-more-info", { entityId: t.entity });
        break;
      case "toggle":
      case "toggle_light": {
        const o = $i(t, e);
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
  /** Open one of the card's Pop-up Cards, anchored to `anchor` when Small. */
  _openPopup(t, e) {
    this._popupAnchor = e;
    const o = t.card;
    if (!o || typeof o.type != "string") {
      this._popup = t, this._popupMissing = "This pop-up has no card yet. Add one under Pop-up Cards in the editor.", this._showPopup(null, t);
      return;
    }
    if (!this._canCreate(o)) {
      this._popup = t, this._popupMissing = `The card type “${String(o.type)}” isn’t installed. Add it (e.g. from HACS) and reload.`, this._showPopup(null, t);
      return;
    }
    this._showPopup(o, t);
  }
  /** Seconds without use before the open pop-up / menu closes (0 = never). */
  _autoCloseSecs(t) {
    return t?.auto_close ?? this._config?.popup_auto_close ?? 30;
  }
  async _showPopup(t, e = null) {
    if (this._popup = e, t && (this._popupMissing = null), !t) {
      this._popupEl = void 0, this._popupOpen = !0, await this.updateComplete;
      const a = this.renderRoot.querySelector("dialog.popup");
      a && !a.open && a.showModal?.(), this._placePopup(), this._armPopupTimer();
      return;
    }
    let o;
    try {
      const a = window.loadCardHelpers;
      if (a) o = (await a()).createCardElement(t);
      else {
        const s = String(t.type);
        o = document.createElement(s.startsWith("custom:") ? s.slice(7) : `hui-${s}-card`), o.setConfig?.(t);
      }
    } catch (a) {
      console.error("[easy-thermostat-styler-card] pop-up card failed", a);
      return;
    }
    o.hass = this.hass, this._popupEl = o, this._popupOpen = !0, await this.updateComplete;
    const i = this.renderRoot.querySelector("dialog.popup"), n = this.renderRoot.querySelector(".popup-body");
    !i || !n || (n.replaceChildren(o), i.open || i.showModal?.(), this._placePopup(), this._armPopupTimer());
  }
  /** Small pop-ups sit next to their button (flipping to stay on screen). */
  _placePopup() {
    const t = this.renderRoot.querySelector("dialog.popup");
    if (!t) return;
    const e = (this._popup?.size ?? "medium") === "small" && !!this._popupAnchor;
    if (t.classList.toggle("anchored", e), !e) {
      t.style.left = "", t.style.top = "";
      return;
    }
    requestAnimationFrame(() => {
      const o = this._popupAnchor.getBoundingClientRect(), i = t.getBoundingClientRect(), n = this._popup?.direction ?? (o.top > window.innerHeight / 2 ? "up" : "down"), a = 6, s = window.innerWidth, c = window.innerHeight;
      let l = n === "right" ? o.right + a : n === "left" ? o.left - a - i.width : o.left + o.width / 2 - i.width / 2, d = n === "down" ? o.bottom + a : n === "up" ? o.top - a - i.height : o.top + o.height / 2 - i.height / 2;
      n === "down" && d + i.height > c && (d = o.top - a - i.height), n === "up" && d < 0 && (d = o.bottom + a), n === "right" && l + i.width > s && (l = o.left - a - i.width), n === "left" && l < 0 && (l = o.right + a), t.style.left = `${Math.round(Math.max(4, Math.min(l, s - i.width - 4)))}px`, t.style.top = `${Math.round(Math.max(4, Math.min(d, c - i.height - 4)))}px`;
    });
  }
  _renderPopup() {
    if (!this._popupOpen) return u;
    const t = this._popup, e = t?.size ?? "medium", o = t ? t.title !== !1 : !1, i = {};
    return t?.width && (i["--pop-w"] = `${t.width}px`), t?.height && (i["--pop-h"] = `${t.height}px`), t?.dim !== void 0 && (i["--pop-dim"] = String(t.dim / 100)), t?.blur !== void 0 && (i["--pop-blur"] = `${t.blur}px`), p`<dialog
      class="popup size-${e} ${o ? "has-title" : ""}"
      style=${S(i)}
      aria-label=${t?.name ?? "Pop-up"}
      @cancel=${this._closePopup}
      @pointerdown=${this._armPopupTimer}
      @keydown=${this._armPopupTimer}
      @wheel=${this._armPopupTimer}
      @input=${this._armPopupTimer}
      @click=${(n) => {
      n.target === n.currentTarget && this._closePopup();
    }}
    >
      <div class="popup-inner">
        ${o ? p`<div class="popup-title">
              ${t?.icon ? p`<ha-icon icon=${t.icon}></ha-icon>` : u}<span>${t?.name ?? ""}</span>
              <button class="popup-x" aria-label="Close" @click=${this._closePopup}><ha-icon icon="mdi:close"></ha-icon></button>
            </div>` : p`<button class="popup-close" aria-label="Close" @click=${this._closePopup}><ha-icon icon="mdi:close"></ha-icon></button>`}
        ${this._popupMissing ? p`<div class="popup-missing">${this._popupMissing}</div>` : u}
        <div class="popup-body"></div>
      </div>
    </dialog>`;
  }
};
ae.styles = [or, ar];
let E = ae;
F([
  ee({ attribute: !1 })
], E.prototype, "hass");
F([
  M()
], E.prototype, "_config");
F([
  M()
], E.prototype, "_open");
F([
  M()
], E.prototype, "_tick");
F([
  M()
], E.prototype, "_popupOpen");
F([
  M()
], E.prototype, "_popup");
F([
  M()
], E.prototype, "_popupMissing");
F([
  M()
], E.prototype, "_menu");
F([
  M()
], E.prototype, "_revealed");
F([
  M()
], E.prototype, "_bgPaused");
F([
  M()
], E.prototype, "_cycle");
customElements.get(At) || customElements.define(At, E);
const Rt = window;
Rt.customCards = Rt.customCards ?? [];
Rt.customCards.some((r) => r.type === At) || Rt.customCards.push({
  type: At,
  name: "Easy Thermostat Styler Card (Ltek)",
  description: "A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.",
  preview: !0
});
console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${He} `, "background:#ff8100;color:#fff", "background:#333;color:#fff");
