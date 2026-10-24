/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, Ut = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ht = Symbol(), ee = /* @__PURE__ */ new WeakMap();
let Se = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ht) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ut && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ee.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ee.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ae = (o) => new Se(typeof o == "string" ? o : o + "", void 0, Ht), Dt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, r, a) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + o[a + 1], o[0]);
  return new Se(e, o, Ht);
}, Ze = (o, t) => {
  if (Ut) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = pt.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, o.appendChild(i);
  }
}, ie = Ut ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Ae(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Je, defineProperty: Qe, getOwnPropertyDescriptor: ti, getOwnPropertyNames: ei, getOwnPropertySymbols: ii, getPrototypeOf: ri } = Object, kt = globalThis, re = kt.trustedTypes, oi = re ? re.emptyScript : "", ai = kt.reactiveElementPolyfillSupport, it = (o, t) => o, bt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? oi : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, It = (o, t) => !Je(o, t), oe = { attribute: !0, type: String, converter: bt, reflect: !1, useDefault: !1, hasChanged: It };
Symbol.metadata ??= Symbol("metadata"), kt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let K = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = oe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Qe(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: a } = ti(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const s = r?.call(this);
      a?.call(this, n), this.requestUpdate(t, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    const t = ri(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))) {
      const e = this.properties, i = [...ei(e), ...ii(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(ie(r));
    } else t !== void 0 && e.push(ie(t));
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
    return Ze(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : bt).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : bt;
      this._$Em = r;
      const s = n.fromAttribute(e, a.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, a) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[t]), i ??= n.getPropertyOptions(t), !((i.hasChanged ?? It)(a, e) || i.useDefault && i.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: a }, n) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, a] of i) {
        const { wrapped: n } = a, s = this[r];
        n !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, a, s);
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
K.elementStyles = [], K.shadowRootOptions = { mode: "open" }, K[it("elementProperties")] = /* @__PURE__ */ new Map(), K[it("finalized")] = /* @__PURE__ */ new Map(), ai?.({ ReactiveElement: K }), (kt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = globalThis, ae = (o) => o, vt = jt.trustedTypes, ne = vt ? vt.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Ee = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, Te = "?" + D, ni = `<${Te}>`, W = document, rt = () => W.createComment(""), ot = (o) => o === null || typeof o != "object" && typeof o != "function", qt = Array.isArray, si = (o) => qt(o) || typeof o?.[Symbol.iterator] == "function", Et = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, se = /-->/g, le = />/g, q = RegExp(`>|${Et}(?:([^\\s"'>=/]+)(${Et}*=${Et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, de = /"/g, Ce = /^(?:script|style|textarea|title)$/i, li = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), c = li(1), I = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), he = /* @__PURE__ */ new WeakMap(), V = W.createTreeWalker(W, 129);
function ze(o, t) {
  if (!qt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ne !== void 0 ? ne.createHTML(t) : t;
}
const ci = (o, t) => {
  const e = o.length - 1, i = [];
  let r, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Q;
  for (let s = 0; s < e; s++) {
    const l = o[s];
    let d, u, p = -1, g = 0;
    for (; g < l.length && (n.lastIndex = g, u = n.exec(l), u !== null); ) g = n.lastIndex, n === Q ? u[1] === "!--" ? n = se : u[1] !== void 0 ? n = le : u[2] !== void 0 ? (Ce.test(u[2]) && (r = RegExp("</" + u[2], "g")), n = q) : u[3] !== void 0 && (n = q) : n === q ? u[0] === ">" ? (n = r ?? Q, p = -1) : u[1] === void 0 ? p = -2 : (p = n.lastIndex - u[2].length, d = u[1], n = u[3] === void 0 ? q : u[3] === '"' ? de : ce) : n === de || n === ce ? n = q : n === se || n === le ? n = Q : (n = q, r = void 0);
    const b = n === q && o[s + 1].startsWith("/>") ? " " : "";
    a += n === Q ? l + ni : p >= 0 ? (i.push(d), l.slice(0, p) + Ee + l.slice(p) + D + b) : l + D + (p === -2 ? s : b);
  }
  return [ze(o, a + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class at {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let a = 0, n = 0;
    const s = t.length - 1, l = this.parts, [d, u] = ci(t, e);
    if (this.el = at.createElement(d, i), V.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = V.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(Ee)) {
          const g = u[n++], b = r.getAttribute(p).split(D), f = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: a, name: f[2], strings: b, ctor: f[1] === "." ? hi : f[1] === "?" ? pi : f[1] === "@" ? ui : St }), r.removeAttribute(p);
        } else p.startsWith(D) && (l.push({ type: 6, index: a }), r.removeAttribute(p));
        if (Ce.test(r.tagName)) {
          const p = r.textContent.split(D), g = p.length - 1;
          if (g > 0) {
            r.textContent = vt ? vt.emptyScript : "";
            for (let b = 0; b < g; b++) r.append(p[b], rt()), V.nextNode(), l.push({ type: 2, index: ++a });
            r.append(p[g], rt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Te) l.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(D, p + 1)) !== -1; ) l.push({ type: 7, index: a }), p += D.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const i = W.createElement("template");
    return i.innerHTML = t, i;
  }
}
function J(o, t, e = o, i) {
  if (t === I) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const a = ot(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(o), r._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = J(o, r._$AS(o, t.values), r, i)), t;
}
class di {
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
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? W).importNode(e, !0);
    V.currentNode = r;
    let a = V.nextNode(), n = 0, s = 0, l = i[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new nt(a, a.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(a, l.name, l.strings, this, t) : l.type === 6 && (d = new fi(a, this, t)), this._$AV.push(d), l = i[++s];
      }
      n !== l?.index && (a = V.nextNode(), n++);
    }
    return V.currentNode = W, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class nt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = J(this, t, e), ot(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : si(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && ot(this._$AH) ? this._$AA.nextSibling.data = t : this.T(W.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = at.createElement(ze(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const a = new di(r, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = he.get(t.strings);
    return e === void 0 && he.set(t.strings, e = new at(t)), e;
  }
  k(t) {
    qt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const a of t) r === e.length ? e.push(i = new nt(this.O(rt()), this.O(rt()), this, this.options)) : i = e[r], i._$AI(a), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ae(t).nextSibling;
      ae(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class St {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, a) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, r) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = J(this, t, e, 0), n = !ot(t) || t !== this._$AH && t !== I, n && (this._$AH = t);
    else {
      const s = t;
      let l, d;
      for (t = a[0], l = 0; l < a.length - 1; l++) d = J(this, s[i + l], e, l), d === I && (d = this._$AH[l]), n ||= !ot(d) || d !== this._$AH[l], d === h ? t = h : t !== h && (t += (d ?? "") + a[l + 1]), this._$AH[l] = d;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class hi extends St {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class pi extends St {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class ui extends St {
  constructor(t, e, i, r, a) {
    super(t, e, i, r, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = J(this, t, e, 0) ?? h) === I) return;
    const i = this._$AH, r = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, a = t !== h && (i === h || r);
    r && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class fi {
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
const gi = jt.litHtmlPolyfillSupport;
gi?.(at, nt), (jt.litHtmlVersions ??= []).push("3.3.3");
const mi = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const a = e?.renderBefore ?? null;
    i._$litPart$ = r = new nt(t.insertBefore(rt(), a), a, void 0, e ?? {});
  }
  return r._$AI(o), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = globalThis;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = mi(e, this.renderRoot, this.renderOptions);
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
Z._$litElement$ = !0, Z.finalized = !0, Yt.litElementHydrateSupport?.({ LitElement: Z });
const bi = Yt.litElementPolyfillSupport;
bi?.({ LitElement: Z });
(Yt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vi = { attribute: !0, type: String, converter: bt, reflect: !1, hasChanged: It }, _i = (o = vi, t, e) => {
  const { kind: i, metadata: r } = e;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), i === "setter" && ((o = Object.create(o)).wrapped = !0), a.set(e.name, o), i === "accessor") {
    const { name: n } = e;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(n, l, o, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, o, s), s;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(s) {
      const l = this[n];
      t.call(this, s), this.requestUpdate(n, l, o, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Vt(o) {
  return (t, e) => typeof e == "object" ? _i(o, t, e) : ((i, r, a) => {
    const n = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, i), n ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(o) {
  return Vt({ ...o, state: !0, attribute: !1 });
}
const Me = "2026.10.24.13", _t = "easy-thermostat-styler-card", Mt = "easy-thermostat-styler-card-editor", Re = [
  "name",
  "status",
  "current",
  "unit",
  "humidity",
  "pill",
  "wheel_value",
  "wheel_neighbor",
  "bar"
], wi = [
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
], m = {
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
}, Pe = [
  { type: "hvac" },
  { type: "preset", display: "toggle" },
  { type: "fan_mode", display: "toggle" }
], L = (o) => !!o && typeof o == "object" && !Array.isArray(o);
function wt(o) {
  if (!(o == null || o === "")) {
    if (typeof o == "number") return Number.isFinite(o) ? o : void 0;
    if (Array.isArray(o)) {
      const t = o.map(wt).filter((e) => e !== void 0);
      return t.length ? t : void 0;
    }
    if (L(o)) {
      const t = {};
      for (const [e, i] of Object.entries(o)) {
        const r = wt(i);
        r !== void 0 && (t[e] = r);
      }
      return Object.keys(t).length ? t : void 0;
    }
    return o;
  }
}
const k = (o, t, e) => {
  const i = typeof o == "number" ? o : typeof o == "string" && o.trim() ? Number(o) : NaN;
  return Number.isFinite(i) ? Math.min(e, Math.max(t, i)) : void 0;
};
function yi(o) {
  if (!L(o) || typeof o.type != "string") return;
  const t = { ...o };
  return "columns" in t && (t.columns = k(t.columns, 0, 12) || void 0), Array.isArray(t.chips) && (t.chips = t.chips.filter((e) => L(e) && typeof e.entity == "string" && e.entity)), t;
}
function Rt(o) {
  if (!L(o)) throw new Error("Invalid configuration");
  const t = { ...o };
  if (typeof t.entity != "string" || !t.entity)
    throw new Error("Easy Thermostat Styler Card: set an entity (a climate.* entity).");
  const e = L(t.setpoint) ? { ...t.setpoint } : void 0;
  if (e && ("scale" in e && (e.scale = k(e.scale, 40, 250)), "neighbors" in e && (e.neighbors = k(e.neighbors, 0, 3)), "min_gap" in e && (e.min_gap = k(e.min_gap, 0, 20)), "hide_after" in e && (e.hide_after = k(e.hide_after, 0, 300)), t.setpoint = e), L(t.background)) {
    const i = { ...t.background };
    if ("strength" in i && (i.strength = k(i.strength, 0, 100)), "speed" in i && (i.speed = k(i.speed, 25, 300)), "scrim" in i && (i.scrim = k(i.scrim, -60, 60) || void 0), "vignette" in i && (i.vignette = k(i.vignette, 0, 100) || void 0), "grain" in i && (i.grain = k(i.grain, 0, 100) || void 0), "frost_blur" in i && (i.frost_blur = k(i.frost_blur, 0, 40)), "air_max" in i && (i.air_max = k(i.air_max, 0.01, 1e6)), L(i.image)) {
      const r = { ...i.image };
      "blur" in r && (r.blur = k(r.blur, 0, 40) || void 0), "darken" in r && (r.darken = k(r.darken, 0, 90) || void 0), i.image = r;
    }
    L(i.gradient) && "angle" in i.gradient && (i.gradient = { ...i.gradient, angle: k(i.gradient.angle, 0, 360) }), t.background = i;
  }
  if ("frost_blur" in t && (t.frost_blur = k(t.frost_blur, 0, 40)), L(t.effects)) {
    const i = { ...t.effects };
    "size" in i && (i.size = k(i.size, 2, 60)), "speed" in i && (i.speed = k(i.speed, 0.6, 8)), t.effects = i;
  }
  return Array.isArray(t.sets) && (t.sets = t.sets.map(yi).filter(Boolean), t.sets.length === 0) ? { ...wt({ ...t, sets: void 0 }), sets: [] } : wt(t);
}
function $i(o, t) {
  return t.split(".").reduce((e, i) => L(e) || Array.isArray(e) ? e[i] : void 0, o);
}
function A(o, t, e) {
  const i = t.split("."), r = (a, n) => {
    const s = Array.isArray(a) ? [...a] : L(a) ? { ...a } : {}, l = i[n];
    if (n === i.length - 1)
      e === void 0 || e === "" || e === null ? Array.isArray(s) ? s.splice(Number(l), 1) : delete s[l] : s[l] = e;
    else {
      const d = r(s[l], n + 1);
      d === void 0 ? delete s[l] : s[l] = d;
    }
    if (!(!Array.isArray(s) && Object.keys(s).length === 0))
      return s;
  };
  return r(o, 0) ?? {};
}
const ut = {
  hvac: "Mode",
  preset: "Preset",
  fan_mode: "Fan",
  chips: "Devices"
}, xi = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, Oe = {
  hvac: { list: "hvac_modes", active: null },
  preset: { list: "preset_modes", active: "preset_mode" },
  fan_mode: { list: "fan_modes", active: "fan_mode" }
}, Wt = {
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
}, pe = {
  heat_cool: "Heat/Cool",
  fan_only: "Fan only",
  off: "Off"
}, ki = {
  heat: "var(--state-climate-heat-color, #ff8100)",
  cool: "var(--state-climate-cool-color, #2b9af9)",
  heat_cool: "var(--state-climate-heat-cool-color, #ffa600)",
  auto: "var(--state-climate-auto-color, #008000)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan-only-color, #009688)",
  off: "var(--state-climate-off-color, #8a8a8a)"
}, ue = "var(--primary-color, #03a9f4)";
function Pt(o) {
  if (pe[o]) return pe[o];
  const t = o.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Si(o, t, e, i) {
  const r = o;
  try {
    if (e === "hvac" && r.formatEntityState) return r.formatEntityState(t, i);
    if (e !== "hvac" && e !== "chips" && r.formatEntityAttributeValue) {
      const a = e === "preset" ? "preset_mode" : "fan_mode", n = r.formatEntityAttributeValue(t, a, i);
      if (n) return n;
    }
  } catch {
  }
  return Pt(i);
}
function Ai(o) {
  return Array.isArray(o.sets) ? o.sets : Pe;
}
function Ot(o, t) {
  if (!o || t === "chips") return [];
  const e = o.attributes[Oe[t].list];
  return Array.isArray(e) ? e.map(String) : [];
}
function Le(o, t) {
  if (!t?.length) return o;
  const e = /* @__PURE__ */ new Set(), i = [];
  for (const r of t) o.includes(r) && !e.has(r) && (i.push(r), e.add(r));
  for (const r of o) e.has(r) || i.push(r);
  return i;
}
function Ei(o, t) {
  const e = o.states[t.entity], i = [];
  return Ai(t).forEach((r, a) => {
    if (r.hidden) return;
    const n = r.type;
    let s = [];
    if (n !== "chips") {
      if (!e) return;
      const l = Ot(e, n);
      if (!l.length) return;
      const d = Oe[n].active, u = d ? String(e.attributes[d] ?? "") : e.state;
      if (s = Le(l, r.order).filter((p) => !r.options?.[p]?.hide).map((p) => {
        const g = r.options?.[p];
        return {
          value: p,
          label: g?.name ?? Si(o, e, n, p),
          icon: g?.icon ?? Wt[p.toLowerCase()] ?? "mdi:circle-medium",
          active: p === u,
          color: n === "hvac" ? ki[p] ?? ue : ue
        };
      }), !s.length) return;
    } else if (!r.chips?.length) return;
    i.push({
      key: `${n}-${a}`,
      index: a,
      type: n,
      title: r.name ?? ut[n],
      zone: r.zone ?? (t.toggles_zone || "bottom"),
      orientation: r.orientation ?? (r.zone === "left" || r.zone === "right" ? "column" : "row"),
      columns: r.columns ?? 0,
      align: r.align ?? (n === "chips" ? "center" : "stretch"),
      // Compact turns full-time sets into toggles; menus are already compact.
      display: r.display === "menu" && n !== "chips" ? "menu" : t.compact ? "toggle" : r.display ?? "always",
      menuDirection: r.menu_direction ?? Lt(r.zone ?? (t.toggles_zone || "bottom")),
      menuShowName: r.menu_show_name ?? !0,
      toggleIcon: r.toggle_icon ?? xi[n],
      options: s,
      config: r
    });
  }), i;
}
function Lt(o) {
  return o === "bottom" ? "up" : o === "left" ? "right" : o === "right" ? "left" : "down";
}
function fe(o, t, e) {
  switch (o) {
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
function S(o) {
  if (typeof o == "number") return Number.isFinite(o) ? o : null;
  if (typeof o == "string" && o.trim() !== "") {
    const t = Number(o);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
const yt = /* @__PURE__ */ new Set(["unavailable", "unknown", "none", ""]);
function Be(o) {
  switch (o) {
    case "heat":
    case "cool":
    case "heat_cool":
    case "dry":
    case "fan_only":
    case "off":
      return o;
    case "auto":
      return "heat_cool";
    default:
      return "unknown";
  }
}
function Ti(o) {
  switch (o) {
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
function Ci(o, t, e) {
  return o === "off" ? "off" : t === null || e === null ? null : e.heat !== null && (o === "heat" || o === "heat_cool") && t < e.heat ? "heating" : e.cool !== null && (o === "cool" || o === "heat_cool") && t > e.cool ? "cooling" : o === "heat" || o === "cool" || o === "heat_cool" ? "idle" : null;
}
function zi(o, t) {
  if (o === "heat_cool") {
    const i = S(t.target_temp_low), r = S(t.target_temp_high);
    if (i !== null || r !== null) return { heat: i, cool: r };
    const a = S(t.temperature);
    return a === null ? null : { heat: a, cool: null };
  }
  const e = S(t.temperature);
  return e === null ? null : o === "heat" ? { heat: e, cool: null } : o === "cool" ? { heat: null, cool: e } : null;
}
function Mi(o, t) {
  const e = o.states[t.entity], i = o.config?.unit_system?.temperature ?? "°", r = e?.attributes.friendly_name, a = t.name ?? (typeof r == "string" ? r : t.entity);
  if (!e || yt.has(e.state))
    return {
      available: !1,
      name: a,
      currentTemp: null,
      unit: i,
      humidity: null,
      equipment: null,
      mode: "unknown",
      state: e?.state ?? "unavailable",
      setpoints: null
    };
  const n = e.attributes, s = Be(e.state), l = S(n.current_temperature), d = zi(s, n);
  return {
    available: !0,
    name: a,
    currentTemp: l,
    unit: i,
    humidity: S(n.current_humidity),
    equipment: Ti(n.hvac_action) ?? Ci(s, l, d),
    mode: s,
    state: e.state,
    setpoints: d
  };
}
function U(o, t) {
  if (o === null) return "–";
  const e = t.includes("C"), i = e ? Math.round(o * 2) / 2 : Math.round(o);
  return e && !Number.isInteger(i) ? i.toFixed(1) : String(i);
}
const Ri = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan",
  idle: "Idle",
  off: "Off"
}, ge = [
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
], Pi = [
  ["heating", "Heating"],
  ["cooling", "Cooling"],
  ["idle_heat", "Idle (heat)"],
  ["idle_cool", "Idle (cool)"],
  ["fan", "Air movement"],
  ["off", "Off"]
], me = "var(--state-climate-heat-color, #ff8100)", be = "var(--state-climate-cool-color, #2b9af9)", ft = {
  heating: { main: me, second: "#d1342a" },
  cooling: { main: be, second: "#3446d6" },
  idle_heat: { main: me, second: "#7a3d14" },
  idle_cool: { main: be, second: "#1b4c86" },
  fan: { main: "var(--state-climate-fan-only-color, #00bfa5)", second: "#3d8fd1" },
  off: { main: "#8a8a92", second: "#3a3a4a" }
}, M = {
  strength: 85,
  speed: 100,
  follow_gap: !0,
  off: "calm",
  quality: "smooth",
  frost_blur: 12
}, ve = {
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
}, _e = /* @__PURE__ */ new Set(["off", "idle", "closed", "false", "no", "none", "stopped", "standby", "0", "not_running", "clear"]), Oi = /* @__PURE__ */ new Set(["on", "true", "yes", "open", "running", "detected", "active"]), G = (o) => Math.min(1, Math.max(0.05, o));
function Gt(o) {
  return o.background?.air_entity || o.background?.fan_entity || void 0;
}
function Ne(o, t, e) {
  if (!t) return null;
  const i = o.states[t];
  if (!i || yt.has(i.state)) return null;
  const r = String(i.state).trim().toLowerCase(), a = t.split(".")[0];
  if (_e.has(r)) return null;
  const n = i.attributes;
  if (a === "fan") {
    const u = S(n.percentage);
    return u === null ? 0.6 : u <= 0 ? null : G(u / 100);
  }
  const s = S(i.state);
  if (s !== null) {
    if (s <= 0) return null;
    if (e) return G(s / e);
    const u = S(n.min), p = S(n.max);
    if (p !== null && p > (u ?? 0)) return G((s - (u ?? 0)) / (p - (u ?? 0)));
    if (String(n.unit_of_measurement ?? "").trim() === "%") return G(s / 100);
    const g = s <= 1 ? 1 : s <= 10 ? 10 : 10 ** Math.ceil(Math.log10(s));
    return G(s / g);
  }
  if (ve[r] !== void 0) return ve[r];
  const l = Array.isArray(n.options) ? n.options.map((u) => String(u).toLowerCase()).filter((u) => !_e.has(u) && u !== "auto") : [], d = l.indexOf(r);
  return d >= 0 ? G((d + 1) / l.length) : Oi.has(r) ? 0.6 : 0.5;
}
function Li(o, t) {
  const e = o.states[t.entity], i = String(e?.attributes.fan_mode ?? "").toLowerCase(), r = { quiet: 0.2, low: 0.33, medium: 0.6, middle: 0.6, high: 1, max: 1, turbo: 1 };
  if (r[i] !== void 0) return r[i];
  const a = (Array.isArray(e?.attributes.fan_modes) ? e.attributes.fan_modes : []).map((s) => String(s).toLowerCase()).filter((s) => !["auto", "off", "on", "circulate", "diffuse", "focus"].includes(s)), n = a.indexOf(i);
  return n >= 0 && a.length ? (n + 1) / a.length : 0.5;
}
function Bi(o, t, e) {
  if (!e.available) return "off";
  if (e.equipment === "heating") return "heating";
  if (e.equipment === "cooling") return "cooling";
  if (e.mode === "fan_only" || e.equipment === "fan" || Ne(o, Gt(t), t.background?.air_max) !== null) return "fan";
  if (e.mode === "off") return "off";
  if (e.mode === "cool" || e.mode === "dry" || e.equipment === "drying") return "idle_cool";
  if (e.mode === "heat_cool" && e.setpoints && e.currentTemp !== null) {
    const { heat: i, cool: r } = e.setpoints;
    if (i !== null && r !== null) return e.currentTemp >= (i + r) / 2 ? "idle_cool" : "idle_heat";
    if (r !== null && i === null) return "idle_cool";
  }
  return "idle_heat";
}
function Ni(o, t) {
  const e = o.currentTemp, i = o.setpoints, r = t === "heating" ? i?.heat ?? i?.cool : i?.cool ?? i?.heat;
  if (e === null || r === null || r === void 0) return 0.7;
  const a = o.unit.includes("C") ? 3 : 5;
  return Math.round(Math.min(1, Math.abs(r - e) / a) * 10) / 10;
}
const Fi = (o) => Math.max(0.1, Math.round(o * 4) / 4);
function Ui(o, t, e) {
  const i = t.background ?? {}, r = i.style ?? "none";
  if (r === "none") return null;
  const a = Bi(o, t, e);
  if (a === "off" && (i.off ?? M.off) === "none") return null;
  const n = (i.speed ?? M.speed) / 100, s = (i.strength ?? M.strength) / 100;
  let l, d;
  if (a === "heating" || a === "cooling") {
    const g = i.follow_gap ?? M.follow_gap ? Ni(e, a) : 0.7;
    l = 0.6 + 1.4 * g, d = 0.6 + 0.4 * g;
  } else a === "fan" ? (l = 0.4 + 2.6 * (Ne(o, Gt(t), i.air_max) ?? Li(o, t)), d = 0.8) : a === "off" ? (l = 0.2, d = 0.35) : (l = 0.35, d = 0.55);
  const u = i.colors?.[a] ?? {}, p = ft[a];
  return {
    style: r,
    state: a,
    dir: a === "fan" ? "swirl" : a === "off" ? "still" : a === "heating" || a === "idle_heat" ? "up" : "down",
    rate: Fi(l * n),
    opacity: Math.round(d * s * 100) / 100,
    main: u.main || p.main,
    second: u.second || p.second,
    blades: a === "fan"
  };
}
function Fe(o) {
  return !!(o.frosted ?? o.background?.frosted);
}
function Hi(o) {
  const t = o.background ?? {}, e = t.gradient?.stops?.filter(Boolean) ?? [];
  return t.fill === "gradient" && e.length >= 2 ? t.gradient?.type === "radial" ? `radial-gradient(circle at 50% 40%, ${e.join(", ")})` : `linear-gradient(${t.gradient?.angle ?? 135}deg, ${e.join(", ")})` : t.color ?? o.card?.background;
}
function Di(o) {
  return o.replace(/[\\"]/g, (t) => `\\${t}`).replace(/[\n\r]/g, "");
}
function Ii(o, t) {
  const e = o.background ?? {}, i = {};
  t && (i["--etc-bg-a"] = t.main, i["--etc-bg-b"] = t.second, i["--etc-bg-op"] = String(t.opacity), i["--bg-rate"] = String(t.rate)), (e.quality ?? M.quality) === "light" && (i["--bg-blur-k"] = "0.6"), e.scrim && (i["--bg-scrim"] = String(Math.abs(e.scrim) / 100), i["--bg-scrim-c"] = e.scrim > 0 ? "#000" : "#fff"), e.vignette && (i["--bg-vig"] = String(e.vignette / 100)), e.grain && (i["--bg-grain"] = String(e.grain / 100));
  const r = o.frost_blur ?? e.frost_blur;
  return Fe(o) && r !== void 0 && (i["--frost"] = `${r}px`), e.fill === "image" && e.image?.url && (i["--bg-img"] = `url("${Di(e.image.url)}")`, e.image.blur && (i["--bg-img-blur"] = `${e.image.blur}px`), e.image.darken && (i["--bg-img-dark"] = String(e.image.darken / 100))), i;
}
function Ue(o, t) {
  const e = t === "light", r = {
    plasma: [5, 4, 45, 75, 18, 30],
    lava: [6, 4, 18, 34, 16, 26],
    shimmer: [7, 4, 40, 70, 9, 15],
    particles: [22, 10, 3, 9, 10, 20],
    aurora: [3, 2, 30, 42, 14, 22]
  }[o];
  if (!r) return [];
  const [a, n, s, l, d, u] = r, p = e ? n : a;
  let g = o.length * 9973 + 17;
  const b = () => (g = (g * 1664525 + 1013904223) % 4294967296, g / 4294967296);
  return Array.from({ length: p }, (f, v) => {
    const w = Math.round(d + b() * (u - d));
    return {
      x: Math.round(8 + b() * 84),
      y: o === "aurora" ? [12, 38, 62][v % 3] : Math.round(10 + b() * 80),
      s: Math.round(s + b() * (l - s)),
      d: w,
      // Spread evenly through the cycle, with a little jitter.
      dl: -Math.round((v + b() * 0.5) / p * w * 10) / 10
    };
  });
}
const He = {
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
function Bt(o, t) {
  const e = { ...He };
  for (const i of [o, t])
    if (i)
      for (const r of wi) {
        const a = i[r];
        a !== void 0 && a !== "" && a !== null && (e[r] = a);
      }
  return e;
}
const et = (o) => o ? `${o}px` : void 0;
function we(o) {
  const t = {
    "--etc-b-radius": o.radius !== void 0 ? `${o.radius}px` : void 0,
    "--etc-b-height": et(o.height),
    "--etc-b-minw": et(o.min_width),
    "--etc-b-gap": o.gap !== void 0 ? `${o.gap}px` : void 0,
    "--etc-b-icon": et(o.icon_size),
    "--etc-b-fs": et(o.font_size),
    "--etc-b-fw": o.font_weight ? String(o.font_weight) : void 0,
    "--etc-b-bw": o.border_width !== void 0 ? `${o.border_width}px` : void 0,
    "--etc-b-bg": o.background,
    "--etc-b-fg": o.color,
    "--etc-b-bc": o.border_color,
    "--etc-b-abg": o.active_background,
    "--etc-b-afg": o.active_color,
    "--etc-b-abc": o.active_border_color
  };
  return Xt(t);
}
const ji = {
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
function qi(o) {
  const t = {};
  for (const e of Re) {
    const i = o?.[e];
    if (!i) continue;
    const r = `--etc-t-${ji[e]}`;
    t[`${r}-fs`] = et(i.size), t[`${r}-fw`] = i.weight ? String(i.weight) : void 0, t[`${r}-c`] = i.color, t[`${r}-tt`] = i.transform, t[`${r}-ls`] = i.letter_spacing !== void 0 ? `${i.letter_spacing / 100}em` : void 0, t[`${r}-fst`] = i.italic === void 0 ? void 0 : i.italic ? "italic" : "normal", t[`${r}-op`] = i.opacity !== void 0 ? String(i.opacity / 100) : void 0;
  }
  return Xt(t);
}
function Yi(o) {
  const t = o.card ?? {}, e = o.setpoint ?? {};
  return Xt({
    "--etc-card-bg": Hi(o),
    "--etc-card-bc": t.border_color,
    "--etc-card-bw": t.border_width !== void 0 ? `${t.border_width}px` : void 0,
    "--etc-card-r": t.radius !== void 0 ? `${t.radius}px` : void 0,
    "--etc-card-pad": t.padding !== void 0 ? `${t.padding}px` : void 0,
    "--etc-scale": e.scale !== void 0 ? String(e.scale / 100) : void 0
  });
}
function Xt(o) {
  const t = {};
  for (const [e, i] of Object.entries(o)) i !== void 0 && i !== "" && (t[e] = i);
  return t;
}
const Vi = `
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
`, Wi = "esphome_rf_fan", Gi = "custom:rf-fan-ltek";
function De(o, t) {
  const e = o.entities, i = e?.[t]?.device_id;
  return !e || !i ? [] : Object.values(e).filter((r) => r.device_id === i && r.entity_id !== t).map((r) => r.entity_id);
}
function Xi(o, t) {
  const e = De(o, t).filter((r) => r.startsWith("light.")), i = o.entities ?? {};
  return e.find((r) => i[r]?.platform === Wi) ?? e[0] ?? null;
}
function Ki(o, t) {
  const e = o.entities ?? {}, i = De(o, t).filter((r) => r.startsWith("sensor."));
  return i.find((r) => e[r]?.translation_key === "sleep_timer") ?? i.find((r) => o.states[r]?.attributes.device_class === "timestamp") ?? null;
}
function Zi(o, t) {
  const e = o?.attributes.friendly_name;
  return typeof e == "string" ? e : t;
}
function Ji(o, t) {
  const e = o.split(".")[0], r = {
    fan: ["mdi:fan", "mdi:fan-off"],
    light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
    switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
    binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
    sensor: ["mdi:eye", "mdi:eye"]
  }[e ?? ""] ?? ["mdi:circle", "mdi:circle-outline"];
  return t ? r[0] : r[1];
}
function Nt(o, t, e) {
  const i = o.states[t.entity], r = !!i && !yt.has(i.state), a = r && !["off", "idle", "closed", "standby"].includes(i.state), n = {
    index: e,
    type: t.type,
    entity: t.entity,
    name: t.name ?? Zi(i, t.entity),
    icon: t.icon ?? (typeof i?.attributes.icon == "string" ? i.attributes.icon : Ji(t.entity, a)),
    on: a,
    available: r,
    state: r ? ir(o, i) : "Unavailable",
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
  if (t.type !== "rf_fan" || !i) return n;
  const s = i.attributes, l = S(s.percentage), d = Qi(s), u = a && l !== null && d ? Math.max(1, Math.min(d, Math.round(l * d / 100))) : null, p = Xi(o, t.entity), g = Ki(o, t.entity), b = g ? o.states[g]?.state : void 0, f = b && !yt.has(b) ? new Date(b) : null, v = typeof s.preset_mode == "string" ? s.preset_mode : "", w = a && !!v && v !== "normal", x = w ? ye(v) : null, H = Array.isArray(s.preset_modes) ? s.preset_modes.filter((_) => ye(String(_)) !== null).length : 0, y = t.speed_format ?? "number", z = u === null ? "On" : y === "fraction" && d ? `${u}/${d}` : y === "percent" && l !== null ? `${Math.round(l)}%` : String(u);
  return {
    ...n,
    icon: t.icon ?? "mdi:ceiling-fan",
    // In Breeze/natural mode the level is what matters, not the underlying speed.
    state: r ? a ? x !== null ? String(x) : z : "Off" : "Unavailable",
    speed: u,
    speedCount: d,
    naturalLevel: x,
    naturalLevels: H,
    percentage: l,
    direction: s.direction === "reverse" ? "reverse" : s.direction === "forward" ? "forward" : null,
    natural: w,
    lightEntity: p,
    lightOn: !!p && o.states[p]?.state === "on",
    timerEnds: f && !Number.isNaN(f.getTime()) && f.getTime() > Date.now() ? f : null,
    spin: a ? tr(l) : null
  };
}
function Qi(o) {
  const t = S(o.speed_count);
  if (t && t > 0) return Math.round(t);
  const e = S(o.percentage_step);
  return e && e > 0 && e < 100 ? Math.round(100 / e) : null;
}
function ye(o) {
  const t = /^natural[ _]?(\d+)$/i.exec(o.trim());
  return t ? Number(t[1]) : null;
}
function tr(o) {
  const t = Math.min(100, Math.max(1, o ?? 50));
  return Math.round((3 - t / 100 * 2.4) * 100) / 100;
}
function er(o, t = Date.now()) {
  const e = Math.max(0, Math.round((o.getTime() - t) / 6e4)), i = Math.floor(e / 60);
  return i ? `${i}h${String(e % 60).padStart(2, "0")}` : `${e}m`;
}
function ir(o, t) {
  const e = o;
  try {
    if (e.formatEntityState) return e.formatEntityState(t);
  } catch {
  }
  const i = t.attributes.unit_of_measurement;
  return i ? `${t.state} ${i}` : t.state.charAt(0).toUpperCase() + t.state.slice(1);
}
function rr(o) {
  return o.popup_card ? o.popup_card : o.type === "rf_fan" ? { type: Gi, fan_entity: o.entity } : null;
}
function or(o, t) {
  if (t === "toggle_light")
    return o.lightEntity ? { domain: "light", service: "toggle", data: { entity_id: o.lightEntity } } : null;
  const e = o.entity.split(".")[0];
  return ["fan", "light", "switch", "input_boolean", "climate", "humidifier", "media_player", "cover"].includes(e) ? { domain: "homeassistant", service: "toggle", data: { entity_id: o.entity } } : null;
}
const Ie = ["card", "setpoint", "pill", "mode_button", "mode_icon"], ar = {
  card: "Entire card",
  setpoint: "Setpoint value (wheel, stepper or bar handle)",
  pill: "Setpoint pill",
  mode_button: "Mode button",
  mode_icon: "Mode icon"
}, gt = { when: "running", size: 18, speed: 2.4 };
function je(o, t) {
  const e = o.effects?.[t];
  return e || (t === "card" && (o.card?.glow ?? !0) ? "glow" : "none");
}
function nr(o, t) {
  if (!t.available) return null;
  if (t.equipment === "heating") return "heat";
  if (t.equipment === "cooling") return "cool";
  if ((o.effects?.when ?? gt.when) === "mode") {
    if (t.mode === "heat") return "heat";
    if (t.mode === "cool") return "cool";
  }
  return null;
}
function sr(o, t) {
  const e = nr(o, t), i = {};
  if (!e) return i;
  i["fx-on"] = !0, i[`fx-${e}`] = !0;
  for (const r of Ie) {
    const a = je(o, r);
    (a === "glow" || a === "both") && (i[`fx-${r}-glow`] = !0), (a === "pulse" || a === "both") && (i[`fx-${r}-pulse`] = !0);
  }
  return i;
}
function lr(o) {
  const t = o.effects ?? {}, e = {};
  return t.size !== void 0 && (e["--fx-size"] = `${t.size}px`), t.speed !== void 0 && (e["--fx-speed"] = `${t.speed}s`), t.heat_color && (e["--fx-heat"] = t.heat_color), t.cool_color && (e["--fx-cool"] = t.cool_color), e;
}
const qe = [
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
], R = (o = {}) => ({ type: "hvac", ...o }), O = (o = {}) => ({ type: "preset", ...o }), F = (o = {}) => ({ type: "fan_mode", ...o }), Ft = [
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
      sets: [R(), O({ display: "toggle" }), F({ display: "toggle" })]
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
        R({ zone: "top", align: "center" }),
        O({ display: "menu", zone: "bottom" }),
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
      sets: [R({ zone: "top", align: "center" }), O({ display: "toggle" }), F({ display: "toggle" })]
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
        R({ display: "menu", menu_show_name: !1 }),
        O({ display: "menu", menu_show_name: !1 }),
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
      sets: [R({ zone: "left" }), O({ display: "menu", zone: "bottom" }), F({ display: "menu", zone: "bottom" })]
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
      sets: [R(), O({ columns: 4 }), F({ display: "toggle" })]
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
      sets: [R({ align: "center" })]
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
      sets: [R(), O({ display: "menu" }), F({ display: "menu" })]
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
      sets: [R(), O(), F()]
    }
  }
];
Ft.push(
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
      sets: [R({ display: "menu" }), O({ display: "menu" }), F({ display: "menu" })]
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
      sets: [R(), O({ display: "toggle" }), F({ display: "toggle" })]
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
      sets: [R({ align: "center" }), O({ display: "menu" })]
    }
  }
);
function cr(o) {
  return qe.some((t) => o[t] !== void 0);
}
const dr = ["order", "options", "name", "toggle_icon"];
function hr(o, t) {
  const e = o ?? [], i = /* @__PURE__ */ new Set(), r = t.map((n) => {
    const s = e.findIndex((d, u) => !i.has(u) && d.type === n.type);
    if (s < 0) return structuredClone(n);
    i.add(s);
    const l = {};
    for (const d of dr) e[s][d] !== void 0 && (l[d] = structuredClone(e[s][d]));
    return { ...structuredClone(n), ...l };
  }), a = e.filter((n, s) => n.type === "chips" && !i.has(s));
  return [...structuredClone(a), ...r];
}
function pr(o, t) {
  const e = { ...o };
  for (const n of qe) delete e[n];
  const i = structuredClone(t.values), r = o.setpoint ?? {};
  if (r.min_gap !== void 0 || r.bar?.range_min !== void 0 || r.bar?.range_max !== void 0) {
    const n = { ...i.setpoint ?? {} };
    r.min_gap !== void 0 && (n.min_gap = r.min_gap), (r.bar?.range_min !== void 0 || r.bar?.range_max !== void 0) && (n.bar = { ...n.bar ?? {} }, r.bar?.range_min !== void 0 && (n.bar.range_min = r.bar.range_min), r.bar?.range_max !== void 0 && (n.bar.range_max = r.bar.range_max)), i.setpoint = n;
  }
  const a = o.background;
  return a?.fill === "image" && a.image?.url && !i.background?.fill && (i.background = { ...i.background ?? {}, fill: "image", image: structuredClone(a.image) }), i.sets ? i.sets = hr(o.sets, i.sets) : o.sets && (i.sets = o.sets), { ...e, ...i };
}
var ur = Object.defineProperty, st = (o, t, e, i) => {
  for (var r = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = n(t, e, r) || r);
  return r && ur(t, e, r), r;
};
const mt = [
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
function fr(o) {
  const t = o == null ? "" : String(o);
  return t === "" ? "default" : t === "transparent" ? "transparent" : /^#[0-9a-fA-F]{3,8}$/.test(t) ? "custom" : /^var\(/.test(t) && mt.some(([e]) => e === t) ? "theme" : "css";
}
const gr = {
  name: "Name",
  status: "Status (Heating / Cooling)",
  current: "Current temperature",
  unit: "Unit (°)",
  humidity: "Humidity",
  pill: "Setpoint pills",
  wheel_value: "Wheel / stepper value",
  wheel_neighbor: "Wheel next values",
  bar: "Bar labels"
}, mr = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  chips: "mdi:devices"
}, Zt = class Zt extends Z {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(["thermostat"]), this._set = null, this._chip = null, this._cmode = {}, this._panels = /* @__PURE__ */ new Set();
  }
  setConfig(t) {
    this._config = Rt(t);
  }
  // ---- writes ---------------------------------------------------------------
  _emit(t) {
    this._config = Rt(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  /** Set a path; `undefined`/'' or the built-in default removes the key. */
  _put(t, e, i) {
    if (!this._config) return;
    const r = e === i ? void 0 : e;
    this._emit(A(this._config, t, r));
  }
  _get(t) {
    return $i(this._config, t);
  }
  /** The configured sets, materialized from the defaults on first edit. */
  _sets() {
    return Array.isArray(this._config?.sets) ? this._config.sets : Pe.map((t) => ({ ...t }));
  }
  _writeSets(t) {
    this._emit({ ...this._config, sets: t });
  }
  _patchSet(t, e, i, r) {
    const a = this._sets(), n = A(a[t] ?? {}, e, i === r ? void 0 : i);
    a[t] = { ...n, type: a[t].type }, this._writeSets(a);
  }
  // ---- primitives -------------------------------------------------------------
  _toggleOpen(t, e, i = !1) {
    const r = e.currentTarget.open;
    if (r === this._open.has(t)) return;
    const a = new Set(this._open);
    if (r) {
      if (i)
        for (const n of this._panels) n !== t && a.delete(n);
      a.add(t);
    } else a.delete(t);
    this._open = a;
  }
  connectedCallback() {
    super.connectedCallback();
    const t = window;
    t.__etcEditorsOpen = (t.__etcEditorsOpen ?? 0) + 1;
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    const t = window;
    t.__etcEditorsOpen = Math.max(0, (t.__etcEditorsOpen ?? 1) - 1);
  }
  _panel(t, e, i, r) {
    return this._panels.add(t), c`<details class="etce-sec" ?open=${this._open.has(t)} @toggle=${(a) => this._toggleOpen(t, a, !0)}>
      <summary><ha-icon icon=${e}></ha-icon>${i}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${r}</div>
    </details>`;
  }
  _sub(t, e, i) {
    return c`<details class="etce-sub" ?open=${this._open.has(t)} @toggle=${(r) => this._toggleOpen(t, r)}>
      <summary>${e}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${i()}</div>
    </details>`;
  }
  _group(t, e = !1) {
    return c`<div class="etce-group ${e ? "first" : ""}">${t}</div>`;
  }
  _hint(t) {
    return c`<p class="etce-hint">${t}</p>`;
  }
  _check(t, e, i) {
    return c`<label class="etce-check"
      ><input type="checkbox" .checked=${e} @change=${(r) => i(r.target.checked)} />${t}</label
    >`;
  }
  _bool(t, e, i) {
    const r = this._get(t) ?? i;
    return this._check(e, r, (a) => this._put(t, a, i));
  }
  _selectRow(t, e, i, r) {
    return c`<div class="etce-row">
      <label class="lbl">${t}</label>
      <select @change=${(a) => r(a.target.value)}>
        ${i.map(([a, n]) => c`<option value=${a} ?selected=${a === e}>${n}</option>`)}
      </select>
    </div>`;
  }
  _select(t, e, i, r) {
    const a = String(this._get(t) ?? r);
    return this._selectRow(e, a, i, (n) => this._put(t, n, r));
  }
  _sliderRow(t, e, i, r, a, n, s, l = (d) => `${d}px`) {
    return c`<div class="etce-row etce-nowrap">
      <label class="lbl">${t}</label>
      <input
        type="range"
        min=${i}
        max=${r}
        step=${a}
        .value=${String(e)}
        @input=${(d) => {
      const u = d.target;
      u.nextElementSibling.textContent = l(Number(u.value));
    }}
        @change=${(d) => s(Number(d.target.value))}
      />
      <span class="etce-val">${l(e)}</span>
      ${n ? c`<button class="etce-reset" title="Back to default" @click=${() => s(void 0)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>` : h}
    </div>`;
  }
  _slider(t, e, i, r, a, n, s) {
    const l = this._get(t);
    return this._sliderRow(e, l ?? n, i, r, a, l !== void 0, (d) => this._put(t, d, n), s);
  }
  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  _colorRow(t, e, i, r, a, n, s = {}) {
    let l = this._cmode[t] || fr(i);
    l === "transparent" && !s.transparent && (l = "css");
    let d = h;
    if (l === "theme")
      d = c`<select @change=${(p) => n(p.target.value)}>
        ${mt.map(([p, g]) => c`<option value=${p} ?selected=${p === i}>${g}</option>`)}
      </select>`;
    else if (l === "custom") {
      const p = i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : a;
      d = c`<input type="color" .value=${p} @change=${(g) => n(g.target.value)} />`;
    } else l === "css" && (d = c`<input
        type="text"
        .value=${i ?? ""}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(p) => n(p.target.value || void 0)}
      />`);
    const u = (p) => {
      this._cmode = { ...this._cmode, [t]: p }, p === "default" ? n(void 0) : p === "transparent" ? n("transparent") : p === "theme" ? n(mt.some(([g]) => g === i) ? i : mt[0][0]) : p === "custom" ? n(i && /^#[0-9a-fA-F]{6}$/.test(i) ? i : a) : this.requestUpdate();
    };
    return c`<div class="etce-row">
      <label class="lbl">${e}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(p) => u(p.target.value)}>
          ${[
      ["default", r],
      ...s.transparent ? [["transparent", "Transparent"]] : [],
      ["theme", "Theme color"],
      ["custom", "Custom color"],
      ["css", "Custom CSS"]
    ].map(
      ([p, g]) => c`<option value=${p} ?selected=${p === l}>${g}</option>`
    )}
        </select>
        ${d}
      </div>
    </div>`;
  }
  _color(t, e, i, r) {
    return this._colorRow(t, e, this._get(t), i, r, (a) => this._put(t, a));
  }
  _selector(t, e, i, r) {
    return c`<div class="etce-row">
      ${t ? c`<label class="lbl">${t}</label>` : h}
      <ha-selector
        .hass=${this.hass}
        .selector=${e}
        .value=${i}
        @value-changed=${(a) => r(a.detail.value)}
      ></ha-selector>
    </div>`;
  }
  // ---- render -----------------------------------------------------------------
  render() {
    return this._config ? c`<div class="etce">
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
      <div class="etce-foot">Easy Thermostat Styler Card v${Me}</div>
    </div>` : h;
  }
  _testBar() {
    const t = this._config.test_mode ?? "";
    return c`<div class="etce-test ${t ? "on" : ""}">
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
      (e) => this._put("test_mode", e || void 0)
    )}
      <p class="etce-hint">
        ${t ? "The card acts as if it were in that state so you can see the effects and moving background. It only does this while you edit the dashboard; the live card ignores it, so saving with it on is harmless." : "Preview the heating, cooling, idle, fan and off looks (effects and moving background) without waiting for the real thing."}
      </p>
    </div>`;
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
        ${this._bool("show_name", "Name", m.show_name)} ${this._bool("show_status", "Status", m.show_status)}
        ${this._bool("show_humidity", "Humidity", m.show_humidity)}
        ${this._bool("show_current", "Current temperature", m.show_current)}
        ${this._bool("show_pills", "Setpoint pills", m.show_pills)}
      </div>
      ${this._group("Layout")}
      ${this._select("core_align", "Align", [["left", "Left"], ["center", "Center"], ["right", "Right"]], m.core_align)}
      ${this._select(
      "status_position",
      "Status",
      [["above", "Above the temperature"], ["beside", "Beside the temperature"], ["below", "Below the temperature"]],
      m.status_position
    )}
    `;
  }
  _templatesBody() {
    const t = (e) => {
      const i = Ft.find((r) => r.id === e);
      cr(this._config) && !window.confirm(
        `Apply the “${i.name}” template?

It replaces this card’s layout, setpoint control and styling. Your device chips, button order/names/icons and temperature range are kept.`
      ) || this._emit(pr(this._config, i));
    };
    return c`
      ${this._hint("One-click starting points, each with its own setpoint control, button style and layout. Fine-tune anything afterwards; nothing stays linked to the template.")}
      <div class="etce-blist">
        ${Ft.map(
      (e) => c`<div class="etce-brow etce-tpl">
            <ha-icon class="etce-sicon" icon=${e.icon}></ha-icon>
            <div class="etce-tpl-text">
              <span class="etce-sname">${e.name}</span>
              <span class="etce-tpl-hint">${e.hint}</span>
              <span class="etce-tpl-tags">${e.tags.map((i) => c`<span>${i}</span>`)}</span>
            </div>
            <button class="etce-preset" @click=${() => t(e.id)}>Apply</button>
          </div>`
    )}
      </div>
    `;
  }
  _setpointBody() {
    const t = this._get("setpoint.control") ?? m.control;
    return c`
      ${this._hint("How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.")}
      ${this._select(
      "setpoint.control",
      "Control",
      [["wheel", "Wheel"], ["stepper", "− / + stepper"], ["bar", "Setpoint bar"], ["none", "None (display only)"]],
      m.control
    )}
      ${t === "wheel" || t === "stepper" ? c`
            ${this._select("setpoint.position", "Position", [["left", "Left"], ["right", "Right"], ["center", "Center (below)"]], m.position)}
            ${this._slider("setpoint.scale", "Size", 40, 250, 5, m.scale, (e) => `${e}%`)}
            ${this._hint("Size scales the controls only; the current temperature has its own size under Text.")}
            ${this._nudgeSelect(t)}
            ${t === "wheel" ? c`${this._slider("setpoint.neighbors", "Next values shown", 0, 3, 1, m.neighbors, (e) => String(e))}
                ${this._select("setpoint.wheel_style", "Centre value", [["bubble", "Bubble"], ["pill", "Pill (like the setpoint pills)"]], m.wheel_style)}` : h}
          ` : h}
      ${t === "bar" ? this._barBody() : h}
      ${t !== "none" ? this._revealBody() : h}
      ${this._group("Heat / Cool")}
      ${this._slider("setpoint.min_gap", "Minimum gap", 0, 10, 0.5, this._defaultGap(), (e) => `${e}°`)}
    `;
  }
  /** − / + placement; the wheel defaults to Right, the stepper to Either side. */
  _nudgeSelect(t) {
    const e = t === "stepper" ? "around" : "right", i = this._get("setpoint.nudge"), r = i === "beside" ? "right" : i ?? e, a = [
      ["right", "Right"],
      ["left", "Left"],
      ["above", "Both above"],
      ["below", "Both below"],
      ["stacked", "+ above, − below"],
      ["around", "− left, + right"],
      ["hidden", "Hidden"]
    ];
    return this._selectRow("− / + buttons", r, a, (n) => this._put("setpoint.nudge", n === e ? void 0 : n));
  }
  _revealBody() {
    const t = (this._get("setpoint.reveal") ?? m.reveal) === "tap", e = this._get("setpoint.hide_after") ?? m.hide_after;
    return c`
      ${this._group("Show controls")}
      ${this._select("setpoint.reveal", "Controls", [["always", "Always shown"], ["tap", "Shown when tapped"]], m.reveal)}
      ${this._hint(
      t ? "The controls stay folded away until you tap. They fold away again after the time below without use." : "Choose “Shown when tapped” to keep the card calm: just the temperature and setpoint until you want to change it."
    )}
      ${t ? c`
            ${this._select(
      "setpoint.reveal_from",
      "Open by tapping",
      [["both", "Setpoint pill or current temperature"], ["pills", "Setpoint pill"], ["current", "Current temperature"]],
      m.reveal_from
    )}
            ${this._select(
      "setpoint.collapsed",
      "While closed show",
      [["visual", "The control’s value (tap it to open too)"], ["hidden", "Nothing — just the pill / temperature"]],
      m.collapsed
    )}
            ${this._select(
      "setpoint.open_in",
      "Opens",
      [["place", "In its own place"], ["current", "In place of the current temperature"]],
      m.open_in
    )}
            ${this._hint("“In place of the current temperature” swaps the big number for the controls while they are open.")}
            ${this._bool("setpoint.hide_at_target", "Hide the setpoint once the room reaches it", !1)}
            ${this._hint("While closed, only the current temperature shows once it matches the setpoint; until then the setpoint shows beside it. Tap the temperature to open the controls at any time.")}
            ${this._sliderRow(
      "Close after",
      e,
      0,
      60,
      1,
      this._get("setpoint.hide_after") !== void 0,
      (i) => this._put("setpoint.hide_after", i, m.hide_after),
      (i) => i ? `${i}s` : "Stay open"
    )}
          ` : h}
    `;
  }
  /** A bar-side choice: above / below for a horizontal bar, left / right for a vertical one. */
  _sidePlacement(t, e, i, r) {
    const a = String(this._get("setpoint.bar.position") ?? m.bar.position), n = a === "left" || a === "right", s = n ? [["left", "Left of the bar"], ["right", "Right of the bar"]] : [["above", "Above the bar"], ["below", "Below the bar"]], l = n ? r : i, d = String(this._get(`setpoint.bar.${t}`) ?? l);
    return this._selectRow(e, s.some(([u]) => u === d) ? d : l, s, (u) => this._put(`setpoint.bar.${t}`, u, l));
  }
  _defaultGap() {
    return (this.hass?.config?.unit_system?.temperature ?? "").includes("C") ? 1.5 : 3;
  }
  _barBody() {
    const t = m.bar, e = this._get("setpoint.bar.look") ?? t.look, i = this._get("setpoint.bar.stops") ?? ["#2b9af9", "#7ccf8a", "#ff8100"];
    return c`
      ${this._select(
      "setpoint.bar.position",
      "Position",
      [["below", "Below (horizontal)"], ["above", "Above (horizontal)"], ["left", "Left (vertical)"], ["right", "Right (vertical)"]],
      t.position
    )}
      ${["left", "right"].includes(String(this._get("setpoint.bar.position") ?? "")) ? this._slider("setpoint.bar.length", "Height", 100, 400, 10, 200) : h}
      ${this._select("setpoint.bar.look", "Look", [["zones", "Heat / comfort / cool zones"], ["gradient", "Gradient"]], t.look)}
      ${e === "gradient" ? c`<div class="etce-row">
            <label class="lbl">Gradient (cold → hot)</label>
            <div class="etce-stops">
              ${i.map(
      (r, a) => c`<input
                  type="color"
                  .value=${r}
                  @change=${(n) => {
        const s = [...i];
        s[a] = n.target.value, this._put("setpoint.bar.stops", s);
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
      (r) => this._put("setpoint.bar.handle_border_color", r ? void 0 : "none")
    )}
      ${this._get("setpoint.bar.handle_border_color") !== "none" ? this._color("setpoint.bar.handle_border_color", "Handle border colour", "Heat / cool colour", "#ffffff") : h}
      ${this._group("Value flags")}
      ${this._bool("setpoint.bar.flags", "Show value flags on the handles", t.flags)}
      ${this._get("setpoint.bar.flags") ?? t.flags ? c`${this._sidePlacement("flag_position", "Flag placement", "above", "left")}
          ${this._color("setpoint.bar.flag_color", "Flag colour", "Heat / cool colour", "#ff8100")}
          ${this._color("setpoint.bar.flag_text_color", "Flag text colour", "White", "#ffffff")}` : h}
      ${this._group("Markers")}
      ${this._bool("setpoint.bar.show_current", "Current temperature marker", t.show_current)}
      ${this._slider("setpoint.bar.ticks", "Tick every", 0, 10, 0.5, t.ticks, (r) => r ? `${r}°` : "Off")}
      ${this._slider("setpoint.bar.labels", "Label every", 0, 20, 1, t.labels, (r) => r ? `${r}°` : "Off")}
      ${(this._get("setpoint.bar.ticks") ?? t.ticks) || (this._get("setpoint.bar.labels") ?? t.labels) ? this._sidePlacement("tick_position", "Ticks & labels", "below", "right") : h}
      ${this._group("Range")}
      ${this._hint("Leave empty to use the thermostat’s own limits.")}
      ${["range_min", "range_max"].map(
      (r) => c`<div class="etce-row">
          <label class="lbl">${r === "range_min" ? "From" : "To"}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${r}`) ?? "")}
            @change=${(a) => {
        const n = a.target.value;
        this._put(`setpoint.bar.${r}`, n === "" ? void 0 : Number(n));
      }}
          />
        </div>`
    )}
    `;
  }
  // ---- button sets --------------------------------------------------------------
  _setsBody() {
    const t = this._sets(), e = this.hass?.states[this._config.entity], i = (r) => {
      const a = [...t, r === "chips" ? { type: r, chips: [] } : { type: r }];
      this._set = a.length - 1, this._writeSets(a);
    };
    return c`
      ${this._hint("Groups of buttons. Each set picks its side of the card, its layout, and how it shows: full time, behind a toggle button, or as an expandable menu.")}
      ${this._select("toggles_zone", "Default location", [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], m.toggles_zone)}
      ${this._hint("Where sets go when they have no Side of their own, and where the toggle buttons sit. A set’s own Side always wins.")}
      ${this._bool("compact", "Compact", !1)}
      ${this._hint("Puts every full-time set behind a toggle button, so the card stays small until you open one. Sets shown as expandable menus are already compact and are not changed.")}
      ${this._group("Sets")}
      <div class="etce-addbar">
        ${["hvac", "preset", "fan_mode", "chips"].map(
      (r) => c`<button class="etce-add" @click=${() => i(r)}>+ ${ut[r]}</button>`
    )}
      </div>
      <div class="etce-slist">
        ${t.map((r, a) => {
      const n = r.type === "chips" || Ot(e, r.type).length > 0, s = this._set === a;
      return c`<div class="etce-srow ${r.hidden ? "off" : ""} ${s ? "open" : ""}">
              <ha-icon class="etce-sicon" icon=${mr[r.type]}></ha-icon>
              <span class="etce-sname" @click=${() => this._set = s ? null : a}>${r.name ?? ut[r.type]}</span>
              <span class="etce-stag"
                >${n ? `${r.zone ?? this._defaultZone()} · ${this._displayTag(r)}` : "not on this entity"}</span
              >
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._set = s ? null : a}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" title="Move up" ?disabled=${a === 0} @click=${() => this._moveSet(a, -1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button class="etce-act" title="Move down" ?disabled=${a === t.length - 1} @click=${() => this._moveSet(a, 1)}>
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
                <button class="etce-act etce-eye ${r.hidden ? "off" : ""}" title=${r.hidden ? "Show" : "Hide"} @click=${() => this._patchSet(a, "hidden", !r.hidden, !1)}>
                  <ha-icon icon=${r.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
                <button class="etce-act del" title="Delete" @click=${() => this._deleteSet(a)}>
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${s ? c`<div class="etce-sedit">${this._setEditor(r, a)}</div>` : h}`;
    })}
      </div>
    `;
  }
  _defaultZone() {
    return this._config?.toggles_zone ?? m.toggles_zone;
  }
  _displayTag(t) {
    return t.display === "menu" && t.type !== "chips" ? "menu" : this._config.compact || t.display === "toggle" ? "toggle" : "full time";
  }
  _moveSet(t, e) {
    const i = this._sets(), r = t + e;
    r < 0 || r >= i.length || ([i[t], i[r]] = [i[r], i[t]], this._set === t && (this._set = r), this._writeSets(i));
  }
  _deleteSet(t) {
    const e = this._sets();
    e.splice(t, 1), this._set = null, this._writeSets(e);
  }
  _setEditor(t, e) {
    const i = t.zone ?? this._defaultZone(), r = i === "left" || i === "right", a = (n, s, l) => this._patchSet(e, n, s, l);
    return c`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${ut[t.type]} @change=${(n) => a("name", n.target.value || void 0)} />
      </div>
      ${this._group("Placement")}
      ${this._selectRow(
      "Side",
      t.zone ?? "",
      [["", `Default (${this._defaultZone()})`], ["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]],
      (n) => a("zone", n || void 0)
    )}
      ${this._selectRow(
      "Orientation",
      t.orientation ?? (r ? "column" : "row"),
      [["row", "Row"], ["column", "Column"]],
      (n) => a("orientation", n, r ? "column" : "row")
    )}
      ${this._selectRow(
      "Align",
      t.align ?? (t.type === "chips" ? "center" : "stretch"),
      [["stretch", "Fill width"], ["start", "Start"], ["center", "Center"], ["end", "End"]],
      (n) => a("align", n, t.type === "chips" ? "center" : "stretch")
    )}
      ${(t.align ?? "stretch") === "stretch" && t.type !== "chips" ? this._sliderRow("Columns", t.columns ?? 0, 0, 8, 1, t.columns !== void 0, (n) => a("columns", n, 0), (n) => n ? String(n) : "Auto") : h}
      ${this._group("Display")}
      ${this._selectRow(
      "Show",
      t.display ?? "always",
      [["always", "Full time"], ["toggle", "Behind a toggle button"], ...t.type === "chips" ? [] : [["menu", "Expandable menu"]]],
      (n) => a("display", n, "always")
    )}
      ${t.display === "menu" ? c`${this._hint("One button shows the current value; tap it to open the full list.")}
          ${this._selectRow(
      "Opens",
      t.menu_direction ?? Lt(i),
      [["down", "Down"], ["up", "Up"], ["right", "Right"], ["left", "Left"]],
      (n) => a("menu_direction", n, Lt(i))
    )}
          ${this._check("Show the set name on the button", t.menu_show_name ?? !0, (n) => a("menu_show_name", n, !0))}` : h}
      ${(t.display ?? "always") === "toggle" || this._config.compact && t.display !== "menu" ? this._selector("Toggle icon", { icon: {} }, t.toggle_icon, (n) => a("toggle_icon", n || void 0)) : h}
      ${t.type === "chips" ? this._sub(`set-${e}-chips`, "Chips", () => this._chipsEditor(t, e)) : this._sub(`set-${e}-options`, "Buttons in this set", () => this._optionsEditor(t, e))}
      ${this._sub(`set-${e}-style`, "Button style for this set", () => this._buttonStyleEditor(`sets.${e}.style`, !0, e))}
    `;
  }
  _optionsEditor(t, e) {
    const i = this.hass?.states[this._config.entity], r = Le(Ot(i, t.type), t.order);
    if (!r.length) return this._hint("This entity has no options for this set.");
    const a = (n, s) => {
      const l = [...r], d = n + s;
      d < 0 || d >= l.length || ([l[n], l[d]] = [l[d], l[n]], this._patchSet(e, "order", l));
    };
    return c`${this._hint("Order, hide, rename and re-icon each button.")}
      <div class="etce-blist">
        ${r.map((n, s) => {
      const l = t.options?.[n] ?? {}, d = `${e}:${n}`;
      return c`<div class="etce-brow ${l.hide ? "off" : ""}">
              <ha-icon class="etce-sicon" icon=${l.icon ?? Wt[n.toLowerCase()] ?? "mdi:circle-medium"}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = this._chip === d ? null : d}>${l.name ?? Pt(n)}</span>
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => this._chip = this._chip === d ? null : d}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === 0} @click=${() => a(s, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === r.length - 1} @click=${() => a(s, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act etce-eye ${l.hide ? "off" : ""}" @click=${() => this._patchSet(e, `options.${n}.hide`, !l.hide, !1)}>
                  <ha-icon icon=${l.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
                </button>
              </div>
            </div>
            ${this._chip === d ? c`<div class="etce-sedit">
                  <div class="etce-row">
                    <label class="lbl">Label</label>
                    <input type="text" .value=${l.name ?? ""} placeholder=${Pt(n)} @change=${(u) => this._patchSet(e, `options.${n}.name`, u.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, l.icon, (u) => this._patchSet(e, `options.${n}.icon`, u || void 0))}
                </div>` : h}`;
    })}
      </div>`;
  }
  _chipsEditor(t, e) {
    const i = t.chips ?? [], r = (n) => this._patchSet(e, "chips", n.length ? n : void 0), a = (n) => {
      const s = n === "rf_fan" ? this._firstRfFan() ?? "" : "";
      this._chip = `chip:${e}:${i.length}`;
      const l = s || Object.keys(this.hass?.states ?? {}).find((d) => d.startsWith(n === "rf_fan" ? "fan." : "sensor.")) || "";
      l && r([...i, { type: n, entity: l }]);
    };
    return c`
      ${this._hint("Status chips for linked devices. RF fan chips find the fan’s light and sleep timer automatically. Tap opens the fan card in a pop-up; hold toggles.")}
      <div class="etce-addbar">
        <button class="etce-add" @click=${() => a("rf_fan")}>+ RF fan</button>
        <button class="etce-add" @click=${() => a("entity")}>+ Entity</button>
      </div>
      <div class="etce-blist">
        ${i.map((n, s) => {
      const l = `chip:${e}:${s}`, d = this._chip === l, u = this.hass?.states[n.entity], p = n.name ?? u?.attributes.friendly_name ?? n.entity, g = (f, v, w) => {
        const x = [...i];
        x[s] = A(x[s], f, v === w ? void 0 : v), x[s] = { ...x[s], type: n.type, entity: x[s].entity || n.entity }, r(x);
      }, b = (f) => {
        const v = [...i], w = s + f;
        w < 0 || w >= v.length || ([v[s], v[w]] = [v[w], v[s]], r(v));
      };
      return c`<div class="etce-brow">
              <ha-icon class="etce-sicon" icon=${n.icon ?? (n.type === "rf_fan" ? "mdi:ceiling-fan" : "mdi:shape-outline")}></ha-icon>
              <span class="etce-sname" @click=${() => this._chip = d ? null : l}>${p}</span>
              <span class="etce-stag">${n.type === "rf_fan" ? "RF fan" : "Entity"}</span>
              <div class="etce-sctl">
                <button class="etce-act" @click=${() => this._chip = d ? null : l}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === 0} @click=${() => b(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${s === i.length - 1} @click=${() => b(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act del" @click=${() => r(i.filter((f, v) => v !== s))}><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>
              </div>
            </div>
            ${d ? c`<div class="etce-sedit">
                  ${this._selector("Entity", { entity: n.type === "rf_fan" ? { domain: "fan" } : {} }, n.entity, (f) => f && g("entity", f))}
                  <div class="etce-row">
                    <label class="lbl">Name</label>
                    <input type="text" .value=${n.name ?? ""} placeholder="Entity name" @change=${(f) => g("name", f.target.value || void 0)} />
                  </div>
                  ${this._selector("Icon", { icon: {} }, n.icon, (f) => g("icon", f || void 0))}
                  <div class="etce-checks">
                    ${this._check("Show name", n.show_name ?? !0, (f) => g("show_name", f, !0))}
                    ${this._check("Show state", n.show_state ?? !0, (f) => g("show_state", f, !0))}
                  </div>
                  ${n.type === "rf_fan" ? this._rfFanInfo(n) : h}
                  ${n.type === "rf_fan" ? this._selectRow(
        "Speed shows as",
        n.speed_format ?? "number",
        [["number", "Number (4)"], ["fraction", "Fraction (4/10)"], ["percent", "Percent (40%)"]],
        (f) => g("speed_format", f, "number")
      ) : h}
                  ${this._selectRow(
        "Tap",
        n.tap ?? (n.type === "rf_fan" ? "popup" : "more-info"),
        [["popup", "Open card in pop-up"], ["more-info", "More info"], ["toggle", "Toggle"], ["none", "Nothing"]],
        (f) => g("tap", f, n.type === "rf_fan" ? "popup" : "more-info")
      )}
                  ${this._selectRow(
        "Hold",
        n.hold ?? (n.type === "rf_fan" ? "toggle" : "none"),
        [["toggle", "Toggle"], ...n.type === "rf_fan" ? [["toggle_light", "Toggle light"]] : [], ["more-info", "More info"], ["none", "Nothing"]],
        (f) => g("hold", f, n.type === "rf_fan" ? "toggle" : "none")
      )}
                  ${(n.tap ?? (n.type === "rf_fan" ? "popup" : "more-info")) === "popup" ? c`${this._hint(
        n.type === "rf_fan" ? "Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan." : "Pop-up card config (any card)."
      )}
                      ${this._selector("", { object: {} }, n.popup_card, (f) => g("popup_card", f && Object.keys(f).length ? f : void 0))}` : h}
                </div>` : h}`;
    })}
      </div>
    `;
  }
  /** What was detected for this fan (read-only hint). */
  _rfFanInfo(t) {
    if (!this.hass?.states[t.entity]) return h;
    const e = Nt(this.hass, t, 0), i = [
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
    const t = this._config, e = !!(t.frosted ?? t.background?.frosted), i = (a, n) => {
      let s = A(t, "background.frosted", void 0);
      if (s = A(s, "background.frost_blur", void 0), a === "frosted") {
        s = A(s, "frosted", n ? !0 : void 0);
        const l = t.frost_blur ?? t.background?.frost_blur;
        s = A(s, "frost_blur", n ? l : void 0);
      } else
        s = A(s, "frosted", !0), s = A(s, "frost_blur", n === M.frost_blur ? void 0 : n);
      this._emit(s);
    }, r = t.frost_blur ?? t.background?.frost_blur;
    return c`${this._hint("The look of every button. Each button set can override any of these under “Button style for this set”.")}
      ${this._buttonStyleEditor("buttons", !1)}
      ${this._group("Frosted glass")}
      ${this._check("Frosted glass controls", e, (a) => i("frosted", a))}
      ${this._hint("Buttons, menus, chips, toggles, setpoint pills and the wheel’s setpoint bubble turn see-through with a blur. Best over a moving background or an image.")}
      ${e ? this._sliderRow("Blur", r ?? M.frost_blur, 0, 40, 1, r !== void 0, (a) => i("frost_blur", a)) : h}`;
  }
  _buttonStyleEditor(t, e, i) {
    const r = (e ? this._sets()[i]?.style : this._config.buttons) ?? {}, a = e ? Bt(this._config.buttons, void 0) : He, n = e ? "Card default" : "Built-in", s = (p, g) => {
      e ? this._patchSet(i, `style.${p}`, g) : this._put(`${t}.${p}`, g);
    }, l = (p, g, b) => {
      const f = String(a[p] ?? ""), v = b.find(([w]) => w === f)?.[1] ?? f;
      return this._selectRow(g, String(r[p] ?? ""), [["", `${n} (${v})`], ...b], (w) => s(p, w || void 0));
    }, d = (p, g, b, f) => {
      const v = Number(a[p] ?? 0), w = r[p];
      return this._sliderRow(g, w ?? v, b, f, 1, w !== void 0, (x) => s(p, x));
    }, u = (p, g, b) => this._colorRow(`${t}.${p}`, g, r[p], e ? "Card default" : "Automatic", b, (f) => s(p, f));
    return c`
      ${this._group("Shape", !0)}
      ${l("variant", "Style", [["tonal", "Tonal (tinted)"], ["filled", "Filled"], ["outlined", "Outlined"], ["ghost", "Ghost"]])}
      ${d("radius", "Corner radius", 0, 40)} ${d("height", "Min height", 0, 120)} ${d("min_width", "Min width", 0, 200)}
      ${d("gap", "Spacing", 0, 32)} ${d("border_width", "Border width", 0, 6)}
      ${this._group("Content")}
      ${l("content", "Show", [["icon_label", "Icon and label"], ["icon", "Icon only"], ["label", "Label only"]])}
      ${l("icon_position", "Icon", [["top", "Above label"], ["left", "Left of label"]])}
      ${d("icon_size", "Icon size", 10, 48)} ${d("font_size", "Text size", 8, 28)}
      ${l("font_weight", "Text weight", [["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"]])}
      ${this._group("Colors — inactive")}
      ${u("background", "Background", "#2a2a2a")} ${u("color", "Text & icon", "#cccccc")} ${u("border_color", "Border", "#555555")}
      ${this._group("Colors — active")}
      ${this._hint("Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.")}
      ${u("active_background", "Background", "#ff8100")} ${u("active_color", "Text & icon", "#ffffff")}
      ${u("active_border_color", "Border", "#ff8100")}
    `;
  }
  // ---- text ---------------------------------------------------------------------
  _textBody() {
    return c`${this._hint("Size, weight, color and case for each piece of text. Unset keeps the built-in look.")}
      ${Re.map((t) => this._sub(`text-${t}`, gr[t], () => this._textRole(t)))}`;
  }
  _textRole(t) {
    const e = `text.${t}`, i = this._get(e) ?? {};
    return c`
      ${this._sliderRow(
      "Size",
      i.size ?? 0,
      0,
      160,
      1,
      i.size !== void 0,
      (r) => this._put(`${e}.size`, r || void 0),
      (r) => r ? `${r}px` : "Auto"
    )}
      ${this._selectRow(
      "Weight",
      String(i.weight ?? ""),
      [["", "Built-in"], ["100", "Thin"], ["200", "Extra light"], ["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"], ["800", "Extra bold"]],
      (r) => this._put(`${e}.weight`, r ? Number(r) : void 0)
    )}
      ${this._color(`${e}.color`, "Color", "Built-in", "#ffffff")}
      ${this._selectRow(
      "Case",
      String(i.transform ?? ""),
      [["", "Built-in"], ["none", "As written"], ["uppercase", "UPPERCASE"], ["lowercase", "lowercase"], ["capitalize", "Capitalize"]],
      (r) => this._put(`${e}.transform`, r || void 0)
    )}
      ${this._sliderRow(
      "Letter spacing",
      i.letter_spacing ?? 0,
      -10,
      30,
      1,
      i.letter_spacing !== void 0,
      (r) => this._put(`${e}.letter_spacing`, r),
      (r) => `${(r / 100).toFixed(2)}em`
    )}
      ${this._selectRow(
      "Italic",
      i.italic === void 0 ? "" : i.italic ? "on" : "off",
      [["", "Built-in"], ["off", "Off"], ["on", "On"]],
      (r) => this._put(`${e}.italic`, r === "" ? void 0 : r === "on")
    )}
      ${this._sliderRow("Opacity", i.opacity ?? 100, 10, 100, 5, i.opacity !== void 0, (r) => this._put(`${e}.opacity`, r), (r) => `${r}%`)}
    `;
  }
  // ---- card -----------------------------------------------------------------------
  _effectsBody() {
    const t = this._config, e = [["none", "Off"], ["glow", "Glow"], ["pulse", "Pulse"], ["both", "Glow + pulse"]], i = (r, a) => {
      let n = A(t, `effects.${r}`, a === "none" && r !== "card" ? void 0 : a);
      r === "card" && (n = A(n, "card.glow", void 0), a === "glow" && (n = A(n, "effects.card", void 0))), this._emit(n);
    };
    return c`
      ${this._hint("Make parts of the card glow or pulse in the heat colour while heating and the cool colour while cooling.")}
      ${this._group("Parts", !0)}
      ${Ie.map((r) => this._selectRow(ar[r], je(t, r), e, (a) => i(r, a)))}
      ${this._group("When")}
      ${this._select(
      "effects.when",
      "Active",
      [["running", "Only while heating or cooling"], ["mode", "Whenever the mode is Heat or Cool"]],
      gt.when
    )}
      ${this._hint("“Only while heating or cooling” follows what the system is doing right now; the other also lights up while it waits at the setpoint.")}
      ${this._group("Look")}
      ${this._slider("effects.size", "Glow size", 2, 60, 1, gt.size)}
      ${this._slider("effects.speed", "Pulse speed", 0.6, 8, 0.2, gt.speed, (r) => `${r.toFixed(1)}s`)}
      ${this._color("effects.heat_color", "Heating colour", "Theme heat", "#ff8100")}
      ${this._color("effects.cool_color", "Cooling colour", "Theme cool", "#2b9af9")}
    `;
  }
  _backgroundBody() {
    const t = this._config, e = t.background ?? {}, i = e.fill ?? "color", r = e.style ?? "none", a = (l, d, u) => this._put(`background.${l}`, d, u), n = (l) => {
      let d = A(t, "card.background", void 0);
      d = A(d, "background.color", l), this._emit(d);
    }, s = (l) => `${l}%`;
    return c`
      ${this._hint("The card’s surface. A moving background follows what the thermostat is doing: heat rises, cold sinks, a fan swirls, idle barely drifts.")}
      ${this._group("Base", !0)}
      ${this._selectRow("Fill", i, [["color", "Colour"], ["gradient", "Gradient"], ["image", "Image"]], (l) => a("fill", l, "color"))}
      ${i === "color" ? this._colorRow("background.color", "Colour", e.color ?? t.card?.background, "Theme card", "#1c1c1c", n, { transparent: !0 }) : h}
      ${i === "gradient" ? this._gradientEditor() : h}
      ${i === "image" ? this._imageEditor() : h}

      ${this._group("Moving background")}
      ${this._selectRow("Style", r, ge.map(([l, d]) => [l, d]), (l) => a("style", l, "none"))}
      ${r !== "none" ? c`
            ${this._hint(ge.find(([l]) => l === r)?.[2] ?? "")}
            ${this._slider("background.strength", "Strength", 0, 100, 5, M.strength, s)}
            ${this._slider("background.speed", "Speed", 25, 300, 5, M.speed, s)}
            ${this._bool("background.follow_gap", "Follow the work", M.follow_gap)}
            ${this._hint("Moves faster and glows stronger the further the room is from the setpoint, and settles as it gets close.")}
            ${this._select("background.off", "When off", [["calm", "A calm, near-still background"], ["none", "No moving background"]], M.off)}
            ${this._selector("Sync to Air Movement", { entity: {} }, e.air_entity ?? e.fan_entity, (l) => {
      let d = A(t, "background.fan_entity", void 0);
      d = A(d, "background.air_entity", l || void 0), this._emit(d);
    })}
            ${this._hint("Optional. Any entity that says how much air is moving: a fan (%), speed levels, on/off, low / medium / high, or an airflow sensor. While it shows air moving, the background swirls at that speed. Without one, Fan Only mode uses the thermostat’s own fan speed.")}
            ${e.air_entity || e.fan_entity ? c`<div class="etce-row">
                    <label class="lbl">Full speed at</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Automatic"
                      .value=${e.air_max !== void 0 ? String(e.air_max) : ""}
                      @change=${(l) => {
      const d = l.target.value;
      a("air_max", d === "" ? void 0 : Number(d));
    }}
                    />
                  </div>
                  ${this._hint("For raw numbers only, e.g. 1200 for a 1200 CFM airflow sensor. Leave empty and percentages, number entities and speed names work on their own.")}` : h}
            ${this._sub("bg-colours", "Colours by state", () => this._bgColours())}
            ${this._select("background.quality", "Quality", [["smooth", "Smooth"], ["light", "Light (older tablets)"]], M.quality)}
          ` : h}

      ${this._group("Finish")}
      ${this._slider("background.scrim", "Lighten / darken", -60, 60, 5, 0, (l) => l > 0 ? `Darken ${l}%` : l < 0 ? `Lighten ${-l}%` : "None")}
      ${this._slider("background.vignette", "Vignette", 0, 100, 5, 0, s)}
      ${this._slider("background.grain", "Grain", 0, 100, 5, 0, s)}

    `;
  }
  _gradientEditor() {
    const t = this._config.background?.gradient ?? {}, e = t.stops?.length ? [...t.stops] : ["#1c2a3a", "#3a1c2a"], i = (r) => this._put("background.gradient.stops", r);
    return c`
      ${this._selectRow("Type", t.type ?? "linear", [["linear", "Linear"], ["radial", "Radial"]], (r) => this._put("background.gradient.type", r, "linear"))}
      ${(t.type ?? "linear") === "linear" ? this._slider("background.gradient.angle", "Angle", 0, 360, 5, 135, (r) => `${r}°`) : h}
      ${e.map(
      (r, a) => c`${this._colorRow(`bg-stop-${a}`, `Colour ${a + 1}`, r, "Card colour", "#1c2a3a", (n) => {
        const s = [...e];
        s[a] = n ?? "var(--card-background-color)", i(s);
      })}
          ${e.length > 2 ? c`<div class="etce-row"><button class="etce-act del" title="Remove colour" @click=${() => i(e.filter((n, s) => s !== a))}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon></button></div>` : h}`
    )}
      ${e.length < 4 ? c`<div class="etce-addbar"><button class="etce-add" @click=${() => i([...e, "#000000"])}>+ Colour</button></div>` : h}
    `;
  }
  _imageEditor() {
    const t = this._config.background?.image ?? {};
    return c`
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
    return c`${this._hint("Two colours per state. Unset follows your theme’s heat, cool and fan colours.")}
      ${Pi.map(
      ([e, i]) => c`<div class="etce-group">${i}</div>
          ${this._colorRow(
        `bg-${e}-main`,
        "Main",
        t[e]?.main,
        "Automatic",
        /^#/.test(ft[e].main) ? ft[e].main : e.includes("cool") ? "#2b9af9" : e === "fan" ? "#00bfa5" : "#ff8100",
        (r) => this._put(`background.colors.${e}.main`, r)
      )}
          ${this._colorRow(`bg-${e}-second`, "Second", t[e]?.second, "Automatic", ft[e].second, (r) => this._put(`background.colors.${e}.second`, r))}`
    )}`;
  }
  _cardBody() {
    return c`
      ${this._hint("The card’s border, corners and padding. Its fill and moving background are under Background.")}
      ${this._color("card.border_color", "Border", "Theme", "#444444")}
      ${this._slider("card.border_width", "Border width", 0, 8, 1, 1)}
      ${this._slider("card.radius", "Corner radius", 0, 48, 1, 16)}
      ${this._slider("card.padding", "Padding", 0, 40, 1, 16)}
    `;
  }
};
Zt.styles = [
  Ae(Vi),
  Dt`
      :host { display: block; }
    `
];
let j = Zt;
st([
  Vt({ attribute: !1 })
], j.prototype, "hass");
st([
  C()
], j.prototype, "_config");
st([
  C()
], j.prototype, "_open");
st([
  C()
], j.prototype, "_set");
st([
  C()
], j.prototype, "_chip");
customElements.get(Mt) || customElements.define(Mt, j);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = { ATTRIBUTE: 1 }, Ve = (o) => (...t) => ({ _$litDirective$: o, values: t });
let We = class {
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
const Ge = "important", br = " !" + Ge, $ = Ve(class extends We {
  constructor(o) {
    if (super(o), o.type !== Ye.ATTRIBUTE || o.name !== "style" || o.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(o) {
    return Object.keys(o).reduce((t, e) => {
      const i = o[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(o, [t]) {
    const { style: e } = o.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const r = t[i];
      if (r != null) {
        this.ft.add(i);
        const a = typeof r == "string" && r.endsWith(br);
        i.includes("-") || a ? e.setProperty(i, a ? r.slice(0, -11) : r, a ? Ge : "") : e[i] = r;
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
const Tt = Ve(class extends We {
  constructor(o) {
    if (super(o), o.type !== Ye.ATTRIBUTE || o.name !== "class" || o.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(o) {
    return " " + Object.keys(o).filter((t) => o[t]).join(" ") + " ";
  }
  update(o, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), o.strings !== void 0 && (this.nt = new Set(o.strings.join(" ").split(/\s/).filter((i) => i !== "")));
      for (const i in t) t[i] && !this.nt?.has(i) && this.st.add(i);
      return this.render(t);
    }
    const e = o.element.classList;
    for (const i of this.st) i in t || (e.remove(i), this.st.delete(i));
    for (const i in t) {
      const r = !!t[i];
      r === this.st.has(i) || this.nt?.has(i) || (r ? (e.add(i), this.st.add(i)) : (e.remove(i), this.st.delete(i)));
    }
    return I;
  }
}), vr = 1, _r = 0.5, wr = 3, yr = 1.5;
function $r(o) {
  return o.includes("C") ? _r : vr;
}
function xr(o, t) {
  return t.setpoint?.min_gap ?? (o.includes("C") ? yr : wr);
}
function Xe(o) {
  return Math.round(o * 100) / 100;
}
function Y(o, t, e, i) {
  let r = i > 0 ? Xe(Math.round(o / i) * i) : o;
  return t !== null && r < t && (r = t), e !== null && r > e && (r = e), r;
}
function dt(o, t, e, i, r) {
  return { setpoint: o, value: Y(t, e, i, r), min: e, max: i, step: r };
}
function Ct(o, t, e) {
  return { available: !1, unit: o, mode: t, heat: null, cool: null, active: e, minGap: 0 };
}
function kr(o, t) {
  const e = o.config?.unit_system?.temperature ?? "°", i = o.states[t.entity], r = i ? Be(i.state) : "unknown";
  if (!i || r !== "heat" && r !== "cool" && r !== "heat_cool")
    return Ct(e, r, "heat");
  const a = i.attributes, n = $r(e), s = xr(e, t), l = S(a.min_temp), d = S(a.max_temp);
  if (r === "heat_cool") {
    const p = S(a.target_temp_low), g = S(a.target_temp_high);
    if (p === null && g === null) return Ct(e, r, "cool");
    const b = p !== null ? dt("heat", p, l, d, n) : null, f = g !== null ? dt("cool", g, l, d, n) : null;
    return { available: !0, unit: e, mode: r, heat: b, cool: f, active: f ? "cool" : "heat", minGap: s };
  }
  const u = S(a.temperature);
  return u === null ? Ct(e, r, r === "heat" ? "heat" : "cool") : r === "heat" ? {
    available: !0,
    unit: e,
    mode: r,
    heat: dt("heat", u, l, d, n),
    cool: null,
    active: "heat",
    minGap: s
  } : {
    available: !0,
    unit: e,
    mode: r,
    heat: null,
    cool: dt("cool", u, l, d, n),
    active: "cool",
    minGap: s
  };
}
function At(o) {
  return o[o.active];
}
function Kt(o, t) {
  const e = At(o);
  if (!e) return o;
  const i = o.mode === "heat_cool" ? o[e.setpoint === "cool" ? "heat" : "cool"] : null;
  if (!i) {
    const s = { ...e, value: Y(t, e.min, e.max, e.step) };
    return { ...o, [e.setpoint]: s };
  }
  const r = o.minGap;
  let a = Y(t, e.min, e.max, e.step), n = i.value;
  if (e.setpoint === "cool") {
    if (a - i.value < r) {
      let s = a - r;
      i.min !== null && s < i.min && (s = i.min, a = Y(i.min + r, e.min, e.max, e.step)), n = Y(s, i.min, i.max, i.step);
    }
  } else if (i.value - a < r) {
    let s = a + r;
    i.max !== null && s > i.max && (s = i.max, a = Y(i.max - r, e.min, e.max, e.step)), n = Y(s, i.min, i.max, i.step);
  }
  return {
    ...o,
    [e.setpoint]: { ...e, value: a },
    [i.setpoint]: { ...i, value: n }
  };
}
function X(o, t) {
  const e = At(o);
  return e ? Kt(o, e.value + t * e.step) : o;
}
function $e(o, t) {
  return At(o) ? Kt(o, t) : o;
}
function Sr(o, t, e, i) {
  const r = At(o);
  if (!r) return o;
  const a = Math.round(e / i);
  return Kt(o, t + a * r.step);
}
function tt(o, t) {
  return o[t] === null ? o : { ...o, active: t };
}
function Ar(o, t) {
  const e = [];
  for (let i = -t; i <= t; i++) {
    const r = Xe(o.value + i * o.step);
    o.min !== null && r < o.min || o.max !== null && r > o.max || e.push(r);
  }
  return e;
}
function Er(o, t) {
  if (!o.available) return null;
  const e = { entity_id: t };
  if (o.mode === "heat_cool")
    o.heat && (e.target_temp_low = o.heat.value), o.cool && (e.target_temp_high = o.cool.value);
  else {
    const i = o.heat ?? o.cool;
    if (!i) return null;
    e.temperature = i.value;
  }
  return { domain: "climate", service: "set_temperature", data: e };
}
const Tr = 600, Cr = 8e3;
function zr(o, t) {
  return o.heat?.value === t.heat?.value && o.cool?.value === t.cool?.value;
}
class Mr {
  constructor(t, e, i) {
    this.entityId = t, this.send = e, this.changed = i, this.edit = null, this.dragging = !1, this.pending = null, this.writeTimer = null, this.reconcileTimer = null, this.latest = null;
  }
  /** Feed the model derived from the latest hass. */
  sync(t) {
    if (this.latest = t, this.dragging || this.pending && t.mode === this.pending.mode && !zr(t, this.pending))
      return;
    const e = this.edit && t[this.edit.active] ? this.edit.active : t.active;
    this.edit = { ...t, active: e }, this.pending = null, this.clearReconcile();
  }
  /** Live preview without scheduling a write (used during a drag). */
  preview(t) {
    this.edit = t, this.changed();
  }
  commit(t) {
    this.edit = t, this.pending = t, this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = setTimeout(() => this.flush(), Tr), this.changed();
  }
  /** Change only which setpoint is edited (no write). */
  select(t) {
    this.edit = t, this.pending && (this.pending = { ...this.pending, active: t.active }), this.changed();
  }
  flush() {
    this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = null;
    const t = this.edit ? Er(this.edit, this.entityId()) : null;
    t && this.send(t), this.clearReconcile(), this.reconcileTimer = setTimeout(() => {
      if (this.reconcileTimer = null, this.pending = null, this.latest) {
        const e = this.edit?.active;
        this.edit = { ...this.latest, active: e && this.latest[e] ? e : this.latest.active }, this.changed();
      }
    }, Cr);
  }
  /** On disconnect: send anything still queued, drop timers. */
  dispose() {
    this.writeTimer && this.flush(), this.clearReconcile(), this.pending = null;
  }
  clearReconcile() {
    this.reconcileTimer && clearTimeout(this.reconcileTimer), this.reconcileTimer = null;
  }
}
function zt(o, t) {
  const e = o.heat ?? o.cool, i = o.unit.includes("C");
  let r = t?.range_min ?? e?.min ?? (i ? 10 : 50), a = t?.range_max ?? e?.max ?? (i ? 32 : 90);
  a > r || (a = r + (i ? 10 : 20));
  for (const n of [o.heat, o.cool])
    n && (r = Math.min(r, n.value), a = Math.max(a, n.value));
  return { min: r, max: a };
}
function $t(o, t) {
  return Math.min(1, Math.max(0, (o - t.min) / (t.max - t.min)));
}
function Rr(o, t) {
  return t.min + Math.min(1, Math.max(0, o)) * (t.max - t.min);
}
function Pr(o, t, e) {
  const i = t > 0 ? t : e > 0 ? e : 0;
  if (i <= 0) return [];
  const r = [], a = Math.ceil(o.min / i) * i;
  if ((o.max - a) / i > 200) return [];
  for (let n = a; n <= o.max + 1e-9; n = Math.round((n + i) * 1e3) / 1e3) {
    const s = e > 0 && Math.abs(n / e - Math.round(n / e)) < 1e-6;
    r.push({ value: n, fraction: $t(n, o), label: s });
  }
  return r;
}
function Or(o, t, e) {
  if (!o.heat) return "cool";
  if (!o.cool) return "heat";
  const i = Math.abs($t(o.heat.value, e) - t), r = Math.abs($t(o.cool.value, e) - t);
  return Math.abs(i - r) < 1e-6 ? o.active : i < r ? "heat" : "cool";
}
const Lr = Dt`
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
`, Br = Array.from({ length: 14 }, (o, t) => ({
  x: (t * 37 + 11) % 92 + 4,
  y: (t * 53 + 7) % 86 + 6,
  d: 3 + t * 7 % 5,
  dl: -(t * 1.3 % 5)
}));
function ht(o, t, e) {
  return c`<div class="lay">
    ${Ue(o.style, t).map(
    (i) => c`<i
          class="col"
          style=${$({ "--x": `${i.x}%`, "--sz": `${i.s}${e}`, "--d": `${i.d}s`, "--dl": `${i.dl}s` })}
          ><b></b
        ></i>`
  )}
  </div>`;
}
function Nr(o, t) {
  switch (o.style) {
    case "plasma":
      return ht(o, t, "%");
    case "lava":
      return c`<svg class="defs" width="0" height="0" aria-hidden="true">
          <filter id="etc-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </svg>
        ${ht(o, t, "%")}`;
    case "shimmer":
      return c`${ht(o, t, "%")}
        <div class="spark">
          ${Br.map(
        (e) => c`<i style=${$({ left: `${e.x}%`, top: `${e.y}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s` })}></i>`
      )}
        </div>`;
    case "particles":
      return ht(o, t, "px");
    case "aurora":
      return c`${Ue("aurora", t).map(
        (e) => c`<i
            class="rib"
            style=${$({ "--y": `${e.y}%`, "--h": `${e.s}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s` })}
          ></i>`
      )}`;
    case "flow":
      return c`<i class="band b1"></i><i class="band b2"></i>`;
    case "core":
      return c`<i class="c1"></i><i class="c2"></i>`;
    case "mesh":
      return c`<div class="lay">
        <i class="m m1"><b></b></i><i class="m m2"><b></b></i><i class="m m3"><b></b></i><i class="m m4"><b></b></i>
      </div>`;
    case "beam":
      return c`<div class="beam"><i class="r1"></i><i class="r2"></i><i class="r3"></i></div>`;
  }
}
function Fr(o, t) {
  const e = o.background ?? {}, i = e.quality ?? M.quality, r = e.fill === "image" && e.image?.url ? c`<div class="bg-base" aria-hidden="true">
          <div class="bg-img fit-${e.image.fit ?? "cover"}"></div>
          ${e.image.darken ? c`<div class="bg-dark"></div>` : h}
        </div>` : h, a = t ? c`<div class="bg s-${t.style} st-${t.state} dir-${t.dir} q-${i}" aria-hidden="true">
        ${Nr(t, i)}${t.blades ? c`<i class="blades"></i>` : h}
      </div>` : h, n = e.scrim || e.vignette || e.grain ? c`<div class="bg-finish" aria-hidden="true">
          ${e.scrim ? c`<i class="scrim"></i>` : h} ${e.vignette ? c`<i class="vig"></i>` : h}
          ${e.grain ? c`<i class="grain"></i>` : h}
        </div>` : h;
  return c`${r}${a}${n}`;
}
const xe = ["heating", "cooling", "idle", "fan", "off"], Ur = 6e3, Hr = {
  heating: "Heating",
  cooling: "Cooling",
  idle: "Idle",
  fan: "Fan",
  off: "Off"
};
function Dr(o, t) {
  const e = o.test_mode;
  return e ? e === "cycle" ? xe[t % xe.length] : e : null;
}
function ke(o, t) {
  if (!o.available) return o;
  const e = o.setpoints, i = o.unit.includes("C") ? 2 : 4, r = e?.heat ?? e?.cool ?? o.currentTemp ?? 70, a = e?.cool ?? e?.heat ?? o.currentTemp ?? 74;
  switch (t) {
    case "heating":
      return { ...o, equipment: "heating", mode: o.mode === "heat_cool" ? "heat_cool" : "heat", currentTemp: r - i, setpoints: e ?? { heat: r, cool: null } };
    case "cooling":
      return { ...o, equipment: "cooling", mode: o.mode === "heat_cool" ? "heat_cool" : "cool", currentTemp: a + i, setpoints: e ?? { heat: null, cool: a } };
    case "idle": {
      const n = o.mode === "heat" || o.mode === "cool" || o.mode === "heat_cool" ? o.mode : "heat";
      return { ...o, equipment: "idle", mode: n, currentTemp: n === "cool" ? a : r, setpoints: e ?? { heat: r, cool: null } };
    }
    case "fan":
      return { ...o, equipment: "fan", mode: "fan_only" };
    case "off":
      return { ...o, equipment: "off", mode: "off", setpoints: null };
  }
}
const Ir = globalThis.CSS;
for (const [o, t, e] of [
  ["--etc-bg-a", "<color>", "transparent"],
  ["--etc-bg-b", "<color>", "transparent"],
  ["--etc-bg-op", "<number>", "1"]
])
  try {
    Ir?.registerProperty?.({ name: o, syntax: t, inherits: !0, initialValue: e });
  } catch {
  }
const jr = Dt`
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
var qr = Object.defineProperty, B = (o, t, e, i) => {
  for (var r = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (r = n(t, e, r) || r);
  return r && qr(t, e, r), r;
};
const Yr = 18;
function Vr(o, t) {
  const e = o.currentTemp;
  if (e === null || !t?.available) return !1;
  const i = (t.heat ?? t.cool).step / 2, r = t.heat?.value, a = t.cool?.value;
  return r !== void 0 && a !== void 0 ? e >= r - i && e <= a + i : r !== void 0 ? e >= r - i : a !== void 0 ? e <= a + i : !1;
}
const Wr = 500, Jt = class Jt extends Z {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(), this._tick = 0, this._popupOpen = !1, this._menu = null, this._revealed = !1, this._bgPaused = !1, this._editMode = !1, this._preview = !1, this._cycle = 0, this._cycleTimer = null, this._onScreen = !0, this._revealTimer = null, this._sp = new Mr(
      () => this._config?.entity ?? "",
      (t) => this._call(t),
      () => {
        this._tick += 1, this._revealed && this._armReveal();
      }
    ), this._drag = null, this._barDrag = null, this._hold = null, this._updatePause = () => {
      const t = !this._onScreen || document.visibilityState === "hidden";
      t !== this._bgPaused && (this._bgPaused = t);
    }, this._wheelDown = (t) => {
      const e = this._sp.edit, i = e?.[e.active];
      if (!i) return;
      const r = t.currentTarget;
      r.focus({ preventScroll: !0 }), this._drag = { startY: t.clientY, startValue: i.value }, this._sp.dragging = !0, this._armReveal(), r.setPointerCapture?.(t.pointerId);
    }, this._wheelMove = (t) => {
      !this._drag || !this._sp.edit || this._sp.preview(Sr(this._sp.edit, this._drag.startValue, t.clientY - this._drag.startY, Yr));
    }, this._wheelUp = (t) => {
      const e = this._drag;
      if (!e) return;
      this._drag = null, this._sp.dragging = !1;
      const i = t.currentTarget;
      i.hasPointerCapture?.(t.pointerId) && i.releasePointerCapture(t.pointerId);
      const r = this._sp.edit;
      r && r[r.active]?.value !== e.startValue && this._sp.commit(r);
    }, this._wheelKey = (t) => {
      const e = this._sp.edit;
      e && (t.key === "ArrowUp" || t.key === "ArrowRight" ? (t.preventDefault(), this._sp.commit(X(e, 1))) : (t.key === "ArrowDown" || t.key === "ArrowLeft") && (t.preventDefault(), this._sp.commit(X(e, -1))));
    }, this._wheelScroll = (t) => {
      const e = this._sp.edit;
      !e || Math.abs(t.deltaY) < 4 || (t.preventDefault(), this._sp.commit(X(e, t.deltaY < 0 ? 1 : -1)));
    }, this._barDown = (t) => {
      const e = this._sp.edit;
      if (!e?.available) return;
      const i = t.currentTarget, r = i.getBoundingClientRect(), a = zt(e, this._config?.setpoint?.bar), n = this._barFraction(t, r), s = Or(e, n, a);
      this._barDrag = { handle: s, rect: r }, this._sp.dragging = !0, this._armReveal(), i.setPointerCapture?.(t.pointerId), this._sp.preview($e(tt(e, s), this._barValueAt(t, r)));
    }, this._barMove = (t) => {
      !this._barDrag || !this._sp.edit || this._sp.preview($e(this._sp.edit, this._barValueAt(t, this._barDrag.rect)));
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
    this._config = Rt(t), this._open = this._loadOpen();
  }
  static getConfigElement() {
    return document.createElement(Mt);
  }
  static getStubConfig(t) {
    return { entity: Object.keys(t?.states ?? {}).find((i) => i.startsWith("climate.")) ?? "climate.thermostat" };
  }
  set editMode(t) {
    this._editMode = !!t;
  }
  set preview(t) {
    this._preview = !!t;
  }
  /** Test mode only runs while editing, so a saved test_mode is harmless. */
  _testActive() {
    if (!this._config?.test_mode) return !1;
    const t = window;
    return this._editMode || this._preview || (t.__etcEditorsOpen ?? 0) > 0 || !!t.__etcForceEditMode;
  }
  _syncCycleTimer() {
    const t = this._testActive() && this._config?.test_mode === "cycle";
    t && !this._cycleTimer && (this._cycleTimer = setInterval(() => this._cycle += 1, Ur)), !t && this._cycleTimer && (clearInterval(this._cycleTimer), this._cycleTimer = null);
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
    }), this._io.observe(this)), document.addEventListener("visibilitychange", this._updatePause);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._io?.disconnect(), this._io = void 0, this._cycleTimer && clearInterval(this._cycleTimer), this._cycleTimer = null, document.removeEventListener("visibilitychange", this._updatePause), this._sp.dispose(), this._revealTimer && clearTimeout(this._revealTimer);
  }
  willUpdate(t) {
    (t.has("hass") || t.has("_config")) && this.hass && this._config && this._sp.sync(kr(this.hass, this._config)), t.has("hass") && this._popupEl && this.hass && (this._popupEl.hass = this.hass);
  }
  /** Only re-render for state that this card reads (not every hass push). */
  shouldUpdate(t) {
    if (!t.has("hass") || t.size > 1) return !0;
    const e = t.get("hass");
    return !e || !this.hass || !this._config ? !0 : this._watched().some((i) => e.states[i] !== this.hass.states[i]);
  }
  _watched() {
    const t = this._config, e = [t.entity], i = Gt(t);
    i && e.push(i);
    for (const r of t.sets ?? []) for (const a of r.chips ?? []) e.push(a.entity);
    if (this.hass)
      for (const r of t.sets ?? [])
        for (const a of r.chips ?? []) {
          if (a.type !== "rf_fan") continue;
          const n = Nt(this.hass, a, 0);
          n.lightEntity && e.push(n.lightEntity);
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
    if (!this._config || !this.hass) return h;
    const t = this._config, e = Mi(this.hass, t);
    this._syncCycleTimer();
    const i = this._testActive() ? Dr(t, this._cycle) : null, r = i ? { ...ke(e, i), currentTemp: e.currentTemp, setpoints: e.setpoints } : e, a = i ? ke(e, i) : e, n = Ei(this.hass, t), s = Ui(this.hass, t, a), l = {
      [`eq-${r.equipment ?? "none"}`]: !0,
      [`mode-${r.mode}`]: !0,
      ...sr(t, a),
      frosted: Fe(t),
      "bg-paused": !!s && this._bgPaused
    }, d = { ...Yi(t), ...qi(t.text), ...this._barVars(), ...lr(t), ...Ii(t, s) }, u = { top: [], bottom: [], left: [], right: [] }, p = n.filter((f) => f.display === "toggle"), g = { top: [], bottom: [], left: [], right: [] };
    for (const f of n) f.display === "menu" && g[f.zone].push(f);
    for (const f of n) {
      if (f.display === "menu") {
        g[f.zone][0] === f && u[f.zone].push(this._renderMenuRow(g[f.zone], f.zone));
        continue;
      }
      f.display === "toggle" && !this._open.has(f.key) || u[f.zone].push(this._renderSet(f));
    }
    const b = t.toggles_zone ?? m.toggles_zone;
    return p.length && u[b].push(this._renderToggles(p)), c`
      <ha-card class=${Tt(l)} style=${$(d)}>
        ${Fr(t, s)}
        ${i ? c`<div class="test-badge" title="Test mode runs only while you edit the dashboard">TEST · ${Hr[i]}</div>` : h}
        <div class="grid">
          ${["top", "left"].map((f) => this._zone(f, u[f]))}
          ${this._renderCore(r)}
          ${["right", "bottom"].map((f) => this._zone(f, u[f]))}
        </div>
        ${this._renderPopup()}
      </ha-card>
    `;
  }
  _zone(t, e) {
    return e.length ? c`<div class="zone ${t}">${e}</div>` : h;
  }
  _barVars() {
    const t = this._config?.setpoint?.bar ?? {}, e = {};
    return t.height && (e["--etc-bar-h"] = `${t.height}px`), t.length && (e["--etc-bar-len"] = `${t.length}px`), t.heat_color && (e["--bar-heat"] = t.heat_color), t.cool_color && (e["--bar-cool"] = t.cool_color), t.comfort_color && (e["--bar-comfort"] = t.comfort_color), t.handle_color && (e["--bar-handle"] = t.handle_color), t.handle_border_color === "none" ? e["--bar-hbw"] = "0px" : t.handle_border_color && (e["--bar-hbc"] = t.handle_border_color), t.flag_color && (e["--bar-flag"] = t.flag_color), t.flag_text_color && (e["--bar-flag-fg"] = t.flag_text_color), e;
  }
  // ---- core -----------------------------------------------------------------
  /** Tap-to-reveal is on (and there is a control to reveal). */
  _tapMode() {
    const t = this._config?.setpoint ?? {};
    return (t.reveal ?? m.reveal) === "tap" && (t.control ?? m.control) !== "none";
  }
  _setRevealed(t) {
    this._revealed = t, this._armReveal();
  }
  /** (Re)start the auto-close countdown; called on every interaction. */
  _armReveal() {
    if (this._revealTimer && clearTimeout(this._revealTimer), this._revealTimer = null, !this._revealed || !this._tapMode()) return;
    const t = this._config?.setpoint?.hide_after ?? m.hide_after;
    t <= 0 || (this._revealTimer = setTimeout(() => {
      if (this._revealTimer = null, this._sp.dragging) {
        this._armReveal();
        return;
      }
      this._revealed = !1;
    }, t * 1e3));
  }
  _renderCore(t) {
    const e = this._config, i = e.setpoint ?? {}, r = i.control ?? m.control, a = i.position ?? m.position, n = e.core_align ?? m.core_align, s = this._sp.edit, l = !!s?.available && r !== "none", d = i.bar?.position ?? m.bar.position, u = d === "above", p = d === "left" || d === "right", g = t.equipment ? `eq-${t.equipment}` : "", b = l && this._tapMode(), f = !b || this._revealed, v = i.reveal_from ?? m.reveal_from, w = b && (v === "both" || v === "current"), x = b && (v === "both" || v === "pills"), H = b && f && (i.open_in ?? m.open_in) === "current", y = b && !f && !!i.hide_at_target && Vr(t, s), z = w || y, _ = l ? r === "bar" ? this._renderBar(s, t) : this._renderControl(s, r) : null;
    let E = null;
    l && (b ? f ? E = H ? null : _ : !y && (i.collapsed ?? m.collapsed) === "visual" && (E = this._renderCollapsed(s, t, r)) : E = _);
    const N = r !== "bar" ? E : null, P = r === "bar" ? E : null;
    if (!t.available)
      return c`<div class="core al-${n}">
        <div class="main">
          ${e.show_name ?? m.show_name ? c`<div class="name">${t.name}</div>` : h}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    const Qt = c`${U(t.currentTemp, t.unit)}<span class="unit">${t.unit}</span>`, lt = e.status_position ?? m.status_position, ct = (e.show_status ?? m.show_status) && t.equipment ? c`<div class="status ${g} sp-${lt}">
            <ha-icon icon=${Wt[t.state] ?? "mdi:thermostat"}></ha-icon>${Ri[t.equipment]}
          </div>` : h, te = H ? c`<div class="in-current">${_}</div>` : e.show_current ?? m.show_current ? z ? c`<button
              class="current tappable ${g}"
              aria-expanded=${f}
              aria-label="Show temperature controls"
              @click=${() => this._setRevealed(!this._revealed)}
            >
              ${Qt}
            </button>` : c`<div class="current ${g}">${Qt}</div>` : h, Ke = c`<div class="main">
      ${e.show_name ?? m.show_name ? c`<div class="name">${t.name}</div>` : h}
      ${lt === "above" ? ct : h}
      ${(e.show_humidity ?? m.show_humidity) && t.humidity !== null ? c`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(t.humidity)}%</div>` : h}
      ${lt === "beside" && ct !== h ? c`<div class="cur-row">${te}${ct}</div>` : te}
      ${lt === "below" ? ct : h}
      ${(e.show_pills ?? m.show_pills) && s?.available && !y ? this._renderPills(s, x, f) : h}
    </div>`;
    return c`<div class="core al-${n} pos-${a}">
      ${P && u ? P : h}
      <div class="core-row">
        ${P && d === "left" ? P : h} ${N && a === "left" ? N : h} ${Ke}
        ${N && a === "right" ? N : h} ${P && d === "right" ? P : h}
      </div>
      ${N && a === "center" ? c`<div class="ctl-center">${N}</div>` : h}
      ${P && !u && !p ? P : h}
    </div>`;
  }
  /** The control's own value while it is folded away; tap to open. */
  _renderCollapsed(t, e, i) {
    const r = t[t.active];
    if (!r) return h;
    const a = () => this._setRevealed(!0);
    if (i === "bar")
      return c`<div
        class="collapsed bar-c"
        role="button"
        tabindex="0"
        aria-label="Show temperature controls"
        @click=${a}
        @keydown=${(s) => {
        (s.key === "Enter" || s.key === " ") && (s.preventDefault(), a());
      }}
      >
        ${this._renderBar(t, e, !0)}
      </div>`;
    const n = U(r.value, t.unit);
    return c`<button class="collapsed" aria-label="Show temperature controls" @click=${a}>
      ${i === "wheel" ? this._wheelCentre(t.active, n) : c`<span class="sv" style=${$({ "--c": t.active === "cool" ? "var(--etc-cool)" : "var(--etc-heat)" })}
            >${n}</span
          >`}
    </button>`;
  }
  /** `tapOpens`: the pills open the control (tap-to-reveal). In Heat/Cool a
   *  pill also picks which setpoint the wheel/stepper edits. */
  _renderPills(t, e = !1, i = !0) {
    const r = !!(t.heat && t.cool), a = (n) => {
      const s = t[n];
      if (!s) return h;
      const l = c`<ha-icon icon=${n === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${U(
        s.value,
        t.unit
      )}`, d = r && t.active !== n && this._usesActive() && i;
      return !r && !e ? c`<div class="pill ${n}">${l}</div>` : c`<button
        class="pill ${n} ${d ? "dim" : ""} ${e ? "tappable" : ""}"
        aria-pressed=${r ? String(t.active === n) : h}
        aria-expanded=${e ? String(i) : h}
        aria-label=${`${n === "heat" ? "Heat" : "Cool"} setpoint`}
        @click=${() => this._pillTap(t, n, r, e, i)}
      >
        ${l}
      </button>`;
    };
    return c`<div class="pills">${a("heat")} ${a("cool")}</div>`;
  }
  _pillTap(t, e, i, r, a) {
    i && this._sp.select(tt(t, e)), r && (a ? !i || t.active === e ? this._setRevealed(!1) : this._armReveal() : this._setRevealed(!0));
  }
  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  _usesActive() {
    const t = this._config?.setpoint?.control ?? m.control;
    return t === "wheel" || t === "stepper";
  }
  _renderControl(t, e) {
    const i = t[t.active];
    if (!i) return h;
    const r = t.active, a = c`<button
      class="round ${r}"
      aria-label="Increase"
      ?disabled=${i.max !== null && i.value >= i.max}
      @click=${() => this._sp.commit(X(t, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`, n = c`<button
      class="round ${r}"
      aria-label="Decrease"
      ?disabled=${i.min !== null && i.value <= i.min}
      @click=${() => this._sp.commit(X(t, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`, l = (this._config?.show_pills ?? m.show_pills) === !1 && t.heat && t.cool ? c`<div class="hc-switch" role="group" aria-label="Setpoint">
            ${["heat", "cool"].map(
      (y) => c`<button
                class="hc ${y} ${t.active === y ? "on" : ""}"
                aria-pressed=${String(t.active === y)}
                aria-label=${y === "heat" ? "Edit heat setpoint" : "Edit cool setpoint"}
                @click=${() => {
        this._sp.select(tt(t, y)), this._armReveal();
      }}
              >
                <ha-icon icon=${y === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${U(t[y].value, t.unit)}
              </button>`
    )}
          </div>` : h, d = this._config?.setpoint?.nudge, u = d === "beside" ? "right" : d ?? (e === "stepper" ? "around" : "right"), p = (y, z) => {
      const _ = c`<div class="nudges">${a}${n}</div>`, E = c`<div class="nudges row">${n}${a}</div>`, N = u === "hidden" ? z : u === "left" ? c`${_}${z}` : u === "above" ? c`${E}${z}` : u === "below" ? c`${z}${E}` : u === "stacked" ? c`${a}${z}${n}` : u === "around" ? c`${n}${z}${a}` : c`${z}${_}`, P = c`<div class="${y} nud-${u}">${N}</div>`;
      return l === h ? P : c`<div class="ctl-wrap">${l}${P}</div>`;
    };
    if (e === "stepper")
      return p(`stepper ${r}`, c`<span class="sv">${U(i.value, t.unit)}</span>`);
    const b = (this._config?.setpoint ?? {}).neighbors ?? m.neighbors, f = Ar(i, b), v = f.filter((y) => y > i.value).reverse(), w = f.filter((y) => y < i.value).reverse(), x = (y) => c`<div class="nb ${Math.abs(y - i.value) > i.step * 1.5 ? "far" : ""}">${U(y, t.unit)}</div>`, H = c`<div
      class="wheel-col"
      role="slider"
      tabindex="0"
      aria-label=${`${r === "cool" ? "Cool" : "Heat"} setpoint`}
      aria-valuenow=${i.value}
      aria-valuemin=${i.min ?? h}
      aria-valuemax=${i.max ?? h}
      aria-valuetext=${U(i.value, t.unit)}
      @pointerdown=${this._wheelDown}
      @pointermove=${this._wheelMove}
      @pointerup=${this._wheelUp}
      @pointercancel=${this._wheelUp}
      @keydown=${this._wheelKey}
      @wheel=${this._wheelScroll}
    >
      ${v.map(x)}
      ${this._wheelCentre(r, U(i.value, t.unit))}
      ${w.map(x)}
    </div>`;
    return p("wheel", H);
  }
  _wheelCentre(t, e) {
    return (this._config?.setpoint?.wheel_style ?? m.wheel_style) === "pill" ? c`<div class="pill wheel-pill ${t}">
        <ha-icon icon=${t === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${e}
      </div>` : c`<div class="bubble ${t}">${e}</div>`;
  }
  // ---- bar ------------------------------------------------------------------
  _renderBar(t, e, i = !1) {
    const r = { ...m.bar, ...this._config?.setpoint?.bar ?? {} }, a = zt(t, r), n = (_) => `${($t(_, a) * 100).toFixed(3)}%`, s = r.position === "left" || r.position === "right", l = (_) => s ? { bottom: _ } : { left: _ }, d = s ? "height" : "width", u = s ? "top" : "right", p = t.heat, g = t.cool, b = Pr(a, r.ticks ?? 0, r.labels ?? 0), f = [];
    if (r.look === "gradient") {
      const _ = r.stops?.length ? r.stops : ["#2b9af9", "#7ccf8a", "#ff8100"];
      f.push(c`<div class="seg full" style=${$({ background: `linear-gradient(to ${s ? "top" : "right"}, ${_.join(", ")})` })}></div>`);
    } else
      p && f.push(c`<div class="seg heat" style=${$({ [d]: n(p.value) })}></div>`), g && f.push(c`<div class="seg cool" style=${$({ ...l(n(g.value)), [u]: "0" })}></div>`), p && g && f.push(c`<div class="seg comfort" style=${$({ ...l(n(p.value)), [u]: `calc(100% - ${n(g.value)})` })}></div>`);
    const v = (_) => {
      const E = t[_];
      return E ? c`
        ${r.flags ? c`<div class="flag ${_}" style=${$(l(n(E.value)))}>${U(E.value, t.unit)}°</div>` : h}
        <div
          class="handle ${_} s-${r.handle_shape ?? "round"} ${t.active === _ && p && g ? "active" : ""}"
          style=${$(l(n(E.value)))}
          role=${i ? h : "slider"}
          aria-orientation=${s ? "vertical" : "horizontal"}
          tabindex=${i ? h : "0"}
          aria-label=${`${_ === "heat" ? "Heat" : "Cool"} setpoint`}
          aria-valuenow=${E.value}
          aria-valuemin=${a.min}
          aria-valuemax=${a.max}
          @focus=${() => this._sp.select(tt(this._sp.edit, _))}
          @keydown=${(N) => this._barKey(N, _)}
        ></div>
      ` : h;
    }, w = e.currentTemp, x = r.show_current && w !== null && w >= a.min && w <= a.max ? c`<div class="marker" style=${$(l(n(w)))} title="Current"></div>` : h, H = i ? c`<div class="track ro">${f}${x}${v("heat")} ${v("cool")}</div>` : c`<div
          class="track"
          @pointerdown=${this._barDown}
          @pointermove=${this._barMove}
          @pointerup=${this._barUp}
          @pointercancel=${this._barUp}
        >
          ${f}${x}${v("heat")} ${v("cool")}
        </div>`, y = s ? r.flag_position === "right" ? "right" : "left" : r.flag_position === "below" ? "below" : "above", z = s ? r.tick_position === "left" ? "left" : "right" : r.tick_position === "above" ? "above" : "below";
    return c`<div class="bar ${s ? `vertical side-${r.position}` : "horizontal"} ${r.flags ? `flags-${y}` : "no-flags"} ticks-${z}">
      ${H}
      ${b.length ? c`<div class="ticks">
            ${b.map(
      (_) => c`<div class="tick ${_.label ? "lbl" : ""}" style=${$(l(`${_.fraction * 100}%`))}></div>
                ${_.label ? c`<div class="tick-l" style=${$(l(`${_.fraction * 100}%`))}>${_.value}</div>` : h}`
    )}
          </div>` : h}
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
    const i = this._sp.edit, r = zt(i, this._config?.setpoint?.bar);
    return Rr(this._barFraction(t, e), r);
  }
  _barKey(t, e) {
    const i = this._sp.edit;
    if (!i) return;
    const r = t.key === "ArrowUp" || t.key === "ArrowRight" ? 1 : t.key === "ArrowDown" || t.key === "ArrowLeft" ? -1 : 0;
    r && (t.preventDefault(), this._sp.commit(X(tt(i, e), r)));
  }
  // ---- button sets ------------------------------------------------------------
  _renderSet(t) {
    const e = Bt(this._config?.buttons, t.config.style), i = t.type !== "chips" && t.orientation === "row" && t.align === "stretch", r = { ...we(e) };
    i && (r["grid-template-columns"] = t.columns ? `repeat(${t.columns}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))");
    const a = {
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
      const l = (t.config.chips ?? []).map((d, u) => Nt(this.hass, d, u));
      return c`<div class=${Tt(a)} style=${$(r)} role="group" aria-label=${t.title}>
        ${l.map((d) => this._renderChip(d, e.content))}
      </div>`;
    }
    const n = e.content !== "label", s = e.content !== "icon";
    return c`<div class=${Tt(a)} style=${$(r)} role="group" aria-label=${t.title}>
      ${t.options.map(
      (l) => c`<button
          class="btn ${l.active ? "active" : ""}"
          style=${$({ "--c": l.color })}
          aria-pressed=${l.active}
          title=${l.label}
          @click=${() => {
        const d = fe(t.type, this._config.entity, l.value);
        d && this._call(d);
      }}
        >
          ${n ? c`<ha-icon icon=${l.icon}></ha-icon>` : h}
          ${s ? c`<span class="lbl">${l.label}</span>` : h}
        </button>`
    )}
    </div>`;
  }
  // ---- expandable menus -------------------------------------------------------
  _renderMenuRow(t, e) {
    return c`<div class="menus z-${e}">${t.map((i) => this._renderMenu(i))}</div>`;
  }
  _renderMenu(t) {
    const e = Bt(this._config?.buttons, t.config.style), i = t.options.find((s) => s.active), r = e.content !== "label", a = this._menu === t.key, n = typeof HTMLElement < "u" && "showPopover" in HTMLElement.prototype;
    return c`<div class="menu t-${t.type} ${a ? "open" : ""} d-${t.menuDirection} v-${e.variant}" style=${$(we(e))}>
      <button
        class="mt ${i ? "has-active" : ""}"
        style=${$({ "--c": i?.color ?? "var(--primary-color)" })}
        aria-haspopup="listbox"
        aria-expanded=${a}
        aria-label=${`${t.title}: ${i?.label ?? ""}`}
        @click=${(s) => this._toggleMenu(t, s.currentTarget)}
      >
        ${r ? c`<ha-icon icon=${i?.icon ?? t.toggleIcon}></ha-icon>` : h}
        <span class="mt-text">
          ${t.menuShowName ? c`<span class="mt-name">${t.title}</span>` : h}
          <span class="mt-value">${i?.label ?? "—"}</span>
        </span>
      </button>
      <div
        class="menu-list"
        role="listbox"
        aria-label=${t.title}
        data-key=${t.key}
        popover=${n ? "auto" : h}
        @toggle=${(s) => this._menuToggled(t, s)}
        @keydown=${this._menuKey}
      >
        ${t.options.map(
      (s) => c`<button
            class="mi ${s.active ? "active" : ""}"
            role="option"
            aria-selected=${s.active}
            style=${$({ "--c": s.color })}
            @click=${() => this._pickMenu(t, s.value)}
          >
            ${r ? c`<ha-icon icon=${s.icon}></ha-icon>` : h}<span>${s.label}</span>
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
    const r = i;
    if (i.matches(":popover-open")) {
      r.hidePopover();
      return;
    }
    r.showPopover(), this._placeMenu(i, e, t.menuDirection), this._menu = t.key, (i.querySelector(".mi.active") ?? i.querySelector(".mi"))?.focus({ preventScroll: !0 });
  }
  /** Fixed-position the top-layer list next to its trigger, kept on screen. */
  _placeMenu(t, e, i) {
    const r = e.getBoundingClientRect(), a = 6, n = window.innerWidth, s = window.innerHeight;
    t.style.minWidth = i === "up" || i === "down" ? `${Math.round(r.width)}px` : "";
    const l = t.getBoundingClientRect();
    let d = i === "right" ? r.right + a : i === "left" ? r.left - a - l.width : r.left, u = i === "down" ? r.bottom + a : i === "up" ? r.top - a - l.height : r.top;
    i === "down" && u + l.height > s && (u = r.top - a - l.height), i === "up" && u < 0 && (u = r.bottom + a), i === "right" && d + l.width > n && (d = r.left - a - l.width), i === "left" && d < 0 && (d = r.right + a), d = Math.max(4, Math.min(d, n - l.width - 4)), u = Math.max(4, Math.min(u, s - l.height - 4)), t.style.left = `${Math.round(d)}px`, t.style.top = `${Math.round(u)}px`;
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
    const i = fe(t.type, this._config.entity, e);
    i && this._call(i), this._fire("haptic", "light"), this._closeMenus();
  }
  _renderToggles(t) {
    return c`<div class="toggles">
      ${t.map((e) => {
      const i = this._open.has(e.key);
      return c`<button class="tgl ${i ? "open" : ""}" aria-expanded=${i} @click=${() => this._toggleSet(e.key)}>
          <ha-icon icon=${e.toggleIcon}></ha-icon><span>${e.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
    })}
    </div>`;
  }
  // ---- chips --------------------------------------------------------------------
  _renderChip(t, e) {
    const i = t.config.show_name ?? e !== "icon", r = t.config.show_state ?? !0, a = t.type === "rf_fan";
    return c`<button
      class="chip ${t.on ? "on" : ""} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
      aria-label=${`${t.name}: ${t.state}`}
      title=${`${t.name}: ${t.state}`}
      @pointerdown=${(n) => this._chipDown(n, t)}
      @pointerup=${this._chipCancelHold}
      @pointerleave=${this._chipCancelHold}
      @pointercancel=${this._chipCancelHold}
      @click=${() => this._chipTap(t)}
      @contextmenu=${(n) => n.preventDefault()}
    >
      <ha-icon class=${t.spin ? "spin" : ""} style=${$(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>
      ${i ? c`<span>${t.name}</span>` : h}
      ${a && t.natural ? c`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
            ><ha-icon icon="mdi:leaf"></ha-icon>${r && t.naturalLevel !== null ? t.naturalLevel : h}</span
          >` : r && (!a || t.speed !== null || !t.on) ? c`<span class="badge">${t.state}</span>` : h}
      ${a && t.lightOn ? c`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : h}
      ${a && t.timerEnds ? c`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${er(t.timerEnds)}</span>` : h}
    </button>`;
  }
  _chipDown(t, e) {
    if (t.pointerType === "mouse" && t.button !== 0 || (this._chipCancelHold(), e.hold === "none")) return;
    const i = { fired: !1, timer: setTimeout(() => {
      i.fired = !0, this._chipAction(e, e.hold), this._fire("haptic", "medium");
    }, Wr) };
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
        const i = rr(t.config);
        i && this._canCreate(i) ? this._showPopup(i) : this._fire("hass-more-info", { entityId: t.entity });
        break;
      }
      case "more-info":
        this._fire("hass-more-info", { entityId: t.entity });
        break;
      case "toggle":
      case "toggle_light": {
        const i = or(t, e);
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
      const a = window.loadCardHelpers;
      if (a) e = (await a()).createCardElement(t);
      else {
        const n = String(t.type);
        e = document.createElement(n.startsWith("custom:") ? n.slice(7) : `hui-${n}-card`), e.setConfig?.(t);
      }
    } catch (a) {
      console.error("[easy-thermostat-styler-card] pop-up card failed", a);
      return;
    }
    e.hass = this.hass, this._popupEl = e, this._popupOpen = !0, await this.updateComplete;
    const i = this.renderRoot.querySelector("dialog.popup"), r = this.renderRoot.querySelector(".popup-body");
    !i || !r || (r.replaceChildren(e), i.open || i.showModal?.());
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
    </dialog>` : h;
  }
};
Jt.styles = [Lr, jr];
let T = Jt;
B([
  Vt({ attribute: !1 })
], T.prototype, "hass");
B([
  C()
], T.prototype, "_config");
B([
  C()
], T.prototype, "_open");
B([
  C()
], T.prototype, "_tick");
B([
  C()
], T.prototype, "_popupOpen");
B([
  C()
], T.prototype, "_menu");
B([
  C()
], T.prototype, "_revealed");
B([
  C()
], T.prototype, "_bgPaused");
B([
  C()
], T.prototype, "_editMode");
B([
  C()
], T.prototype, "_preview");
B([
  C()
], T.prototype, "_cycle");
customElements.get(_t) || customElements.define(_t, T);
const xt = window;
xt.customCards = xt.customCards ?? [];
xt.customCards.some((o) => o.type === _t) || xt.customCards.push({
  type: _t,
  name: "Easy Thermostat Styler Card (Ltek)",
  description: "A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.",
  preview: !0
});
console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${Me} `, "background:#ff8100;color:#fff", "background:#333;color:#fff");
