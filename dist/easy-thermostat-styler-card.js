/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = globalThis, Yt = _t.ShadowRoot && (_t.ShadyCSS === void 0 || _t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gt = Symbol(), ce = /* @__PURE__ */ new WeakMap();
let Le = class {
  constructor(t, e, o) {
    if (this._$cssResult$ = !0, o !== Gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Yt && t === void 0) {
      const o = e !== void 0 && e.length === 1;
      o && (t = ce.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && ce.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (i) => new Le(typeof i == "string" ? i : i + "", void 0, Gt), Kt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((o, r, a) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[a + 1], i[0]);
  return new Le(e, i, Gt);
}, ho = (i, t) => {
  if (Yt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const o = document.createElement("style"), r = _t.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = e.cssText, i.appendChild(o);
  }
}, le = Yt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const o of t.cssRules) e += o.cssText;
  return Be(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: po, defineProperty: uo, getOwnPropertyDescriptor: fo, getOwnPropertyNames: go, getOwnPropertySymbols: mo, getPrototypeOf: bo } = Object, Ot = globalThis, de = Ot.trustedTypes, vo = de ? de.emptyScript : "", _o = Ot.reactiveElementPolyfillSupport, ct = (i, t) => i, St = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? vo : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Xt = (i, t) => !po(i, t), he = { attribute: !0, type: String, converter: St, reflect: !1, useDefault: !1, hasChanged: Xt };
Symbol.metadata ??= Symbol("metadata"), Ot.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let et = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = he) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(t, o, e);
      r !== void 0 && uo(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, o) {
    const { get: r, set: a } = fo(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const s = r?.call(this);
      a?.call(this, n), this.requestUpdate(t, s, o);
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
      for (const r of o) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [o, r] of e) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, o] of this.elementProperties) {
      const r = this._$Eu(e, o);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const r of o) e.unshift(le(r));
    } else t !== void 0 && e.push(le(t));
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
    return ho(t, this.constructor.elementStyles), t;
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
    const o = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, o);
    if (r !== void 0 && o.reflect === !0) {
      const a = (o.converter?.toAttribute !== void 0 ? o.converter : St).toAttribute(e, o.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const o = this.constructor, r = o._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = o.getPropertyOptions(r), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : St;
      this._$Em = r;
      const s = n.fromAttribute(e, a.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, e, o, r = !1, a) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[t]), o ??= n.getPropertyOptions(t), !((o.hasChanged ?? Xt)(a, e) || o.useDefault && o.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, o)))) return;
      this.C(t, e, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: o, reflect: r, wrapped: a }, n) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, a] of o) {
        const { wrapped: n } = a, s = this[r];
        n !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, a, s);
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
et.elementStyles = [], et.shadowRootOptions = { mode: "open" }, et[ct("elementProperties")] = /* @__PURE__ */ new Map(), et[ct("finalized")] = /* @__PURE__ */ new Map(), _o?.({ ReactiveElement: et }), (Ot.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = globalThis, pe = (i) => i, At = Zt.trustedTypes, ue = At ? At.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ne = "$lit$", q = `lit$${Math.random().toFixed(9).slice(2)}$`, Fe = "?" + q, wo = `<${Fe}>`, J = document, lt = () => J.createComment(""), dt = (i) => i === null || typeof i != "object" && typeof i != "function", Jt = Array.isArray, yo = (i) => Jt(i) || typeof i?.[Symbol.iterator] == "function", Bt = `[ 	
\f\r]`, it = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, ge = />/g, Y = RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, be = /"/g, Ie = /^(?:script|style|textarea|title)$/i, $o = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), l = $o(1), V = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), Z = J.createTreeWalker(J, 129);
function He(i, t) {
  if (!Jt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(t) : t;
}
const xo = (i, t) => {
  const e = i.length - 1, o = [];
  let r, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = it;
  for (let s = 0; s < e; s++) {
    const c = i[s];
    let d, h, u = -1, f = 0;
    for (; f < c.length && (n.lastIndex = f, h = n.exec(c), h !== null); ) f = n.lastIndex, n === it ? h[1] === "!--" ? n = fe : h[1] !== void 0 ? n = ge : h[2] !== void 0 ? (Ie.test(h[2]) && (r = RegExp("</" + h[2], "g")), n = Y) : h[3] !== void 0 && (n = Y) : n === Y ? h[0] === ">" ? (n = r ?? it, u = -1) : h[1] === void 0 ? u = -2 : (u = n.lastIndex - h[2].length, d = h[1], n = h[3] === void 0 ? Y : h[3] === '"' ? be : me) : n === be || n === me ? n = Y : n === fe || n === ge ? n = it : (n = Y, r = void 0);
    const g = n === Y && i[s + 1].startsWith("/>") ? " " : "";
    a += n === it ? c + wo : u >= 0 ? (o.push(d), c.slice(0, u) + Ne + c.slice(u) + q + g) : c + q + (u === -2 ? s : g);
  }
  return [He(i, a + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class ht {
  constructor({ strings: t, _$litType$: e }, o) {
    let r;
    this.parts = [];
    let a = 0, n = 0;
    const s = t.length - 1, c = this.parts, [d, h] = xo(t, e);
    if (this.el = ht.createElement(d, o), Z.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = Z.nextNode()) !== null && c.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(Ne)) {
          const f = h[n++], g = r.getAttribute(u).split(q), b = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: a, name: b[2], strings: g, ctor: b[1] === "." ? So : b[1] === "?" ? Ao : b[1] === "@" ? Co : Pt }), r.removeAttribute(u);
        } else u.startsWith(q) && (c.push({ type: 6, index: a }), r.removeAttribute(u));
        if (Ie.test(r.tagName)) {
          const u = r.textContent.split(q), f = u.length - 1;
          if (f > 0) {
            r.textContent = At ? At.emptyScript : "";
            for (let g = 0; g < f; g++) r.append(u[g], lt()), Z.nextNode(), c.push({ type: 2, index: ++a });
            r.append(u[f], lt());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Fe) c.push({ type: 2, index: a });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(q, u + 1)) !== -1; ) c.push({ type: 7, index: a }), u += q.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const o = J.createElement("template");
    return o.innerHTML = t, o;
  }
}
function rt(i, t, e = i, o) {
  if (t === V) return t;
  let r = o !== void 0 ? e._$Co?.[o] : e._$Cl;
  const a = dt(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(i), r._$AT(i, e, o)), o !== void 0 ? (e._$Co ??= [])[o] = r : e._$Cl = r), r !== void 0 && (t = rt(i, r._$AS(i, t.values), r, o)), t;
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
    const { el: { content: e }, parts: o } = this._$AD, r = (t?.creationScope ?? J).importNode(e, !0);
    Z.currentNode = r;
    let a = Z.nextNode(), n = 0, s = 0, c = o[0];
    for (; c !== void 0; ) {
      if (n === c.index) {
        let d;
        c.type === 2 ? d = new pt(a, a.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(a, c.name, c.strings, this, t) : c.type === 6 && (d = new To(a, this, t)), this._$AV.push(d), c = o[++s];
      }
      n !== c?.index && (a = Z.nextNode(), n++);
    }
    return Z.currentNode = J, r;
  }
  p(t) {
    let e = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, e), e += o.strings.length - 2) : o._$AI(t[e])), e++;
  }
}
class pt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, o, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = rt(this, t, e), dt(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : yo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && dt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: o } = t, r = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = ht.createElement(He(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const a = new ko(r, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = ve.get(t.strings);
    return e === void 0 && ve.set(t.strings, e = new ht(t)), e;
  }
  k(t) {
    Jt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let o, r = 0;
    for (const a of t) r === e.length ? e.push(o = new pt(this.O(lt()), this.O(lt()), this, this.options)) : o = e[r], o._$AI(a), r++;
    r < e.length && (this._$AR(o && o._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const o = pe(t).nextSibling;
      pe(t).remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Pt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, o, r, a) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = p;
  }
  _$AI(t, e = this, o, r) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = rt(this, t, e, 0), n = !dt(t) || t !== this._$AH && t !== V, n && (this._$AH = t);
    else {
      const s = t;
      let c, d;
      for (t = a[0], c = 0; c < a.length - 1; c++) d = rt(this, s[o + c], e, c), d === V && (d = this._$AH[c]), n ||= !dt(d) || d !== this._$AH[c], d === p ? t = p : t !== p && (t += (d ?? "") + a[c + 1]), this._$AH[c] = d;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class So extends Pt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ao extends Pt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Co extends Pt {
  constructor(t, e, o, r, a) {
    super(t, e, o, r, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = rt(this, t, e, 0) ?? p) === V) return;
    const o = this._$AH, r = t === p && o !== p || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, a = t !== p && (o === p || r);
    r && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class To {
  constructor(t, e, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    rt(this, t);
  }
}
const zo = Zt.litHtmlPolyfillSupport;
zo?.(ht, pt), (Zt.litHtmlVersions ??= []).push("3.3.3");
const Eo = (i, t, e) => {
  const o = e?.renderBefore ?? t;
  let r = o._$litPart$;
  if (r === void 0) {
    const a = e?.renderBefore ?? null;
    o._$litPart$ = r = new pt(t.insertBefore(lt(), a), a, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = globalThis;
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
ot._$litElement$ = !0, ot.finalized = !0, Qt.litElementHydrateSupport?.({ LitElement: ot });
const Mo = Qt.litElementPolyfillSupport;
Mo?.({ LitElement: ot });
(Qt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ro = { attribute: !0, type: String, converter: St, reflect: !1, hasChanged: Xt }, Oo = (i = Ro, t, e) => {
  const { kind: o, metadata: r } = e;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), o === "setter" && ((i = Object.create(i)).wrapped = !0), a.set(e.name, i), o === "accessor") {
    const { name: n } = e;
    return { set(s) {
      const c = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(n, c, i, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, i, s), s;
    } };
  }
  if (o === "setter") {
    const { name: n } = e;
    return function(s) {
      const c = this[n];
      t.call(this, s), this.requestUpdate(n, c, i, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function te(i) {
  return (t, e) => typeof e == "object" ? Oo(i, t, e) : ((o, r, a) => {
    const n = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, o), n ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function L(i) {
  return te({ ...i, state: !0, attribute: !1 });
}
const De = "2026.10.30.25", Ct = "easy-thermostat-styler-card", Dt = "easy-thermostat-styler-card-editor", Ue = [
  "name",
  "status",
  "current",
  "unit",
  "humidity",
  "pill",
  "wheel_value",
  "wheel_neighbor",
  "bar"
], Po = [
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
], O = (i) => !!i && typeof i == "object" && !Array.isArray(i);
function Tt(i) {
  if (!(i == null || i === "")) {
    if (typeof i == "number") return Number.isFinite(i) ? i : void 0;
    if (Array.isArray(i)) {
      const t = i.map(Tt).filter((e) => e !== void 0);
      return t.length ? t : void 0;
    }
    if (O(i)) {
      const t = {};
      for (const [e, o] of Object.entries(i)) {
        const r = Tt(o);
        r !== void 0 && (t[e] = r);
      }
      return Object.keys(t).length ? t : void 0;
    }
    return i;
  }
}
const A = (i, t, e) => {
  const o = typeof i == "number" ? i : typeof i == "string" && i.trim() ? Number(i) : NaN;
  return Number.isFinite(o) ? Math.min(e, Math.max(t, o)) : void 0;
};
function Lo(i) {
  if (!O(i) || typeof i.type != "string") return;
  const t = { ...i };
  return "columns" in t && (t.columns = A(t.columns, 0, 12) || void 0), Array.isArray(t.chips) && (t.chips = t.chips.filter((e) => O(e) && typeof e.entity == "string" && e.entity)), Array.isArray(t.items) && (t.items = t.items.filter((e) => O(e) ? e.kind === "mode" ? typeof e.value == "string" && !!e.value && typeof e.source == "string" : e.kind === "device" ? typeof e.entity == "string" && !!e.entity : e.kind === "action" : !1)), t;
}
function Ut(i) {
  if (!O(i)) throw new Error("Invalid configuration");
  const t = { ...i };
  if (delete t.test_mode, typeof t.entity != "string" || !t.entity)
    throw new Error("Easy Thermostat Styler Card: set an entity (a climate.* entity).");
  const e = O(t.setpoint) ? { ...t.setpoint } : void 0;
  if (e && ("scale" in e && (e.scale = A(e.scale, 40, 250)), "neighbors" in e && (e.neighbors = A(e.neighbors, 0, 3)), "min_gap" in e && (e.min_gap = A(e.min_gap, 0, 20)), "hide_after" in e && (e.hide_after = A(e.hide_after, 0, 300)), t.setpoint = e), O(t.background)) {
    const o = { ...t.background };
    if ("strength" in o && (o.strength = A(o.strength, 0, 100)), "speed" in o && (o.speed = A(o.speed, 25, 800)), "angle" in o && (o.angle = A(o.angle, -180, 180) || void 0), "variation" in o && (o.variation = A(o.variation, 0, 100) || void 0), "scrim" in o && (o.scrim = A(o.scrim, -60, 60) || void 0), "vignette" in o && (o.vignette = A(o.vignette, 0, 100) || void 0), "grain" in o && (o.grain = A(o.grain, 0, 100) || void 0), "frost_blur" in o && (o.frost_blur = A(o.frost_blur, 0, 40)), "air_max" in o && (o.air_max = A(o.air_max, 0.01, 1e6)), O(o.image)) {
      const r = { ...o.image };
      "blur" in r && (r.blur = A(r.blur, 0, 40) || void 0), "darken" in r && (r.darken = A(r.darken, 0, 90) || void 0), o.image = r;
    }
    O(o.gradient) && "angle" in o.gradient && (o.gradient = { ...o.gradient, angle: A(o.gradient.angle, 0, 360) }), t.background = o;
  }
  if ("frost_blur" in t && (t.frost_blur = A(t.frost_blur, 0, 40)), O(t.effects)) {
    const o = { ...t.effects };
    "size" in o && (o.size = A(o.size, 2, 60)), "speed" in o && (o.speed = A(o.speed, 0.6, 8)), t.effects = o;
  }
  return Array.isArray(t.sets) && (t.sets = t.sets.map(Lo).filter(Boolean), t.sets.length === 0) ? { ...Tt({ ...t, sets: void 0 }), sets: [] } : Tt(t);
}
function Bo(i, t) {
  return t.split(".").reduce((e, o) => O(e) || Array.isArray(e) ? e[o] : void 0, i);
}
function z(i, t, e) {
  const o = t.split("."), r = (a, n) => {
    const s = Array.isArray(a) ? [...a] : O(a) ? { ...a } : {}, c = o[n];
    if (n === o.length - 1)
      e === void 0 || e === "" || e === null ? Array.isArray(s) ? s.splice(Number(c), 1) : delete s[c] : s[c] = e;
    else {
      const d = r(s[c], n + 1);
      d === void 0 ? delete s[c] : s[c] = d;
    }
    if (!(!Array.isArray(s) && Object.keys(s).length === 0))
      return s;
  };
  return r(i, 0) ?? {};
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
}, _e = {
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
}, we = "var(--primary-color, #03a9f4)";
function K(i) {
  if (_e[i]) return _e[i];
  const t = i.replace(/_/g, " ");
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Io(i, t, e, o) {
  const r = i;
  try {
    if (e === "hvac" && r.formatEntityState) return r.formatEntityState(t, o);
    if (e !== "hvac" && e !== "chips" && r.formatEntityAttributeValue) {
      const a = e === "preset" ? "preset_mode" : "fan_mode", n = r.formatEntityAttributeValue(t, a, o);
      if (n) return n;
    }
  } catch {
  }
  return K(o);
}
function Ho(i) {
  return Array.isArray(i.sets) ? i.sets : je;
}
function X(i) {
  return i === "hvac" || i === "preset" || i === "fan_mode";
}
function I(i, t) {
  if (!i || !X(t)) return [];
  const e = i.attributes[qe[t].list];
  return Array.isArray(e) ? e.map(String) : [];
}
function Ve(i, t) {
  if (!t?.length) return i;
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t) i.includes(r) && !e.has(r) && (o.push(r), e.add(r));
  for (const r of i) e.has(r) || o.push(r);
  return o;
}
function Do(i, t) {
  const e = i.states[t.entity], o = [], r = (a, n, s, c) => {
    const d = qe[a].active, h = d ? String(e.attributes[d] ?? "") : e.state;
    return {
      value: n,
      label: s ?? Io(i, e, a, n),
      icon: c ?? zt[n.toLowerCase()] ?? "mdi:circle-medium",
      active: n === h,
      color: a === "hvac" ? Fo[n] ?? we : we
    };
  };
  return Ho(t).forEach((a, n) => {
    if (a.hidden) return;
    const s = a.type, c = [];
    if (X(s) && e)
      for (const h of Ve(I(e, s), a.order)) {
        const u = a.options?.[h];
        u?.hide || c.push({ kind: "mode", source: s, option: r(s, h, u?.name, u?.icon) });
      }
    for (const h of a.chips ?? []) h.hide_when_off && ye(i, h.entity) || c.push({ kind: "device", chip: h });
    for (const h of a.items ?? [])
      if (!h.hide)
        if (h.kind === "mode") {
          if (!e || !I(e, h.source).includes(h.value)) continue;
          c.push({ kind: "mode", source: h.source, option: r(h.source, h.value, h.name, h.icon) });
        } else if (h.kind === "device") {
          const { kind: u, hide: f, ...g } = h;
          if (h.hide_when_off && ye(i, h.entity)) continue;
          c.push({ kind: "device", chip: g });
        } else
          c.push({ kind: "action", item: h, label: h.name ?? qt(i, h), icon: h.icon ?? We(h) });
    if (!c.length) return;
    const d = c.flatMap((h) => h.kind === "mode" ? [h.option] : []);
    o.push({
      key: `${s}-${n}`,
      index: n,
      type: s,
      title: a.name ?? j[s],
      zone: a.zone ?? (t.toggles_zone || "bottom"),
      orientation: a.orientation ?? (a.zone === "left" || a.zone === "right" ? "column" : "row"),
      columns: a.columns ?? 0,
      align: a.align ?? (s === "chips" ? "center" : "stretch"),
      // Compact turns full-time sets into toggles; menus are already compact.
      display: a.display === "menu" ? "menu" : t.compact ? "toggle" : a.display ?? "always",
      menuDirection: a.menu_direction ?? jt(a.zone ?? (t.toggles_zone || "bottom")),
      menuShowName: a.menu_show_name ?? !1,
      toggleIcon: a.toggle_icon ?? No[s],
      options: d,
      tiles: c,
      config: a
    });
  }), o;
}
function jt(i) {
  return i === "bottom" ? "up" : i === "left" ? "right" : i === "right" ? "left" : "down";
}
const Uo = /* @__PURE__ */ new Set(["off", "none", "idle", "closed", "false", "no", "standby", "stopped", "not_home", "unavailable", "unknown", ""]);
function ye(i, t) {
  const e = i.states[t];
  if (!e) return !0;
  const o = String(e.state).trim().toLowerCase();
  if (Uo.has(o)) return !0;
  const r = Number(o);
  return o !== "" && Number.isFinite(r) && r <= 0;
}
const jo = { script: "mdi:script-text-play-outline", scene: "mdi:palette-outline", service: "mdi:flash-outline" };
function We(i) {
  return jo[i.action ?? (i.entity?.startsWith("scene.") ? "scene" : i.entity ? "script" : "service")];
}
function qt(i, t) {
  const e = t.entity ? i.states[t.entity]?.attributes.friendly_name : void 0;
  return typeof e == "string" ? e : t.service ? K(t.service.split(".").pop() ?? t.service) : t.entity ?? "Action";
}
function qo(i) {
  const t = i.action ?? (i.entity?.startsWith("scene.") ? "scene" : i.entity?.startsWith("script.") ? "script" : "service");
  if (t === "script" || t === "scene")
    return i.entity ? { domain: t, service: "turn_on", data: { entity_id: i.entity } } : null;
  const e = /^([a-z0-9_]+)\.([a-z0-9_]+)$/.exec(i.service ?? "");
  return e ? { domain: e[1], service: e[2], data: { ...i.data ?? {}, ...i.entity ? { entity_id: i.entity } : {} } } : null;
}
function Vo(i, t, e) {
  switch (i) {
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
function C(i) {
  if (typeof i == "number") return Number.isFinite(i) ? i : null;
  if (typeof i == "string" && i.trim() !== "") {
    const t = Number(i);
    return Number.isFinite(t) ? t : null;
  }
  return null;
}
const Et = /* @__PURE__ */ new Set(["unavailable", "unknown", "none", ""]);
function Ye(i) {
  switch (i) {
    case "heat":
    case "cool":
    case "heat_cool":
    case "dry":
    case "fan_only":
    case "off":
      return i;
    case "auto":
      return "heat_cool";
    default:
      return "unknown";
  }
}
function Wo(i) {
  switch (i) {
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
function Yo(i, t, e) {
  return i === "off" ? "off" : t === null || e === null ? null : e.heat !== null && (i === "heat" || i === "heat_cool") && t < e.heat ? "heating" : e.cool !== null && (i === "cool" || i === "heat_cool") && t > e.cool ? "cooling" : i === "heat" || i === "cool" || i === "heat_cool" ? "idle" : null;
}
function Go(i, t) {
  if (i === "heat_cool") {
    const o = C(t.target_temp_low), r = C(t.target_temp_high);
    if (o !== null || r !== null) return { heat: o, cool: r };
    const a = C(t.temperature);
    return a === null ? null : { heat: a, cool: null };
  }
  const e = C(t.temperature);
  return e === null ? null : i === "heat" ? { heat: e, cool: null } : i === "cool" ? { heat: null, cool: e } : null;
}
function Ko(i, t) {
  const e = i.states[t.entity], o = i.config?.unit_system?.temperature ?? "°", r = e?.attributes.friendly_name, a = t.name ?? (typeof r == "string" ? r : t.entity);
  if (!e || Et.has(e.state))
    return {
      available: !1,
      name: a,
      currentTemp: null,
      unit: o,
      humidity: null,
      equipment: null,
      mode: "unknown",
      state: e?.state ?? "unavailable",
      setpoints: null
    };
  const n = e.attributes, s = Ye(e.state), c = C(n.current_temperature), d = Go(s, n);
  return {
    available: !0,
    name: a,
    currentTemp: c,
    unit: o,
    humidity: C(n.current_humidity),
    equipment: Wo(n.hvac_action) ?? Yo(s, c, d),
    mode: s,
    state: e.state,
    setpoints: d
  };
}
function D(i, t) {
  if (i === null) return "–";
  const e = t.includes("C"), o = e ? Math.round(i * 2) / 2 : Math.round(i);
  return e && !Number.isInteger(o) ? o.toFixed(1) : String(o);
}
const Xo = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan",
  idle: "Idle",
  off: "Off"
}, $e = [
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
], xe = "var(--state-climate-heat-color, #ff8100)", ke = "var(--state-climate-cool-color, #2b9af9)", wt = {
  heating: { main: xe, second: "#d1342a" },
  cooling: { main: ke, second: "#3446d6" },
  idle_heat: { main: xe, second: "#7a3d14" },
  idle_cool: { main: ke, second: "#1b4c86" },
  fan: { main: "var(--state-climate-fan-only-color, #00bfa5)", second: "#3d8fd1" },
  off: { main: "#8a8a92", second: "#3a3a4a" }
}, E = {
  strength: 85,
  speed: 100,
  follow_gap: !0,
  off: "calm",
  quality: "smooth",
  frost_blur: 12
}, Se = {
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
}, Ae = /* @__PURE__ */ new Set(["off", "idle", "closed", "false", "no", "none", "stopped", "standby", "0", "not_running", "clear"]), Jo = /* @__PURE__ */ new Set(["on", "true", "yes", "open", "running", "detected", "active"]), Q = (i) => Math.min(1, Math.max(0.05, i));
function ee(i) {
  return i.background?.air_entity || i.background?.fan_entity || void 0;
}
function Ge(i, t, e) {
  if (!t) return null;
  const o = i.states[t];
  if (!o || Et.has(o.state)) return null;
  const r = String(o.state).trim().toLowerCase(), a = t.split(".")[0];
  if (Ae.has(r)) return null;
  const n = o.attributes;
  if (a === "fan") {
    const h = C(n.percentage);
    return h === null ? 0.6 : h <= 0 ? null : Q(h / 100);
  }
  const s = C(o.state);
  if (s !== null) {
    if (s <= 0) return null;
    if (e) return Q(s / e);
    const h = C(n.min), u = C(n.max);
    if (u !== null && u > (h ?? 0)) return Q((s - (h ?? 0)) / (u - (h ?? 0)));
    if (String(n.unit_of_measurement ?? "").trim() === "%") return Q(s / 100);
    const f = s <= 1 ? 1 : s <= 10 ? 10 : 10 ** Math.ceil(Math.log10(s));
    return Q(s / f);
  }
  if (Se[r] !== void 0) return Se[r];
  const c = Array.isArray(n.options) ? n.options.map((h) => String(h).toLowerCase()).filter((h) => !Ae.has(h) && h !== "auto") : [], d = c.indexOf(r);
  return d >= 0 ? Q((d + 1) / c.length) : Jo.has(r) ? 0.6 : 0.5;
}
function Qo(i, t) {
  const e = i.states[t.entity], o = String(e?.attributes.fan_mode ?? "").toLowerCase(), r = { quiet: 0.2, low: 0.33, medium: 0.6, middle: 0.6, high: 1, max: 1, turbo: 1 };
  if (r[o] !== void 0) return r[o];
  const a = (Array.isArray(e?.attributes.fan_modes) ? e.attributes.fan_modes : []).map((s) => String(s).toLowerCase()).filter((s) => !["auto", "off", "on", "circulate", "diffuse", "focus"].includes(s)), n = a.indexOf(o);
  return n >= 0 && a.length ? (n + 1) / a.length : 0.5;
}
function tr(i, t, e) {
  if (!e.available) return "off";
  if (e.equipment === "heating") return "heating";
  if (e.equipment === "cooling") return "cooling";
  if (e.mode === "fan_only" || e.equipment === "fan" || Ge(i, ee(t), t.background?.air_max) !== null) return "fan";
  if (e.mode === "off") return "off";
  if (e.mode === "cool" || e.mode === "dry" || e.equipment === "drying") return "idle_cool";
  if (e.mode === "heat_cool" && e.setpoints && e.currentTemp !== null) {
    const { heat: o, cool: r } = e.setpoints;
    if (o !== null && r !== null) return e.currentTemp >= (o + r) / 2 ? "idle_cool" : "idle_heat";
    if (r !== null && o === null) return "idle_cool";
  }
  return "idle_heat";
}
function er(i, t) {
  const e = i.currentTemp, o = i.setpoints, r = t === "heating" ? o?.heat ?? o?.cool : o?.cool ?? o?.heat;
  if (e === null || r === null || r === void 0) return 0.7;
  const a = i.unit.includes("C") ? 3 : 5;
  return Math.round(Math.min(1, Math.abs(r - e) / a) * 10) / 10;
}
const or = (i) => Math.max(0.1, Math.round(i * 4) / 4);
function rr(i, t, e) {
  const o = t.background ?? {}, r = o.style ?? "none";
  if (r === "none") return null;
  const a = tr(i, t, e);
  if (a === "off" && (o.off ?? E.off) === "none") return null;
  const n = (o.speed ?? E.speed) / 100, s = (o.strength ?? E.strength) / 100;
  let c, d;
  if (a === "heating" || a === "cooling") {
    const f = o.follow_gap ?? E.follow_gap ? er(e, a) : 0.7;
    c = 0.6 + 1.4 * f, d = 0.6 + 0.4 * f;
  } else a === "fan" ? (c = 0.4 + 2.6 * (Ge(i, ee(t), o.air_max) ?? Qo(i, t)), d = 0.8) : a === "off" ? (c = 0.2, d = 0.35) : (c = 0.35, d = 0.55);
  const h = o.colors?.[a] ?? {}, u = wt[a];
  return {
    style: r,
    state: a,
    dir: a === "fan" ? "swirl" : a === "off" ? "still" : a === "heating" || a === "idle_heat" ? "up" : "down",
    rate: or(c * n),
    opacity: Math.round(d * s * 100) / 100,
    main: h.main || u.main,
    second: h.second || u.second,
    blades: a === "fan"
  };
}
function Ke(i) {
  return !!(i.frosted ?? i.background?.frosted);
}
function ir(i) {
  const t = i.background ?? {}, e = t.gradient?.stops?.filter(Boolean) ?? [];
  return t.fill === "gradient" && e.length >= 2 ? t.gradient?.type === "radial" ? `radial-gradient(circle at 50% 40%, ${e.join(", ")})` : `linear-gradient(${t.gradient?.angle ?? 135}deg, ${e.join(", ")})` : t.color ?? i.card?.background;
}
function ar(i) {
  return i.replace(/[\\"]/g, (t) => `\\${t}`).replace(/[\n\r]/g, "");
}
function nr(i, t) {
  const e = i.background ?? {}, o = {};
  t && (o["--etc-bg-a"] = t.main, o["--etc-bg-b"] = t.second, o["--etc-bg-op"] = String(t.opacity), o["--bg-rate"] = String(t.rate)), (e.quality ?? E.quality) === "light" && (o["--bg-blur-k"] = "0.6"), t && e.angle && (o["--bg-angle"] = `${e.angle}deg`), t && e.variation && (o["--bg-var"] = String(e.variation)), e.scrim && (o["--bg-scrim"] = String(Math.abs(e.scrim) / 100), o["--bg-scrim-c"] = e.scrim > 0 ? "#000" : "#fff"), e.vignette && (o["--bg-vig"] = String(e.vignette / 100)), e.grain && (o["--bg-grain"] = String(e.grain / 100));
  const r = i.frost_blur ?? e.frost_blur;
  return Ke(i) && r !== void 0 && (o["--frost"] = `${r}px`), e.fill === "image" && e.image?.url && (o["--bg-img"] = `url("${ar(e.image.url)}")`, e.image.blur && (o["--bg-img-blur"] = `${e.image.blur}px`), e.image.darken && (o["--bg-img-dark"] = String(e.image.darken / 100))), o;
}
function Xe(i, t) {
  const e = t === "light", r = {
    plasma: [5, 4, 45, 75, 18, 30],
    lava: [6, 4, 18, 34, 16, 26],
    shimmer: [7, 4, 40, 70, 9, 15],
    particles: [22, 10, 3, 9, 10, 20],
    aurora: [3, 2, 30, 42, 14, 22]
  }[i];
  if (!r) return [];
  const [a, n, s, c, d, h] = r, u = e ? n : a;
  let f = i.length * 9973 + 17;
  const g = () => (f = (f * 1664525 + 1013904223) % 4294967296, f / 4294967296);
  return Array.from({ length: u }, (b, w) => {
    const $ = Math.round(d + g() * (h - d));
    return {
      x: Math.round(8 + g() * 84),
      y: i === "aurora" ? [12, 38, 62][w % 3] : Math.round(10 + g() * 80),
      s: Math.round(s + g() * (c - s)),
      d: $,
      // Spread evenly through the cycle, with a little jitter.
      dl: -Math.round((w + g() * 0.5) / u * $ * 10) / 10
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
function yt(i, t) {
  const e = { ...Ze };
  for (const o of [i, t])
    if (o)
      for (const r of Po) {
        const a = o[r];
        a !== void 0 && a !== "" && a !== null && (e[r] = a);
      }
  return e;
}
const nt = (i) => i ? `${i}px` : void 0;
function Nt(i) {
  const t = {
    "--etc-b-radius": i.radius !== void 0 ? `${i.radius}px` : void 0,
    "--etc-b-height": nt(i.height),
    "--etc-b-minw": nt(i.min_width),
    "--etc-b-gap": i.gap !== void 0 ? `${i.gap}px` : void 0,
    "--etc-b-icon": nt(i.icon_size),
    "--etc-b-fs": nt(i.font_size),
    "--etc-b-fw": i.font_weight ? String(i.font_weight) : void 0,
    "--etc-b-igap": i.icon_gap !== void 0 ? `${i.icon_gap}px` : void 0,
    "--etc-b-scale": i.scale !== void 0 && i.scale !== 100 ? String(i.scale / 100) : void 0,
    "--etc-b-bw": i.border_width !== void 0 ? `${i.border_width}px` : void 0,
    "--etc-b-bg": i.background,
    "--etc-b-fg": i.color,
    "--etc-b-bc": i.border_color,
    // Border: None also switches off Frosted Glass's thin rim.
    "--etc-b-ring": i.border_color === "transparent" ? "0px" : void 0,
    "--etc-b-aring": (i.active_border_color ?? i.border_color) === "transparent" ? "0px" : void 0,
    "--etc-b-abg": i.active_background,
    "--etc-b-afg": i.active_color,
    "--etc-b-abc": i.active_border_color
  };
  return oe(t);
}
const sr = {
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
function cr(i) {
  const t = {};
  for (const e of Ue) {
    const o = i?.[e];
    if (!o) continue;
    const r = `--etc-t-${sr[e]}`;
    t[`${r}-fs`] = nt(o.size), t[`${r}-fw`] = o.weight ? String(o.weight) : void 0, t[`${r}-c`] = o.color, t[`${r}-tt`] = o.transform, t[`${r}-ls`] = o.letter_spacing !== void 0 ? `${o.letter_spacing / 100}em` : void 0, t[`${r}-fst`] = o.italic === void 0 ? void 0 : o.italic ? "italic" : "normal", t[`${r}-op`] = o.opacity !== void 0 ? String(o.opacity / 100) : void 0;
  }
  return oe(t);
}
function lr(i) {
  const t = i.card ?? {}, e = i.setpoint ?? {};
  return oe({
    "--etc-card-bg": ir(i),
    "--etc-card-bc": t.border_color,
    "--etc-card-bw": t.border_width !== void 0 ? `${t.border_width}px` : void 0,
    "--etc-card-r": t.radius !== void 0 ? `${t.radius}px` : void 0,
    "--etc-card-pad": t.padding !== void 0 ? `${t.padding}px` : void 0,
    "--etc-scale": e.scale !== void 0 ? String(e.scale / 100) : void 0
  });
}
function oe(i) {
  const t = {};
  for (const [e, o] of Object.entries(i)) o !== void 0 && o !== "" && (t[e] = o);
  return t;
}
const dr = `
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
`, hr = "esphome_rf_fan", pr = "custom:rf-fan-ltek";
function Je(i, t) {
  const e = i.entities, o = e?.[t]?.device_id;
  return !e || !o ? [] : Object.values(e).filter((r) => r.device_id === o && r.entity_id !== t).map((r) => r.entity_id);
}
function ur(i, t) {
  const e = Je(i, t).filter((r) => r.startsWith("light.")), o = i.entities ?? {};
  return e.find((r) => o[r]?.platform === hr) ?? e[0] ?? null;
}
function fr(i, t) {
  const e = i.entities ?? {}, o = Je(i, t).filter((r) => r.startsWith("sensor."));
  return o.find((r) => e[r]?.translation_key === "sleep_timer") ?? o.find((r) => i.states[r]?.attributes.device_class === "timestamp") ?? null;
}
function gr(i, t) {
  const e = i?.attributes.friendly_name;
  return typeof e == "string" ? e : t;
}
function mr(i, t) {
  const e = i.split(".")[0], r = {
    fan: ["mdi:fan", "mdi:fan-off"],
    light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
    switch: ["mdi:toggle-switch", "mdi:toggle-switch-off-outline"],
    binary_sensor: ["mdi:checkbox-marked-circle", "mdi:checkbox-blank-circle-outline"],
    sensor: ["mdi:eye", "mdi:eye"]
  }[e ?? ""] ?? ["mdi:circle", "mdi:circle-outline"];
  return t ? r[0] : r[1];
}
function st(i, t, e) {
  const o = i.states[t.entity], r = !!o && !Et.has(o.state), a = r && !["off", "idle", "closed", "standby"].includes(o.state), n = {
    index: e,
    type: t.type,
    entity: t.entity,
    name: t.name ?? gr(o, t.entity),
    icon: t.icon ?? (typeof o?.attributes.icon == "string" ? o.attributes.icon : mr(t.entity, a)),
    on: a,
    available: r,
    state: r ? _r(i, o) : "Unavailable",
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
  if (t.type !== "rf_fan" || !o) return n;
  const s = o.attributes, c = C(s.percentage), d = br(s), h = a && c !== null && d ? Math.max(1, Math.min(d, Math.round(c * d / 100))) : null, u = ur(i, t.entity), f = fr(i, t.entity), g = f ? i.states[f]?.state : void 0, b = g && !Et.has(g) ? new Date(g) : null, w = typeof s.preset_mode == "string" ? s.preset_mode : "", $ = a && !!w && w !== "normal", x = $ ? Ce(w) : null, m = Array.isArray(s.preset_modes) ? s.preset_modes.filter((y) => Ce(String(y)) !== null).length : 0, _ = t.speed_format ?? "number", k = h === null ? "On" : _ === "fraction" && d ? `${h}/${d}` : _ === "percent" && c !== null ? `${Math.round(c)}%` : String(h);
  return {
    ...n,
    icon: t.icon ?? "mdi:ceiling-fan",
    // In Breeze/natural mode the level is what matters, not the underlying speed.
    state: r ? a ? x !== null ? String(x) : k : "Off" : "Unavailable",
    speed: h,
    speedCount: d,
    naturalLevel: x,
    naturalLevels: m,
    percentage: c,
    direction: s.direction === "reverse" ? "reverse" : s.direction === "forward" ? "forward" : null,
    natural: $,
    lightEntity: u,
    lightOn: !!u && i.states[u]?.state === "on",
    timerEnds: b && !Number.isNaN(b.getTime()) && b.getTime() > Date.now() ? b : null,
    spin: a ? vr(c) : null
  };
}
function br(i) {
  const t = C(i.speed_count);
  if (t && t > 0) return Math.round(t);
  const e = C(i.percentage_step);
  return e && e > 0 && e < 100 ? Math.round(100 / e) : null;
}
function Ce(i) {
  const t = /^natural[ _]?(\d+)$/i.exec(i.trim());
  return t ? Number(t[1]) : null;
}
function vr(i) {
  const t = Math.min(100, Math.max(1, i ?? 50));
  return Math.round((3 - t / 100 * 2.4) * 100) / 100;
}
function Te(i, t = Date.now()) {
  const e = Math.max(0, Math.round((i.getTime() - t) / 6e4)), o = Math.floor(e / 60);
  return o ? `${o}h${String(e % 60).padStart(2, "0")}` : `${e}m`;
}
function _r(i, t) {
  const e = i;
  try {
    if (e.formatEntityState) return e.formatEntityState(t);
  } catch {
  }
  const o = t.attributes.unit_of_measurement;
  return o ? `${t.state} ${o}` : t.state.charAt(0).toUpperCase() + t.state.slice(1);
}
function wr(i) {
  return i.popup_card ? i.popup_card : i.type === "rf_fan" ? { type: pr, fan_entity: i.entity } : null;
}
function yr(i, t) {
  if (t === "toggle_light")
    return i.lightEntity ? { domain: "light", service: "toggle", data: { entity_id: i.lightEntity } } : null;
  const e = i.entity.split(".")[0];
  return ["fan", "light", "switch", "input_boolean", "climate", "humidifier", "media_player", "cover"].includes(e) ? { domain: "homeassistant", service: "toggle", data: { entity_id: i.entity } } : null;
}
const Qe = ["card", "setpoint", "pill", "mode_button", "mode_icon"], $r = {
  card: "Entire card",
  setpoint: "Setpoint value (wheel, stepper or bar handle)",
  pill: "Setpoint pill",
  mode_button: "Mode button",
  mode_icon: "Mode icon"
}, $t = { when: "running", size: 18, speed: 2.4 };
function to(i, t) {
  const e = i.effects?.[t];
  return e || (t === "card" && (i.card?.glow ?? !0) ? "glow" : "none");
}
function xr(i, t) {
  if (!t.available) return null;
  if (t.equipment === "heating") return "heat";
  if (t.equipment === "cooling") return "cool";
  if ((i.effects?.when ?? $t.when) === "mode") {
    if (t.mode === "heat") return "heat";
    if (t.mode === "cool") return "cool";
  }
  return null;
}
function kr(i, t) {
  const e = xr(i, t), o = {};
  if (!e) return o;
  o["fx-on"] = !0, o[`fx-${e}`] = !0;
  for (const r of Qe) {
    const a = to(i, r);
    (a === "glow" || a === "both") && (o[`fx-${r}-glow`] = !0), (a === "pulse" || a === "both") && (o[`fx-${r}-pulse`] = !0);
  }
  return o;
}
function Sr(i) {
  const t = i.effects ?? {}, e = {};
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
], R = (i = {}) => ({ type: "hvac", ...i }), N = (i = {}) => ({ type: "preset", ...i }), H = (i = {}) => ({ type: "fan_mode", ...i }), Vt = [
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
      sets: [R(), N({ display: "toggle" }), H({ display: "toggle" })]
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
      sets: [R({ zone: "top", align: "center" }), N({ display: "toggle" }), H({ display: "toggle" })]
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
        R({ display: "menu", menu_show_name: !1 }),
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
      sets: [R({ zone: "left" }), N({ display: "menu", zone: "bottom" }), H({ display: "menu", zone: "bottom" })]
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
      sets: [R(), N({ columns: 4 }), H({ display: "toggle" })]
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
      sets: [R(), N({ display: "menu" }), H({ display: "menu" })]
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
      sets: [R(), N(), H()]
    }
  }
];
Vt.push(
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
      sets: [R({ display: "menu" }), N({ display: "menu" }), H({ display: "menu" })]
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
      sets: [R(), N({ display: "toggle" }), H({ display: "toggle" })]
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
      sets: [R({ align: "center" }), N({ display: "menu" })]
    }
  }
);
function Ar(i) {
  return eo.some((t) => i[t] !== void 0);
}
const Cr = ["order", "options", "name", "toggle_icon"];
function Tr(i, t) {
  const e = i ?? [], o = /* @__PURE__ */ new Set(), r = t.map((n) => {
    const s = e.findIndex((d, h) => !o.has(h) && d.type === n.type);
    if (s < 0) return structuredClone(n);
    o.add(s);
    const c = {};
    for (const d of Cr) e[s][d] !== void 0 && (c[d] = structuredClone(e[s][d]));
    return { ...structuredClone(n), ...c };
  }), a = e.filter((n, s) => n.type === "chips" && !o.has(s));
  return [...structuredClone(a), ...r];
}
function zr(i, t) {
  const e = { ...i };
  for (const n of eo) delete e[n];
  const o = structuredClone(t.values), r = i.setpoint ?? {};
  if (r.min_gap !== void 0 || r.bar?.range_min !== void 0 || r.bar?.range_max !== void 0) {
    const n = { ...o.setpoint ?? {} };
    r.min_gap !== void 0 && (n.min_gap = r.min_gap), (r.bar?.range_min !== void 0 || r.bar?.range_max !== void 0) && (n.bar = { ...n.bar ?? {} }, r.bar?.range_min !== void 0 && (n.bar.range_min = r.bar.range_min), r.bar?.range_max !== void 0 && (n.bar.range_max = r.bar.range_max)), o.setpoint = n;
  }
  const a = i.background;
  return a?.fill === "image" && a.image?.url && !o.background?.fill && (o.background = { ...o.background ?? {}, fill: "image", image: structuredClone(a.image) }), o.sets ? o.sets = Tr(i.sets, o.sets) : i.sets && (o.sets = i.sets), { ...e, ...o };
}
const ze = ["heating", "cooling", "idle", "fan", "off"], Er = 6e3, Mr = {
  heating: "Heating",
  cooling: "Cooling",
  idle: "Idle",
  fan: "Fan",
  off: "Off"
};
function Ee(i, t) {
  if (!i.available) return i;
  const e = i.setpoints, o = i.unit.includes("C") ? 2 : 4, r = e?.heat ?? e?.cool ?? i.currentTemp ?? 70, a = e?.cool ?? e?.heat ?? i.currentTemp ?? 74;
  switch (t) {
    case "heating":
      return { ...i, equipment: "heating", mode: i.mode === "heat_cool" ? "heat_cool" : "heat", currentTemp: r - o, setpoints: e ?? { heat: r, cool: null } };
    case "cooling":
      return { ...i, equipment: "cooling", mode: i.mode === "heat_cool" ? "heat_cool" : "cool", currentTemp: a + o, setpoints: e ?? { heat: null, cool: a } };
    case "idle": {
      const n = i.mode === "heat" || i.mode === "cool" || i.mode === "heat_cool" ? i.mode : "heat";
      return { ...i, equipment: "idle", mode: n, currentTemp: n === "cool" ? a : r, setpoints: e ?? { heat: r, cool: null } };
    }
    case "fan":
      return { ...i, equipment: "fan", mode: "fan_only" };
    case "off":
      return { ...i, equipment: "off", mode: "off", setpoints: null };
  }
}
const Wt = "etc-test-mode";
function oo() {
  const i = window;
  return i.__etcTest ??= {};
}
function xt(i) {
  return i && oo()[i] || null;
}
function mt(i, t) {
  if (!i) return;
  const e = oo();
  t ? e[i] = t : delete e[i], window.dispatchEvent(new CustomEvent(Wt, { detail: { entity: i } }));
}
function Rr(i, t) {
  return i ? i === "cycle" ? ze[t % ze.length] : i : null;
}
var Or = Object.defineProperty, ut = (i, t, e, o) => {
  for (var r = void 0, a = i.length - 1, n; a >= 0; a--)
    (n = i[a]) && (r = n(t, e, r) || r);
  return r && Or(t, e, r), r;
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
function Pr(i) {
  const t = i == null ? "" : String(i);
  return t === "" ? "default" : t === "transparent" ? "transparent" : /^#[0-9a-fA-F]{3,8}$/.test(t) ? "custom" : /^var\(/.test(t) && kt.some(([e]) => e === t) ? "theme" : "css";
}
const Lr = {
  name: "Name",
  status: "Status (Heating / Cooling)",
  current: "Current temperature",
  unit: "Unit (°)",
  humidity: "Humidity",
  pill: "Setpoint pills",
  wheel_value: "Wheel / stepper value",
  wheel_neighbor: "Wheel next values",
  bar: "Bar labels"
}, Br = {
  hvac: "mdi:thermostat",
  preset: "mdi:home-thermometer-outline",
  fan_mode: "mdi:fan",
  custom: "mdi:gesture-tap-button",
  chips: "mdi:devices"
}, Me = { hvac: "Mode", preset: "Preset", fan_mode: "Fan" }, Re = { mode: "mdi:thermostat", device: "mdi:shape-outline" }, Nr = /* @__PURE__ */ new Set(["a", "an", "the", "and", "or", "nor", "of", "to", "in", "on", "at", "by", "for", "with", "from", "as", "per", "via", "vs"]);
function M(i) {
  let t = !0;
  return i.split(/(\s+)/).map((e) => {
    if (/^\s+$/.test(e) || e === "") return e;
    const o = /^([^A-Za-z]*)([A-Za-z].*)$/.exec(e);
    let r = e;
    if (o) {
      const [, a, n] = o, s = n.toLowerCase(), c = !t && !a.includes("(") && Nr.has(s.replace(/[^a-z]/g, ""));
      r = /[A-Z]/.test(n.slice(1)) || c ? e : a + n.charAt(0).toUpperCase() + n.slice(1);
    }
    return t = /[(:·—/]$/.test(e) || /^[(:·—/]+$/.test(e), r;
  }).join("");
}
const ie = class ie extends ot {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(["thermostat"]), this._set = null, this._chip = null, this._cmode = {}, this._panels = /* @__PURE__ */ new Set();
  }
  setConfig(t) {
    const e = this._config?.entity;
    if (this._config = Ut(t), e && e !== this._config.entity) {
      const o = xt(e);
      o && (mt(e, null), mt(this._config.entity, o));
    }
  }
  // ---- writes ---------------------------------------------------------------
  _emit(t) {
    this._config = Ut(t), this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config }, bubbles: !0, composed: !0 }));
  }
  /** Set a path; `undefined`/'' or the built-in default removes the key. */
  _put(t, e, o) {
    if (!this._config) return;
    const r = e === o ? void 0 : e;
    this._emit(z(this._config, t, r));
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
  _patchSet(t, e, o, r) {
    const a = this._sets(), n = z(a[t] ?? {}, e, o === r ? void 0 : o);
    a[t] = { ...n, type: a[t].type }, this._writeSets(a);
  }
  // ---- primitives -------------------------------------------------------------
  _toggleOpen(t, e, o = !1) {
    const r = e.currentTarget.open;
    if (r === this._open.has(t)) return;
    const a = new Set(this._open);
    if (r) {
      if (o)
        for (const n of this._panels) n !== t && a.delete(n);
      a.add(t);
    } else a.delete(t);
    this._open = a;
  }
  /** Closing the editor always ends test mode. */
  disconnectedCallback() {
    super.disconnectedCallback(), xt(this._config?.entity) && mt(this._config?.entity, null);
  }
  _panel(t, e, o, r) {
    return this._panels.add(t), l`<details class="etce-sec" ?open=${this._open.has(t)} @toggle=${(a) => this._toggleOpen(t, a, !0)}>
      <summary><ha-icon icon=${e}></ha-icon>${M(o)}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${r}</div>
    </details>`;
  }
  _sub(t, e, o) {
    return l`<details class="etce-sub" ?open=${this._open.has(t)} @toggle=${(r) => this._toggleOpen(t, r)}>
      <summary>${M(e)}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${o()}</div>
    </details>`;
  }
  /** A list row that is itself a sub-panel: the row is the summary (icon,
   *  name, tag, action buttons, chevron) and its settings open right under it,
   *  exactly like every other section. Action buttons don't toggle it. */
  _rowSub(t, e, o, r, a) {
    return l`<details
      class="etce-sub etce-rowsub ${o.cls ?? ""} ${o.off ? "off" : ""}"
      ?open=${t}
      @toggle=${(n) => {
      n.stopPropagation();
      const s = n.currentTarget.open;
      s !== t && e(s);
    }}
    >
      <summary>
        <ha-icon class="etce-sicon" icon=${o.icon}></ha-icon>
        <span class="etce-sname">${o.name}</span>
        ${o.tag ? l`<span class="etce-stag">${M(o.tag)}</span>` : p}
        <span
          class="etce-sctl"
          @click=${(n) => {
      n.target.closest("button") && n.preventDefault();
    }}
          >${r}</span
        >
        <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
      </summary>
      <div class="etce-sub-body">${t ? a() : p}</div>
    </details>`;
  }
  _group(t, e = !1) {
    return l`<div class="etce-group ${e ? "first" : ""}">${M(t)}</div>`;
  }
  _hint(t) {
    return l`<p class="etce-hint">${t}</p>`;
  }
  _check(t, e, o) {
    return l`<label class="etce-check"
      ><input type="checkbox" .checked=${e} @change=${(r) => o(r.target.checked)} />${M(t)}</label
    >`;
  }
  _bool(t, e, o) {
    const r = this._get(t) ?? o;
    return this._check(e, r, (a) => this._put(t, a, o));
  }
  _selectRow(t, e, o, r, a = !1) {
    return l`<div class="etce-row">
      <label class="lbl">${M(t)}</label>
      <select @change=${(n) => r(n.target.value)}>
        ${o.map(([n, s], c) => l`<option value=${n} ?selected=${n === e}>${a && c > 0 ? s : M(s)}</option>`)}
      </select>
    </div>`;
  }
  _select(t, e, o, r) {
    const a = String(this._get(t) ?? r);
    return this._selectRow(e, a, o, (n) => this._put(t, n, r));
  }
  _sliderRow(t, e, o, r, a, n, s, c = (d) => `${d}px`) {
    return l`<div class="etce-row etce-nowrap">
      <label class="lbl">${M(t)}</label>
      <input
        type="range"
        min=${o}
        max=${r}
        step=${a}
        .value=${String(e)}
        @input=${(d) => {
      const h = d.target;
      h.nextElementSibling.textContent = c(Number(h.value));
    }}
        @change=${(d) => s(Number(d.target.value))}
      />
      <span class="etce-val">${c(e)}</span>
      ${n ? l`<button class="etce-reset" title="Back to default" @click=${() => s(void 0)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>` : p}
    </div>`;
  }
  _slider(t, e, o, r, a, n, s) {
    const c = this._get(t);
    return this._sliderRow(e, c ?? n, o, r, a, c !== void 0, (d) => this._put(t, d, n), s);
  }
  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  _colorRow(t, e, o, r, a, n, s = {}) {
    const c = s.transparentValue ?? "transparent";
    let d = this._cmode[t] || (s.transparent && o === c ? "transparent" : Pr(o));
    d === "transparent" && !s.transparent && (d = "css");
    let h = p;
    if (d === "theme")
      h = l`<select @change=${(f) => n(f.target.value)}>
        ${kt.map(([f, g]) => l`<option value=${f} ?selected=${f === o}>${g}</option>`)}
      </select>`;
    else if (d === "custom") {
      const f = o && /^#[0-9a-fA-F]{6}$/.test(o) ? o : a;
      h = l`<input type="color" .value=${f} @change=${(g) => n(g.target.value)} />`;
    } else d === "css" && (h = l`<input
        type="text"
        .value=${o ?? ""}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(f) => n(f.target.value || void 0)}
      />`);
    const u = (f) => {
      this._cmode = { ...this._cmode, [t]: f }, f === "default" ? n(void 0) : f === "transparent" ? n(c) : f === "theme" ? n(kt.some(([g]) => g === o) ? o : kt[0][0]) : f === "custom" ? n(o && /^#[0-9a-fA-F]{6}$/.test(o) ? o : a) : this.requestUpdate();
    };
    return l`<div class="etce-row">
      <label class="lbl">${M(e)}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(f) => u(f.target.value)}>
          ${[
      ["default", r],
      ...s.transparent ? [["transparent", s.transparentLabel ?? "Transparent"]] : [],
      ["theme", "Theme color"],
      ["custom", "Custom color"],
      ["css", "Custom CSS"]
    ].map(
      ([f, g]) => l`<option value=${f} ?selected=${f === d}>${M(g)}</option>`
    )}
        </select>
        ${h}
      </div>
    </div>`;
  }
  _color(t, e, o, r, a = {}) {
    return this._colorRow(t, e, this._get(t), o, r, (n) => this._put(t, n), a);
  }
  _selector(t, e, o, r) {
    return l`<div class="etce-row">
      ${t ? l`<label class="lbl">${M(t)}</label>` : p}
      <ha-selector
        .hass=${this.hass}
        .selector=${e}
        .value=${o}
        @value-changed=${(a) => r(a.detail.value)}
      ></ha-selector>
    </div>`;
  }
  // ---- render -----------------------------------------------------------------
  render() {
    return this._config ? l`<div class="etce">
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
      <div class="etce-foot">Easy Thermostat Styler Card v${De}</div>
    </div>` : p;
  }
  _testBar() {
    const t = xt(this._config.entity) ?? "";
    return l`<div class="etce-test ${t ? "on" : ""}">
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
        mt(this._config.entity, e || null), this.requestUpdate();
      }
    )}
      <p class="etce-hint">
        ${t ? "The card acts as if it were in that state so you can see the effects and moving background. It is not saved with the card and switches off when you close the editor." : "Preview the heating, cooling, idle, fan and off looks (effects and moving background) without waiting for the real thing."}
      </p>
    </div>`;
  }
  _thermostatBody() {
    const t = this._config;
    return l`
      ${this._hint("The climate entity this card controls, and what the center of the card shows.")}
      ${this._selector("Entity", { entity: { domain: "climate" } }, t.entity, (e) => this._put("entity", e || void 0))}
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder="Entity name" @change=${(e) => this._put("name", e.target.value || void 0)} />
      </div>
      ${this._sub("th-show", "Show", () => l`
        <div class="etce-checks">
          ${this._bool("show_name", "Name", v.show_name)} ${this._bool("show_status", "Status", v.show_status)}
          ${this._bool("show_humidity", "Humidity", v.show_humidity)}
          ${this._bool("show_current", "Current temperature", v.show_current)}
          ${this._bool("show_pills", "Setpoint pills", v.show_pills)}
        </div>`)}
      ${this._sub("th-layout", "Layout", () => l`
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
      const o = Vt.find((r) => r.id === e);
      Ar(this._config) && !window.confirm(
        `Apply the “${o.name}” template?

It replaces this card’s layout, setpoint control and styling. Your device chips, button order/names/icons and temperature range are kept.`
      ) || this._emit(zr(this._config, o));
    };
    return l`
      ${this._hint("One-click starting points, each with its own setpoint control, button style and layout. Fine-tune anything afterwards; nothing stays linked to the template.")}
      <div class="etce-blist">
        ${Vt.map(
      (e) => l`<div class="etce-brow etce-tpl">
            <ha-icon class="etce-sicon" icon=${e.icon}></ha-icon>
            <div class="etce-tpl-text">
              <span class="etce-sname">${e.name}</span>
              <span class="etce-tpl-hint">${e.hint}</span>
              <span class="etce-tpl-tags">${e.tags.map((o) => l`<span>${o}</span>`)}</span>
            </div>
            <button class="etce-preset" @click=${() => t(e.id)}>Apply</button>
          </div>`
    )}
      </div>
    `;
  }
  _setpointBody() {
    const t = this._get("setpoint.control") ?? v.control, e = t === "wheel" ? "Wheel" : t === "stepper" ? "Stepper" : "Bar";
    return l`
      ${this._hint("How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.")}
      ${this._select(
      "setpoint.control",
      "Control",
      [["wheel", "Wheel"], ["stepper", "− / + stepper"], ["bar", "Setpoint bar"], ["none", "None (display only)"]],
      v.control
    )}
      ${t === "wheel" || t === "stepper" ? this._sub("sp-ctl", e, () => l`
            ${this._group("Placement & size", !0)}
            ${this._select("setpoint.position", "Position", [["left", "Left"], ["right", "Right"], ["center", "Center (below)"]], v.position)}
            ${this._slider("setpoint.scale", "Size", 40, 250, 5, v.scale, (o) => `${o}%`)}
            ${this._hint("Size scales the controls only; the current temperature has its own size under Text.")}
            ${this._group("Buttons")}
            ${this._nudgeSelect(t)}
            ${t === "wheel" ? l`${this._group("Wheel")}
                ${this._slider("setpoint.neighbors", "Next values shown", 0, 3, 1, v.neighbors, (o) => String(o))}
                ${this._select("setpoint.wheel_style", "Center value", [["bubble", "Bubble"], ["pill", "Pill (like the setpoint pills)"]], v.wheel_style)}` : p}`) : p}
      ${t === "bar" ? this._barBody() : p}
      ${t !== "none" ? this._sub("sp-reveal", "Show controls", () => this._revealBody()) : p}
      ${this._sub("sp-hc", "Heat / Cool", () => l`
        ${this._slider("setpoint.min_gap", "Minimum gap", 0, 10, 0.5, this._defaultGap(), (o) => `${o}°`)}
        ${this._hint("In Heat / Cool the two setpoints stay at least this far apart; dragging one pushes the other.")}`)}
    `;
  }
  _nudgeSelect(t) {
    const e = t === "stepper" ? "around" : "right", o = this._get("setpoint.nudge"), r = o === "beside" ? "right" : o ?? e, a = [
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
    const t = (this._get("setpoint.reveal") ?? v.reveal) === "tap", e = this._get("setpoint.hide_after") ?? v.hide_after;
    return l`
      ${this._select("setpoint.reveal", "Controls", [["always", "Always shown"], ["tap", "Shown when tapped"]], v.reveal)}
      ${this._hint(
      t ? "The controls stay folded away until you tap. They fold away again after the time below without use." : "Choose “Shown when tapped” to keep the card calm: just the temperature and setpoint until you want to change it."
    )}
      ${t ? l`
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
          ` : p}
    `;
  }
  /** A bar-side choice: above / below for a horizontal bar, left / right for a vertical one. */
  _sidePlacement(t, e, o, r) {
    const a = String(this._get("setpoint.bar.position") ?? v.bar.position), n = a === "left" || a === "right", s = n ? [["left", "Left of the bar"], ["right", "Right of the bar"]] : [["above", "Above the bar"], ["below", "Below the bar"]], c = n ? r : o, d = String(this._get(`setpoint.bar.${t}`) ?? c);
    return this._selectRow(e, s.some(([h]) => h === d) ? d : c, s, (h) => this._put(`setpoint.bar.${t}`, h, c));
  }
  _defaultGap() {
    return (this.hass?.config?.unit_system?.temperature ?? "").includes("C") ? 1.5 : 3;
  }
  _barBody() {
    return l`${this._sub("sp-bar", "Bar", () => this._barLook())}
      ${this._sub("sp-flags", "Value flags", () => this._barFlags())}
      ${this._sub("sp-markers", "Ticks, markers & range", () => this._barMarkers())}`;
  }
  _barFlags() {
    const t = v.bar;
    return l`
      ${this._bool("setpoint.bar.flags", "Show value flags on the handles", t.flags)}
      ${this._get("setpoint.bar.flags") ?? t.flags ? l`${this._sidePlacement("flag_position", "Flag placement", "above", "left")}
          ${this._color("setpoint.bar.flag_color", "Flag color", "Heat / cool color", "#ff8100", { transparent: !0 })}
          ${this._color("setpoint.bar.flag_text_color", "Flag text color", "White", "#ffffff")}` : p}
    `;
  }
  _barMarkers() {
    const t = v.bar;
    return l`
      ${this._group("Ticks & markers", !0)}
      ${this._bool("setpoint.bar.show_current", "Current temperature marker", t.show_current)}
      ${this._slider("setpoint.bar.ticks", "Tick every", 0, 10, 0.5, t.ticks, (e) => e ? `${e}°` : "Off")}
      ${this._slider("setpoint.bar.labels", "Label every", 0, 20, 1, t.labels, (e) => e ? `${e}°` : "Off")}
      ${(this._get("setpoint.bar.ticks") ?? t.ticks) || (this._get("setpoint.bar.labels") ?? t.labels) ? this._sidePlacement("tick_position", "Ticks & labels", "below", "right") : p}
      ${this._group("Range")}
      ${this._hint("Leave empty to use the thermostat’s own limits.")}
      ${["range_min", "range_max"].map(
      (e) => l`<div class="etce-row">
          <label class="lbl">${e === "range_min" ? "From" : "To"}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${e}`) ?? "")}
            @change=${(o) => {
        const r = o.target.value;
        this._put(`setpoint.bar.${e}`, r === "" ? void 0 : Number(r));
      }}
          />
        </div>`
    )}
    `;
  }
  _barLook() {
    const t = v.bar, e = this._get("setpoint.bar.look") ?? t.look, o = this._get("setpoint.bar.stops") ?? ["#2b9af9", "#7ccf8a", "#ff8100"];
    return l`
      ${this._group("Placement", !0)}
      ${this._select(
      "setpoint.bar.position",
      "Position",
      [["below", "Below (horizontal)"], ["above", "Above (horizontal)"], ["left", "Left (vertical)"], ["right", "Right (vertical)"]],
      t.position
    )}
      ${["left", "right"].includes(String(this._get("setpoint.bar.position") ?? "")) ? this._slider("setpoint.bar.length", "Height", 100, 400, 10, 200) : p}
      ${this._slider("setpoint.bar.height", "Thickness", 6, 40, 1, t.height)}
      ${this._group("Colors")}
      ${this._select("setpoint.bar.look", "Look", [["zones", "Heat / comfort / cool zones"], ["gradient", "Gradient"]], t.look)}
      ${e === "gradient" ? l`<div class="etce-row">
            <label class="lbl">Gradient (Cold → Hot)</label>
            <div class="etce-stops">
              ${o.map(
      (r, a) => l`<input
                  type="color"
                  .value=${r}
                  @change=${(n) => {
        const s = [...o];
        s[a] = n.target.value, this._put("setpoint.bar.stops", s);
      }}
                />`
    )}
            </div>
          </div>` : l`${this._color("setpoint.bar.heat_color", "Heat zone", "Theme heat", "#ff8100", { transparent: !0 })}
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
    const t = this._sets(), e = this.hass?.states[this._config.entity], o = (r) => {
      const a = t.filter((s) => s.type === "custom" || s.type === "chips").length + 1, n = [...t, r === "custom" ? { type: r, name: `Buttons ${a}` } : { type: r }];
      this._set = n.length - 1, this._writeSets(n);
    };
    return l`
      ${this._hint("Groups of buttons. Each set picks its side of the card, its layout, and how it shows: full time, behind a toggle button, or as an expandable menu.")}
      <div class="etce-addbar">
        ${["hvac", "preset", "fan_mode", "custom"].map(
      (r) => l`<button class="etce-add" @click=${() => o(r)}>+ ${j[r]}</button>`
    )}
      </div>
      <div class="etce-rows">
        ${t.map((r, a) => {
      const n = (r.items?.length ?? 0) + (r.chips?.length ?? 0), s = X(r.type) ? I(e, r.type).length > 0 || n > 0 : !0, c = X(r.type) && t.filter((h) => h.type === r.type).length === 1, d = this._set === a;
      return this._rowSub(
        d,
        (h) => this._set = h ? a : null,
        {
          icon: Br[r.type],
          name: r.name ?? j[r.type],
          tag: s ? `${r.zone ?? this._defaultZone()} · ${this._displayTag(r)}` : "not on this entity",
          off: r.hidden,
          cls: "set-row"
        },
        l`<button class="etce-act" title="Move up" ?disabled=${a === 0} @click=${() => this._moveSet(a, -1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button class="etce-act" title="Move down" ?disabled=${a === t.length - 1} @click=${() => this._moveSet(a, 1)}>
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="etce-act" title="Duplicate" @click=${() => this._duplicateSet(a)}>
                <ha-icon icon="mdi:content-copy"></ha-icon>
              </button>
              <button class="etce-act etce-eye ${r.hidden ? "off" : ""}" title=${r.hidden ? "Show" : "Hide"} @click=${() => this._patchSet(a, "hidden", !r.hidden, !1)}>
                <ha-icon icon=${r.hidden ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
              </button>
              <button class="etce-act del" title=${c ? "Built-in set: hide it instead" : "Delete"} ?disabled=${c} @click=${() => this._deleteSet(a)}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon>
              </button>`,
        () => this._setEditor(r, a)
      );
    })}
      </div>
      ${this._sub("sets-layout", "Layout & spacing", () => l`
        ${this._group("Location", !0)}
        ${this._select("toggles_zone", "Default location", [["bottom", "Bottom"], ["top", "Top"], ["left", "Left"], ["right", "Right"]], v.toggles_zone)}
        ${this._hint("Where sets go when they have no Side of their own, and where the toggle buttons sit. A set’s own Side always wins.")}
        ${this._group("Centering")}
        ${this._bool("zones.centered", "Keep the main area centered", !0)}
        ${this._hint("Balances the left and right sides so the temperature and controls stay on the card’s center, whatever sits beside them.")}
        ${this._group("Distance from the main area")}
        ${this._slider("zones.gap", "All sides", 0, 48, 1, 12)}
        ${["top", "bottom", "left", "right"].map((r) => {
      const a = this._get(`zones.${r}`), n = this._get("zones.gap") ?? 12;
      return this._sliderRow(r.charAt(0).toUpperCase() + r.slice(1), a ?? n, 0, 48, 1, a !== void 0, (s) => this._put(`zones.${r}`, s));
    })}
        ${this._hint("Top, Bottom, Left and Right override “All sides” for one side; ↺ puts it back.")}`)}
      ${this._sub("sets-compact", "Compact", () => l`
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
    const o = this._sets(), r = (c, d) => `${c.name ?? j[c.type]} (#${d + 1})`, a = o.map((c, d) => [c, d]).filter(([, c]) => c !== e), n = t.row_with ? o.findIndex((c) => c.id === t.row_with) : -1, s = (c) => {
      const d = o.map((u) => ({ ...u }));
      if (c === "") delete d[e].row_with;
      else {
        const u = Number(c);
        let f = d[u].id;
        if (!f) {
          const g = new Set(d.map((w) => w.id).filter(Boolean));
          let b = 1;
          for (; g.has(`set${b}`); ) b++;
          f = `set${b}`, d[u].id = f;
        }
        d[e].row_with = f;
      }
      const h = new Set(d.map((u) => u.row_with).filter(Boolean));
      for (const u of d) u.id && !h.has(u.id) && delete u.id;
      this._writeSets(d);
    };
    return l`${this._selectRow(
      "Share a row with",
      n >= 0 ? String(n) : "",
      [["", "Own row"], ...a.map(([c, d]) => [String(d), r(c, d)])],
      s,
      !0
    )}
      ${n >= 0 ? this._hint("Sits in that set’s row, on its side of the card; this set’s own Side is ignored.") : p}`;
  }
  _moveSet(t, e) {
    const o = this._sets(), r = t + e;
    r < 0 || r >= o.length || ([o[t], o[r]] = [o[r], o[t]], this._set === t && (this._set = r), this._writeSets(o));
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
    const o = t.zone ?? this._defaultZone(), r = o === "left" || o === "right", a = (n, s, c) => this._patchSet(e, n, s, c);
    return l`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${j[t.type]} @change=${(n) => a("name", n.target.value || void 0)} />
      </div>
      ${this._sub(`set-${e}-buttons`, "Buttons in this set", () => this._buttonsEditor(t, e))}
      ${this._sub(`set-${e}-place`, "Placement", () => l`
      ${this._group("Side & layout", !0)}
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
      ${(t.align ?? "stretch") === "stretch" && t.type !== "chips" ? this._sliderRow("Columns", t.columns ?? 0, 0, 8, 1, t.columns !== void 0, (n) => a("columns", n, 0), (n) => n ? String(n) : "Auto") : p}
      ${this._group("Row")}
      ${this._shareRow(t, e)}`)}
      ${this._sub(`set-${e}-display`, "Display", () => l`
      ${this._selectRow(
      "Show",
      t.display ?? "always",
      [["always", "Full time"], ["toggle", "Behind a toggle button"], ["menu", "Expandable menu"]],
      (n) => a("display", n, "always")
    )}
      ${t.display === "menu" ? l`${this._hint("One button shows the current value; tap it to open the full list.")}
          ${this._selectRow(
      "Opens",
      t.menu_direction ?? jt(o),
      [["down", "Down"], ["up", "Up"], ["right", "Right"], ["left", "Left"]],
      (n) => a("menu_direction", n, jt(o))
    )}
          ${this._check("Show the set name on the button", t.menu_show_name ?? !1, (n) => a("menu_show_name", n, !1))}` : p}
      ${(t.display ?? "always") === "toggle" || this._config.compact && t.display !== "menu" ? this._selector("Toggle icon", { icon: {} }, t.toggle_icon, (n) => a("toggle_icon", n || void 0)) : p}`)}
      ${this._sub(`set-${e}-style`, "Button style for this set", () => l`${this._buttonStyleEditor(`sets.${e}.style`, !0, e)}${this._copyStyle(e)}`)}
    `;
  }
  _optionsEditor(t, e) {
    const o = this.hass?.states[this._config.entity], r = Ve(I(o, t.type), t.order);
    if (!r.length) return this._hint("The thermostat offers nothing for this set right now.");
    const a = (n, s) => {
      const c = [...r], d = n + s;
      d < 0 || d >= c.length || ([c[n], c[d]] = [c[d], c[n]], this._patchSet(e, "order", c));
    };
    return l`${this._hint("Built-in buttons from the thermostat: order, hide, rename and re-icon them. They can’t be deleted.")}
      <div class="etce-rows">
        ${r.map((n, s) => {
      const c = t.options?.[n] ?? {}, d = `${e}:${n}`;
      return this._rowSub(
        this._chip === d,
        (h) => this._chip = h ? d : null,
        { icon: c.icon ?? zt[n.toLowerCase()] ?? "mdi:circle-medium", name: c.name ?? K(n), off: c.hide, cls: "item-row" },
        l`<button class="etce-act" title="Move up" ?disabled=${s === 0} @click=${() => a(s, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button class="etce-act" title="Move down" ?disabled=${s === r.length - 1} @click=${() => a(s, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button class="etce-act etce-eye ${c.hide ? "off" : ""}" title=${c.hide ? "Show" : "Hide"} @click=${() => this._patchSet(e, `options.${n}.hide`, !c.hide, !1)}>
                <ha-icon icon=${c.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
              </button>`,
        () => l`<div class="etce-row">
                <label class="lbl">Label</label>
                <input type="text" .value=${c.name ?? ""} placeholder=${K(n)} @change=${(h) => this._patchSet(e, `options.${n}.name`, h.target.value || void 0)} />
              </div>
              ${this._selector("Icon", { icon: {} }, c.icon, (h) => this._patchSet(e, `options.${n}.icon`, h || void 0))}
              ${this._copyTo(e, { kind: "mode", source: t.type, value: n, name: c.name, icon: c.icon })}`
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
    const r = { ...t[e] };
    delete r.chips, o.length ? r.items = o : delete r.items, r.type === "chips" && (r.type = "custom", r.style?.look || (r.style = { ...r.style ?? {}, look: "chip" }), r.align ??= "center"), t[e] = r;
  }
  _writeItems(t, e) {
    const o = this._sets();
    this._setItems(o, t, e), this._writeSets(o);
  }
  /** "Copy to set": add a copy of this button to another set. */
  _copyTo(t, e) {
    const r = this._sets().map((a, n) => [a, n]).filter(([, a]) => a !== t);
    return r.length ? this._selectRow(
      "Copy to set",
      "",
      [["", "Choose a set…"], ...r.map(([a, n]) => [String(n), `${a.name ?? j[a.type]} (#${n + 1})`])],
      (a) => {
        if (a === "") return;
        const n = this._sets(), s = Number(a), c = structuredClone(e);
        delete c.hide, this._setItems(n, s, [...this._itemsOf(n[s]), c]), this._writeSets(n);
      },
      !0
    ) : l``;
  }
  _buttonsEditor(t, e) {
    const o = this.hass?.states[this._config.entity], r = this._itemsOf(t), a = ["hvac", "preset", "fan_mode"].filter((s) => I(o, s).length), n = (s, c = !1) => {
      let d = null;
      if (s === "mode") {
        const h = X(t.type) && a.includes(t.type) ? t.type : a[0];
        h && (d = { kind: "mode", source: h, value: I(o, h)[0] });
      } else if (s === "device") {
        const u = (c ? this._firstRfFan() : void 0) || Object.keys(this.hass?.states ?? {}).find((f) => f.startsWith(c ? "fan." : "sensor."));
        u && (d = { kind: "device", type: c ? "rf_fan" : "entity", entity: u });
      } else {
        const h = Object.keys(this.hass?.states ?? {}).find((u) => u.startsWith("script."));
        d = h ? { kind: "action", action: "script", entity: h } : { kind: "action", action: "service" };
      }
      d && (this._chip = `item:${e}:${r.length}`, this._writeItems(e, [...r, d]));
    };
    return l`
      ${X(t.type) ? l`${this._group("From the thermostat", !0)}${this._optionsEditor(t, e)}${this._group("Added buttons")}` : p}
      ${this._hint(
      X(t.type) ? "Add any button to this set: another mode, a device or sensor, or an action." : "Add mode buttons, devices and sensors (shown with their value), or actions (script, scene or service)."
    )}
      <div class="etce-addbar">
        ${a.length ? l`<button class="etce-add" @click=${() => n("mode")}>+ Mode button</button>` : p}
        <button class="etce-add" @click=${() => n("device")}>+ Device / sensor</button>
        <button class="etce-add" @click=${() => n("device", !0)}>+ RF fan</button>
        <button class="etce-add" @click=${() => n("action")}>+ Action</button>
      </div>
      <div class="etce-rows">
        ${r.map((s, c) => {
      const d = `item:${e}:${c}`, h = this._chip === d, u = ($, x, m) => {
        const _ = [...r], k = z(_[c], $, x === m ? void 0 : x);
        _[c] = { ...k, kind: s.kind }, s.kind === "device" && (_[c].entity ||= s.entity), this._writeItems(e, _);
      }, f = ($) => {
        const x = [...r], m = c + $;
        m < 0 || m >= x.length || ([x[c], x[m]] = [x[m], x[c]], this._writeItems(e, x));
      }, { name: g, icon: b, tag: w } = this._itemSummary(s);
      return this._rowSub(
        h,
        ($) => this._chip = $ ? d : null,
        { icon: b, name: g, tag: w, off: s.hide, cls: "item-row" },
        l`<button class="etce-act" title="Move up" ?disabled=${c === 0} @click=${() => f(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button class="etce-act" title="Move down" ?disabled=${c === r.length - 1} @click=${() => f(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button class="etce-act" title="Duplicate" @click=${() => {
          const $ = [...r];
          $.splice(c + 1, 0, structuredClone(s)), this._writeItems(e, $);
        }}><ha-icon icon="mdi:content-copy"></ha-icon></button>
              <button class="etce-act etce-eye ${s.hide ? "off" : ""}" title=${s.hide ? "Show" : "Hide"} @click=${() => u("hide", !s.hide, !1)}>
                <ha-icon icon=${s.hide ? "mdi:eye-off-outline" : "mdi:eye-outline"}></ha-icon>
              </button>
              <button class="etce-act del" title="Delete" @click=${() => this._writeItems(e, r.filter(($, x) => x !== c))}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon>
              </button>`,
        () => l`${this._itemFields(s, u)}${this._copyTo(e, s)}`
      );
    })}
      </div>
    `;
  }
  _itemSummary(t) {
    if (t.kind === "mode") return { name: t.name ?? K(t.value), icon: t.icon ?? zt[t.value.toLowerCase()] ?? Re.mode, tag: Me[t.source] };
    if (t.kind === "device") {
      const e = this.hass?.states[t.entity];
      return {
        name: t.name ?? e?.attributes.friendly_name ?? t.entity,
        icon: t.icon ?? (t.type === "rf_fan" ? "mdi:ceiling-fan" : Re.device),
        tag: t.type === "rf_fan" ? "RF fan" : "Device"
      };
    }
    return { name: t.name ?? (this.hass ? qt(this.hass, t) : "Action"), icon: t.icon ?? We(t), tag: "Action" };
  }
  _itemFields(t, e) {
    const o = (a) => l`<div class="etce-row">
        <label class="lbl">Label</label>
        <input type="text" .value=${t.name ?? ""} placeholder=${a} @change=${(n) => e("name", n.target.value || void 0)} />
      </div>
      ${this._selector("Icon", { icon: {} }, t.icon, (n) => e("icon", n || void 0))}`;
    if (t.kind === "mode") {
      const a = this.hass?.states[this._config.entity], n = ["hvac", "preset", "fan_mode"].filter((c) => I(a, c).length || c === t.source), s = I(a, t.source);
      return l`${this._selectRow("Sets", t.source, n.map((c) => [c, Me[c]]), (c) => {
        const d = I(a, c)[0];
        e("source", c), d && !I(a, c).includes(t.value) && e("value", d);
      })}
        ${this._selectRow("Value", t.value, (s.includes(t.value) ? s : [t.value, ...s]).map((c) => [c, K(c)]), (c) => e("value", c))}
        ${o(K(t.value))}`;
    }
    if (t.kind === "action") {
      const a = t.action ?? (t.entity?.startsWith("scene.") ? "scene" : t.entity ? "script" : "service");
      return l`${this._selectRow("Runs", a, [["script", "A script"], ["scene", "A scene"], ["service", "A service"]], (n) => e("action", n))}
        ${a === "script" || a === "scene" ? this._selector(a === "script" ? "Script" : "Scene", { entity: { domain: a } }, t.entity, (n) => e("entity", n || void 0)) : l`<div class="etce-row">
                <label class="lbl">Service</label>
                <input type="text" .value=${t.service ?? ""} placeholder="light.turn_on" @change=${(n) => e("service", n.target.value.trim() || void 0)} />
              </div>
              ${this._selector("Target (optional)", { entity: {} }, t.entity, (n) => e("entity", n || void 0))}
              ${this._hint("Extra service data (optional).")}
              ${this._selector("", { object: {} }, t.data, (n) => e("data", n && Object.keys(n).length ? n : void 0))}`}
        ${o(this.hass ? qt(this.hass, t) : "Action")}`;
    }
    const r = t;
    return l`
      ${this._selector("Entity", { entity: r.type === "rf_fan" ? { domain: "fan" } : {} }, r.entity, (a) => a && e("entity", a))}
      ${o("Entity name")}
      <div class="etce-checks">
        ${this._check("Show name", r.show_name ?? !0, (a) => e("show_name", a, !0))}
        ${this._check("Show value", r.show_state ?? !0, (a) => e("show_state", a, !0))}
      </div>
      ${this._check("Hide when off, 0 or none", !!r.hide_when_off, (a) => e("hide_when_off", a, !1))}
      ${this._hint("Hides this button while the value is off, 0, none, idle, closed or unavailable, and shows it again when there is something to show.")}
      ${r.type === "rf_fan" ? this._rfFanInfo(r) : p}
      ${r.type === "rf_fan" ? this._selectRow(
      "Speed shows as",
      r.speed_format ?? "number",
      [["number", "Number (4)"], ["fraction", "Fraction (4/10)"], ["percent", "Percent (40%)"]],
      (a) => e("speed_format", a, "number")
    ) : p}
      ${this._selectRow(
      "Tap",
      r.tap ?? (r.type === "rf_fan" ? "popup" : "more-info"),
      [["popup", "Open card in pop-up"], ["more-info", "More info"], ["toggle", "Toggle"], ["none", "Nothing"]],
      (a) => e("tap", a, r.type === "rf_fan" ? "popup" : "more-info")
    )}
      ${this._selectRow(
      "Hold",
      r.hold ?? (r.type === "rf_fan" ? "toggle" : "none"),
      [["toggle", "Toggle"], ...r.type === "rf_fan" ? [["toggle_light", "Toggle light"]] : [], ["more-info", "More info"], ["none", "Nothing"]],
      (a) => e("hold", a, r.type === "rf_fan" ? "toggle" : "none")
    )}
      ${(r.tap ?? (r.type === "rf_fan" ? "popup" : "more-info")) === "popup" ? l`${this._hint(r.type === "rf_fan" ? "Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan." : "Pop-up card config (any card).")}
          ${this._selector("", { object: {} }, r.popup_card, (a) => e("popup_card", a && Object.keys(a).length ? a : void 0))}` : p}
    `;
  }
  /** Copy this set's button style to other sets. */
  _copyStyle(t) {
    const o = this._sets().map((r, a) => [r, a]).filter(([, r]) => r !== t);
    return o.length ? l`${this._group("Copy style")}
      ${this._selectRow(
      "Copy this style to",
      "",
      [["", "Choose…"], ["all", "All other sets"], ...o.map(([r, a]) => [String(a), `${r.name ?? j[r.type]} (#${a + 1})`])],
      (r) => {
        if (r === "") return;
        const a = this._sets(), n = r === "all" ? o.map(([, d]) => d) : [Number(r)], s = n.filter((d) => a[d].style && Object.keys(a[d].style).length);
        if (s.length && !window.confirm(`Replace the button style of ${s.length === 1 ? "that set" : `${s.length} sets`}?`)) {
          this.requestUpdate();
          return;
        }
        const c = a[t].style;
        for (const d of n) {
          const h = { ...a[d] };
          c && Object.keys(c).length ? h.style = structuredClone(c) : delete h.style, a[d] = h;
        }
        this._writeSets(a);
      },
      !0
    )}
      ${this._hint("Gives the chosen sets exactly this set’s button style (a set with no style of its own follows the card’s Button style).")}` : l``;
  }
  /** What was detected for this fan (read-only hint). */
  _rfFanInfo(t) {
    if (!this.hass?.states[t.entity]) return p;
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
    const t = this._config, e = !!(t.frosted ?? t.background?.frosted), o = (a, n) => {
      let s = z(t, "background.frosted", void 0);
      if (s = z(s, "background.frost_blur", void 0), a === "frosted") {
        s = z(s, "frosted", n ? !0 : void 0);
        const c = t.frost_blur ?? t.background?.frost_blur;
        s = z(s, "frost_blur", n ? c : void 0);
      } else
        s = z(s, "frosted", !0), s = z(s, "frost_blur", n === E.frost_blur ? void 0 : n);
      this._emit(s);
    }, r = t.frost_blur ?? t.background?.frost_blur;
    return l`${this._hint("The look of every button. Each button set can override any of these under “Button style for this set”.")}
      ${this._buttonStyleEditor("buttons", !1)}
      ${this._sub("bs-frost", "Frosted glass", () => l`
        ${this._check("Frosted glass controls", e, (a) => o("frosted", a))}
        ${this._hint("Buttons, menus, chips, toggles, setpoint pills and the wheel’s setpoint bubble turn see-through with a blur. Best over a moving background or an image.")}
        ${e ? this._sliderRow("Blur", r ?? E.frost_blur, 0, 40, 1, r !== void 0, (a) => o("frost_blur", a)) : p}`)}`;
  }
  _buttonStyleEditor(t, e, o) {
    const r = (e ? this._sets()[o]?.style : this._config.buttons) ?? {}, a = e ? yt(this._config.buttons, void 0) : Ze, n = e ? "Card default" : "Built-in", s = (g, b) => {
      e ? this._patchSet(o, `style.${g}`, b) : this._put(`${t}.${g}`, b);
    }, c = (g, b, w) => {
      const $ = String(a[g] ?? ""), x = w.find(([m]) => m === $)?.[1] ?? $;
      return this._selectRow(b, String(r[g] ?? ""), [["", `${n} (${x})`], ...w], (m) => s(g, m || void 0));
    }, d = (g, b, w, $, x, m = 1, _ = 0) => {
      const k = Number(a[g] ?? _), y = r[g];
      return this._sliderRow(b, y ?? k, w, $, m, y !== void 0, (T) => s(g, T), x);
    }, h = (g, b, w) => this._colorRow(`${t}.${g}`, b, r[g], e ? "Card default" : "Automatic", w, ($) => s(g, $), {
      // Backgrounds can be see-through; borders can be switched off.
      transparent: /background|border/.test(String(g)),
      transparentLabel: /border/.test(String(g)) ? "None" : "Transparent"
    });
    let u = !0;
    const f = (g, b, w) => {
      if (!e) return this._sub(`bs-${g}`, b, w);
      const $ = l`${this._group(b, u)}${w()}`;
      return u = !1, $;
    };
    return l`
      ${f("look", "Look & size", () => l`
      ${this._selectRow(
      "Look",
      String(r.look ?? ""),
      [
        ["", e ? `Card default (${this._config.buttons?.look === "chip" ? "Chip" : this._config.buttons?.look === "button" ? "Button" : o !== void 0 && this._sets()[o]?.type === "chips" ? "Chip" : "Button"})` : "Built-in (Chips for device sets, buttons for the rest)"],
        ["button", "Button"],
        ["chip", "Chip"]
      ],
      (g) => s("look", g || void 0)
    )}
      ${d("scale", "Scale", 50, 200, (g) => `${g}%`, 5, 100)}
      ${this._hint(e ? "Scales every button in this set. Card default comes from Button style." : "Scales every button in every set. Each set can override it under “Button style for this set”.")}`)}
      ${f("shape", "Shape", () => l`
      ${c("variant", "Style", [["tonal", "Tonal (tinted)"], ["filled", "Filled"], ["outlined", "Outlined"], ["ghost", "Ghost"]])}
      ${d("radius", "Corner radius", 0, 40)} ${d("height", "Min height", 0, 120)} ${d("min_width", "Min width", 0, 200)}
      ${d("gap", "Spacing", 0, 32)} ${d("border_width", "Border width", 0, 6)}`)}
      ${f("content", "Content", () => l`
      ${c("content", "Show", [["icon_label", "Icon and label"], ["icon", "Icon only"], ["label", "Label only"]])}
      ${c("icon_position", "Icon", [["top", "Above label"], ["left", "Left of label"]])}
      ${d("icon_size", "Icon size", 10, 48)} ${d("font_size", "Text size", 8, 28)}
      ${d("icon_gap", "Icon to text spacing", 0, 30, void 0, 1, 4)}
      ${c("font_weight", "Text weight", [["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"]])}
      `)}
      ${f("inactive", "Colors: inactive", () => l`
      ${h("background", "Background", "#2a2a2a")} ${h("color", "Text & icon", "#cccccc")} ${h("border_color", "Border", "#555555")}`)}
      ${f("active", "Colors: active", () => l`
      ${this._hint("Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.")}
      ${h("active_background", "Background", "#ff8100")} ${h("active_color", "Text & icon", "#ffffff")}
      ${h("active_border_color", "Border", "#ff8100")}`)}
    `;
  }
  // ---- text ---------------------------------------------------------------------
  _textBody() {
    return l`${this._hint("Size, weight, color and case for each piece of text. Unset keeps the built-in look.")}
      ${Ue.map((t) => this._sub(`text-${t}`, Lr[t], () => this._textRole(t)))}`;
  }
  _textRole(t) {
    const e = `text.${t}`, o = this._get(e) ?? {};
    return l`
      ${this._sliderRow(
      "Size",
      o.size ?? 0,
      0,
      160,
      1,
      o.size !== void 0,
      (r) => this._put(`${e}.size`, r || void 0),
      (r) => r ? `${r}px` : "Auto"
    )}
      ${this._selectRow(
      "Weight",
      String(o.weight ?? ""),
      [["", "Built-in"], ["100", "Thin"], ["200", "Extra light"], ["300", "Light"], ["400", "Regular"], ["500", "Medium"], ["600", "Semibold"], ["700", "Bold"], ["800", "Extra bold"]],
      (r) => this._put(`${e}.weight`, r ? Number(r) : void 0)
    )}
      ${this._color(`${e}.color`, "Color", "Built-in", "#ffffff")}
      ${this._selectRow(
      "Case",
      String(o.transform ?? ""),
      [["", "Built-in"], ["none", "As written"], ["uppercase", "UPPERCASE"], ["lowercase", "lowercase"], ["capitalize", "Capitalize"]],
      (r) => this._put(`${e}.transform`, r || void 0)
    )}
      ${this._sliderRow(
      "Letter spacing",
      o.letter_spacing ?? 0,
      -10,
      30,
      1,
      o.letter_spacing !== void 0,
      (r) => this._put(`${e}.letter_spacing`, r),
      (r) => `${(r / 100).toFixed(2)}em`
    )}
      ${this._selectRow(
      "Italic",
      o.italic === void 0 ? "" : o.italic ? "on" : "off",
      [["", "Built-in"], ["off", "Off"], ["on", "On"]],
      (r) => this._put(`${e}.italic`, r === "" ? void 0 : r === "on")
    )}
      ${this._sliderRow("Opacity", o.opacity ?? 100, 10, 100, 5, o.opacity !== void 0, (r) => this._put(`${e}.opacity`, r), (r) => `${r}%`)}
    `;
  }
  // ---- card -----------------------------------------------------------------------
  _effectsBody() {
    const t = this._config, e = [["none", "Off"], ["glow", "Glow"], ["pulse", "Pulse"], ["both", "Glow + pulse"]], o = (r, a) => {
      let n = z(t, `effects.${r}`, a === "none" && r !== "card" ? void 0 : a);
      r === "card" && (n = z(n, "card.glow", void 0), a === "glow" && (n = z(n, "effects.card", void 0))), this._emit(n);
    };
    return l`
      ${this._hint("Make parts of the card glow or pulse in the heat color while heating and the cool color while cooling.")}
      ${this._sub("fx-parts", "Parts", () => l`${Qe.map((r) => this._selectRow($r[r], to(t, r), e, (a) => o(r, a)))}`)}
      ${this._sub("fx-when", "When", () => l`
      ${this._select(
      "effects.when",
      "Active",
      [["running", "Only while heating or cooling"], ["mode", "Whenever the mode is Heat or Cool"]],
      $t.when
    )}
      ${this._hint("“Only while heating or cooling” follows what the system is doing right now; the other also lights up while it waits at the setpoint.")}`)}
      ${this._sub("fx-look", "Look", () => l`
      ${this._slider("effects.size", "Glow size", 2, 60, 1, $t.size)}
      ${this._slider("effects.speed", "Pulse speed", 0.6, 8, 0.2, $t.speed, (r) => `${r.toFixed(1)}s`)}
      ${this._color("effects.heat_color", "Heating color", "Theme heat", "#ff8100")}
      ${this._color("effects.cool_color", "Cooling color", "Theme cool", "#2b9af9")}`)}
    `;
  }
  _backgroundBody() {
    const t = this._config, e = t.background ?? {}, o = e.fill ?? "color", r = e.style ?? "none", a = (c, d, h) => this._put(`background.${c}`, d, h), n = (c) => {
      let d = z(t, "card.background", void 0);
      d = z(d, "background.color", c), this._emit(d);
    }, s = (c) => `${c}%`;
    return l`
      ${this._hint("The card’s surface. A moving background follows what the thermostat is doing: heat rises, cold sinks, a fan swirls, idle barely drifts.")}
      ${this._sub("bg-base", "Base fill", () => l`
      ${this._selectRow("Fill", o, [["color", "Color"], ["gradient", "Gradient"], ["image", "Image"]], (c) => a("fill", c, "color"))}
      ${o === "color" ? this._colorRow("background.color", "Color", e.color ?? t.card?.background, "Theme card", "#1c1c1c", n, { transparent: !0 }) : p}
      ${o === "gradient" ? this._gradientEditor() : p}
      ${o === "image" ? this._imageEditor() : p}`)}
      ${this._sub("bg-move", "Moving background", () => l`
      ${this._selectRow("Style", r, $e.map(([c, d]) => [c, d]), (c) => a("style", c, "none"))}
      ${r !== "none" ? l`
            ${this._hint($e.find(([c]) => c === r)?.[2] ?? "")}
            ${this._group("Motion")}
            ${this._slider("background.strength", "Strength", 0, 100, 5, E.strength, s)}
            ${this._slider("background.speed", "Speed", 25, 800, 5, E.speed, s)}
            ${this._slider("background.angle", "Angle", -180, 180, 5, 0, (c) => `${c}°`)}
            ${this._hint("Tilts the motion: 0° goes straight up (heating) or down (cooling); 30° leans it to the right.")}
            ${this._slider("background.variation", "Color variation", 0, 100, 5, 0, s)}
            ${this._hint("How much each shape’s color strays from the state colors, e.g. some more orange, some more red, while heating.")}
            ${this._bool("background.follow_gap", "Follow the work", E.follow_gap)}
            ${this._hint("Moves faster and glows stronger the further the room is from the setpoint, and settles as it gets close.")}
            ${this._select("background.off", "When off", [["calm", "A calm, near-still background"], ["none", "No moving background"]], E.off)}
            ${this._select("background.quality", "Quality", [["smooth", "Smooth"], ["light", "Light (older tablets)"]], E.quality)}
            ${this._group("Sync to Air Movement")}
            ${this._selector("Entity", { entity: {} }, e.air_entity ?? e.fan_entity, (c) => {
      let d = z(t, "background.fan_entity", void 0);
      d = z(d, "background.air_entity", c || void 0), this._emit(d);
    })}
            ${this._hint("Optional. Any entity that says how much air is moving: a fan (%), speed levels, on/off, low / medium / high, or an airflow sensor. While it shows air moving, the background swirls at that speed. Without one, Fan Only mode uses the thermostat’s own fan speed.")}
            ${e.air_entity || e.fan_entity ? l`<div class="etce-row">
                    <label class="lbl">Full Speed at</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Automatic"
                      .value=${e.air_max !== void 0 ? String(e.air_max) : ""}
                      @change=${(c) => {
      const d = c.target.value;
      a("air_max", d === "" ? void 0 : Number(d));
    }}
                    />
                  </div>
                  ${this._hint("For raw numbers only, e.g. 1200 for a 1200 CFM airflow sensor. Leave empty and percentages, number entities and speed names work on their own.")}` : p}
          ` : p}`)}
      ${r !== "none" ? this._sub("bg-colors", "Colors by state", () => this._bgColors()) : p}
      ${this._sub("bg-finish", "Finish", () => l`
      ${this._slider("background.scrim", "Lighten / darken", -60, 60, 5, 0, (c) => c > 0 ? `Darken ${c}%` : c < 0 ? `Lighten ${-c}%` : "None")}
      ${this._slider("background.vignette", "Vignette", 0, 100, 5, 0, s)}
      ${this._slider("background.grain", "Grain", 0, 100, 5, 0, s)}`)}
    `;
  }
  _gradientEditor() {
    const t = this._config.background?.gradient ?? {}, e = t.stops?.length ? [...t.stops] : ["#1c2a3a", "#3a1c2a"], o = (r) => this._put("background.gradient.stops", r);
    return l`
      ${this._selectRow("Type", t.type ?? "linear", [["linear", "Linear"], ["radial", "Radial"]], (r) => this._put("background.gradient.type", r, "linear"))}
      ${(t.type ?? "linear") === "linear" ? this._slider("background.gradient.angle", "Angle", 0, 360, 5, 135, (r) => `${r}°`) : p}
      ${e.map(
      (r, a) => l`${this._colorRow(`bg-stop-${a}`, `Color ${a + 1}`, r, "Card color", "#1c2a3a", (n) => {
        const s = [...e];
        s[a] = n ?? "var(--card-background-color)", o(s);
      }, { transparent: !0 })}
          ${e.length > 2 ? l`<div class="etce-row"><button class="etce-act del" title="Remove color" @click=${() => o(e.filter((n, s) => s !== a))}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon></button></div>` : p}`
    )}
      ${e.length < 4 ? l`<div class="etce-addbar"><button class="etce-add" @click=${() => o([...e, "#000000"])}>+ Color</button></div>` : p}
    `;
  }
  _imageEditor() {
    const t = this._config.background?.image ?? {};
    return l`
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
    return l`${this._hint("Two colors per state. Unset follows your theme’s heat, cool and fan colors.")}
      ${Zo.map(
      ([e, o], r) => l`<div class="etce-group ${r === 0 ? "first" : ""}">${M(o)}</div>
          ${this._colorRow(
        `bg-${e}-main`,
        "Main",
        t[e]?.main,
        "Automatic",
        /^#/.test(wt[e].main) ? wt[e].main : e.includes("cool") ? "#2b9af9" : e === "fan" ? "#00bfa5" : "#ff8100",
        (a) => this._put(`background.colors.${e}.main`, a),
        { transparent: !0 }
      )}
          ${this._colorRow(`bg-${e}-second`, "Second", t[e]?.second, "Automatic", wt[e].second, (a) => this._put(`background.colors.${e}.second`, a), { transparent: !0 })}`
    )}`;
  }
  _cardBody() {
    return l`
      ${this._hint("The card’s border, corners and padding. Its fill and moving background are under Background.")}
      ${this._color("card.border_color", "Border", "Theme", "#444444", { transparent: !0, transparentLabel: "None" })}
      ${this._slider("card.border_width", "Border width", 0, 8, 1, 1)}
      ${this._slider("card.radius", "Corner radius", 0, 48, 1, 16)}
      ${this._slider("card.padding", "Padding", 0, 40, 1, 16)}
    `;
  }
};
ie.styles = [
  Be(dr),
  Kt`
      :host { display: block; }
    `
];
let W = ie;
ut([
  te({ attribute: !1 })
], W.prototype, "hass");
ut([
  L()
], W.prototype, "_config");
ut([
  L()
], W.prototype, "_open");
ut([
  L()
], W.prototype, "_set");
ut([
  L()
], W.prototype, "_chip");
customElements.get(Dt) || customElements.define(Dt, W);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ro = { ATTRIBUTE: 1 }, io = (i) => (...t) => ({ _$litDirective$: i, values: t });
let ao = class {
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
const no = "important", Fr = " !" + no, S = io(class extends ao {
  constructor(i) {
    if (super(i), i.type !== ro.ATTRIBUTE || i.name !== "style" || i.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return Object.keys(i).reduce((t, e) => {
      const o = i[e];
      return o == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${o};`;
    }, "");
  }
  update(i, [t]) {
    const { style: e } = i.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const o of this.ft) t[o] == null && (this.ft.delete(o), o.includes("-") ? e.removeProperty(o) : e[o] = null);
    for (const o in t) {
      const r = t[o];
      if (r != null) {
        this.ft.add(o);
        const a = typeof r == "string" && r.endsWith(Fr);
        o.includes("-") || a ? e.setProperty(o, a ? r.slice(0, -11) : r, a ? no : "") : e[o] = r;
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
const Ft = io(class extends ao {
  constructor(i) {
    if (super(i), i.type !== ro.ATTRIBUTE || i.name !== "class" || i.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter((t) => i[t]).join(" ") + " ";
  }
  update(i, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in t) t[o] && !this.nt?.has(o) && this.st.add(o);
      return this.render(t);
    }
    const e = i.element.classList;
    for (const o of this.st) o in t || (e.remove(o), this.st.delete(o));
    for (const o in t) {
      const r = !!t[o];
      r === this.st.has(o) || this.nt?.has(o) || (r ? (e.add(o), this.st.add(o)) : (e.remove(o), this.st.delete(o)));
    }
    return V;
  }
}), Ir = 1, Hr = 0.5, Dr = 3, Ur = 1.5;
function jr(i) {
  return i.includes("C") ? Hr : Ir;
}
function qr(i, t) {
  return t.setpoint?.min_gap ?? (i.includes("C") ? Ur : Dr);
}
function so(i) {
  return Math.round(i * 100) / 100;
}
function G(i, t, e, o) {
  let r = o > 0 ? so(Math.round(i / o) * o) : i;
  return t !== null && r < t && (r = t), e !== null && r > e && (r = e), r;
}
function bt(i, t, e, o, r) {
  return { setpoint: i, value: G(t, e, o, r), min: e, max: o, step: r };
}
function It(i, t, e) {
  return { available: !1, unit: i, mode: t, heat: null, cool: null, active: e, minGap: 0 };
}
function Vr(i, t) {
  const e = i.config?.unit_system?.temperature ?? "°", o = i.states[t.entity], r = o ? Ye(o.state) : "unknown";
  if (!o || r !== "heat" && r !== "cool" && r !== "heat_cool")
    return It(e, r, "heat");
  const a = o.attributes, n = jr(e), s = qr(e, t), c = C(a.min_temp), d = C(a.max_temp);
  if (r === "heat_cool") {
    const u = C(a.target_temp_low), f = C(a.target_temp_high);
    if (u === null && f === null) return It(e, r, "cool");
    const g = u !== null ? bt("heat", u, c, d, n) : null, b = f !== null ? bt("cool", f, c, d, n) : null;
    return { available: !0, unit: e, mode: r, heat: g, cool: b, active: b ? "cool" : "heat", minGap: s };
  }
  const h = C(a.temperature);
  return h === null ? It(e, r, r === "heat" ? "heat" : "cool") : r === "heat" ? {
    available: !0,
    unit: e,
    mode: r,
    heat: bt("heat", h, c, d, n),
    cool: null,
    active: "heat",
    minGap: s
  } : {
    available: !0,
    unit: e,
    mode: r,
    heat: null,
    cool: bt("cool", h, c, d, n),
    active: "cool",
    minGap: s
  };
}
function Lt(i) {
  return i[i.active];
}
function re(i, t) {
  const e = Lt(i);
  if (!e) return i;
  const o = i.mode === "heat_cool" ? i[e.setpoint === "cool" ? "heat" : "cool"] : null;
  if (!o) {
    const s = { ...e, value: G(t, e.min, e.max, e.step) };
    return { ...i, [e.setpoint]: s };
  }
  const r = i.minGap;
  let a = G(t, e.min, e.max, e.step), n = o.value;
  if (e.setpoint === "cool") {
    if (a - o.value < r) {
      let s = a - r;
      o.min !== null && s < o.min && (s = o.min, a = G(o.min + r, e.min, e.max, e.step)), n = G(s, o.min, o.max, o.step);
    }
  } else if (o.value - a < r) {
    let s = a + r;
    o.max !== null && s > o.max && (s = o.max, a = G(o.max - r, e.min, e.max, e.step)), n = G(s, o.min, o.max, o.step);
  }
  return {
    ...i,
    [e.setpoint]: { ...e, value: a },
    [o.setpoint]: { ...o, value: n }
  };
}
function tt(i, t) {
  const e = Lt(i);
  return e ? re(i, e.value + t * e.step) : i;
}
function Oe(i, t) {
  return Lt(i) ? re(i, t) : i;
}
function Wr(i, t, e, o) {
  const r = Lt(i);
  if (!r) return i;
  const a = Math.round(e / o);
  return re(i, t + a * r.step);
}
function at(i, t) {
  return i[t] === null ? i : { ...i, active: t };
}
function Yr(i, t) {
  const e = [];
  for (let o = -t; o <= t; o++) {
    const r = so(i.value + o * i.step);
    i.min !== null && r < i.min || i.max !== null && r > i.max || e.push(r);
  }
  return e;
}
function Gr(i, t) {
  if (!i.available) return null;
  const e = { entity_id: t };
  if (i.mode === "heat_cool")
    i.heat && (e.target_temp_low = i.heat.value), i.cool && (e.target_temp_high = i.cool.value);
  else {
    const o = i.heat ?? i.cool;
    if (!o) return null;
    e.temperature = o.value;
  }
  return { domain: "climate", service: "set_temperature", data: e };
}
const Kr = 600, Xr = 8e3;
function Zr(i, t) {
  return i.heat?.value === t.heat?.value && i.cool?.value === t.cool?.value;
}
class Jr {
  constructor(t, e, o) {
    this.entityId = t, this.send = e, this.changed = o, this.edit = null, this.dragging = !1, this.pending = null, this.writeTimer = null, this.reconcileTimer = null, this.latest = null;
  }
  /** Feed the model derived from the latest hass. */
  sync(t) {
    if (this.latest = t, this.dragging || this.pending && t.mode === this.pending.mode && !Zr(t, this.pending))
      return;
    const e = this.edit && t[this.edit.active] ? this.edit.active : t.active;
    this.edit = { ...t, active: e }, this.pending = null, this.clearReconcile();
  }
  /** Live preview without scheduling a write (used during a drag). */
  preview(t) {
    this.edit = t, this.changed();
  }
  commit(t) {
    this.edit = t, this.pending = t, this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = setTimeout(() => this.flush(), Kr), this.changed();
  }
  /** Change only which setpoint is edited (no write). */
  select(t) {
    this.edit = t, this.pending && (this.pending = { ...this.pending, active: t.active }), this.changed();
  }
  flush() {
    this.writeTimer && clearTimeout(this.writeTimer), this.writeTimer = null;
    const t = this.edit ? Gr(this.edit, this.entityId()) : null;
    t && this.send(t), this.clearReconcile(), this.reconcileTimer = setTimeout(() => {
      if (this.reconcileTimer = null, this.pending = null, this.latest) {
        const e = this.edit?.active;
        this.edit = { ...this.latest, active: e && this.latest[e] ? e : this.latest.active }, this.changed();
      }
    }, Xr);
  }
  /** On disconnect: send anything still queued, drop timers. */
  dispose() {
    this.writeTimer && this.flush(), this.clearReconcile(), this.pending = null;
  }
  clearReconcile() {
    this.reconcileTimer && clearTimeout(this.reconcileTimer), this.reconcileTimer = null;
  }
}
function Ht(i, t) {
  const e = i.heat ?? i.cool, o = i.unit.includes("C");
  let r = t?.range_min ?? e?.min ?? (o ? 10 : 50), a = t?.range_max ?? e?.max ?? (o ? 32 : 90);
  a > r || (a = r + (o ? 10 : 20));
  for (const n of [i.heat, i.cool])
    n && (r = Math.min(r, n.value), a = Math.max(a, n.value));
  return { min: r, max: a };
}
function Mt(i, t) {
  return Math.min(1, Math.max(0, (i - t.min) / (t.max - t.min)));
}
function Qr(i, t) {
  return t.min + Math.min(1, Math.max(0, i)) * (t.max - t.min);
}
function ti(i, t, e) {
  const o = t > 0 ? t : e > 0 ? e : 0;
  if (o <= 0) return [];
  const r = [], a = Math.ceil(i.min / o) * o;
  if ((i.max - a) / o > 200) return [];
  for (let n = a; n <= i.max + 1e-9; n = Math.round((n + o) * 1e3) / 1e3) {
    const s = e > 0 && Math.abs(n / e - Math.round(n / e)) < 1e-6;
    r.push({ value: n, fraction: Mt(n, i), label: s });
  }
  return r;
}
function ei(i, t, e) {
  if (!i.heat) return "cool";
  if (!i.cool) return "heat";
  const o = Math.abs(Mt(i.heat.value, e) - t), r = Math.abs(Mt(i.cool.value, e) - t);
  return Math.abs(o - r) < 1e-6 ? i.active : o < r ? "heat" : "cool";
}
const oi = Kt`
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
`, ri = Array.from({ length: 14 }, (i, t) => ({
  x: (t * 37 + 11) % 92 + 4,
  y: (t * 53 + 7) % 86 + 6,
  d: 3 + t * 7 % 5,
  dl: -(t * 1.3 % 5)
})), co = (i) => ((i * 0.618034 + 0.31) % 1 * 2 - 1).toFixed(2);
function vt(i, t, e) {
  return l`<div class="lay">
    ${Xe(i.style, t).map(
    (o, r) => l`<i
          class="col"
          style=${S({ "--x": `${o.x}%`, "--sz": `${o.s}${e}`, "--d": `${o.d}s`, "--dl": `${o.dl}s`, "--hv": co(r) })}
          ><b></b
        ></i>`
  )}
  </div>`;
}
function Pe(i, t) {
  switch (i.style) {
    case "plasma":
      return vt(i, t, "%");
    case "lava":
      return l`<svg class="defs" width="0" height="0" aria-hidden="true">
          <filter id="etc-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </svg>
        ${vt(i, t, "%")}`;
    case "shimmer":
      return l`${vt(i, t, "%")}
        <div class="spark">
          ${ri.map(
        (e) => l`<i style=${S({ left: `${e.x}%`, top: `${e.y}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s` })}></i>`
      )}
        </div>`;
    case "particles":
      return vt(i, t, "px");
    case "aurora":
      return l`${Xe("aurora", t).map(
        (e, o) => l`<i
            class="rib"
            style=${S({ "--y": `${e.y}%`, "--h": `${e.s}%`, "--d": `${e.d}s`, "--dl": `${e.dl}s`, "--hv": co(o) })}
          ></i>`
      )}`;
    case "flow":
      return l`<i class="band b1"></i><i class="band b2"></i>`;
    case "core":
      return l`<i class="c1"></i><i class="c2"></i>`;
    case "mesh":
      return l`<div class="lay">
        <i class="m m1"><b></b></i><i class="m m2"><b></b></i><i class="m m3"><b></b></i><i class="m m4"><b></b></i>
      </div>`;
    case "beam":
      return l`<div class="beam"><i class="r1"></i><i class="r2"></i><i class="r3"></i></div>`;
  }
}
function ii(i, t) {
  const e = i.background ?? {}, o = e.quality ?? E.quality, r = e.fill === "image" && e.image?.url ? l`<div class="bg-base" aria-hidden="true">
          <div class="bg-img fit-${e.image.fit ?? "cover"}"></div>
          ${e.image.darken ? l`<div class="bg-dark"></div>` : p}
        </div>` : p, a = t ? l`<div class="bg s-${t.style} st-${t.state} dir-${t.dir} q-${o} ${e.variation ? "vary" : ""}" aria-hidden="true">
        ${e.angle ? l`<div class="bg-rot">${Pe(t, o)}</div>` : Pe(t, o)}${t.blades ? l`<i class="blades"></i>` : p}
      </div>` : p, n = e.scrim || e.vignette || e.grain ? l`<div class="bg-finish" aria-hidden="true">
          ${e.scrim ? l`<i class="scrim"></i>` : p} ${e.vignette ? l`<i class="vig"></i>` : p}
          ${e.grain ? l`<i class="grain"></i>` : p}
        </div>` : p;
  return l`${r}${a}${n}`;
}
const ai = globalThis.CSS;
for (const [i, t, e] of [
  ["--etc-bg-a", "<color>", "transparent"],
  ["--etc-bg-b", "<color>", "transparent"],
  ["--etc-bg-op", "<number>", "1"]
])
  try {
    ai?.registerProperty?.({ name: i, syntax: t, inherits: !0, initialValue: e });
  } catch {
  }
const ni = Kt`
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
var si = Object.defineProperty, U = (i, t, e, o) => {
  for (var r = void 0, a = i.length - 1, n; a >= 0; a--)
    (n = i[a]) && (r = n(t, e, r) || r);
  return r && si(t, e, r), r;
};
const ci = 18;
function li(i, t) {
  const e = i.currentTemp;
  if (e === null || !t?.available) return !1;
  const o = (t.heat ?? t.cool).step / 2, r = t.heat?.value, a = t.cool?.value;
  return r !== void 0 && a !== void 0 ? e >= r - o && e <= a + o : r !== void 0 ? e >= r - o : a !== void 0 ? e <= a + o : !1;
}
const di = 500, ae = class ae extends ot {
  constructor() {
    super(...arguments), this._open = /* @__PURE__ */ new Set(), this._tick = 0, this._popupOpen = !1, this._menu = null, this._revealed = !1, this._bgPaused = !1, this._cycle = 0, this._cycleTimer = null, this._onScreen = !0, this._revealTimer = null, this._sp = new Jr(
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
      const e = this._sp.edit, o = e?.[e.active];
      if (!o) return;
      const r = t.currentTarget;
      r.focus({ preventScroll: !0 }), this._drag = { startY: t.clientY, startValue: o.value }, this._sp.dragging = !0, this._armReveal(), r.setPointerCapture?.(t.pointerId);
    }, this._wheelMove = (t) => {
      !this._drag || !this._sp.edit || this._sp.preview(Wr(this._sp.edit, this._drag.startValue, t.clientY - this._drag.startY, ci));
    }, this._wheelUp = (t) => {
      const e = this._drag;
      if (!e) return;
      this._drag = null, this._sp.dragging = !1;
      const o = t.currentTarget;
      o.hasPointerCapture?.(t.pointerId) && o.releasePointerCapture(t.pointerId);
      const r = this._sp.edit;
      r && r[r.active]?.value !== e.startValue ? this._sp.commit(r) : this._tapMode() && this._revealed && Math.abs(t.clientY - e.startY) < 6 && this._setRevealed(!1);
    }, this._wheelKey = (t) => {
      const e = this._sp.edit;
      e && (t.key === "ArrowUp" || t.key === "ArrowRight" ? (t.preventDefault(), this._sp.commit(tt(e, 1))) : (t.key === "ArrowDown" || t.key === "ArrowLeft") && (t.preventDefault(), this._sp.commit(tt(e, -1))));
    }, this._wheelScroll = (t) => {
      const e = this._sp.edit;
      !e || Math.abs(t.deltaY) < 4 || (t.preventDefault(), this._sp.commit(tt(e, t.deltaY < 0 ? 1 : -1)));
    }, this._barDown = (t) => {
      const e = this._sp.edit;
      if (!e?.available) return;
      const o = t.currentTarget, r = o.getBoundingClientRect(), a = Ht(e, this._config?.setpoint?.bar), n = this._barFraction(t, r), s = ei(e, n, a);
      this._barDrag = { handle: s, rect: r }, this._sp.dragging = !0, this._armReveal(), o.setPointerCapture?.(t.pointerId), this._sp.preview(Oe(at(e, s), this._barValueAt(t, r)));
    }, this._barMove = (t) => {
      !this._barDrag || !this._sp.edit || this._sp.preview(Oe(this._sp.edit, this._barValueAt(t, this._barDrag.rect)));
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
    this._config = Ut(t), this._open = this._loadOpen();
  }
  static getConfigElement() {
    return document.createElement(Dt);
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
    t && !this._cycleTimer && (this._cycleTimer = setInterval(() => this._cycle += 1, Er)), !t && this._cycleTimer && (clearInterval(this._cycleTimer), this._cycleTimer = null);
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
    }), this._io.observe(this)), document.addEventListener("visibilitychange", this._updatePause), window.addEventListener(Wt, this._onTest);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._io?.disconnect(), this._io = void 0, this._cycleTimer && clearInterval(this._cycleTimer), this._cycleTimer = null, this._sideRO?.disconnect(), this._bgRO?.disconnect(), this._bgRO = void 0, document.removeEventListener("visibilitychange", this._updatePause), window.removeEventListener(Wt, this._onTest), this._sp.dispose(), this._revealTimer && clearTimeout(this._revealTimer);
  }
  willUpdate(t) {
    (t.has("hass") || t.has("_config")) && this.hass && this._config && this._sp.sync(Vr(this.hass, this._config)), t.has("hass") && this._popupEl && this.hass && (this._popupEl.hass = this.hass);
  }
  /** Only re-render for state that this card reads (not every hass push). */
  shouldUpdate(t) {
    if (!t.has("hass") || t.size > 1) return !0;
    const e = t.get("hass");
    return !e || !this.hass || !this._config ? !0 : this._watched().some((o) => e.states[o] !== this.hass.states[o]);
  }
  _watched() {
    const t = this._config, e = [t.entity], o = ee(t);
    o && e.push(o);
    const r = (a) => [
      ...a.chips ?? [],
      ...(a.items ?? []).filter((n) => n.kind === "device")
    ];
    for (const a of t.sets ?? []) for (const n of r(a)) e.push(n.entity);
    for (const a of t.sets ?? []) for (const n of a.items ?? []) n.kind === "action" && n.entity && e.push(n.entity);
    if (this.hass)
      for (const a of t.sets ?? [])
        for (const n of r(a)) {
          if (n.type !== "rf_fan") continue;
          const s = st(this.hass, n, 0);
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
    if (!this._config || !this.hass) return p;
    const t = this._config, e = Ko(this.hass, t);
    this._syncCycleTimer();
    const o = Rr(this._testMode(), this._cycle), r = o ? { ...Ee(e, o), currentTemp: e.currentTemp, setpoints: e.setpoints } : e, a = o ? Ee(e, o) : e, n = Do(this.hass, t), s = rr(this.hass, t, a), c = {
      [`eq-${r.equipment ?? "none"}`]: !0,
      [`mode-${r.mode}`]: !0,
      ...kr(t, a),
      frosted: Ke(t),
      "bg-paused": !!s && this._bgPaused
    }, d = { ...lr(t), ...cr(t.text), ...this._barVars(), ...Sr(t), ...nr(t, s) }, h = { top: [], bottom: [], left: [], right: [] }, u = n.filter((m) => m.display === "toggle"), f = (m) => m.display !== "toggle" || this._open.has(m.key), g = new Map(n.filter((m) => m.config.id).map((m) => [m.config.id, m])), b = (m) => {
      let _ = m;
      const k = /* @__PURE__ */ new Set([m]);
      for (; _.config.row_with; ) {
        const y = g.get(_.config.row_with);
        if (!y || k.has(y) || !f(y)) break;
        k.add(y), _ = y;
      }
      return _;
    }, w = /* @__PURE__ */ new Map();
    for (const m of n) {
      if (!f(m)) continue;
      const _ = b(m);
      w.has(_) || w.set(_, []), w.get(_).push(m);
    }
    const $ = { top: [], bottom: [], left: [], right: [] };
    for (const [m, _] of w) _.length === 1 && m.display === "menu" && $[m.zone].push(m);
    for (const m of n) {
      const _ = w.get(m);
      if (_) {
        if (_.length === 1 && m.display === "menu") {
          $[m.zone][0] === m && h[m.zone].push(this._renderMenuRow($[m.zone], m.zone));
          continue;
        }
        if (_.length === 1) {
          h[m.zone].push(this._renderSet(m));
          continue;
        }
        h[m.zone].push(l`<div class="row-group">
        ${_.map((k) => k.display === "menu" ? this._renderMenuRow([k], m.zone) : this._renderSet(k))}
      </div>`);
      }
    }
    const x = t.toggles_zone ?? v.toggles_zone;
    return u.length && h[x].push(this._renderToggles(u)), l`
      <ha-card class=${Ft(c)} style=${S(d)}>
        ${ii(t, s)}
        ${o ? l`<div class="test-badge" title="Test mode switches off when the editor closes">TEST · ${Mr[o]}</div>` : p}
        <div class=${Ft({ grid: !0, centered: t.zones?.centered ?? !0, "has-sides": !!(h.left.length || h.right.length) })} style=${S(this._zoneVars())}>
          ${["top", "left"].map((m) => this._zone(m, h[m]))}
          ${this._renderCore(r)}
          ${["right", "bottom"].map((m) => this._zone(m, h[m]))}
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
      const r = t.getBoundingClientRect(), a = `${Math.ceil(Math.hypot(r.width, r.height)) + 2}px`;
      t.style.getPropertyValue("--bg-diag") !== a && t.style.setProperty("--bg-diag", a);
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
      const r = Math.ceil(
        Math.max(
          ...e.map((n) => {
            const s = getComputedStyle(n), c = [...n.children].map((u) => u.getBoundingClientRect().width), d = parseFloat(s.columnGap) || 0;
            return (s.flexDirection === "row" ? c.reduce((u, f) => u + f, 0) + d * Math.max(0, c.length - 1) : Math.max(0, ...c)) + parseFloat(s.marginLeft) + parseFloat(s.marginRight);
          })
        )
      );
      t.style.getPropertyValue("--side-w") !== `${r}px` && t.style.setProperty("--side-w", `${r}px`), e.some((n) => {
        const s = getComputedStyle(n);
        return n.getBoundingClientRect().width + parseFloat(s.marginLeft) + parseFloat(s.marginRight) + 1 < r && [...n.children].reduce((c, d) => c + d.getBoundingClientRect().width, 0) > n.getBoundingClientRect().width + 1;
      }) && t.classList.add("no-center");
    };
    this._sideRO ??= new ResizeObserver(() => o());
    for (const r of e) this._sideRO.observe(r);
    o();
  }
  _zone(t, e) {
    return e.length ? l`<div class="zone ${t}">${e}</div>` : p;
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
    const e = this._config, o = e.setpoint ?? {}, r = o.control ?? v.control, a = o.position ?? v.position, n = e.core_align ?? v.core_align, s = this._sp.edit, c = !!s?.available && r !== "none", d = o.bar?.position ?? v.bar.position, h = d === "above", u = d === "left" || d === "right", f = t.equipment ? `eq-${t.equipment}` : "", g = c && this._tapMode(), b = !g || this._revealed, w = o.reveal_from ?? v.reveal_from, $ = g && (w === "both" || w === "current"), x = g && (w === "both" || w === "pills"), m = g && b && (o.open_in ?? v.open_in) === "current", _ = g && !b && !!o.hide_at_target && li(t, s), k = $ || _, y = c ? r === "bar" ? this._renderBar(s, t) : this._renderControl(s, r) : null;
    let T = null;
    c && (g ? b ? T = m ? null : y : !_ && (o.collapsed ?? v.collapsed) === "visual" && (T = this._renderCollapsed(s, t, r)) : T = y);
    const F = r !== "bar" ? T : null, B = r === "bar" ? T : null;
    if (!t.available)
      return l`<div class="core al-${n}">
        <div class="main">
          ${e.show_name ?? v.show_name ? l`<div class="name">${t.name}</div>` : p}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    const ne = l`${D(t.currentTemp, t.unit)}<span class="unit">${t.unit}</span>`, ft = e.status_position ?? v.status_position, gt = (e.show_status ?? v.show_status) && t.equipment ? l`<div class="status ${f} sp-${ft}">
            <ha-icon icon=${zt[t.state] ?? "mdi:thermostat"}></ha-icon>${Xo[t.equipment]}
          </div>` : p, se = m ? l`<div class="in-current">${y}</div>` : e.show_current ?? v.show_current ? k ? l`<button
              class="current tappable ${f}"
              aria-expanded=${b}
              aria-label="Show temperature controls"
              @click=${() => this._setRevealed(!this._revealed)}
            >
              ${ne}
            </button>` : l`<div class="current ${f}">${ne}</div>` : p, lo = l`<div class="main">
      ${e.show_name ?? v.show_name ? l`<div class="name">${t.name}</div>` : p}
      ${ft === "above" ? gt : p}
      ${(e.show_humidity ?? v.show_humidity) && t.humidity !== null ? l`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(t.humidity)}%</div>` : p}
      ${ft === "beside" && gt !== p ? l`<div class="cur-row">${se}${gt}</div>` : se}
      ${ft === "below" ? gt : p}
      ${(e.show_pills ?? v.show_pills) && s?.available && !_ && !(g && b && o.hide_pills_open) ? this._renderPills(s, x, b) : p}
    </div>`;
    return l`<div class="core al-${n} pos-${a}">
      ${B && h ? B : p}
      <div class="core-row">
        ${B && d === "left" ? B : p} ${F && a === "left" ? F : p} ${lo}
        ${F && a === "right" ? F : p} ${B && d === "right" ? B : p}
      </div>
      ${F && a === "center" ? l`<div class="ctl-center">${F}</div>` : p}
      ${B && !h && !u ? B : p}
    </div>`;
  }
  /** The control's own value while it is folded away; tap to open. */
  _renderCollapsed(t, e, o) {
    const r = t[t.active];
    if (!r) return p;
    const a = () => this._setRevealed(!0);
    if (o === "bar")
      return l`<div
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
    const n = D(r.value, t.unit);
    return l`<button class="collapsed" aria-label="Show temperature controls" @click=${a}>
      ${o === "wheel" ? this._wheelCenter(t.active, n) : l`<span class="sv" style=${S({ "--c": t.active === "cool" ? "var(--etc-cool)" : "var(--etc-heat)" })}
            >${n}</span
          >`}
    </button>`;
  }
  /** `tapOpens`: the pills open the control (tap-to-reveal). In Heat/Cool a
   *  pill also picks which setpoint the wheel/stepper edits. */
  _renderPills(t, e = !1, o = !0) {
    const r = !!(t.heat && t.cool), a = (n) => {
      const s = t[n];
      if (!s) return p;
      const c = l`<ha-icon icon=${n === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${D(
        s.value,
        t.unit
      )}`, d = r && t.active !== n && this._usesActive() && o;
      return !r && !e ? l`<div class="pill ${n}">${c}</div>` : l`<button
        class="pill ${n} ${d ? "dim" : ""} ${e ? "tappable" : ""}"
        aria-pressed=${r ? String(t.active === n) : p}
        aria-expanded=${e ? String(o) : p}
        aria-label=${`${n === "heat" ? "Heat" : "Cool"} setpoint`}
        @click=${() => this._pillTap(t, n, r, e, o)}
      >
        ${c}
      </button>`;
    };
    return l`<div class="pills">${a("heat")} ${a("cool")}</div>`;
  }
  _pillTap(t, e, o, r, a) {
    o && this._sp.select(at(t, e)), r && (a ? !o || t.active === e ? this._setRevealed(!1) : this._armReveal() : this._setRevealed(!0));
  }
  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  _usesActive() {
    const t = this._config?.setpoint?.control ?? v.control;
    return t === "wheel" || t === "stepper";
  }
  _renderControl(t, e) {
    const o = t[t.active];
    if (!o) return p;
    const r = t.active, a = l`<button
      class="round ${r}"
      aria-label="Increase"
      ?disabled=${o.max !== null && o.value >= o.max}
      @click=${() => this._sp.commit(tt(t, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`, n = l`<button
      class="round ${r}"
      aria-label="Decrease"
      ?disabled=${o.min !== null && o.value <= o.min}
      @click=${() => this._sp.commit(tt(t, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`, c = ((this._config?.show_pills ?? v.show_pills) === !1 || this._tapMode() && this._revealed && !!this._config?.setpoint?.hide_pills_open) && t.heat && t.cool ? l`<div class="hc-switch" role="group" aria-label="Setpoint">
            ${["heat", "cool"].map(
      (_) => l`<button
                class="hc ${_} ${t.active === _ ? "on" : ""}"
                aria-pressed=${String(t.active === _)}
                aria-label=${_ === "heat" ? "Edit heat setpoint" : "Edit cool setpoint"}
                @click=${() => {
        this._sp.select(at(t, _)), this._armReveal();
      }}
              >
                <ha-icon icon=${_ === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${D(t[_].value, t.unit)}
              </button>`
    )}
          </div>` : p, d = this._config?.setpoint?.nudge, h = d === "beside" ? "right" : d ?? (e === "stepper" ? "around" : "right"), u = (_, k) => {
      const y = l`<div class="nudges">${a}${n}</div>`, T = l`<div class="nudges row">${n}${a}</div>`, F = h === "hidden" ? k : h === "left" ? l`${y}${k}` : h === "above" ? l`${T}${k}` : h === "below" ? l`${k}${T}` : h === "stacked" ? l`${a}${k}${n}` : h === "around" ? l`${n}${k}${a}` : l`${k}${y}`, B = l`<div class="${_} nud-${h}">${F}</div>`;
      return c === p ? B : l`<div class="ctl-wrap">${c}${B}</div>`;
    };
    if (e === "stepper")
      return u(`stepper ${r}`, l`<span class="sv">${D(o.value, t.unit)}</span>`);
    const g = (this._config?.setpoint ?? {}).neighbors ?? v.neighbors, b = Yr(o, g), w = b.filter((_) => _ > o.value).reverse(), $ = b.filter((_) => _ < o.value).reverse(), x = (_) => l`<div class="nb ${Math.abs(_ - o.value) > o.step * 1.5 ? "far" : ""}">${D(_, t.unit)}</div>`, m = l`<div
      class="wheel-col"
      role="slider"
      tabindex="0"
      aria-label=${`${r === "cool" ? "Cool" : "Heat"} setpoint`}
      aria-valuenow=${o.value}
      aria-valuemin=${o.min ?? p}
      aria-valuemax=${o.max ?? p}
      aria-valuetext=${D(o.value, t.unit)}
      @pointerdown=${this._wheelDown}
      @pointermove=${this._wheelMove}
      @pointerup=${this._wheelUp}
      @pointercancel=${this._wheelUp}
      @keydown=${this._wheelKey}
      @wheel=${this._wheelScroll}
    >
      ${w.map(x)}
      ${this._wheelCenter(r, D(o.value, t.unit))}
      ${$.map(x)}
    </div>`;
    return u("wheel", m);
  }
  _wheelCenter(t, e) {
    return (this._config?.setpoint?.wheel_style ?? v.wheel_style) === "pill" ? l`<div class="pill wheel-pill ${t}">
        <ha-icon icon=${t === "heat" ? "mdi:fire" : "mdi:snowflake"}></ha-icon>${e}
      </div>` : l`<div class="bubble ${t}">${e}</div>`;
  }
  // ---- bar ------------------------------------------------------------------
  _renderBar(t, e, o = !1) {
    const r = { ...v.bar, ...this._config?.setpoint?.bar ?? {} }, a = Ht(t, r), n = (y) => `${(Mt(y, a) * 100).toFixed(3)}%`, s = r.position === "left" || r.position === "right", c = (y) => s ? { bottom: y } : { left: y }, d = s ? "height" : "width", h = s ? "top" : "right", u = t.heat, f = t.cool, g = ti(a, r.ticks ?? 0, r.labels ?? 0), b = [];
    if (r.look === "gradient") {
      const y = r.stops?.length ? r.stops : ["#2b9af9", "#7ccf8a", "#ff8100"];
      b.push(l`<div class="seg full" style=${S({ background: `linear-gradient(to ${s ? "top" : "right"}, ${y.join(", ")})` })}></div>`);
    } else
      u && b.push(l`<div class="seg heat" style=${S({ [d]: n(u.value) })}></div>`), f && b.push(l`<div class="seg cool" style=${S({ ...c(n(f.value)), [h]: "0" })}></div>`), u && f && b.push(l`<div class="seg comfort" style=${S({ ...c(n(u.value)), [h]: `calc(100% - ${n(f.value)})` })}></div>`);
    const w = (y) => {
      const T = t[y];
      return T ? l`
        ${r.flags ? l`<div class="flag ${y}" style=${S(c(n(T.value)))}>${D(T.value, t.unit)}°</div>` : p}
        <div
          class="handle ${y} s-${r.handle_shape ?? "round"} ${t.active === y && u && f ? "active" : ""}"
          style=${S(c(n(T.value)))}
          role=${o ? p : "slider"}
          aria-orientation=${s ? "vertical" : "horizontal"}
          tabindex=${o ? p : "0"}
          aria-label=${`${y === "heat" ? "Heat" : "Cool"} setpoint`}
          aria-valuenow=${T.value}
          aria-valuemin=${a.min}
          aria-valuemax=${a.max}
          @focus=${() => this._sp.select(at(this._sp.edit, y))}
          @keydown=${(F) => this._barKey(F, y)}
        ></div>
      ` : p;
    }, $ = e.currentTemp, x = r.show_current && $ !== null && $ >= a.min && $ <= a.max ? l`<div class="marker" style=${S(c(n($)))} title="Current"></div>` : p, m = o ? l`<div class="track ro">${b}${x}${w("heat")} ${w("cool")}</div>` : l`<div
          class="track"
          @pointerdown=${this._barDown}
          @pointermove=${this._barMove}
          @pointerup=${this._barUp}
          @pointercancel=${this._barUp}
        >
          ${b}${x}${w("heat")} ${w("cool")}
        </div>`, _ = s ? r.flag_position === "right" ? "right" : "left" : r.flag_position === "below" ? "below" : "above", k = s ? r.tick_position === "left" ? "left" : "right" : r.tick_position === "above" ? "above" : "below";
    return l`<div class="bar ${s ? `vertical side-${r.position}` : "horizontal"} ${r.flags ? `flags-${_}` : "no-flags"} ticks-${k}">
      ${m}
      ${g.length ? l`<div class="ticks">
            ${g.map(
      (y) => l`<div class="tick ${y.label ? "lbl" : ""}" style=${S(c(`${y.fraction * 100}%`))}></div>
                ${y.label ? l`<div class="tick-l" style=${S(c(`${y.fraction * 100}%`))}>${y.value}</div>` : p}`
    )}
          </div>` : p}
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
    const o = this._sp.edit, r = Ht(o, this._config?.setpoint?.bar);
    return Qr(this._barFraction(t, e), r);
  }
  _barKey(t, e) {
    const o = this._sp.edit;
    if (!o) return;
    const r = t.key === "ArrowUp" || t.key === "ArrowRight" ? 1 : t.key === "ArrowDown" || t.key === "ArrowLeft" ? -1 : 0;
    r && (t.preventDefault(), this._sp.commit(tt(at(o, e), r)));
  }
  // ---- button sets ------------------------------------------------------------
  _renderSet(t) {
    const e = yt(this._config?.buttons, t.config.style), o = e.look ?? (t.type === "chips" ? "chip" : "button"), r = o === "button" && t.orientation === "row" && t.align === "stretch", a = { ...Nt(e) };
    r && (a["grid-template-columns"] = t.columns ? `repeat(${t.columns}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))");
    const n = {
      set: !0,
      grid: r,
      flex: !r,
      [`t-${t.type}`]: !0,
      [`o-${t.orientation}`]: !0,
      [`a-${t.align}`]: !0,
      [`v-${e.variant}`]: !0,
      [`ip-${e.icon_position}`]: !0,
      [`look-${o}`]: !0
    }, s = e.content !== "label", c = e.content !== "icon";
    return l`<div class=${Ft(n)} style=${S(a)} role="group" aria-label=${t.title}>
      ${t.tiles.map((d, h) => {
      if (d.kind === "device") return this._renderChip(st(this.hass, d.chip, h), e.content, o);
      const u = d.kind === "mode" ? d.option : { label: d.label, icon: d.icon, active: !1, color: "var(--primary-color)" };
      return l`<button
          class="btn ${u.active ? "active" : ""} ${d.kind === "action" ? "act" : ""}"
          style=${S({ "--c": u.color })}
          aria-pressed=${d.kind === "mode" ? String(u.active) : p}
          title=${u.label}
          @click=${() => this._tileTap(d)}
        >
          ${s ? l`<ha-icon icon=${u.icon}></ha-icon>` : p}
          ${c ? l`<span class="lbl">${u.label}</span>` : p}
        </button>`;
    })}
    </div>`;
  }
  // ---- expandable menus -------------------------------------------------------
  _renderMenuRow(t, e) {
    const o = yt(this._config?.buttons, t[0]?.config.style), r = Nt(o), a = {};
    return r["--etc-b-gap"] && (a["--etc-b-gap"] = r["--etc-b-gap"]), r["--etc-b-scale"] && (a["--etc-b-scale"] = r["--etc-b-scale"]), l`<div class="menus z-${e}" style=${S(a)}>${t.map((n) => this._renderMenu(n))}</div>`;
  }
  /** Tap on a mode or action button (device buttons have their own gestures). */
  _tileTap(t) {
    const e = t.kind === "mode" ? Vo(t.source, this._config.entity, t.option.value) : t.kind === "action" ? qo(t.item) : null;
    e && this._call(e), this._fire("haptic", "light");
  }
  _renderMenu(t) {
    const e = yt(this._config?.buttons, t.config.style), o = t.tiles.find((u) => u.kind === "device"), r = o ? st(this.hass, o.chip, 0) : null, n = t.options.find((u) => u.active) ?? (t.options.length === 0 && r ? { label: r.state, icon: r.icon, color: "var(--primary-color)" } : void 0), s = e.content !== "label", c = this._menu === t.key, d = typeof HTMLElement < "u" && "showPopover" in HTMLElement.prototype, h = e.look ?? "button";
    return l`<div class="menu t-${t.type} look-${h} ${c ? "open" : ""} d-${t.menuDirection} v-${e.variant}" style=${S(Nt(e))}>
      <button
        class="mt ${n ? "has-active" : ""}"
        style=${S({ "--c": n?.color ?? "var(--primary-color)" })}
        aria-haspopup="listbox"
        aria-expanded=${c}
        aria-label=${`${t.title}: ${n?.label ?? ""}`}
        @click=${(u) => this._toggleMenu(t, u.currentTarget)}
      >
        ${s ? l`<ha-icon icon=${n?.icon ?? t.toggleIcon}></ha-icon>` : p}
        <span class="mt-text">
          ${t.menuShowName ? l`<span class="mt-name">${t.title}</span>` : p}
          <span class="mt-value">${n?.label ?? "—"}</span>
        </span>
      </button>
      <div
        class="menu-list"
        role="listbox"
        aria-label=${t.title}
        data-key=${t.key}
        popover=${d ? "auto" : p}
        @toggle=${(u) => this._menuToggled(t, u)}
        @keydown=${this._menuKey}
      >
        ${t.tiles.map((u, f) => {
      if (u.kind === "device") {
        const b = st(this.hass, u.chip, f);
        return l`<button class="mi dev ${b.on ? "on" : ""}" role="option" @click=${() => {
          this._chipTap(b), this._closeMenus();
        }}>
              ${s ? l`<ha-icon icon=${b.icon}></ha-icon>` : p}<span>${b.name}</span><span class="mi-val">${b.state}</span>
            </button>`;
      }
      const g = u.kind === "mode" ? u.option : { label: u.label, icon: u.icon, active: !1, color: "var(--primary-color)" };
      return l`<button
            class="mi ${g.active ? "active" : ""}"
            role="option"
            aria-selected=${g.active}
            style=${S({ "--c": g.color })}
            @click=${() => this._pickMenu(u)}
          >
            ${s ? l`<ha-icon icon=${g.icon}></ha-icon>` : p}<span>${g.label}</span>
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
    const r = o;
    if (o.matches(":popover-open")) {
      r.hidePopover();
      return;
    }
    r.showPopover(), this._placeMenu(o, e, t.menuDirection), this._menu = t.key, (o.querySelector(".mi.active") ?? o.querySelector(".mi"))?.focus({ preventScroll: !0 });
  }
  /** Fixed-position the top-layer list next to its trigger, kept on screen. */
  _placeMenu(t, e, o) {
    const r = e.getBoundingClientRect(), a = 6, n = window.innerWidth, s = window.innerHeight;
    t.style.minWidth = o === "up" || o === "down" ? `${Math.round(r.width)}px` : "";
    const c = t.getBoundingClientRect();
    let d = o === "right" ? r.right + a : o === "left" ? r.left - a - c.width : r.left, h = o === "down" ? r.bottom + a : o === "up" ? r.top - a - c.height : r.top;
    o === "down" && h + c.height > s && (h = r.top - a - c.height), o === "up" && h < 0 && (h = r.bottom + a), o === "right" && d + c.width > n && (d = r.left - a - c.width), o === "left" && d < 0 && (d = r.right + a), d = Math.max(4, Math.min(d, n - c.width - 4)), h = Math.max(4, Math.min(h, s - c.height - 4)), t.style.left = `${Math.round(d)}px`, t.style.top = `${Math.round(h)}px`;
  }
  _menuToggled(t, e) {
    !(e.newState === "open") && this._menu === t.key && (this._menu = null);
  }
  _closeMenus() {
    for (const t of this.renderRoot.querySelectorAll(".menu-list"))
      t.hidePopover && t.matches(":popover-open") && t.hidePopover();
    this._menu = null;
  }
  _pickMenu(t) {
    this._tileTap(t), this._closeMenus();
  }
  _renderToggles(t) {
    return l`<div class="toggles">
      ${t.map((e) => {
      const o = this._open.has(e.key);
      return l`<button class="tgl ${o ? "open" : ""}" aria-expanded=${o} @click=${() => this._toggleSet(e.key)}>
          <ha-icon icon=${e.toggleIcon}></ha-icon><span>${e.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
    })}
    </div>`;
  }
  // ---- chips --------------------------------------------------------------------
  _renderChip(t, e, o = "chip") {
    const r = t.config.show_name ?? e !== "icon", a = t.config.show_state ?? !0, n = t.type === "rf_fan", s = o === "button", c = !s || e !== "label", d = s ? `btn dev ${t.on ? "active" : ""}` : `chip ${t.on ? "on" : ""}`, h = n && t.natural ? l`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
          ><ha-icon icon="mdi:leaf"></ha-icon>${a && t.naturalLevel !== null ? t.naturalLevel : p}</span
        >` : a && (!n || t.speed !== null || !t.on) ? l`<span class="badge">${t.state}</span>` : p, u = l`${n && t.lightOn ? l`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : p}
      ${n && t.timerEnds ? l`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${Te(t.timerEnds)}</span>` : p}`;
    return s ? l`<button
        class="${d} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
        aria-label=${`${t.name}: ${t.state}`}
        title=${`${t.name}: ${t.state}`}
        @pointerdown=${(f) => this._chipDown(f, t)}
        @pointerup=${this._chipCancelHold}
        @pointerleave=${this._chipCancelHold}
        @pointercancel=${this._chipCancelHold}
        @click=${() => this._chipTap(t)}
        @contextmenu=${(f) => f.preventDefault()}
      >
        ${c ? l`<ha-icon class=${t.spin ? "spin" : ""} style=${S(t.spin ? { "--spin": `${t.spin}s` } : {})} icon=${t.icon}></ha-icon>` : p}
        <span class="lbl dev-row">${r ? l`<span>${t.name}</span>` : p}${h}${u}</span>
      </button>` : l`<button
      class="${d} ${t.available ? "" : "unavailable"} ${t.direction === "reverse" ? "rev" : ""}"
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
      ${r ? l`<span>${t.name}</span>` : p}
      ${n && t.natural ? l`<span class="badge natural" title=${t.naturalLevel !== null ? `Breeze ${t.naturalLevel}` : "Breeze"}
            ><ha-icon icon="mdi:leaf"></ha-icon>${a && t.naturalLevel !== null ? t.naturalLevel : p}</span
          >` : a && (!n || t.speed !== null || !t.on) ? l`<span class="badge">${t.state}</span>` : p}
      ${n && t.lightOn ? l`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : p}
      ${n && t.timerEnds ? l`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${Te(t.timerEnds)}</span>` : p}
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
        const o = wr(t.config);
        o && this._canCreate(o) ? this._showPopup(o) : this._fire("hass-more-info", { entityId: t.entity });
        break;
      }
      case "more-info":
        this._fire("hass-more-info", { entityId: t.entity });
        break;
      case "toggle":
      case "toggle_light": {
        const o = yr(t, e);
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
    const o = this.renderRoot.querySelector("dialog.popup"), r = this.renderRoot.querySelector(".popup-body");
    !o || !r || (r.replaceChildren(e), o.open || o.showModal?.());
  }
  _renderPopup() {
    return this._popupOpen ? l`<dialog
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
    </dialog>` : p;
  }
};
ae.styles = [oi, ni];
let P = ae;
U([
  te({ attribute: !1 })
], P.prototype, "hass");
U([
  L()
], P.prototype, "_config");
U([
  L()
], P.prototype, "_open");
U([
  L()
], P.prototype, "_tick");
U([
  L()
], P.prototype, "_popupOpen");
U([
  L()
], P.prototype, "_menu");
U([
  L()
], P.prototype, "_revealed");
U([
  L()
], P.prototype, "_bgPaused");
U([
  L()
], P.prototype, "_cycle");
customElements.get(Ct) || customElements.define(Ct, P);
const Rt = window;
Rt.customCards = Rt.customCards ?? [];
Rt.customCards.some((i) => i.type === Ct) || Rt.customCards.push({
  type: Ct,
  name: "Easy Thermostat Styler Card (Ltek)",
  description: "A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.",
  preview: !0
});
console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${De} `, "background:#ff8100;color:#fff", "background:#333;color:#fff");
