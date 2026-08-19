"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.3.1";
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            // Used to reproduce behavior of `batchedUpdates` in legacy mode.
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function(publicInstance) {
              return false;
            },
            /**
             * Forces an update. This should only be invoked when it is known with
             * certainty that we are **not** in a DOM transaction.
             *
             * You may want to call this when you know that some deeper aspect of the
             * component's state has changed but `setState` was not called.
             *
             * This will not invoke `shouldComponentUpdate`, but it will invoke
             * `componentWillUpdate` and `componentDidUpdate`.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueForceUpdate: function(publicInstance, callback2, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            /**
             * Replaces all of the state. Always use this or `setState` to mutate state.
             * You should treat `this.state` as immutable.
             *
             * There is no guarantee that `this.state` will be immediately updated, so
             * accessing `this.state` after calling this method may return the old value.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} completeState Next state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueReplaceState: function(publicInstance, completeState, callback2, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            /**
             * Sets a subset of the state. This only exists because _pendingState is
             * internal. This provides a merging strategy that is not available to deep
             * properties which is confusing. TODO: Expose pendingState or don't use it
             * during the merge.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} partialState Next partial state to be merged with state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} Name of the calling function in the public API.
             * @internal
             */
            enqueueSetState: function(publicInstance, partialState, callback2, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component4(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component4.prototype.isReactComponent = {};
          Component4.prototype.setState = function(partialState, callback2) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback2, "setState");
          };
          Component4.prototype.forceUpdate = function(callback2) {
            this.updater.enqueueForceUpdate(this, callback2, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component4.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component4.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component4.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config2) {
            {
              if (hasOwnProperty.call(config2, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config2, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config2.ref !== void 0;
          }
          function hasValidKey(config2) {
            {
              if (hasOwnProperty.call(config2, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config2, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config2.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config2) {
            {
              if (typeof config2.ref === "string" && ReactCurrentOwner.current && config2.__self && ReactCurrentOwner.current.stateNode !== config2.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config2.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement11(type, config2, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config2 != null) {
              if (hasValidRef(config2)) {
                ref = config2.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config2);
                }
              }
              if (hasValidKey(config2)) {
                {
                  checkKeyStringCoercion(config2.key);
                }
                key = "" + config2.key;
              }
              self = config2.__self === void 0 ? null : config2.__self;
              source = config2.__source === void 0 ? null : config2.__source;
              for (propName in config2) {
                if (hasOwnProperty.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config2[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement2(element, config2, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config2 != null) {
              if (hasValidRef(config2)) {
                ref = config2.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config2)) {
                {
                  checkKeyStringCoercion(config2.key);
                }
                key = "" + config2.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config2) {
                if (hasOwnProperty.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config2[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config2[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
          }
          function isValidElement2(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback2) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback2(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement2(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                    (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                      // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                      // eslint-disable-next-line react-internal/safe-string-coercion
                      escapeUserProvidedKey("" + mappedChild.key) + "/"
                    ) : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback2);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback2);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement2(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext5(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              // As a workaround to support multiple concurrent renderers, we categorize
              // some renderers as primary and others as secondary. We only expect
              // there to be two concurrent renderers at most: React Native (primary) and
              // Fabric (secondary); React DOM (primary) and React ART (secondary).
              // Secondary renderers store their context values on separate fields.
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              // Used to track how many concurrent renderers this context currently
              // supports within in a single renderer. Such as parallel server rendering.
              _threadCount: 0,
              // These are circular
              Provider: null,
              Consumer: null,
              // Add these to use same hidden class in VM as ServerContext
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              // We use these fields to store the result.
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef2(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo2(type, compare2) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare2 === void 0 ? null : compare2
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext6(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState6(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef5(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect7(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect4(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback4(callback2, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback2, deps);
          }
          function useMemo5(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId2() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component5) {
            var prototype = Component5.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement2(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement2(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement2(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement11.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement2.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition3(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback2) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback2;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback2) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback2();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i = 0;
                try {
                  for (; i < queue.length; i++) {
                    var callback2 = queue[i];
                    do {
                      callback2 = callback2(true);
                    } while (callback2 !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children2 = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children2;
          exports.Component = Component4;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.act = act;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext5;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef2;
          exports.isValidElement = isValidElement2;
          exports.lazy = lazy;
          exports.memo = memo2;
          exports.startTransition = startTransition3;
          exports.unstable_act = act;
          exports.useCallback = useCallback4;
          exports.useContext = useContext6;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect7;
          exports.useId = useId2;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect4;
          exports.useMemo = useMemo5;
          exports.useReducer = useReducer;
          exports.useRef = useRef5;
          exports.useState = useState6;
          exports.useSyncExternalStore = useSyncExternalStore;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          var React12 = require_react();
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactSharedInternals = React12.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var assign = Object.assign;
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher.current;
              ReactCurrentDispatcher.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component4) {
            var prototype = Component4.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown;
          var specialPropRefWarningShown;
          var didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config2) {
            {
              if (hasOwnProperty.call(config2, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config2, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config2.ref !== void 0;
          }
          function hasValidKey(config2) {
            {
              if (hasOwnProperty.call(config2, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config2, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config2.key !== void 0;
          }
          function warnIfStringRefCannotBeAutoConverted(config2, self) {
            {
              if (typeof config2.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config2.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          function defineKeyPropWarningGetter(props, displayName) {
            {
              var warnAboutAccessingKey = function() {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              };
              warnAboutAccessingKey.isReactWarning = true;
              Object.defineProperty(props, "key", {
                get: warnAboutAccessingKey,
                configurable: true
              });
            }
          }
          function defineRefPropWarningGetter(props, displayName) {
            {
              var warnAboutAccessingRef = function() {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              };
              warnAboutAccessingRef.isReactWarning = true;
              Object.defineProperty(props, "ref", {
                get: warnAboutAccessingRef,
                configurable: true
              });
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function jsxDEV(type, config2, maybeKey, source, self) {
            {
              var propName;
              var props = {};
              var key = null;
              var ref = null;
              if (maybeKey !== void 0) {
                {
                  checkKeyStringCoercion(maybeKey);
                }
                key = "" + maybeKey;
              }
              if (hasValidKey(config2)) {
                {
                  checkKeyStringCoercion(config2.key);
                }
                key = "" + config2.key;
              }
              if (hasValidRef(config2)) {
                ref = config2.ref;
                warnIfStringRefCannotBeAutoConverted(config2, self);
              }
              for (propName in config2) {
                if (hasOwnProperty.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config2[propName];
                }
              }
              if (type && type.defaultProps) {
                var defaultProps = type.defaultProps;
                for (propName in defaultProps) {
                  if (props[propName] === void 0) {
                    props[propName] = defaultProps[propName];
                  }
                }
              }
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
              return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
            }
          }
          var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function isValidElement2(object) {
            {
              return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
            }
          }
          function getDeclarationErrorAddendum() {
            {
              if (ReactCurrentOwner$1.current) {
                var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
                if (name) {
                  return "\n\nCheck the render method of `" + name + "`.";
                }
              }
              return "";
            }
          }
          function getSourceInfoErrorAddendum(source) {
            {
              if (source !== void 0) {
                var fileName = source.fileName.replace(/^.*[\\\/]/, "");
                var lineNumber = source.lineNumber;
                return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
              }
              return "";
            }
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            {
              var info = getDeclarationErrorAddendum();
              if (!info) {
                var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
                if (parentName) {
                  info = "\n\nCheck the top-level render call using <" + parentName + ">.";
                }
              }
              return info;
            }
          }
          function validateExplicitKey(element, parentType) {
            {
              if (!element._store || element._store.validated || element.key != null) {
                return;
              }
              element._store.validated = true;
              var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
              if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                return;
              }
              ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
              var childOwner = "";
              if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
                childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
              }
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            {
              if (typeof node !== "object") {
                return;
              }
              if (isArray(node)) {
                for (var i = 0; i < node.length; i++) {
                  var child = node[i];
                  if (isValidElement2(child)) {
                    validateExplicitKey(child, parentType);
                  }
                }
              } else if (isValidElement2(node)) {
                if (node._store) {
                  node._store.validated = true;
                }
              } else if (node) {
                var iteratorFn = getIteratorFn(node);
                if (typeof iteratorFn === "function") {
                  if (iteratorFn !== node.entries) {
                    var iterator = iteratorFn.call(node);
                    var step;
                    while (!(step = iterator.next()).done) {
                      if (isValidElement2(step.value)) {
                        validateExplicitKey(step.value, parentType);
                      }
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          var didWarnAboutKeySpread = {};
          function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
            {
              var validType = isValidElementType(type);
              if (!validType) {
                var info = "";
                if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                  info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                }
                var sourceInfo = getSourceInfoErrorAddendum(source);
                if (sourceInfo) {
                  info += sourceInfo;
                } else {
                  info += getDeclarationErrorAddendum();
                }
                var typeString;
                if (type === null) {
                  typeString = "null";
                } else if (isArray(type)) {
                  typeString = "array";
                } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                  typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                  info = " Did you accidentally export a JSX literal instead of a component?";
                } else {
                  typeString = typeof type;
                }
                error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
              var element = jsxDEV(type, props, key, source, self);
              if (element == null) {
                return element;
              }
              if (validType) {
                var children = props.children;
                if (children !== void 0) {
                  if (isStaticChildren) {
                    if (isArray(children)) {
                      for (var i = 0; i < children.length; i++) {
                        validateChildKeys(children[i], type);
                      }
                      if (Object.freeze) {
                        Object.freeze(children);
                      }
                    } else {
                      error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                    }
                  } else {
                    validateChildKeys(children, type);
                  }
                }
              }
              {
                if (hasOwnProperty.call(props, "key")) {
                  var componentName = getComponentNameFromType(type);
                  var keys = Object.keys(props).filter(function(k) {
                    return k !== "key";
                  });
                  var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
                  if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                    var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                    error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                    didWarnAboutKeySpread[componentName + beforeExample] = true;
                  }
                }
              }
              if (type === REACT_FRAGMENT_TYPE) {
                validateFragmentProps(element);
              } else {
                validatePropTypes(element);
              }
              return element;
            }
          }
          function jsxWithValidationStatic(type, props, key) {
            {
              return jsxWithValidation(type, props, key, true);
            }
          }
          function jsxWithValidationDynamic(type, props, key) {
            {
              return jsxWithValidation(type, props, key, false);
            }
          }
          var jsx3 = jsxWithValidationDynamic;
          var jsxs2 = jsxWithValidationStatic;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.jsx = jsx3;
          exports.jsxs = jsxs2;
        })();
      }
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // node_modules/@prisma/client/runtime/index-browser.js
  var require_index_browser = __commonJS({
    "node_modules/@prisma/client/runtime/index-browser.js"(exports, module) {
      "use strict";
      var pe = Object.defineProperty;
      var Xe = Object.getOwnPropertyDescriptor;
      var Ke = Object.getOwnPropertyNames;
      var Qe = Object.prototype.hasOwnProperty;
      var Ye = (e) => {
        throw TypeError(e);
      };
      var Oe = (e, n) => {
        for (var i in n) pe(e, i, { get: n[i], enumerable: true });
      };
      var xe = (e, n, i, t) => {
        if (n && typeof n == "object" || typeof n == "function") for (let r of Ke(n)) !Qe.call(e, r) && r !== i && pe(e, r, { get: () => n[r], enumerable: !(t = Xe(n, r)) || t.enumerable });
        return e;
      };
      var ze = (e) => xe(pe({}, "__esModule", { value: true }), e);
      var ne = (e, n, i) => n.has(e) ? Ye("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i);
      var ii = {};
      Oe(ii, { Decimal: () => Je, Public: () => ge, getRuntime: () => _e, makeStrictEnum: () => qe, objectEnumValues: () => Ae });
      module.exports = ze(ii);
      var ge = {};
      Oe(ge, { validator: () => Re });
      function Re(...e) {
        return (n) => n;
      }
      var ie = Symbol();
      var me = /* @__PURE__ */ new WeakMap();
      var we = class {
        constructor(n) {
          n === ie ? me.set(this, "Prisma.".concat(this._getName())) : me.set(this, "new Prisma.".concat(this._getNamespace(), ".").concat(this._getName(), "()"));
        }
        _getName() {
          return this.constructor.name;
        }
        toString() {
          return me.get(this);
        }
      };
      var G = class extends we {
        _getNamespace() {
          return "NullTypes";
        }
      };
      var Ne;
      var J = class extends G {
        constructor() {
          super(...arguments);
          ne(this, Ne);
        }
      };
      Ne = /* @__PURE__ */ new WeakMap();
      ke(J, "DbNull");
      var ve;
      var X = class extends G {
        constructor() {
          super(...arguments);
          ne(this, ve);
        }
      };
      ve = /* @__PURE__ */ new WeakMap();
      ke(X, "JsonNull");
      var Ee;
      var K = class extends G {
        constructor() {
          super(...arguments);
          ne(this, Ee);
        }
      };
      Ee = /* @__PURE__ */ new WeakMap();
      ke(K, "AnyNull");
      var Ae = { classes: { DbNull: J, JsonNull: X, AnyNull: K }, instances: { DbNull: new J(ie), JsonNull: new X(ie), AnyNull: new K(ie) } };
      function ke(e, n) {
        Object.defineProperty(e, "name", { value: n, configurable: true });
      }
      var ye = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
      function qe(e) {
        return new Proxy(e, { get(n, i) {
          if (i in n) return n[i];
          if (!ye.has(i)) throw new TypeError("Invalid enum value: ".concat(String(i)));
        } });
      }
      var en = () => {
        var e, n;
        return ((n = (e = globalThis.process) == null ? void 0 : e.release) == null ? void 0 : n.name) === "node";
      };
      var nn = () => {
        var e, n;
        return !!globalThis.Bun || !!((n = (e = globalThis.process) == null ? void 0 : e.versions) != null && n.bun);
      };
      var tn = () => !!globalThis.Deno;
      var rn = () => typeof globalThis.Netlify == "object";
      var sn = () => typeof globalThis.EdgeRuntime == "object";
      var on = () => {
        var e;
        return ((e = globalThis.navigator) == null ? void 0 : e.userAgent) === "Cloudflare-Workers";
      };
      function un() {
        var i;
        return (i = [[rn, "netlify"], [sn, "edge-light"], [on, "workerd"], [tn, "deno"], [nn, "bun"], [en, "node"]].flatMap((t) => t[0]() ? [t[1]] : []).at(0)) != null ? i : "";
      }
      var fn = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
      function _e() {
        let e = un();
        return { id: e, prettyName: fn[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
      }
      var V = 9e15;
      var H = 1e9;
      var Se = "0123456789abcdef";
      var se = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
      var oe = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
      var Me = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -V, maxE: V, crypto: false };
      var Le;
      var Z;
      var w = true;
      var fe = "[DecimalError] ";
      var $ = fe + "Invalid argument: ";
      var Ie = fe + "Precision limit exceeded";
      var Ze = fe + "crypto unavailable";
      var Ue = "[object Decimal]";
      var R = Math.floor;
      var C = Math.pow;
      var cn = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
      var ln = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
      var an = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
      var Be = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
      var D = 1e7;
      var m = 7;
      var dn = 9007199254740991;
      var hn = se.length - 1;
      var Ce = oe.length - 1;
      var h = { toStringTag: Ue };
      h.absoluteValue = h.abs = function() {
        var e = new this.constructor(this);
        return e.s < 0 && (e.s = 1), p(e);
      };
      h.ceil = function() {
        return p(new this.constructor(this), this.e + 1, 2);
      };
      h.clampedTo = h.clamp = function(e, n) {
        var i, t = this, r = t.constructor;
        if (e = new r(e), n = new r(n), !e.s || !n.s) return new r(NaN);
        if (e.gt(n)) throw Error($ + n);
        return i = t.cmp(e), i < 0 ? e : t.cmp(n) > 0 ? n : new r(t);
      };
      h.comparedTo = h.cmp = function(e) {
        var n, i, t, r, s = this, o = s.d, u = (e = new s.constructor(e)).d, c = s.s, f = e.s;
        if (!o || !u) return !c || !f ? NaN : c !== f ? c : o === u ? 0 : !o ^ c < 0 ? 1 : -1;
        if (!o[0] || !u[0]) return o[0] ? c : u[0] ? -f : 0;
        if (c !== f) return c;
        if (s.e !== e.e) return s.e > e.e ^ c < 0 ? 1 : -1;
        for (t = o.length, r = u.length, n = 0, i = t < r ? t : r; n < i; ++n) if (o[n] !== u[n]) return o[n] > u[n] ^ c < 0 ? 1 : -1;
        return t === r ? 0 : t > r ^ c < 0 ? 1 : -1;
      };
      h.cosine = h.cos = function() {
        var e, n, i = this, t = i.constructor;
        return i.d ? i.d[0] ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = pn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z == 2 || Z == 3 ? i.neg() : i, e, n, true)) : new t(1) : new t(NaN);
      };
      h.cubeRoot = h.cbrt = function() {
        var e, n, i, t, r, s, o, u, c, f, l = this, a = l.constructor;
        if (!l.isFinite() || l.isZero()) return new a(l);
        for (w = false, s = l.s * C(l.s * l, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (i = b(l.d), e = l.e, (s = (e - i.length + 1) % 3) && (i += s == 1 || s == -2 ? "0" : "00"), s = C(i, 1 / 3), e = R((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? i = "5e" + e : (i = s.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + e), t = new a(i), t.s = l.s) : t = new a(s.toString()), o = (e = a.precision) + 3; ; ) if (u = t, c = u.times(u).times(u), f = c.plus(l), t = k(f.plus(l).times(u), f.plus(c), o + 2, 1), b(u.d).slice(0, o) === (i = b(t.d)).slice(0, o)) if (i = i.slice(o - 3, o + 1), i == "9999" || !r && i == "4999") {
          if (!r && (p(u, e + 1, 0), u.times(u).times(u).eq(l))) {
            t = u;
            break;
          }
          o += 4, r = 1;
        } else {
          (!+i || !+i.slice(1) && i.charAt(0) == "5") && (p(t, e + 1, 1), n = !t.times(t).times(t).eq(l));
          break;
        }
        return w = true, p(t, e, a.rounding, n);
      };
      h.decimalPlaces = h.dp = function() {
        var e, n = this.d, i = NaN;
        if (n) {
          if (e = n.length - 1, i = (e - R(this.e / m)) * m, e = n[e], e) for (; e % 10 == 0; e /= 10) i--;
          i < 0 && (i = 0);
        }
        return i;
      };
      h.dividedBy = h.div = function(e) {
        return k(this, new this.constructor(e));
      };
      h.dividedToIntegerBy = h.divToInt = function(e) {
        var n = this, i = n.constructor;
        return p(k(n, new i(e), 0, 1, 1), i.precision, i.rounding);
      };
      h.equals = h.eq = function(e) {
        return this.cmp(e) === 0;
      };
      h.floor = function() {
        return p(new this.constructor(this), this.e + 1, 3);
      };
      h.greaterThan = h.gt = function(e) {
        return this.cmp(e) > 0;
      };
      h.greaterThanOrEqualTo = h.gte = function(e) {
        var n = this.cmp(e);
        return n == 1 || n === 0;
      };
      h.hyperbolicCosine = h.cosh = function() {
        var e, n, i, t, r, s = this, o = s.constructor, u = new o(1);
        if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);
        if (s.isZero()) return u;
        i = o.precision, t = o.rounding, o.precision = i + Math.max(s.e, s.sd()) + 4, o.rounding = 1, r = s.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / le(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), s = j(o, 1, s.times(n), new o(1), true);
        for (var c, f = e, l = new o(8); f--; ) c = s.times(s), s = u.minus(c.times(l.minus(c.times(l))));
        return p(s, o.precision = i, o.rounding = t, true);
      };
      h.hyperbolicSine = h.sinh = function() {
        var e, n, i, t, r = this, s = r.constructor;
        if (!r.isFinite() || r.isZero()) return new s(r);
        if (n = s.precision, i = s.rounding, s.precision = n + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t = r.d.length, t < 3) r = j(s, 2, r, r, true);
        else {
          e = 1.4 * Math.sqrt(t), e = e > 16 ? 16 : e | 0, r = r.times(1 / le(5, e)), r = j(s, 2, r, r, true);
          for (var o, u = new s(5), c = new s(16), f = new s(20); e--; ) o = r.times(r), r = r.times(u.plus(o.times(c.times(o).plus(f))));
        }
        return s.precision = n, s.rounding = i, p(r, n, i, true);
      };
      h.hyperbolicTangent = h.tanh = function() {
        var e, n, i = this, t = i.constructor;
        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 7, t.rounding = 1, k(i.sinh(), i.cosh(), t.precision = e, t.rounding = n)) : new t(i.s);
      };
      h.inverseCosine = h.acos = function() {
        var e = this, n = e.constructor, i = e.abs().cmp(1), t = n.precision, r = n.rounding;
        return i !== -1 ? i === 0 ? e.isNeg() ? F(n, t, r) : new n(0) : new n(NaN) : e.isZero() ? F(n, t + 4, r).times(0.5) : (n.precision = t + 6, n.rounding = 1, e = new n(1).minus(e).div(e.plus(1)).sqrt().atan(), n.precision = t, n.rounding = r, e.times(2));
      };
      h.inverseHyperbolicCosine = h.acosh = function() {
        var e, n, i = this, t = i.constructor;
        return i.lte(1) ? new t(i.eq(1) ? 0 : NaN) : i.isFinite() ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(Math.abs(i.e), i.sd()) + 4, t.rounding = 1, w = false, i = i.times(i).minus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln()) : new t(i);
      };
      h.inverseHyperbolicSine = h.asinh = function() {
        var e, n, i = this, t = i.constructor;
        return !i.isFinite() || i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t.rounding = 1, w = false, i = i.times(i).plus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln());
      };
      h.inverseHyperbolicTangent = h.atanh = function() {
        var e, n, i, t, r = this, s = r.constructor;
        return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = s.precision, n = s.rounding, t = r.sd(), Math.max(t, e) < 2 * -r.e - 1 ? p(new s(r), e, n, true) : (s.precision = i = t - r.e, r = k(r.plus(1), new s(1).minus(r), i + e, 1), s.precision = e + 4, s.rounding = 1, r = r.ln(), s.precision = e, s.rounding = n, r.times(0.5))) : new s(NaN);
      };
      h.inverseSine = h.asin = function() {
        var e, n, i, t, r = this, s = r.constructor;
        return r.isZero() ? new s(r) : (n = r.abs().cmp(1), i = s.precision, t = s.rounding, n !== -1 ? n === 0 ? (e = F(s, i + 4, t).times(0.5), e.s = r.s, e) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t, r.times(2)));
      };
      h.inverseTangent = h.atan = function() {
        var e, n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding;
        if (f.isFinite()) {
          if (f.isZero()) return new l(f);
          if (f.abs().eq(1) && a + 4 <= Ce) return o = F(l, a + 4, d).times(0.25), o.s = f.s, o;
        } else {
          if (!f.s) return new l(NaN);
          if (a + 4 <= Ce) return o = F(l, a + 4, d).times(0.5), o.s = f.s, o;
        }
        for (l.precision = u = a + 10, l.rounding = 1, i = Math.min(28, u / m + 2 | 0), e = i; e; --e) f = f.div(f.times(f).plus(1).sqrt().plus(1));
        for (w = false, n = Math.ceil(u / m), t = 1, c = f.times(f), o = new l(f), r = f; e !== -1; ) if (r = r.times(c), s = o.minus(r.div(t += 2)), r = r.times(c), o = s.plus(r.div(t += 2)), o.d[n] !== void 0) for (e = n; o.d[e] === s.d[e] && e--; ) ;
        return i && (o = o.times(2 << i - 1)), w = true, p(o, l.precision = a, l.rounding = d, true);
      };
      h.isFinite = function() {
        return !!this.d;
      };
      h.isInteger = h.isInt = function() {
        return !!this.d && R(this.e / m) > this.d.length - 2;
      };
      h.isNaN = function() {
        return !this.s;
      };
      h.isNegative = h.isNeg = function() {
        return this.s < 0;
      };
      h.isPositive = h.isPos = function() {
        return this.s > 0;
      };
      h.isZero = function() {
        return !!this.d && this.d[0] === 0;
      };
      h.lessThan = h.lt = function(e) {
        return this.cmp(e) < 0;
      };
      h.lessThanOrEqualTo = h.lte = function(e) {
        return this.cmp(e) < 1;
      };
      h.logarithm = h.log = function(e) {
        var n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding, g = 5;
        if (e == null) e = new l(10), n = true;
        else {
          if (e = new l(e), i = e.d, e.s < 0 || !i || !i[0] || e.eq(1)) return new l(NaN);
          n = e.eq(10);
        }
        if (i = f.d, f.s < 0 || !i || !i[0] || f.eq(1)) return new l(i && !i[0] ? -1 / 0 : f.s != 1 ? NaN : i ? 0 : 1 / 0);
        if (n) if (i.length > 1) s = true;
        else {
          for (r = i[0]; r % 10 === 0; ) r /= 10;
          s = r !== 1;
        }
        if (w = false, u = a + g, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), Q(c.d, r = a, d)) do
          if (u += 10, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), !s) {
            +b(c.d).slice(r + 1, r + 15) + 1 == 1e14 && (c = p(c, a + 1, 0));
            break;
          }
        while (Q(c.d, r += 10, d));
        return w = true, p(c, a, d);
      };
      h.minus = h.sub = function(e) {
        var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.constructor;
        if (e = new v(e), !g.d || !e.d) return !g.s || !e.s ? e = new v(NaN) : g.d ? e.s = -e.s : e = new v(e.d || g.s !== e.s ? g : NaN), e;
        if (g.s != e.s) return e.s = -e.s, g.plus(e);
        if (f = g.d, d = e.d, u = v.precision, c = v.rounding, !f[0] || !d[0]) {
          if (d[0]) e.s = -e.s;
          else if (f[0]) e = new v(g);
          else return new v(c === 3 ? -0 : 0);
          return w ? p(e, u, c) : e;
        }
        if (i = R(e.e / m), l = R(g.e / m), f = f.slice(), s = l - i, s) {
          for (a = s < 0, a ? (n = f, s = -s, o = d.length) : (n = d, i = l, o = f.length), t = Math.max(Math.ceil(u / m), o) + 2, s > t && (s = t, n.length = 1), n.reverse(), t = s; t--; ) n.push(0);
          n.reverse();
        } else {
          for (t = f.length, o = d.length, a = t < o, a && (o = t), t = 0; t < o; t++) if (f[t] != d[t]) {
            a = f[t] < d[t];
            break;
          }
          s = 0;
        }
        for (a && (n = f, f = d, d = n, e.s = -e.s), o = f.length, t = d.length - o; t > 0; --t) f[o++] = 0;
        for (t = d.length; t > s; ) {
          if (f[--t] < d[t]) {
            for (r = t; r && f[--r] === 0; ) f[r] = D - 1;
            --f[r], f[t] += D;
          }
          f[t] -= d[t];
        }
        for (; f[--o] === 0; ) f.pop();
        for (; f[0] === 0; f.shift()) --i;
        return f[0] ? (e.d = f, e.e = ce(f, i), w ? p(e, u, c) : e) : new v(c === 3 ? -0 : 0);
      };
      h.modulo = h.mod = function(e) {
        var n, i = this, t = i.constructor;
        return e = new t(e), !i.d || !e.s || e.d && !e.d[0] ? new t(NaN) : !e.d || i.d && !i.d[0] ? p(new t(i), t.precision, t.rounding) : (w = false, t.modulo == 9 ? (n = k(i, e.abs(), 0, 3, 1), n.s *= e.s) : n = k(i, e, 0, t.modulo, 1), n = n.times(e), w = true, i.minus(n));
      };
      h.naturalExponential = h.exp = function() {
        return be(this);
      };
      h.naturalLogarithm = h.ln = function() {
        return B(this);
      };
      h.negated = h.neg = function() {
        var e = new this.constructor(this);
        return e.s = -e.s, p(e);
      };
      h.plus = h.add = function(e) {
        var n, i, t, r, s, o, u, c, f, l, a = this, d = a.constructor;
        if (e = new d(e), !a.d || !e.d) return !a.s || !e.s ? e = new d(NaN) : a.d || (e = new d(e.d || a.s === e.s ? a : NaN)), e;
        if (a.s != e.s) return e.s = -e.s, a.minus(e);
        if (f = a.d, l = e.d, u = d.precision, c = d.rounding, !f[0] || !l[0]) return l[0] || (e = new d(a)), w ? p(e, u, c) : e;
        if (s = R(a.e / m), t = R(e.e / m), f = f.slice(), r = s - t, r) {
          for (r < 0 ? (i = f, r = -r, o = l.length) : (i = l, t = s, o = f.length), s = Math.ceil(u / m), o = s > o ? s + 1 : o + 1, r > o && (r = o, i.length = 1), i.reverse(); r--; ) i.push(0);
          i.reverse();
        }
        for (o = f.length, r = l.length, o - r < 0 && (r = o, i = l, l = f, f = i), n = 0; r; ) n = (f[--r] = f[r] + l[r] + n) / D | 0, f[r] %= D;
        for (n && (f.unshift(n), ++t), o = f.length; f[--o] == 0; ) f.pop();
        return e.d = f, e.e = ce(f, t), w ? p(e, u, c) : e;
      };
      h.precision = h.sd = function(e) {
        var n, i = this;
        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error($ + e);
        return i.d ? (n = $e(i.d), e && i.e + 1 > n && (n = i.e + 1)) : n = NaN, n;
      };
      h.round = function() {
        var e = this, n = e.constructor;
        return p(new n(e), e.e + 1, n.rounding);
      };
      h.sine = h.sin = function() {
        var e, n, i = this, t = i.constructor;
        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = mn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z > 2 ? i.neg() : i, e, n, true)) : new t(NaN);
      };
      h.squareRoot = h.sqrt = function() {
        var e, n, i, t, r, s, o = this, u = o.d, c = o.e, f = o.s, l = o.constructor;
        if (f !== 1 || !u || !u[0]) return new l(!f || f < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
        for (w = false, f = Math.sqrt(+o), f == 0 || f == 1 / 0 ? (n = b(u), (n.length + c) % 2 == 0 && (n += "0"), f = Math.sqrt(n), c = R((c + 1) / 2) - (c < 0 || c % 2), f == 1 / 0 ? n = "5e" + c : (n = f.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + c), t = new l(n)) : t = new l(f.toString()), i = (c = l.precision) + 3; ; ) if (s = t, t = s.plus(k(o, s, i + 2, 1)).times(0.5), b(s.d).slice(0, i) === (n = b(t.d)).slice(0, i)) if (n = n.slice(i - 3, i + 1), n == "9999" || !r && n == "4999") {
          if (!r && (p(s, c + 1, 0), s.times(s).eq(o))) {
            t = s;
            break;
          }
          i += 4, r = 1;
        } else {
          (!+n || !+n.slice(1) && n.charAt(0) == "5") && (p(t, c + 1, 1), e = !t.times(t).eq(o));
          break;
        }
        return w = true, p(t, c, l.rounding, e);
      };
      h.tangent = h.tan = function() {
        var e, n, i = this, t = i.constructor;
        return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 10, t.rounding = 1, i = i.sin(), i.s = 1, i = k(i, new t(1).minus(i.times(i)).sqrt(), e + 10, 0), t.precision = e, t.rounding = n, p(Z == 2 || Z == 4 ? i.neg() : i, e, n, true)) : new t(NaN);
      };
      h.times = h.mul = function(e) {
        var n, i, t, r, s, o, u, c, f, l = this, a = l.constructor, d = l.d, g = (e = new a(e)).d;
        if (e.s *= l.s, !d || !d[0] || !g || !g[0]) return new a(!e.s || d && !d[0] && !g || g && !g[0] && !d ? NaN : !d || !g ? e.s / 0 : e.s * 0);
        for (i = R(l.e / m) + R(e.e / m), c = d.length, f = g.length, c < f && (s = d, d = g, g = s, o = c, c = f, f = o), s = [], o = c + f, t = o; t--; ) s.push(0);
        for (t = f; --t >= 0; ) {
          for (n = 0, r = c + t; r > t; ) u = s[r] + g[t] * d[r - t - 1] + n, s[r--] = u % D | 0, n = u / D | 0;
          s[r] = (s[r] + n) % D | 0;
        }
        for (; !s[--o]; ) s.pop();
        return n ? ++i : s.shift(), e.d = s, e.e = ce(s, i), w ? p(e, a.precision, a.rounding) : e;
      };
      h.toBinary = function(e, n) {
        return Pe(this, 2, e, n);
      };
      h.toDecimalPlaces = h.toDP = function(e, n) {
        var i = this, t = i.constructor;
        return i = new t(i), e === void 0 ? i : (q(e, 0, H), n === void 0 ? n = t.rounding : q(n, 0, 8), p(i, e + i.e + 1, n));
      };
      h.toExponential = function(e, n) {
        var i, t = this, r = t.constructor;
        return e === void 0 ? i = L(t, true) : (q(e, 0, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e + 1, n), i = L(t, true, e + 1)), t.isNeg() && !t.isZero() ? "-" + i : i;
      };
      h.toFixed = function(e, n) {
        var i, t, r = this, s = r.constructor;
        return e === void 0 ? i = L(r) : (q(e, 0, H), n === void 0 ? n = s.rounding : q(n, 0, 8), t = p(new s(r), e + r.e + 1, n), i = L(t, false, e + t.e + 1)), r.isNeg() && !r.isZero() ? "-" + i : i;
      };
      h.toFraction = function(e) {
        var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.d, N = g.constructor;
        if (!v) return new N(g);
        if (f = i = new N(1), t = c = new N(0), n = new N(t), s = n.e = $e(v) - g.e - 1, o = s % m, n.d[0] = C(10, o < 0 ? m + o : o), e == null) e = s > 0 ? n : f;
        else {
          if (u = new N(e), !u.isInt() || u.lt(f)) throw Error($ + u);
          e = u.gt(n) ? s > 0 ? n : f : u;
        }
        for (w = false, u = new N(b(v)), l = N.precision, N.precision = s = v.length * m * 2; a = k(u, n, 0, 1, 1), r = i.plus(a.times(t)), r.cmp(e) != 1; ) i = t, t = r, r = f, f = c.plus(a.times(r)), c = r, r = n, n = u.minus(a.times(r)), u = r;
        return r = k(e.minus(i), t, 0, 1, 1), c = c.plus(r.times(f)), i = i.plus(r.times(t)), c.s = f.s = g.s, d = k(f, t, s, 1).minus(g).abs().cmp(k(c, i, s, 1).minus(g).abs()) < 1 ? [f, t] : [c, i], N.precision = l, w = true, d;
      };
      h.toHexadecimal = h.toHex = function(e, n) {
        return Pe(this, 16, e, n);
      };
      h.toNearest = function(e, n) {
        var i = this, t = i.constructor;
        if (i = new t(i), e == null) {
          if (!i.d) return i;
          e = new t(1), n = t.rounding;
        } else {
          if (e = new t(e), n === void 0 ? n = t.rounding : q(n, 0, 8), !i.d) return e.s ? i : e;
          if (!e.d) return e.s && (e.s = i.s), e;
        }
        return e.d[0] ? (w = false, i = k(i, e, 0, n, 1).times(e), w = true, p(i)) : (e.s = i.s, i = e), i;
      };
      h.toNumber = function() {
        return +this;
      };
      h.toOctal = function(e, n) {
        return Pe(this, 8, e, n);
      };
      h.toPower = h.pow = function(e) {
        var n, i, t, r, s, o, u = this, c = u.constructor, f = +(e = new c(e));
        if (!u.d || !e.d || !u.d[0] || !e.d[0]) return new c(C(+u, f));
        if (u = new c(u), u.eq(1)) return u;
        if (t = c.precision, s = c.rounding, e.eq(1)) return p(u, t, s);
        if (n = R(e.e / m), n >= e.d.length - 1 && (i = f < 0 ? -f : f) <= dn) return r = He(c, u, i, t), e.s < 0 ? new c(1).div(r) : p(r, t, s);
        if (o = u.s, o < 0) {
          if (n < e.d.length - 1) return new c(NaN);
          if ((e.d[n] & 1) == 0 && (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1) return u.s = o, u;
        }
        return i = C(+u, f), n = i == 0 || !isFinite(i) ? R(f * (Math.log("0." + b(u.d)) / Math.LN10 + u.e + 1)) : new c(i + "").e, n > c.maxE + 1 || n < c.minE - 1 ? new c(n > 0 ? o / 0 : 0) : (w = false, c.rounding = u.s = 1, i = Math.min(12, (n + "").length), r = be(e.times(B(u, t + i)), t), r.d && (r = p(r, t + 5, 1), Q(r.d, t, s) && (n = t + 10, r = p(be(e.times(B(u, n + i)), n), n + 5, 1), +b(r.d).slice(t + 1, t + 15) + 1 == 1e14 && (r = p(r, t + 1, 0)))), r.s = o, w = true, c.rounding = s, p(r, t, s));
      };
      h.toPrecision = function(e, n) {
        var i, t = this, r = t.constructor;
        return e === void 0 ? i = L(t, t.e <= r.toExpNeg || t.e >= r.toExpPos) : (q(e, 1, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e, n), i = L(t, e <= t.e || t.e <= r.toExpNeg, e)), t.isNeg() && !t.isZero() ? "-" + i : i;
      };
      h.toSignificantDigits = h.toSD = function(e, n) {
        var i = this, t = i.constructor;
        return e === void 0 ? (e = t.precision, n = t.rounding) : (q(e, 1, H), n === void 0 ? n = t.rounding : q(n, 0, 8)), p(new t(i), e, n);
      };
      h.toString = function() {
        var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
        return e.isNeg() && !e.isZero() ? "-" + i : i;
      };
      h.truncated = h.trunc = function() {
        return p(new this.constructor(this), this.e + 1, 1);
      };
      h.valueOf = h.toJSON = function() {
        var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
        return e.isNeg() ? "-" + i : i;
      };
      function b(e) {
        var n, i, t, r = e.length - 1, s = "", o = e[0];
        if (r > 0) {
          for (s += o, n = 1; n < r; n++) t = e[n] + "", i = m - t.length, i && (s += U(i)), s += t;
          o = e[n], t = o + "", i = m - t.length, i && (s += U(i));
        } else if (o === 0) return "0";
        for (; o % 10 === 0; ) o /= 10;
        return s + o;
      }
      function q(e, n, i) {
        if (e !== ~~e || e < n || e > i) throw Error($ + e);
      }
      function Q(e, n, i, t) {
        var r, s, o, u;
        for (s = e[0]; s >= 10; s /= 10) --n;
        return --n < 0 ? (n += m, r = 0) : (r = Math.ceil((n + 1) / m), n %= m), s = C(10, m - n), u = e[r] % s | 0, t == null ? n < 3 ? (n == 0 ? u = u / 100 | 0 : n == 1 && (u = u / 10 | 0), o = i < 4 && u == 99999 || i > 3 && u == 49999 || u == 5e4 || u == 0) : o = (i < 4 && u + 1 == s || i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 100 | 0) == C(10, n - 2) - 1 || (u == s / 2 || u == 0) && (e[r + 1] / s / 100 | 0) == 0 : n < 4 ? (n == 0 ? u = u / 1e3 | 0 : n == 1 ? u = u / 100 | 0 : n == 2 && (u = u / 10 | 0), o = (t || i < 4) && u == 9999 || !t && i > 3 && u == 4999) : o = ((t || i < 4) && u + 1 == s || !t && i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 1e3 | 0) == C(10, n - 3) - 1, o;
      }
      function te(e, n, i) {
        for (var t, r = [0], s, o = 0, u = e.length; o < u; ) {
          for (s = r.length; s--; ) r[s] *= n;
          for (r[0] += Se.indexOf(e.charAt(o++)), t = 0; t < r.length; t++) r[t] > i - 1 && (r[t + 1] === void 0 && (r[t + 1] = 0), r[t + 1] += r[t] / i | 0, r[t] %= i);
        }
        return r.reverse();
      }
      function pn(e, n) {
        var i, t, r;
        if (n.isZero()) return n;
        t = n.d.length, t < 32 ? (i = Math.ceil(t / 3), r = (1 / le(4, i)).toString()) : (i = 16, r = "2.3283064365386962890625e-10"), e.precision += i, n = j(e, 1, n.times(r), new e(1));
        for (var s = i; s--; ) {
          var o = n.times(n);
          n = o.times(o).minus(o).times(8).plus(1);
        }
        return e.precision -= i, n;
      }
      var k = /* @__PURE__ */ (function() {
        function e(t, r, s) {
          var o, u = 0, c = t.length;
          for (t = t.slice(); c--; ) o = t[c] * r + u, t[c] = o % s | 0, u = o / s | 0;
          return u && t.unshift(u), t;
        }
        function n(t, r, s, o) {
          var u, c;
          if (s != o) c = s > o ? 1 : -1;
          else for (u = c = 0; u < s; u++) if (t[u] != r[u]) {
            c = t[u] > r[u] ? 1 : -1;
            break;
          }
          return c;
        }
        function i(t, r, s, o) {
          for (var u = 0; s--; ) t[s] -= u, u = t[s] < r[s] ? 1 : 0, t[s] = u * o + t[s] - r[s];
          for (; !t[0] && t.length > 1; ) t.shift();
        }
        return function(t, r, s, o, u, c) {
          var f, l, a, d, g, v, N, A, M, _, E, P, x, I, ae, z, W, de, T, y, ee = t.constructor, he = t.s == r.s ? 1 : -1, O = t.d, S = r.d;
          if (!O || !O[0] || !S || !S[0]) return new ee(!t.s || !r.s || (O ? S && O[0] == S[0] : !S) ? NaN : O && O[0] == 0 || !S ? he * 0 : he / 0);
          for (c ? (g = 1, l = t.e - r.e) : (c = D, g = m, l = R(t.e / g) - R(r.e / g)), T = S.length, W = O.length, M = new ee(he), _ = M.d = [], a = 0; S[a] == (O[a] || 0); a++) ;
          if (S[a] > (O[a] || 0) && l--, s == null ? (I = s = ee.precision, o = ee.rounding) : u ? I = s + (t.e - r.e) + 1 : I = s, I < 0) _.push(1), v = true;
          else {
            if (I = I / g + 2 | 0, a = 0, T == 1) {
              for (d = 0, S = S[0], I++; (a < W || d) && I--; a++) ae = d * c + (O[a] || 0), _[a] = ae / S | 0, d = ae % S | 0;
              v = d || a < W;
            } else {
              for (d = c / (S[0] + 1) | 0, d > 1 && (S = e(S, d, c), O = e(O, d, c), T = S.length, W = O.length), z = T, E = O.slice(0, T), P = E.length; P < T; ) E[P++] = 0;
              y = S.slice(), y.unshift(0), de = S[0], S[1] >= c / 2 && ++de;
              do
                d = 0, f = n(S, E, T, P), f < 0 ? (x = E[0], T != P && (x = x * c + (E[1] || 0)), d = x / de | 0, d > 1 ? (d >= c && (d = c - 1), N = e(S, d, c), A = N.length, P = E.length, f = n(N, E, A, P), f == 1 && (d--, i(N, T < A ? y : S, A, c))) : (d == 0 && (f = d = 1), N = S.slice()), A = N.length, A < P && N.unshift(0), i(E, N, P, c), f == -1 && (P = E.length, f = n(S, E, T, P), f < 1 && (d++, i(E, T < P ? y : S, P, c))), P = E.length) : f === 0 && (d++, E = [0]), _[a++] = d, f && E[0] ? E[P++] = O[z] || 0 : (E = [O[z]], P = 1);
              while ((z++ < W || E[0] !== void 0) && I--);
              v = E[0] !== void 0;
            }
            _[0] || _.shift();
          }
          if (g == 1) M.e = l, Le = v;
          else {
            for (a = 1, d = _[0]; d >= 10; d /= 10) a++;
            M.e = a + l * g - 1, p(M, u ? s + M.e + 1 : s, o, v);
          }
          return M;
        };
      })();
      function p(e, n, i, t) {
        var r, s, o, u, c, f, l, a, d, g = e.constructor;
        e: if (n != null) {
          if (a = e.d, !a) return e;
          for (r = 1, u = a[0]; u >= 10; u /= 10) r++;
          if (s = n - r, s < 0) s += m, o = n, l = a[d = 0], c = l / C(10, r - o - 1) % 10 | 0;
          else if (d = Math.ceil((s + 1) / m), u = a.length, d >= u) if (t) {
            for (; u++ <= d; ) a.push(0);
            l = c = 0, r = 1, s %= m, o = s - m + 1;
          } else break e;
          else {
            for (l = u = a[d], r = 1; u >= 10; u /= 10) r++;
            s %= m, o = s - m + r, c = o < 0 ? 0 : l / C(10, r - o - 1) % 10 | 0;
          }
          if (t = t || n < 0 || a[d + 1] !== void 0 || (o < 0 ? l : l % C(10, r - o - 1)), f = i < 4 ? (c || t) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (i == 4 || t || i == 6 && (s > 0 ? o > 0 ? l / C(10, r - o) : 0 : a[d - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), n < 1 || !a[0]) return a.length = 0, f ? (n -= e.e + 1, a[0] = C(10, (m - n % m) % m), e.e = -n || 0) : a[0] = e.e = 0, e;
          if (s == 0 ? (a.length = d, u = 1, d--) : (a.length = d + 1, u = C(10, m - s), a[d] = o > 0 ? (l / C(10, r - o) % C(10, o) | 0) * u : 0), f) for (; ; ) if (d == 0) {
            for (s = 1, o = a[0]; o >= 10; o /= 10) s++;
            for (o = a[0] += u, u = 1; o >= 10; o /= 10) u++;
            s != u && (e.e++, a[0] == D && (a[0] = 1));
            break;
          } else {
            if (a[d] += u, a[d] != D) break;
            a[d--] = 0, u = 1;
          }
          for (s = a.length; a[--s] === 0; ) a.pop();
        }
        return w && (e.e > g.maxE ? (e.d = null, e.e = NaN) : e.e < g.minE && (e.e = 0, e.d = [0])), e;
      }
      function L(e, n, i) {
        if (!e.isFinite()) return je(e);
        var t, r = e.e, s = b(e.d), o = s.length;
        return n ? (i && (t = i - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + U(t) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (s = "0." + U(-r - 1) + s, i && (t = i - o) > 0 && (s += U(t))) : r >= o ? (s += U(r + 1 - o), i && (t = i - r - 1) > 0 && (s = s + "." + U(t))) : ((t = r + 1) < o && (s = s.slice(0, t) + "." + s.slice(t)), i && (t = i - o) > 0 && (r + 1 === o && (s += "."), s += U(t))), s;
      }
      function ce(e, n) {
        var i = e[0];
        for (n *= m; i >= 10; i /= 10) n++;
        return n;
      }
      function ue(e, n, i) {
        if (n > hn) throw w = true, i && (e.precision = i), Error(Ie);
        return p(new e(se), n, 1, true);
      }
      function F(e, n, i) {
        if (n > Ce) throw Error(Ie);
        return p(new e(oe), n, i, true);
      }
      function $e(e) {
        var n = e.length - 1, i = n * m + 1;
        if (n = e[n], n) {
          for (; n % 10 == 0; n /= 10) i--;
          for (n = e[0]; n >= 10; n /= 10) i++;
        }
        return i;
      }
      function U(e) {
        for (var n = ""; e--; ) n += "0";
        return n;
      }
      function He(e, n, i, t) {
        var r, s = new e(1), o = Math.ceil(t / m + 4);
        for (w = false; ; ) {
          if (i % 2 && (s = s.times(n), De(s.d, o) && (r = true)), i = R(i / 2), i === 0) {
            i = s.d.length - 1, r && s.d[i] === 0 && ++s.d[i];
            break;
          }
          n = n.times(n), De(n.d, o);
        }
        return w = true, s;
      }
      function Te(e) {
        return e.d[e.d.length - 1] & 1;
      }
      function Ve(e, n, i) {
        for (var t, r, s = new e(n[0]), o = 0; ++o < n.length; ) {
          if (r = new e(n[o]), !r.s) {
            s = r;
            break;
          }
          t = s.cmp(r), (t === i || t === 0 && s.s === i) && (s = r);
        }
        return s;
      }
      function be(e, n) {
        var i, t, r, s, o, u, c, f = 0, l = 0, a = 0, d = e.constructor, g = d.rounding, v = d.precision;
        if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
        for (n == null ? (w = false, c = v) : c = n, u = new d(0.03125); e.e > -2; ) e = e.times(u), a += 5;
        for (t = Math.log(C(2, a)) / Math.LN10 * 2 + 5 | 0, c += t, i = s = o = new d(1), d.precision = c; ; ) {
          if (s = p(s.times(e), c, 1), i = i.times(++l), u = o.plus(k(s, i, c, 1)), b(u.d).slice(0, c) === b(o.d).slice(0, c)) {
            for (r = a; r--; ) o = p(o.times(o), c, 1);
            if (n == null) if (f < 3 && Q(o.d, c - t, g, f)) d.precision = c += 10, i = s = u = new d(1), l = 0, f++;
            else return p(o, d.precision = v, g, w = true);
            else return d.precision = v, o;
          }
          o = u;
        }
      }
      function B(e, n) {
        var i, t, r, s, o, u, c, f, l, a, d, g = 1, v = 10, N = e, A = N.d, M = N.constructor, _ = M.rounding, E = M.precision;
        if (N.s < 0 || !A || !A[0] || !N.e && A[0] == 1 && A.length == 1) return new M(A && !A[0] ? -1 / 0 : N.s != 1 ? NaN : A ? 0 : N);
        if (n == null ? (w = false, l = E) : l = n, M.precision = l += v, i = b(A), t = i.charAt(0), Math.abs(s = N.e) < 15e14) {
          for (; t < 7 && t != 1 || t == 1 && i.charAt(1) > 3; ) N = N.times(e), i = b(N.d), t = i.charAt(0), g++;
          s = N.e, t > 1 ? (N = new M("0." + i), s++) : N = new M(t + "." + i.slice(1));
        } else return f = ue(M, l + 2, E).times(s + ""), N = B(new M(t + "." + i.slice(1)), l - v).plus(f), M.precision = E, n == null ? p(N, E, _, w = true) : N;
        for (a = N, c = o = N = k(N.minus(1), N.plus(1), l, 1), d = p(N.times(N), l, 1), r = 3; ; ) {
          if (o = p(o.times(d), l, 1), f = c.plus(k(o, new M(r), l, 1)), b(f.d).slice(0, l) === b(c.d).slice(0, l)) if (c = c.times(2), s !== 0 && (c = c.plus(ue(M, l + 2, E).times(s + ""))), c = k(c, new M(g), l, 1), n == null) if (Q(c.d, l - v, _, u)) M.precision = l += v, f = o = N = k(a.minus(1), a.plus(1), l, 1), d = p(N.times(N), l, 1), r = u = 1;
          else return p(c, M.precision = E, _, w = true);
          else return M.precision = E, c;
          c = f, r += 2;
        }
      }
      function je(e) {
        return String(e.s * e.s / 0);
      }
      function re(e, n) {
        var i, t, r;
        for ((i = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (t = n.search(/e/i)) > 0 ? (i < 0 && (i = t), i += +n.slice(t + 1), n = n.substring(0, t)) : i < 0 && (i = n.length), t = 0; n.charCodeAt(t) === 48; t++) ;
        for (r = n.length; n.charCodeAt(r - 1) === 48; --r) ;
        if (n = n.slice(t, r), n) {
          if (r -= t, e.e = i = i - t - 1, e.d = [], t = (i + 1) % m, i < 0 && (t += m), t < r) {
            for (t && e.d.push(+n.slice(0, t)), r -= m; t < r; ) e.d.push(+n.slice(t, t += m));
            n = n.slice(t), t = m - n.length;
          } else t -= r;
          for (; t--; ) n += "0";
          e.d.push(+n), w && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
        } else e.e = 0, e.d = [0];
        return e;
      }
      function gn(e, n) {
        var i, t, r, s, o, u, c, f, l;
        if (n.indexOf("_") > -1) {
          if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Be.test(n)) return re(e, n);
        } else if (n === "Infinity" || n === "NaN") return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
        if (ln.test(n)) i = 16, n = n.toLowerCase();
        else if (cn.test(n)) i = 2;
        else if (an.test(n)) i = 8;
        else throw Error($ + n);
        for (s = n.search(/p/i), s > 0 ? (c = +n.slice(s + 1), n = n.substring(2, s)) : n = n.slice(2), s = n.indexOf("."), o = s >= 0, t = e.constructor, o && (n = n.replace(".", ""), u = n.length, s = u - s, r = He(t, new t(i), s, s * 2)), f = te(n, i, D), l = f.length - 1, s = l; f[s] === 0; --s) f.pop();
        return s < 0 ? new t(e.s * 0) : (e.e = ce(f, l), e.d = f, w = false, o && (e = k(e, r, u * 4)), c && (e = e.times(Math.abs(c) < 54 ? C(2, c) : Y.pow(2, c))), w = true, e);
      }
      function mn(e, n) {
        var i, t = n.d.length;
        if (t < 3) return n.isZero() ? n : j(e, 2, n, n);
        i = 1.4 * Math.sqrt(t), i = i > 16 ? 16 : i | 0, n = n.times(1 / le(5, i)), n = j(e, 2, n, n);
        for (var r, s = new e(5), o = new e(16), u = new e(20); i--; ) r = n.times(n), n = n.times(s.plus(r.times(o.times(r).minus(u))));
        return n;
      }
      function j(e, n, i, t, r) {
        var s, o, u, c, f = 1, l = e.precision, a = Math.ceil(l / m);
        for (w = false, c = i.times(i), u = new e(t); ; ) {
          if (o = k(u.times(c), new e(n++ * n++), l, 1), u = r ? t.plus(o) : t.minus(o), t = k(o.times(c), new e(n++ * n++), l, 1), o = u.plus(t), o.d[a] !== void 0) {
            for (s = a; o.d[s] === u.d[s] && s--; ) ;
            if (s == -1) break;
          }
          s = u, u = t, t = o, o = s, f++;
        }
        return w = true, o.d.length = a + 1, o;
      }
      function le(e, n) {
        for (var i = e; --n; ) i *= e;
        return i;
      }
      function We(e, n) {
        var i, t = n.s < 0, r = F(e, e.precision, 1), s = r.times(0.5);
        if (n = n.abs(), n.lte(s)) return Z = t ? 4 : 1, n;
        if (i = n.divToInt(r), i.isZero()) Z = t ? 3 : 2;
        else {
          if (n = n.minus(i.times(r)), n.lte(s)) return Z = Te(i) ? t ? 2 : 3 : t ? 4 : 1, n;
          Z = Te(i) ? t ? 1 : 4 : t ? 3 : 2;
        }
        return n.minus(r).abs();
      }
      function Pe(e, n, i, t) {
        var r, s, o, u, c, f, l, a, d, g = e.constructor, v = i !== void 0;
        if (v ? (q(i, 1, H), t === void 0 ? t = g.rounding : q(t, 0, 8)) : (i = g.precision, t = g.rounding), !e.isFinite()) l = je(e);
        else {
          for (l = L(e), o = l.indexOf("."), v ? (r = 2, n == 16 ? i = i * 4 - 3 : n == 8 && (i = i * 3 - 2)) : r = n, o >= 0 && (l = l.replace(".", ""), d = new g(1), d.e = l.length - o, d.d = te(L(d), 10, r), d.e = d.d.length), a = te(l, 10, r), s = c = a.length; a[--c] == 0; ) a.pop();
          if (!a[0]) l = v ? "0p+0" : "0";
          else {
            if (o < 0 ? s-- : (e = new g(e), e.d = a, e.e = s, e = k(e, d, i, t, 0, r), a = e.d, s = e.e, f = Le), o = a[i], u = r / 2, f = f || a[i + 1] !== void 0, f = t < 4 ? (o !== void 0 || f) && (t === 0 || t === (e.s < 0 ? 3 : 2)) : o > u || o === u && (t === 4 || f || t === 6 && a[i - 1] & 1 || t === (e.s < 0 ? 8 : 7)), a.length = i, f) for (; ++a[--i] > r - 1; ) a[i] = 0, i || (++s, a.unshift(1));
            for (c = a.length; !a[c - 1]; --c) ;
            for (o = 0, l = ""; o < c; o++) l += Se.charAt(a[o]);
            if (v) {
              if (c > 1) if (n == 16 || n == 8) {
                for (o = n == 16 ? 4 : 3, --c; c % o; c++) l += "0";
                for (a = te(l, r, n), c = a.length; !a[c - 1]; --c) ;
                for (o = 1, l = "1."; o < c; o++) l += Se.charAt(a[o]);
              } else l = l.charAt(0) + "." + l.slice(1);
              l = l + (s < 0 ? "p" : "p+") + s;
            } else if (s < 0) {
              for (; ++s; ) l = "0" + l;
              l = "0." + l;
            } else if (++s > c) for (s -= c; s--; ) l += "0";
            else s < c && (l = l.slice(0, s) + "." + l.slice(s));
          }
          l = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + l;
        }
        return e.s < 0 ? "-" + l : l;
      }
      function De(e, n) {
        if (e.length > n) return e.length = n, true;
      }
      function wn(e) {
        return new this(e).abs();
      }
      function Nn(e) {
        return new this(e).acos();
      }
      function vn(e) {
        return new this(e).acosh();
      }
      function En(e, n) {
        return new this(e).plus(n);
      }
      function kn(e) {
        return new this(e).asin();
      }
      function Sn(e) {
        return new this(e).asinh();
      }
      function Mn(e) {
        return new this(e).atan();
      }
      function Cn(e) {
        return new this(e).atanh();
      }
      function bn(e, n) {
        e = new this(e), n = new this(n);
        var i, t = this.precision, r = this.rounding, s = t + 4;
        return !e.s || !n.s ? i = new this(NaN) : !e.d && !n.d ? (i = F(this, s, 1).times(n.s > 0 ? 0.25 : 0.75), i.s = e.s) : !n.d || e.isZero() ? (i = n.s < 0 ? F(this, t, r) : new this(0), i.s = e.s) : !e.d || n.isZero() ? (i = F(this, s, 1).times(0.5), i.s = e.s) : n.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(k(e, n, s, 1)), n = F(this, s, 1), this.precision = t, this.rounding = r, i = e.s < 0 ? i.minus(n) : i.plus(n)) : i = this.atan(k(e, n, s, 1)), i;
      }
      function Pn(e) {
        return new this(e).cbrt();
      }
      function On(e) {
        return p(e = new this(e), e.e + 1, 2);
      }
      function Rn(e, n, i) {
        return new this(e).clamp(n, i);
      }
      function An(e) {
        if (!e || typeof e != "object") throw Error(fe + "Object expected");
        var n, i, t, r = e.defaults === true, s = ["precision", 1, H, "rounding", 0, 8, "toExpNeg", -V, 0, "toExpPos", 0, V, "maxE", 0, V, "minE", -V, 0, "modulo", 0, 9];
        for (n = 0; n < s.length; n += 3) if (i = s[n], r && (this[i] = Me[i]), (t = e[i]) !== void 0) if (R(t) === t && t >= s[n + 1] && t <= s[n + 2]) this[i] = t;
        else throw Error($ + i + ": " + t);
        if (i = "crypto", r && (this[i] = Me[i]), (t = e[i]) !== void 0) if (t === true || t === false || t === 0 || t === 1) if (t) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[i] = true;
        else throw Error(Ze);
        else this[i] = false;
        else throw Error($ + i + ": " + t);
        return this;
      }
      function qn(e) {
        return new this(e).cos();
      }
      function _n(e) {
        return new this(e).cosh();
      }
      function Ge(e) {
        var n, i, t;
        function r(s) {
          var o, u, c, f = this;
          if (!(f instanceof r)) return new r(s);
          if (f.constructor = r, Fe(s)) {
            f.s = s.s, w ? !s.d || s.e > r.maxE ? (f.e = NaN, f.d = null) : s.e < r.minE ? (f.e = 0, f.d = [0]) : (f.e = s.e, f.d = s.d.slice()) : (f.e = s.e, f.d = s.d ? s.d.slice() : s.d);
            return;
          }
          if (c = typeof s, c === "number") {
            if (s === 0) {
              f.s = 1 / s < 0 ? -1 : 1, f.e = 0, f.d = [0];
              return;
            }
            if (s < 0 ? (s = -s, f.s = -1) : f.s = 1, s === ~~s && s < 1e7) {
              for (o = 0, u = s; u >= 10; u /= 10) o++;
              w ? o > r.maxE ? (f.e = NaN, f.d = null) : o < r.minE ? (f.e = 0, f.d = [0]) : (f.e = o, f.d = [s]) : (f.e = o, f.d = [s]);
              return;
            }
            if (s * 0 !== 0) {
              s || (f.s = NaN), f.e = NaN, f.d = null;
              return;
            }
            return re(f, s.toString());
          }
          if (c === "string") return (u = s.charCodeAt(0)) === 45 ? (s = s.slice(1), f.s = -1) : (u === 43 && (s = s.slice(1)), f.s = 1), Be.test(s) ? re(f, s) : gn(f, s);
          if (c === "bigint") return s < 0 ? (s = -s, f.s = -1) : f.s = 1, re(f, s.toString());
          throw Error($ + s);
        }
        if (r.prototype = h, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = An, r.clone = Ge, r.isDecimal = Fe, r.abs = wn, r.acos = Nn, r.acosh = vn, r.add = En, r.asin = kn, r.asinh = Sn, r.atan = Mn, r.atanh = Cn, r.atan2 = bn, r.cbrt = Pn, r.ceil = On, r.clamp = Rn, r.cos = qn, r.cosh = _n, r.div = Tn, r.exp = Dn, r.floor = Fn, r.hypot = Ln, r.ln = In, r.log = Zn, r.log10 = Bn, r.log2 = Un, r.max = $n, r.min = Hn, r.mod = Vn, r.mul = jn, r.pow = Wn, r.random = Gn, r.round = Jn, r.sign = Xn, r.sin = Kn, r.sinh = Qn, r.sqrt = Yn, r.sub = xn, r.sum = zn, r.tan = yn, r.tanh = ei, r.trunc = ni, e === void 0 && (e = {}), e && e.defaults !== true) for (t = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < t.length; ) e.hasOwnProperty(i = t[n++]) || (e[i] = this[i]);
        return r.config(e), r;
      }
      function Tn(e, n) {
        return new this(e).div(n);
      }
      function Dn(e) {
        return new this(e).exp();
      }
      function Fn(e) {
        return p(e = new this(e), e.e + 1, 3);
      }
      function Ln() {
        var e, n, i = new this(0);
        for (w = false, e = 0; e < arguments.length; ) if (n = new this(arguments[e++]), n.d) i.d && (i = i.plus(n.times(n)));
        else {
          if (n.s) return w = true, new this(1 / 0);
          i = n;
        }
        return w = true, i.sqrt();
      }
      function Fe(e) {
        return e instanceof Y || e && e.toStringTag === Ue || false;
      }
      function In(e) {
        return new this(e).ln();
      }
      function Zn(e, n) {
        return new this(e).log(n);
      }
      function Un(e) {
        return new this(e).log(2);
      }
      function Bn(e) {
        return new this(e).log(10);
      }
      function $n() {
        return Ve(this, arguments, -1);
      }
      function Hn() {
        return Ve(this, arguments, 1);
      }
      function Vn(e, n) {
        return new this(e).mod(n);
      }
      function jn(e, n) {
        return new this(e).mul(n);
      }
      function Wn(e, n) {
        return new this(e).pow(n);
      }
      function Gn(e) {
        var n, i, t, r, s = 0, o = new this(1), u = [];
        if (e === void 0 ? e = this.precision : q(e, 1, H), t = Math.ceil(e / m), this.crypto) if (crypto.getRandomValues) for (n = crypto.getRandomValues(new Uint32Array(t)); s < t; ) r = n[s], r >= 429e7 ? n[s] = crypto.getRandomValues(new Uint32Array(1))[0] : u[s++] = r % 1e7;
        else if (crypto.randomBytes) {
          for (n = crypto.randomBytes(t *= 4); s < t; ) r = n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, s) : (u.push(r % 1e7), s += 4);
          s = t / 4;
        } else throw Error(Ze);
        else for (; s < t; ) u[s++] = Math.random() * 1e7 | 0;
        for (t = u[--s], e %= m, t && e && (r = C(10, m - e), u[s] = (t / r | 0) * r); u[s] === 0; s--) u.pop();
        if (s < 0) i = 0, u = [0];
        else {
          for (i = -1; u[0] === 0; i -= m) u.shift();
          for (t = 1, r = u[0]; r >= 10; r /= 10) t++;
          t < m && (i -= m - t);
        }
        return o.e = i, o.d = u, o;
      }
      function Jn(e) {
        return p(e = new this(e), e.e + 1, this.rounding);
      }
      function Xn(e) {
        return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
      }
      function Kn(e) {
        return new this(e).sin();
      }
      function Qn(e) {
        return new this(e).sinh();
      }
      function Yn(e) {
        return new this(e).sqrt();
      }
      function xn(e, n) {
        return new this(e).sub(n);
      }
      function zn() {
        var e = 0, n = arguments, i = new this(n[e]);
        for (w = false; i.s && ++e < n.length; ) i = i.plus(n[e]);
        return w = true, p(i, this.precision, this.rounding);
      }
      function yn(e) {
        return new this(e).tan();
      }
      function ei(e) {
        return new this(e).tanh();
      }
      function ni(e) {
        return p(e = new this(e), e.e + 1, 1);
      }
      h[Symbol.for("nodejs.util.inspect.custom")] = h.toString;
      h[Symbol.toStringTag] = "Decimal";
      var Y = h.constructor = Ge(Me);
      se = new Y(se);
      oe = new Y(oe);
      var Je = Y;
    }
  });

  // node_modules/.prisma/client/index-browser.js
  var require_index_browser2 = __commonJS({
    "node_modules/.prisma/client/index-browser.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      var {
        Decimal: Decimal2,
        objectEnumValues: objectEnumValues2,
        makeStrictEnum: makeStrictEnum2,
        Public: Public2,
        getRuntime: getRuntime2,
        skip
      } = require_index_browser();
      var Prisma2 = {};
      exports.Prisma = Prisma2;
      exports.$Enums = {};
      Prisma2.prismaVersion = {
        client: "6.19.3",
        engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7"
      };
      Prisma2.PrismaClientKnownRequestError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientUnknownRequestError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientRustPanicError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientInitializationError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.PrismaClientValidationError = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.Decimal = Decimal2;
      Prisma2.sql = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.empty = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.join = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.raw = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.validator = Public2.validator;
      Prisma2.getExtensionContext = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.defineExtension = () => {
        const runtimeName = getRuntime2().prettyName;
        throw new Error(
          `Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
        );
      };
      Prisma2.DbNull = objectEnumValues2.instances.DbNull;
      Prisma2.JsonNull = objectEnumValues2.instances.JsonNull;
      Prisma2.AnyNull = objectEnumValues2.instances.AnyNull;
      Prisma2.NullTypes = {
        DbNull: objectEnumValues2.classes.DbNull,
        JsonNull: objectEnumValues2.classes.JsonNull,
        AnyNull: objectEnumValues2.classes.AnyNull
      };
      exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
        Serializable: "Serializable"
      });
      exports.Prisma.SessionScalarFieldEnum = {
        id: "id",
        shop: "shop",
        state: "state",
        isOnline: "isOnline",
        scope: "scope",
        expires: "expires",
        accessToken: "accessToken",
        userId: "userId",
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        accountOwner: "accountOwner",
        locale: "locale",
        collaborator: "collaborator",
        emailVerified: "emailVerified",
        refreshToken: "refreshToken",
        refreshTokenExpires: "refreshTokenExpires"
      };
      exports.Prisma.SchemaGroupScalarFieldEnum = {
        id: "id",
        name: "name",
        slug: "slug",
        shop: "shop",
        createdAt: "createdAt",
        updatedAt: "updatedAt"
      };
      exports.Prisma.SchemaScalarFieldEnum = {
        id: "id",
        groupId: "groupId",
        type: "type",
        name: "name",
        mode: "mode",
        jsonContent: "jsonContent",
        formData: "formData",
        faqRows: "faqRows",
        breadcrumbs: "breadcrumbs",
        sortOrder: "sortOrder",
        createdAt: "createdAt",
        updatedAt: "updatedAt"
      };
      exports.Prisma.SchemaTargetScalarFieldEnum = {
        id: "id",
        groupId: "groupId",
        injectType: "injectType",
        pageIds: "pageIds",
        postIds: "postIds",
        createdAt: "createdAt",
        updatedAt: "updatedAt"
      };
      exports.Prisma.SortOrder = {
        asc: "asc",
        desc: "desc"
      };
      exports.Prisma.NullsOrder = {
        first: "first",
        last: "last"
      };
      exports.Prisma.ModelName = {
        Session: "Session",
        SchemaGroup: "SchemaGroup",
        Schema: "Schema",
        SchemaTarget: "SchemaTarget"
      };
      var PrismaClient2 = class {
        constructor() {
          return new Proxy(this, {
            get(target, prop) {
              let message2;
              const runtime = getRuntime2();
              if (runtime.isEdge) {
                message2 = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
              } else {
                message2 = "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" + runtime.prettyName + "`).";
              }
              message2 += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;
              throw new Error(message2);
            }
          });
        }
      };
      exports.PrismaClient = PrismaClient2;
      Object.assign(exports, Prisma2);
    }
  });

  // node_modules/@prisma/client/index-browser.js
  var require_index_browser3 = __commonJS({
    "node_modules/@prisma/client/index-browser.js"(exports, module) {
      var prisma2 = require_index_browser2();
      module.exports = prisma2;
    }
  });

  // app/routes/app._index.jsx
  var import_react = __toESM(require_react(), 1);

  // node_modules/react-router/dist/development/chunk-62JRHF6Z.mjs
  var React = __toESM(require_react(), 1);
  var React2 = __toESM(require_react(), 1);
  var React3 = __toESM(require_react(), 1);
  var React4 = __toESM(require_react(), 1);
  var React9 = __toESM(require_react(), 1);
  var React8 = __toESM(require_react(), 1);
  var React7 = __toESM(require_react(), 1);
  var React6 = __toESM(require_react(), 1);
  var React5 = __toESM(require_react(), 1);
  var React10 = __toESM(require_react(), 1);
  var React11 = __toESM(require_react(), 1);
  var import_meta = {};
  var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i;
  var PROTOCOL_RELATIVE_URL_REGEX = /^[\\/]{2}/;
  function normalizeProtocolRelativeUrl(url, protocol) {
    return protocol + url.replace(/\\/g, "/");
  }
  function invariant(value, message2) {
    if (value === false || value === null || typeof value === "undefined") {
      throw new Error(message2);
    }
  }
  function warning(cond, message2) {
    if (!cond) {
      if (typeof console !== "undefined") console.warn(message2);
      try {
        throw new Error(message2);
      } catch (e) {
      }
    }
  }
  function createPath({
    pathname = "/",
    search = "",
    hash = ""
  }) {
    if (search && search !== "?")
      pathname += search.charAt(0) === "?" ? search : "?" + search;
    if (hash && hash !== "#")
      pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
    return pathname;
  }
  function parsePath(path) {
    let parsedPath = {};
    if (path) {
      let hashIndex = path.indexOf("#");
      if (hashIndex >= 0) {
        parsedPath.hash = path.substring(hashIndex);
        path = path.substring(0, hashIndex);
      }
      let searchIndex = path.indexOf("?");
      if (searchIndex >= 0) {
        parsedPath.search = path.substring(searchIndex);
        path = path.substring(0, searchIndex);
      }
      if (path) {
        parsedPath.pathname = path;
      }
    }
    return parsedPath;
  }
  var _map;
  _map = /* @__PURE__ */ new WeakMap();
  function matchRoutes(routes, locationArg, basename = "/") {
    return matchRoutesImpl(routes, locationArg, basename, false);
  }
  function matchRoutesImpl(routes, locationArg, basename, allowPartial, precomputedBranches) {
    let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    let pathname = stripBasename(location.pathname || "/", basename);
    if (pathname == null) {
      return null;
    }
    let branches = precomputedBranches ?? flattenAndRankRoutes(routes);
    let matches = null;
    let decoded = decodePath(pathname);
    for (let i = 0; matches == null && i < branches.length; ++i) {
      matches = matchRouteBranch(
        branches[i],
        decoded,
        allowPartial
      );
    }
    return matches;
  }
  function convertRouteMatchToUiMatch(match, loaderData) {
    let { route, pathname, params } = match;
    return {
      id: route.id,
      pathname,
      params,
      data: loaderData[route.id],
      loaderData: loaderData[route.id],
      handle: route.handle
    };
  }
  function flattenAndRankRoutes(routes) {
    let branches = flattenRoutes(routes);
    rankRouteBranches(branches);
    return branches;
  }
  function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = "", _hasParentOptionalSegments = false) {
    let flattenRoute = (route, index, hasParentOptionalSegments = _hasParentOptionalSegments, relativePath) => {
      let meta = {
        relativePath: relativePath === void 0 ? route.path || "" : relativePath,
        caseSensitive: route.caseSensitive === true,
        childrenIndex: index,
        route
      };
      if (meta.relativePath.startsWith("/")) {
        if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
          return;
        }
        invariant(
          meta.relativePath.startsWith(parentPath),
          `Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
        );
        meta.relativePath = meta.relativePath.slice(parentPath.length);
      }
      let path = joinPaths([parentPath, meta.relativePath]);
      let routesMeta = parentsMeta.concat(meta);
      if (route.children && route.children.length > 0) {
        invariant(
          // Our types know better, but runtime JS may not!
          // @ts-expect-error
          route.index !== true,
          `Index routes must not have child routes. Please remove all child routes from route path "${path}".`
        );
        flattenRoutes(
          route.children,
          branches,
          routesMeta,
          path,
          hasParentOptionalSegments
        );
      }
      if (route.path == null && !route.index) {
        return;
      }
      branches.push({
        path,
        score: computeScore(path, route.index),
        routesMeta: routesMeta.map((meta2, i) => {
          let [matcher, params] = compilePath(
            meta2.relativePath,
            meta2.caseSensitive,
            i === routesMeta.length - 1
          );
          return {
            ...meta2,
            matcher,
            compiledParams: params
          };
        })
      });
    };
    routes.forEach((route, index) => {
      if (route.path === "" || !route.path?.includes("?")) {
        flattenRoute(route, index);
      } else {
        for (let exploded of explodeOptionalSegments(route.path)) {
          flattenRoute(route, index, true, exploded);
        }
      }
    });
    return branches;
  }
  function explodeOptionalSegments(path) {
    let segments = path.split("/");
    if (segments.length === 0) return [];
    let [first, ...rest] = segments;
    let isOptional = first.endsWith("?");
    let required = first.replace(/\?$/, "");
    if (rest.length === 0) {
      return isOptional ? [required, ""] : [required];
    }
    let restExploded = explodeOptionalSegments(rest.join("/"));
    let result = [];
    result.push(
      ...restExploded.map(
        (subpath) => subpath === "" ? required : [required, subpath].join("/")
      )
    );
    if (isOptional) {
      result.push(...restExploded);
    }
    return result.map(
      (exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded
    );
  }
  function rankRouteBranches(branches) {
    branches.sort(
      (a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(
        a.routesMeta.map((meta) => meta.childrenIndex),
        b.routesMeta.map((meta) => meta.childrenIndex)
      )
    );
  }
  var paramRe = /^:[\w-]+$/;
  var dynamicSegmentValue = 3;
  var indexRouteValue = 2;
  var emptySegmentValue = 1;
  var staticSegmentValue = 10;
  var splatPenalty = -2;
  var isSplat = (s) => s === "*";
  function computeScore(path, index) {
    let segments = path.split("/");
    let initialScore = segments.length;
    if (segments.some(isSplat)) {
      initialScore += splatPenalty;
    }
    if (index) {
      initialScore += indexRouteValue;
    }
    return segments.filter((s) => !isSplat(s)).reduce(
      (score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue),
      initialScore
    );
  }
  function compareIndexes(a, b) {
    let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
    return siblings ? (
      // If two routes are siblings, we should try to match the earlier sibling
      // first. This allows people to have fine-grained control over the matching
      // behavior by simply putting routes with identical paths in the order they
      // want them tried.
      a[a.length - 1] - b[b.length - 1]
    ) : (
      // Otherwise, it doesn't really make sense to rank non-siblings by index,
      // so they sort equally.
      0
    );
  }
  function matchRouteBranch(branch, pathname, allowPartial = false) {
    let { routesMeta } = branch;
    let matchedParams = {};
    let matchedPathname = "/";
    let matches = [];
    for (let i = 0; i < routesMeta.length; ++i) {
      let meta = routesMeta[i];
      let end = i === routesMeta.length - 1;
      let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
      let pattern2 = {
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end
      };
      let match = (
        // Use precomputed matcher if it exists
        meta.matcher && meta.compiledParams ? matchPathImpl(
          pattern2,
          remainingPathname,
          meta.matcher,
          meta.compiledParams
        ) : matchPath(pattern2, remainingPathname)
      );
      let route = meta.route;
      if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
        match = matchPath(
          {
            path: meta.relativePath,
            caseSensitive: meta.caseSensitive,
            end: false
          },
          remainingPathname
        );
      }
      if (!match) {
        return null;
      }
      Object.assign(matchedParams, match.params);
      matches.push({
        // TODO: Can this as be avoided?
        params: matchedParams,
        pathname: joinPaths([matchedPathname, match.pathname]),
        pathnameBase: normalizePathname(
          joinPaths([matchedPathname, match.pathnameBase])
        ),
        route
      });
      if (match.pathnameBase !== "/") {
        matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
      }
    }
    return matches;
  }
  function matchPath(pattern2, pathname) {
    if (typeof pattern2 === "string") {
      pattern2 = { path: pattern2, caseSensitive: false, end: true };
    }
    let [matcher, compiledParams] = compilePath(
      pattern2.path,
      pattern2.caseSensitive,
      pattern2.end
    );
    return matchPathImpl(pattern2, pathname, matcher, compiledParams);
  }
  function matchPathImpl(pattern2, pathname, matcher, compiledParams) {
    let match = pathname.match(matcher);
    if (!match) return null;
    let matchedPathname = match[0];
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
    let captureGroups = match.slice(1);
    let params = compiledParams.reduce(
      (memo2, { paramName, isOptional }, index) => {
        if (paramName === "*") {
          let splatValue = captureGroups[index] || "";
          pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
        }
        const value = captureGroups[index];
        if (isOptional && !value) {
          memo2[paramName] = void 0;
        } else {
          memo2[paramName] = (value || "").replace(/%2F/g, "/");
        }
        return memo2;
      },
      {}
    );
    return {
      params,
      pathname: matchedPathname,
      pathnameBase,
      pattern: pattern2
    };
  }
  function compilePath(path, caseSensitive = false, end = true) {
    warning(
      path === "*" || !path.endsWith("*") || path.endsWith("/*"),
      `Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`
    );
    let params = [];
    let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
      /\/:([\w-]+)(\?)?/g,
      (match, paramName, isOptional, index, str) => {
        params.push({ paramName, isOptional: isOptional != null });
        if (isOptional) {
          let nextChar = str.charAt(index + match.length);
          if (nextChar && nextChar !== "/") {
            return "/([^\\/]*)";
          }
          return "(?:/([^\\/]*))?";
        }
        return "/([^\\/]+)";
      }
    ).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    if (path.endsWith("*")) {
      params.push({ paramName: "*" });
      regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
    } else if (end) {
      regexpSource += "\\/*$";
    } else if (path !== "" && path !== "/") {
      regexpSource += "(?:(?=\\/|$))";
    } else {
    }
    let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
    return [matcher, params];
  }
  function decodePath(value) {
    try {
      return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
    } catch (error) {
      warning(
        false,
        `The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`
      );
      return value;
    }
  }
  function stripBasename(pathname, basename) {
    if (basename === "/") return pathname;
    if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
      return null;
    }
    let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
    let nextChar = pathname.charAt(startIndex);
    if (nextChar && nextChar !== "/") {
      return null;
    }
    return pathname.slice(startIndex) || "/";
  }
  function resolvePath(to, fromPathname = "/") {
    let {
      pathname: toPathname,
      search = "",
      hash = ""
    } = typeof to === "string" ? parsePath(to) : to;
    let pathname;
    if (toPathname) {
      toPathname = removeDoubleSlashes(toPathname);
      if (toPathname.startsWith("/")) {
        pathname = resolvePathname(toPathname.substring(1), "/");
      } else {
        pathname = resolvePathname(toPathname, fromPathname);
      }
    } else {
      pathname = fromPathname;
    }
    return {
      pathname,
      search: normalizeSearch(search),
      hash: normalizeHash(hash)
    };
  }
  function resolvePathname(relativePath, fromPathname) {
    let segments = removeTrailingSlash(fromPathname).split("/");
    let relativeSegments = relativePath.split("/");
    relativeSegments.forEach((segment) => {
      if (segment === "..") {
        if (segments.length > 1) segments.pop();
      } else if (segment !== ".") {
        segments.push(segment);
      }
    });
    return segments.length > 1 ? segments.join("/") : "/";
  }
  function getInvalidPathError(char, field, dest, path) {
    return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
      path
    )}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
  }
  function getPathContributingMatches(matches) {
    return matches.filter(
      (match, index) => index === 0 || match.route.path && match.route.path.length > 0
    );
  }
  function getResolveToMatches(matches) {
    let pathMatches = getPathContributingMatches(matches);
    return pathMatches.map(
      (match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase
    );
  }
  function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
    let to;
    if (typeof toArg === "string") {
      to = parsePath(toArg);
    } else {
      to = { ...toArg };
      invariant(
        !to.pathname || !to.pathname.includes("?"),
        getInvalidPathError("?", "pathname", "search", to)
      );
      invariant(
        !to.pathname || !to.pathname.includes("#"),
        getInvalidPathError("#", "pathname", "hash", to)
      );
      invariant(
        !to.search || !to.search.includes("#"),
        getInvalidPathError("#", "search", "hash", to)
      );
    }
    let isEmptyPath = toArg === "" || to.pathname === "";
    let toPathname = isEmptyPath ? "/" : to.pathname;
    let from;
    if (toPathname == null) {
      from = locationPathname;
    } else {
      let routePathnameIndex = routePathnames.length - 1;
      if (!isPathRelative && toPathname.startsWith("..")) {
        let toSegments = toPathname.split("/");
        while (toSegments[0] === "..") {
          toSegments.shift();
          routePathnameIndex -= 1;
        }
        to.pathname = toSegments.join("/");
      }
      from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
    }
    let path = resolvePath(to, from);
    let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
    let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
    if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
      path.pathname += "/";
    }
    return path;
  }
  var removeDoubleSlashes = (path) => path.replace(/[\\/]{2,}/g, "/");
  var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
  var removeTrailingSlash = (path) => path.replace(/\/+$/, "");
  var normalizePathname = (pathname) => removeTrailingSlash(pathname).replace(/^\/*/, "/");
  var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
  var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
  var redirect = (url, init = 302) => {
    let responseInit = init;
    if (typeof responseInit === "number") {
      responseInit = { status: responseInit };
    } else if (typeof responseInit.status === "undefined") {
      responseInit.status = 302;
    }
    let headers2 = new Headers(responseInit.headers);
    headers2.set("Location", url);
    return new Response(null, { ...responseInit, headers: headers2 });
  };
  var ErrorResponseImpl = class {
    constructor(status, statusText, data2, internal = false) {
      this.status = status;
      this.statusText = statusText || "";
      this.internal = internal;
      if (data2 instanceof Error) {
        this.data = data2.toString();
        this.error = data2;
      } else {
        this.data = data2;
      }
    }
  };
  function isRouteErrorResponse(error) {
    return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
  }
  function getRoutePattern(matches) {
    let parts = matches.map((m) => m.route.path).filter(Boolean);
    return joinPaths(parts) || "/";
  }
  var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  function parseToInfo(_to, basename) {
    let to = _to;
    if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
      return {
        absoluteURL: void 0,
        isExternal: false,
        to
      };
    }
    let absoluteURL = to;
    let isExternal = false;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = PROTOCOL_RELATIVE_URL_REGEX.test(to) ? new URL(normalizeProtocolRelativeUrl(to, currentUrl.protocol)) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        warning(
          false,
          `<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    }
    return {
      absoluteURL,
      isExternal,
      to
    };
  }
  var UninstrumentedSymbol = Symbol("Uninstrumented");
  var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  var validMutationMethodsArr = [
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  ];
  var validMutationMethods = new Set(
    validMutationMethodsArr
  );
  var validRequestMethodsArr = [
    "GET",
    ...validMutationMethodsArr
  ];
  var validRequestMethods = new Set(validRequestMethodsArr);
  var IDLE_FETCHER = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
  var ResetLoaderDataSymbol = Symbol("ResetLoaderData");
  var _routes;
  var _branches;
  var _hmrRoutes;
  var _hmrBranches;
  _routes = /* @__PURE__ */ new WeakMap();
  _branches = /* @__PURE__ */ new WeakMap();
  _hmrRoutes = /* @__PURE__ */ new WeakMap();
  _hmrBranches = /* @__PURE__ */ new WeakMap();
  var invalidProtocols = [
    "about:",
    "blob:",
    "chrome:",
    "chrome-untrusted:",
    "content:",
    "data:",
    "devtools:",
    "file:",
    "filesystem:",
    // eslint-disable-next-line no-script-url
    "javascript:"
  ];
  function hasInvalidProtocol(location) {
    try {
      return invalidProtocols.includes(new URL(location).protocol);
    } catch {
      return false;
    }
  }
  var DataRouterContext = React.createContext(null);
  DataRouterContext.displayName = "DataRouter";
  var DataRouterStateContext = React.createContext(null);
  DataRouterStateContext.displayName = "DataRouterState";
  var RSCRouterContext = React.createContext(false);
  function useIsRSCRouterContext() {
    return React.useContext(RSCRouterContext);
  }
  var ViewTransitionContext = React.createContext({
    isTransitioning: false
  });
  ViewTransitionContext.displayName = "ViewTransition";
  var FetchersContext = React.createContext(
    /* @__PURE__ */ new Map()
  );
  FetchersContext.displayName = "Fetchers";
  var AwaitContext = React.createContext(null);
  AwaitContext.displayName = "Await";
  var NavigationContext = React.createContext(
    null
  );
  NavigationContext.displayName = "Navigation";
  var LocationContext = React.createContext(
    null
  );
  LocationContext.displayName = "Location";
  var RouteContext = React.createContext({
    outlet: null,
    matches: [],
    isDataRoute: false
  });
  RouteContext.displayName = "Route";
  var RouteErrorContext = React.createContext(null);
  RouteErrorContext.displayName = "RouteError";
  var ENABLE_DEV_WARNINGS = true;
  var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR";
  var ERROR_DIGEST_REDIRECT = "REDIRECT";
  var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE";
  function decodeRedirectErrorDigest(digest) {
    if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
      try {
        let parsed = JSON.parse(digest.slice(28));
        if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string" && typeof parsed.location === "string" && typeof parsed.reloadDocument === "boolean" && typeof parsed.replace === "boolean") {
          return parsed;
        }
      } catch {
      }
    }
  }
  function decodeRouteErrorResponseDigest(digest) {
    if (digest.startsWith(
      `${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`
    )) {
      try {
        let parsed = JSON.parse(digest.slice(40));
        if (typeof parsed === "object" && parsed && typeof parsed.status === "number" && typeof parsed.statusText === "string") {
          return new ErrorResponseImpl(
            parsed.status,
            parsed.statusText,
            parsed.data
          );
        }
      } catch {
      }
    }
  }
  function useHref(to, { relative } = {}) {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useHref() may be used only in the context of a <Router> component.`
    );
    let { basename, navigator: navigator2 } = React2.useContext(NavigationContext);
    let { hash, pathname, search } = useResolvedPath(to, { relative });
    let joinedPathname = pathname;
    if (basename !== "/") {
      joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
    }
    return navigator2.createHref({ pathname: joinedPathname, search, hash });
  }
  function useInRouterContext() {
    return React2.useContext(LocationContext) != null;
  }
  function useLocation() {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useLocation() may be used only in the context of a <Router> component.`
    );
    return React2.useContext(LocationContext).location;
  }
  var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
  function useIsomorphicLayoutEffect(cb) {
    let isStatic = React2.useContext(NavigationContext).static;
    if (!isStatic) {
      React2.useLayoutEffect(cb);
    }
  }
  function useNavigate() {
    let { isDataRoute } = React2.useContext(RouteContext);
    return isDataRoute ? useNavigateStable() : useNavigateUnstable();
  }
  function useNavigateUnstable() {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useNavigate() may be used only in the context of a <Router> component.`
    );
    let dataRouterContext = React2.useContext(DataRouterContext);
    let { basename, navigator: navigator2 } = React2.useContext(NavigationContext);
    let { matches } = React2.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
    let activeRef = React2.useRef(false);
    useIsomorphicLayoutEffect(() => {
      activeRef.current = true;
    });
    let navigate = React2.useCallback(
      (to, options = {}) => {
        warning(activeRef.current, navigateEffectWarning);
        if (!activeRef.current) return;
        if (typeof to === "number") {
          navigator2.go(to);
          return;
        }
        let path = resolveTo(
          to,
          JSON.parse(routePathnamesJson),
          locationPathname,
          options.relative === "path"
        );
        if (dataRouterContext == null && basename !== "/") {
          path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
        }
        (!!options.replace ? navigator2.replace : navigator2.push)(
          path,
          options.state,
          options
        );
      },
      [
        basename,
        navigator2,
        routePathnamesJson,
        locationPathname,
        dataRouterContext
      ]
    );
    return navigate;
  }
  var OutletContext = React2.createContext(null);
  function useResolvedPath(to, { relative } = {}) {
    let { matches } = React2.useContext(RouteContext);
    let { pathname: locationPathname } = useLocation();
    let routePathnamesJson = JSON.stringify(getResolveToMatches(matches));
    return React2.useMemo(
      () => resolveTo(
        to,
        JSON.parse(routePathnamesJson),
        locationPathname,
        relative === "path"
      ),
      [to, routePathnamesJson, locationPathname, relative]
    );
  }
  function useRoutesImpl(routes, locationArg, dataRouterOpts) {
    invariant(
      useInRouterContext(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      `useRoutes() may be used only in the context of a <Router> component.`
    );
    let { navigator: navigator2 } = React2.useContext(NavigationContext);
    let { matches: parentMatches } = React2.useContext(RouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    let parentPathname = routeMatch ? routeMatch.pathname : "/";
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
    let parentRoute = routeMatch && routeMatch.route;
    if (ENABLE_DEV_WARNINGS) {
      let parentPath = parentRoute && parentRoute.path || "";
      warningOnce(
        parentPathname,
        !parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
        `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`
      );
    }
    let locationFromContext = useLocation();
    let location;
    if (locationArg) {
      let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
      invariant(
        parentPathnameBase === "/" || parsedLocationArg.pathname?.startsWith(parentPathnameBase),
        `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`
      );
      location = parsedLocationArg;
    } else {
      location = locationFromContext;
    }
    let pathname = location.pathname || "/";
    let remainingPathname = pathname;
    if (parentPathnameBase !== "/") {
      let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
      let segments = pathname.replace(/^\//, "").split("/");
      remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
    }
    let matches = dataRouterOpts && dataRouterOpts.state.matches.length ? (
      // If we're in a data router, use the matches we've already identified but ensure
      // we have the latest route instances from the manifest in case elements have changed
      dataRouterOpts.state.matches.map(
        (m) => Object.assign(m, {
          route: dataRouterOpts.manifest[m.route.id] || m.route
        })
      )
    ) : matchRoutes(routes, { pathname: remainingPathname });
    if (ENABLE_DEV_WARNINGS) {
      warning(
        parentRoute || matches != null,
        `No routes matched location "${location.pathname}${location.search}${location.hash}" `
      );
      warning(
        matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0,
        `Matched leaf route at location "${location.pathname}${location.search}${location.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
      );
    }
    let renderedMatches = _renderMatches(
      matches && matches.map(
        (match) => Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: joinPaths([
            parentPathnameBase,
            // Re-encode pathnames that were decoded inside matchRoutes.
            // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
            // `new URL()` internally and we need to prevent it from treating
            // them as separators
            navigator2.encodeLocation ? navigator2.encodeLocation(
              match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
            ).pathname : match.pathname
          ]),
          pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
            parentPathnameBase,
            // Re-encode pathnames that were decoded inside matchRoutes
            // Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
            // `new URL()` internally and we need to prevent it from treating
            // them as separators
            navigator2.encodeLocation ? navigator2.encodeLocation(
              match.pathnameBase.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23")
            ).pathname : match.pathnameBase
          ])
        })
      ),
      parentMatches,
      dataRouterOpts
    );
    if (locationArg && renderedMatches) {
      return /* @__PURE__ */ React2.createElement(
        LocationContext.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              mask: void 0,
              ...location
            },
            navigationType: "POP"
            /* Pop */
          }
        },
        renderedMatches
      );
    }
    return renderedMatches;
  }
  function DefaultErrorComponent() {
    let error = useRouteError();
    let message2 = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : JSON.stringify(error);
    let stack = error instanceof Error ? error.stack : null;
    let lightgrey = "rgba(200,200,200, 0.5)";
    let preStyles = { padding: "0.5rem", backgroundColor: lightgrey };
    let codeStyles = { padding: "2px 4px", backgroundColor: lightgrey };
    let devInfo = null;
    if (ENABLE_DEV_WARNINGS) {
      console.error(
        "Error handled by React Router default ErrorBoundary:",
        error
      );
      devInfo = /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React2.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React2.createElement("code", { style: codeStyles }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React2.createElement("code", { style: codeStyles }, "errorElement"), " prop on your route."));
    }
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React2.createElement("h3", { style: { fontStyle: "italic" } }, message2), stack ? /* @__PURE__ */ React2.createElement("pre", { style: preStyles }, stack) : null, devInfo);
  }
  var defaultErrorElement = /* @__PURE__ */ React2.createElement(DefaultErrorComponent, null);
  var RenderErrorBoundary = class extends React2.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: props.location,
        revalidation: props.revalidation,
        error: props.error
      };
    }
    static getDerivedStateFromError(error) {
      return { error };
    }
    static getDerivedStateFromProps(props, state) {
      if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
        return {
          error: props.error,
          location: props.location,
          revalidation: props.revalidation
        };
      }
      return {
        error: props.error !== void 0 ? props.error : state.error,
        location: state.location,
        revalidation: props.revalidation || state.revalidation
      };
    }
    componentDidCatch(error, errorInfo) {
      if (this.props.onError) {
        this.props.onError(error, errorInfo);
      } else {
        console.error(
          "React Router caught the following error during render",
          error
        );
      }
    }
    render() {
      let error = this.state.error;
      if (this.context && typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
        const decoded = decodeRouteErrorResponseDigest(error.digest);
        if (decoded) error = decoded;
      }
      let result = error !== void 0 ? /* @__PURE__ */ React2.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ React2.createElement(
        RouteErrorContext.Provider,
        {
          value: error,
          children: this.props.component
        }
      )) : this.props.children;
      if (this.context) {
        return /* @__PURE__ */ React2.createElement(RSCErrorHandler, { error }, result);
      }
      return result;
    }
  };
  RenderErrorBoundary.contextType = RSCRouterContext;
  var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap();
  function RSCErrorHandler({
    children,
    error
  }) {
    let { basename } = React2.useContext(NavigationContext);
    if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
      let redirect2 = decodeRedirectErrorDigest(error.digest);
      if (redirect2) {
        let existingRedirect = errorRedirectHandledMap.get(error);
        if (existingRedirect) throw existingRedirect;
        let parsed = parseToInfo(redirect2.location, basename);
        let target = parsed.absoluteURL || parsed.to;
        if (hasInvalidProtocol(target)) {
          throw new Error("Invalid redirect location");
        }
        if (isBrowser && !errorRedirectHandledMap.get(error)) {
          if (parsed.isExternal || redirect2.reloadDocument) {
            window.location.href = target;
          } else {
            const redirectPromise = Promise.resolve().then(
              () => window.__reactRouterDataRouter.navigate(parsed.to, {
                replace: redirect2.replace
              })
            );
            errorRedirectHandledMap.set(error, redirectPromise);
            throw redirectPromise;
          }
        }
        return /* @__PURE__ */ React2.createElement("meta", { httpEquiv: "refresh", content: `0;url=${target}` });
      }
    }
    return children;
  }
  function RenderedRoute({ routeContext, match, children }) {
    let dataRouterContext = React2.useContext(DataRouterContext);
    if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
      dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
    }
    return /* @__PURE__ */ React2.createElement(RouteContext.Provider, { value: routeContext }, children);
  }
  function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
    let dataRouterState = dataRouterOpts?.state;
    if (matches == null) {
      if (!dataRouterState) {
        return null;
      }
      if (dataRouterState.errors) {
        matches = dataRouterState.matches;
      } else if (parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
        matches = dataRouterState.matches;
      } else {
        return null;
      }
    }
    let renderedMatches = matches;
    let errors = dataRouterState?.errors;
    if (errors != null) {
      let errorIndex = renderedMatches.findIndex(
        (m) => m.route.id && errors?.[m.route.id] !== void 0
      );
      invariant(
        errorIndex >= 0,
        `Could not find a matching route for errors on route IDs: ${Object.keys(
          errors
        ).join(",")}`
      );
      renderedMatches = renderedMatches.slice(
        0,
        Math.min(renderedMatches.length, errorIndex + 1)
      );
    }
    let renderFallback = false;
    let fallbackIndex = -1;
    if (dataRouterOpts && dataRouterState) {
      renderFallback = dataRouterState.renderFallback;
      for (let i = 0; i < renderedMatches.length; i++) {
        let match = renderedMatches[i];
        if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
          fallbackIndex = i;
        }
        if (match.route.id) {
          let { loaderData, errors: errors2 } = dataRouterState;
          let needsToRunLoader = match.route.loader && !loaderData.hasOwnProperty(match.route.id) && (!errors2 || errors2[match.route.id] === void 0);
          if (match.route.lazy || needsToRunLoader) {
            if (dataRouterOpts.isStatic) {
              renderFallback = true;
            }
            if (fallbackIndex >= 0) {
              renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
            } else {
              renderedMatches = [renderedMatches[0]];
            }
            break;
          }
        }
      }
    }
    let onErrorHandler = dataRouterOpts?.onError;
    let onError = dataRouterState && onErrorHandler ? (error, errorInfo) => {
      onErrorHandler(error, {
        location: dataRouterState.location,
        params: dataRouterState.matches?.[0]?.params ?? {},
        pattern: getRoutePattern(dataRouterState.matches),
        errorInfo
      });
    } : void 0;
    return renderedMatches.reduceRight(
      (outlet, match, index) => {
        let error;
        let shouldRenderHydrateFallback = false;
        let errorElement = null;
        let hydrateFallbackElement = null;
        if (dataRouterState) {
          error = errors && match.route.id ? errors[match.route.id] : void 0;
          errorElement = match.route.errorElement || defaultErrorElement;
          if (renderFallback) {
            if (fallbackIndex < 0 && index === 0) {
              warningOnce(
                "route-fallback",
                false,
                "No `HydrateFallback` element provided to render during initial hydration"
              );
              shouldRenderHydrateFallback = true;
              hydrateFallbackElement = null;
            } else if (fallbackIndex === index) {
              shouldRenderHydrateFallback = true;
              hydrateFallbackElement = match.route.hydrateFallbackElement || null;
            }
          }
        }
        let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
        let getChildren = () => {
          let children;
          if (error) {
            children = errorElement;
          } else if (shouldRenderHydrateFallback) {
            children = hydrateFallbackElement;
          } else if (match.route.Component) {
            children = /* @__PURE__ */ React2.createElement(match.route.Component, null);
          } else if (match.route.element) {
            children = match.route.element;
          } else {
            children = outlet;
          }
          return /* @__PURE__ */ React2.createElement(
            RenderedRoute,
            {
              match,
              routeContext: {
                outlet,
                matches: matches2,
                isDataRoute: dataRouterState != null
              },
              children
            }
          );
        };
        return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React2.createElement(
          RenderErrorBoundary,
          {
            location: dataRouterState.location,
            revalidation: dataRouterState.revalidation,
            component: errorElement,
            error,
            children: getChildren(),
            routeContext: { outlet: null, matches: matches2, isDataRoute: true },
            onError
          }
        ) : getChildren();
      },
      null
    );
  }
  function getDataRouterConsoleError(hookName) {
    return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function useDataRouterContext(hookName) {
    let ctx = React2.useContext(DataRouterContext);
    invariant(ctx, getDataRouterConsoleError(hookName));
    return ctx;
  }
  function useDataRouterState(hookName) {
    let state = React2.useContext(DataRouterStateContext);
    invariant(state, getDataRouterConsoleError(hookName));
    return state;
  }
  function useRouteContext(hookName) {
    let route = React2.useContext(RouteContext);
    invariant(route, getDataRouterConsoleError(hookName));
    return route;
  }
  function useCurrentRouteId(hookName) {
    let route = useRouteContext(hookName);
    let thisRoute = route.matches[route.matches.length - 1];
    invariant(
      thisRoute.route.id,
      `${hookName} can only be used on routes that contain a unique "id"`
    );
    return thisRoute.route.id;
  }
  function useRouteId() {
    return useCurrentRouteId(
      "useRouteId"
      /* UseRouteId */
    );
  }
  function useNavigation() {
    let state = useDataRouterState(
      "useNavigation"
      /* UseNavigation */
    );
    return React2.useMemo(() => {
      let { matches, historyAction, ...rest } = state.navigation;
      return rest;
    }, [state.navigation]);
  }
  function useMatches() {
    let { matches, loaderData } = useDataRouterState(
      "useMatches"
      /* UseMatches */
    );
    return React2.useMemo(
      () => matches.map((m) => convertRouteMatchToUiMatch(m, loaderData)),
      [matches, loaderData]
    );
  }
  function useRouteError() {
    let error = React2.useContext(RouteErrorContext);
    let state = useDataRouterState(
      "useRouteError"
      /* UseRouteError */
    );
    let routeId = useCurrentRouteId(
      "useRouteError"
      /* UseRouteError */
    );
    if (error !== void 0) {
      return error;
    }
    return state.errors?.[routeId];
  }
  function useNavigateStable() {
    let { router } = useDataRouterContext(
      "useNavigate"
      /* UseNavigateStable */
    );
    let id = useCurrentRouteId(
      "useNavigate"
      /* UseNavigateStable */
    );
    let activeRef = React2.useRef(false);
    useIsomorphicLayoutEffect(() => {
      activeRef.current = true;
    });
    let navigate = React2.useCallback(
      async (to, options = {}) => {
        warning(activeRef.current, navigateEffectWarning);
        if (!activeRef.current) return;
        if (typeof to === "number") {
          await router.navigate(to);
        } else {
          await router.navigate(to, { fromRouteId: id, ...options });
        }
      },
      [router, id]
    );
    return navigate;
  }
  var alreadyWarned = {};
  function warningOnce(key, cond, message2) {
    if (!cond && !alreadyWarned[key]) {
      alreadyWarned[key] = true;
      warning(false, message2);
    }
  }
  var USE_OPTIMISTIC = "useOptimistic";
  var useOptimisticImpl = React3[USE_OPTIMISTIC];
  var MemoizedDataRoutes = React3.memo(DataRoutes2);
  function DataRoutes2({
    routes,
    manifest,
    future,
    state,
    isStatic,
    onError
  }) {
    return useRoutesImpl(routes, void 0, {
      manifest,
      state,
      isStatic,
      onError,
      future
    });
  }
  function Router({
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = "POP",
    navigator: navigator2,
    static: staticProp = false,
    useTransitions
  }) {
    invariant(
      !useInRouterContext(),
      `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`
    );
    let basename = basenameProp.replace(/^\/*/, "/");
    let navigationContext = React3.useMemo(
      () => ({
        basename,
        navigator: navigator2,
        static: staticProp,
        useTransitions,
        future: {}
      }),
      [basename, navigator2, staticProp, useTransitions]
    );
    if (typeof locationProp === "string") {
      locationProp = parsePath(locationProp);
    }
    let {
      pathname = "/",
      search = "",
      hash = "",
      state = null,
      key = "default",
      mask
    } = locationProp;
    let locationContext = React3.useMemo(() => {
      let trailingPathname = stripBasename(pathname, basename);
      if (trailingPathname == null) {
        return null;
      }
      return {
        location: {
          pathname: trailingPathname,
          search,
          hash,
          state,
          key,
          mask
        },
        navigationType
      };
    }, [basename, pathname, search, hash, state, key, navigationType, mask]);
    warning(
      locationContext != null,
      `<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`
    );
    if (locationContext == null) {
      return null;
    }
    return /* @__PURE__ */ React3.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ React3.createElement(LocationContext.Provider, { children, value: locationContext }));
  }
  var defaultMethod = "get";
  var defaultEncType = "application/x-www-form-urlencoded";
  function isHtmlElement(object) {
    return typeof HTMLElement !== "undefined" && object instanceof HTMLElement;
  }
  function isButtonElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
  }
  function isFormElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
  }
  function isInputElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
  }
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  function shouldProcessLinkClick(event, target) {
    return event.button === 0 && // Ignore everything but left clicks
    (!target || target === "_self") && // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event);
  }
  var _formDataSupportsSubmitter = null;
  function isFormDataSubmitterSupported() {
    if (_formDataSupportsSubmitter === null) {
      try {
        new FormData(
          document.createElement("form"),
          // @ts-expect-error if FormData supports the submitter parameter, this will throw
          0
        );
        _formDataSupportsSubmitter = false;
      } catch (e) {
        _formDataSupportsSubmitter = true;
      }
    }
    return _formDataSupportsSubmitter;
  }
  var supportedFormEncTypes = /* @__PURE__ */ new Set([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  ]);
  function getFormEncType(encType) {
    if (encType != null && !supportedFormEncTypes.has(encType)) {
      warning(
        false,
        `"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
      );
      return null;
    }
    return encType;
  }
  function getFormSubmissionInfo(target, basename) {
    let method;
    let action2;
    let encType;
    let formData;
    let body;
    if (isFormElement(target)) {
      let attr = target.getAttribute("action");
      action2 = attr ? stripBasename(attr, basename) : null;
      method = target.getAttribute("method") || defaultMethod;
      encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
      formData = new FormData(target);
    } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
      let form = target.form;
      if (form == null) {
        throw new Error(
          `Cannot submit a <button> or <input type="submit"> without a <form>`
        );
      }
      let attr = target.getAttribute("formaction") || form.getAttribute("action");
      action2 = attr ? stripBasename(attr, basename) : null;
      method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
      encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
      formData = new FormData(form, target);
      if (!isFormDataSubmitterSupported()) {
        let { name, type, value } = target;
        if (type === "image") {
          let prefix = name ? `${name}.` : "";
          formData.append(`${prefix}x`, "0");
          formData.append(`${prefix}y`, "0");
        } else if (name) {
          formData.append(name, value);
        }
      }
    } else if (isHtmlElement(target)) {
      throw new Error(
        `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`
      );
    } else {
      method = defaultMethod;
      action2 = null;
      encType = defaultEncType;
      body = target;
    }
    if (formData && encType === "text/plain") {
      body = formData;
      formData = void 0;
    }
    return { action: action2, method: method.toLowerCase(), encType, formData, body };
  }
  var objectProtoNames2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  var ESCAPE_LOOKUP = {
    "&": "\\u0026",
    ">": "\\u003e",
    "<": "\\u003c",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  function escapeHtml(html) {
    return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
  }
  function invariant2(value, message2) {
    if (value === false || value === null || typeof value === "undefined") {
      throw new Error(message2);
    }
  }
  var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect");
  function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
    let url = typeof reqUrl === "string" ? new URL(
      reqUrl,
      // This can be called during the SSR flow via PrefetchPageLinksImpl so
      // don't assume window is available
      typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
    ) : reqUrl;
    if (trailingSlashAware) {
      if (url.pathname.endsWith("/")) {
        url.pathname = `${url.pathname}_.${extension}`;
      } else {
        url.pathname = `${url.pathname}.${extension}`;
      }
    } else {
      if (url.pathname === "/") {
        url.pathname = `_root.${extension}`;
      } else if (basename && stripBasename(url.pathname, basename) === "/") {
        url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`;
      } else {
        url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`;
      }
    }
    return url;
  }
  async function loadRouteModule(route, routeModulesCache) {
    if (route.id in routeModulesCache) {
      return routeModulesCache[route.id];
    }
    try {
      let routeModule = await import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        route.module
      );
      routeModulesCache[route.id] = routeModule;
      return routeModule;
    } catch (error) {
      console.error(
        `Error loading route module \`${route.module}\`, reloading page...`
      );
      console.error(error);
      if (window.__reactRouterContext && window.__reactRouterContext.isSpaMode && // @ts-expect-error
      import_meta.hot) {
        throw error;
      }
      window.location.reload();
      return new Promise(() => {
      });
    }
  }
  function isPageLinkDescriptor(object) {
    return object != null && typeof object.page === "string";
  }
  function isHtmlLinkDescriptor(object) {
    if (object == null) {
      return false;
    }
    if (object.href == null) {
      return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
    }
    return typeof object.rel === "string" && typeof object.href === "string";
  }
  async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
    let links = await Promise.all(
      matches.map(async (match) => {
        let route = manifest.routes[match.route.id];
        if (route) {
          let mod = await loadRouteModule(route, routeModules);
          return mod.links ? mod.links() : [];
        }
        return [];
      })
    );
    return dedupeLinkDescriptors(
      links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map(
        (link) => link.rel === "stylesheet" ? { ...link, rel: "prefetch", as: "style" } : { ...link, rel: "prefetch" }
      )
    );
  }
  function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
    let isNew = (match, index) => {
      if (!currentMatches[index]) return true;
      return match.route.id !== currentMatches[index].route.id;
    };
    let matchPathChanged = (match, index) => {
      return (
        // param change, /users/123 -> /users/456
        currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
        // e.g. /files/images/avatar.jpg -> files/finances.xls
        currentMatches[index].route.path?.endsWith("*") && currentMatches[index].params["*"] !== match.params["*"]
      );
    };
    if (mode === "assets") {
      return nextMatches.filter(
        (match, index) => isNew(match, index) || matchPathChanged(match, index)
      );
    }
    if (mode === "data") {
      return nextMatches.filter((match, index) => {
        let manifestRoute = manifest.routes[match.route.id];
        if (!manifestRoute || !manifestRoute.hasLoader) {
          return false;
        }
        if (isNew(match, index) || matchPathChanged(match, index)) {
          return true;
        }
        if (match.route.shouldRevalidate) {
          let routeChoice = match.route.shouldRevalidate({
            currentUrl: new URL(
              location.pathname + location.search + location.hash,
              window.origin
            ),
            currentParams: currentMatches[0]?.params || {},
            nextUrl: new URL(page, window.origin),
            nextParams: match.params,
            defaultShouldRevalidate: true
          });
          if (typeof routeChoice === "boolean") {
            return routeChoice;
          }
        }
        return true;
      });
    }
    return [];
  }
  function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
    return dedupeHrefs(
      matches.map((match) => {
        let route = manifest.routes[match.route.id];
        if (!route) return [];
        let hrefs = [route.module];
        if (route.clientActionModule) {
          hrefs = hrefs.concat(route.clientActionModule);
        }
        if (route.clientLoaderModule) {
          hrefs = hrefs.concat(route.clientLoaderModule);
        }
        if (includeHydrateFallback && route.hydrateFallbackModule) {
          hrefs = hrefs.concat(route.hydrateFallbackModule);
        }
        if (route.imports) {
          hrefs = hrefs.concat(route.imports);
        }
        return hrefs;
      }).flat(1)
    );
  }
  function dedupeHrefs(hrefs) {
    return [...new Set(hrefs)];
  }
  function sortKeys(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    for (let key of keys) {
      sorted[key] = obj[key];
    }
    return sorted;
  }
  function dedupeLinkDescriptors(descriptors, preloads) {
    let set = /* @__PURE__ */ new Set();
    let preloadsSet = new Set(preloads);
    return descriptors.reduce((deduped, descriptor) => {
      let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
      if (alreadyModulePreload) {
        return deduped;
      }
      let key = JSON.stringify(sortKeys(descriptor));
      if (!set.has(key)) {
        set.add(key);
        deduped.push({ key, link: descriptor });
      }
      return deduped;
    }, []);
  }
  function useDataRouterContext2() {
    let context = React8.useContext(DataRouterContext);
    invariant2(
      context,
      "You must render this element inside a <DataRouterContext.Provider> element"
    );
    return context;
  }
  function useDataRouterStateContext() {
    let context = React8.useContext(DataRouterStateContext);
    invariant2(
      context,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    );
    return context;
  }
  var FrameworkContext = React8.createContext(void 0);
  FrameworkContext.displayName = "FrameworkContext";
  function useFrameworkContext() {
    let context = React8.useContext(FrameworkContext);
    invariant2(
      context,
      "You must render this element inside a <HydratedRouter> element"
    );
    return context;
  }
  function usePrefetchBehavior(prefetch, theirElementProps) {
    let frameworkContext = React8.useContext(FrameworkContext);
    let [maybePrefetch, setMaybePrefetch] = React8.useState(false);
    let [shouldPrefetch, setShouldPrefetch] = React8.useState(false);
    let { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps;
    let ref = React8.useRef(null);
    React8.useEffect(() => {
      if (prefetch === "render") {
        setShouldPrefetch(true);
      }
      if (prefetch === "viewport") {
        let callback2 = (entries) => {
          entries.forEach((entry) => {
            setShouldPrefetch(entry.isIntersecting);
          });
        };
        let observer = new IntersectionObserver(callback2, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => {
          observer.disconnect();
        };
      }
    }, [prefetch]);
    React8.useEffect(() => {
      if (maybePrefetch) {
        let id = setTimeout(() => {
          setShouldPrefetch(true);
        }, 100);
        return () => {
          clearTimeout(id);
        };
      }
    }, [maybePrefetch]);
    let setIntent = () => {
      setMaybePrefetch(true);
    };
    let cancelIntent = () => {
      setMaybePrefetch(false);
      setShouldPrefetch(false);
    };
    if (!frameworkContext) {
      return [false, ref, {}];
    }
    if (prefetch !== "intent") {
      return [shouldPrefetch, ref, {}];
    }
    return [
      shouldPrefetch,
      ref,
      {
        onFocus: composeEventHandlers(onFocus, setIntent),
        onBlur: composeEventHandlers(onBlur, cancelIntent),
        onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
        onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
        onTouchStart: composeEventHandlers(onTouchStart, setIntent)
      }
    ];
  }
  function composeEventHandlers(theirHandler, ourHandler) {
    return (event) => {
      theirHandler && theirHandler(event);
      if (!event.defaultPrevented) {
        ourHandler(event);
      }
    };
  }
  function PrefetchPageLinks({ page, ...linkProps }) {
    let rsc = useIsRSCRouterContext();
    let { nonce: contextNonce } = useFrameworkContext();
    let { router } = useDataRouterContext2();
    let matches = React8.useMemo(
      () => matchRoutes(router.routes, page, router.basename),
      [router.routes, page, router.basename]
    );
    if (!matches) {
      return null;
    }
    if (linkProps.nonce == null && contextNonce) {
      linkProps = { ...linkProps, nonce: contextNonce };
    }
    if (rsc) {
      return /* @__PURE__ */ React8.createElement(RSCPrefetchPageLinksImpl, { page, matches, ...linkProps });
    }
    return /* @__PURE__ */ React8.createElement(PrefetchPageLinksImpl, { page, matches, ...linkProps });
  }
  function useKeyedPrefetchLinks(matches) {
    let { manifest, routeModules } = useFrameworkContext();
    let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React8.useState([]);
    React8.useEffect(() => {
      let interrupted = false;
      void getKeyedPrefetchLinks(matches, manifest, routeModules).then(
        (links) => {
          if (!interrupted) {
            setKeyedPrefetchLinks(links);
          }
        }
      );
      return () => {
        interrupted = true;
      };
    }, [matches, manifest, routeModules]);
    return keyedPrefetchLinks;
  }
  function RSCPrefetchPageLinksImpl({
    page,
    matches: nextMatches,
    ...linkProps
  }) {
    let location = useLocation();
    let { future } = useFrameworkContext();
    let { basename } = useDataRouterContext2();
    let dataHrefs = React8.useMemo(() => {
      if (page === location.pathname + location.search + location.hash) {
        return [];
      }
      let url = singleFetchUrl(
        page,
        basename,
        future.v8_trailingSlashAwareDataRequests,
        "rsc"
      );
      let hasSomeRoutesWithShouldRevalidate = false;
      let targetRoutes = [];
      for (let match of nextMatches) {
        if (typeof match.route.shouldRevalidate === "function") {
          hasSomeRoutesWithShouldRevalidate = true;
        } else {
          targetRoutes.push(match.route.id);
        }
      }
      if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) {
        url.searchParams.set("_routes", targetRoutes.join(","));
      }
      return [url.pathname + url.search];
    }, [
      basename,
      future.v8_trailingSlashAwareDataRequests,
      page,
      location,
      nextMatches
    ]);
    return /* @__PURE__ */ React8.createElement(React8.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })));
  }
  function PrefetchPageLinksImpl({
    page,
    matches: nextMatches,
    ...linkProps
  }) {
    let location = useLocation();
    let { future, manifest, routeModules } = useFrameworkContext();
    let { basename } = useDataRouterContext2();
    let { loaderData, matches } = useDataRouterStateContext();
    let newMatchesForData = React8.useMemo(
      () => getNewMatchesForLinks(
        page,
        nextMatches,
        matches,
        manifest,
        location,
        "data"
      ),
      [page, nextMatches, matches, manifest, location]
    );
    let newMatchesForAssets = React8.useMemo(
      () => getNewMatchesForLinks(
        page,
        nextMatches,
        matches,
        manifest,
        location,
        "assets"
      ),
      [page, nextMatches, matches, manifest, location]
    );
    let dataHrefs = React8.useMemo(() => {
      if (page === location.pathname + location.search + location.hash) {
        return [];
      }
      let routesParams = /* @__PURE__ */ new Set();
      let foundOptOutRoute = false;
      nextMatches.forEach((m) => {
        let manifestRoute = manifest.routes[m.route.id];
        if (!manifestRoute || !manifestRoute.hasLoader) {
          return;
        }
        if (!newMatchesForData.some((m2) => m2.route.id === m.route.id) && m.route.id in loaderData && routeModules[m.route.id]?.shouldRevalidate) {
          foundOptOutRoute = true;
        } else if (manifestRoute.hasClientLoader) {
          foundOptOutRoute = true;
        } else {
          routesParams.add(m.route.id);
        }
      });
      if (routesParams.size === 0) {
        return [];
      }
      let url = singleFetchUrl(
        page,
        basename,
        future.v8_trailingSlashAwareDataRequests,
        "data"
      );
      if (foundOptOutRoute && routesParams.size > 0) {
        url.searchParams.set(
          "_routes",
          nextMatches.filter((m) => routesParams.has(m.route.id)).map((m) => m.route.id).join(",")
        );
      }
      return [url.pathname + url.search];
    }, [
      basename,
      future.v8_trailingSlashAwareDataRequests,
      loaderData,
      location,
      manifest,
      newMatchesForData,
      nextMatches,
      page,
      routeModules
    ]);
    let moduleHrefs = React8.useMemo(
      () => getModuleLinkHrefs(newMatchesForAssets, manifest),
      [newMatchesForAssets, manifest]
    );
    let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
    return /* @__PURE__ */ React8.createElement(React8.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", { key: href, rel: "prefetch", as: "fetch", href, ...linkProps })), moduleHrefs.map((href) => /* @__PURE__ */ React8.createElement("link", { key: href, rel: "modulepreload", href, ...linkProps })), keyedPrefetchLinks.map(({ key, link }) => (
      // these don't spread `linkProps` because they are full link descriptors
      // already with their own props
      /* @__PURE__ */ React8.createElement(
        "link",
        {
          key,
          nonce: linkProps.nonce,
          ...link,
          crossOrigin: link.crossOrigin ?? linkProps.crossOrigin
        }
      )
    )));
  }
  function mergeRefs(...refs) {
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }
  var isBrowser2 = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  try {
    if (isBrowser2) {
      window.__reactRouterVersion = // @ts-expect-error
      "7.18.2";
    }
  } catch (e) {
  }
  function HistoryRouter({
    basename,
    children,
    history,
    useTransitions
  }) {
    let [state, setStateImpl] = React10.useState({
      action: history.action,
      location: history.location
    });
    let setState = React10.useCallback(
      (newState) => {
        if (useTransitions === false) {
          setStateImpl(newState);
        } else {
          React10.startTransition(() => setStateImpl(newState));
        }
      },
      [useTransitions]
    );
    React10.useLayoutEffect(() => history.listen(setState), [history, setState]);
    return /* @__PURE__ */ React10.createElement(
      Router,
      {
        basename,
        children,
        location: state.location,
        navigationType: state.action,
        navigator: history,
        useTransitions
      }
    );
  }
  HistoryRouter.displayName = "unstable_HistoryRouter";
  var Link = React10.forwardRef(
    function LinkWithRef({
      onClick,
      discover = "render",
      prefetch = "none",
      relative,
      reloadDocument,
      replace: replace2,
      mask,
      state,
      target,
      to,
      preventScrollReset,
      viewTransition,
      defaultShouldRevalidate,
      ...rest
    }, forwardedRef) {
      let { basename, navigator: navigator2, useTransitions } = React10.useContext(NavigationContext);
      let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
      let parsed = parseToInfo(to, basename);
      to = parsed.to;
      let href = useHref(to, { relative });
      let location = useLocation();
      let maskedHref = null;
      if (mask) {
        let resolved = resolveTo(
          mask,
          [],
          location.mask ? location.mask.pathname : "/",
          true
        );
        if (basename !== "/") {
          resolved.pathname = resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname]);
        }
        maskedHref = navigator2.createHref(resolved);
      }
      let [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(
        prefetch,
        rest
      );
      let internalOnClick = useLinkClickHandler(to, {
        replace: replace2,
        mask,
        state,
        target,
        preventScrollReset,
        relative,
        viewTransition,
        defaultShouldRevalidate,
        useTransitions
      });
      function handleClick(event) {
        if (onClick) onClick(event);
        if (!event.defaultPrevented) {
          internalOnClick(event);
        }
      }
      let isSpaLink = !(parsed.isExternal || reloadDocument);
      let link = (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        /* @__PURE__ */ React10.createElement(
          "a",
          {
            ...rest,
            ...prefetchHandlers,
            href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href,
            onClick: isSpaLink ? handleClick : onClick,
            ref: mergeRefs(forwardedRef, prefetchRef),
            target,
            "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
          }
        )
      );
      return shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React10.createElement(React10.Fragment, null, link, /* @__PURE__ */ React10.createElement(PrefetchPageLinks, { page: href })) : link;
    }
  );
  Link.displayName = "Link";
  var NavLink = React10.forwardRef(
    function NavLinkWithRef({
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      viewTransition,
      children,
      ...rest
    }, ref) {
      let path = useResolvedPath(to, { relative: rest.relative });
      let location = useLocation();
      let routerState = React10.useContext(DataRouterStateContext);
      let { navigator: navigator2, basename } = React10.useContext(NavigationContext);
      let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useViewTransitionState(path) && viewTransition === true;
      let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
      let locationPathname = location.pathname;
      let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
      if (!caseSensitive) {
        locationPathname = locationPathname.toLowerCase();
        nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
        toPathname = toPathname.toLowerCase();
      }
      if (nextLocationPathname && basename) {
        nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname;
      }
      const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
      let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
      let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
      let renderProps = {
        isActive,
        isPending,
        isTransitioning
      };
      let ariaCurrent = isActive ? ariaCurrentProp : void 0;
      let className;
      if (typeof classNameProp === "function") {
        className = classNameProp(renderProps);
      } else {
        className = [
          classNameProp,
          isActive ? "active" : null,
          isPending ? "pending" : null,
          isTransitioning ? "transitioning" : null
        ].filter(Boolean).join(" ");
      }
      let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
      return /* @__PURE__ */ React10.createElement(
        Link,
        {
          ...rest,
          "aria-current": ariaCurrent,
          className,
          ref,
          style,
          to,
          viewTransition
        },
        typeof children === "function" ? children(renderProps) : children
      );
    }
  );
  NavLink.displayName = "NavLink";
  var Form = React10.forwardRef(
    ({
      discover = "render",
      fetcherKey,
      navigate,
      reloadDocument,
      replace: replace2,
      state,
      method = defaultMethod,
      action: action2,
      onSubmit,
      relative,
      preventScrollReset,
      viewTransition,
      defaultShouldRevalidate,
      ...props
    }, forwardedRef) => {
      let { useTransitions } = React10.useContext(NavigationContext);
      let submit = useSubmit();
      let formAction = useFormAction(action2, { relative });
      let formMethod = method.toLowerCase() === "get" ? "get" : "post";
      let isAbsolute = typeof action2 === "string" && ABSOLUTE_URL_REGEX.test(action2);
      let submitHandler = (event) => {
        onSubmit && onSubmit(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        let submitter = event.nativeEvent.submitter;
        let submitMethod = submitter?.getAttribute("formmethod") || method;
        let doSubmit = () => submit(submitter || event.currentTarget, {
          fetcherKey,
          method: submitMethod,
          navigate,
          replace: replace2,
          state,
          relative,
          preventScrollReset,
          viewTransition,
          defaultShouldRevalidate
        });
        if (useTransitions && navigate !== false) {
          React10.startTransition(() => doSubmit());
        } else {
          doSubmit();
        }
      };
      return /* @__PURE__ */ React10.createElement(
        "form",
        {
          ref: forwardedRef,
          method: formMethod,
          action: formAction,
          onSubmit: reloadDocument ? onSubmit : submitHandler,
          ...props,
          "data-discover": !isAbsolute && discover === "render" ? "true" : void 0
        }
      );
    }
  );
  Form.displayName = "Form";
  function ScrollRestoration({
    getKey,
    storageKey,
    ...props
  }) {
    let remixContext = React10.useContext(FrameworkContext);
    let { basename } = React10.useContext(NavigationContext);
    let location = useLocation();
    let matches = useMatches();
    useScrollRestoration({ getKey, storageKey });
    let ssrKey = React10.useMemo(
      () => {
        if (!remixContext || !getKey) return null;
        let userKey = getScrollRestorationKey(
          location,
          matches,
          basename,
          getKey
        );
        return userKey !== location.key ? userKey : null;
      },
      // Nah, we only need this the first time for the SSR render
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    if (!remixContext || remixContext.isSpaMode) {
      return null;
    }
    let restoreScroll = ((storageKey2, restoreKey) => {
      if (!window.history.state || !window.history.state.key) {
        let key = Math.random().toString(32).slice(2);
        window.history.replaceState({ key }, "");
      }
      try {
        let positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
        let storedY = positions[restoreKey || window.history.state.key];
        if (typeof storedY === "number") {
          window.scrollTo(0, storedY);
        }
      } catch (error) {
        console.error(error);
        sessionStorage.removeItem(storageKey2);
      }
    }).toString();
    if (props.nonce == null && remixContext?.nonce) {
      props.nonce = remixContext.nonce;
    }
    return /* @__PURE__ */ React10.createElement(
      "script",
      {
        ...props,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: `(${restoreScroll})(${escapeHtml(
            JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY)
          )}, ${escapeHtml(JSON.stringify(ssrKey))})`
        }
      }
    );
  }
  ScrollRestoration.displayName = "ScrollRestoration";
  function getDataRouterConsoleError2(hookName) {
    return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function useDataRouterContext3(hookName) {
    let ctx = React10.useContext(DataRouterContext);
    invariant(ctx, getDataRouterConsoleError2(hookName));
    return ctx;
  }
  function useDataRouterState2(hookName) {
    let state = React10.useContext(DataRouterStateContext);
    invariant(state, getDataRouterConsoleError2(hookName));
    return state;
  }
  function useLinkClickHandler(to, {
    target,
    replace: replaceProp,
    mask,
    state,
    preventScrollReset,
    relative,
    viewTransition,
    defaultShouldRevalidate,
    useTransitions
  } = {}) {
    let navigate = useNavigate();
    let location = useLocation();
    let path = useResolvedPath(to, { relative });
    return React10.useCallback(
      (event) => {
        if (shouldProcessLinkClick(event, target)) {
          event.preventDefault();
          let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
          let doNavigate = () => navigate(to, {
            replace: replace2,
            mask,
            state,
            preventScrollReset,
            relative,
            viewTransition,
            defaultShouldRevalidate
          });
          if (useTransitions) {
            React10.startTransition(() => doNavigate());
          } else {
            doNavigate();
          }
        }
      },
      [
        location,
        navigate,
        path,
        replaceProp,
        mask,
        state,
        target,
        to,
        preventScrollReset,
        relative,
        viewTransition,
        defaultShouldRevalidate,
        useTransitions
      ]
    );
  }
  var fetcherId = 0;
  var getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
  function useSubmit() {
    let { router } = useDataRouterContext3(
      "useSubmit"
      /* UseSubmit */
    );
    let { basename } = React10.useContext(NavigationContext);
    let currentRouteId = useRouteId();
    let routerFetch = router.fetch;
    let routerNavigate = router.navigate;
    return React10.useCallback(
      async (target, options = {}) => {
        let { action: action2, method, encType, formData, body } = getFormSubmissionInfo(
          target,
          basename
        );
        if (options.navigate === false) {
          let key = options.fetcherKey || getUniqueFetcherId();
          await routerFetch(key, currentRouteId, options.action || action2, {
            defaultShouldRevalidate: options.defaultShouldRevalidate,
            preventScrollReset: options.preventScrollReset,
            formData,
            body,
            formMethod: options.method || method,
            formEncType: options.encType || encType,
            flushSync: options.flushSync
          });
        } else {
          await routerNavigate(options.action || action2, {
            defaultShouldRevalidate: options.defaultShouldRevalidate,
            preventScrollReset: options.preventScrollReset,
            formData,
            body,
            formMethod: options.method || method,
            formEncType: options.encType || encType,
            replace: options.replace,
            state: options.state,
            fromRouteId: currentRouteId,
            flushSync: options.flushSync,
            viewTransition: options.viewTransition
          });
        }
      },
      [routerFetch, routerNavigate, basename, currentRouteId]
    );
  }
  function useFormAction(action2, { relative } = {}) {
    let { basename } = React10.useContext(NavigationContext);
    let routeContext = React10.useContext(RouteContext);
    invariant(routeContext, "useFormAction must be used inside a RouteContext");
    let [match] = routeContext.matches.slice(-1);
    let path = { ...useResolvedPath(action2 ? action2 : ".", { relative }) };
    let location = useLocation();
    if (action2 == null) {
      path.search = location.search;
      let params = new URLSearchParams(path.search);
      let indexValues = params.getAll("index");
      let hasNakedIndexParam = indexValues.some((v) => v === "");
      if (hasNakedIndexParam) {
        params.delete("index");
        indexValues.filter((v) => v).forEach((v) => params.append("index", v));
        let qs = params.toString();
        path.search = qs ? `?${qs}` : "";
      }
    }
    if ((!action2 || action2 === ".") && match.route.index) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    }
    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    return createPath(path);
  }
  function useFetcher({
    key
  } = {}) {
    let { router } = useDataRouterContext3(
      "useFetcher"
      /* UseFetcher */
    );
    let state = useDataRouterState2(
      "useFetcher"
      /* UseFetcher */
    );
    let fetcherData = React10.useContext(FetchersContext);
    let route = React10.useContext(RouteContext);
    let routeId = route.matches[route.matches.length - 1]?.route.id;
    invariant(fetcherData, `useFetcher must be used inside a FetchersContext`);
    invariant(route, `useFetcher must be used inside a RouteContext`);
    invariant(
      routeId != null,
      `useFetcher can only be used on routes that contain a unique "id"`
    );
    let defaultKey = React10.useId();
    let [fetcherKey, setFetcherKey] = React10.useState(key || defaultKey);
    if (key && key !== fetcherKey) {
      setFetcherKey(key);
    }
    let { deleteFetcher, getFetcher, resetFetcher, fetch: routerFetch } = router;
    React10.useEffect(() => {
      getFetcher(fetcherKey);
      return () => deleteFetcher(fetcherKey);
    }, [deleteFetcher, getFetcher, fetcherKey]);
    let load = React10.useCallback(
      async (href, opts) => {
        invariant(routeId, "No routeId available for fetcher.load()");
        await routerFetch(fetcherKey, routeId, href, opts);
      },
      [fetcherKey, routeId, routerFetch]
    );
    let submitImpl = useSubmit();
    let submit = React10.useCallback(
      async (target, opts) => {
        await submitImpl(target, {
          ...opts,
          navigate: false,
          fetcherKey
        });
      },
      [fetcherKey, submitImpl]
    );
    let reset = React10.useCallback(
      (opts) => resetFetcher(fetcherKey, opts),
      [resetFetcher, fetcherKey]
    );
    let FetcherForm = React10.useMemo(() => {
      let FetcherForm2 = React10.forwardRef(
        (props, ref) => {
          return /* @__PURE__ */ React10.createElement(Form, { ...props, navigate: false, fetcherKey, ref });
        }
      );
      FetcherForm2.displayName = "fetcher.Form";
      return FetcherForm2;
    }, [fetcherKey]);
    let fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER;
    let data2 = fetcherData.get(fetcherKey);
    let fetcherWithComponents = React10.useMemo(
      () => ({
        Form: FetcherForm,
        submit,
        load,
        reset,
        ...fetcher,
        data: data2
      }),
      [FetcherForm, submit, load, reset, fetcher, data2]
    );
    return fetcherWithComponents;
  }
  var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
  var savedScrollPositions = {};
  function getScrollRestorationKey(location, matches, basename, getKey) {
    let key = null;
    if (getKey) {
      if (basename !== "/") {
        key = getKey(
          {
            ...location,
            pathname: stripBasename(location.pathname, basename) || location.pathname
          },
          matches
        );
      } else {
        key = getKey(location, matches);
      }
    }
    if (key == null) {
      key = location.key;
    }
    return key;
  }
  function useScrollRestoration({
    getKey,
    storageKey
  } = {}) {
    let { router } = useDataRouterContext3(
      "useScrollRestoration"
      /* UseScrollRestoration */
    );
    let { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
      "useScrollRestoration"
      /* UseScrollRestoration */
    );
    let { basename } = React10.useContext(NavigationContext);
    let location = useLocation();
    let matches = useMatches();
    let navigation = useNavigation();
    React10.useEffect(() => {
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = "auto";
      };
    }, []);
    usePageHide(
      React10.useCallback(() => {
        if (navigation.state === "idle") {
          let key = getScrollRestorationKey(location, matches, basename, getKey);
          savedScrollPositions[key] = window.scrollY;
        }
        try {
          sessionStorage.setItem(
            storageKey || SCROLL_RESTORATION_STORAGE_KEY,
            JSON.stringify(savedScrollPositions)
          );
        } catch (error) {
          warning(
            false,
            `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`
          );
        }
        window.history.scrollRestoration = "auto";
      }, [navigation.state, getKey, basename, location, matches, storageKey])
    );
    if (typeof document !== "undefined") {
      React10.useLayoutEffect(() => {
        try {
          let sessionPositions = sessionStorage.getItem(
            storageKey || SCROLL_RESTORATION_STORAGE_KEY
          );
          if (sessionPositions) {
            savedScrollPositions = JSON.parse(sessionPositions);
          }
        } catch (e) {
        }
      }, [storageKey]);
      React10.useLayoutEffect(() => {
        let disableScrollRestoration = router?.enableScrollRestoration(
          savedScrollPositions,
          () => window.scrollY,
          getKey ? (location2, matches2) => getScrollRestorationKey(location2, matches2, basename, getKey) : void 0
        );
        return () => disableScrollRestoration && disableScrollRestoration();
      }, [router, basename, getKey]);
      React10.useLayoutEffect(() => {
        if (restoreScrollPosition === false) {
          return;
        }
        if (typeof restoreScrollPosition === "number") {
          window.scrollTo(0, restoreScrollPosition);
          return;
        }
        try {
          if (location.hash) {
            let el = document.getElementById(
              decodeURIComponent(location.hash.slice(1))
            );
            if (el) {
              el.scrollIntoView();
              return;
            }
          }
        } catch {
          warning(
            false,
            `"${location.hash.slice(
              1
            )}" is not a decodable element ID. The view will not scroll to it.`
          );
        }
        if (preventScrollReset === true) {
          return;
        }
        window.scrollTo(0, 0);
      }, [location, restoreScrollPosition, preventScrollReset]);
    }
  }
  function usePageHide(callback2, options) {
    let { capture } = options || {};
    React10.useEffect(() => {
      let opts = capture != null ? { capture } : void 0;
      window.addEventListener("pagehide", callback2, opts);
      return () => {
        window.removeEventListener("pagehide", callback2, opts);
      };
    }, [callback2, capture]);
  }
  function useViewTransitionState(to, { relative } = {}) {
    let vtContext = React10.useContext(ViewTransitionContext);
    invariant(
      vtContext != null,
      "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
    );
    let { basename } = useDataRouterContext3(
      "useViewTransitionState"
      /* useViewTransitionState */
    );
    let path = useResolvedPath(to, { relative });
    if (!vtContext.isTransitioning) {
      return false;
    }
    let currentPath = stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
    let nextPath = stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
    return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
  }

  // node_modules/@shopify/app-bridge-react/build/esm/hooks/useAppBridge.js
  var serverProxy = new Proxy({}, {
    get(_, prop) {
      throw Error(`shopify.${String(prop)} can't be used in a server environment. You likely need to move this code into an Effect.`);
    }
  });
  function useAppBridge() {
    if (typeof window === "undefined") {
      return serverProxy;
    }
    if (!window.shopify) {
      throw Error("The shopify global is not defined. This likely means the App Bridge script tag was not added correctly to this page");
    }
    return window.shopify;
  }

  // node_modules/@shopify/shopify-api/dist/esm/runtime/http/headers.mjs
  function canonicalizeHeaderName(hdr) {
    return hdr.replace(/(^|-)(\w+)/g, (_fullMatch, start, letters) => start + letters.slice(0, 1).toUpperCase() + letters.slice(1).toLowerCase());
  }
  function getHeaders(headers2, needle_) {
    const result = [];
    if (!headers2)
      return result;
    const needle = canonicalizeHeaderName(needle_);
    for (const [key, values] of Object.entries(headers2)) {
      if (canonicalizeHeaderName(key) !== needle)
        continue;
      if (Array.isArray(values)) {
        result.push(...values);
      } else {
        result.push(values);
      }
    }
    return result;
  }
  function getHeader(headers2, needle) {
    if (!headers2)
      return void 0;
    return getHeaders(headers2, needle)?.[0];
  }
  function addHeader(headers2, key, value) {
    canonicalizeHeaders(headers2);
    const canonKey = canonicalizeHeaderName(key);
    let list = headers2[canonKey];
    if (!list) {
      list = [];
    } else if (!Array.isArray(list)) {
      list = [list];
    }
    headers2[canonKey] = list;
    list.push(value);
  }
  function canonicalizeValue(value) {
    if (typeof value === "number")
      return value.toString();
    return value;
  }
  function canonicalizeHeaders(hdr) {
    for (const [key, values] of Object.entries(hdr)) {
      const canonKey = canonicalizeHeaderName(key);
      if (!hdr[canonKey])
        hdr[canonKey] = [];
      if (!Array.isArray(hdr[canonKey]))
        hdr[canonKey] = [canonicalizeValue(hdr[canonKey])];
      if (key === canonKey)
        continue;
      delete hdr[key];
      hdr[canonKey].push(...[values].flat().map((value) => canonicalizeValue(value)));
    }
    return hdr;
  }
  function removeHeader(headers2, needle) {
    canonicalizeHeaders(headers2);
    const canonKey = canonicalizeHeaderName(needle);
    delete headers2[canonKey];
  }
  function flatHeaders(headers2) {
    if (!headers2)
      return [];
    return Object.entries(headers2).flatMap(([header, values]) => Array.isArray(values) ? values.map((value) => [header, value]) : [[header, values]]);
  }

  // node_modules/@shopify/shopify-api/dist/esm/adapters/web-api/adapter.mjs
  async function webApiConvertRequest(adapterArgs) {
    const request2 = adapterArgs.rawRequest;
    const headers2 = {};
    for (const [key, value] of request2.headers.entries()) {
      addHeader(headers2, key, value);
    }
    return {
      headers: headers2,
      method: request2.method ?? "GET",
      url: new URL(request2.url).toString()
    };
  }
  async function webApiConvertHeaders(headers2, _adapterArgs) {
    const remixHeaders = new Headers();
    flatHeaders(headers2 ?? {}).forEach(([key, value]) => remixHeaders.append(key, value));
    return Promise.resolve(remixHeaders);
  }
  async function webApiConvertResponse(resp, adapterArgs) {
    return new Response(resp.body, {
      status: resp.statusCode,
      statusText: resp.statusText,
      headers: await webApiConvertHeaders(resp.headers ?? {})
    });
  }
  function webApiRuntimeString() {
    return "Web API";
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/error.mjs
  var ShopifyError = class extends Error {
    constructor(message2) {
      super(message2);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  };
  var InvalidHmacError = class extends ShopifyError {
  };
  var InvalidShopError = class extends ShopifyError {
  };
  var InvalidHostError = class extends ShopifyError {
  };
  var InvalidJwtError = class extends ShopifyError {
  };
  var MissingJwtTokenError = class extends ShopifyError {
  };
  var InvalidDeliveryMethodError = class extends ShopifyError {
  };
  var SafeCompareError = class extends ShopifyError {
  };
  var PrivateAppError = class extends ShopifyError {
  };
  var HttpRequestError = class extends ShopifyError {
  };
  var HttpMaxRetriesError = class extends ShopifyError {
  };
  var HttpResponseError = class extends ShopifyError {
    response;
    constructor({ message: message2, code, statusText, body, headers: headers2 }) {
      super(message2);
      this.response = {
        code,
        statusText,
        body,
        headers: headers2
      };
    }
  };
  var HttpRetriableError = class extends HttpResponseError {
  };
  var HttpInternalError = class extends HttpRetriableError {
  };
  var HttpThrottlingError = class extends HttpRetriableError {
    constructor({ retryAfter, ...params }) {
      super(params);
      this.response.retryAfter = retryAfter;
    }
  };
  var GraphqlQueryError = class extends ShopifyError {
    response;
    headers;
    body;
    constructor({ message: message2, response, headers: headers2, body }) {
      super(message2);
      this.response = response;
      this.headers = headers2;
      this.body = body;
    }
  };
  var InvalidOAuthError = class extends ShopifyError {
  };
  var BotActivityDetected = class extends ShopifyError {
  };
  var CookieNotFound = class extends ShopifyError {
  };
  var InvalidSession = class extends ShopifyError {
  };
  var InvalidWebhookError = class extends ShopifyError {
    response;
    constructor({ message: message2, response }) {
      super(message2);
      this.response = response;
    }
  };
  var MissingWebhookCallbackError = class extends InvalidWebhookError {
  };
  var MissingRequiredArgument = class extends ShopifyError {
  };
  var InvalidRequestError = class extends ShopifyError {
  };
  var BillingError = class extends ShopifyError {
    errorData;
    constructor({ message: message2, errorData }) {
      super(message2);
      this.errorData = errorData;
    }
  };
  var FeatureDeprecatedError = class extends ShopifyError {
  };

  // node_modules/@shopify/shopify-api/dist/esm/runtime/crypto/types.mjs
  var HashFormat;
  (function(HashFormat2) {
    HashFormat2["Base64"] = "base64";
    HashFormat2["Hex"] = "hex";
  })(HashFormat || (HashFormat = {}));

  // node_modules/@shopify/shopify-api/dist/esm/runtime/crypto/utils.mjs
  var enc = new TextEncoder();
  function getCryptoLib() {
    return typeof crypto?.webcrypto === "undefined" ? crypto : crypto.webcrypto;
  }
  function hmacKeyData(secret) {
    return typeof secret === "string" ? enc.encode(secret) : secret;
  }
  async function createSHA256HMAC(secret, payload, returnFormat = HashFormat.Base64) {
    const cryptoLib = getCryptoLib();
    const key = await cryptoLib.subtle.importKey("raw", hmacKeyData(secret), {
      name: "HMAC",
      hash: { name: "SHA-256" }
    }, false, ["sign"]);
    const signature = await cryptoLib.subtle.sign("HMAC", key, enc.encode(payload));
    return returnFormat === HashFormat.Base64 ? asBase64(signature) : asHex(signature);
  }
  async function deriveSHA256HMACKey(secret, info) {
    const cryptoLib = getCryptoLib();
    const keyMaterial = await cryptoLib.subtle.importKey("raw", enc.encode(secret), "HKDF", false, ["deriveBits"]);
    return cryptoLib.subtle.deriveBits({
      name: "HKDF",
      hash: "SHA-256",
      salt: new Uint8Array(0),
      info: enc.encode(info)
    }, keyMaterial, 256);
  }
  function asHex(buffer) {
    return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  var LookupTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  function asBase64(buffer) {
    let output = "";
    const input = new Uint8Array(buffer);
    for (let i = 0; i < input.length; ) {
      const byte1 = input[i++];
      const byte2 = input[i++];
      const byte3 = input[i++];
      const enc1 = byte1 >> 2;
      const enc2 = (byte1 & 3) << 4 | byte2 >> 4;
      let enc3 = (byte2 & 15) << 2 | byte3 >> 6;
      let enc4 = byte3 & 63;
      if (isNaN(byte2)) {
        enc3 = 64;
      }
      if (isNaN(byte3)) {
        enc4 = 64;
      }
      output += LookupTable[enc1] + LookupTable[enc2] + LookupTable[enc3] + LookupTable[enc4];
    }
    return output;
  }
  function hashString(str, returnFormat) {
    const buffer = new TextEncoder().encode(str);
    switch (returnFormat) {
      case HashFormat.Base64:
        return asBase64(buffer);
      case HashFormat.Hex:
        return asHex(buffer);
      default:
        throw new ShopifyError(`Unrecognized hash format '${returnFormat}'`);
    }
  }

  // node_modules/@shopify/shopify-api/dist/esm/runtime/http/utils.mjs
  function splitN(str, sep, maxNumParts) {
    const parts = str.split(sep);
    const maxParts = Math.min(Math.abs(maxNumParts), parts.length);
    return [...parts.slice(0, maxParts - 1), parts.slice(maxParts - 1).join(sep)];
  }

  // node_modules/@shopify/shopify-api/dist/esm/runtime/http/cookies.mjs
  var COOKIE_SIGNING_INFO = "shopify-app-js/cookie-signing/v1";
  async function createCookieSignature(key, value) {
    const cookieSigningKey = await deriveSHA256HMACKey(key, COOKIE_SIGNING_INFO);
    return createSHA256HMAC(cookieSigningKey, value);
  }
  var signatureEncoder = new TextEncoder();
  function safelyCompareSignatures(signatureA, signatureB) {
    const buffA = signatureEncoder.encode(signatureA);
    const buffB = signatureEncoder.encode(signatureB);
    if (buffA.length !== buffB.length)
      return false;
    let out = 0;
    for (let i = 0; i < buffA.length; i++) {
      out |= buffA[i] ^ buffB[i];
    }
    return out === 0;
  }
  var Cookies = class _Cookies {
    response;
    static parseCookies(hdrs) {
      const entries = hdrs.filter((hdr) => hdr.trim().length > 0).map((cookieDef) => {
        const [keyval, ...opts] = cookieDef.split(";");
        const [name, value] = splitN(keyval, "=", 2).map((value2) => value2.trim());
        return [
          name,
          {
            name,
            value,
            ...Object.fromEntries(opts.map((opt) => splitN(opt, "=", 2).map((value2) => value2.trim())))
          }
        ];
      });
      const jar = Object.fromEntries(entries);
      for (const cookie of Object.values(jar)) {
        if (typeof cookie.expires === "string") {
          cookie.expires = new Date(cookie.expires);
        }
      }
      return jar;
    }
    static encodeCookie(data2) {
      let result = "";
      result += `${data2.name}=${data2.value};`;
      result += Object.entries(data2).filter(([key]) => !["name", "value", "expires"].includes(key)).map(([key, value]) => `${key}=${value}`).join("; ");
      if (data2.expires) {
        result += ";";
        result += `expires=${data2.expires.toUTCString()}`;
      }
      return result;
    }
    receivedCookieJar = {};
    outgoingCookieJar = {};
    keys = [];
    constructor(request2, response, { keys = [] } = {}) {
      this.response = response;
      if (keys)
        this.keys = keys;
      const cookieReqHdr = getHeader(request2.headers, "Cookie") ?? "";
      this.receivedCookieJar = _Cookies.parseCookies(cookieReqHdr.split(";"));
      const cookieResHdr = getHeaders(response.headers, "Set-Cookie") ?? [];
      this.outgoingCookieJar = _Cookies.parseCookies(cookieResHdr);
    }
    toHeaders() {
      return Object.values(this.outgoingCookieJar).map((cookie) => _Cookies.encodeCookie(cookie));
    }
    updateHeader() {
      if (!this.response.headers) {
        this.response.headers = {};
      }
      removeHeader(this.response.headers, "Set-Cookie");
      this.toHeaders().map((hdr) => addHeader(this.response.headers, "Set-Cookie", hdr));
    }
    get(name) {
      return this.receivedCookieJar[name]?.value;
    }
    deleteCookie(name) {
      this.set(name, "", {
        path: "/",
        expires: /* @__PURE__ */ new Date(0)
      });
    }
    async getAndVerify(name) {
      const value = this.get(name);
      if (!value)
        return void 0;
      if (!await this.isSignedCookieValid(name)) {
        return void 0;
      }
      return value;
    }
    get canSign() {
      return this.keys?.length > 0;
    }
    set(name, value, opts = {}) {
      this.outgoingCookieJar[name] = {
        ...opts,
        name,
        value
      };
      this.updateHeader();
    }
    async setAndSign(name, value, opts = {}) {
      if (!this.canSign) {
        throw Error("No keys provided for signing.");
      }
      this.set(name, value, opts);
      const sigName = `${name}.sig`;
      const signature = await createCookieSignature(this.keys[0], value);
      this.set(sigName, signature, opts);
      this.updateHeader();
    }
    async isSignedCookieValid(cookieName) {
      const signedCookieName = `${cookieName}.sig`;
      if (!this.cookieExists(cookieName) || !this.cookieExists(signedCookieName)) {
        this.deleteInvalidCookies(cookieName, signedCookieName);
        return false;
      }
      const cookieValue = this.get(cookieName);
      const signature = this.get(signedCookieName);
      if (!cookieValue || !signature) {
        this.deleteInvalidCookies(cookieName, signedCookieName);
        return false;
      }
      const allCheckSignatures = await Promise.all(this.keys.map((key) => createCookieSignature(key, cookieValue)));
      const validSignature = allCheckSignatures.some((checkSignature) => safelyCompareSignatures(checkSignature, signature));
      if (!validSignature) {
        this.deleteInvalidCookies(cookieName, signedCookieName);
        return false;
      }
      return true;
    }
    cookieExists(cookieName) {
      return Boolean(this.get(cookieName));
    }
    deleteInvalidCookies(...cookieNames) {
      cookieNames.forEach((cookieName) => this.deleteCookie(cookieName));
    }
  };

  // node_modules/@shopify/shopify-api/dist/esm/runtime/http/index.mjs
  function isOK(resp) {
    return resp.statusCode >= 200 && resp.statusCode <= 299;
  }
  var abstractFetch = () => {
    throw new Error("Missing adapter implementation for 'abstractFetch' - make sure to import the appropriate adapter for your platform");
  };
  function setAbstractFetchFunc(func) {
    abstractFetch = func;
  }
  var abstractConvertRequest = () => {
    throw new Error("Missing adapter implementation for 'abstractConvertRequest' - make sure to import the appropriate adapter for your platform");
  };
  function setAbstractConvertRequestFunc(func) {
    abstractConvertRequest = func;
  }
  var abstractConvertIncomingResponse = () => Promise.resolve({});
  var abstractConvertResponse = () => {
    throw new Error("Missing adapter implementation for 'abstractConvertResponse' - make sure to import the appropriate adapter for your platform");
  };
  function setAbstractConvertResponseFunc(func) {
    abstractConvertResponse = func;
  }
  var abstractConvertHeaders = () => {
    throw new Error("Missing adapter implementation for 'abstractConvertHeaders' - make sure to import the appropriate adapter for your platform");
  };
  function setAbstractConvertHeadersFunc(func) {
    abstractConvertHeaders = func;
  }

  // node_modules/@shopify/shopify-api/dist/esm/runtime/platform/runtime-string.mjs
  var abstractRuntimeString = () => {
    throw new Error("Missing adapter implementation for 'abstractRuntimeString' - make sure to import the appropriate adapter for your platform");
  };
  function setAbstractRuntimeString(func) {
    abstractRuntimeString = func;
  }

  // node_modules/@shopify/shopify-api/dist/esm/adapters/web-api/index.mjs
  setAbstractFetchFunc(fetch);
  setAbstractConvertRequestFunc(webApiConvertRequest);
  setAbstractConvertResponseFunc(webApiConvertResponse);
  setAbstractConvertHeadersFunc(webApiConvertHeaders);
  setAbstractRuntimeString(webApiRuntimeString);

  // node_modules/compare-versions/lib/esm/utils.js
  var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
  var validateAndParse = (version) => {
    if (typeof version !== "string") {
      throw new TypeError("Invalid argument expected string");
    }
    const match = version.match(semver);
    if (!match) {
      throw new Error(`Invalid argument not valid semver ('${version}' received)`);
    }
    match.shift();
    return match;
  };
  var isWildcard = (s) => s === "*" || s === "x" || s === "X";
  var tryParse = (v) => {
    const n = parseInt(v, 10);
    return isNaN(n) ? v : n;
  };
  var forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
  var compareStrings = (a, b) => {
    if (isWildcard(a) || isWildcard(b))
      return 0;
    const [ap, bp] = forceType(tryParse(a), tryParse(b));
    if (ap > bp)
      return 1;
    if (ap < bp)
      return -1;
    return 0;
  };
  var compareSegments = (a, b) => {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const r = compareStrings(a[i] || "0", b[i] || "0");
      if (r !== 0)
        return r;
    }
    return 0;
  };

  // node_modules/compare-versions/lib/esm/compareVersions.js
  var compareVersions = (v1, v2) => {
    const n1 = validateAndParse(v1);
    const n2 = validateAndParse(v2);
    const p1 = n1.pop();
    const p2 = n2.pop();
    const r = compareSegments(n1, n2);
    if (r !== 0)
      return r;
    if (p1 && p2) {
      return compareSegments(p1.split("."), p2.split("."));
    } else if (p1 || p2) {
      return p1 ? -1 : 1;
    }
    return 0;
  };

  // node_modules/compare-versions/lib/esm/compare.js
  var compare = (v1, v2, operator) => {
    assertValidOperator(operator);
    const res = compareVersions(v1, v2);
    return operatorResMap[operator].includes(res);
  };
  var operatorResMap = {
    ">": [1],
    ">=": [0, 1],
    "=": [0],
    "<=": [-1, 0],
    "<": [-1],
    "!=": [-1, 1]
  };
  var allowedOperators = Object.keys(operatorResMap);
  var assertValidOperator = (op) => {
    if (typeof op !== "string") {
      throw new TypeError(`Invalid operator type, expected string but got ${typeof op}`);
    }
    if (allowedOperators.indexOf(op) === -1) {
      throw new Error(`Invalid operator, expected one of ${allowedOperators.join("|")}`);
    }
  };

  // node_modules/@shopify/shopify-api/dist/esm/lib/types.mjs
  var LogSeverity;
  (function(LogSeverity2) {
    LogSeverity2[LogSeverity2["Error"] = 0] = "Error";
    LogSeverity2[LogSeverity2["Warning"] = 1] = "Warning";
    LogSeverity2[LogSeverity2["Info"] = 2] = "Info";
    LogSeverity2[LogSeverity2["Debug"] = 3] = "Debug";
  })(LogSeverity || (LogSeverity = {}));
  var ApiVersion;
  (function(ApiVersion2) {
    ApiVersion2["October24"] = "2024-10";
    ApiVersion2["January25"] = "2025-01";
    ApiVersion2["April25"] = "2025-04";
    ApiVersion2["July25"] = "2025-07";
    ApiVersion2["October25"] = "2025-10";
    ApiVersion2["January26"] = "2026-01";
    ApiVersion2["April26"] = "2026-04";
    ApiVersion2["July26"] = "2026-07";
    ApiVersion2["Unstable"] = "unstable";
  })(ApiVersion || (ApiVersion = {}));
  var LIBRARY_NAME = "Shopify API Library";
  var ShopifyHeader;
  (function(ShopifyHeader2) {
    ShopifyHeader2["AccessToken"] = "X-Shopify-Access-Token";
    ShopifyHeader2["ApiVersion"] = "X-Shopify-API-Version";
    ShopifyHeader2["Domain"] = "X-Shopify-Shop-Domain";
    ShopifyHeader2["Hmac"] = "X-Shopify-Hmac-Sha256";
    ShopifyHeader2["Topic"] = "X-Shopify-Topic";
    ShopifyHeader2["SubTopic"] = "X-Shopify-Sub-Topic";
    ShopifyHeader2["WebhookId"] = "X-Shopify-Webhook-Id";
    ShopifyHeader2["Name"] = "X-Shopify-Name";
    ShopifyHeader2["TriggeredAt"] = "X-Shopify-Triggered-At";
    ShopifyHeader2["EventId"] = "X-Shopify-Event-Id";
    ShopifyHeader2["StorefrontPrivateToken"] = "Shopify-Storefront-Private-Token";
    ShopifyHeader2["StorefrontSDKVariant"] = "X-SDK-Variant";
    ShopifyHeader2["StorefrontSDKVersion"] = "X-SDK-Version";
  })(ShopifyHeader || (ShopifyHeader = {}));
  var ShopifyEventsHeader = {
    Hmac: "shopify-hmac-sha256",
    Topic: "shopify-topic",
    Domain: "shopify-shop-domain",
    ApiVersion: "shopify-api-version",
    EventId: "shopify-event-id",
    WebhookId: "shopify-webhook-id",
    Handle: "shopify-handle",
    Action: "shopify-action",
    ResourceId: "shopify-resource-id",
    TriggeredAt: "shopify-triggered-at"
  };
  var ClientType;
  (function(ClientType2) {
    ClientType2["Rest"] = "rest";
    ClientType2["Graphql"] = "graphql";
  })(ClientType || (ClientType = {}));
  var privacyTopics = [
    "CUSTOMERS_DATA_REQUEST",
    "CUSTOMERS_REDACT",
    "SHOP_REDACT"
  ];
  var BillingInterval;
  (function(BillingInterval2) {
    BillingInterval2["OneTime"] = "ONE_TIME";
    BillingInterval2["Every30Days"] = "EVERY_30_DAYS";
    BillingInterval2["Annual"] = "ANNUAL";
    BillingInterval2["Usage"] = "USAGE";
  })(BillingInterval || (BillingInterval = {}));
  var BillingReplacementBehavior;
  (function(BillingReplacementBehavior2) {
    BillingReplacementBehavior2["ApplyImmediately"] = "APPLY_IMMEDIATELY";
    BillingReplacementBehavior2["ApplyOnNextBillingCycle"] = "APPLY_ON_NEXT_BILLING_CYCLE";
    BillingReplacementBehavior2["Standard"] = "STANDARD";
  })(BillingReplacementBehavior || (BillingReplacementBehavior = {}));
  var StatusCode;
  (function(StatusCode2) {
    StatusCode2[StatusCode2["Continue"] = 100] = "Continue";
    StatusCode2[StatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    StatusCode2[StatusCode2["Ok"] = 200] = "Ok";
    StatusCode2[StatusCode2["Created"] = 201] = "Created";
    StatusCode2[StatusCode2["Accepted"] = 202] = "Accepted";
    StatusCode2[StatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    StatusCode2[StatusCode2["NoContent"] = 204] = "NoContent";
    StatusCode2[StatusCode2["ResetContent"] = 205] = "ResetContent";
    StatusCode2[StatusCode2["PartialContent"] = 206] = "PartialContent";
    StatusCode2[StatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
    StatusCode2[StatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
    StatusCode2[StatusCode2["Found"] = 302] = "Found";
    StatusCode2[StatusCode2["SeeOther"] = 303] = "SeeOther";
    StatusCode2[StatusCode2["NotModified"] = 304] = "NotModified";
    StatusCode2[StatusCode2["UseProxy"] = 305] = "UseProxy";
    StatusCode2[StatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    StatusCode2[StatusCode2["BadRequest"] = 400] = "BadRequest";
    StatusCode2[StatusCode2["Unauthorized"] = 401] = "Unauthorized";
    StatusCode2[StatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
    StatusCode2[StatusCode2["Forbidden"] = 403] = "Forbidden";
    StatusCode2[StatusCode2["NotFound"] = 404] = "NotFound";
    StatusCode2[StatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    StatusCode2[StatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
    StatusCode2[StatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    StatusCode2[StatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
    StatusCode2[StatusCode2["Conflict"] = 409] = "Conflict";
    StatusCode2[StatusCode2["Gone"] = 410] = "Gone";
    StatusCode2[StatusCode2["LengthRequired"] = 411] = "LengthRequired";
    StatusCode2[StatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
    StatusCode2[StatusCode2["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
    StatusCode2[StatusCode2["RequestUriTooLong"] = 414] = "RequestUriTooLong";
    StatusCode2[StatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    StatusCode2[StatusCode2["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    StatusCode2[StatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
    StatusCode2[StatusCode2["ImATeapot"] = 418] = "ImATeapot";
    StatusCode2[StatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    StatusCode2[StatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
    StatusCode2[StatusCode2["InternalServerError"] = 500] = "InternalServerError";
    StatusCode2[StatusCode2["NotImplemented"] = 501] = "NotImplemented";
    StatusCode2[StatusCode2["BadGateway"] = 502] = "BadGateway";
    StatusCode2[StatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    StatusCode2[StatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
    StatusCode2[StatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
  })(StatusCode || (StatusCode = {}));
  var Method;
  (function(Method3) {
    Method3["Get"] = "GET";
    Method3["Post"] = "POST";
    Method3["Put"] = "PUT";
    Method3["Patch"] = "PATCH";
    Method3["Delete"] = "DELETE";
    Method3["Head"] = "HEAD";
    Method3["Options"] = "OPTIONS";
    Method3["Connect"] = "CONNECT";
  })(Method || (Method = {}));

  // node_modules/@shopify/shopify-api/dist/esm/lib/version.mjs
  var SHOPIFY_API_LIBRARY_VERSION = "13.1.0";

  // node_modules/@shopify/shopify-api/dist/esm/lib/logger/log.mjs
  function log(config2) {
    return function(severity, message2, context = {}) {
      if (severity > config2.logger.level) {
        return;
      }
      const prefix = [];
      if (config2.logger.timestamps) {
        prefix.push(`${(/* @__PURE__ */ new Date()).toISOString().slice(0, -5)}Z`);
      }
      let packageString = context.package || "shopify-api";
      delete context.package;
      switch (severity) {
        case LogSeverity.Debug:
          packageString = `${packageString}/DEBUG`;
          break;
        case LogSeverity.Info:
          packageString = `${packageString}/INFO`;
          break;
        case LogSeverity.Warning:
          packageString = `${packageString}/WARNING`;
          break;
        case LogSeverity.Error:
          packageString = `${packageString}/ERROR`;
          break;
      }
      prefix.push(packageString);
      const contextParts = [];
      Object.entries(context).forEach(([key, value]) => {
        contextParts.push(`${key}: ${value}`);
      });
      let suffix = "";
      if (contextParts.length > 0) {
        suffix = ` | {${contextParts.join(", ")}}`;
      }
      config2.logger.log(severity, `[${prefix.join("] [")}] ${message2}${suffix}`);
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/logger/index.mjs
  function logger(config2) {
    const logFunction = log(config2);
    return {
      log: logFunction,
      debug: async (message2, context = {}) => logFunction(LogSeverity.Debug, message2, context),
      info: async (message2, context = {}) => logFunction(LogSeverity.Info, message2, context),
      warning: async (message2, context = {}) => logFunction(LogSeverity.Warning, message2, context),
      error: async (message2, context = {}) => logFunction(LogSeverity.Error, message2, context),
      deprecated: deprecated(logFunction)
    };
  }
  function deprecated(logFunction) {
    return function(version, message2) {
      if (compare(SHOPIFY_API_LIBRARY_VERSION, version, ">=")) {
        throw new FeatureDeprecatedError(`Feature was deprecated in version ${version}`);
      }
      return logFunction(LogSeverity.Warning, `[Deprecated | ${version}] ${message2}`);
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/rest/load-rest-resources.mjs
  function loadRestResources({ resources, config: config2, RestClient: RestClient2 }) {
    const firstResource = Object.keys(resources)[0];
    if (config2.apiVersion !== resources[firstResource].apiVersion) {
      logger(config2).warning(`Loading REST resources for API version ${resources[firstResource].apiVersion}, which doesn't match the default ${config2.apiVersion}`);
    }
    return Object.fromEntries(Object.entries(resources).map(([name, resource]) => {
      class NewResource extends resource {
      }
      NewResource.setClassProperties({
        Client: RestClient2,
        config: config2
      });
      Object.entries(NewResource.hasOne).map(([_attribute, klass]) => {
        klass.setClassProperties({
          Client: RestClient2,
          config: config2
        });
      });
      Object.entries(NewResource.hasMany).map(([_attribute, klass]) => {
        klass.setClassProperties({
          Client: RestClient2,
          config: config2
        });
      });
      Reflect.defineProperty(NewResource, "name", {
        value: name
      });
      return [name, NewResource];
    }));
  }

  // node_modules/@shopify/shopify-api/dist/esm/future/flags.mjs
  function logDisabledFutureFlags(config2, logger2) {
    if (!config2._logDisabledFutureFlags) {
      return;
    }
    const logFlag = (flag, message2) => logger2.info(`Future flag ${flag} is disabled.

  ${message2}
`);
    if (!config2.future?.customerAddressDefaultFix) {
      logFlag("customerAddressDefaultFix", "Enable this flag to change the CustomerAddress classes to expose a 'is_default' property instead of 'default' when fetching data.");
    }
    if (!config2.future?.unstable_managedPricingSupport) {
      logFlag("unstable_managedPricingSupport", "Enable this flag to support managed pricing, so apps can check for payments without needing a billing config. Learn more at https://shopify.dev/docs/apps/launch/billing/managed-pricing");
    }
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/scopes/index.mjs
  var AuthScopes = class _AuthScopes {
    static SCOPE_DELIMITER = ",";
    compressedScopes;
    expandedScopes;
    originalScopes;
    constructor(scopes) {
      let scopesArray = [];
      if (typeof scopes === "string") {
        scopesArray = scopes.split(new RegExp(`${_AuthScopes.SCOPE_DELIMITER}\\s*`));
      } else if (Array.isArray(scopes)) {
        scopesArray = scopes;
      } else if (scopes) {
        scopesArray = Array.from(scopes.expandedScopes);
      }
      scopesArray = scopesArray.map((scope) => scope.trim()).filter((scope) => scope.length);
      const impliedScopes = this.getImpliedScopes(scopesArray);
      const scopeSet = new Set(scopesArray);
      const impliedSet = new Set(impliedScopes);
      this.compressedScopes = new Set([...scopeSet].filter((x) => !impliedSet.has(x)));
      this.expandedScopes = /* @__PURE__ */ new Set([...scopeSet, ...impliedSet]);
      this.originalScopes = scopeSet;
    }
    /**
     * Checks whether the current set of scopes includes the given one.
     */
    has(scope) {
      let other;
      if (scope instanceof _AuthScopes) {
        other = scope;
      } else {
        other = new _AuthScopes(scope);
      }
      return other.toArray().filter((x) => !this.expandedScopes.has(x)).length === 0;
    }
    /**
     * Checks whether the current set of scopes equals the given one.
     */
    equals(otherScopes) {
      let other;
      if (otherScopes instanceof _AuthScopes) {
        other = otherScopes;
      } else {
        other = new _AuthScopes(otherScopes);
      }
      return this.compressedScopes.size === other.compressedScopes.size && this.toArray().filter((x) => !other.has(x)).length === 0;
    }
    /**
     * Returns a comma-separated string with the current set of scopes.
     */
    toString() {
      return this.toArray().join(_AuthScopes.SCOPE_DELIMITER);
    }
    /**
     * Returns an array with the current set of scopes.
     */
    toArray(returnOriginalScopes = false) {
      return returnOriginalScopes ? [...this.originalScopes] : [...this.compressedScopes];
    }
    getImpliedScopes(scopesArray) {
      return scopesArray.reduce((array, current) => {
        const matches = current.match(/^(unauthenticated_)?write_(.*)$/);
        if (matches) {
          array.push(`${matches[1] ? matches[1] : ""}read_${matches[2]}`);
        }
        return array;
      }, []);
    }
  };

  // node_modules/@shopify/shopify-api/dist/esm/lib/config.mjs
  function validateConfig(params) {
    const config2 = {
      apiKey: "",
      apiSecretKey: "",
      hostName: "",
      hostScheme: "https",
      isEmbeddedApp: true,
      isCustomStoreApp: false,
      logger: {
        log: defaultLogFunction,
        level: LogSeverity.Info,
        httpRequests: false,
        timestamps: false
      },
      future: {},
      _logDisabledFutureFlags: true
    };
    const mandatory = [
      "apiSecretKey",
      "hostName",
      "apiVersion"
    ];
    if (!("isCustomStoreApp" in params) || !params.isCustomStoreApp) {
      mandatory.push("apiKey");
    }
    if ("isCustomStoreApp" in params && params.isCustomStoreApp) {
      if (!("adminApiAccessToken" in params) || params.adminApiAccessToken?.length === 0) {
        mandatory.push("adminApiAccessToken");
      }
    }
    const missing = [];
    mandatory.forEach((key) => {
      if (!notEmpty(params[key])) {
        missing.push(key);
      }
    });
    if (missing.length) {
      throw new ShopifyError(`Cannot initialize Shopify API Library. Missing values for: ${missing.join(", ")}. For apiVersion, please specify an explicit API version (e.g., ApiVersion.July25). See https://shopify.dev/docs/api/usage/versioning for more information.`);
    }
    const { hostScheme, isCustomStoreApp, adminApiAccessToken, userAgentPrefix, logger: logger$1, privateAppStorefrontAccessToken, billing, future, ...mandatoryParams } = params;
    let scopes;
    if (params.scopes === void 0) {
      scopes = void 0;
    } else if (params.scopes instanceof AuthScopes) {
      scopes = params.scopes;
    } else {
      scopes = new AuthScopes(params.scopes);
    }
    Object.assign(config2, mandatoryParams, {
      hostName: params.hostName.replace(/\/$/, ""),
      scopes,
      hostScheme: hostScheme ?? config2.hostScheme,
      isCustomStoreApp: isCustomStoreApp ?? config2.isCustomStoreApp,
      adminApiAccessToken: adminApiAccessToken ?? config2.adminApiAccessToken,
      userAgentPrefix: userAgentPrefix ?? config2.userAgentPrefix,
      logger: { ...config2.logger, ...logger$1 || {} },
      privateAppStorefrontAccessToken: privateAppStorefrontAccessToken ?? config2.privateAppStorefrontAccessToken,
      billing: billing ?? config2.billing,
      future: future ?? config2.future
    });
    if (config2.isCustomStoreApp && params.adminApiAccessToken === params.apiSecretKey) {
      logger(config2).warning("adminApiAccessToken is set to the same value as apiSecretKey. adminApiAccessToken should be set to the Admin API access token for custom store apps; apiSecretKey should be set to the custom store app's API secret key.");
    }
    return config2;
  }
  function notEmpty(value) {
    if (value == null) {
      return false;
    }
    return typeof value === "string" || Array.isArray(value) ? value.length > 0 : true;
  }
  function defaultLogFunction(severity, message2) {
    switch (severity) {
      case LogSeverity.Debug:
        console.debug(message2);
        break;
      case LogSeverity.Info:
        console.log(message2);
        break;
      case LogSeverity.Warning:
        console.warn(message2);
        break;
      case LogSeverity.Error:
        console.error(message2);
        break;
    }
  }

  // node_modules/@shopify/graphql-client/dist/graphql-client/constants.mjs
  var CLIENT = "GraphQL Client";
  var MIN_RETRIES = 0;
  var MAX_RETRIES = 3;
  var GQL_API_ERROR = "An error occurred while fetching from the API. Review 'graphQLErrors' for details.";
  var UNEXPECTED_CONTENT_TYPE_ERROR = "Response returned unexpected Content-Type:";
  var NO_DATA_OR_ERRORS_ERROR = "An unknown error has occurred. The API did not return a data object or any errors in its response.";
  var CONTENT_TYPES = {
    json: "application/json",
    multipart: "multipart/mixed"
  };
  var SDK_VARIANT_HEADER = "X-SDK-Variant";
  var SDK_VERSION_HEADER = "X-SDK-Version";
  var DEFAULT_SDK_VARIANT = "shopify-graphql-client";
  var DEFAULT_CLIENT_VERSION = "1.4.2";
  var RETRY_WAIT_TIME = 1e3;
  var RETRIABLE_STATUS_CODES = [429, 503];
  var DEFER_OPERATION_REGEX = /@(defer)\b/i;
  var NEWLINE_SEPARATOR = "\r\n";
  var BOUNDARY_HEADER_REGEX = /boundary="?([^=";]+)"?/i;
  var HEADER_SEPARATOR = NEWLINE_SEPARATOR + NEWLINE_SEPARATOR;

  // node_modules/@shopify/graphql-client/dist/graphql-client/utilities.mjs
  function formatErrorMessage(message2, client = CLIENT) {
    return message2.startsWith(`${client}`) ? message2 : `${client}: ${message2}`;
  }
  function getErrorMessage(error) {
    return error instanceof Error ? error.message : JSON.stringify(error);
  }
  function getErrorCause(error) {
    return error instanceof Error && error.cause ? error.cause : void 0;
  }
  function combineErrors(dataArray) {
    return dataArray.flatMap(({ errors }) => {
      return errors ?? [];
    });
  }
  function validateRetries({ client, retries }) {
    if (retries !== void 0 && (typeof retries !== "number" || retries < MIN_RETRIES || retries > MAX_RETRIES)) {
      throw new Error(`${client}: The provided "retries" value (${retries}) is invalid - it cannot be less than ${MIN_RETRIES} or greater than ${MAX_RETRIES}`);
    }
  }
  function getKeyValueIfValid(key, value) {
    return value && (typeof value !== "object" || Array.isArray(value) || typeof value === "object" && Object.keys(value).length > 0) ? { [key]: value } : {};
  }
  function buildDataObjectByPath(path, data2) {
    if (path.length === 0) {
      return data2;
    }
    const key = path.pop();
    const newData = {
      [key]: data2
    };
    if (path.length === 0) {
      return newData;
    }
    return buildDataObjectByPath(path, newData);
  }
  function combineObjects(baseObject, newObject) {
    return Object.keys(newObject || {}).reduce((acc, key) => {
      if ((typeof newObject[key] === "object" || Array.isArray(newObject[key])) && baseObject[key]) {
        acc[key] = combineObjects(baseObject[key], newObject[key]);
        return acc;
      }
      acc[key] = newObject[key];
      return acc;
    }, Array.isArray(baseObject) ? [...baseObject] : { ...baseObject });
  }
  function buildCombinedDataObject([initialDatum, ...remainingData]) {
    return remainingData.reduce(combineObjects, { ...initialDatum });
  }

  // node_modules/@shopify/graphql-client/dist/graphql-client/http-fetch.mjs
  function generateHttpFetch({ clientLogger, customFetchApi = fetch, client = CLIENT, defaultRetryWaitTime = RETRY_WAIT_TIME, retriableCodes = RETRIABLE_STATUS_CODES }) {
    const httpFetch = async (requestParams, count, maxRetries) => {
      const nextCount = count + 1;
      const maxTries = maxRetries + 1;
      let response;
      try {
        response = await customFetchApi(...requestParams);
        clientLogger({
          type: "HTTP-Response",
          content: {
            requestParams,
            response
          }
        });
        if (!response.ok && retriableCodes.includes(response.status) && nextCount <= maxTries) {
          throw new Error();
        }
        const deprecationNotice = response?.headers.get("X-Shopify-API-Deprecated-Reason") || "";
        if (deprecationNotice) {
          clientLogger({
            type: "HTTP-Response-GraphQL-Deprecation-Notice",
            content: {
              requestParams,
              deprecationNotice
            }
          });
        }
        return response;
      } catch (error) {
        if (nextCount <= maxTries) {
          const retryAfter = response?.headers.get("Retry-After");
          await sleep(retryAfter ? parseInt(retryAfter, 10) : defaultRetryWaitTime);
          clientLogger({
            type: "HTTP-Retry",
            content: {
              requestParams,
              lastResponse: response,
              retryAttempt: count,
              maxRetries
            }
          });
          return httpFetch(requestParams, nextCount, maxRetries);
        }
        throw new Error(formatErrorMessage(`${maxRetries > 0 ? `Attempted maximum number of ${maxRetries} network retries. Last message - ` : ""}${getErrorMessage(error)}`, client));
      }
    };
    return httpFetch;
  }
  async function sleep(waitTime) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  // node_modules/@shopify/graphql-client/dist/graphql-client/graphql-client.mjs
  function createGraphQLClient({ headers: headers2, url, customFetchApi = fetch, retries = 0, logger: logger2 }) {
    validateRetries({ client: CLIENT, retries });
    const config2 = {
      headers: headers2,
      url,
      retries
    };
    const clientLogger = generateClientLogger(logger2);
    const httpFetch = generateHttpFetch({
      customFetchApi,
      clientLogger,
      defaultRetryWaitTime: RETRY_WAIT_TIME
    });
    const fetchFn = generateFetch(httpFetch, config2);
    const request2 = generateRequest(fetchFn);
    const requestStream = generateRequestStream(fetchFn);
    return {
      config: config2,
      fetch: fetchFn,
      request: request2,
      requestStream
    };
  }
  function generateClientLogger(logger2) {
    return (logContent) => {
      if (logger2) {
        logger2(logContent);
      }
    };
  }
  async function processJSONResponse(response) {
    const { errors, data: data2, extensions } = await response.json();
    return {
      ...getKeyValueIfValid("data", data2),
      ...getKeyValueIfValid("extensions", extensions),
      headers: response.headers,
      ...errors || !data2 ? {
        errors: {
          networkStatusCode: response.status,
          message: formatErrorMessage(errors ? GQL_API_ERROR : NO_DATA_OR_ERRORS_ERROR),
          ...getKeyValueIfValid("graphQLErrors", errors),
          response
        }
      } : {}
    };
  }
  function generateFetch(httpFetch, { url, headers: headers2, retries }) {
    return async (operation, options = {}) => {
      const { variables, headers: overrideHeaders, url: overrideUrl, retries: overrideRetries, keepalive, signal } = options;
      const body = JSON.stringify({
        query: operation,
        variables
      });
      validateRetries({ client: CLIENT, retries: overrideRetries });
      const flatHeaders2 = Object.entries({
        ...headers2,
        ...overrideHeaders
      }).reduce((headers3, [key, value]) => {
        headers3[key] = Array.isArray(value) ? value.join(", ") : value.toString();
        return headers3;
      }, {});
      if (!flatHeaders2[SDK_VARIANT_HEADER] && !flatHeaders2[SDK_VERSION_HEADER]) {
        flatHeaders2[SDK_VARIANT_HEADER] = DEFAULT_SDK_VARIANT;
        flatHeaders2[SDK_VERSION_HEADER] = DEFAULT_CLIENT_VERSION;
      }
      const fetchParams = [
        overrideUrl ?? url,
        {
          method: "POST",
          headers: flatHeaders2,
          body,
          signal,
          keepalive
        }
      ];
      return httpFetch(fetchParams, 1, overrideRetries ?? retries);
    };
  }
  function generateRequest(fetchFn) {
    return async (...props) => {
      if (DEFER_OPERATION_REGEX.test(props[0])) {
        throw new Error(formatErrorMessage("This operation will result in a streamable response - use requestStream() instead."));
      }
      let response = null;
      try {
        response = await fetchFn(...props);
        const { status, statusText } = response;
        const contentType = response.headers.get("content-type") || "";
        if (!response.ok) {
          return {
            errors: {
              networkStatusCode: status,
              message: formatErrorMessage(statusText),
              response
            }
          };
        }
        if (!contentType.includes(CONTENT_TYPES.json)) {
          return {
            errors: {
              networkStatusCode: status,
              message: formatErrorMessage(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${contentType}`),
              response
            }
          };
        }
        return await processJSONResponse(response);
      } catch (error) {
        return {
          errors: {
            message: getErrorMessage(error),
            ...response == null ? {} : {
              networkStatusCode: response.status,
              response
            }
          }
        };
      }
    };
  }
  async function* getStreamBodyIterator(response) {
    const decoder2 = new TextDecoder();
    if (response.body[Symbol.asyncIterator]) {
      for await (const chunk of response.body) {
        yield decoder2.decode(chunk);
      }
    } else {
      const reader = response.body.getReader();
      let readResult;
      try {
        while (!(readResult = await reader.read()).done) {
          yield decoder2.decode(readResult.value);
        }
      } finally {
        reader.cancel();
      }
    }
  }
  function readStreamChunk(streamBodyIterator, boundary2) {
    return {
      async *[Symbol.asyncIterator]() {
        try {
          let buffer = "";
          for await (const textChunk of streamBodyIterator) {
            buffer += textChunk;
            if (buffer.indexOf(boundary2) > -1) {
              const lastBoundaryIndex = buffer.lastIndexOf(boundary2);
              const fullResponses = buffer.slice(0, lastBoundaryIndex);
              const chunkBodies = fullResponses.split(boundary2).filter((chunk) => chunk.trim().length > 0).map((chunk) => {
                const body = chunk.slice(chunk.indexOf(HEADER_SEPARATOR) + HEADER_SEPARATOR.length).trim();
                return body;
              });
              if (chunkBodies.length > 0) {
                yield chunkBodies;
              }
              buffer = buffer.slice(lastBoundaryIndex + boundary2.length);
              if (buffer.trim() === `--`) {
                buffer = "";
              }
            }
          }
        } catch (error) {
          throw new Error(`Error occured while processing stream payload - ${getErrorMessage(error)}`);
        }
      }
    };
  }
  function createJsonResponseAsyncIterator(response) {
    return {
      async *[Symbol.asyncIterator]() {
        try {
          const processedResponse = await processJSONResponse(response);
          yield {
            ...processedResponse,
            hasNext: false
          };
        } catch (error) {
          yield {
            errors: {
              message: formatErrorMessage(getErrorMessage(error)),
              networkStatusCode: response.status,
              response
            },
            hasNext: false
          };
        }
      }
    };
  }
  function getResponseDataFromChunkBodies(chunkBodies) {
    return chunkBodies.map((value) => {
      try {
        return JSON.parse(value);
      } catch (error) {
        throw new Error(`Error in parsing multipart response - ${getErrorMessage(error)}`);
      }
    }).map((payload) => {
      const { data: data2, incremental, hasNext, extensions, errors } = payload;
      if (!incremental) {
        return {
          data: data2 || {},
          ...getKeyValueIfValid("errors", errors),
          ...getKeyValueIfValid("extensions", extensions),
          hasNext
        };
      }
      const incrementalArray = incremental.map(({ data: data3, path, errors: errors2 }) => {
        return {
          data: data3 && path ? buildDataObjectByPath(path, data3) : {},
          ...getKeyValueIfValid("errors", errors2)
        };
      });
      return {
        data: incrementalArray.length === 1 ? incrementalArray[0].data : buildCombinedDataObject([
          ...incrementalArray.map(({ data: data3 }) => data3)
        ]),
        ...getKeyValueIfValid("errors", combineErrors(incrementalArray)),
        hasNext
      };
    });
  }
  function validateResponseData(responseErrors, combinedData) {
    if (responseErrors.length > 0) {
      throw new Error(GQL_API_ERROR, {
        cause: {
          graphQLErrors: responseErrors
        }
      });
    }
    if (Object.keys(combinedData).length === 0) {
      throw new Error(NO_DATA_OR_ERRORS_ERROR);
    }
  }
  function createMultipartResponseAsyncInterator(response, responseContentType) {
    const boundaryHeader = (responseContentType ?? "").match(BOUNDARY_HEADER_REGEX);
    const boundary2 = `--${boundaryHeader ? boundaryHeader[1] : "-"}`;
    if (!response.body?.getReader && !response.body?.[Symbol.asyncIterator]) {
      throw new Error("API multipart response did not return an iterable body", {
        cause: response
      });
    }
    const streamBodyIterator = getStreamBodyIterator(response);
    let combinedData = {};
    let responseExtensions;
    return {
      async *[Symbol.asyncIterator]() {
        try {
          let streamHasNext = true;
          for await (const chunkBodies of readStreamChunk(streamBodyIterator, boundary2)) {
            const responseData = getResponseDataFromChunkBodies(chunkBodies);
            responseExtensions = responseData.find((datum) => datum.extensions)?.extensions ?? responseExtensions;
            const responseErrors = combineErrors(responseData);
            combinedData = buildCombinedDataObject([
              combinedData,
              ...responseData.map(({ data: data2 }) => data2)
            ]);
            streamHasNext = responseData.slice(-1)[0].hasNext;
            validateResponseData(responseErrors, combinedData);
            yield {
              ...getKeyValueIfValid("data", combinedData),
              ...getKeyValueIfValid("extensions", responseExtensions),
              hasNext: streamHasNext
            };
          }
          if (streamHasNext) {
            throw new Error(`Response stream terminated unexpectedly`);
          }
        } catch (error) {
          const cause = getErrorCause(error);
          yield {
            ...getKeyValueIfValid("data", combinedData),
            ...getKeyValueIfValid("extensions", responseExtensions),
            errors: {
              message: formatErrorMessage(getErrorMessage(error)),
              networkStatusCode: response.status,
              ...getKeyValueIfValid("graphQLErrors", cause?.graphQLErrors),
              response
            },
            hasNext: false
          };
        }
      }
    };
  }
  function generateRequestStream(fetchFn) {
    return async (...props) => {
      if (!DEFER_OPERATION_REGEX.test(props[0])) {
        throw new Error(formatErrorMessage("This operation does not result in a streamable response - use request() instead."));
      }
      try {
        const response = await fetchFn(...props);
        const { statusText } = response;
        if (!response.ok) {
          throw new Error(statusText, { cause: response });
        }
        const responseContentType = response.headers.get("content-type") || "";
        switch (true) {
          case responseContentType.includes(CONTENT_TYPES.json):
            return createJsonResponseAsyncIterator(response);
          case responseContentType.includes(CONTENT_TYPES.multipart):
            return createMultipartResponseAsyncInterator(response, responseContentType);
          default:
            throw new Error(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${responseContentType}`, { cause: response });
        }
      } catch (error) {
        return {
          async *[Symbol.asyncIterator]() {
            const response = getErrorCause(error);
            yield {
              errors: {
                message: formatErrorMessage(getErrorMessage(error)),
                ...getKeyValueIfValid("networkStatusCode", response?.status),
                ...getKeyValueIfValid("response", response)
              },
              hasNext: false
            };
          }
        };
      }
    };
  }

  // node_modules/@shopify/graphql-client/dist/api-client-utilities/validations.mjs
  function validateDomainAndGetStoreUrl({ client, storeDomain }) {
    try {
      if (!storeDomain || typeof storeDomain !== "string") {
        throw new Error();
      }
      const trimmedDomain = storeDomain.trim();
      const protocolUrl = trimmedDomain.match(/^https?:/) ? trimmedDomain : `https://${trimmedDomain}`;
      const url = new URL(protocolUrl);
      url.protocol = "https";
      return url.origin;
    } catch (error) {
      throw new Error(`${client}: a valid store domain ("${storeDomain}") must be provided`, { cause: error });
    }
  }
  function validateApiVersion({ client, currentSupportedApiVersions, apiVersion: apiVersion2, logger: logger2 }) {
    const versionError = `${client}: the provided apiVersion ("${apiVersion2}")`;
    const supportedVersion = `Currently supported API versions: ${currentSupportedApiVersions.join(", ")}`;
    if (!apiVersion2 || typeof apiVersion2 !== "string") {
      throw new Error(`${versionError} is invalid. ${supportedVersion}`);
    }
    const trimmedApiVersion = apiVersion2.trim();
    if (!currentSupportedApiVersions.includes(trimmedApiVersion)) {
      if (logger2) {
        logger2({
          type: "Unsupported_Api_Version",
          content: {
            apiVersion: apiVersion2,
            supportedApiVersions: currentSupportedApiVersions
          }
        });
      } else {
        console.warn(`${versionError} is likely deprecated or not supported. ${supportedVersion}`);
      }
    }
  }

  // node_modules/@shopify/graphql-client/dist/api-client-utilities/api-versions.mjs
  function getQuarterMonth(quarter) {
    const month = quarter * 3 - 2;
    return month === 10 ? month : `0${month}`;
  }
  function getPrevousVersion(year2, quarter, nQuarter) {
    const versionQuarter = quarter - nQuarter;
    if (versionQuarter <= 0) {
      return `${year2 - 1}-${getQuarterMonth(versionQuarter + 4)}`;
    }
    return `${year2}-${getQuarterMonth(versionQuarter)}`;
  }
  function getCurrentApiVersion() {
    const date = /* @__PURE__ */ new Date();
    const month = date.getUTCMonth();
    const year2 = date.getUTCFullYear();
    const quarter = Math.floor(month / 3 + 1);
    return {
      year: year2,
      quarter,
      version: `${year2}-${getQuarterMonth(quarter)}`
    };
  }
  function getCurrentSupportedApiVersions() {
    const { year: year2, quarter, version: currentVersion } = getCurrentApiVersion();
    const nextVersion = quarter === 4 ? `${year2 + 1}-01` : `${year2}-${getQuarterMonth(quarter + 1)}`;
    return [
      getPrevousVersion(year2, quarter, 3),
      getPrevousVersion(year2, quarter, 2),
      getPrevousVersion(year2, quarter, 1),
      currentVersion,
      nextVersion,
      "unstable"
    ];
  }

  // node_modules/@shopify/graphql-client/dist/api-client-utilities/utilities.mjs
  function generateGetHeaders(config2) {
    return (customHeaders) => {
      return { ...customHeaders ?? {}, ...config2.headers };
    };
  }
  function generateGetGQLClientParams({ getHeaders: getHeaders2, getApiUrl }) {
    return (operation, options) => {
      const props = [operation];
      if (options && Object.keys(options).length > 0) {
        const { variables, apiVersion: propApiVersion, headers: headers2, retries, signal } = options;
        props.push({
          ...variables ? { variables } : {},
          ...headers2 ? { headers: getHeaders2(headers2) } : {},
          ...propApiVersion ? { url: getApiUrl(propApiVersion) } : {},
          ...retries ? { retries } : {},
          ...signal ? { signal } : {}
        });
      }
      return props;
    };
  }

  // node_modules/@shopify/admin-api-client/dist/constants.mjs
  var DEFAULT_CONTENT_TYPE = "application/json";
  var DEFAULT_CLIENT_VERSION2 = "1.1.2";
  var ACCESS_TOKEN_HEADER = "X-Shopify-Access-Token";
  var CLIENT2 = "Admin API Client";
  var RETRIABLE_STATUS_CODES2 = [429, 500, 503];
  var DEFAULT_RETRY_WAIT_TIME = 1e3;

  // node_modules/@shopify/admin-api-client/dist/validations.mjs
  function validateRequiredAccessToken(accessToken) {
    if (!accessToken) {
      throw new Error(`${CLIENT2}: an access token must be provided`);
    }
  }
  function validateServerSideUsage(isTesting = false) {
    if (typeof window !== "undefined" && !isTesting) {
      throw new Error(`${CLIENT2}: this client should not be used in the browser`);
    }
  }

  // node_modules/@shopify/admin-api-client/dist/graphql/client.mjs
  function createAdminApiClient({ storeDomain, apiVersion: apiVersion2, accessToken, userAgentPrefix, retries = 0, customFetchApi, logger: logger2, isTesting }) {
    const currentSupportedApiVersions = getCurrentSupportedApiVersions();
    const storeUrl = validateDomainAndGetStoreUrl({
      client: CLIENT2,
      storeDomain
    });
    const baseApiVersionValidationParams = {
      client: CLIENT2,
      currentSupportedApiVersions,
      logger: logger2
    };
    validateServerSideUsage(isTesting);
    validateApiVersion({
      client: CLIENT2,
      currentSupportedApiVersions,
      apiVersion: apiVersion2,
      logger: logger2
    });
    validateRequiredAccessToken(accessToken);
    const apiUrlFormatter = generateApiUrlFormatter(storeUrl, apiVersion2, baseApiVersionValidationParams);
    const config2 = {
      storeDomain: storeUrl,
      apiVersion: apiVersion2,
      accessToken,
      headers: {
        "Content-Type": DEFAULT_CONTENT_TYPE,
        Accept: DEFAULT_CONTENT_TYPE,
        [ACCESS_TOKEN_HEADER]: accessToken,
        "User-Agent": `${userAgentPrefix ? `${userAgentPrefix} | ` : ""}${CLIENT2} v${DEFAULT_CLIENT_VERSION2}`
      },
      apiUrl: apiUrlFormatter(),
      userAgentPrefix
    };
    const graphqlClient = createGraphQLClient({
      headers: config2.headers,
      url: config2.apiUrl,
      retries,
      customFetchApi,
      logger: logger2
    });
    const getHeaders2 = generateGetHeaders(config2);
    const getApiUrl = generateGetApiUrl(config2, apiUrlFormatter);
    const getGQLClientParams = generateGetGQLClientParams({
      getHeaders: getHeaders2,
      getApiUrl
    });
    const client = {
      config: config2,
      getHeaders: getHeaders2,
      getApiUrl,
      fetch: (...props) => {
        return graphqlClient.fetch(...getGQLClientParams(...props));
      },
      request: (...props) => {
        return graphqlClient.request(...getGQLClientParams(...props));
      }
    };
    return Object.freeze(client);
  }
  function generateApiUrlFormatter(storeUrl, defaultApiVersion, baseApiVersionValidationParams) {
    return (apiVersion2) => {
      if (apiVersion2) {
        validateApiVersion({
          ...baseApiVersionValidationParams,
          apiVersion: apiVersion2
        });
      }
      const urlApiVersion = (apiVersion2 ?? defaultApiVersion).trim();
      return `${storeUrl}/admin/api/${urlApiVersion}/graphql.json`;
    };
  }
  function generateGetApiUrl(config2, apiUrlFormatter) {
    return (propApiVersion) => {
      return propApiVersion ? apiUrlFormatter(propApiVersion) : config2.apiUrl;
    };
  }

  // node_modules/@shopify/admin-api-client/dist/rest/types.mjs
  var Method2;
  (function(Method3) {
    Method3["Get"] = "GET";
    Method3["Post"] = "POST";
    Method3["Put"] = "PUT";
    Method3["Delete"] = "DELETE";
  })(Method2 || (Method2 = {}));

  // node_modules/@shopify/admin-api-client/dist/rest/client.mjs
  function createAdminRestApiClient({ storeDomain, apiVersion: apiVersion2, accessToken, userAgentPrefix, logger: logger2, customFetchApi = fetch, retries: clientRetries = 0, scheme = "https", defaultRetryTime = DEFAULT_RETRY_WAIT_TIME, formatPaths = true, isTesting }) {
    const currentSupportedApiVersions = getCurrentSupportedApiVersions();
    const storeUrl = validateDomainAndGetStoreUrl({
      client: CLIENT2,
      storeDomain
    }).replace("https://", `${scheme}://`);
    const baseApiVersionValidationParams = {
      client: CLIENT2,
      currentSupportedApiVersions,
      logger: logger2
    };
    validateServerSideUsage(isTesting);
    validateApiVersion({
      client: CLIENT2,
      currentSupportedApiVersions,
      apiVersion: apiVersion2,
      logger: logger2
    });
    validateRequiredAccessToken(accessToken);
    validateRetries({ client: CLIENT2, retries: clientRetries });
    const apiUrlFormatter = generateApiUrlFormatter2(storeUrl, apiVersion2, baseApiVersionValidationParams, formatPaths);
    const clientLogger = generateClientLogger2(logger2);
    const httpFetch = generateHttpFetch({
      customFetchApi,
      clientLogger,
      defaultRetryWaitTime: defaultRetryTime,
      client: CLIENT2,
      retriableCodes: RETRIABLE_STATUS_CODES2
    });
    const request2 = async (path, { method, data: data2, headers: requestHeadersObj, searchParams, retries = 0, apiVersion: apiVersion3 }) => {
      validateRetries({ client: CLIENT2, retries });
      const url = apiUrlFormatter(path, searchParams ?? {}, apiVersion3);
      const requestHeaders = normalizedHeaders(requestHeadersObj ?? {});
      const userAgent = [
        ...requestHeaders["user-agent"] ? [requestHeaders["user-agent"]] : [],
        ...userAgentPrefix ? [userAgentPrefix] : [],
        `${CLIENT2} v${DEFAULT_CLIENT_VERSION2}`
      ].join(" | ");
      const headers2 = normalizedHeaders({
        "Content-Type": DEFAULT_CONTENT_TYPE,
        ...requestHeaders,
        Accept: DEFAULT_CONTENT_TYPE,
        [ACCESS_TOKEN_HEADER]: accessToken,
        "User-Agent": userAgent
      });
      const body = data2 && typeof data2 !== "string" ? JSON.stringify(data2) : data2;
      return httpFetch([url, { method, headers: headers2, ...body ? { body } : void 0 }], 1, retries ?? clientRetries);
    };
    return {
      get: (path, options) => request2(path, { method: Method2.Get, ...options }),
      put: (path, options) => request2(path, { method: Method2.Put, ...options }),
      post: (path, options) => request2(path, { method: Method2.Post, ...options }),
      delete: (path, options) => request2(path, { method: Method2.Delete, ...options })
    };
  }
  function generateApiUrlFormatter2(storeUrl, defaultApiVersion, baseApiVersionValidationParams, formatPaths = true) {
    return (path, searchParams, apiVersion2) => {
      if (apiVersion2) {
        validateApiVersion({
          ...baseApiVersionValidationParams,
          apiVersion: apiVersion2
        });
      }
      function convertValue(params2, key, value) {
        if (Array.isArray(value)) {
          value.forEach((arrayValue) => convertValue(params2, `${key}[]`, arrayValue));
          return;
        } else if (typeof value === "object") {
          Object.entries(value).forEach(([objKey, objValue]) => convertValue(params2, `${key}[${objKey}]`, objValue));
          return;
        }
        params2.append(key, String(value));
      }
      const urlApiVersion = (apiVersion2 ?? defaultApiVersion).trim();
      let cleanPath = path.replace(/^\//, "");
      if (formatPaths) {
        if (!cleanPath.startsWith("admin")) {
          cleanPath = `admin/api/${urlApiVersion}/${cleanPath}`;
        }
        if (!cleanPath.endsWith(".json")) {
          cleanPath = `${cleanPath}.json`;
        }
      }
      const params = new URLSearchParams();
      if (searchParams) {
        for (const [key, value] of Object.entries(searchParams)) {
          convertValue(params, key, value);
        }
      }
      const queryString = params.toString() ? `?${params.toString()}` : "";
      return `${storeUrl}/${cleanPath}${queryString}`;
    };
  }
  function generateClientLogger2(logger2) {
    return (logContent) => {
      if (logger2) {
        logger2(logContent);
      }
    };
  }
  function normalizedHeaders(headersObj) {
    const normalizedHeaders2 = {};
    for (const [key, value] of Object.entries(headersObj)) {
      normalizedHeaders2[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : String(value);
    }
    return normalizedHeaders2;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/clients/common.mjs
  function getUserAgent(config2) {
    let userAgentPrefix = `${LIBRARY_NAME} v${SHOPIFY_API_LIBRARY_VERSION} | ${abstractRuntimeString()}`;
    if (config2.userAgentPrefix) {
      userAgentPrefix = `${config2.userAgentPrefix} | ${userAgentPrefix}`;
    }
    return userAgentPrefix;
  }
  function serializeResponse(response) {
    if (!response) {
      return { error: "No response object provided" };
    }
    try {
      const { status, statusText, ok, redirected, type, url, headers: headers2 } = response;
      const serialized = {
        status,
        statusText,
        ok,
        redirected,
        type,
        url
      };
      if (headers2?.entries) {
        serialized.headers = Object.fromEntries(headers2.entries());
      } else if (headers2) {
        serialized.headers = headers2;
      }
      return serialized;
    } catch {
      return response;
    }
  }
  function clientLoggerFactory(config2) {
    return (logContent) => {
      if (config2.logger.httpRequests) {
        switch (logContent.type) {
          case "HTTP-Response": {
            const responseLog = logContent.content;
            logger(config2).debug("Received response for HTTP request", {
              requestParams: JSON.stringify(responseLog.requestParams),
              response: JSON.stringify(serializeResponse(responseLog.response))
            });
            break;
          }
          case "HTTP-Retry": {
            const responseLog = logContent.content;
            logger(config2).debug("Retrying HTTP request", {
              requestParams: JSON.stringify(responseLog.requestParams),
              retryAttempt: responseLog.retryAttempt,
              maxRetries: responseLog.maxRetries,
              response: responseLog.lastResponse ? JSON.stringify(serializeResponse(responseLog.lastResponse)) : "undefined"
            });
            break;
          }
          case "HTTP-Response-GraphQL-Deprecation-Notice": {
            const responseLog = logContent.content;
            logger(config2).debug("Received response containing Deprecated GraphQL Notice", {
              requestParams: JSON.stringify(responseLog.requestParams),
              deprecationNotice: responseLog.deprecationNotice
            });
            break;
          }
          default: {
            logger(config2).debug(`HTTP request event: ${logContent.content}`);
            break;
          }
        }
      }
    };
  }
  function throwFailedRequest(body, atMaxRetries, response) {
    if (typeof response === "undefined") {
      const message2 = body?.errors?.message ?? "";
      throw new HttpRequestError(`Http request error, no response available: ${message2}`);
    }
    const responseHeaders = canonicalizeHeaders(Object.fromEntries(response.headers.entries() ?? []));
    if (response.status === StatusCode.Ok && body.errors.graphQLErrors) {
      throw new GraphqlQueryError({
        message: body.errors.graphQLErrors?.[0].message ?? "GraphQL operation failed",
        response,
        headers: responseHeaders,
        body
      });
    }
    const errorMessages = [];
    if (body.errors) {
      errorMessages.push(JSON.stringify(body.errors, null, 2));
    }
    const xRequestId = getHeader(responseHeaders, "x-request-id");
    if (xRequestId) {
      errorMessages.push(`If you report this error, please include this id: ${xRequestId}`);
    }
    const errorMessage = errorMessages.length ? `:
${errorMessages.join("\n")}` : "";
    const code = response.status;
    const statusText = response.statusText;
    switch (true) {
      case response.status === StatusCode.TooManyRequests: {
        if (atMaxRetries) {
          throw new HttpMaxRetriesError("Attempted the maximum number of retries for HTTP request.");
        } else {
          const retryAfter = getHeader(responseHeaders, "Retry-After");
          throw new HttpThrottlingError({
            message: `Shopify is throttling requests ${errorMessage}`,
            code,
            statusText,
            body,
            headers: responseHeaders,
            retryAfter: retryAfter ? parseFloat(retryAfter) : void 0
          });
        }
      }
      case response.status >= StatusCode.InternalServerError:
        if (atMaxRetries) {
          throw new HttpMaxRetriesError("Attempted the maximum number of retries for HTTP request.");
        } else {
          throw new HttpInternalError({
            message: `Shopify internal error${errorMessage}`,
            code,
            statusText,
            body,
            headers: responseHeaders
          });
        }
      default:
        throw new HttpResponseError({
          message: `Received an error response (${response.status} ${response.statusText}) from Shopify${errorMessage}`,
          code,
          statusText,
          body,
          headers: responseHeaders
        });
    }
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/clients/admin/graphql/client.mjs
  var GraphqlClient = class {
    static config;
    session;
    client;
    apiVersion;
    constructor(params) {
      const config2 = this.graphqlClass().config;
      if (!config2.isCustomStoreApp && !params.session.accessToken) {
        throw new MissingRequiredArgument("Missing access token when creating GraphQL client");
      }
      if (params.apiVersion) {
        const message2 = params.apiVersion === config2.apiVersion ? `Admin client has a redundant API version override to the default ${params.apiVersion}` : `Admin client overriding default API version ${config2.apiVersion} with ${params.apiVersion}`;
        logger(config2).debug(message2);
      }
      this.session = params.session;
      this.apiVersion = params.apiVersion;
      this.client = createAdminApiClient({
        accessToken: config2.adminApiAccessToken ?? this.session.accessToken,
        apiVersion: this.apiVersion ?? config2.apiVersion,
        storeDomain: this.session.shop,
        customFetchApi: abstractFetch,
        logger: clientLoggerFactory(config2),
        userAgentPrefix: getUserAgent(config2),
        isTesting: config2.isTesting
      });
    }
    async query(params) {
      logger(this.graphqlClass().config).deprecated("12.0.0", "The query method is deprecated, and was replaced with the request method.\nSee the migration guide: https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-api/docs/migrating-to-v9.md#using-the-new-clients.");
      if (typeof params.data === "string" && params.data.length === 0 || Object.entries(params.data).length === 0) {
        throw new MissingRequiredArgument("Query missing.");
      }
      let operation;
      let variables;
      if (typeof params.data === "string") {
        operation = params.data;
      } else {
        operation = params.data.query;
        variables = params.data.variables;
      }
      const headers2 = Object.fromEntries(Object.entries(params?.extraHeaders ?? {}).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(", ") : value.toString()
      ]));
      const response = await this.request(operation, {
        headers: headers2,
        retries: params.tries ? params.tries - 1 : void 0,
        variables
      });
      return { body: response, headers: {} };
    }
    async request(operation, options) {
      const response = await this.client.request(operation, {
        apiVersion: this.apiVersion || this.graphqlClass().config.apiVersion,
        ...options
      });
      if (response.errors) {
        const fetchResponse = response.errors.response;
        throwFailedRequest(response, (options?.retries ?? 0) > 0, fetchResponse);
      }
      const headerObject = Object.fromEntries(response.headers ? response.headers.entries() : []);
      return {
        ...response,
        headers: canonicalizeHeaders(headerObject ?? {})
      };
    }
    graphqlClass() {
      return this.constructor;
    }
  };
  function graphqlClientClass({ config: config2 }) {
    class NewGraphqlClient extends GraphqlClient {
      static config = config2;
    }
    Reflect.defineProperty(NewGraphqlClient, "name", {
      value: "GraphqlClient"
    });
    return NewGraphqlClient;
  }

  // node_modules/lossless-json/lib/esm/utils.js
  function isInteger(value) {
    return INTEGER_REGEX.test(value);
  }
  var INTEGER_REGEX = /^-?[0-9]+$/;
  function isNumber(value) {
    return NUMBER_REGEX.test(value);
  }
  var NUMBER_REGEX = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
  function isSafeNumber(value, config2) {
    if (isInteger(value)) {
      return Number.isSafeInteger(Number.parseInt(value, 10));
    }
    const num = Number.parseFloat(value);
    const parsed = String(num);
    if (value === parsed) {
      return true;
    }
    const valueDigits = extractSignificantDigits(value);
    const parsedDigits = extractSignificantDigits(parsed);
    if (valueDigits === parsedDigits) {
      return true;
    }
    if (config2?.approx === true) {
      const requiredDigits = 14;
      if (!isInteger(value) && parsedDigits.length >= requiredDigits && valueDigits.startsWith(parsedDigits.substring(0, requiredDigits))) {
        return true;
      }
    }
    return false;
  }
  var UnsafeNumberReason = /* @__PURE__ */ (function(UnsafeNumberReason2) {
    UnsafeNumberReason2["underflow"] = "underflow";
    UnsafeNumberReason2["overflow"] = "overflow";
    UnsafeNumberReason2["truncate_integer"] = "truncate_integer";
    UnsafeNumberReason2["truncate_float"] = "truncate_float";
    return UnsafeNumberReason2;
  })({});
  function getUnsafeNumberReason(value) {
    if (isSafeNumber(value, {
      approx: false
    })) {
      return void 0;
    }
    if (isInteger(value)) {
      return UnsafeNumberReason.truncate_integer;
    }
    const num = Number.parseFloat(value);
    if (!Number.isFinite(num)) {
      return UnsafeNumberReason.overflow;
    }
    if (num === 0) {
      return UnsafeNumberReason.underflow;
    }
    return UnsafeNumberReason.truncate_float;
  }
  function extractSignificantDigits(value) {
    const {
      start,
      end
    } = getSignificantDigitRange(value);
    const digits = value.substring(start, end);
    const dot = digits.indexOf(".");
    if (dot === -1) {
      return digits;
    }
    return digits.substring(0, dot) + digits.substring(dot + 1);
  }
  function getSignificantDigitRange(value) {
    let start = 0;
    if (value[0] === "-") {
      start++;
    }
    while (value[start] === "0" || value[start] === ".") {
      start++;
    }
    let end = value.lastIndexOf("e");
    if (end === -1) {
      end = value.lastIndexOf("E");
    }
    if (end === -1) {
      end = value.length;
    }
    while ((value[end - 1] === "0" || value[end - 1] === ".") && end > start) {
      end--;
    }
    return {
      start,
      end
    };
  }

  // node_modules/lossless-json/lib/esm/LosslessNumber.js
  var LosslessNumber = class {
    // numeric value as string
    // type information
    isLosslessNumber = true;
    constructor(value) {
      if (!isNumber(value)) {
        throw new Error(`Invalid number (value: "${value}")`);
      }
      this.value = value;
    }
    /**
     * Get the value of the LosslessNumber as number or bigint.
     *
     * - a number is returned for safe numbers and decimal values that only lose some insignificant digits
     * - a bigint is returned for big integer numbers
     * - an Error is thrown for values that will overflow or underflow
     *
     * Note that you can implement your own strategy for conversion by just getting the value as string
     * via .toString(), and using util functions like isInteger, isSafeNumber, getUnsafeNumberReason,
     * and toSafeNumberOrThrow to convert it to a numeric value.
     */
    valueOf() {
      const unsafeReason = getUnsafeNumberReason(this.value);
      if (unsafeReason === void 0 || unsafeReason === UnsafeNumberReason.truncate_float) {
        return Number.parseFloat(this.value);
      }
      if (isInteger(this.value)) {
        return BigInt(this.value);
      }
      throw new Error(`Cannot safely convert to number: the value '${this.value}' would ${unsafeReason} and become ${Number.parseFloat(this.value)}`);
    }
    /**
     * Get the value of the LosslessNumber as string.
     */
    toString() {
      return this.value;
    }
    // Note: we do NOT implement a .toJSON() method, and you should not implement
    // or use that, it cannot safely turn the numeric value in the string into
    // stringified JSON since it has to be parsed into a number first.
  };
  function isLosslessNumber(value) {
    return value && typeof value === "object" && value.isLosslessNumber || false;
  }

  // node_modules/lossless-json/lib/esm/numberParsers.js
  function parseLosslessNumber(value) {
    return new LosslessNumber(value);
  }

  // node_modules/lossless-json/lib/esm/revive.js
  function revive(json, reviver) {
    return reviveValue({
      "": json
    }, "", json, reviver);
  }
  function reviveValue(context, key, value, reviver) {
    if (Array.isArray(value)) {
      return reviver.call(context, key, reviveArray(value, reviver));
    }
    if (value && typeof value === "object" && !isLosslessNumber(value)) {
      return reviver.call(context, key, reviveObject(value, reviver));
    }
    return reviver.call(context, key, value);
  }
  function reviveObject(object, reviver) {
    for (const key of Object.keys(object)) {
      const value = reviveValue(object, key, object[key], reviver);
      if (value !== void 0) {
        object[key] = value;
      } else {
        delete object[key];
      }
    }
    return object;
  }
  function reviveArray(array, reviver) {
    for (let i = 0; i < array.length; i++) {
      array[i] = reviveValue(array, String(i), array[i], reviver);
    }
    return array;
  }

  // node_modules/lossless-json/lib/esm/parse.js
  function parse(text, reviver, options) {
    const optionsObj = typeof options === "function" ? {
      parseNumber: options
    } : options;
    const parseNumber = optionsObj?.parseNumber ?? parseLosslessNumber;
    const onDuplicateKey = optionsObj?.onDuplicateKey ?? throwDuplicateKey;
    let i = 0;
    const value = parseValue();
    expectValue(value);
    expectEndOfInput();
    return reviver ? revive(value, reviver) : value;
    function parseObject() {
      if (text.charCodeAt(i) === codeOpeningBrace) {
        i++;
        skipWhitespace();
        const object = {};
        let initial = true;
        while (i < text.length && text.charCodeAt(i) !== codeClosingBrace) {
          if (!initial) {
            eatComma();
            skipWhitespace();
          } else {
            initial = false;
          }
          const start = i;
          const key = parseString();
          if (key === void 0) {
            throwObjectKeyExpected();
            return;
          }
          skipWhitespace();
          eatColon();
          const value2 = parseValue();
          if (value2 === void 0) {
            throwObjectValueExpected();
            return;
          }
          if (Object.prototype.hasOwnProperty.call(object, key) && !isDeepEqual(value2, object[key])) {
            const returnedValue = onDuplicateKey({
              key,
              position: start + 1,
              oldValue: object[key],
              newValue: value2
            });
            if (returnedValue !== void 0) {
              object[key] = returnedValue;
            }
          } else {
            object[key] = value2;
          }
        }
        if (text.charCodeAt(i) !== codeClosingBrace) {
          throwObjectKeyOrEndExpected();
        }
        i++;
        return object;
      }
    }
    function parseArray() {
      if (text.charCodeAt(i) === codeOpeningBracket) {
        i++;
        skipWhitespace();
        const array = [];
        let initial = true;
        while (i < text.length && text.charCodeAt(i) !== codeClosingBracket) {
          if (!initial) {
            eatComma();
          } else {
            initial = false;
          }
          const value2 = parseValue();
          expectArrayItem(value2);
          array.push(value2);
        }
        if (text.charCodeAt(i) !== codeClosingBracket) {
          throwArrayItemOrEndExpected();
        }
        i++;
        return array;
      }
    }
    function parseValue() {
      skipWhitespace();
      const value2 = parseString() ?? parseNumeric() ?? parseObject() ?? parseArray() ?? parseKeyword("true", true) ?? parseKeyword("false", false) ?? parseKeyword("null", null);
      skipWhitespace();
      return value2;
    }
    function parseKeyword(name, value2) {
      if (text.slice(i, i + name.length) === name) {
        i += name.length;
        return value2;
      }
    }
    function skipWhitespace() {
      while (isWhitespace(text.charCodeAt(i))) {
        i++;
      }
    }
    function parseString() {
      if (text.charCodeAt(i) === codeDoubleQuote) {
        i++;
        let result = "";
        while (i < text.length && text.charCodeAt(i) !== codeDoubleQuote) {
          if (text.charCodeAt(i) === codeBackslash) {
            const char = text[i + 1];
            const escapeChar = escapeCharacters[char];
            if (escapeChar !== void 0) {
              result += escapeChar;
              i++;
            } else if (char === "u") {
              if (isHex(text.charCodeAt(i + 2)) && isHex(text.charCodeAt(i + 3)) && isHex(text.charCodeAt(i + 4)) && isHex(text.charCodeAt(i + 5))) {
                result += String.fromCharCode(Number.parseInt(text.slice(i + 2, i + 6), 16));
                i += 5;
              } else {
                throwInvalidUnicodeCharacter(i);
              }
            } else {
              throwInvalidEscapeCharacter(i);
            }
          } else {
            if (isValidStringCharacter(text.charCodeAt(i))) {
              result += text[i];
            } else {
              throwInvalidCharacter(text[i]);
            }
          }
          i++;
        }
        expectEndOfString();
        i++;
        return result;
      }
    }
    function parseNumeric() {
      const start = i;
      if (text.charCodeAt(i) === codeMinus) {
        i++;
        expectDigit(start);
      }
      if (text.charCodeAt(i) === codeZero) {
        i++;
      } else if (isNonZeroDigit(text.charCodeAt(i))) {
        i++;
        while (isDigit(text.charCodeAt(i))) {
          i++;
        }
      }
      if (text.charCodeAt(i) === codeDot) {
        i++;
        expectDigit(start);
        while (isDigit(text.charCodeAt(i))) {
          i++;
        }
      }
      if (text.charCodeAt(i) === codeLowercaseE || text.charCodeAt(i) === codeUppercaseE) {
        i++;
        if (text.charCodeAt(i) === codeMinus || text.charCodeAt(i) === codePlus) {
          i++;
        }
        expectDigit(start);
        while (isDigit(text.charCodeAt(i))) {
          i++;
        }
      }
      if (i > start) {
        return parseNumber(text.slice(start, i));
      }
    }
    function eatComma() {
      if (text.charCodeAt(i) !== codeComma) {
        throw new SyntaxError(`Comma ',' expected after value ${gotAt()}`);
      }
      i++;
    }
    function eatColon() {
      if (text.charCodeAt(i) !== codeColon) {
        throw new SyntaxError(`Colon ':' expected after property name ${gotAt()}`);
      }
      i++;
    }
    function expectValue(value2) {
      if (value2 === void 0) {
        throw new SyntaxError(`JSON value expected ${gotAt()}`);
      }
    }
    function expectArrayItem(value2) {
      if (value2 === void 0) {
        throw new SyntaxError(`Array item expected ${gotAt()}`);
      }
    }
    function expectEndOfInput() {
      if (i < text.length) {
        throw new SyntaxError(`Expected end of input ${gotAt()}`);
      }
    }
    function expectDigit(start) {
      if (!isDigit(text.charCodeAt(i))) {
        const numSoFar = text.slice(start, i);
        throw new SyntaxError(`Invalid number '${numSoFar}', expecting a digit ${gotAt()}`);
      }
    }
    function expectEndOfString() {
      if (text.charCodeAt(i) !== codeDoubleQuote) {
        throw new SyntaxError(`End of string '"' expected ${gotAt()}`);
      }
    }
    function throwObjectKeyExpected() {
      throw new SyntaxError(`Quoted object key expected ${gotAt()}`);
    }
    function throwDuplicateKey(_ref) {
      let {
        key,
        position
      } = _ref;
      throw new SyntaxError(`Duplicate key '${key}' encountered at position ${position}`);
    }
    function throwObjectKeyOrEndExpected() {
      throw new SyntaxError(`Quoted object key or end of object '}' expected ${gotAt()}`);
    }
    function throwArrayItemOrEndExpected() {
      throw new SyntaxError(`Array item or end of array ']' expected ${gotAt()}`);
    }
    function throwInvalidCharacter(char) {
      throw new SyntaxError(`Invalid character '${char}' ${pos()}`);
    }
    function throwInvalidEscapeCharacter(start) {
      const chars = text.slice(start, start + 2);
      throw new SyntaxError(`Invalid escape character '${chars}' ${pos()}`);
    }
    function throwObjectValueExpected() {
      throw new SyntaxError(`Object value expected after ':' ${pos()}`);
    }
    function throwInvalidUnicodeCharacter(start) {
      const chars = text.slice(start, start + 6);
      throw new SyntaxError(`Invalid unicode character '${chars}' ${pos()}`);
    }
    function pos() {
      return `at position ${i}`;
    }
    function got() {
      return i < text.length ? `but got '${text[i]}'` : "but reached end of input";
    }
    function gotAt() {
      return `${got()} ${pos()}`;
    }
  }
  function isWhitespace(code) {
    return code === codeSpace || code === codeNewline || code === codeTab || code === codeReturn;
  }
  function isHex(code) {
    return code >= codeZero && code <= codeNine || code >= codeUppercaseA && code <= codeUppercaseF || code >= codeLowercaseA && code <= codeLowercaseF;
  }
  function isDigit(code) {
    return code >= codeZero && code <= codeNine;
  }
  function isNonZeroDigit(code) {
    return code >= codeOne && code <= codeNine;
  }
  function isValidStringCharacter(code) {
    return code >= 32 && code <= 1114111;
  }
  function isDeepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((item, index) => isDeepEqual(item, b[index]));
    }
    if (isObject(a) && isObject(b)) {
      const keys = [.../* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(b)])];
      return keys.every((key) => isDeepEqual(a[key], b[key]));
    }
    return false;
  }
  function isObject(value) {
    return typeof value === "object" && value !== null;
  }
  var escapeCharacters = {
    '"': '"',
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "	"
    // note that \u is handled separately in parseString()
  };
  var codeBackslash = 92;
  var codeOpeningBrace = 123;
  var codeClosingBrace = 125;
  var codeOpeningBracket = 91;
  var codeClosingBracket = 93;
  var codeSpace = 32;
  var codeNewline = 10;
  var codeTab = 9;
  var codeReturn = 13;
  var codeDoubleQuote = 34;
  var codePlus = 43;
  var codeMinus = 45;
  var codeZero = 48;
  var codeOne = 49;
  var codeNine = 57;
  var codeComma = 44;
  var codeDot = 46;
  var codeColon = 58;
  var codeUppercaseA = 65;
  var codeLowercaseA = 97;
  var codeUppercaseE = 69;
  var codeLowercaseE = 101;
  var codeUppercaseF = 70;
  var codeLowercaseF = 102;

  // node_modules/@shopify/shopify-api/dist/esm/lib/clients/admin/rest/client.mjs
  var RestClient = class _RestClient {
    static config;
    static formatPaths;
    static LINK_HEADER_REGEXP = /<([^<]+)>; rel="([^"]+)"/;
    static DEFAULT_LIMIT = "50";
    static RETRY_WAIT_TIME = 1e3;
    static DEPRECATION_ALERT_DELAY = 3e5;
    loggedDeprecations = {};
    client;
    session;
    apiVersion;
    constructor({ session, apiVersion: apiVersion2 }) {
      const config2 = this.restClass().config;
      if (!config2.isCustomStoreApp && !session.accessToken) {
        throw new MissingRequiredArgument("Missing access token when creating REST client");
      }
      if (apiVersion2) {
        const message2 = apiVersion2 === config2.apiVersion ? `REST client has a redundant API version override to the default ${apiVersion2}` : `REST client overriding default API version ${config2.apiVersion} with ${apiVersion2}`;
        logger(config2).debug(message2);
      }
      const customStoreAppAccessToken = config2.adminApiAccessToken ?? config2.apiSecretKey;
      this.session = session;
      this.apiVersion = apiVersion2 ?? config2.apiVersion;
      this.client = createAdminRestApiClient({
        scheme: config2.hostScheme,
        storeDomain: session.shop,
        apiVersion: apiVersion2 ?? config2.apiVersion,
        accessToken: config2.isCustomStoreApp ? customStoreAppAccessToken : session.accessToken,
        customFetchApi: abstractFetch,
        logger: clientLoggerFactory(config2),
        userAgentPrefix: getUserAgent(config2),
        defaultRetryTime: this.restClass().RETRY_WAIT_TIME,
        formatPaths: this.restClass().formatPaths,
        isTesting: config2.isTesting
      });
    }
    /**
     * Performs a GET request on the given path.
     */
    async get(params) {
      return this.request({ method: Method.Get, ...params });
    }
    /**
     * Performs a POST request on the given path.
     */
    async post(params) {
      return this.request({ method: Method.Post, ...params });
    }
    /**
     * Performs a PUT request on the given path.
     */
    async put(params) {
      return this.request({ method: Method.Put, ...params });
    }
    /**
     * Performs a DELETE request on the given path.
     */
    async delete(params) {
      return this.request({ method: Method.Delete, ...params });
    }
    async request(params) {
      const requestParams = {
        headers: {
          ...params.extraHeaders,
          ...params.type ? { "Content-Type": params.type.toString() } : {}
        },
        retries: params.tries ? params.tries - 1 : void 0,
        searchParams: params.query
      };
      let response;
      switch (params.method) {
        case Method.Get:
          response = await this.client.get(params.path, requestParams);
          break;
        case Method.Put:
          response = await this.client.put(params.path, {
            ...requestParams,
            data: params.data
          });
          break;
        case Method.Post:
          response = await this.client.post(params.path, {
            ...requestParams,
            data: params.data
          });
          break;
        case Method.Delete:
          response = await this.client.delete(params.path, requestParams);
          break;
        default:
          throw new InvalidRequestError(`Unsupported request method '${params.method}'`);
      }
      const bodyString = await response.text();
      const body = params.method === Method.Delete && bodyString === "" ? {} : this.parseJsonWithLosslessNumbers(bodyString);
      const responseHeaders = canonicalizeHeaders(Object.fromEntries(response.headers.entries()));
      if (!response.ok) {
        throwFailedRequest(body, (params.tries ?? 1) > 1, response);
      }
      const requestReturn = {
        body,
        headers: responseHeaders
      };
      await this.logDeprecations({
        method: params.method,
        url: params.path,
        headers: requestParams.headers,
        body: params.data ? JSON.stringify(params.data) : void 0
      }, requestReturn);
      const link = response.headers.get("Link");
      if (link !== void 0) {
        const pageInfo = {
          limit: params.query?.limit ? params.query?.limit.toString() : _RestClient.DEFAULT_LIMIT
        };
        if (link) {
          const links = link.split(", ");
          for (const link2 of links) {
            const parsedLink = link2.match(_RestClient.LINK_HEADER_REGEXP);
            if (!parsedLink) {
              continue;
            }
            const linkRel = parsedLink[2];
            const linkUrl = new URL(parsedLink[1]);
            const linkFields = linkUrl.searchParams.get("fields");
            const linkPageToken = linkUrl.searchParams.get("page_info");
            if (!pageInfo.fields && linkFields) {
              pageInfo.fields = linkFields.split(",");
            }
            if (linkPageToken) {
              switch (linkRel) {
                case "previous":
                  pageInfo.previousPageUrl = parsedLink[1];
                  pageInfo.prevPage = this.buildRequestParams(parsedLink[1]);
                  break;
                case "next":
                  pageInfo.nextPageUrl = parsedLink[1];
                  pageInfo.nextPage = this.buildRequestParams(parsedLink[1]);
                  break;
              }
            }
          }
        }
        requestReturn.pageInfo = pageInfo;
      }
      return requestReturn;
    }
    restClass() {
      return this.constructor;
    }
    /**
     * Parse JSON with lossless-json to preserve numeric precision.
     * Converts all ID fields (ending with _id, _ids, or named 'id') to strings.
     */
    parseJsonWithLosslessNumbers(jsonString) {
      const parsed = parse(jsonString);
      const processValue = (value, key) => {
        if (value === null || value === void 0) {
          return value;
        }
        if (value && value.isLosslessNumber === true) {
          const keyLower = (key || "").toLowerCase();
          if (keyLower === "id" || keyLower.endsWith("_id")) {
            return value.toString();
          }
          return Number(value.value);
        }
        if (Array.isArray(value)) {
          const isIdsArray = key && key.toLowerCase().endsWith("_ids");
          return value.map((item) => {
            if (isIdsArray && item && item.isLosslessNumber === true) {
              return item.toString();
            }
            return processValue(item);
          });
        }
        if (typeof value === "object") {
          const result = {};
          for (const objKey in value) {
            if (Object.prototype.hasOwnProperty.call(value, objKey)) {
              result[objKey] = processValue(value[objKey], objKey);
            }
          }
          return result;
        }
        return value;
      };
      return processValue(parsed);
    }
    buildRequestParams(newPageUrl) {
      const pattern2 = `^/admin/api/[^/]+/(.*).json$`;
      const url = new URL(newPageUrl);
      const path = url.pathname.replace(new RegExp(pattern2), "$1");
      return {
        path,
        query: Object.fromEntries(url.searchParams.entries())
      };
    }
    async logDeprecations(request2, response) {
      const config2 = this.restClass().config;
      const deprecationReason = getHeader(response.headers, "X-Shopify-API-Deprecated-Reason");
      if (deprecationReason) {
        const deprecation = {
          message: deprecationReason,
          path: request2.url
        };
        if (request2.body) {
          deprecation.body = `${request2.body.substring(0, 100)}...`;
        }
        const depHash = await createSHA256HMAC(config2.apiSecretKey, JSON.stringify(deprecation), HashFormat.Hex);
        if (!Object.keys(this.loggedDeprecations).includes(depHash) || Date.now() - this.loggedDeprecations[depHash] >= _RestClient.DEPRECATION_ALERT_DELAY) {
          this.loggedDeprecations[depHash] = Date.now();
          const stack = new Error().stack;
          const message2 = `API Deprecation Notice ${(/* @__PURE__ */ new Date()).toLocaleString()} : ${JSON.stringify(deprecation)}  -  Stack Trace: ${stack}`;
          await logger(config2).warning(message2);
        }
      }
    }
  };
  function restClientClass(params) {
    const { config: config2, formatPaths } = params;
    class NewRestClient extends RestClient {
      static config = config2;
      static formatPaths = formatPaths === void 0 ? true : formatPaths;
    }
    Reflect.defineProperty(NewRestClient, "name", {
      value: "RestClient"
    });
    return NewRestClient;
  }

  // node_modules/@shopify/storefront-api-client/dist/constants.mjs
  var DEFAULT_CONTENT_TYPE2 = "application/json";
  var DEFAULT_SDK_VARIANT2 = "storefront-api-client";
  var DEFAULT_CLIENT_VERSION3 = "1.0.10";
  var PUBLIC_ACCESS_TOKEN_HEADER = "X-Shopify-Storefront-Access-Token";
  var PRIVATE_ACCESS_TOKEN_HEADER = "Shopify-Storefront-Private-Token";
  var SDK_VARIANT_HEADER2 = "X-SDK-Variant";
  var SDK_VERSION_HEADER2 = "X-SDK-Version";
  var SDK_VARIANT_SOURCE_HEADER = "X-SDK-Variant-Source";
  var CLIENT3 = "Storefront API Client";

  // node_modules/@shopify/storefront-api-client/dist/validations.mjs
  function validatePrivateAccessTokenUsage(privateAccessToken) {
    if (privateAccessToken && typeof window !== "undefined") {
      throw new Error(`${CLIENT3}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`);
    }
  }
  function validateRequiredAccessTokens(publicAccessToken, privateAccessToken) {
    if (!publicAccessToken && !privateAccessToken) {
      throw new Error(`${CLIENT3}: a public or private access token must be provided`);
    }
    if (publicAccessToken && privateAccessToken) {
      throw new Error(`${CLIENT3}: only provide either a public or private access token`);
    }
  }

  // node_modules/@shopify/storefront-api-client/dist/storefront-api-client.mjs
  function createStorefrontApiClient({ storeDomain, apiVersion: apiVersion2, publicAccessToken, privateAccessToken, clientName, retries = 0, customFetchApi, logger: logger2 }) {
    const currentSupportedApiVersions = getCurrentSupportedApiVersions();
    const storeUrl = validateDomainAndGetStoreUrl({
      client: CLIENT3,
      storeDomain
    });
    const baseApiVersionValidationParams = {
      client: CLIENT3,
      currentSupportedApiVersions,
      logger: logger2
    };
    validateApiVersion({ ...baseApiVersionValidationParams, apiVersion: apiVersion2 });
    validateRequiredAccessTokens(publicAccessToken, privateAccessToken);
    validatePrivateAccessTokenUsage(privateAccessToken);
    const apiUrlFormatter = generateApiUrlFormatter3(storeUrl, apiVersion2, baseApiVersionValidationParams);
    const config2 = {
      storeDomain: storeUrl,
      apiVersion: apiVersion2,
      ...publicAccessToken ? { publicAccessToken } : {
        privateAccessToken
      },
      headers: {
        "Content-Type": DEFAULT_CONTENT_TYPE2,
        Accept: DEFAULT_CONTENT_TYPE2,
        [SDK_VARIANT_HEADER2]: DEFAULT_SDK_VARIANT2,
        [SDK_VERSION_HEADER2]: DEFAULT_CLIENT_VERSION3,
        ...clientName ? { [SDK_VARIANT_SOURCE_HEADER]: clientName } : {},
        ...publicAccessToken ? { [PUBLIC_ACCESS_TOKEN_HEADER]: publicAccessToken } : { [PRIVATE_ACCESS_TOKEN_HEADER]: privateAccessToken }
      },
      apiUrl: apiUrlFormatter(),
      clientName
    };
    const graphqlClient = createGraphQLClient({
      headers: config2.headers,
      url: config2.apiUrl,
      retries,
      customFetchApi,
      logger: logger2
    });
    const getHeaders2 = generateGetHeaders(config2);
    const getApiUrl = generateGetApiUrl2(config2, apiUrlFormatter);
    const getGQLClientParams = generateGetGQLClientParams({
      getHeaders: getHeaders2,
      getApiUrl
    });
    const client = {
      config: config2,
      getHeaders: getHeaders2,
      getApiUrl,
      fetch: (...props) => {
        return graphqlClient.fetch(...getGQLClientParams(...props));
      },
      request: (...props) => {
        return graphqlClient.request(...getGQLClientParams(...props));
      },
      requestStream: (...props) => {
        return graphqlClient.requestStream(...getGQLClientParams(...props));
      }
    };
    return Object.freeze(client);
  }
  function generateApiUrlFormatter3(storeUrl, defaultApiVersion, baseApiVersionValidationParams) {
    return (apiVersion2) => {
      if (apiVersion2) {
        validateApiVersion({
          ...baseApiVersionValidationParams,
          apiVersion: apiVersion2
        });
      }
      const urlApiVersion = (apiVersion2 ?? defaultApiVersion).trim();
      return `${storeUrl}/api/${urlApiVersion}/graphql.json`;
    };
  }
  function generateGetApiUrl2(config2, apiUrlFormatter) {
    return (propApiVersion) => {
      return propApiVersion ? apiUrlFormatter(propApiVersion) : config2.apiUrl;
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/clients/storefront/client.mjs
  var StorefrontClient = class {
    static config;
    session;
    client;
    apiVersion;
    constructor(params) {
      const config2 = this.storefrontClass().config;
      if (!config2.isCustomStoreApp && !params.session.accessToken) {
        throw new MissingRequiredArgument("Missing access token when creating GraphQL client");
      }
      if (params.apiVersion) {
        const message2 = params.apiVersion === config2.apiVersion ? `Storefront client has a redundant API version override to the default ${params.apiVersion}` : `Storefront client overriding default API version ${config2.apiVersion} with ${params.apiVersion}`;
        logger(config2).debug(message2);
      }
      let accessToken;
      if (config2.isCustomStoreApp) {
        accessToken = config2.privateAppStorefrontAccessToken;
        if (!accessToken) {
          throw new MissingRequiredArgument("Custom store apps must set the privateAppStorefrontAccessToken property to call the Storefront API.");
        }
      } else {
        accessToken = params.session.accessToken;
        if (!accessToken) {
          throw new MissingRequiredArgument("Session missing access token.");
        }
      }
      this.session = params.session;
      this.apiVersion = params.apiVersion;
      this.client = createStorefrontApiClient({
        privateAccessToken: accessToken,
        apiVersion: this.apiVersion ?? config2.apiVersion,
        storeDomain: this.session.shop,
        customFetchApi: abstractFetch,
        logger: clientLoggerFactory(config2),
        clientName: getUserAgent(config2)
      });
    }
    async query(params) {
      logger(this.storefrontClass().config).deprecated("12.0.0", "The query method is deprecated, and was replaced with the request method.\nSee the migration guide: https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-api/docs/migrating-to-v9.md#using-the-new-clients.");
      if (typeof params.data === "string" && params.data.length === 0 || Object.entries(params.data).length === 0) {
        throw new MissingRequiredArgument("Query missing.");
      }
      let operation;
      let variables;
      if (typeof params.data === "string") {
        operation = params.data;
      } else {
        operation = params.data.query;
        variables = params.data.variables;
      }
      const headers2 = Object.fromEntries(Object.entries(params?.extraHeaders ?? {}).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(", ") : value.toString()
      ]));
      const response = await this.request(operation, {
        headers: headers2,
        retries: params.tries ? params.tries - 1 : void 0,
        variables
      });
      return { body: response, headers: {} };
    }
    async request(operation, options) {
      const response = await this.client.request(operation, {
        apiVersion: this.apiVersion || this.storefrontClass().config.apiVersion,
        ...options
      });
      if (response.errors) {
        const fetchResponse = response.errors.response;
        throwFailedRequest(response, (options?.retries ?? 0) > 0, fetchResponse);
      }
      return response;
    }
    storefrontClass() {
      return this.constructor;
    }
  };
  function storefrontClientClass(params) {
    const { config: config2 } = params;
    class NewStorefrontClient extends StorefrontClient {
      static config = config2;
    }
    Reflect.defineProperty(NewStorefrontClient, "name", {
      value: "StorefrontClient"
    });
    return NewStorefrontClient;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/clients/graphql_proxy/graphql_proxy.mjs
  function graphqlProxy(config2) {
    return async ({ session, rawBody }) => {
      if (!session.accessToken) {
        throw new InvalidSession("Cannot proxy query. Session not authenticated.");
      }
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      if (!rawBody) {
        throw new MissingRequiredArgument("Query missing.");
      }
      let query;
      let variables;
      if (typeof rawBody === "string") {
        query = rawBody;
      } else {
        query = rawBody.query;
        variables = rawBody.variables;
      }
      if (!query) {
        throw new MissingRequiredArgument("Query missing.");
      }
      const response = await client.request(query, { variables });
      return { body: response, headers: {} };
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/clients/index.mjs
  function clientClasses(config2) {
    return {
      // We don't pass in the HttpClient because the RestClient inherits from it, and goes through the same setup process
      Rest: restClientClass({ config: config2 }),
      Graphql: graphqlClientClass({ config: config2 }),
      Storefront: storefrontClientClass({ config: config2 }),
      graphqlProxy: graphqlProxy(config2)
    };
  }

  // node_modules/isbot/index.mjs
  var fullPattern = " daum[ /]| deusu/|(?:^|[^g])news(?!sapphire)|(?<! channel/|google/)google(?!(?:wv|app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!cam)scan|(?<!lib)http|24x7|;\\s\\w+;$|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\b\\w+\\.ai|\\bbw/|\\bdlc\\b|\\bort/|\\bperl\\b|\\btime/|\\||^[<\\(;]|^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[\\w\\-]+/[\\w]+$|^[^ ]{50,}$|^\\d+\\b|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^\\w+/\\d\\.\\d\\s\\([\\w@]+\\)$|^active|^ad muncher|^amaya|^apache/|^avsdevicesdk/|^azure|^biglotron|^blackbox exporter|^bot|^clamav[ /]|^claude-code/|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^email|^exodusmovement|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^igetter/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d\\s[\\w\\.-]+$|^mozilla/\\d\\.\\d\\s\\((?:compatible;)?(?:\\s?[\\w\\d-.]+\\/\\d+\\.\\d+)?\\)$|^navermailapp|^netsurf|^offline|^openai/|^owler|^php|^postman|^ps_daily/|^python|^rank|^read|^reed|^remove\\.bg/|^rest|^rss|^snapchat|^sora |^space bison|^stape/|^svn|^swcd |^taringa|^thumbor/|^track|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|abuse|advisor|agent\\b|analyzer|archive|ask jeeves/teoma|attracta|audit|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|collapsify\\b|convertify|cookiehubverify/|crawl|cursor/|cypress/|dareboost|datanyze|dejaclick|detect|discovery|dmbrowser|download|exaleadcloudview|feed|fetcher|firephp|foregenix|functionize|grab|hardenize\\b|headless|hotjar|httrack|hubspot marketing grader|ibisbrowser|infrawatch|insight|inspect|iplabel|java(?!;)|library|linkcheck|linktiger|mail\\.ru/|manager|manus-user/|marketgoo/|measure|monitor\\b|neustar wpm|node\\b|nutch|offbyone|openvas|optimize|pageburst|pagespeed|parser|phantomjs|pingdom|playwright|powermarks|preview|productfinder|prospectingstudio|proxy|ptst[ /]\\d|radar|readable/|retriever|rexx;|rigor|rss\\b|scrape|securityheaders|selenium|server|silktide|sindup/|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|testlocally|tools|torrent|transcoder|upday/|url|validator|virtuoso|wappalyzer|watchtowr|webglance|webkit2png|whatcms/|xtate/";
  var naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;
  var pattern;
  function getPattern() {
    if (pattern instanceof RegExp) {
      return pattern;
    }
    try {
      pattern = new RegExp(fullPattern, "i");
    } catch (error) {
      pattern = naivePattern;
    }
    return pattern;
  }
  var isNonEmptyString = (value) => typeof value === "string" && value !== "";
  function isBot(userAgent) {
    return isNonEmptyString(userAgent) && getPattern().test(userAgent);
  }
  var isbot = isBot;

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/processed-query.mjs
  var ProcessedQuery = class _ProcessedQuery {
    static stringify(keyValuePairs) {
      if (!keyValuePairs || Object.keys(keyValuePairs).length === 0)
        return "";
      return new _ProcessedQuery().putAll(keyValuePairs).stringify();
    }
    processedQuery;
    constructor() {
      this.processedQuery = new URLSearchParams();
    }
    putAll(keyValuePairs) {
      Object.entries(keyValuePairs).forEach(([key, value]) => this.put(key, value));
      return this;
    }
    put(key, value) {
      if (Array.isArray(value)) {
        this.putArray(key, value);
      } else if (value?.constructor === Object) {
        this.putObject(key, value);
      } else {
        this.putSimple(key, value);
      }
    }
    putArray(key, value) {
      value.forEach((arrayValue) => this.processedQuery.append(`${key}[]`, `${arrayValue}`));
    }
    putObject(key, value) {
      Object.entries(value).forEach(([entry, entryValue]) => {
        this.processedQuery.append(`${key}[${entry}]`, `${entryValue}`);
      });
    }
    putSimple(key, value) {
      this.processedQuery.append(key, `${value}`);
    }
    stringify(omitQuestionMark = false) {
      const queryString = this.processedQuery.toString();
      return omitQuestionMark ? queryString : `?${queryString}`;
    }
  };

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/safe-compare.mjs
  var safeCompare = (strA, strB) => {
    if (typeof strA === typeof strB) {
      const enc2 = new TextEncoder();
      const buffA = enc2.encode(JSON.stringify(strA));
      const buffB = enc2.encode(JSON.stringify(strB));
      if (buffA.length === buffB.length) {
        return timingSafeEqual(buffA, buffB);
      }
    } else {
      throw new SafeCompareError(`Mismatched data types provided: ${typeof strA} and ${typeof strB}`);
    }
    return false;
  };
  function timingSafeEqual(bufA, bufB) {
    const viewA = new Uint8Array(bufA);
    const viewB = new Uint8Array(bufB);
    let out = 0;
    for (let i = 0; i < viewA.length; i++) {
      out |= viewA[i] ^ viewB[i];
    }
    return out === 0;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/types.mjs
  var HmacValidationType;
  (function(HmacValidationType2) {
    HmacValidationType2["Flow"] = "flow";
    HmacValidationType2["Webhook"] = "webhook";
    HmacValidationType2["FulfillmentService"] = "fulfillment_service";
  })(HmacValidationType || (HmacValidationType = {}));
  var ValidationErrorReason = {
    MissingBody: "missing_body",
    InvalidHmac: "invalid_hmac",
    MissingHmac: "missing_hmac"
  };

  // node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/types.mjs
  var WebhookType = {
    Webhooks: "webhooks",
    Events: "events"
  };
  var WEBHOOK_HEADER_NAMES = {
    [WebhookType.Webhooks]: {
      hmac: ShopifyHeader.Hmac,
      topic: ShopifyHeader.Topic,
      domain: ShopifyHeader.Domain,
      apiVersion: ShopifyHeader.ApiVersion,
      webhookId: ShopifyHeader.WebhookId,
      subTopic: ShopifyHeader.SubTopic,
      name: ShopifyHeader.Name,
      triggeredAt: ShopifyHeader.TriggeredAt,
      eventId: ShopifyHeader.EventId
    },
    [WebhookType.Events]: {
      hmac: ShopifyEventsHeader.Hmac,
      topic: ShopifyEventsHeader.Topic,
      domain: ShopifyEventsHeader.Domain,
      apiVersion: ShopifyEventsHeader.ApiVersion,
      webhookId: ShopifyEventsHeader.WebhookId,
      eventId: ShopifyEventsHeader.EventId,
      handle: ShopifyEventsHeader.Handle,
      action: ShopifyEventsHeader.Action,
      resourceId: ShopifyEventsHeader.ResourceId,
      triggeredAt: ShopifyEventsHeader.TriggeredAt
    }
  };
  var DeliveryMethod;
  (function(DeliveryMethod2) {
    DeliveryMethod2["Http"] = "http";
    DeliveryMethod2["EventBridge"] = "eventbridge";
    DeliveryMethod2["PubSub"] = "pubsub";
  })(DeliveryMethod || (DeliveryMethod = {}));
  var WebhookOperation;
  (function(WebhookOperation2) {
    WebhookOperation2["Create"] = "create";
    WebhookOperation2["Update"] = "update";
    WebhookOperation2["Delete"] = "delete";
  })(WebhookOperation || (WebhookOperation = {}));
  var WebhookValidationErrorReason = {
    ...ValidationErrorReason,
    MissingHeaders: "missing_headers"
  };

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/hmac-validator.mjs
  var HMAC_TIMESTAMP_PERMITTED_CLOCK_TOLERANCE_SEC = 90;
  function stringifyQueryForAdmin(query) {
    const processedQuery = new ProcessedQuery();
    Object.keys(query).sort((val1, val2) => val1.localeCompare(val2)).forEach((key) => processedQuery.put(key, query[key]));
    return processedQuery.stringify(true);
  }
  function stringifyQueryForAppProxy(query) {
    return Object.entries(query).sort(([val1], [val2]) => val1.localeCompare(val2)).reduce((acc, [key, value]) => {
      return `${acc}${key}=${Array.isArray(value) ? value.join(",") : value}`;
    }, "");
  }
  function generateLocalHmac(config2) {
    return async (params, signator = "admin") => {
      const { hmac, signature, ...query } = params;
      const queryString = signator === "admin" ? stringifyQueryForAdmin(query) : stringifyQueryForAppProxy(query);
      return createSHA256HMAC(config2.apiSecretKey, queryString, HashFormat.Hex);
    };
  }
  function validateHmac(config2) {
    return async (query, { signator } = { signator: "admin" }) => {
      if (signator === "admin" && !query.hmac) {
        throw new InvalidHmacError("Query does not contain an HMAC value.");
      }
      if (signator === "appProxy" && !query.signature) {
        throw new InvalidHmacError("Query does not contain a signature value.");
      }
      validateHmacTimestamp(query);
      const hmac = signator === "appProxy" ? query.signature : query.hmac;
      const localHmac = await generateLocalHmac(config2)(query, signator);
      return safeCompare(hmac, localHmac);
    };
  }
  async function validateHmacString(config2, data2, hmac, format) {
    const localHmac = await createSHA256HMAC(config2.apiSecretKey, data2, format);
    return safeCompare(hmac, localHmac);
  }
  function getCurrentTimeInSec() {
    return Math.trunc(Date.now() / 1e3);
  }
  function validateHmacFromRequestFactory(config2) {
    return async function validateHmacFromRequest({ type, rawBody, webhookType, ...adapterArgs }) {
      const request2 = await abstractConvertRequest(adapterArgs);
      if (!rawBody.length) {
        return fail(ValidationErrorReason.MissingBody, type, config2);
      }
      const hmacHeaderName = webhookType ? WEBHOOK_HEADER_NAMES[webhookType].hmac : ShopifyHeader.Hmac;
      const hmac = getHeader(request2.headers, hmacHeaderName);
      if (!hmac) {
        return fail(ValidationErrorReason.MissingHmac, type, config2);
      }
      const validHmac = await validateHmacString(config2, rawBody, hmac, HashFormat.Base64);
      if (!validHmac) {
        return fail(ValidationErrorReason.InvalidHmac, type, config2);
      }
      return succeed(type, config2);
    };
  }
  function validateHmacTimestamp(query) {
    if (Math.abs(getCurrentTimeInSec() - Number(query.timestamp)) > HMAC_TIMESTAMP_PERMITTED_CLOCK_TOLERANCE_SEC) {
      throw new InvalidHmacError("HMAC timestamp is outside of the tolerance range");
    }
  }
  async function fail(reason, type, config2) {
    const log2 = logger(config2);
    await log2.debug(`${type} request is not valid`, { reason });
    return {
      valid: false,
      reason
    };
  }
  async function succeed(type, config2) {
    const log2 = logger(config2);
    await log2.debug(`${type} request is valid`);
    return {
      valid: true
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/decode-host.mjs
  function decodeHost(host) {
    return atob(host);
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/shop-admin-url-helper.mjs
  function shopAdminUrlToLegacyUrl(shopAdminUrl) {
    const shopUrl = removeProtocol(shopAdminUrl);
    const isShopAdminUrl = shopUrl.split(".")[0] === "admin";
    if (!isShopAdminUrl) {
      return null;
    }
    const regex = new RegExp(`admin\\..+/store/([^/]+)`);
    const matches = shopUrl.match(regex);
    if (matches && matches.length === 2) {
      const shopName = matches[1];
      const isSpinUrl = shopUrl.includes("spin.dev/store/");
      const isLocalUrl = shopUrl.includes("shop.dev/store/");
      if (isSpinUrl) {
        return spinAdminUrlToLegacyUrl(shopUrl);
      } else if (isLocalUrl) {
        return localAdminUrlToLegacyUrl(shopUrl);
      } else {
        return `${shopName}.myshopify.com`;
      }
    } else {
      return null;
    }
  }
  function legacyUrlToShopAdminUrl(legacyAdminUrl) {
    const shopUrl = removeProtocol(legacyAdminUrl);
    const regex = new RegExp(`(.+)\\.myshopify\\.com$`);
    const matches = shopUrl.match(regex);
    if (matches && matches.length === 2) {
      const shopName = matches[1];
      return `admin.shopify.com/store/${shopName}`;
    } else {
      const isSpinUrl = shopUrl.endsWith("spin.dev");
      const isLocalUrl = shopUrl.endsWith("shop.dev");
      if (isSpinUrl) {
        return spinLegacyUrlToAdminUrl(shopUrl);
      } else if (isLocalUrl) {
        return localLegacyUrlToAdminUrl(shopUrl);
      } else {
        return null;
      }
    }
  }
  function spinAdminUrlToLegacyUrl(shopAdminUrl) {
    const spinRegex = new RegExp(`admin\\.web\\.(.+\\.spin\\.dev)/store/(.+)`);
    const spinMatches = shopAdminUrl.match(spinRegex);
    if (spinMatches && spinMatches.length === 3) {
      const spinUrl = spinMatches[1];
      const shopName = spinMatches[2];
      return `${shopName}.shopify.${spinUrl}`;
    } else {
      return null;
    }
  }
  function localAdminUrlToLegacyUrl(shopAdminUrl) {
    const localRegex = new RegExp(`admin\\.shop\\.dev/store/(.+)`);
    const localMatches = shopAdminUrl.match(localRegex);
    if (localMatches && localMatches.length === 2) {
      const shopName = localMatches[1];
      return `${shopName}.shop.dev`;
    } else {
      return null;
    }
  }
  function spinLegacyUrlToAdminUrl(legacyAdminUrl) {
    const spinRegex = new RegExp(`(.+)\\.shopify\\.(.+\\.spin\\.dev)`);
    const spinMatches = legacyAdminUrl.match(spinRegex);
    if (spinMatches && spinMatches.length === 3) {
      const shopName = spinMatches[1];
      const spinUrl = spinMatches[2];
      return `admin.web.${spinUrl}/store/${shopName}`;
    } else {
      return null;
    }
  }
  function localLegacyUrlToAdminUrl(legacyAdminUrl) {
    const localRegex = new RegExp(`(.+)\\.shop\\.dev$`);
    const localMatches = legacyAdminUrl.match(localRegex);
    if (localMatches && localMatches.length === 2) {
      const shopName = localMatches[1];
      return `admin.shop.dev/store/${shopName}`;
    } else {
      return null;
    }
  }
  function removeProtocol(url) {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/domain-transformer.mjs
  function applyDomainTransformations(shopUrl, config2) {
    if (!config2.domainTransformations || config2.domainTransformations.length === 0) {
      return shopUrl;
    }
    for (const transformation of config2.domainTransformations) {
      const regex = typeof transformation.match === "string" ? new RegExp(transformation.match) : transformation.match;
      const matches = shopUrl.match(regex);
      if (!matches) {
        continue;
      }
      if (typeof transformation.transform === "function") {
        return transformation.transform(matches);
      }
      let result = transformation.transform;
      matches.forEach((match, index) => {
        result = result.replace(new RegExp(`\\$${index}`, "g"), match || "");
      });
      return result;
    }
    return shopUrl;
  }
  function getTransformationDomains(config2) {
    const domains = [];
    const log2 = logger(config2);
    if (!config2.domainTransformations) {
      return domains;
    }
    const transformations = config2.domainTransformations;
    for (const transformation of transformations) {
      const regex = typeof transformation.match === "string" ? new RegExp(transformation.match) : transformation.match;
      const domainPattern = regex.source.match(/\\\.([\\.\w-]+)\$?$/);
      if (domainPattern) {
        domains.push(domainPattern[1]);
      } else {
        log2.debug(`Failed to extract domain pattern from regex: ${regex.source}. This may indicate an unsupported regex pattern (e.g., optional groups, character classes in domain part, complex alternations).`);
      }
      if (typeof transformation.transform !== "string") {
        continue;
      }
      const templateDomainMatch = transformation.transform.match(/\$\d+\.([.\w-]+)$/);
      if (templateDomainMatch) {
        const escapedDomain = templateDomainMatch[1].replace(/\./g, "\\.");
        domains.push(escapedDomain);
      }
    }
    return domains;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/shop-validator.mjs
  function sanitizeShop(config2) {
    return (shop, throwOnInvalid = false) => {
      let shopUrl = shop;
      const domainsRegex = [
        "myshopify\\.com",
        "shopify\\.com",
        "myshopify\\.io",
        "shop\\.dev"
      ];
      if (config2.domainTransformations) {
        domainsRegex.push(...getTransformationDomains(config2));
      }
      const shopUrlRegex = new RegExp(`^[a-zA-Z0-9][a-zA-Z0-9-_]*\\.(${domainsRegex.join("|")})[/]*$`);
      const shopAdminRegex = new RegExp(`^admin\\.(${domainsRegex.join("|")})/store/([a-zA-Z0-9][a-zA-Z0-9-_]*)$`);
      const isShopAdminUrl = shopAdminRegex.test(shopUrl);
      if (isShopAdminUrl) {
        shopUrl = shopAdminUrlToLegacyUrl(shopUrl) || "";
      }
      const sanitizedShop = shopUrlRegex.test(shopUrl) ? shopUrl : null;
      if (!sanitizedShop && throwOnInvalid) {
        throw new InvalidShopError("Received invalid shop argument");
      }
      if (sanitizedShop && config2.domainTransformations) {
        return applyDomainTransformations(sanitizedShop, config2);
      }
      return sanitizedShop;
    };
  }
  function sanitizeHost(config2) {
    return (host, throwOnInvalid = false) => {
      const base64regex = /^[0-9a-zA-Z+/]+={0,2}$/;
      let sanitizedHost = base64regex.test(host) ? host : null;
      if (sanitizedHost) {
        const { hostname } = new URL(`https://${decodeHost(sanitizedHost)}`);
        const originsRegex = [
          "myshopify\\.com",
          "shopify\\.com",
          "myshopify\\.io",
          "spin\\.dev",
          "shop\\.dev"
        ];
        if (config2.domainTransformations) {
          const hostTransformationDomains = config2.domainTransformations.filter((t) => t.includeHost !== false).flatMap((t) => getTransformationDomains({
            ...config2,
            domainTransformations: [t]
          }));
          originsRegex.push(...hostTransformationDomains);
        }
        const hostRegex = new RegExp(`\\.(${originsRegex.join("|")})$`);
        if (!hostRegex.test(hostname)) {
          sanitizedHost = null;
        }
      }
      if (!sanitizedHost && throwOnInvalid) {
        throw new InvalidHostError("Received invalid host argument");
      }
      return sanitizedHost;
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/clients/types.mjs
  var DataType;
  (function(DataType2) {
    DataType2["JSON"] = "application/json";
    DataType2["GraphQL"] = "application/graphql";
    DataType2["URLEncoded"] = "application/x-www-form-urlencoded";
  })(DataType || (DataType = {}));

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/fetch-request.mjs
  function fetchRequestFactory(config2) {
    return async function fetchRequest(url, options) {
      const log2 = logger(config2);
      const doLog = config2.logger.httpRequests && config2.logger.level === LogSeverity.Debug;
      if (doLog) {
        log2.debug("Making HTTP request", {
          method: options?.method || "GET",
          url,
          ...options?.body && { body: options?.body }
        });
      }
      const response = await abstractFetch(url, options);
      if (doLog) {
        log2.debug("HTTP request completed", {
          method: options?.method || "GET",
          url,
          status: response.status
        });
      }
      return response;
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/types.mjs
  var SESSION_COOKIE_NAME = "shopify_app_session";
  var STATE_COOKIE_NAME = "shopify_app_state";

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/nonce.mjs
  function nonce() {
    return asHex(crypto.getRandomValues(new Uint8Array(32)));
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/session/session.mjs
  var propertiesToSave = [
    "id",
    "shop",
    "state",
    "isOnline",
    "scope",
    "accessToken",
    "expires",
    "refreshToken",
    "refreshTokenExpires",
    "onlineAccessInfo"
  ];
  var Session = class _Session {
    static fromPropertyArray(entries, returnUserData = false) {
      if (!Array.isArray(entries)) {
        throw new InvalidSession("The parameter is not an array: a Session cannot be created from this object.");
      }
      const obj = Object.fromEntries(entries.filter(([_key, value]) => value !== null && value !== void 0).map(([key, value]) => {
        switch (key.toLowerCase()) {
          case "isonline":
            return ["isOnline", value];
          case "accesstoken":
            return ["accessToken", value];
          case "refreshtoken":
            return ["refreshToken", value];
          case "refreshtokenexpires":
            return ["refreshTokenExpires", value];
          case "onlineaccessinfo":
            return ["onlineAccessInfo", value];
          case "userid":
            return ["userId", value];
          case "firstname":
            return ["firstName", value];
          case "lastname":
            return ["lastName", value];
          case "accountowner":
            return ["accountOwner", value];
          case "emailverified":
            return ["emailVerified", value];
          default:
            return [key.toLowerCase(), value];
        }
      }));
      const sessionData = {};
      const onlineAccessInfo = {
        associated_user: {}
      };
      Object.entries(obj).forEach(([key, value]) => {
        switch (key) {
          case "isOnline":
            if (typeof value === "string") {
              sessionData[key] = value.toString().toLowerCase() === "true";
            } else if (typeof value === "number") {
              sessionData[key] = Boolean(value);
            } else {
              sessionData[key] = value;
            }
            break;
          case "scope":
            sessionData[key] = value.toString();
            break;
          case "expires":
            sessionData[key] = value ? new Date(Number(value)) : void 0;
            break;
          case "refreshToken":
            sessionData[key] = value ? String(value) : void 0;
            break;
          case "refreshTokenExpires":
            sessionData[key] = value ? new Date(Number(value)) : void 0;
            break;
          case "onlineAccessInfo":
            onlineAccessInfo.associated_user.id = Number(value);
            break;
          case "userId":
            if (returnUserData) {
              onlineAccessInfo.associated_user.id = Number(value);
              break;
            }
          case "firstName":
            if (returnUserData) {
              onlineAccessInfo.associated_user.first_name = String(value);
              break;
            }
          case "lastName":
            if (returnUserData) {
              onlineAccessInfo.associated_user.last_name = String(value);
              break;
            }
          case "email":
            if (returnUserData) {
              onlineAccessInfo.associated_user.email = String(value);
              break;
            }
          case "accountOwner":
            if (returnUserData) {
              onlineAccessInfo.associated_user.account_owner = Boolean(value);
              break;
            }
          case "locale":
            if (returnUserData) {
              onlineAccessInfo.associated_user.locale = String(value);
              break;
            }
          case "collaborator":
            if (returnUserData) {
              onlineAccessInfo.associated_user.collaborator = Boolean(value);
              break;
            }
          case "emailVerified":
            if (returnUserData) {
              onlineAccessInfo.associated_user.email_verified = Boolean(value);
              break;
            }
          // Return any user keys as passed in
          default:
            sessionData[key] = value;
        }
      });
      if (sessionData.isOnline) {
        sessionData.onlineAccessInfo = onlineAccessInfo;
      }
      const session = new _Session(sessionData);
      return session;
    }
    /**
     * The unique identifier for the session.
     */
    id;
    /**
     * The Shopify shop domain, such as `example.myshopify.com`.
     */
    shop;
    /**
     * The state of the session. Used for the OAuth authentication code flow.
     */
    state;
    /**
     * Whether the access token in the session is online or offline.
     */
    isOnline;
    /**
     * The desired scopes for the access token, at the time the session was created.
     */
    scope;
    /**
     * The date the access token expires.
     */
    expires;
    /**
     * The access token for the session.
     */
    accessToken;
    /**
     * The refresh token for the session.
     */
    refreshToken;
    /**
     * The date the refresh token expires.
     */
    refreshTokenExpires;
    /**
     * Information on the user for the session. Only present for online sessions.
     */
    onlineAccessInfo;
    constructor(params) {
      Object.assign(this, params);
    }
    /**
     * Whether the session is active. Active sessions have an access token that is not expired, and has has the given
     * scopes if scopes is equal to a truthy value.
     */
    isActive(scopes, withinMillisecondsOfExpiry = 500) {
      const hasAccessToken = Boolean(this.accessToken);
      const isTokenNotExpired = !this.isExpired(withinMillisecondsOfExpiry);
      const isScopeChanged = this.isScopeChanged(scopes);
      return !isScopeChanged && hasAccessToken && isTokenNotExpired;
    }
    /**
     * Whether the access token includes the given scopes if they are provided.
     */
    isScopeChanged(scopes) {
      if (typeof scopes === "undefined") {
        return false;
      }
      return !this.isScopeIncluded(scopes);
    }
    /**
     * Whether the access token includes the given scopes.
     */
    isScopeIncluded(scopes) {
      const requiredScopes = scopes instanceof AuthScopes ? scopes : new AuthScopes(scopes);
      const sessionScopes = new AuthScopes(this.scope);
      return sessionScopes.has(requiredScopes);
    }
    /**
     * Whether the access token is expired.
     */
    isExpired(withinMillisecondsOfExpiry = 0) {
      return Boolean(this.expires && this.expires.getTime() - withinMillisecondsOfExpiry < Date.now());
    }
    /**
     * Converts an object with data into a Session.
     */
    toObject() {
      const object = {
        id: this.id,
        shop: this.shop,
        state: this.state,
        isOnline: this.isOnline
      };
      if (this.scope) {
        object.scope = this.scope;
      }
      if (this.expires) {
        object.expires = this.expires;
      }
      if (this.accessToken) {
        object.accessToken = this.accessToken;
      }
      if (this.refreshToken) {
        object.refreshToken = this.refreshToken;
      }
      if (this.refreshTokenExpires) {
        object.refreshTokenExpires = this.refreshTokenExpires;
      }
      if (this.onlineAccessInfo) {
        object.onlineAccessInfo = this.onlineAccessInfo;
      }
      return object;
    }
    /**
     * Checks whether the given session is equal to this session.
     */
    equals(other) {
      if (!other)
        return false;
      const mandatoryPropsMatch = this.id === other.id && this.shop === other.shop && this.state === other.state && this.isOnline === other.isOnline;
      if (!mandatoryPropsMatch)
        return false;
      const copyA = this.toPropertyArray(true);
      copyA.sort(([k1], [k2]) => k1 < k2 ? -1 : 1);
      const copyB = other.toPropertyArray(true);
      copyB.sort(([k1], [k2]) => k1 < k2 ? -1 : 1);
      return JSON.stringify(copyA) === JSON.stringify(copyB);
    }
    /**
     * Converts the session into an array of key-value pairs.
     */
    toPropertyArray(returnUserData = false) {
      return Object.entries(this).filter(([key, value]) => propertiesToSave.includes(key) && value !== void 0 && value !== null).flatMap(([key, value]) => {
        switch (key) {
          case "expires":
            return [[key, value ? value.getTime() : void 0]];
          case "refreshTokenExpires":
            return [[key, value ? value.getTime() : void 0]];
          case "onlineAccessInfo":
            if (!returnUserData) {
              return [[key, value.associated_user.id]];
            } else {
              return [
                ["userId", value?.associated_user?.id],
                ["firstName", value?.associated_user?.first_name],
                ["lastName", value?.associated_user?.last_name],
                ["email", value?.associated_user?.email],
                ["locale", value?.associated_user?.locale],
                ["emailVerified", value?.associated_user?.email_verified],
                ["accountOwner", value?.associated_user?.account_owner],
                ["collaborator", value?.associated_user?.collaborator]
              ];
            }
          default:
            return [[key, value]];
        }
      }).filter(([_key, value]) => value !== void 0);
    }
  };

  // node_modules/jose/dist/browser/runtime/webcrypto.js
  var webcrypto_default = crypto;
  var isCryptoKey = (key) => key instanceof CryptoKey;

  // node_modules/jose/dist/browser/lib/buffer_utils.js
  var encoder = new TextEncoder();
  var decoder = new TextDecoder();
  var MAX_INT32 = 2 ** 32;
  function concat(...buffers) {
    const size = buffers.reduce((acc, { length }) => acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    for (const buffer of buffers) {
      buf.set(buffer, i);
      i += buffer.length;
    }
    return buf;
  }

  // node_modules/jose/dist/browser/runtime/base64url.js
  var decodeBase64 = (encoded) => {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  };
  var decode = (input) => {
    let encoded = input;
    if (encoded instanceof Uint8Array) {
      encoded = decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    try {
      return decodeBase64(encoded);
    } catch {
      throw new TypeError("The input to be decoded is not correctly encoded.");
    }
  };

  // node_modules/jose/dist/browser/util/errors.js
  var JOSEError = class extends Error {
    constructor(message2, options) {
      super(message2, options);
      this.code = "ERR_JOSE_GENERIC";
      this.name = this.constructor.name;
      Error.captureStackTrace?.(this, this.constructor);
    }
  };
  JOSEError.code = "ERR_JOSE_GENERIC";
  var JWTClaimValidationFailed = class extends JOSEError {
    constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
      super(message2, { cause: { claim, reason, payload } });
      this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
      this.claim = claim;
      this.reason = reason;
      this.payload = payload;
    }
  };
  JWTClaimValidationFailed.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  var JWTExpired = class extends JOSEError {
    constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
      super(message2, { cause: { claim, reason, payload } });
      this.code = "ERR_JWT_EXPIRED";
      this.claim = claim;
      this.reason = reason;
      this.payload = payload;
    }
  };
  JWTExpired.code = "ERR_JWT_EXPIRED";
  var JOSEAlgNotAllowed = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
    }
  };
  JOSEAlgNotAllowed.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  var JOSENotSupported = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JOSE_NOT_SUPPORTED";
    }
  };
  JOSENotSupported.code = "ERR_JOSE_NOT_SUPPORTED";
  var JWEDecryptionFailed = class extends JOSEError {
    constructor(message2 = "decryption operation failed", options) {
      super(message2, options);
      this.code = "ERR_JWE_DECRYPTION_FAILED";
    }
  };
  JWEDecryptionFailed.code = "ERR_JWE_DECRYPTION_FAILED";
  var JWEInvalid = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JWE_INVALID";
    }
  };
  JWEInvalid.code = "ERR_JWE_INVALID";
  var JWSInvalid = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JWS_INVALID";
    }
  };
  JWSInvalid.code = "ERR_JWS_INVALID";
  var JWTInvalid = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JWT_INVALID";
    }
  };
  JWTInvalid.code = "ERR_JWT_INVALID";
  var JWKInvalid = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JWK_INVALID";
    }
  };
  JWKInvalid.code = "ERR_JWK_INVALID";
  var JWKSInvalid = class extends JOSEError {
    constructor() {
      super(...arguments);
      this.code = "ERR_JWKS_INVALID";
    }
  };
  JWKSInvalid.code = "ERR_JWKS_INVALID";
  var JWKSNoMatchingKey = class extends JOSEError {
    constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
      super(message2, options);
      this.code = "ERR_JWKS_NO_MATCHING_KEY";
    }
  };
  JWKSNoMatchingKey.code = "ERR_JWKS_NO_MATCHING_KEY";
  var JWKSMultipleMatchingKeys = class extends JOSEError {
    constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
      super(message2, options);
      this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    }
  };
  JWKSMultipleMatchingKeys.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  var JWKSTimeout = class extends JOSEError {
    constructor(message2 = "request timed out", options) {
      super(message2, options);
      this.code = "ERR_JWKS_TIMEOUT";
    }
  };
  JWKSTimeout.code = "ERR_JWKS_TIMEOUT";
  var JWSSignatureVerificationFailed = class extends JOSEError {
    constructor(message2 = "signature verification failed", options) {
      super(message2, options);
      this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    }
  };
  JWSSignatureVerificationFailed.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";

  // node_modules/jose/dist/browser/lib/crypto_key.js
  function unusable(name, prop = "algorithm.name") {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
  }
  function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
  }
  function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
  }
  function getNamedCurve(alg) {
    switch (alg) {
      case "ES256":
        return "P-256";
      case "ES384":
        return "P-384";
      case "ES512":
        return "P-521";
      default:
        throw new Error("unreachable");
    }
  }
  function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
      let msg = "CryptoKey does not support this operation, its usages must include ";
      if (usages.length > 2) {
        const last = usages.pop();
        msg += `one of ${usages.join(", ")}, or ${last}.`;
      } else if (usages.length === 2) {
        msg += `one of ${usages[0]} or ${usages[1]}.`;
      } else {
        msg += `${usages[0]}.`;
      }
      throw new TypeError(msg);
    }
  }
  function checkSigCryptoKey(key, alg, ...usages) {
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512": {
        if (!isAlgorithm(key.algorithm, "HMAC"))
          throw unusable("HMAC");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "RS256":
      case "RS384":
      case "RS512": {
        if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
          throw unusable("RSASSA-PKCS1-v1_5");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "PS256":
      case "PS384":
      case "PS512": {
        if (!isAlgorithm(key.algorithm, "RSA-PSS"))
          throw unusable("RSA-PSS");
        const expected = parseInt(alg.slice(2), 10);
        const actual = getHashLength(key.algorithm.hash);
        if (actual !== expected)
          throw unusable(`SHA-${expected}`, "algorithm.hash");
        break;
      }
      case "EdDSA": {
        if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
          throw unusable("Ed25519 or Ed448");
        }
        break;
      }
      case "Ed25519": {
        if (!isAlgorithm(key.algorithm, "Ed25519"))
          throw unusable("Ed25519");
        break;
      }
      case "ES256":
      case "ES384":
      case "ES512": {
        if (!isAlgorithm(key.algorithm, "ECDSA"))
          throw unusable("ECDSA");
        const expected = getNamedCurve(alg);
        const actual = key.algorithm.namedCurve;
        if (actual !== expected)
          throw unusable(expected, "algorithm.namedCurve");
        break;
      }
      default:
        throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usages);
  }

  // node_modules/jose/dist/browser/lib/invalid_key_input.js
  function message(msg, actual, ...types2) {
    types2 = types2.filter(Boolean);
    if (types2.length > 2) {
      const last = types2.pop();
      msg += `one of type ${types2.join(", ")}, or ${last}.`;
    } else if (types2.length === 2) {
      msg += `one of type ${types2[0]} or ${types2[1]}.`;
    } else {
      msg += `of type ${types2[0]}.`;
    }
    if (actual == null) {
      msg += ` Received ${actual}`;
    } else if (typeof actual === "function" && actual.name) {
      msg += ` Received function ${actual.name}`;
    } else if (typeof actual === "object" && actual != null) {
      if (actual.constructor?.name) {
        msg += ` Received an instance of ${actual.constructor.name}`;
      }
    }
    return msg;
  }
  var invalid_key_input_default = (actual, ...types2) => {
    return message("Key must be ", actual, ...types2);
  };
  function withAlg(alg, actual, ...types2) {
    return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
  }

  // node_modules/jose/dist/browser/runtime/is_key_like.js
  var is_key_like_default = (key) => {
    if (isCryptoKey(key)) {
      return true;
    }
    return key?.[Symbol.toStringTag] === "KeyObject";
  };
  var types = ["CryptoKey"];

  // node_modules/jose/dist/browser/lib/is_disjoint.js
  var isDisjoint = (...headers2) => {
    const sources = headers2.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
      return true;
    }
    let acc;
    for (const header of sources) {
      const parameters = Object.keys(header);
      if (!acc || acc.size === 0) {
        acc = new Set(parameters);
        continue;
      }
      for (const parameter of parameters) {
        if (acc.has(parameter)) {
          return false;
        }
        acc.add(parameter);
      }
    }
    return true;
  };
  var is_disjoint_default = isDisjoint;

  // node_modules/jose/dist/browser/lib/is_object.js
  function isObjectLike(value) {
    return typeof value === "object" && value !== null;
  }
  function isObject2(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
      return false;
    }
    if (Object.getPrototypeOf(input) === null) {
      return true;
    }
    let proto = input;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
  }

  // node_modules/jose/dist/browser/runtime/check_key_length.js
  var check_key_length_default = (alg, key) => {
    if (alg.startsWith("RS") || alg.startsWith("PS")) {
      const { modulusLength } = key.algorithm;
      if (typeof modulusLength !== "number" || modulusLength < 2048) {
        throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
      }
    }
  };

  // node_modules/jose/dist/browser/lib/is_jwk.js
  function isJWK(key) {
    return isObject2(key) && typeof key.kty === "string";
  }
  function isPrivateJWK(key) {
    return key.kty !== "oct" && typeof key.d === "string";
  }
  function isPublicJWK(key) {
    return key.kty !== "oct" && typeof key.d === "undefined";
  }
  function isSecretJWK(key) {
    return isJWK(key) && key.kty === "oct" && typeof key.k === "string";
  }

  // node_modules/jose/dist/browser/runtime/jwk_to_key.js
  function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch (jwk.kty) {
      case "RSA": {
        switch (jwk.alg) {
          case "PS256":
          case "PS384":
          case "PS512":
            algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "RS256":
          case "RS384":
          case "RS512":
            algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "RSA-OAEP":
          case "RSA-OAEP-256":
          case "RSA-OAEP-384":
          case "RSA-OAEP-512":
            algorithm = {
              name: "RSA-OAEP",
              hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
            };
            keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      case "EC": {
        switch (jwk.alg) {
          case "ES256":
            algorithm = { name: "ECDSA", namedCurve: "P-256" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ES384":
            algorithm = { name: "ECDSA", namedCurve: "P-384" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ES512":
            algorithm = { name: "ECDSA", namedCurve: "P-521" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            algorithm = { name: "ECDH", namedCurve: jwk.crv };
            keyUsages = jwk.d ? ["deriveBits"] : [];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      case "OKP": {
        switch (jwk.alg) {
          case "Ed25519":
            algorithm = { name: "Ed25519" };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "EdDSA":
            algorithm = { name: jwk.crv };
            keyUsages = jwk.d ? ["sign"] : ["verify"];
            break;
          case "ECDH-ES":
          case "ECDH-ES+A128KW":
          case "ECDH-ES+A192KW":
          case "ECDH-ES+A256KW":
            algorithm = { name: jwk.crv };
            keyUsages = jwk.d ? ["deriveBits"] : [];
            break;
          default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        }
        break;
      }
      default:
        throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return { algorithm, keyUsages };
  }
  var parse2 = async (jwk) => {
    if (!jwk.alg) {
      throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    const { algorithm, keyUsages } = subtleMapping(jwk);
    const rest = [
      algorithm,
      jwk.ext ?? false,
      jwk.key_ops ?? keyUsages
    ];
    const keyData = { ...jwk };
    delete keyData.alg;
    delete keyData.use;
    return webcrypto_default.subtle.importKey("jwk", keyData, ...rest);
  };
  var jwk_to_key_default = parse2;

  // node_modules/jose/dist/browser/runtime/normalize_key.js
  var exportKeyValue = (k) => decode(k);
  var privCache;
  var pubCache;
  var isKeyObject = (key) => {
    return key?.[Symbol.toStringTag] === "KeyObject";
  };
  var importAndCache = async (cache, key, jwk, alg, freeze = false) => {
    let cached = cache.get(key);
    if (cached?.[alg]) {
      return cached[alg];
    }
    const cryptoKey = await jwk_to_key_default({ ...jwk, alg });
    if (freeze)
      Object.freeze(key);
    if (!cached) {
      cache.set(key, { [alg]: cryptoKey });
    } else {
      cached[alg] = cryptoKey;
    }
    return cryptoKey;
  };
  var normalizePublicKey = (key, alg) => {
    if (isKeyObject(key)) {
      let jwk = key.export({ format: "jwk" });
      delete jwk.d;
      delete jwk.dp;
      delete jwk.dq;
      delete jwk.p;
      delete jwk.q;
      delete jwk.qi;
      if (jwk.k) {
        return exportKeyValue(jwk.k);
      }
      pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
      return importAndCache(pubCache, key, jwk, alg);
    }
    if (isJWK(key)) {
      if (key.k)
        return decode(key.k);
      pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
      const cryptoKey = importAndCache(pubCache, key, key, alg, true);
      return cryptoKey;
    }
    return key;
  };
  var normalizePrivateKey = (key, alg) => {
    if (isKeyObject(key)) {
      let jwk = key.export({ format: "jwk" });
      if (jwk.k) {
        return exportKeyValue(jwk.k);
      }
      privCache || (privCache = /* @__PURE__ */ new WeakMap());
      return importAndCache(privCache, key, jwk, alg);
    }
    if (isJWK(key)) {
      if (key.k)
        return decode(key.k);
      privCache || (privCache = /* @__PURE__ */ new WeakMap());
      const cryptoKey = importAndCache(privCache, key, key, alg, true);
      return cryptoKey;
    }
    return key;
  };
  var normalize_key_default = { normalizePublicKey, normalizePrivateKey };

  // node_modules/jose/dist/browser/key/import.js
  async function importJWK(jwk, alg) {
    if (!isObject2(jwk)) {
      throw new TypeError("JWK must be an object");
    }
    alg || (alg = jwk.alg);
    switch (jwk.kty) {
      case "oct":
        if (typeof jwk.k !== "string" || !jwk.k) {
          throw new TypeError('missing "k" (Key Value) Parameter value');
        }
        return decode(jwk.k);
      case "RSA":
        if ("oth" in jwk && jwk.oth !== void 0) {
          throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
        }
      case "EC":
      case "OKP":
        return jwk_to_key_default({ ...jwk, alg });
      default:
        throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
  }

  // node_modules/jose/dist/browser/lib/check_key_type.js
  var tag = (key) => key?.[Symbol.toStringTag];
  var jwkMatchesOp = (alg, key, usage) => {
    if (key.use !== void 0 && key.use !== "sig") {
      throw new TypeError("Invalid key for this operation, when present its use must be sig");
    }
    if (key.key_ops !== void 0 && key.key_ops.includes?.(usage) !== true) {
      throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
    }
    if (key.alg !== void 0 && key.alg !== alg) {
      throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
    }
    return true;
  };
  var symmetricTypeCheck = (alg, key, usage, allowJwk) => {
    if (key instanceof Uint8Array)
      return;
    if (allowJwk && isJWK(key)) {
      if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
        return;
      throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
    }
    if (!is_key_like_default(key)) {
      throw new TypeError(withAlg(alg, key, ...types, "Uint8Array", allowJwk ? "JSON Web Key" : null));
    }
    if (key.type !== "secret") {
      throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
    }
  };
  var asymmetricTypeCheck = (alg, key, usage, allowJwk) => {
    if (allowJwk && isJWK(key)) {
      switch (usage) {
        case "sign":
          if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
            return;
          throw new TypeError(`JSON Web Key for this operation be a private JWK`);
        case "verify":
          if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
            return;
          throw new TypeError(`JSON Web Key for this operation be a public JWK`);
      }
    }
    if (!is_key_like_default(key)) {
      throw new TypeError(withAlg(alg, key, ...types, allowJwk ? "JSON Web Key" : null));
    }
    if (key.type === "secret") {
      throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === "sign" && key.type === "public") {
      throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === "decrypt" && key.type === "public") {
      throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === "verify" && key.type === "private") {
      throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === "encrypt" && key.type === "private") {
      throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
    }
  };
  function checkKeyType(allowJwk, alg, key, usage) {
    const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
      symmetricTypeCheck(alg, key, usage, allowJwk);
    } else {
      asymmetricTypeCheck(alg, key, usage, allowJwk);
    }
  }
  var check_key_type_default = checkKeyType.bind(void 0, false);
  var checkKeyTypeWithJwk = checkKeyType.bind(void 0, true);

  // node_modules/jose/dist/browser/lib/validate_crit.js
  function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
      throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === void 0) {
      return /* @__PURE__ */ new Set();
    }
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
      throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== void 0) {
      recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
    } else {
      recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit) {
      if (!recognized.has(parameter)) {
        throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
      }
      if (joseHeader[parameter] === void 0) {
        throw new Err(`Extension Header Parameter "${parameter}" is missing`);
      }
      if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
        throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
      }
    }
    return new Set(protectedHeader.crit);
  }
  var validate_crit_default = validateCrit;

  // node_modules/jose/dist/browser/lib/validate_algorithms.js
  var validateAlgorithms = (option, algorithms) => {
    if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
      throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
      return void 0;
    }
    return new Set(algorithms);
  };
  var validate_algorithms_default = validateAlgorithms;

  // node_modules/jose/dist/browser/runtime/subtle_dsa.js
  function subtleDsa(alg, algorithm) {
    const hash = `SHA-${alg.slice(-3)}`;
    switch (alg) {
      case "HS256":
      case "HS384":
      case "HS512":
        return { hash, name: "HMAC" };
      case "PS256":
      case "PS384":
      case "PS512":
        return { hash, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
      case "RS256":
      case "RS384":
      case "RS512":
        return { hash, name: "RSASSA-PKCS1-v1_5" };
      case "ES256":
      case "ES384":
      case "ES512":
        return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
      case "Ed25519":
        return { name: "Ed25519" };
      case "EdDSA":
        return { name: algorithm.name };
      default:
        throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
  }

  // node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
  async function getCryptoKey(alg, key, usage) {
    if (usage === "sign") {
      key = await normalize_key_default.normalizePrivateKey(key, alg);
    }
    if (usage === "verify") {
      key = await normalize_key_default.normalizePublicKey(key, alg);
    }
    if (isCryptoKey(key)) {
      checkSigCryptoKey(key, alg, usage);
      return key;
    }
    if (key instanceof Uint8Array) {
      if (!alg.startsWith("HS")) {
        throw new TypeError(invalid_key_input_default(key, ...types));
      }
      return webcrypto_default.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
    }
    throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array", "JSON Web Key"));
  }

  // node_modules/jose/dist/browser/runtime/verify.js
  var verify = async (alg, key, signature, data2) => {
    const cryptoKey = await getCryptoKey(alg, key, "verify");
    check_key_length_default(alg, cryptoKey);
    const algorithm = subtleDsa(alg, cryptoKey.algorithm);
    try {
      return await webcrypto_default.subtle.verify(algorithm, cryptoKey, signature, data2);
    } catch {
      return false;
    }
  };
  var verify_default = verify;

  // node_modules/jose/dist/browser/jws/flattened/verify.js
  async function flattenedVerify(jws, key, options) {
    if (!isObject2(jws)) {
      throw new JWSInvalid("Flattened JWS must be an object");
    }
    if (jws.protected === void 0 && jws.header === void 0) {
      throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== void 0 && typeof jws.protected !== "string") {
      throw new JWSInvalid("JWS Protected Header incorrect type");
    }
    if (jws.payload === void 0) {
      throw new JWSInvalid("JWS Payload missing");
    }
    if (typeof jws.signature !== "string") {
      throw new JWSInvalid("JWS Signature missing or incorrect type");
    }
    if (jws.header !== void 0 && !isObject2(jws.header)) {
      throw new JWSInvalid("JWS Unprotected Header incorrect type");
    }
    let parsedProt = {};
    if (jws.protected) {
      try {
        const protectedHeader = decode(jws.protected);
        parsedProt = JSON.parse(decoder.decode(protectedHeader));
      } catch {
        throw new JWSInvalid("JWS Protected Header is invalid");
      }
    }
    if (!is_disjoint_default(parsedProt, jws.header)) {
      throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
      ...parsedProt,
      ...jws.header
    };
    const extensions = validate_crit_default(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
      b64 = parsedProt.b64;
      if (typeof b64 !== "boolean") {
        throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
      }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
      throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validate_algorithms_default("algorithms", options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
      throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
    }
    if (b64) {
      if (typeof jws.payload !== "string") {
        throw new JWSInvalid("JWS Payload must be a string");
      }
    } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
      throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
    }
    let resolvedKey = false;
    if (typeof key === "function") {
      key = await key(parsedProt, jws);
      resolvedKey = true;
      checkKeyTypeWithJwk(alg, key, "verify");
      if (isJWK(key)) {
        key = await importJWK(key, alg);
      }
    } else {
      checkKeyTypeWithJwk(alg, key, "verify");
    }
    const data2 = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
    let signature;
    try {
      signature = decode(jws.signature);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the signature");
    }
    const verified = await verify_default(alg, key, signature, data2);
    if (!verified) {
      throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
      try {
        payload = decode(jws.payload);
      } catch {
        throw new JWSInvalid("Failed to base64url decode the payload");
      }
    } else if (typeof jws.payload === "string") {
      payload = encoder.encode(jws.payload);
    } else {
      payload = jws.payload;
    }
    const result = { payload };
    if (jws.protected !== void 0) {
      result.protectedHeader = parsedProt;
    }
    if (jws.header !== void 0) {
      result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
      return { ...result, key };
    }
    return result;
  }

  // node_modules/jose/dist/browser/jws/compact/verify.js
  async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
      jws = decoder.decode(jws);
    }
    if (typeof jws !== "string") {
      throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
    if (length !== 3) {
      throw new JWSInvalid("Invalid Compact JWS");
    }
    const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
    const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: verified.key };
    }
    return result;
  }

  // node_modules/jose/dist/browser/lib/epoch.js
  var epoch_default = (date) => Math.floor(date.getTime() / 1e3);

  // node_modules/jose/dist/browser/lib/secs.js
  var minute = 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var year = day * 365.25;
  var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
  var secs_default = (str) => {
    const matched = REGEX.exec(str);
    if (!matched || matched[4] && matched[1]) {
      throw new TypeError("Invalid time period format");
    }
    const value = parseFloat(matched[2]);
    const unit = matched[3].toLowerCase();
    let numericDate;
    switch (unit) {
      case "sec":
      case "secs":
      case "second":
      case "seconds":
      case "s":
        numericDate = Math.round(value);
        break;
      case "minute":
      case "minutes":
      case "min":
      case "mins":
      case "m":
        numericDate = Math.round(value * minute);
        break;
      case "hour":
      case "hours":
      case "hr":
      case "hrs":
      case "h":
        numericDate = Math.round(value * hour);
        break;
      case "day":
      case "days":
      case "d":
        numericDate = Math.round(value * day);
        break;
      case "week":
      case "weeks":
      case "w":
        numericDate = Math.round(value * week);
        break;
      default:
        numericDate = Math.round(value * year);
        break;
    }
    if (matched[1] === "-" || matched[4] === "ago") {
      return -numericDate;
    }
    return numericDate;
  };

  // node_modules/jose/dist/browser/lib/jwt_claims_set.js
  var normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
  var checkAudiencePresence = (audPayload, audOption) => {
    if (typeof audPayload === "string") {
      return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
      return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
  };
  var jwt_claims_set_default = (protectedHeader, encodedPayload, options = {}) => {
    let payload;
    try {
      payload = JSON.parse(decoder.decode(encodedPayload));
    } catch {
    }
    if (!isObject2(payload)) {
      throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
    }
    const { typ } = options;
    if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
      throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    const presenceCheck = [...requiredClaims];
    if (maxTokenAge !== void 0)
      presenceCheck.push("iat");
    if (audience !== void 0)
      presenceCheck.push("aud");
    if (subject !== void 0)
      presenceCheck.push("sub");
    if (issuer !== void 0)
      presenceCheck.push("iss");
    for (const claim of new Set(presenceCheck.reverse())) {
      if (!(claim in payload)) {
        throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
      }
    }
    if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
      throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
    }
    if (subject && payload.sub !== subject) {
      throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
    }
    if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
      throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
    }
    let tolerance;
    switch (typeof options.clockTolerance) {
      case "string":
        tolerance = secs_default(options.clockTolerance);
        break;
      case "number":
        tolerance = options.clockTolerance;
        break;
      case "undefined":
        tolerance = 0;
        break;
      default:
        throw new TypeError("Invalid clockTolerance option type");
    }
    const { currentDate } = options;
    const now = epoch_default(currentDate || /* @__PURE__ */ new Date());
    if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
      throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
    }
    if (payload.nbf !== void 0) {
      if (typeof payload.nbf !== "number") {
        throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
      }
      if (payload.nbf > now + tolerance) {
        throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
      }
    }
    if (payload.exp !== void 0) {
      if (typeof payload.exp !== "number") {
        throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
      }
      if (payload.exp <= now - tolerance) {
        throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
      }
    }
    if (maxTokenAge) {
      const age = now - payload.iat;
      const max = typeof maxTokenAge === "number" ? maxTokenAge : secs_default(maxTokenAge);
      if (age - tolerance > max) {
        throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
      }
      if (age < 0 - tolerance) {
        throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
      }
    }
    return payload;
  };

  // node_modules/jose/dist/browser/jwt/verify.js
  async function jwtVerify(jwt, key, options) {
    const verified = await compactVerify(jwt, key, options);
    if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
      throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    const payload = jwt_claims_set_default(verified.protectedHeader, verified.payload, options);
    const result = { payload, protectedHeader: verified.protectedHeader };
    if (typeof key === "function") {
      return { ...result, key: verified.key };
    }
    return result;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/get-hmac-key.mjs
  function getHMACKey(key) {
    const arrayBuffer = new Uint8Array(key.length);
    for (let i = 0, keyLen = key.length; i < keyLen; i++) {
      arrayBuffer[i] = key.charCodeAt(i);
    }
    return arrayBuffer;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/session/decode-session-token.mjs
  var JWT_PERMITTED_CLOCK_TOLERANCE = 10;
  function decodeSessionToken(config2) {
    return async (token, { checkAudience = true } = {}) => {
      let payload;
      try {
        payload = (await jwtVerify(token, getHMACKey(config2.apiSecretKey), {
          algorithms: ["HS256"],
          clockTolerance: JWT_PERMITTED_CLOCK_TOLERANCE
        })).payload;
      } catch (error) {
        throw new InvalidJwtError(`Failed to parse session token '${token}': ${error.message}`);
      }
      if (checkAudience && payload.aud !== config2.apiKey) {
        throw new InvalidJwtError("Session token had invalid API key");
      }
      return payload;
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/session/session-utils.mjs
  function getJwtSessionId(config2) {
    return (shop, userId) => {
      return `${sanitizeShop(config2)(shop, true)}_${userId}`;
    };
  }
  function getOfflineId(config2) {
    return (shop) => {
      return `offline_${sanitizeShop(config2)(shop, true)}`;
    };
  }
  function getCurrentSessionId(config2) {
    return async function getCurrentSessionId2({ isOnline, ...adapterArgs }) {
      const request2 = await abstractConvertRequest(adapterArgs);
      const log2 = logger(config2);
      if (config2.isEmbeddedApp) {
        log2.debug("App is embedded, looking for session id in JWT payload", {
          isOnline
        });
        const authHeader = request2.headers.Authorization;
        if (authHeader) {
          const matches = (typeof authHeader === "string" ? authHeader : authHeader[0]).match(/^Bearer (.+)$/);
          if (!matches) {
            log2.error("Missing Bearer token in authorization header", { isOnline });
            throw new MissingJwtTokenError("Missing Bearer token in authorization header");
          }
          const jwtPayload = await decodeSessionToken(config2)(matches[1]);
          const shop = jwtPayload.dest.replace(/^https:\/\//, "");
          log2.debug("Found valid JWT payload", { shop, isOnline });
          if (isOnline) {
            return getJwtSessionId(config2)(shop, jwtPayload.sub);
          } else {
            return getOfflineId(config2)(shop);
          }
        } else {
          log2.error("Missing Authorization header review App Bridge configuration", { isOnline });
        }
      } else {
        log2.debug("App is not embedded, looking for session id in cookies", {
          isOnline
        });
        const cookies = new Cookies(request2, {}, {
          keys: [config2.apiSecretKey]
        });
        return cookies.getAndVerify(SESSION_COOKIE_NAME);
      }
      return void 0;
    };
  }
  function customAppSession(config2) {
    return (shop) => {
      return new Session({
        id: "",
        shop: `${sanitizeShop(config2)(shop, true)}`,
        state: "",
        isOnline: false
      });
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/create-session.mjs
  function createSession({ config: config2, accessTokenResponse, shop, state }) {
    const associatedUser = accessTokenResponse.associated_user;
    const isOnline = Boolean(associatedUser);
    logger(config2).info("Creating new session", { shop, isOnline });
    const getSessionExpiration = (expires_in) => new Date(Date.now() + expires_in * 1e3);
    const getOnlineSessionProperties = (responseBody) => {
      const { access_token, scope, ...rest } = responseBody;
      const sessionId = config2.isEmbeddedApp ? getJwtSessionId(config2)(shop, `${rest.associated_user.id}`) : crypto.randomUUID();
      return {
        id: sessionId,
        onlineAccessInfo: rest,
        expires: getSessionExpiration(rest.expires_in)
      };
    };
    const getOfflineSessionProperties = (responseBody) => {
      const { expires_in, refresh_token, refresh_token_expires_in } = responseBody;
      return {
        id: getOfflineId(config2)(shop),
        ...expires_in && { expires: getSessionExpiration(expires_in) },
        ...refresh_token && refresh_token_expires_in && {
          refreshToken: refresh_token,
          refreshTokenExpires: getSessionExpiration(refresh_token_expires_in)
        }
      };
    };
    return new Session({
      shop,
      state,
      isOnline,
      accessToken: accessTokenResponse.access_token,
      scope: accessTokenResponse.scope,
      ...isOnline ? getOnlineSessionProperties(accessTokenResponse) : getOfflineSessionProperties(accessTokenResponse)
    });
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/oauth.mjs
  var logForBot = ({ request: request2, log: log2, func }) => {
    log2.debug(`Possible bot request to auth ${func}: `, {
      userAgent: request2.headers["User-Agent"]
    });
  };
  function begin(config2) {
    return async ({ shop, callbackPath, isOnline, ...adapterArgs }) => {
      throwIfCustomStoreApp(config2.isCustomStoreApp, "Cannot perform OAuth for private apps");
      const log2 = logger(config2);
      log2.info("Beginning OAuth", { shop, isOnline, callbackPath });
      const request2 = await abstractConvertRequest(adapterArgs);
      const response = await abstractConvertIncomingResponse(adapterArgs);
      let userAgent = request2.headers["User-Agent"];
      if (Array.isArray(userAgent)) {
        userAgent = userAgent[0];
      }
      if (isbot(userAgent)) {
        logForBot({ request: request2, log: log2, func: "begin" });
        response.statusCode = 410;
        return abstractConvertResponse(response, adapterArgs);
      }
      const cookies = new Cookies(request2, response, {
        keys: [config2.apiSecretKey],
        secure: true
      });
      const state = nonce();
      await cookies.setAndSign(STATE_COOKIE_NAME, state, {
        expires: new Date(Date.now() + 6e4),
        sameSite: "lax",
        secure: true,
        path: callbackPath
      });
      const scopes = config2.scopes ? config2.scopes.toString() : "";
      const query = {
        client_id: config2.apiKey,
        scope: scopes,
        redirect_uri: `${config2.hostScheme}://${config2.hostName}${callbackPath}`,
        state,
        "grant_options[]": isOnline ? "per-user" : ""
      };
      const processedQuery = new ProcessedQuery();
      processedQuery.putAll(query);
      const cleanShop = sanitizeShop(config2)(shop, true);
      const redirectUrl = `https://${cleanShop}/admin/oauth/authorize${processedQuery.stringify()}`;
      response.statusCode = 302;
      response.statusText = "Found";
      response.headers = {
        ...response.headers,
        ...cookies.response.headers,
        Location: redirectUrl
      };
      log2.debug(`OAuth started, redirecting to ${redirectUrl}`, { shop, isOnline });
      return abstractConvertResponse(response, adapterArgs);
    };
  }
  function callback(config2) {
    return async function callback2({ expiring, ...adapterArgs }) {
      throwIfCustomStoreApp(config2.isCustomStoreApp, "Cannot perform OAuth for private apps");
      const log2 = logger(config2);
      const request2 = await abstractConvertRequest(adapterArgs);
      const query = new URL(request2.url, `${config2.hostScheme}://${config2.hostName}`).searchParams;
      const shop = query.get("shop");
      const response = {};
      let userAgent = request2.headers["User-Agent"];
      if (Array.isArray(userAgent)) {
        userAgent = userAgent[0];
      }
      if (isbot(userAgent)) {
        logForBot({ request: request2, log: log2, func: "callback" });
        throw new BotActivityDetected("Invalid OAuth callback initiated by bot");
      }
      log2.info("Completing OAuth", { shop });
      const cookies = new Cookies(request2, response, {
        keys: [config2.apiSecretKey],
        secure: true
      });
      const stateFromCookie = await cookies.getAndVerify(STATE_COOKIE_NAME);
      cookies.deleteCookie(STATE_COOKIE_NAME);
      if (!stateFromCookie) {
        log2.error("Could not find OAuth cookie", { shop });
        throw new CookieNotFound(`Cannot complete OAuth process. Could not find an OAuth cookie for shop url: ${shop}`);
      }
      const authQuery = Object.fromEntries(query.entries());
      if (!await validQuery({ config: config2, query: authQuery, stateFromCookie })) {
        log2.error("Invalid OAuth callback", { shop, stateFromCookie });
        throw new InvalidOAuthError("Invalid OAuth callback.");
      }
      log2.debug("OAuth request is valid, requesting access token", { shop });
      const body = {
        client_id: config2.apiKey,
        client_secret: config2.apiSecretKey,
        code: query.get("code"),
        expiring: expiring ? "1" : "0"
      };
      const cleanShop = sanitizeShop(config2)(query.get("shop"), true);
      const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": DataType.JSON,
          Accept: DataType.JSON
        }
      });
      if (!postResponse.ok) {
        throwFailedRequest(await postResponse.json(), false, postResponse);
      }
      const session = createSession({
        accessTokenResponse: await postResponse.json(),
        shop: cleanShop,
        state: stateFromCookie,
        config: config2
      });
      if (!config2.isEmbeddedApp) {
        await cookies.setAndSign(SESSION_COOKIE_NAME, session.id, {
          expires: session.expires,
          sameSite: "lax",
          secure: true,
          path: "/"
        });
      }
      return {
        headers: await abstractConvertHeaders(cookies.response.headers, adapterArgs),
        session
      };
    };
  }
  async function validQuery({ config: config2, query, stateFromCookie }) {
    return await validateHmac(config2)(query) && safeCompare(query.state, stateFromCookie);
  }
  function throwIfCustomStoreApp(isCustomStoreApp, message2) {
    if (isCustomStoreApp) {
      throw new PrivateAppError(message2);
    }
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/get-embedded-app-url.mjs
  function getEmbeddedAppUrl(config2) {
    return async ({ ...adapterArgs }) => {
      const request2 = await abstractConvertRequest(adapterArgs);
      if (!request2) {
        throw new MissingRequiredArgument("getEmbeddedAppUrl requires a request object argument");
      }
      if (!request2.url) {
        throw new InvalidRequestError("Request does not contain a URL");
      }
      const url = new URL(request2.url, `https://${request2.headers.host}`);
      const host = url.searchParams.get("host");
      if (typeof host !== "string") {
        throw new InvalidRequestError("Request does not contain a host query parameter");
      }
      return buildEmbeddedAppUrl(config2)(host);
    };
  }
  function buildEmbeddedAppUrl(config2) {
    return (host) => {
      sanitizeHost(config2)(host, true);
      const decodedHost = decodeHost(host);
      return `https://${decodedHost}/apps/${config2.apiKey}`;
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/token-exchange.mjs
  var RequestedTokenType;
  (function(RequestedTokenType2) {
    RequestedTokenType2["OnlineAccessToken"] = "urn:shopify:params:oauth:token-type:online-access-token";
    RequestedTokenType2["OfflineAccessToken"] = "urn:shopify:params:oauth:token-type:offline-access-token";
  })(RequestedTokenType || (RequestedTokenType = {}));
  var TokenExchangeGrantType = "urn:ietf:params:oauth:grant-type:token-exchange";
  var IdTokenType = "urn:ietf:params:oauth:token-type:id_token";
  function tokenExchange(config2) {
    return async ({ shop, sessionToken, requestedTokenType, expiring }) => {
      await decodeSessionToken(config2)(sessionToken);
      const body = {
        client_id: config2.apiKey,
        client_secret: config2.apiSecretKey,
        grant_type: TokenExchangeGrantType,
        subject_token: sessionToken,
        subject_token_type: IdTokenType,
        requested_token_type: requestedTokenType,
        expiring: expiring ? "1" : "0"
      };
      const cleanShop = sanitizeShop(config2)(shop, true);
      const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": DataType.JSON,
          Accept: DataType.JSON
        }
      });
      if (!postResponse.ok) {
        throwFailedRequest(await postResponse.json(), false, postResponse);
      }
      return {
        session: createSession({
          accessTokenResponse: await postResponse.json(),
          shop: cleanShop,
          // We need to keep this as an empty string as our template DB schemas have this required
          state: "",
          config: config2
        })
      };
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/client-credentials.mjs
  var ClientCredentialsGrantType = "client_credentials";
  function clientCredentials(config2) {
    return async ({ shop }) => {
      const cleanShop = sanitizeShop(config2)(shop, true);
      const requestConfig = {
        method: "POST",
        body: JSON.stringify({
          client_id: config2.apiKey,
          client_secret: config2.apiSecretKey,
          grant_type: ClientCredentialsGrantType
        }),
        headers: {
          "Content-Type": DataType.JSON,
          Accept: DataType.JSON
        }
      };
      const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, requestConfig);
      const responseData = await postResponse.json();
      if (!postResponse.ok) {
        throwFailedRequest(responseData, false, postResponse);
      }
      return {
        session: createSession({
          accessTokenResponse: responseData,
          shop: cleanShop,
          // We need to keep this as an empty string as our template DB schemas have this required
          state: "",
          config: config2
        })
      };
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/refresh-token.mjs
  var RefreshTokenGrantType = "refresh_token";
  function refreshToken(config2) {
    return async ({ shop, refreshToken: refreshToken3 }) => {
      const body = {
        client_id: config2.apiKey,
        client_secret: config2.apiSecretKey,
        refresh_token: refreshToken3,
        grant_type: RefreshTokenGrantType
      };
      const cleanShop = sanitizeShop(config2)(shop, true);
      const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": DataType.JSON,
          Accept: DataType.JSON
        }
      });
      if (!postResponse.ok) {
        throwFailedRequest(await postResponse.json(), false, postResponse);
      }
      return {
        session: createSession({
          accessTokenResponse: await postResponse.json(),
          shop: cleanShop,
          // We need to keep this as an empty string as our template DB schemas have this required
          state: "",
          config: config2
        })
      };
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/oauth/migrate-to-expiring-token.mjs
  var TokenExchangeGrantType2 = "urn:ietf:params:oauth:grant-type:token-exchange";
  function migrateToExpiringToken(config2) {
    return async ({ shop, nonExpiringOfflineAccessToken }) => {
      const body = {
        client_id: config2.apiKey,
        client_secret: config2.apiSecretKey,
        grant_type: TokenExchangeGrantType2,
        subject_token: nonExpiringOfflineAccessToken,
        subject_token_type: RequestedTokenType.OfflineAccessToken,
        requested_token_type: RequestedTokenType.OfflineAccessToken,
        expiring: "1"
      };
      const cleanShop = sanitizeShop(config2)(shop, true);
      const postResponse = await fetchRequestFactory(config2)(`https://${cleanShop}/admin/oauth/access_token`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": DataType.JSON,
          Accept: DataType.JSON
        }
      });
      if (!postResponse.ok) {
        throwFailedRequest(await postResponse.json(), false, postResponse);
      }
      return {
        session: createSession({
          accessTokenResponse: await postResponse.json(),
          shop: cleanShop,
          // We need to keep this as an empty string as our template DB schemas have this required
          state: "",
          config: config2
        })
      };
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/auth/index.mjs
  function shopifyAuth(config2) {
    const shopify2 = {
      begin: begin(config2),
      callback: callback(config2),
      nonce,
      safeCompare,
      getEmbeddedAppUrl: getEmbeddedAppUrl(config2),
      buildEmbeddedAppUrl: buildEmbeddedAppUrl(config2),
      tokenExchange: tokenExchange(config2),
      migrateToExpiringToken: migrateToExpiringToken(config2),
      refreshToken: refreshToken(config2),
      clientCredentials: clientCredentials(config2)
    };
    return shopify2;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/session/index.mjs
  function shopifySession(config2) {
    return {
      customAppSession: customAppSession(config2),
      getCurrentId: getCurrentSessionId(config2),
      getOfflineId: getOfflineId(config2),
      getJwtSessionId: getJwtSessionId(config2),
      decodeSessionToken: decodeSessionToken(config2)
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/version-compatible.mjs
  function versionCompatible(config2) {
    return (referenceVersion, currentVersion = config2.apiVersion) => {
      if (currentVersion === ApiVersion.Unstable) {
        return true;
      }
      const numericVersion = (version) => parseInt(version.replace("-", ""), 10);
      const current = numericVersion(currentVersion);
      const reference = numericVersion(referenceVersion);
      return current >= reference;
    };
  }
  function versionPriorTo(config2) {
    return (referenceVersion, currentVersion = config2.apiVersion) => {
      return !versionCompatible(config2)(referenceVersion, currentVersion);
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/utils/index.mjs
  function shopifyUtils(config2) {
    return {
      sanitizeShop: sanitizeShop(config2),
      sanitizeHost: sanitizeHost(config2),
      validateHmac: validateHmac(config2),
      versionCompatible: versionCompatible(config2),
      versionPriorTo: versionPriorTo(config2),
      shopAdminUrlToLegacyUrl,
      legacyUrlToShopAdminUrl
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/registry.mjs
  function registry() {
    return {};
  }
  function topicForStorage(topic) {
    return topic.toUpperCase().replace(/\/|\./g, "_");
  }
  function addHandlers(config2, webhookRegistry) {
    return function addHandlers2(handlersToAdd) {
      for (const [topic, handlers] of Object.entries(handlersToAdd)) {
        const topicKey = topicForStorage(topic);
        if (Array.isArray(handlers)) {
          for (const handler of handlers) {
            mergeOrAddHandler(config2, webhookRegistry, topicKey, handler);
          }
        } else {
          mergeOrAddHandler(config2, webhookRegistry, topicKey, handlers);
        }
      }
    };
  }
  function getTopicsAdded(webhookRegistry) {
    return function getTopicsAdded2() {
      return Object.keys(webhookRegistry);
    };
  }
  function getHandlers(webhookRegistry) {
    return function getHandlers2(topic) {
      return webhookRegistry[topicForStorage(topic)] || [];
    };
  }
  function handlerIdentifier(config2, handler) {
    const prefix = handler.deliveryMethod;
    switch (handler.deliveryMethod) {
      case DeliveryMethod.Http:
        return `${prefix}_${addHostToCallbackUrl(config2, handler.callbackUrl)}`;
      case DeliveryMethod.EventBridge:
        return `${prefix}_${handler.arn}`;
      case DeliveryMethod.PubSub:
        return `${prefix}_${handler.pubSubProject}:${handler.pubSubTopic}`;
      default:
        throw new InvalidDeliveryMethodError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
    }
  }
  function addHostToCallbackUrl(config2, callbackUrl) {
    if (callbackUrl.startsWith("/")) {
      return `${config2.hostScheme}://${config2.hostName}${callbackUrl}`;
    } else {
      return callbackUrl;
    }
  }
  function mergeOrAddHandler(config2, webhookRegistry, topic, handler) {
    const log2 = logger(config2);
    handler.includeFields?.sort();
    handler.metafieldNamespaces?.sort();
    if (!(topic in webhookRegistry)) {
      webhookRegistry[topic] = [handler];
      return;
    }
    const identifier = handlerIdentifier(config2, handler);
    for (const index in webhookRegistry[topic]) {
      if (!Object.prototype.hasOwnProperty.call(webhookRegistry[topic], index)) {
        continue;
      }
      const existingHandler = webhookRegistry[topic][index];
      const existingIdentifier = handlerIdentifier(config2, existingHandler);
      if (identifier !== existingIdentifier) {
        continue;
      }
      if (handler.deliveryMethod === DeliveryMethod.Http) {
        log2.info(`Detected multiple handlers for '${topic}', webhooks.process will call them sequentially`);
        break;
      } else {
        throw new InvalidDeliveryMethodError(`Can only add multiple handlers for a topic when deliveryMethod is Http. Please be sure that you used addHandler method once after creating ShopifyApi instance in your app.  Invalid handler: ${JSON.stringify(handler)}`);
      }
    }
    webhookRegistry[topic].push(handler);
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/query-template.mjs
  function queryTemplate(template, params) {
    let query = template;
    Object.entries(params).forEach(([key, value]) => {
      query = query.replace(`{{${key}}}`, value);
    });
    return query;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/register.mjs
  function register(config2, webhookRegistry) {
    return async function register2({ session }) {
      const log2 = logger(config2);
      log2.info("Registering webhooks", { shop: session.shop });
      const registerReturn = Object.keys(webhookRegistry).reduce((acc, topic) => {
        acc[topic] = [];
        return acc;
      }, {});
      const existingHandlers = await getExistingHandlers(config2, session);
      log2.debug(`Existing topics: [${Object.keys(existingHandlers).join(", ")}]`, { shop: session.shop });
      for (const topic in webhookRegistry) {
        if (!Object.prototype.hasOwnProperty.call(webhookRegistry, topic)) {
          continue;
        }
        if (privacyTopics.includes(topic)) {
          continue;
        }
        registerReturn[topic] = await registerTopic({
          config: config2,
          session,
          topic,
          existingHandlers: existingHandlers[topic] || [],
          handlers: getHandlers(webhookRegistry)(topic)
        });
        delete existingHandlers[topic];
      }
      for (const topic in existingHandlers) {
        if (!Object.prototype.hasOwnProperty.call(existingHandlers, topic)) {
          continue;
        }
        const GraphqlClient2 = graphqlClientClass({ config: config2 });
        const client = new GraphqlClient2({ session });
        registerReturn[topic] = await runMutations({
          config: config2,
          client,
          topic,
          handlers: existingHandlers[topic],
          operation: WebhookOperation.Delete
        });
      }
      return registerReturn;
    };
  }
  async function getExistingHandlers(config2, session) {
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    const existingHandlers = {};
    let hasNextPage;
    let endCursor = null;
    do {
      const query = buildCheckQuery(endCursor);
      const response = await client.request(query);
      response.data?.webhookSubscriptions?.edges.forEach((edge) => {
        const handler = buildHandlerFromNode(edge);
        if (!existingHandlers[edge.node.topic]) {
          existingHandlers[edge.node.topic] = [];
        }
        existingHandlers[edge.node.topic].push(handler);
      });
      endCursor = response.data?.webhookSubscriptions?.pageInfo.endCursor;
      hasNextPage = response.data?.webhookSubscriptions?.pageInfo.hasNextPage;
    } while (hasNextPage);
    return existingHandlers;
  }
  function buildCheckQuery(endCursor) {
    return queryTemplate(TEMPLATE_GET_HANDLERS, {
      END_CURSOR: JSON.stringify(endCursor)
    });
  }
  function buildHandlerFromNode(edge) {
    const endpoint = edge.node.endpoint;
    let handler;
    switch (endpoint.__typename) {
      case "WebhookHttpEndpoint":
        handler = {
          deliveryMethod: DeliveryMethod.Http,
          callbackUrl: endpoint.callbackUrl,
          // This is a dummy for now because we don't really care about it
          callback: async () => {
          }
        };
        break;
      case "WebhookEventBridgeEndpoint":
        handler = {
          deliveryMethod: DeliveryMethod.EventBridge,
          arn: endpoint.arn
        };
        break;
      case "WebhookPubSubEndpoint":
        handler = {
          deliveryMethod: DeliveryMethod.PubSub,
          pubSubProject: endpoint.pubSubProject,
          pubSubTopic: endpoint.pubSubTopic
        };
        break;
    }
    handler.id = edge.node.id;
    handler.includeFields = edge.node.includeFields;
    handler.metafieldNamespaces = edge.node.metafieldNamespaces;
    handler.includeFields?.sort();
    handler.metafieldNamespaces?.sort();
    return handler;
  }
  async function registerTopic({ config: config2, session, topic, existingHandlers, handlers }) {
    let registerResults = [];
    const { toCreate, toUpdate, toDelete } = categorizeHandlers(config2, existingHandlers, handlers);
    const GraphqlClient2 = graphqlClientClass({ config: config2 });
    const client = new GraphqlClient2({ session });
    let operation = WebhookOperation.Create;
    registerResults = registerResults.concat(await runMutations({ config: config2, client, topic, operation, handlers: toCreate }));
    operation = WebhookOperation.Update;
    registerResults = registerResults.concat(await runMutations({ config: config2, client, topic, operation, handlers: toUpdate }));
    operation = WebhookOperation.Delete;
    registerResults = registerResults.concat(await runMutations({ config: config2, client, topic, operation, handlers: toDelete }));
    return registerResults;
  }
  function categorizeHandlers(config2, existingHandlers, handlers) {
    const handlersByKey = handlers.reduce((acc, value) => {
      acc[handlerIdentifier(config2, value)] = value;
      return acc;
    }, {});
    const existingHandlersByKey = existingHandlers.reduce((acc, value) => {
      acc[handlerIdentifier(config2, value)] = value;
      return acc;
    }, {});
    const toCreate = { ...handlersByKey };
    const toUpdate = {};
    const toDelete = {};
    for (const existingKey in existingHandlersByKey) {
      if (!Object.prototype.hasOwnProperty.call(existingHandlersByKey, existingKey)) {
        continue;
      }
      const existingHandler = existingHandlersByKey[existingKey];
      const handler = handlersByKey[existingKey];
      if (existingKey in handlersByKey) {
        delete toCreate[existingKey];
        if (!areHandlerFieldsEqual(existingHandler, handler)) {
          toUpdate[existingKey] = handler;
          toUpdate[existingKey].id = existingHandler.id;
        }
      } else {
        toDelete[existingKey] = existingHandler;
      }
    }
    return {
      toCreate: Object.values(toCreate),
      toUpdate: Object.values(toUpdate),
      toDelete: Object.values(toDelete)
    };
  }
  function areHandlerFieldsEqual(arr1, arr2) {
    const includeFieldsEqual = arraysEqual(arr1.includeFields || [], arr2.includeFields || []);
    const metafieldNamespacesEqual = arraysEqual(arr1.metafieldNamespaces || [], arr2.metafieldNamespaces || []);
    return includeFieldsEqual && metafieldNamespacesEqual;
  }
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  async function runMutations({ config: config2, client, topic, handlers, operation }) {
    const registerResults = [];
    for (const handler of handlers) {
      registerResults.push(await runMutation({ config: config2, client, topic, handler, operation }));
    }
    return registerResults;
  }
  async function runMutation({ config: config2, client, topic, handler, operation }) {
    let registerResult;
    logger(config2).debug(`Running webhook mutation`, { topic, operation });
    try {
      const query = buildMutation(config2, topic, handler, operation);
      const result = await client.request(query);
      registerResult = {
        deliveryMethod: handler.deliveryMethod,
        success: isSuccess(result, handler, operation),
        result,
        operation
      };
    } catch (error) {
      if (error instanceof InvalidDeliveryMethodError) {
        registerResult = {
          deliveryMethod: handler.deliveryMethod,
          success: false,
          result: { message: error.message },
          operation
        };
      } else {
        throw error;
      }
    }
    return registerResult;
  }
  function buildMutation(config2, topic, handler, operation) {
    const params = {};
    let identifier;
    if (handler.id) {
      identifier = `id: "${handler.id}"`;
    } else {
      identifier = `topic: ${topic}`;
    }
    const mutationArguments = {
      MUTATION_NAME: getMutationName(handler, operation),
      IDENTIFIER: identifier,
      MUTATION_PARAMS: ""
    };
    if (operation !== WebhookOperation.Delete) {
      switch (handler.deliveryMethod) {
        case DeliveryMethod.Http:
          params.callbackUrl = `"${addHostToCallbackUrl(config2, handler.callbackUrl)}"`;
          break;
        case DeliveryMethod.EventBridge:
          params.arn = `"${handler.arn}"`;
          break;
        case DeliveryMethod.PubSub:
          params.pubSubProject = `"${handler.pubSubProject}"`;
          params.pubSubTopic = `"${handler.pubSubTopic}"`;
          break;
        default:
          throw new InvalidDeliveryMethodError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
      }
      if (handler.includeFields) {
        params.includeFields = JSON.stringify(handler.includeFields);
      }
      if (handler.metafieldNamespaces) {
        params.metafieldNamespaces = JSON.stringify(handler.metafieldNamespaces);
      }
      if (handler.subTopic) {
        const subTopicString = `subTopic: "${handler.subTopic}",`;
        mutationArguments.MUTATION_PARAMS = subTopicString;
      }
      const paramsString = Object.entries(params).map(([key, value]) => `${key}: ${value}`).join(", ");
      mutationArguments.MUTATION_PARAMS += `webhookSubscription: {${paramsString}}`;
    }
    return queryTemplate(TEMPLATE_MUTATION, mutationArguments);
  }
  function getMutationName(handler, operation) {
    switch (operation) {
      case WebhookOperation.Create:
        return `${getEndpoint(handler)}Create`;
      case WebhookOperation.Update:
        return `${getEndpoint(handler)}Update`;
      case WebhookOperation.Delete:
        return "webhookSubscriptionDelete";
      default:
        throw new ShopifyError(`Unrecognized operation '${operation}'`);
    }
  }
  function getEndpoint(handler) {
    switch (handler.deliveryMethod) {
      case DeliveryMethod.Http:
        return "webhookSubscription";
      case DeliveryMethod.EventBridge:
        return "eventBridgeWebhookSubscription";
      case DeliveryMethod.PubSub:
        return "pubSubWebhookSubscription";
      default:
        throw new ShopifyError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
    }
  }
  function isSuccess(result, handler, operation) {
    const mutationName = getMutationName(handler, operation);
    return Boolean(result.data && result.data[mutationName] && result.data[mutationName].userErrors.length === 0);
  }
  var TEMPLATE_GET_HANDLERS = `query shopifyApiReadWebhookSubscriptions {
  webhookSubscriptions(
    first: 250,
    after: {{END_CURSOR}},
  ) {
    edges {
      node {
        id
        topic
        includeFields
        metafieldNamespaces
        endpoint {
          __typename
          ... on WebhookHttpEndpoint {
            callbackUrl
          }
          ... on WebhookEventBridgeEndpoint {
            arn
          }
          ... on WebhookPubSubEndpoint {
            pubSubProject
            pubSubTopic
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`;
  var TEMPLATE_MUTATION = `
  mutation shopifyApiCreateWebhookSubscription {
    {{MUTATION_NAME}}(
      {{IDENTIFIER}},
      {{MUTATION_PARAMS}}
    ) {
      userErrors {
        field
        message
      }
    }
  }
`;

  // node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/validate.mjs
  function detectWebhookType(headers2) {
    const eventsHmac = getHeader(headers2, WEBHOOK_HEADER_NAMES[WebhookType.Events].hmac);
    if (eventsHmac) {
      return WebhookType.Events;
    }
    const webhooksHmac = getHeader(headers2, WEBHOOK_HEADER_NAMES[WebhookType.Webhooks].hmac);
    if (webhooksHmac) {
      return WebhookType.Webhooks;
    }
    return WebhookType.Webhooks;
  }
  function validateFactory(config2) {
    return async function validate({ rawBody, ...adapterArgs }) {
      const request2 = await abstractConvertRequest(adapterArgs);
      const webhookType = detectWebhookType(request2.headers);
      const validHmacResult = await validateHmacFromRequestFactory(config2)({
        type: HmacValidationType.Webhook,
        rawBody,
        webhookType,
        ...adapterArgs
      });
      if (!validHmacResult.valid) {
        if (validHmacResult.reason === ValidationErrorReason.InvalidHmac) {
          const log2 = logger(config2);
          await log2.debug("Webhook HMAC validation failed. Please note that events manually triggered from a store's Notifications settings will fail this validation. To test this, please use the CLI or trigger the actual event in a development store.");
        }
        return validHmacResult;
      }
      return checkWebhookHeaders(request2.headers, webhookType);
    };
  }
  function getRequiredHeader(headers2, headerName, missingHeaders) {
    const value = getHeader(headers2, headerName);
    if (!value) {
      missingHeaders.push(headerName);
    }
    return value;
  }
  function checkWebhookHeaders(headers2, webhookType) {
    if (webhookType === WebhookType.Webhooks) {
      return checkWebhooksHeaders(headers2);
    }
    return checkEventsHeaders(headers2);
  }
  function checkWebhooksHeaders(headers2) {
    const headerNames = WEBHOOK_HEADER_NAMES[WebhookType.Webhooks];
    const missingHeaders = [];
    const hmac = getRequiredHeader(headers2, headerNames.hmac, missingHeaders);
    const topic = getRequiredHeader(headers2, headerNames.topic, missingHeaders);
    const domain = getRequiredHeader(headers2, headerNames.domain, missingHeaders);
    const apiVersion2 = getRequiredHeader(headers2, headerNames.apiVersion, missingHeaders);
    const webhookId = getRequiredHeader(headers2, headerNames.webhookId, missingHeaders);
    if (missingHeaders.length) {
      return {
        valid: false,
        reason: WebhookValidationErrorReason.MissingHeaders,
        missingHeaders
      };
    }
    const fields = {
      webhookType: WebhookType.Webhooks,
      hmac,
      topic: topicForStorage(topic),
      domain,
      apiVersion: apiVersion2,
      webhookId
    };
    const subTopic = getHeader(headers2, headerNames.subTopic);
    if (subTopic)
      fields.subTopic = subTopic;
    const name = getHeader(headers2, headerNames.name);
    if (name)
      fields.name = name;
    const triggeredAt = getHeader(headers2, headerNames.triggeredAt);
    if (triggeredAt)
      fields.triggeredAt = triggeredAt;
    const eventId = getHeader(headers2, headerNames.eventId);
    if (eventId)
      fields.eventId = eventId;
    return { valid: true, ...fields };
  }
  function checkEventsHeaders(headers2) {
    const headerNames = WEBHOOK_HEADER_NAMES[WebhookType.Events];
    const missingHeaders = [];
    const hmac = getRequiredHeader(headers2, headerNames.hmac, missingHeaders);
    const topic = getRequiredHeader(headers2, headerNames.topic, missingHeaders);
    const domain = getRequiredHeader(headers2, headerNames.domain, missingHeaders);
    const apiVersion2 = getRequiredHeader(headers2, headerNames.apiVersion, missingHeaders);
    const webhookId = getRequiredHeader(headers2, headerNames.webhookId, missingHeaders);
    const eventId = getRequiredHeader(headers2, headerNames.eventId, missingHeaders);
    if (missingHeaders.length) {
      return {
        valid: false,
        reason: WebhookValidationErrorReason.MissingHeaders,
        missingHeaders
      };
    }
    const fields = {
      webhookType: WebhookType.Events,
      hmac,
      topic: topicForStorage(topic),
      domain,
      apiVersion: apiVersion2,
      webhookId,
      eventId
    };
    const handle = getHeader(headers2, headerNames.handle);
    if (handle)
      fields.handle = handle;
    const action2 = getHeader(headers2, headerNames.action);
    if (action2)
      fields.action = action2;
    const resourceId = getHeader(headers2, headerNames.resourceId);
    if (resourceId)
      fields.resourceId = resourceId;
    const triggeredAt = getHeader(headers2, headerNames.triggeredAt);
    if (triggeredAt)
      fields.triggeredAt = triggeredAt;
    return { valid: true, ...fields };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/process.mjs
  var STATUS_TEXT_LOOKUP = {
    [StatusCode.Ok]: "OK",
    [StatusCode.BadRequest]: "Bad Request",
    [StatusCode.Unauthorized]: "Unauthorized",
    [StatusCode.NotFound]: "Not Found",
    [StatusCode.InternalServerError]: "Internal Server Error"
  };
  function process2(config2, webhookRegistry) {
    return async function process3({ context, rawBody, ...adapterArgs }) {
      const response = {
        statusCode: StatusCode.Ok,
        statusText: STATUS_TEXT_LOOKUP[StatusCode.Ok],
        headers: {}
      };
      await logger(config2).info("Receiving webhook request");
      const webhookCheck = await validateFactory(config2)({
        rawBody,
        ...adapterArgs
      });
      let errorMessage = "Unknown error while handling webhook";
      if (webhookCheck.valid) {
        const handlerResult = await callWebhookHandlers(config2, webhookRegistry, webhookCheck, rawBody, context);
        response.statusCode = handlerResult.statusCode;
        if (!isOK(response)) {
          errorMessage = handlerResult.errorMessage || errorMessage;
        }
      } else {
        const errorResult = await handleInvalidWebhook(config2, webhookCheck);
        response.statusCode = errorResult.statusCode;
        response.statusText = STATUS_TEXT_LOOKUP[response.statusCode];
        errorMessage = errorResult.errorMessage;
      }
      const returnResponse = await abstractConvertResponse(response, adapterArgs);
      if (!isOK(response)) {
        throw new InvalidWebhookError({
          message: errorMessage,
          response: returnResponse
        });
      }
      return Promise.resolve(returnResponse);
    };
  }
  async function callWebhookHandlers(config2, webhookRegistry, webhookCheck, rawBody, context) {
    const log2 = logger(config2);
    const { hmac: _hmac, valid: _valid, ...loggingContext } = webhookCheck;
    await log2.debug("Webhook request is valid, looking for HTTP handlers to call", loggingContext);
    const handlers = webhookRegistry[webhookCheck.topic] || [];
    const response = { statusCode: StatusCode.Ok };
    let found = false;
    for (const handler of handlers) {
      if (handler.deliveryMethod !== DeliveryMethod.Http) {
        continue;
      }
      if (!handler.callback) {
        response.statusCode = StatusCode.InternalServerError;
        response.errorMessage = "Cannot call webhooks.process with a webhook handler that doesn't have a callback";
        throw new MissingWebhookCallbackError({
          message: response.errorMessage,
          response
        });
      }
      found = true;
      await log2.debug("Found HTTP handler, triggering it", loggingContext);
      if (webhookCheck.webhookType !== WebhookType.Webhooks) {
        throw new InvalidWebhookError({
          message: "process() only supports traditional webhooks, not events",
          response
        });
      }
      const { webhookId, subTopic } = webhookCheck;
      try {
        await handler.callback(webhookCheck.topic, webhookCheck.domain, rawBody, webhookId, webhookCheck.apiVersion, ...subTopic ? subTopic : "", context);
      } catch (error) {
        response.statusCode = StatusCode.InternalServerError;
        response.errorMessage = error.message;
      }
    }
    if (!found) {
      await log2.debug("No HTTP handlers found", loggingContext);
      response.statusCode = StatusCode.NotFound;
      response.errorMessage = `No HTTP webhooks registered for topic ${webhookCheck.topic}`;
    }
    return response;
  }
  async function handleInvalidWebhook(config2, webhookCheck) {
    const response = {
      statusCode: StatusCode.InternalServerError,
      errorMessage: "Unknown error while handling webhook"
    };
    switch (webhookCheck.reason) {
      case WebhookValidationErrorReason.MissingHeaders:
        response.statusCode = StatusCode.BadRequest;
        response.errorMessage = `Missing one or more of the required HTTP headers to process webhooks: [${webhookCheck.missingHeaders.join(", ")}]`;
        break;
      case WebhookValidationErrorReason.MissingBody:
        response.statusCode = StatusCode.BadRequest;
        response.errorMessage = "No body was received when processing webhook";
        break;
      case WebhookValidationErrorReason.MissingHmac:
        response.statusCode = StatusCode.BadRequest;
        response.errorMessage = `Missing HMAC header in request`;
        break;
      case WebhookValidationErrorReason.InvalidHmac:
        response.statusCode = StatusCode.Unauthorized;
        response.errorMessage = `Could not validate request HMAC`;
        break;
    }
    await logger(config2).debug(`Webhook request is invalid, returning ${response.statusCode}: ${response.errorMessage}`);
    return response;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/webhooks/index.mjs
  function shopifyWebhooks(config2) {
    const webhookRegistry = registry();
    return {
      addHandlers: addHandlers(config2, webhookRegistry),
      getTopicsAdded: getTopicsAdded(webhookRegistry),
      getHandlers: getHandlers(webhookRegistry),
      register: register(config2, webhookRegistry),
      process: process2(config2, webhookRegistry),
      validate: validateFactory(config2)
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/types.mjs
  var APP_SUBSCRIPTION_FRAGMENT = `
  fragment AppSubscriptionFragment on AppSubscription {
    id
    name
    test
    status
    trialDays
    createdAt
    currentPeriodEnd
    returnUrl
    lineItems {
      id
      plan {
        pricingDetails {
          ... on AppRecurringPricing {
            price {
              amount
              currencyCode
            }
            interval
            discount {
              durationLimitInIntervals
              remainingDurationInIntervals
              priceAfterDiscount {
                amount
              }
              value {
                ... on AppSubscriptionDiscountAmount {
                  amount {
                    amount
                    currencyCode
                  }
                }
                ... on AppSubscriptionDiscountPercentage {
                  percentage
                }
              }
            }
          }
          ... on AppUsagePricing {
            balanceUsed {
              amount
              currencyCode
            }
            cappedAmount {
              amount
              currencyCode
            }
            terms
          }
        }
      }
    }
  }
`;

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/utils.mjs
  function convertMoneyAmount(data2) {
    if (!data2)
      return data2;
    convertAppUsagePricingMoney(data2);
    convertAppRecurringPricingMoney(data2);
    convertAppDiscountMoney(data2);
    return data2;
  }
  function convertAppRecurringPricingMoney(data2) {
    if (!data2)
      return;
    if (data2.price?.amount && typeof data2.price.amount === "string") {
      data2.price.amount = parseFloat(data2.price.amount);
    }
  }
  function convertAppDiscountMoney(data2) {
    if (!data2)
      return;
    if (data2.discount?.priceAfterDiscount?.amount && typeof data2.discount.priceAfterDiscount.amount === "string") {
      data2.discount.priceAfterDiscount.amount = parseFloat(data2.discount.priceAfterDiscount.amount);
    }
    if (data2.discount?.value?.amount?.amount && typeof data2.discount.value.amount.amount === "string") {
      data2.discount.value.amount.amount = parseFloat(data2.discount.value.amount.amount);
    }
  }
  function convertAppUsagePricingMoney(data2) {
    if (!data2)
      return;
    if (data2.balanceUsed?.amount && typeof data2.balanceUsed.amount === "string") {
      data2.balanceUsed.amount = parseFloat(data2.balanceUsed.amount);
    }
    if (data2.cappedAmount?.amount && typeof data2.cappedAmount.amount === "string") {
      data2.cappedAmount.amount = parseFloat(data2.cappedAmount.amount);
    }
  }
  function convertLineItems(lineItems) {
    return lineItems.map((item) => {
      if (item.plan?.pricingDetails) {
        item.plan.pricingDetails = convertMoneyAmount(item.plan.pricingDetails);
      }
      return item;
    });
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/check.mjs
  function check(config2) {
    return async function check2(params) {
      if (!config2.future?.unstable_managedPricingSupport && !config2.billing) {
        throw new BillingError({
          message: "Attempted to look for purchases without billing configs",
          errorData: []
        });
      }
      const { session, isTest = true, plans } = params;
      const returnObject = params.returnObject ?? false;
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      const payments = await assessPayments({ client, isTest, plans });
      if (config2.future?.unstable_managedPricingSupport || returnObject) {
        return payments;
      } else {
        return payments.hasActivePayment;
      }
    };
  }
  async function assessPayments({ client, isTest, plans }) {
    const returnValue = {
      hasActivePayment: false,
      oneTimePurchases: [],
      appSubscriptions: []
    };
    let installation;
    let endCursor = null;
    do {
      const currentInstallations = await client.request(HAS_PAYMENTS_QUERY, { variables: { endCursor } });
      installation = currentInstallations.data?.currentAppInstallation;
      installation.activeSubscriptions.forEach((subscription) => {
        if (subscriptionMeetsCriteria({ subscription, isTest, plans })) {
          returnValue.hasActivePayment = true;
          if (subscription.lineItems) {
            subscription.lineItems = convertLineItems(subscription.lineItems);
          }
          returnValue.appSubscriptions.push(subscription);
        }
      });
      installation.oneTimePurchases.edges.forEach(({ node: purchase }) => {
        if (purchaseMeetsCriteria({ purchase, isTest, plans })) {
          returnValue.hasActivePayment = true;
          returnValue.oneTimePurchases.push(purchase);
        }
      });
      endCursor = installation.oneTimePurchases.pageInfo.endCursor;
    } while (installation?.oneTimePurchases.pageInfo.hasNextPage);
    return returnValue;
  }
  function subscriptionMeetsCriteria({ subscription, isTest, plans }) {
    return (typeof plans === "undefined" || plans.includes(subscription.name)) && (isTest || !subscription.test);
  }
  function purchaseMeetsCriteria({ purchase, isTest, plans }) {
    return (typeof plans === "undefined" || plans.includes(purchase.name)) && (isTest || !purchase.test) && purchase.status === "ACTIVE";
  }
  var HAS_PAYMENTS_QUERY = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  query appSubscription($endCursor: String) {
    currentAppInstallation {
      activeSubscriptions {
        ...AppSubscriptionFragment
      }
      oneTimePurchases(first: 250, sortKey: CREATED_AT, after: $endCursor) {
        edges {
          node {
            id
            name
            test
            status
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/request.mjs
  var RECURRING_PURCHASE_MUTATION = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  mutation AppSubscriptionCreate(
    $name: String!
    $returnUrl: URL!
    $test: Boolean
    $trialDays: Int
    $replacementBehavior: AppSubscriptionReplacementBehavior
    $lineItems: [AppSubscriptionLineItemInput!]!
  ) {
    appSubscriptionCreate(
      name: $name
      returnUrl: $returnUrl
      test: $test
      trialDays: $trialDays
      replacementBehavior: $replacementBehavior
      lineItems: $lineItems
    ) {
      appSubscription {
        ...AppSubscriptionFragment
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
  var ONE_TIME_PURCHASE_MUTATION = `
  mutation test(
    $name: String!
    $price: MoneyInput!
    $returnUrl: URL!
    $test: Boolean
  ) {
    appPurchaseOneTimeCreate(
      name: $name
      price: $price
      returnUrl: $returnUrl
      test: $test
    ) {
      appPurchaseOneTime {
        id
        name
        test
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
  function request(config2) {
    return async function({ session, plan, isTest = true, returnUrl: returnUrlParam, returnObject = false, ...overrides }) {
      if (!config2.billing || !config2.billing[plan]) {
        throw new BillingError({
          message: `Could not find plan ${plan} in billing settings`,
          errorData: []
        });
      }
      const billingConfig = {
        ...config2.billing[plan]
      };
      const filteredOverrides = Object.fromEntries(Object.entries(overrides).filter(([_key, value]) => value !== void 0));
      const cleanShopName = session.shop.replace(".myshopify.com", "");
      const embeddedAppUrl = buildEmbeddedAppUrl(config2)(hashString(`admin.shopify.com/store/${cleanShopName}`, HashFormat.Base64));
      const appUrl = `${config2.hostScheme}://${config2.hostName}?shop=${session.shop}`;
      const returnUrl = returnUrlParam || (config2.isEmbeddedApp ? embeddedAppUrl : appUrl);
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      function isLineItemPlan(billingConfig2) {
        return "lineItems" in billingConfig2;
      }
      function isOneTimePlan(billingConfig2) {
        return billingConfig2.interval === BillingInterval.OneTime;
      }
      let data2;
      if (isLineItemPlan(billingConfig)) {
        const mergedBillingConfigs = mergeBillingConfigs(billingConfig, filteredOverrides);
        const mutationRecurringResponse = await requestSubscriptionPayment({
          billingConfig: mergedBillingConfigs,
          plan,
          client,
          returnUrl,
          isTest
        });
        data2 = mutationRecurringResponse.appSubscriptionCreate;
      } else if (isOneTimePlan(billingConfig)) {
        const mutationOneTimeResponse = await requestSinglePayment({
          billingConfig: { ...billingConfig, ...filteredOverrides },
          plan,
          client,
          returnUrl,
          isTest
        });
        data2 = mutationOneTimeResponse.appPurchaseOneTimeCreate;
      } else {
        throw new BillingError({
          message: `Invalid billing configuration for plan ${plan}. Must be either a one-time plan or a subscription plan with line items.`,
          errorData: []
        });
      }
      if (data2.userErrors?.length) {
        throw new BillingError({
          message: "Error while billing the store",
          errorData: data2.userErrors
        });
      }
      if (returnObject) {
        return data2;
      } else {
        return data2.confirmationUrl;
      }
    };
  }
  async function requestSubscriptionPayment({ billingConfig, plan, client, returnUrl, isTest }) {
    const lineItems = billingConfig.lineItems.map((item) => {
      if (item.interval === BillingInterval.Every30Days || item.interval === BillingInterval.Annual) {
        const appRecurringPricingDetails = {
          interval: item.interval,
          price: {
            amount: item.amount,
            currencyCode: item.currencyCode
          }
        };
        if (item.discount) {
          appRecurringPricingDetails.discount = {
            durationLimitInIntervals: item.discount.durationLimitInIntervals,
            value: {
              amount: item.discount.value.amount,
              percentage: item.discount.value.percentage
            }
          };
        }
        return {
          plan: {
            appRecurringPricingDetails
          }
        };
      } else if (item.interval === BillingInterval.Usage) {
        const appUsagePricingDetails = {
          terms: item.terms,
          cappedAmount: {
            amount: item.amount,
            currencyCode: item.currencyCode
          }
        };
        return {
          plan: {
            appUsagePricingDetails
          }
        };
      } else {
        throw new BillingError({
          message: "Invalid interval provided",
          errorData: [item]
        });
      }
    });
    const mutationResponse = await client.request(RECURRING_PURCHASE_MUTATION, {
      variables: {
        name: plan,
        trialDays: billingConfig.trialDays,
        replacementBehavior: billingConfig.replacementBehavior,
        returnUrl,
        test: isTest,
        lineItems
      }
    });
    if (mutationResponse.errors) {
      throw new BillingError({
        message: "Error while billing the store",
        errorData: mutationResponse.errors
      });
    }
    return mutationResponse.data;
  }
  async function requestSinglePayment({ billingConfig, plan, client, returnUrl, isTest }) {
    const mutationResponse = await client.request(ONE_TIME_PURCHASE_MUTATION, {
      variables: {
        name: plan,
        returnUrl,
        test: isTest,
        price: {
          amount: billingConfig.amount,
          currencyCode: billingConfig.currencyCode
        }
      }
    });
    if (mutationResponse.errors) {
      throw new BillingError({
        message: "Error while billing the store",
        errorData: mutationResponse.errors
      });
    }
    return mutationResponse.data;
  }
  function mergeBillingConfigs(billingConfig, overrides) {
    const mergedConfig = { ...billingConfig, ...overrides };
    const mergedLineItems = [];
    if (billingConfig.lineItems && overrides.lineItems) {
      for (const i of billingConfig.lineItems) {
        let found = false;
        for (const j of overrides.lineItems) {
          if (i.interval === j.interval) {
            mergedLineItems.push({ ...i, ...j });
            found = true;
            break;
          }
        }
        if (!found) {
          mergedLineItems.push(i);
        }
      }
      mergedConfig.lineItems = mergedLineItems;
    }
    return mergedConfig;
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/cancel.mjs
  var CANCEL_MUTATION = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  mutation appSubscriptionCancel($id: ID!, $prorate: Boolean) {
    appSubscriptionCancel(id: $id, prorate: $prorate) {
      appSubscription {
        ...AppSubscriptionFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;
  function cancel(config2) {
    return async function(subscriptionInfo) {
      const { session, subscriptionId, prorate = true } = subscriptionInfo;
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      try {
        const response = await client.request(CANCEL_MUTATION, {
          variables: { id: subscriptionId, prorate }
        });
        if (response.data?.appSubscriptionCancel?.userErrors.length) {
          throw new BillingError({
            message: "Error while canceling a subscription",
            errorData: response.data?.appSubscriptionCancel?.userErrors
          });
        }
        return response.data?.appSubscriptionCancel?.appSubscription;
      } catch (error) {
        if (error instanceof GraphqlQueryError) {
          throw new BillingError({
            message: error.message,
            errorData: error.response?.errors
          });
        } else {
          throw error;
        }
      }
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/subscriptions.mjs
  var SUBSCRIPTION_QUERY = `
${APP_SUBSCRIPTION_FRAGMENT}
query appSubscription {
  currentAppInstallation {
    activeSubscriptions {
      ...AppSubscriptionFragment
    }
  }
}
`;
  function subscriptions(config2) {
    return async function({ session }) {
      if (!config2.future?.unstable_managedPricingSupport && !config2.billing) {
        throw new BillingError({
          message: "Attempted to look for purchases without billing configs",
          errorData: []
        });
      }
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      const response = await client.request(SUBSCRIPTION_QUERY);
      if (!response.data?.currentAppInstallation?.activeSubscriptions) {
        return { activeSubscriptions: [] };
      }
      const activeSubscriptions = response.data.currentAppInstallation.activeSubscriptions;
      activeSubscriptions.forEach((subscription) => {
        if (subscription.lineItems) {
          subscription.lineItems = convertLineItems(subscription.lineItems);
        }
      });
      return {
        activeSubscriptions
      };
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/create-usage-record.mjs
  var CREATE_USAGE_RECORD_MUTATION = `
mutation appUsageRecordCreate($description: String!, $price: MoneyInput!, $subscriptionLineItemId: ID!) {
  appUsageRecordCreate(description: $description, price: $price, subscriptionLineItemId: $subscriptionLineItemId) {
    userErrors {
      field
      message
    }
    appUsageRecord {
      id
      description
      idempotencyKey
      price {
        amount
        currencyCode
      }
      subscriptionLineItem {
        id
        plan {
          pricingDetails {
            ... on AppUsagePricing {
              balanceUsed {
                amount
                currencyCode
              }
              cappedAmount {
                amount
                currencyCode
              }
              terms
            }
          }
        }
      }
    }
  }
}
`;
  function createUsageRecord(config2) {
    return async function createUsageRecord2(usageRecordInfo) {
      const { session, subscriptionLineItemId, description, price, idempotencyKey, isTest = true } = usageRecordInfo;
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      const usageSubscriptionLineItemId = subscriptionLineItemId ? subscriptionLineItemId : await getUsageRecordSubscriptionLineItemId({ client, isTest });
      const variables = {
        description,
        price,
        subscriptionLineItemId: usageSubscriptionLineItemId
      };
      if (idempotencyKey) {
        variables.idempotencyKey = idempotencyKey;
      }
      try {
        const response = await client.request(CREATE_USAGE_RECORD_MUTATION, {
          variables
        });
        if (response.data?.appUsageRecordCreate?.userErrors.length) {
          throw new BillingError({
            message: "Error while creating a usage record",
            errorData: response.data?.appUsageRecordCreate?.userErrors
          });
        }
        const appUsageRecord = response.data?.appUsageRecordCreate?.appUsageRecord;
        convertAppRecurringPricingMoney(appUsageRecord.price);
        convertAppUsagePricingMoney(appUsageRecord.subscriptionLineItem.plan.pricingDetails);
        return appUsageRecord;
      } catch (error) {
        if (error instanceof GraphqlQueryError) {
          throw new BillingError({
            message: error.message,
            errorData: error.response?.errors
          });
        } else {
          throw error;
        }
      }
    };
  }
  async function getUsageRecordSubscriptionLineItemId({ client, isTest }) {
    const payments = await assessPayments({ client, isTest });
    if (!payments.hasActivePayment) {
      throw new BillingError({
        message: "No active payment found",
        errorData: []
      });
    }
    if (!payments.appSubscriptions.length) {
      throw new BillingError({
        message: "No active subscriptions found",
        errorData: []
      });
    }
    if (payments.appSubscriptions) {
      const usageSubscriptionLineItemId = getUsageLineItemId(payments.appSubscriptions);
      return usageSubscriptionLineItemId;
    }
    throw new BillingError({
      message: "Unable to find active subscription line item",
      errorData: []
    });
  }
  function getUsageLineItemId(subscriptions2) {
    for (const subscription of subscriptions2) {
      if (subscription.status === "ACTIVE" && subscription.lineItems) {
        for (const lineItem of subscription.lineItems) {
          if ("balanceUsed" in lineItem.plan.pricingDetails) {
            return lineItem.id;
          }
        }
      }
    }
    throw new BillingError({
      message: "No active usage subscription found",
      errorData: []
    });
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/update-usage-subscription-capped-amount.mjs
  var UPDATE_USAGE_CAPPED_AMOUNT_MUTATION = `
${APP_SUBSCRIPTION_FRAGMENT}
mutation appSubscriptionLineItemUpdate($cappedAmount: MoneyInput!, $id: ID!) {
  appSubscriptionLineItemUpdate(cappedAmount: $cappedAmount, id: $id) {
    userErrors {
      field
      message
    }
    confirmationUrl
    appSubscription {
      ...AppSubscriptionFragment
    }
  }
}
`;
  function updateUsageCappedAmount(config2) {
    return async function updateUsageCappedAmount2(params) {
      if (!config2.billing) {
        throw new BillingError({
          message: "Attempted to update line item without billing configs",
          errorData: []
        });
      }
      const { session, subscriptionLineItemId, cappedAmount: { amount, currencyCode } } = params;
      const GraphqlClient2 = graphqlClientClass({ config: config2 });
      const client = new GraphqlClient2({ session });
      try {
        const response = await client.request(UPDATE_USAGE_CAPPED_AMOUNT_MUTATION, {
          variables: {
            id: subscriptionLineItemId,
            cappedAmount: {
              amount,
              currencyCode
            }
          }
        });
        if (response.data?.appSubscriptionLineItemUpdate?.userErrors.length) {
          throw new BillingError({
            message: "Error while updating usage subscription capped amount",
            errorData: response.data?.appSubscriptionLineItemUpdate?.userErrors
          });
        }
        const appSubscription = response.data?.appSubscriptionLineItemUpdate?.appSubscription;
        if (appSubscription && appSubscription.lineItems) {
          appSubscription.lineItems = convertLineItems(appSubscription.lineItems);
        }
        return {
          confirmationUrl: response.data?.appSubscriptionLineItemUpdate?.confirmationUrl,
          appSubscription
        };
      } catch (error) {
        if (error instanceof GraphqlQueryError) {
          throw new BillingError({
            message: error.message,
            errorData: error.response?.errors
          });
        }
        throw error;
      }
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/billing/index.mjs
  function shopifyBilling(config2) {
    return {
      check: check(config2),
      request: request(config2),
      cancel: cancel(config2),
      subscriptions: subscriptions(config2),
      createUsageRecord: createUsageRecord(config2),
      updateUsageCappedAmount: updateUsageCappedAmount(config2)
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/flow/validate.mjs
  function validateFactory2(config2) {
    return async function validate({ rawBody, ...adapterArgs }) {
      return validateHmacFromRequestFactory(config2)({
        type: HmacValidationType.Flow,
        rawBody,
        ...adapterArgs
      });
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/flow/index.mjs
  function shopifyFlow(config2) {
    return {
      validate: validateFactory2(config2)
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/fulfillment-service/validate.mjs
  function validateFactory3(config2) {
    return async function validate({ rawBody, ...adapterArgs }) {
      return validateHmacFromRequestFactory(config2)({
        type: HmacValidationType.FulfillmentService,
        rawBody,
        ...adapterArgs
      });
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/fulfillment-service/index.mjs
  function fulfillmentService(config2) {
    return {
      validate: validateFactory3(config2)
    };
  }

  // node_modules/@shopify/shopify-api/dist/esm/lib/index.mjs
  function shopifyApi({ future, restResources, ...config2 }) {
    const libConfig = { ...config2, future, restResources };
    const validatedConfig = validateConfig(libConfig);
    const shopify2 = {
      config: validatedConfig,
      clients: clientClasses(validatedConfig),
      auth: shopifyAuth(validatedConfig),
      session: shopifySession(validatedConfig),
      utils: shopifyUtils(validatedConfig),
      webhooks: shopifyWebhooks(validatedConfig),
      billing: shopifyBilling(validatedConfig),
      flow: shopifyFlow(validatedConfig),
      fulfillmentService: fulfillmentService(validatedConfig),
      logger: logger(validatedConfig),
      rest: {}
    };
    if (restResources) {
      shopify2.rest = loadRestResources({
        resources: restResources,
        config: validatedConfig,
        RestClient: restClientClass({ config: validatedConfig })
      });
    }
    shopify2.logger.info(`version ${SHOPIFY_API_LIBRARY_VERSION}, environment ${abstractRuntimeString()}`).catch((err) => console.log(err));
    logDisabledFutureFlags(validatedConfig, shopify2.logger);
    return shopify2;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/types.mjs
  var AppDistribution;
  (function(AppDistribution2) {
    AppDistribution2["AppStore"] = "app_store";
    AppDistribution2["SingleMerchant"] = "single_merchant";
    AppDistribution2["ShopifyAdmin"] = "shopify_admin";
  })(AppDistribution || (AppDistribution = {}));
  var LoginErrorType;
  (function(LoginErrorType2) {
    LoginErrorType2["MissingShop"] = "MISSING_SHOP";
    LoginErrorType2["InvalidShop"] = "INVALID_SHOP";
  })(LoginErrorType || (LoginErrorType = {}));

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/boundary/headers.mjs
  function headersBoundary(headers2) {
    const { parentHeaders, loaderHeaders, actionHeaders, errorHeaders } = headers2;
    if (errorHeaders && Array.from(errorHeaders.entries()).length > 0) {
      return errorHeaders;
    }
    return new Headers([
      ...parentHeaders ? Array.from(parentHeaders.entries()) : [],
      ...loaderHeaders ? Array.from(loaderHeaders.entries()) : [],
      ...actionHeaders ? Array.from(actionHeaders.entries()) : []
    ]);
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/boundary/error.mjs
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  function errorBoundary(error) {
    if (error.constructor.name === "ErrorResponse" || error.constructor.name === "ErrorResponseImpl") {
      return (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: error.data || "Handling response" } });
    }
    throw error;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/boundary/index.mjs
  var boundary = {
    /**
     * A function that handles errors or thrown responses.
     *
     * @example
     * <caption>Catching errors in a route</caption>
     * ```ts
     * // /app/routes/admin/widgets.ts
     * import { boundary } from "@shopify/shopify-app-react-router/server";
     *
     * export function ErrorBoundary() {
     *   return boundary.error(useRouteError());
     * }
     * ```
     */
    error: errorBoundary,
    /**
     * A function that sets the appropriate document response headers.
     *
     * @example
     * <caption>Catching errors in a route</caption>
     * ```ts
     * // /app/routes/admin/widgets.ts
     * import { boundary } from "@shopify/shopify-app-react-router/server";
     *
     * export const headers = (headersArgs) => {
     *   return boundary.headers(headersArgs);
     * };
     * ```
     */
    headers: headersBoundary
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/version.mjs
  var SHOPIFY_REACT_ROUTER_LIBRARY_VERSION = "1.2.1";

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/webhooks/register.mjs
  function registerWebhooksFactory({ api, logger: logger2 }) {
    return async function registerWebhooks2({ session }) {
      return api.webhooks.register({ session }).then((response) => {
        Object.entries(response).forEach(([topic, topicResults]) => {
          topicResults.forEach(({ success, ...rest }) => {
            if (success) {
              logger2.debug("Registered webhook", {
                topic,
                shop: session.shop,
                operation: rest.operation
              });
            } else {
              logger2.error("Failed to register webhook", {
                topic,
                shop: session.shop,
                result: JSON.stringify(rest.result)
              });
            }
          });
        });
        return response;
      }).catch((error) => {
        const graphQLErrors = error.body?.errors?.graphQLErrors || [];
        const throttled = graphQLErrors.find(({ extensions: { code } }) => code === "THROTTLED");
        if (throttled) {
          logger2.error("Failed to register webhooks", {
            shop: session.shop,
            error: JSON.stringify(error)
          });
        } else {
          throw error;
        }
      });
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/const.mjs
  var APP_BRIDGE_URL = "https://cdn.shopify.com/shopifycloud/app-bridge.js";
  var POLARIS_URL = "https://cdn.shopify.com/shopifycloud/polaris.js";
  var CDN_URL = "https://cdn.shopify.com";
  var REAUTH_URL_HEADER = "X-Shopify-API-Request-Failure-Reauthorize-Url";
  var RETRY_INVALID_SESSION_HEADER = {
    "X-Shopify-Retry-Invalid-Session-Request": "1"
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/ensure-cors-headers.mjs
  function ensureCORSHeadersFactory(params, request2, corsHeaders = []) {
    const { logger: logger2, config: config2 } = params;
    return function ensureCORSHeaders(response) {
      const origin = request2.headers.get("Origin");
      if (origin && origin !== config2.appUrl) {
        logger2.debug("Request comes from a different origin, adding CORS headers");
        const corsHeadersSet = /* @__PURE__ */ new Set([
          "Authorization",
          "Content-Type",
          ...corsHeaders
        ]);
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Headers", [...corsHeadersSet].join(", "));
        response.headers.set("Access-Control-Expose-Headers", REAUTH_URL_HEADER);
      }
      return response;
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-to-bounce-page.mjs
  var redirectToBouncePage = (params, url) => {
    const { config: config2 } = params;
    const searchParams = url.searchParams;
    searchParams.delete("id_token");
    searchParams.set("shopify-reload", `${config2.appUrl}${url.pathname}?${searchParams.toString()}`);
    throw redirect(`${config2.auth.patchSessionTokenPath}?${searchParams.toString()}`);
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/respond-to-invalid-session-token.mjs
  function respondToInvalidSessionToken({ params, request: request2, retryRequest = false }) {
    const { api, logger: logger2, config: config2 } = params;
    const isDocumentRequest = !request2.headers.get("authorization");
    if (isDocumentRequest) {
      return redirectToBouncePage({ config: config2 }, new URL(request2.url));
    }
    throw new Response(void 0, {
      status: 401,
      statusText: "Unauthorized",
      headers: retryRequest ? RETRY_INVALID_SESSION_HEADER : {}
    });
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/get-shop-from-request.mjs
  function getShopFromRequest(request2) {
    const url = new URL(request2.url);
    return url.searchParams.get("shop");
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/validate-session-token.mjs
  async function validateSessionToken(params, request2, token, { checkAudience = true, retryRequest = true } = {}) {
    const { api, logger: logger2 } = params;
    const shop = getShopFromRequest(request2);
    logger2.debug("Validating session token", { shop });
    try {
      const payload = await api.session.decodeSessionToken(token, {
        checkAudience
      });
      logger2.debug("Session token is valid - validated", {
        shop,
        payload: JSON.stringify(payload)
      });
      return payload;
    } catch (error) {
      logger2.debug(`Failed to validate session token: ${error.message}`, {
        shop
      });
      throw respondToInvalidSessionToken({ params, request: request2, retryRequest });
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/get-session-token-header.mjs
  var SESSION_TOKEN_PARAM = "id_token";
  function getSessionTokenHeader(request2) {
    return request2.headers.get("authorization")?.replace("Bearer ", "");
  }
  function getSessionTokenFromUrlParam(request2) {
    const url = new URL(request2.url);
    return url.searchParams.get(SESSION_TOKEN_PARAM);
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/reject-bot-request.mjs
  var SHOPIFY_POS_USER_AGENT = /Shopify POS\//;
  var SHOPIFY_MOBILE_USER_AGENT = /Shopify Mobile\//;
  var SHOPIFY_USER_AGENTS = [SHOPIFY_POS_USER_AGENT, SHOPIFY_MOBILE_USER_AGENT];
  function respondToBotRequest({ logger: logger2 }, request2) {
    const userAgent = request2.headers.get("User-Agent") ?? "";
    if (SHOPIFY_USER_AGENTS.some((agent) => agent.test(userAgent))) {
      logger2.debug("Request is from a Shopify agent, allow");
      return;
    }
    if (isbot(userAgent)) {
      logger2.debug("Request is from a bot, skipping auth");
      throw new Response(void 0, { status: 410, statusText: "Gone" });
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/respond-to-options-request.mjs
  function respondToOptionsRequest(params, request2, corsHeaders) {
    if (request2.method === "OPTIONS") {
      const ensureCORSHeaders = ensureCORSHeadersFactory(params, request2, corsHeaders);
      throw ensureCORSHeaders(new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Max-Age": "7200"
        }
      }));
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/invalidate-access-token.mjs
  async function invalidateAccessToken(params, session) {
    const { logger: logger2, config: config2 } = params;
    logger2.debug(`Invalidating access token for session - ${session.id}`, {
      shop: session.shop
    });
    session.accessToken = void 0;
    await config2.sessionStorage.storeSession(session);
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/cancel.mjs
  function cancelBillingFactory(params, request2, session) {
    return async function cancelBilling(options) {
      const { api, logger: logger2 } = params;
      logger2.debug("Cancelling billing", { shop: session.shop, ...options });
      try {
        return await api.billing.cancel({
          session,
          subscriptionId: options.subscriptionId,
          isTest: options.isTest,
          prorate: options.prorate
        });
      } catch (error) {
        if (error instanceof HttpResponseError && error.response.code === 401) {
          logger2.debug("API token was invalid, responding to invalid session", {
            shop: session.shop
          });
          await invalidateAccessToken(params, session);
          throw respondToInvalidSessionToken({
            params,
            request: request2,
            retryRequest: true
          });
        }
        throw error;
      }
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/require.mjs
  function requireBillingFactory(params, request2, session) {
    const { api, logger: logger2 } = params;
    return async function requireBilling(options) {
      const logContext = {
        shop: session.shop,
        plans: options.plans,
        isTest: options.isTest
      };
      logger2.debug("Checking billing for the shop", logContext);
      let data2;
      try {
        data2 = await api.billing.check({
          session,
          plans: options.plans,
          isTest: options.isTest,
          returnObject: true
        });
      } catch (error) {
        if (error instanceof HttpResponseError && error.response.code === 401) {
          logger2.debug("API token was invalid, responding to invalid session", logContext);
          await invalidateAccessToken(params, session);
          throw respondToInvalidSessionToken({
            params,
            request: request2,
            retryRequest: true
          });
        }
        throw error;
      }
      if (!data2.hasActivePayment) {
        logger2.debug("Billing check failed", logContext);
        throw await options.onFailure(new Error("Billing check failed"));
      }
      logger2.debug("Billing check succeeded", logContext);
      return data2;
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-with-app-bridge-headers.mjs
  function redirectWithAppBridgeHeaders(redirectUri) {
    throw new Response(void 0, {
      status: 401,
      statusText: "Unauthorized",
      headers: getAppBridgeHeaders(redirectUri)
    });
  }
  function getAppBridgeHeaders(url) {
    return new Headers({ [REAUTH_URL_HEADER]: url });
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/helpers.mjs
  function redirectOutOfApp(params, request2, url, shop) {
    const { config: config2, logger: logger2 } = params;
    logger2.debug("Redirecting out of app", { shop, url });
    const requestUrl = new URL(request2.url);
    const isEmbeddedRequest2 = requestUrl.searchParams.get("embedded") === "1";
    const isXhrRequest = request2.headers.get("authorization");
    if (isXhrRequest) {
      throw new Response(void 0, {
        status: 401,
        statusText: "Unauthorized",
        headers: getAppBridgeHeaders(url)
      });
    } else if (isEmbeddedRequest2) {
      const params2 = new URLSearchParams({
        shop,
        host: requestUrl.searchParams.get("host"),
        exitIframe: url
      });
      throw redirect(`${config2.auth.exitIframePath}?${params2.toString()}`);
    } else {
      throw redirect(url);
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/request.mjs
  function requestBillingFactory(params, request2, session) {
    return async function requestBilling({ plan, isTest, returnUrl, ...overrides }) {
      const { api, logger: logger2 } = params;
      logger2.info("Requesting billing", {
        shop: session.shop,
        plan,
        isTest,
        returnUrl
      });
      let result;
      try {
        result = await api.billing.request({
          plan,
          session,
          isTest,
          returnUrl,
          returnObject: true,
          ...overrides
        });
      } catch (error) {
        if (error instanceof HttpResponseError && error.response.code === 401) {
          logger2.debug("API token was invalid, responding to invalid session", {
            shop: session.shop
          });
          await invalidateAccessToken(params, session);
          throw respondToInvalidSessionToken({
            params,
            request: request2,
            retryRequest: true
          });
        }
        throw error;
      }
      throw redirectOutOfApp(params, request2, result.confirmationUrl, session.shop);
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/check.mjs
  function checkBillingFactory(params, request2, session) {
    return async function checkBilling(options = {}) {
      const { api, logger: logger2 } = params;
      logger2.debug("Checking billing plans", { shop: session.shop, ...options });
      try {
        return await api.billing.check({
          session,
          plans: options.plans,
          isTest: options.isTest,
          returnObject: true
        });
      } catch (error) {
        if (error instanceof HttpResponseError && error.response.code === 401) {
          logger2.debug("API token was invalid, responding to invalid session", {
            shop: session.shop
          });
          await invalidateAccessToken(params, session);
          throw respondToInvalidSessionToken({
            params,
            request: request2,
            retryRequest: true
          });
        }
        throw error;
      }
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/create-usage-record.mjs
  function createUsageRecordFactory(params, request2, session) {
    return async function createUsageRecord2(options) {
      const { api, logger: logger2 } = params;
      logger2.debug("Create usage record", { shop: session.shop, ...options });
      try {
        return await api.billing.createUsageRecord({
          ...options,
          session
        });
      } catch (error) {
        if (error instanceof HttpResponseError && error.response.code === 401) {
          logger2.debug("API token was invalid, responding to invalid session", {
            shop: session.shop
          });
          await invalidateAccessToken(params, session);
          throw respondToInvalidSessionToken({
            params,
            request: request2,
            retryRequest: true
          });
        }
        throw error;
      }
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/billing/update-usage-subscription-capped-amount.mjs
  function updateUsageCappedAmountFactory(params, request2, session) {
    return async function updateUsageCappedAmount2(options) {
      const { api, logger: logger2 } = params;
      logger2.debug("Updating usage subscription capped amount", {
        shop: session.shop,
        ...options
      });
      let result;
      try {
        result = await api.billing.updateUsageCappedAmount({
          session,
          subscriptionLineItemId: options.subscriptionLineItemId,
          cappedAmount: options.cappedAmount
        });
      } catch (error) {
        if (error instanceof HttpResponseError && error.response.code === 401) {
          logger2.debug("API token was invalid, responding to invalid session", {
            shop: session.shop
          });
          await invalidateAccessToken(params, session);
          throw respondToInvalidSessionToken({
            params,
            request: request2,
            retryRequest: true
          });
        }
        throw error;
      }
      throw redirectOutOfApp(params, request2, result.confirmationUrl, session.shop);
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/clients/admin/graphql.mjs
  function graphqlClientFactory({ params, handleClientError, session }) {
    return async function query(operation, options) {
      const client = new params.api.clients.Graphql({
        session,
        apiVersion: options?.apiVersion
      });
      try {
        const apiResponse = await client.request(operation, {
          variables: options?.variables,
          retries: options?.tries ? options.tries - 1 : 0,
          headers: options?.headers,
          signal: options?.signal
        });
        return new Response(JSON.stringify(apiResponse));
      } catch (error) {
        if (handleClientError) {
          throw await handleClientError({ error, params, session });
        }
        throw error;
      }
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/clients/admin/factory.mjs
  function adminClientFactory({ params, handleClientError, session }) {
    return {
      graphql: graphqlClientFactory({ params, session, handleClientError })
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/create-admin-api-context.mjs
  function createAdminApiContext(session, params, handleClientError) {
    return adminClientFactory({
      session,
      params,
      handleClientError
    });
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-to-shopify-or-app-root.mjs
  async function redirectToShopifyOrAppRoot(request2, params, responseHeaders) {
    const { api, config: config2 } = params;
    const url = new URL(request2.url);
    const host = api.utils.sanitizeHost(url.searchParams.get("host"));
    const shop = api.utils.sanitizeShop(url.searchParams.get("shop"));
    let redirectUrl;
    if (config2.distribution === AppDistribution.ShopifyAdmin) {
      redirectUrl = `/?shop=${shop}&host=${encodeURIComponent(host)}`;
    } else {
      redirectUrl = await api.auth.getEmbeddedAppUrl({ rawRequest: request2 });
    }
    throw redirect(redirectUrl, { headers: responseHeaders });
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/ensure-app-is-embedded-if-required.mjs
  var ensureAppIsEmbeddedIfRequired = async (params, request2) => {
    const { api, logger: logger2, config: config2 } = params;
    const url = new URL(request2.url);
    const shop = url.searchParams.get("shop");
    if (config2.distribution !== AppDistribution.ShopifyAdmin && url.searchParams.get("embedded") !== "1") {
      logger2.debug("App is not embedded, redirecting to Shopify", { shop });
      await redirectToShopifyOrAppRoot(request2, { api, config: config2 });
    }
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/ensure-session-token-search-param-if-required.mjs
  var SESSION_TOKEN_PARAM2 = "id_token";
  var ensureSessionTokenSearchParamIfRequired = async (params, request2) => {
    const { logger: logger2, config: config2 } = params;
    const url = new URL(request2.url);
    const shop = url.searchParams.get("shop");
    const searchParamSessionToken = url.searchParams.get(SESSION_TOKEN_PARAM2);
    const isEmbedded = url.searchParams.get("embedded") === "1";
    if (config2.distribution !== AppDistribution.ShopifyAdmin && isEmbedded && !searchParamSessionToken) {
      logger2.debug("Missing session token in search params, going to bounce page", { shop });
      redirectToBouncePage(params, url);
    }
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/app-bridge-url.mjs
  var appBridgeUrlOverride;
  function setAppBridgeUrlOverride(url) {
    appBridgeUrlOverride = url;
  }
  function appBridgeUrl() {
    return appBridgeUrlOverride || APP_BRIDGE_URL;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/add-response-headers.mjs
  function addDocumentResponseHeadersFactory(params) {
    const { api, config: config2 } = params;
    return function(request2, headers2) {
      const { searchParams } = new URL(request2.url);
      const shop = api.utils.sanitizeShop(searchParams.get("shop"));
      const isEmbeddedApp = config2.distribution !== AppDistribution.ShopifyAdmin;
      addDocumentResponseHeaders(headers2, isEmbeddedApp, shop);
    };
  }
  function addDocumentResponseHeaders(headers2, isEmbeddedApp, shop) {
    if (shop) {
      headers2.set("Link", `<${CDN_URL}>; rel="preconnect", <${APP_BRIDGE_URL}>; rel="preload"; as="script", <${POLARIS_URL}>; rel="preload"; as="script"`);
    }
    if (isEmbeddedApp) {
      if (shop) {
        headers2.set("Content-Security-Policy", `frame-ancestors https://${shop} https://admin.shopify.com https://*.spin.dev https://admin.myshopify.io https://admin.shop.dev;`);
      }
    } else {
      headers2.set("Content-Security-Policy", `frame-ancestors 'none';`);
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/validate-redirect-url.mjs
  var FILE_URI_MATCH = /\/\/\//;
  var INVALID_RELATIVE_URL = /[/\\][/\\]/;
  var WHITESPACE_CHARACTER = /\s/;
  var VALID_PROTOCOLS = ["https:", "http:"];
  function isSafe(domain, redirectUrl, requireSSL = true) {
    if (typeof redirectUrl !== "string") {
      return false;
    }
    if (FILE_URI_MATCH.test(redirectUrl) || WHITESPACE_CHARACTER.test(redirectUrl)) {
      return false;
    }
    let url;
    try {
      url = new URL(redirectUrl, domain);
    } catch (error) {
      return false;
    }
    if (INVALID_RELATIVE_URL.test(url.pathname)) {
      return false;
    }
    if (!VALID_PROTOCOLS.includes(url.protocol)) {
      return false;
    }
    if (requireSSL && url.protocol !== "https:") {
      return false;
    }
    return true;
  }
  function sanitizeRedirectUrl(domain, redirectUrl, options = {}) {
    if (isSafe(domain, redirectUrl, options.requireSSL)) {
      return new URL(redirectUrl, domain);
    } else if (options.throwOnInvalid === false) {
      return void 0;
    } else {
      throw new ShopifyError("Invalid URL. Refusing to redirect");
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/render-app-bridge.mjs
  function renderAppBridge({ api, config: config2 }, request2, redirectTo) {
    let redirectToScript = "";
    if (redirectTo) {
      const destination = sanitizeRedirectUrl(config2.appUrl, redirectTo.url);
      const target = redirectTo.target ?? "_top";
      redirectToScript = `<script>window.open(${JSON.stringify(destination.toString())}, ${JSON.stringify(target)})<\/script>`;
    }
    const responseHeaders = new Headers({
      "content-type": "text/html;charset=utf-8"
    });
    const isEmbeddedApp = config2.distribution !== AppDistribution.ShopifyAdmin;
    const shop = api.utils.sanitizeShop(new URL(request2.url).searchParams.get("shop"));
    addDocumentResponseHeaders(responseHeaders, isEmbeddedApp, shop);
    throw new Response(`
      <script data-api-key="${config2.apiKey}" src="${appBridgeUrl()}"><\/script>
      ${redirectToScript}
    `, { headers: responseHeaders });
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect.mjs
  function redirectFactory(params, request2, shop) {
    const { config: config2, logger: logger2 } = params;
    return function redirect$1(url, init) {
      const { searchParams } = new URL(request2.url);
      const { url: parsedUrl, target } = parseURL({
        params,
        url,
        base: config2.appUrl,
        shop,
        init
      });
      logger2.debug("Redirecting", { shop, url: parsedUrl.toString() });
      const isSameOrigin = parsedUrl.origin === new URL(config2.appUrl).origin;
      if (isSameOrigin) {
        searchParams.forEach((value, key) => {
          if (!parsedUrl.searchParams.has(key)) {
            parsedUrl.searchParams.set(key, value);
          }
        });
      }
      if (target === "_self") {
        if (isBounceRequest(request2)) {
          throw renderAppBridge(params, request2, {
            url: parsedUrl.toString(),
            target
          });
        } else {
          return redirect(parsedUrl.toString(), init);
        }
      } else if (isDataRequest(request2)) {
        throw redirectWithAppBridgeHeaders(parsedUrl.toString());
      } else if (isEmbeddedRequest(request2)) {
        throw renderAppBridge(params, request2, {
          url: parsedUrl.toString(),
          target
        });
      }
      return redirect(url, init);
    };
  }
  function isBounceRequest(request2) {
    return Boolean(getSessionTokenHeader(request2)) && request2.headers.has("X-Shopify-Bounce");
  }
  function isDataRequest(request2) {
    const isGet = request2.method === "GET";
    const sessionTokenHeader = Boolean(getSessionTokenHeader(request2));
    return sessionTokenHeader && !isBounceRequest(request2) && (!isEmbeddedRequest(request2) || !isGet);
  }
  function isEmbeddedRequest(request2) {
    const { searchParams } = new URL(request2.url);
    return searchParams.get("embedded") === "1";
  }
  function parseURL({ params, base, init, shop, url }) {
    let target = typeof init !== "number" && init?.target ? init.target : void 0;
    if (isAdminRemotePath(url)) {
      const { config: config2 } = params;
      const adminPath = getAdminRemotePath(url);
      const cleanShopName = shop.replace(".myshopify.com", "");
      if (!target) {
        target = config2.distribution === AppDistribution.ShopifyAdmin ? "_self" : "_parent";
      }
      return {
        url: new URL(`https://admin.shopify.com/store/${cleanShopName}${adminPath}`),
        target
      };
    } else {
      return {
        url: new URL(url, base),
        target: target ?? "_self"
      };
    }
  }
  var ADMIN_REGEX = /^shopify:\/*admin\//i;
  function isAdminRemotePath(url) {
    return ADMIN_REGEX.test(url);
  }
  function getAdminRemotePath(url) {
    const parsedUrl = removeRestrictedParams(new URL(url)).href;
    return parsedUrl.replace(ADMIN_REGEX, "/");
  }
  var embeddedFrameParamsToRemove = [
    "hmac",
    "locale",
    "protocol",
    "session",
    "id_token",
    "shop",
    "timestamp",
    "host",
    "embedded",
    // sent when clicking rel="home" nav item
    "appLoadId"
  ];
  function removeRestrictedParams(url) {
    const newUrl = new URL(url);
    embeddedFrameParamsToRemove.forEach((param) => newUrl.searchParams.delete(param));
    return newUrl;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/validate-shop-and-host-params.mjs
  function validateShopAndHostParams(params, request2) {
    const { api, config: config2, logger: logger2 } = params;
    if (config2.distribution !== AppDistribution.ShopifyAdmin) {
      const url = new URL(request2.url);
      const shop = api.utils.sanitizeShop(url.searchParams.get("shop"));
      if (!shop) {
        logger2.debug("Missing or invalid shop, rendering App Bridge", {
          shop
        });
        throw renderAppBridgeOrError(request2, params);
      }
      const host = api.utils.sanitizeHost(url.searchParams.get("host"));
      if (!host) {
        logger2.debug("Invalid host, rendering App Bridge", {
          shop,
          host: url.searchParams.get("host")
        });
        throw renderAppBridgeOrError(request2, params);
      }
    }
  }
  function renderAppBridgeOrError(request2, params) {
    const { config: config2, logger: logger2 } = params;
    const { pathname } = new URL(request2.url);
    if (pathname.endsWith(config2.auth.loginPath)) {
      const message2 = `Detected call to shopify.authenticate.admin() from configured login path ('${config2.auth.loginPath}'), please make sure to call shopify.login() from that route instead.`;
      logger2.debug(message2);
      throw new Response(message2, { status: 500 });
    }
    logger2.debug("Missing shop or host params, rendering App Bridge to retrieve session");
    throw renderAppBridge(params, request2);
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/redirect-to-install-page.mjs
  async function redirectToInstallPage(params, shop, optionalScopes = []) {
    const installUrl = buildInstallUrl(params, shop, optionalScopes);
    if (params.config.distribution === AppDistribution.ShopifyAdmin) {
      throw redirect(installUrl);
    } else {
      throw redirectWithAppBridgeHeaders(installUrl);
    }
  }
  function buildInstallUrl(params, shop, optionalScopes = []) {
    const baseInstallUrl = buildBaseInstallUrl(params, shop);
    baseInstallUrl.search = buildParamsInstallUrl(params, optionalScopes).toString();
    return baseInstallUrl.href;
  }
  function buildBaseInstallUrl({ api }, shop) {
    const cleanShop = api.utils.sanitizeShop(shop, true);
    return new URL(`https://${cleanShop}/admin/oauth/install`);
  }
  function buildParamsInstallUrl({ config: config2 }, optionalScopes = []) {
    const optionalScopesParam = optionalScopes && optionalScopes.length > 0 ? { optional_scopes: optionalScopes.join(",") } : void 0;
    const query = {
      client_id: config2.apiKey,
      scope: config2.scopes?.toString() || "",
      ...optionalScopesParam
    };
    return new URLSearchParams(query);
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/client/fetch-scopes-details.mjs
  var FETCH_SCOPES_DETAIL_QUERY = `#graphql
query FetchAccessScopes{
  app {
    requestedAccessScopes {
      handle
    }
    optionalAccessScopes {
      handle
    }
    installation {
      accessScopes {
        handle
      }
    }
  }
}`;
  async function fetchScopeDetail(admin) {
    const fetchScopeDetailResult = await admin.graphql(FETCH_SCOPES_DETAIL_QUERY);
    const resultContent = await fetchScopeDetailResult.json();
    return resultContent.data;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/request.mjs
  function requestScopesFactory(params, session, admin) {
    return async function requestScopes(scopes) {
      const { logger: logger2 } = params;
      logger2.debug("Requesting optional scopes: ", { shop: session.shop, scopes });
      if (scopes.length === 0)
        return;
      if (await alreadyGranted(scopes, admin))
        return;
      throw await redirectToInstallPage(params, session.shop, scopes);
    };
    async function alreadyGranted(scopes, admin2) {
      const scopesDetail = await fetchScopeDetail(admin2);
      const grantedScopes = scopesDetail.app.installation.accessScopes.map((scope) => scope.handle);
      return new AuthScopes(grantedScopes).has(scopes);
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/query.mjs
  function queryScopesFactory(params, session, admin) {
    return async function queryScopes() {
      const { logger: logger2 } = params;
      logger2.debug("Querying scopes details: ", {
        shop: session.shop
      });
      const scopesDetail = await fetchScopeDetail(admin);
      return mapFetchScopeDetail(scopesDetail);
    };
  }
  function mapFetchScopeDetail(scopesDetailResponse) {
    const appInformation = scopesDetailResponse.app;
    const granted = new AuthScopes(appInformation.installation.accessScopes.map((scope) => scope.handle)).toArray(true);
    const required = new AuthScopes(appInformation.requestedAccessScopes.map((scope) => scope.handle)).toArray(true);
    const optional = new AuthScopes(appInformation.optionalAccessScopes.map((scope) => scope.handle)).toArray(true);
    return {
      granted,
      required,
      optional
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/client/revoke-scopes.mjs
  var REVOKE_SCOPE_MUTATION = `#graphql
mutation AppRevokeAccessScopes($scopes: [String!]!) {
  appRevokeAccessScopes(scopes: $scopes){
    revoked {
      handle
    }
    userErrors {
      field
      message
    }
  }
}`;
  async function revokeScopes(admin, scopes) {
    const revokeScopesResult = await admin.graphql(REVOKE_SCOPE_MUTATION, {
      variables: {
        scopes
      }
    });
    const resultContent = await revokeScopesResult.json();
    return resultContent.data.appRevokeAccessScopes;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/revoke.mjs
  function revokeScopesFactory(params, session, admin) {
    return async function revoke(scopes) {
      const { logger: logger2 } = params;
      await validateScopes(scopes);
      logger2.debug("Revoke scopes: ", {
        shop: session.shop,
        scopes
      });
      const revokeScopesResult = await revokeScopes(admin, scopes);
      if (revokeScopesResult.userErrors?.length > 0) {
        logger2.error("Failed to revoke scopes: ", {
          shop: session.shop,
          errors: revokeScopesResult.userErrors
        });
        throw new Response(JSON.stringify(revokeScopesResult.userErrors), {
          status: 422,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      return {
        revoked: revokeScopesResult.revoked.map((scope) => scope.handle)
      };
    };
  }
  async function validateScopes(scopes) {
    if (!scopes || scopes.length === 0) {
      throw new Response("No scopes provided", { status: 400 });
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/scope/factory.mjs
  function scopesApiFactory(params, session, admin) {
    return {
      query: queryScopesFactory(params, session, admin),
      request: requestScopesFactory(params, session, admin),
      revoke: revokeScopesFactory(params, session, admin)
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/authenticate.mjs
  function authStrategyFactory({ strategy, ...params }) {
    const { api, logger: logger2, config: config2 } = params;
    async function respondToBouncePageRequest(request2) {
      const url = new URL(request2.url);
      if (url.pathname.endsWith(config2.auth.patchSessionTokenPath)) {
        logger2.debug("Rendering bounce page", {
          shop: getShopFromRequest(request2)
        });
        throw renderAppBridge({ config: config2, api }, request2);
      }
    }
    async function respondToExitIframeRequest(request2) {
      const url = new URL(request2.url);
      if (url.pathname.endsWith(config2.auth.exitIframePath)) {
        const destination = url.searchParams.get("exitIframe");
        logger2.debug("Rendering exit iframe page", {
          shop: getShopFromRequest(request2),
          destination
        });
        throw renderAppBridge({ config: config2, api }, request2, { url: destination });
      }
    }
    function createContext5(request2, session, authStrategy, sessionToken) {
      let context = {
        admin: createAdminApiContext(session, params, authStrategy.handleClientError(request2)),
        billing: {
          require: requireBillingFactory(params, request2, session),
          check: checkBillingFactory(params, request2, session),
          request: requestBillingFactory(params, request2, session),
          cancel: cancelBillingFactory(params, request2, session),
          createUsageRecord: createUsageRecordFactory(params, request2, session),
          updateUsageCappedAmount: updateUsageCappedAmountFactory(params, request2, session)
        },
        session,
        cors: ensureCORSHeadersFactory(params, request2)
      };
      context = addEmbeddedFeatures(context, request2, session, sessionToken);
      context = addScopesFeatures(context);
      return context;
    }
    function addEmbeddedFeatures(context, request2, session, sessionToken) {
      if (config2.distribution === AppDistribution.ShopifyAdmin) {
        return context;
      }
      return {
        ...context,
        sessionToken,
        redirect: redirectFactory(params, request2, session.shop)
      };
    }
    function addScopesFeatures(context) {
      return {
        ...context,
        scopes: scopesApiFactory(params, context.session, context.admin)
      };
    }
    return async function authenticateAdmin(request2) {
      try {
        respondToBotRequest(params, request2);
        respondToOptionsRequest(params, request2);
        await respondToBouncePageRequest(request2);
        await respondToExitIframeRequest(request2);
        if (!getSessionTokenHeader(request2)) {
          validateShopAndHostParams(params, request2);
          await ensureAppIsEmbeddedIfRequired(params, request2);
          await ensureSessionTokenSearchParamIfRequired(params, request2);
        }
        logger2.info("Authenticating admin request", {
          shop: getShopFromRequest(request2)
        });
        const { payload, shop, sessionId, sessionToken } = await getSessionTokenContext(params, request2);
        logger2.debug("Loading session from storage", { shop, sessionId });
        const existingSession = sessionId ? await config2.sessionStorage.loadSession(sessionId) : void 0;
        const session = await strategy.authenticate(request2, {
          session: existingSession,
          sessionToken,
          shop
        });
        return createContext5(request2, session, strategy, payload);
      } catch (errorOrResponse) {
        if (errorOrResponse instanceof Response) {
          logger2.debug("Authenticate returned a response", {
            shop: getShopFromRequest(request2)
          });
          ensureCORSHeadersFactory(params, request2)(errorOrResponse);
        }
        throw errorOrResponse;
      }
    };
  }
  async function getSessionTokenContext(params, request2) {
    const { api, config: config2, logger: logger2 } = params;
    const headerSessionToken = getSessionTokenHeader(request2);
    const searchParamSessionToken = getSessionTokenFromUrlParam(request2);
    const sessionToken = headerSessionToken || searchParamSessionToken;
    logger2.debug("Attempting to authenticate session token", {
      shop: getShopFromRequest(request2),
      sessionToken: JSON.stringify({
        header: headerSessionToken,
        search: searchParamSessionToken
      })
    });
    if (config2.distribution !== AppDistribution.ShopifyAdmin) {
      const payload = await validateSessionToken(params, request2, sessionToken);
      const dest = new URL(payload.dest);
      const shop2 = dest.hostname;
      logger2.debug("Session token is valid - authenticated", { shop: shop2, payload });
      const sessionId2 = config2.useOnlineTokens ? api.session.getJwtSessionId(shop2, payload.sub) : api.session.getOfflineId(shop2);
      return { shop: shop2, payload, sessionId: sessionId2, sessionToken };
    }
    const url = new URL(request2.url);
    const shop = url.searchParams.get("shop");
    const sessionId = await api.session.getCurrentId({
      isOnline: config2.useOnlineTokens,
      rawRequest: request2
    });
    return { shop, sessionId, payload: void 0, sessionToken };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/handle-client-error.mjs
  function handleClientErrorFactory({ request: request2, onError }) {
    return async function handleClientError({ error, params, session }) {
      if (error instanceof HttpResponseError !== true) {
        params.logger.debug(`Got a response error from the API: ${error.message}`, { shop: session.shop });
        throw error;
      }
      params.logger.debug(`Got an HTTP response error from the API: ${error.message}`, {
        shop: session.shop,
        code: error.response.code,
        statusText: error.response.statusText,
        body: JSON.stringify(error.response.body)
      });
      if (onError) {
        await onError({ request: request2, session, error });
      }
      throw new Response(JSON.stringify(error.response.body), {
        status: error.response.code,
        headers: {
          "Content-Type": error.response.headers["Content-Type"]
        }
      });
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/helpers/create-or-load-offline-session.mjs
  async function createOrLoadOfflineSession({ api, config: config2, logger: logger2 }, shop) {
    if (config2.distribution === AppDistribution.ShopifyAdmin) {
      logger2.debug("Creating custom app session from configured access token", {
        shop
      });
      return api.session.customAppSession(shop);
    } else {
      logger2.debug("Loading offline session from session storage", { shop });
      const offlineSessionId = api.session.getOfflineId(shop);
      const session = await config2.sessionStorage.loadSession(offlineSessionId);
      return session;
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/helpers/refresh-token.mjs
  async function refreshToken2(params, shop, refreshToken3) {
    const { api } = params;
    try {
      const { session } = await api.auth.refreshToken({
        shop,
        refreshToken: refreshToken3
      });
      return session;
    } catch (error) {
      if (error instanceof InvalidJwtError || error instanceof HttpResponseError && error.response.code === 400 && error.response.body?.error === "invalid_subject_token") {
        throw error;
      }
      throw new Response(void 0, {
        status: 500,
        statusText: "Internal Server Error"
      });
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/helpers/ensure-offline-token-is-not-expired.mjs
  var WITHIN_MILLISECONDS_OF_EXPIRY = 5 * 60 * 1e3;
  async function ensureOfflineTokenIsNotExpired(session, params, shop) {
    const { config: config2 } = params;
    if (config2.future?.expiringOfflineAccessTokens && session.isExpired(WITHIN_MILLISECONDS_OF_EXPIRY) && config2.distribution !== AppDistribution.ShopifyAdmin && session.refreshToken) {
      const offlineSession = await refreshToken2(params, shop, session.refreshToken);
      await config2.sessionStorage.storeSession(offlineSession);
      return offlineSession;
    }
    return session;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/helpers/ensure-valid-offline-session.mjs
  async function ensureValidOfflineSession(params, shop) {
    const session = await createOrLoadOfflineSession(params, shop);
    if (!session)
      return void 0;
    return ensureOfflineTokenIsNotExpired(session, params, shop);
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/webhooks/authenticate.mjs
  function authenticateWebhookFactory(params) {
    const { api, logger: logger2 } = params;
    return async function authenticate2(request2) {
      if (request2.method !== "POST") {
        logger2.debug("Received a non-POST request for a webhook. Only POST requests are allowed.", { url: request2.url, method: request2.method });
        throw new Response(void 0, {
          status: 405,
          statusText: "Method not allowed"
        });
      }
      const rawBody = await request2.text();
      const check2 = await api.webhooks.validate({
        rawBody,
        rawRequest: request2
      });
      if (!check2.valid) {
        if (check2.reason === WebhookValidationErrorReason.InvalidHmac) {
          logger2.debug("Webhook HMAC validation failed", check2);
          throw new Response(void 0, {
            status: 401,
            statusText: "Unauthorized"
          });
        } else {
          logger2.debug("Webhook validation failed", check2);
          throw new Response(void 0, { status: 400, statusText: "Bad Request" });
        }
      }
      const session = await ensureValidOfflineSession(params, check2.domain);
      let webhookContext;
      if (check2.webhookType === WebhookType.Webhooks) {
        webhookContext = {
          apiVersion: check2.apiVersion,
          shop: check2.domain,
          topic: check2.topic,
          webhookId: check2.webhookId,
          payload: JSON.parse(rawBody),
          subTopic: check2.subTopic || void 0,
          session: void 0,
          admin: void 0,
          webhookType: check2.webhookType,
          name: check2.name,
          triggeredAt: check2.triggeredAt,
          eventId: check2.eventId
        };
      } else {
        webhookContext = {
          apiVersion: check2.apiVersion,
          shop: check2.domain,
          topic: check2.topic,
          webhookId: check2.webhookId,
          payload: JSON.parse(rawBody),
          session: void 0,
          admin: void 0,
          webhookType: check2.webhookType,
          handle: check2.handle,
          action: check2.action,
          resourceId: check2.resourceId,
          triggeredAt: check2.triggeredAt,
          eventId: check2.eventId
        };
      }
      if (!session) {
        return webhookContext;
      }
      const admin = adminClientFactory({
        params,
        session,
        handleClientError: handleClientErrorFactory({ request: request2 })
      });
      return {
        ...webhookContext,
        session,
        admin
      };
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/override-logger.mjs
  function overrideLogger(logger2) {
    const baseContext = { package: "shopify-app" };
    const warningFunction = (message2, context = {}) => logger2.warning(message2, { ...baseContext, ...context });
    function deprecated2(warningFunction2) {
      return function(version, message2) {
        if (compare(SHOPIFY_REACT_ROUTER_LIBRARY_VERSION, version, ">=")) {
          throw new FeatureDeprecatedError(`Feature was deprecated in version ${version}`);
        }
        return warningFunction2(`[Deprecated | ${version}] ${message2}`);
      };
    }
    return {
      ...logger2,
      log: (severity, message2, context = {}) => logger2.log(severity, message2, { ...baseContext, ...context }),
      debug: (message2, context = {}) => logger2.debug(message2, { ...baseContext, ...context }),
      info: (message2, context = {}) => logger2.info(message2, { ...baseContext, ...context }),
      warning: warningFunction,
      error: (message2, context = {}) => logger2.error(message2, { ...baseContext, ...context }),
      deprecated: deprecated2(warningFunction)
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/login/login.mjs
  function loginFactory(params) {
    const { api, config: config2, logger: logger2 } = params;
    return async function login2(request2) {
      const url = new URL(request2.url);
      const shopParam = url.searchParams.get("shop");
      if (request2.method === "GET" && !shopParam) {
        return {};
      }
      const shop = shopParam || (await request2.formData()).get("shop");
      if (!shop) {
        logger2.debug("Missing shop parameter", { shop });
        return { shop: LoginErrorType.MissingShop };
      }
      const shopWithoutProtocol = shop.replace(/^https?:\/\//, "").replace(/\/$/, "");
      const shopWithDomain = shop?.indexOf(".") === -1 ? `${shopWithoutProtocol}.myshopify.com` : shopWithoutProtocol;
      const sanitizedShop = api.utils.sanitizeShop(shopWithDomain);
      if (!sanitizedShop) {
        logger2.debug("Invalid shop parameter", { shop });
        return { shop: LoginErrorType.InvalidShop };
      }
      const authPath = `${config2.appUrl}${config2.auth.path}?shop=${sanitizedShop}`;
      const adminPath = api.utils.legacyUrlToShopAdminUrl(sanitizedShop);
      const installPath = `https://${adminPath}/oauth/install?client_id=${config2.apiKey}`;
      const shouldInstall = config2.distribution !== AppDistribution.ShopifyAdmin;
      const redirectUrl = shouldInstall ? installPath : authPath;
      logger2.info(`Redirecting login request to ${redirectUrl}`, {
        shop: sanitizedShop
      });
      throw redirect(redirectUrl);
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/errors.mjs
  var SessionNotFoundError = class extends ShopifyError {
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/unauthenticated/admin/factory.mjs
  function unauthenticatedAdminContextFactory(params) {
    return async (shop) => {
      const session = await ensureValidOfflineSession(params, shop);
      if (!session) {
        throw new SessionNotFoundError(`Could not find a session for shop ${shop} when creating unauthenticated admin context`);
      }
      return {
        session,
        admin: adminClientFactory({ params, session })
      };
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/extension/authenticate.mjs
  function authenticateExtensionFactory(params, requestType) {
    return async function authenticateExtension(request2, options = {}) {
      const { logger: logger2 } = params;
      const corsHeaders = options.corsHeaders ?? [];
      respondToBotRequest(params, request2);
      respondToOptionsRequest(params, request2, corsHeaders);
      const sessionTokenHeader = getSessionTokenHeader(request2);
      logger2.info(`Authenticating ${requestType} request`, {
        shop: getShopFromRequest(request2)
      });
      if (!sessionTokenHeader) {
        logger2.debug("Request did not contain a session token", {
          shop: getShopFromRequest(request2)
        });
        throw new Response(void 0, {
          status: 401,
          statusText: "Unauthorized"
        });
      }
      return {
        sessionToken: await validateSessionToken(params, request2, sessionTokenHeader, { checkAudience: false, retryRequest: false }),
        cors: ensureCORSHeadersFactory(params, request2, corsHeaders)
      };
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/checkout/authenticate.mjs
  function authenticateCheckoutFactory(params) {
    return authenticateExtensionFactory(params, "checkout");
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/clients/storefront/factory.mjs
  function storefrontClientFactory({ params, session }) {
    const { api } = params;
    return {
      graphql: async (query, options = {}) => {
        const client = new api.clients.Storefront({
          session,
          apiVersion: options.apiVersion
        });
        const apiResponse = await client.request(query, {
          variables: options?.variables,
          retries: options?.tries ? options.tries - 1 : 0,
          headers: options?.headers
        });
        return new Response(JSON.stringify(apiResponse));
      }
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/appProxy/authenticate.mjs
  function authenticateAppProxyFactory(params) {
    const { logger: logger2 } = params;
    return async function authenticate2(request2) {
      const url = new URL(request2.url);
      const shop = url.searchParams.get("shop");
      logger2.info("Authenticating app proxy request", { shop });
      if (!await validateAppProxyHmac(params, url)) {
        logger2.info("App proxy request has invalid signature", { shop });
        throw new Response(void 0, {
          status: 400,
          statusText: "Bad Request"
        });
      }
      const session = await ensureValidOfflineSession(params, shop);
      if (!session) {
        logger2.debug("Could not find offline session, returning empty context", {
          shop,
          ...Object.fromEntries(url.searchParams.entries())
        });
        const context2 = {
          liquid,
          session: void 0,
          admin: void 0,
          storefront: void 0
        };
        return context2;
      }
      const context = {
        liquid,
        session,
        admin: adminClientFactory({ params, session }),
        storefront: storefrontClientFactory({ params, session })
      };
      return context;
    };
  }
  var liquid = (body, initAndOptions) => {
    const processedBody = processLiquidBody(body);
    if (typeof initAndOptions !== "object") {
      return new Response(processedBody, {
        status: initAndOptions || 200,
        headers: {
          "Content-Type": "application/liquid"
        }
      });
    }
    const { layout, ...responseInit } = initAndOptions || {};
    const responseBody = layout === false ? `{% layout none %} ${processedBody}` : processedBody;
    const headers2 = new Headers(responseInit.headers);
    headers2.set("Content-Type", "application/liquid");
    return new Response(responseBody, {
      ...responseInit,
      headers: headers2
    });
  };
  async function validateAppProxyHmac(params, url) {
    const { api, logger: logger2 } = params;
    try {
      let searchParams = new URLSearchParams(url.search);
      if (!searchParams.get("index")) {
        searchParams.delete("index");
      }
      let isValid = await api.utils.validateHmac(Object.fromEntries(searchParams.entries()), { signator: "appProxy" });
      if (!isValid) {
        const cleanPath = url.pathname.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", ".");
        const data2 = `routes%2F${cleanPath}`;
        searchParams = new URLSearchParams(`?_data=${data2}&${searchParams.toString().replace(/^\?/, "")}`);
        isValid = await api.utils.validateHmac(Object.fromEntries(searchParams.entries()), { signator: "appProxy" });
        if (!isValid) {
          const searchParams2 = new URLSearchParams(`?_data=${data2}._index&${url.search.replace(/^\?/, "")}`);
          isValid = await api.utils.validateHmac(Object.fromEntries(searchParams2.entries()), { signator: "appProxy" });
        }
      }
      return isValid;
    } catch (error) {
      const shop = url.searchParams.get("shop");
      logger2.info(error.message, { shop });
      throw new Response(void 0, { status: 400, statusText: "Bad Request" });
    }
  }
  function processLiquidBody(body) {
    return body.replaceAll(/<(form[^>]+)action="(\/[^"?]+)(\?[^"]+)?">/g, '<$1action="$2/$3">').replaceAll(/<(a[^>]+)href="(\/[^"?]+)(\?[^"]+)?">/g, '<$1href="$2/$3">');
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/customer-account/authenticate.mjs
  function authenticateCustomerAccountFactory(params) {
    return authenticateExtensionFactory(params, "customer account");
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/public/factory.mjs
  function authenticatePublicFactory(params) {
    const authenticateCheckout = authenticateCheckoutFactory(params);
    const authenticateAppProxy = authenticateAppProxyFactory(params);
    const authenticateCustomerAccount = authenticateCustomerAccountFactory(params);
    const context = {
      checkout: authenticateCheckout,
      appProxy: authenticateAppProxy,
      customerAccount: authenticateCustomerAccount
    };
    return context;
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/unauthenticated/storefront/factory.mjs
  function unauthenticatedStorefrontContextFactory(params) {
    return async (shop) => {
      const session = await ensureValidOfflineSession(params, shop);
      if (!session) {
        throw new SessionNotFoundError(`Could not find a session for shop ${shop} when creating unauthenticated storefront context`);
      }
      return {
        session,
        storefront: storefrontClientFactory({ params, session })
      };
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/helpers/trigger-after-auth-hook.mjs
  async function triggerAfterAuthHook(params, session, request2, authStrategy) {
    const { config: config2, logger: logger2 } = params;
    if (config2.hooks.afterAuth) {
      logger2.info("Running afterAuth hook", { shop: session.shop });
      const admin = createAdminApiContext(session, params, authStrategy.handleClientError(request2));
      await config2.hooks.afterAuth({
        session,
        admin
      });
    }
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/strategies/token-exchange.mjs
  var createTokenExchangeStrategy = (params) => {
    const { api, config: config2, logger: logger2 } = params;
    async function exchangeToken({ request: request2, shop, sessionToken, requestedTokenType }) {
      try {
        console.log("config.future.expiringOfflineAccessTokens", config2.future.expiringOfflineAccessTokens);
        return await api.auth.tokenExchange({
          sessionToken,
          shop,
          requestedTokenType,
          expiring: config2.future.expiringOfflineAccessTokens
        });
      } catch (error) {
        if (error instanceof InvalidJwtError || error instanceof HttpResponseError && error.response.code === 400 && error.response.body?.error === "invalid_subject_token") {
          throw respondToInvalidSessionToken({
            params: { api, config: config2, logger: logger2 },
            request: request2,
            retryRequest: true
          });
        }
        throw new Response(void 0, {
          status: 500,
          statusText: "Internal Server Error"
        });
      }
    }
    async function handleAfterAuthHook(session, request2, sessionToken) {
      await config2.idempotentPromiseHandler.handlePromise({
        promiseFunction: () => {
          return triggerAfterAuthHook(params, session, request2, {
            authenticate: authenticate2,
            handleClientError
          });
        },
        identifier: sessionToken
      });
    }
    async function authenticate2(request2, sessionContext) {
      const { shop, session, sessionToken } = sessionContext;
      if (!sessionToken)
        throw new InvalidJwtError();
      if (!session || !session.isActive(void 0, WITHIN_MILLISECONDS_OF_EXPIRY)) {
        logger2.info("No valid session found", { shop });
        logger2.info("Requesting offline access token", { shop });
        const { session: offlineSession } = await exchangeToken({
          request: request2,
          sessionToken,
          shop,
          requestedTokenType: RequestedTokenType.OfflineAccessToken
        });
        await config2.sessionStorage.storeSession(offlineSession);
        let newSession = offlineSession;
        if (config2.useOnlineTokens) {
          logger2.info("Requesting online access token", { shop });
          const { session: onlineSession } = await exchangeToken({
            request: request2,
            sessionToken,
            shop,
            requestedTokenType: RequestedTokenType.OnlineAccessToken
          });
          await config2.sessionStorage.storeSession(onlineSession);
          newSession = onlineSession;
        }
        logger2.debug("Request is valid, loaded session from session token", {
          shop: newSession.shop,
          isOnline: newSession.isOnline
        });
        try {
          await handleAfterAuthHook(newSession, request2, sessionToken);
        } catch (errorOrResponse) {
          if (errorOrResponse instanceof Response) {
            throw errorOrResponse;
          }
          throw new Response(void 0, {
            status: 500,
            statusText: "Internal Server Error"
          });
        }
        return newSession;
      }
      return session;
    }
    function handleClientError(request2) {
      return handleClientErrorFactory({
        request: request2,
        onError: async ({ session, error }) => {
          if (error.response.code === 401) {
            logger2.debug("Responding to invalid access token", {
              shop: getShopFromRequest(request2)
            });
            await invalidateAccessToken({ config: config2, logger: logger2 }, session);
            respondToInvalidSessionToken({
              params: { config: config2, api, logger: logger2 },
              request: request2
            });
          }
        }
      });
    }
    return {
      authenticate: authenticate2,
      handleClientError
    };
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/admin/strategies/merchant-custom-app.mjs
  var createMerchantCustomAuthStrategy = (params) => {
    const { api, logger: logger2 } = params;
    async function authenticate2(_request, sessionContext) {
      const { shop } = sessionContext;
      logger2.debug("Building session from configured access token for merchant custom app", { shop });
      const session = api.session.customAppSession(shop);
      return session;
    }
    function handleClientError(request2) {
      return handleClientErrorFactory({
        request: request2,
        onError: async ({ error }) => {
          if (error.response.code === 401) {
            logger2.info("Request failed with 401. Review your API credentials or generate new tokens. https://shopify.dev/docs/apps/build/authentication-authorization/access-token-types/generate-app-access-tokens-admin#rotating-api-credentials-for-admin-created-apps ");
            throw new ShopifyError("Unauthorized: Access token has been revoked.");
          }
        }
      });
    }
    return {
      authenticate: authenticate2,
      handleClientError
    };
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/helpers/idempotent-promise-handler.mjs
  var IDENTIFIER_TTL_MS = 6e4;
  var IdempotentPromiseHandler = class {
    identifiers;
    constructor() {
      this.identifiers = /* @__PURE__ */ new Map();
    }
    async handlePromise({ promiseFunction, identifier }) {
      try {
        if (this.isPromiseRunnable(identifier)) {
          await promiseFunction();
        }
      } finally {
        this.clearStaleIdentifiers();
      }
      return Promise.resolve();
    }
    isPromiseRunnable(identifier) {
      if (!this.identifiers.has(identifier)) {
        this.identifiers.set(identifier, Date.now());
        return true;
      }
      return false;
    }
    async clearStaleIdentifiers() {
      this.identifiers.forEach((date, identifier, map) => {
        if (Date.now() - date > IDENTIFIER_TTL_MS) {
          map.delete(identifier);
        }
      });
    }
  };

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/flow/authenticate.mjs
  function authenticateFlowFactory(params) {
    const { api, logger: logger2 } = params;
    return async function authenticate2(request2) {
      logger2.info("Authenticating flow request");
      if (request2.method !== "POST") {
        logger2.debug("Received a non-POST request for flow. Only POST requests are allowed.", { url: request2.url, method: request2.method });
        throw new Response(void 0, {
          status: 405,
          statusText: "Method not allowed"
        });
      }
      const rawBody = await request2.text();
      const result = await api.flow.validate({
        rawBody,
        rawRequest: request2
      });
      if (!result.valid) {
        logger2.error("Received an invalid flow request", { reason: result.reason });
        throw new Response(void 0, {
          status: 400,
          statusText: "Bad Request"
        });
      }
      const payload = JSON.parse(rawBody);
      logger2.debug("Flow request is valid, looking for an offline session", {
        shop: payload.shopify_domain
      });
      const session = await ensureValidOfflineSession(params, payload.shopify_domain);
      if (!session) {
        logger2.info("Flow request could not find session", {
          shop: payload.shopify_domain
        });
        throw new Response(void 0, {
          status: 400,
          statusText: "Bad Request"
        });
      }
      logger2.debug("Found a session for the flow request", { shop: session.shop });
      return {
        session,
        payload,
        admin: adminClientFactory({ params, session })
      };
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/fulfillment-service/authenticate.mjs
  function authenticateFulfillmentServiceFactory(params) {
    const { api, logger: logger2 } = params;
    return async function authenticate2(request2) {
      logger2.info("Authenticating fulfillment service request");
      if (request2.method !== "POST") {
        logger2.debug("Received a non-POST request for fulfillment service. Only POST requests are allowed.", { url: request2.url, method: request2.method });
        throw new Response(void 0, {
          status: 405,
          statusText: "Method not allowed"
        });
      }
      const rawBody = await request2.text();
      const result = await api.fulfillmentService.validate({
        rawBody,
        rawRequest: request2
      });
      if (!result.valid) {
        logger2.error("Received an invalid fulfillment service request", {
          reason: result.reason
        });
        throw new Response(void 0, {
          status: 400,
          statusText: "Bad Request"
        });
      }
      const payload = JSON.parse(rawBody);
      const shop = request2.headers.get(ShopifyHeader.Domain) || "";
      logger2.debug("Fulfillment service request is valid, looking for an offline session", {
        shop
      });
      const session = await ensureValidOfflineSession(params, shop);
      if (!session) {
        logger2.info("Fulfillment service request could not find session", {
          shop
        });
        throw new Response(void 0, {
          status: 400,
          statusText: "Bad Request"
        });
      }
      logger2.debug("Found a session for the fulfillment service request", {
        shop
      });
      return {
        session,
        payload,
        admin: adminClientFactory({ params, session })
      };
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/authenticate/pos/authenticate.mjs
  function authenticatePOSFactory(params) {
    return authenticateExtensionFactory(params, "pos");
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/shopify-app.mjs
  function shopifyApp(appConfig) {
    const api = deriveApi(appConfig);
    const config2 = deriveConfig(appConfig, api.config);
    const logger2 = overrideLogger(api.logger);
    if (appConfig.webhooks) {
      api.webhooks.addHandlers(appConfig.webhooks);
    }
    const params = { api, config: config2, logger: logger2 };
    let strategy;
    if (config2.distribution === AppDistribution.ShopifyAdmin) {
      strategy = createMerchantCustomAuthStrategy(params);
    } else {
      strategy = createTokenExchangeStrategy(params);
    }
    const authStrategy = authStrategyFactory({
      ...params,
      strategy
    });
    const shopify2 = {
      sessionStorage: config2.sessionStorage,
      addDocumentResponseHeaders: addDocumentResponseHeadersFactory(params),
      registerWebhooks: registerWebhooksFactory(params),
      authenticate: {
        admin: authStrategy,
        flow: authenticateFlowFactory(params),
        fulfillmentService: authenticateFulfillmentServiceFactory(params),
        pos: authenticatePOSFactory(params),
        public: authenticatePublicFactory(params),
        webhook: authenticateWebhookFactory(params)
      },
      unauthenticated: {
        admin: unauthenticatedAdminContextFactory(params),
        storefront: unauthenticatedStorefrontContextFactory(params)
      }
    };
    if (isAppStoreApp(shopify2, appConfig) || isSingleMerchantApp(shopify2, appConfig)) {
      shopify2.login = loginFactory(params);
    }
    return shopify2;
  }
  function isAppStoreApp(_shopify, config2) {
    return config2.distribution === AppDistribution.AppStore;
  }
  function isSingleMerchantApp(_shopify, config2) {
    return config2.distribution === AppDistribution.SingleMerchant;
  }
  function deriveApi(appConfig) {
    let appUrl;
    try {
      appUrl = new URL(appConfig.appUrl);
    } catch (error) {
      const message2 = appConfig.appUrl === "" ? `Detected an empty appUrl configuration, please make sure to set the necessary environment variables.
If you're deploying your app, you can find more information at https://shopify.dev/docs/apps/launch/deployment/deploy-web-app/deploy-to-hosting-service#step-4-set-up-environment-variables` : `Invalid appUrl configuration '${appConfig.appUrl}', please provide a valid URL.`;
      throw new ShopifyError(message2);
    }
    if (appUrl.hostname === "localhost" && !appUrl.port && process.env.PORT) {
      appUrl.port = process.env.PORT;
    }
    appConfig.appUrl = appUrl.origin;
    let userAgentPrefix = `Shopify React Router Library v${SHOPIFY_REACT_ROUTER_LIBRARY_VERSION}`;
    if (appConfig.userAgentPrefix) {
      userAgentPrefix = `${appConfig.userAgentPrefix} | ${userAgentPrefix}`;
    }
    return shopifyApi({
      ...appConfig,
      hostName: appUrl.host,
      hostScheme: appUrl.protocol.replace(":", ""),
      userAgentPrefix,
      isEmbeddedApp: true,
      isCustomStoreApp: appConfig.distribution === AppDistribution.ShopifyAdmin,
      billing: appConfig.billing,
      future: {
        unstable_managedPricingSupport: true
      },
      _logDisabledFutureFlags: false
    });
  }
  function deriveConfig(appConfig, apiConfig) {
    if (!appConfig.sessionStorage && appConfig.distribution !== AppDistribution.ShopifyAdmin) {
      throw new ShopifyError("Please provide a valid session storage. Refer to https://github.com/Shopify/shopify-app-js/blob/main/README.md#session-storage-options for options.");
    }
    const authPathPrefix = appConfig.authPathPrefix || "/auth";
    appConfig.distribution = appConfig.distribution ?? AppDistribution.AppStore;
    return {
      ...appConfig,
      ...apiConfig,
      billing: appConfig.billing,
      scopes: apiConfig.scopes,
      idempotentPromiseHandler: new IdempotentPromiseHandler(),
      canUseLoginForm: appConfig.distribution !== AppDistribution.ShopifyAdmin,
      useOnlineTokens: appConfig.useOnlineTokens ?? false,
      hooks: appConfig.hooks ?? {},
      sessionStorage: appConfig.sessionStorage,
      future: appConfig.future ?? {},
      auth: {
        path: authPathPrefix,
        callbackPath: `${authPathPrefix}/callback`,
        patchSessionTokenPath: `${authPathPrefix}/session-token`,
        exitIframePath: `${authPathPrefix}/exit-iframe`,
        loginPath: `${authPathPrefix}/login`
      },
      distribution: appConfig.distribution
    };
  }

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/index.mjs
  setAbstractRuntimeString(() => {
    return `React Router`;
  });

  // node_modules/@shopify/shopify-app-react-router/dist/esm/server/adapters/node/index.mjs
  setAbstractRuntimeString(() => {
    return `React Router (Node)`;
  });
  if (process.env.APP_BRIDGE_URL) {
    setAppBridgeUrlOverride(process.env.APP_BRIDGE_URL);
  }

  // node_modules/@shopify/shopify-app-session-storage-prisma/dist/esm/prisma.mjs
  var import_client15 = __toESM(require_index_browser3(), 1);
  var UNIQUE_KEY_CONSTRAINT_ERROR_CODE = "P2002";
  var PrismaSessionStorage = class {
    prisma;
    ready;
    tableName = "session";
    connectionRetries = 2;
    connectionRetryIntervalMs = 5e3;
    constructor(prisma2, { tableName, connectionRetries, connectionRetryIntervalMs } = {}) {
      this.prisma = prisma2;
      if (tableName) {
        this.tableName = tableName;
      }
      if (connectionRetries !== void 0) {
        this.connectionRetries = connectionRetries;
      }
      if (connectionRetryIntervalMs !== void 0) {
        this.connectionRetryIntervalMs = connectionRetryIntervalMs;
      }
      if (this.getSessionTable() === void 0) {
        throw new Error(`PrismaClient does not have a ${this.tableName} table`);
      }
      this.ready = this.pollForTable().then(() => true).catch((cause) => {
        throw new MissingSessionTableError(`Prisma ${this.tableName} table does not exist. This could happen for a few reasons, see https://github.com/Shopify/shopify-app-js/tree/main/packages/apps/session-storage/shopify-app-session-storage-prisma#troubleshooting for more information`, cause);
      });
    }
    async storeSession(session) {
      await this.ensureReady();
      const data2 = this.sessionToRow(session);
      try {
        await this.getSessionTable().upsert({
          where: { id: session.id },
          update: data2,
          create: data2
        });
      } catch (error) {
        if (error instanceof import_client15.Prisma.PrismaClientKnownRequestError && error.code === UNIQUE_KEY_CONSTRAINT_ERROR_CODE) {
          console.log("Caught PrismaClientKnownRequestError P2002 - Unique Key Key Constraint, retrying upsert.");
          await this.getSessionTable().upsert({
            where: { id: session.id },
            update: data2,
            create: data2
          });
          return true;
        }
        throw error;
      }
      return true;
    }
    async loadSession(id) {
      await this.ensureReady();
      const row = await this.getSessionTable().findUnique({
        where: { id }
      });
      if (!row) {
        return void 0;
      }
      return this.rowToSession(row);
    }
    async deleteSession(id) {
      await this.ensureReady();
      try {
        await this.getSessionTable().delete({ where: { id } });
      } catch {
        return true;
      }
      return true;
    }
    async deleteSessions(ids) {
      await this.ensureReady();
      await this.getSessionTable().deleteMany({ where: { id: { in: ids } } });
      return true;
    }
    async findSessionsByShop(shop) {
      await this.ensureReady();
      const sessions = await this.getSessionTable().findMany({
        where: { shop },
        take: 25,
        orderBy: [{ expires: "desc" }]
      });
      return sessions.map((session) => this.rowToSession(session));
    }
    async isReady() {
      try {
        await this.pollForTable();
        this.ready = Promise.resolve(true);
      } catch (_error) {
        this.ready = Promise.resolve(false);
      }
      return this.ready;
    }
    async ensureReady() {
      if (!await this.ready)
        throw new MissingSessionStorageError("Prisma session storage is not ready. Use the `isReady` method to poll for the table.");
    }
    async pollForTable() {
      for (let i = 0; i < this.connectionRetries; i++) {
        try {
          await this.getSessionTable().count();
          return;
        } catch (error) {
          console.log(`Error obtaining session table: ${error}`);
        }
        await sleep2(this.connectionRetryIntervalMs);
      }
      throw Error(`The table \`${this.tableName}\` does not exist in the current database.`);
    }
    sessionToRow(session) {
      const sessionParams = session.toObject();
      return {
        id: session.id,
        shop: session.shop,
        state: session.state,
        isOnline: session.isOnline,
        scope: session.scope || null,
        expires: session.expires || null,
        accessToken: session.accessToken || "",
        userId: sessionParams.onlineAccessInfo?.associated_user.id || null,
        firstName: sessionParams.onlineAccessInfo?.associated_user.first_name || null,
        lastName: sessionParams.onlineAccessInfo?.associated_user.last_name || null,
        email: sessionParams.onlineAccessInfo?.associated_user.email || null,
        accountOwner: sessionParams.onlineAccessInfo?.associated_user.account_owner || false,
        locale: sessionParams.onlineAccessInfo?.associated_user.locale || null,
        collaborator: sessionParams.onlineAccessInfo?.associated_user.collaborator || false,
        emailVerified: sessionParams.onlineAccessInfo?.associated_user.email_verified || false,
        refreshToken: sessionParams.refreshToken || null,
        refreshTokenExpires: sessionParams.refreshTokenExpires || null
      };
    }
    rowToSession(row) {
      const sessionParams = {
        id: row.id,
        shop: row.shop,
        state: row.state,
        isOnline: row.isOnline,
        userId: String(row.userId),
        firstName: String(row.firstName),
        lastName: String(row.lastName),
        email: String(row.email),
        locale: String(row.locale)
      };
      if (row.accountOwner !== null) {
        sessionParams.accountOwner = row.accountOwner;
      }
      if (row.collaborator !== null) {
        sessionParams.collaborator = row.collaborator;
      }
      if (row.emailVerified !== null) {
        sessionParams.emailVerified = row.emailVerified;
      }
      if (row.expires) {
        sessionParams.expires = row.expires.getTime();
      }
      if (row.scope) {
        sessionParams.scope = row.scope;
      }
      if (row.accessToken) {
        sessionParams.accessToken = row.accessToken;
      }
      if (row.refreshToken) {
        sessionParams.refreshToken = row.refreshToken;
      }
      if (row.refreshTokenExpires) {
        sessionParams.refreshTokenExpires = row.refreshTokenExpires.getTime();
      }
      return Session.fromPropertyArray(Object.entries(sessionParams), true);
    }
    getSessionTable() {
      return this.prisma[this.tableName];
    }
  };
  var MissingSessionTableError = class extends Error {
    cause;
    constructor(message2, cause) {
      super(message2);
      this.cause = cause;
    }
  };
  var MissingSessionStorageError = class extends Error {
    constructor(message2) {
      super(message2);
    }
  };
  async function sleep2(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // app/db.server.js
  var import_client16 = __toESM(require_index_browser3(), 1);
  if (true) {
    if (!global.prismaGlobal) {
      global.prismaGlobal = new import_client16.PrismaClient();
    }
  }
  var prisma = global.prismaGlobal ?? new import_client16.PrismaClient();
  var db_server_default = prisma;

  // app/shopify.server.js
  var shopify = shopifyApp({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
    apiVersion: ApiVersion.July26,
    scopes: process.env.SCOPES?.split(","),
    appUrl: process.env.SHOPIFY_APP_URL || "",
    authPathPrefix: "/auth",
    sessionStorage: new PrismaSessionStorage(db_server_default),
    distribution: AppDistribution.AppStore,
    future: {
      expiringOfflineAccessTokens: true
    },
    ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
  });
  var apiVersion = ApiVersion.July26;
  var addDocumentResponseHeaders2 = shopify.addDocumentResponseHeaders;
  var authenticate = shopify.authenticate;
  var unauthenticated = shopify.unauthenticated;
  var login = shopify.login;
  var registerWebhooks = shopify.registerWebhooks;
  var sessionStorage2 = shopify.sessionStorage;

  // app/schema.server.js
  async function getGroupByName(shop, name) {
    return db_server_default.schemaGroup.findFirst({
      where: { shop, name },
      include: {
        schemas: { orderBy: { sortOrder: "asc" } },
        targets: true
      }
    });
  }
  async function createGroup(shop, name, slug) {
    return db_server_default.schemaGroup.create({
      data: { shop, name, slug }
    });
  }
  async function saveTargets(groupId, injectType, pageIds, postIds) {
    await db_server_default.schemaTarget.deleteMany({ where: { groupId } });
    return db_server_default.schemaTarget.create({
      data: { groupId, injectType, pageIds, postIds }
    });
  }

  // app/routes/app._index.jsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  var loader = async ({ request: request2 }) => {
    await authenticate.admin(request2);
    return null;
  };
  var action = async ({ request: request2 }) => {
    const { session, admin } = await authenticate.admin(request2);
    const formData = await request2.formData();
    const actionType = formData.get("action");
    if (actionType === "createOrLoadGroup") {
      const name = formData.get("groupName")?.toString().trim() || "";
      if (!name) return { error: "Group name is required" };
      const existing = await getGroupByName(session.shop, name);
      if (existing) {
        return { group: existing, message: `Group "${name}" already exists. Loaded.` };
      }
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const group = await createGroup(session.shop, name, slug);
      return { group, message: `Group "${name}" created.` };
    }
    if (actionType === "loadGroupByName") {
      const name = formData.get("groupName")?.toString().trim() || "";
      if (!name) return { error: "Group name is required" };
      const group = await getGroupByName(session.shop, name);
      if (!group) return { error: `Group "${name}" not found.` };
      return { group, message: `Group "${name}" loaded.` };
    }
    if (actionType === "fetchResources") {
      const resourceType = formData.get("resourceType")?.toString() || "";
      const queries = {
        pages: `query { pages(first: 50) { edges { node { id title handle createdAt } } } }`,
        products: `query { products(first: 50) { edges { node { id title featuredImage { url altText } priceRangeV2 { minVariantPrice { amount currencyCode } } } } } }`,
        blogs: `query { articles(first: 50) { edges { node { id title handle blog { handle } createdAt } } } }`
      };
      const query = queries[resourceType];
      if (!query) return { error: "Invalid resource type" };
      try {
        const response = await admin.graphql(query);
        const json = await response.json();
        let items = [];
        if (resourceType === "pages" && json.data?.pages?.edges) {
          items = json.data.pages.edges.map((e) => ({
            id: e.node.id,
            title: e.node.title || e.node.handle || e.node.id,
            url: `/pages/${e.node.handle || e.node.id}`,
            date: e.node.createdAt
          }));
        } else if (resourceType === "products" && json.data?.products?.edges) {
          items = json.data.products.edges.map((e) => ({
            id: e.node.id,
            title: e.node.title || e.node.handle || e.node.id,
            imageUrl: e.node.featuredImage?.url || "",
            price: e.node.priceRangeV2?.minVariantPrice ? `${e.node.priceRangeV2.minVariantPrice.currencyCode} ${e.node.priceRangeV2.minVariantPrice.amount}` : ""
          }));
        } else if (resourceType === "blogs" && json.data?.articles?.edges) {
          items = json.data.articles.edges.map((e) => ({
            id: e.node.id,
            title: e.node.title || e.node.handle || e.node.id,
            url: `/blogs/${e.node.blog?.handle || "blog"}/${e.node.handle || e.node.id}`,
            date: e.node.createdAt
          }));
        }
        return { resources: items };
      } catch (err) {
        return { error: "Failed to fetch resources" };
      }
    }
    if (actionType === "saveTarget") {
      const groupId = formData.get("groupId")?.toString() || "";
      const injectType = formData.get("injectType")?.toString() || "";
      const selectedIds = formData.get("selectedIds")?.toString() || "";
      await saveTargets(groupId, injectType, selectedIds, "");
      return { success: true, message: "Injection target saved successfully." };
    }
    return { error: "Invalid action" };
  };
  function Index() {
    const fetcher = useFetcher();
    const resourceFetcher = useFetcher();
    const shopify2 = useAppBridge();
    const [groupName, setGroupName] = (0, import_react.useState)("");
    const [activeGroup, setActiveGroup] = (0, import_react.useState)(null);
    const [injectTarget, setInjectTarget] = (0, import_react.useState)("liquid_snippet");
    const [savedTarget, setSavedTarget] = (0, import_react.useState)(null);
    const [notice, setNotice] = (0, import_react.useState)("");
    const [selectedResourceIds, setSelectedResourceIds] = (0, import_react.useState)([]);
    const [resources, setResources] = (0, import_react.useState)([]);
    const [resourceLoading, setResourceLoading] = (0, import_react.useState)(false);
    const [resourceError, setResourceError] = (0, import_react.useState)("");
    const [resourceSearch, setResourceSearch] = (0, import_react.useState)("");
    const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
    const [itemsPerPage, setItemsPerPage] = (0, import_react.useState)(10);
    const [addedSchemas, setAddedSchemas] = (0, import_react.useState)([]);
    (0, import_react.useEffect)(() => {
      if (fetcher.data?.group) {
        setActiveGroup(fetcher.data.group);
        setNotice(fetcher.data.message || "Group loaded");
        shopify2.toast.show(fetcher.data.message || "Group loaded");
        setTimeout(() => setNotice(""), 3e3);
      }
      if (fetcher.data?.success && fetcher.data?.message) {
        setSavedTarget(injectTarget);
        shopify2.toast.show(fetcher.data.message);
        setNotice(fetcher.data.message);
        setTimeout(() => setNotice(""), 3e3);
      }
      if (fetcher.data?.error) {
        shopify2.toast.show(fetcher.data.error);
        setNotice(fetcher.data.error);
        setTimeout(() => setNotice(""), 3e3);
      }
    }, [fetcher.data, shopify2]);
    (0, import_react.useEffect)(() => {
      if (resourceFetcher.data?.resources) {
        setResources(resourceFetcher.data.resources);
        setResourceLoading(false);
        setCurrentPage(1);
      }
      if (resourceFetcher.data?.error) {
        setResourceError(resourceFetcher.data.error);
        setResourceLoading(false);
      }
    }, [resourceFetcher.data]);
    const handleCreateOrLoad = () => {
      if (!groupName.trim()) return;
      const fd = new FormData();
      fd.append("action", "createOrLoadGroup");
      fd.append("groupName", groupName.trim());
      fetcher.submit(fd, { method: "post" });
    };
    const handleLoad = () => {
      if (!groupName.trim()) return;
      const fd = new FormData();
      fd.append("action", "loadGroupByName");
      fd.append("groupName", groupName.trim());
      fetcher.submit(fd, { method: "post" });
    };
    const handleChangeGroup = () => {
      setActiveGroup(null);
      setGroupName("");
      setInjectTarget("shortcode");
      setSavedTarget(null);
      setNotice("");
      setSelectedResourceIds([]);
      setResources([]);
      setResourceError("");
      setResourceSearch("");
      setCurrentPage(1);
      setItemsPerPage(10);
    };
    const handleInjectTargetChange = (e) => {
      const value = e.target.value;
      setInjectTarget(value);
      setSelectedResourceIds([]);
      setResourceError("");
      setResourceSearch("");
      setCurrentPage(1);
      if (value === "specific_pages") {
        setResourceLoading(true);
        setResources([]);
        const fd = new FormData();
        fd.append("action", "fetchResources");
        fd.append("resourceType", "pages");
        resourceFetcher.submit(fd, { method: "post" });
      } else if (value === "specific_products") {
        setResourceLoading(true);
        setResources([]);
        const fd = new FormData();
        fd.append("action", "fetchResources");
        fd.append("resourceType", "products");
        resourceFetcher.submit(fd, { method: "post" });
      } else if (value === "specific_blogs") {
        setResourceLoading(true);
        setResources([]);
        const fd = new FormData();
        fd.append("action", "fetchResources");
        fd.append("resourceType", "blogs");
        resourceFetcher.submit(fd, { method: "post" });
      }
    };
    const handleSaveTarget = () => {
      if (!activeGroup) return;
      const fd = new FormData();
      fd.append("action", "saveTarget");
      fd.append("groupId", activeGroup.id);
      fd.append("injectType", injectTarget);
      fd.append("selectedIds", selectedResourceIds.join(","));
      fetcher.submit(fd, { method: "post" });
    };
    const handleCopyShortcode = () => {
      const snippet = `{% render 'ultimate-schema', group: '${(activeGroup?.name || groupName).replace(/'/g, "\\'")}' %}`;
      if (navigator?.clipboard) {
        navigator.clipboard.writeText(snippet).then(() => {
          shopify2.toast.show("Liquid snippet copied to clipboard");
        });
      }
    };
    const toggleResource = (id) => {
      setSelectedResourceIds(
        (prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };
    const getDefaultSchemaData = (type) => {
      switch (type) {
        case "FAQPage":
          return { question: "", answer: "", customJson: "" };
        case "Product":
          return { name: "", url: "", description: "", imageUrl: "", brand: "", sku: "", price: "", currency: "", customJson: "" };
        case "Article":
          return { headline: "", author: "", date: "", customJson: "" };
        case "Event":
          return { name: "", description: "", imageUrl: "", customJson: "" };
        case "Person":
          return { name: "", description: "", imageUrl: "", customJson: "" };
        case "Organization":
          return { name: "", url: "", description: "", logoUrl: "", telephone: "", street: "", city: "", state: "", postalCode: "", country: "", customJson: "" };
        case "LocalBusiness":
          return { name: "", url: "", description: "", logoUrl: "", telephone: "", priceRange: "", street: "", city: "", state: "", postalCode: "", country: "", latitude: "", longitude: "", customJson: "" };
        case "Service":
          return { name: "", url: "", description: "", imageUrl: "", customJson: "" };
        case "BreadcrumbList":
          return { customJson: "" };
        case "WebPage":
          return { customJson: "" };
        case "WebSite":
          return { customJson: "" };
        case "CustomJSON":
          return { json: "", customJson: "" };
        default:
          return { customJson: "" };
      }
    };
    const getSchemaDescription = (type) => {
      switch (type) {
        case "FAQPage":
          return "Frequently asked questions with questions and answers.";
        case "Product":
          return "A product you sell, including pricing via an Offer.";
        case "Article":
          return "Blog posts, news articles, or editorial content.";
        case "Event":
          return "Event details including date, location, and organizer information.";
        case "Person":
          return "Personal profile information including name, job title, and contact details.";
        case "Organization":
          return "Company or organization information, logo, and social profiles.";
        case "LocalBusiness":
          return "Local business details including address, hours, and contact info.";
        case "Service":
          return "Service offering with name, description, and provider details.";
        case "BreadcrumbList":
          return "Breadcrumb navigation trail for improved search engine understanding.";
        case "WebPage":
          return "General web page metadata including title, description, and canonical URL.";
        case "WebSite":
          return "Website-level metadata including site name, alternate names, and search box.";
        case "CustomJSON":
          return "Paste raw JSON-LD directly into the text area below.";
        default:
          return "";
      }
    };
    const handleAddSchema = () => {
      const newSchema = {
        id: Date.now().toString(),
        label: "",
        type: "local_business",
        mode: "form",
        data: getDefaultSchemaData("LocalBusiness")
      };
      setAddedSchemas((prev) => [...prev, newSchema]);
    };
    const handleRemoveSchema = (id) => {
      setAddedSchemas((prev) => prev.filter((s) => s.id !== id));
    };
    const handleSchemaLabelChange = (id, value) => {
      setAddedSchemas(
        (prev) => prev.map((s) => s.id === id ? { ...s, label: value } : s)
      );
    };
    const toSchemaType = (value) => {
      const map = {
        faq_page: "FAQPage",
        product: "Product",
        article: "Article",
        event: "Event",
        person: "Person",
        organization: "Organization",
        local_business: "LocalBusiness",
        service: "Service",
        breadcrumb_list: "BreadcrumbList",
        web_page: "WebPage",
        web_site: "WebSite",
        customjson: "CustomJSON"
      };
      return map[value] || value;
    };
    const handleSchemaTypeChange = (id, value) => {
      setAddedSchemas(
        (prev) => prev.map((s) => s.id === id ? { ...s, type: value, data: getDefaultSchemaData(toSchemaType(value)) } : s)
      );
    };
    const handleSchemaModeChange = (id, mode) => {
      setAddedSchemas(
        (prev) => prev.map((s) => {
          if (s.id !== id) return s;
          if (mode === "json") {
            const generated = generateSchemaJsonLd(s.type, s.data || {});
            return { ...s, mode, data: { ...s.data, json: generated } };
          }
          if (mode === "form") {
            const currentJson = s.data?.json || "";
            const parsed = parseSchemaJsonLd(currentJson);
            if (parsed) {
              const currentLabel = s.label || "";
              return {
                ...s,
                mode,
                type: parsed.type,
                label: currentLabel,
                data: { ...getDefaultSchemaData(toSchemaType(parsed.type)), ...parsed.data }
              };
            }
            return { ...s, mode };
          }
          return { ...s, mode };
        })
      );
    };
    const handleSchemaFieldChange = (id, field, value) => {
      setAddedSchemas(
        (prev) => prev.map((s) => s.id === id ? { ...s, data: { ...s.data, [field]: value } } : s)
      );
    };
    const generateSchemaJsonLd = (type, data2) => {
      const base = {
        "@context": "https://schema.org",
        "@type": toSchemaType(type)
      };
      if (data2.customJson && data2.customJson.trim()) {
        try {
          const custom = JSON.parse(data2.customJson);
          Object.assign(base, custom);
          return JSON.stringify(base, null, 2);
        } catch {
          base.customProperties = data2.customJson;
        }
      }
      switch (type) {
        case "faq_page": {
          const payload = { ...base };
          if (data2.question || data2.answer) {
            payload.mainEntity = {
              "@type": "Question",
              name: data2.question || "",
              acceptedAnswer: {
                "@type": "Answer",
                text: data2.answer || ""
              }
            };
          }
          return JSON.stringify(payload, null, 2);
        }
        case "product": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.url = data2.url || "";
          payload.description = data2.description || "";
          payload.image = data2.imageUrl || "";
          payload.brand = {
            "@type": "Brand",
            name: data2.brand || ""
          };
          payload.sku = data2.sku || "";
          payload.offers = {
            "@type": "Offer",
            price: data2.price || "",
            priceCurrency: data2.currency || "USD",
            availability: "https://schema.org/InStock"
          };
          return JSON.stringify(payload, null, 2);
        }
        case "article": {
          const payload = { ...base };
          payload.headline = data2.headline || "";
          payload.author = {
            "@type": "Person",
            name: data2.author || ""
          };
          payload.datePublished = data2.date || "";
          return JSON.stringify(payload, null, 2);
        }
        case "event": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.description = data2.description || "";
          payload.image = data2.imageUrl || "";
          return JSON.stringify(payload, null, 2);
        }
        case "person": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.description = data2.description || "";
          payload.image = data2.imageUrl || "";
          return JSON.stringify(payload, null, 2);
        }
        case "organization": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.url = data2.url || "";
          payload.description = data2.description || "";
          payload.logo = data2.logoUrl || "";
          payload.telephone = data2.telephone || "";
          payload.address = {
            "@type": "PostalAddress",
            streetAddress: data2.street || "",
            addressLocality: data2.city || "",
            addressRegion: data2.state || "",
            postalCode: data2.postalCode || "",
            addressCountry: data2.country || ""
          };
          return JSON.stringify(payload, null, 2);
        }
        case "local_business": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.url = data2.url || "";
          payload.description = data2.description || "";
          payload.logo = data2.logoUrl || "";
          payload.telephone = data2.telephone || "";
          payload.priceRange = data2.priceRange || "";
          payload.image = data2.imageUrl || "";
          payload.address = {
            "@type": "PostalAddress",
            streetAddress: data2.street || "",
            addressLocality: data2.city || "",
            addressRegion: data2.state || "",
            postalCode: data2.postalCode || "",
            addressCountry: data2.country || ""
          };
          payload.geo = {
            "@type": "GeoCoordinates",
            latitude: data2.latitude || "",
            longitude: data2.longitude || ""
          };
          return JSON.stringify(payload, null, 2);
        }
        case "service": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.url = data2.url || "";
          payload.description = data2.description || "";
          payload.image = data2.imageUrl || "";
          return JSON.stringify(payload, null, 2);
        }
        case "breadcrumb_list": {
          const payload = { ...base };
          payload.itemListElement = [];
          return JSON.stringify(payload, null, 2);
        }
        case "web_page": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.description = data2.description || "";
          payload.url = data2.url || "";
          return JSON.stringify(payload, null, 2);
        }
        case "web_site": {
          const payload = { ...base };
          payload.name = data2.name || "";
          payload.url = data2.url || "";
          payload.description = data2.description || "";
          return JSON.stringify(payload, null, 2);
        }
        default:
          return JSON.stringify(base, null, 2);
      }
    };
    const parseSchemaJsonLd = (jsonString) => {
      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch {
        return null;
      }
      if (!parsed || typeof parsed !== "object") return null;
      const typeValue = parsed["@type"];
      const typeMap = {
        FAQPage: "faq_page",
        Product: "product",
        Article: "article",
        Event: "event",
        Person: "person",
        Organization: "organization",
        LocalBusiness: "local_business",
        Service: "service",
        BreadcrumbList: "breadcrumb_list",
        WebPage: "web_page",
        WebSite: "web_site"
      };
      const mappedType = typeMap[typeValue];
      if (!mappedType) return null;
      const formData = { customJson: "" };
      const knownFields = getKnownFieldsForType(mappedType);
      for (const key of Object.keys(parsed)) {
        if (key === "@context" || key === "@type") continue;
        if (knownFields.includes(key)) {
          if (typeof parsed[key] === "object" && parsed[key] !== null) {
            if (key === "brand" && parsed[key].name) formData.brand = parsed[key].name;
            else if (key === "offers") {
              formData.price = parsed[key].price || "";
              formData.currency = parsed[key].priceCurrency || "USD";
            } else if (key === "address" && typeof parsed[key] === "object") {
              formData.street = parsed[key].streetAddress || "";
              formData.city = parsed[key].addressLocality || "";
              formData.state = parsed[key].addressRegion || "";
              formData.postalCode = parsed[key].postalCode || "";
              formData.country = parsed[key].addressCountry || "";
            } else if (key === "geo" && typeof parsed[key] === "object") {
              formData.latitude = parsed[key].latitude || "";
              formData.longitude = parsed[key].longitude || "";
            } else if (key === "author" && typeof parsed[key] === "object") {
              formData.author = parsed[key].name || "";
            } else {
              formData[key] = JSON.stringify(parsed[key]);
            }
          } else {
            formData[key] = parsed[key];
          }
        }
      }
      const customProperties = {};
      for (const key of Object.keys(parsed)) {
        if (key === "@context" || key === "@type") continue;
        if (!knownFields.includes(key)) {
          customProperties[key] = parsed[key];
        }
      }
      if (Object.keys(customProperties).length > 0) {
        formData.customJson = JSON.stringify(customProperties, null, 2);
      }
      return { type: mappedType, data: formData };
    };
    const getKnownFieldsForType = (type) => {
      switch (type) {
        case "faq_page":
          return ["question", "answer"];
        case "product":
          return ["name", "url", "description", "image", "brand", "sku", "offers", "price", "currency"];
        case "article":
          return ["headline", "author", "datePublished"];
        case "event":
          return ["name", "description", "image"];
        case "person":
          return ["name", "description", "image"];
        case "organization":
          return ["name", "url", "description", "logo", "telephone", "address", "street", "city", "state", "postalCode", "country"];
        case "local_business":
          return ["name", "url", "description", "logo", "telephone", "priceRange", "image", "address", "street", "city", "state", "postalCode", "country", "geo", "latitude", "longitude"];
        case "service":
          return ["name", "url", "description", "image"];
        case "breadcrumb_list":
          return ["itemListElement"];
        case "web_page":
          return ["name", "description", "url"];
        case "web_site":
          return ["name", "url", "description"];
        default:
          return [];
      }
    };
    const shortcode = activeGroup ? `{% render 'ultimate-schema', group: '${activeGroup.name.replace(/'/g, "\\'")}' %}` : "";
    const filteredResources = resources.filter(
      (r) => r.title.toLowerCase().includes(resourceSearch.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filteredResources.length / itemsPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * itemsPerPage;
    const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);
    const getBannerTone = (msg) => {
      const lower = (msg || "").toLowerCase();
      if (lower.includes("error") || lower.includes("not found") || lower.includes("required")) {
        return "critical";
      }
      return "success";
    };
    const injectTargetLabel = (val) => {
      const map = {
        shortcode: "Use Shortcode",
        specific_pages: "Specific Pages",
        specific_products: "Specific Products",
        specific_blogs: "Specific Blogs",
        all_pages: "All Pages",
        all_products: "All Products",
        all_blogs: "All Blogs"
      };
      return map[val] || val;
    };
    const resourceTypeLabel = injectTarget.replace("specific_", "").replace("all_", "");
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-page", { heading: "Schema Injector", children: [
      notice && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "s-banner",
        {
          tone: getBannerTone(notice),
          onDismiss: () => setNotice(""),
          style: { marginBottom: "16px" },
          children: notice
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-section", { heading: "1. Add a New Schema Group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { children: "Create or load a schema group to get started. You can manage your schemas from the Manage Schemas page." }),
        !activeGroup && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "s-text-field",
            {
              label: "Schema Group Name",
              value: groupName,
              onChange: (e) => setGroupName(e.target.value),
              placeholder: "Enter schema group name",
              autoComplete: "off"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", gap: "base", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-button", { onClick: handleCreateOrLoad, children: "Create" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-button", { variant: "secondary", onClick: handleLoad, children: "Load" })
          ] })
        ] }),
        activeGroup && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", gap: "base", alignItems: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "s-box",
            {
              padding: "base",
              borderWidth: "base",
              borderRadius: "base",
              background: "subdued",
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-paragraph", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "Active Group:" }),
                " ",
                activeGroup.name,
                " ",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-text", { tone: "subdued", children: [
                  "(Slug: ",
                  activeGroup.slug,
                  ")"
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-button", { variant: "secondary", onClick: handleChangeGroup, children: "Change Group" })
        ] })
      ] }) }),
      activeGroup ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-section", { heading: "2. Auto Inject Target", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { children: "Choose where to inject your schema automatically or use the shortcode." }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "s-select",
            {
              label: "Inject Into",
              value: injectTarget,
              onChange: handleInjectTargetChange,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "liquid_snippet", children: "Use Liquid Snippet" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "specific_pages", children: "Specific Pages" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "specific_products", children: "Specific Products" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "specific_blogs", children: "Specific Blogs" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "all_pages", children: "All Pages" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "all_products", children: "All Products" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "all_blogs", children: "All Blogs" })
              ]
            }
          ),
          injectTarget === "liquid_snippet" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "s-box",
            {
              padding: "base",
              borderWidth: "base",
              borderRadius: "base",
              background: "subdued",
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { children: "Paste this Liquid snippet anywhere inside your theme files to render this schema group manually." }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", gap: "base", alignItems: "center", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "s-text-field",
                    {
                      value: shortcode,
                      readOnly: true,
                      style: { fontFamily: "monospace" }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-button", { variant: "secondary", onClick: handleCopyShortcode, children: "Copy" })
                ] })
              ] })
            }
          ) : null,
          injectTarget === "specific_pages" || injectTarget === "specific_products" || injectTarget === "specific_blogs" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", width: "100%", gap: "16px", alignItems: "flex-end", marginBottom: "16px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 80%", minWidth: "0" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "s-text-field",
                {
                  label: "Search",
                  value: resourceSearch,
                  onChange: (e) => {
                    setResourceSearch(e.target.value);
                    setCurrentPage(1);
                  },
                  placeholder: "Search " + resourceTypeLabel + "s...",
                  autoComplete: "off"
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "0 0 20%", minWidth: "120px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "s-select",
                {
                  label: "Items per page",
                  value: String(itemsPerPage),
                  onChange: (e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "10", children: "10" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "20", children: "20" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-option", { value: "50", children: "50" })
                  ]
                }
              ) })
            ] }),
            resourceLoading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", gap: "base", alignItems: "center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-spinner", { size: "base", accessibilityLabel: "Loading resources" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-paragraph", { children: [
                "Loading ",
                resourceTypeLabel,
                "s..."
              ] })
            ] }) : null,
            resourceError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-banner", { tone: "critical", onDismiss: () => setResourceError(""), children: resourceError }) : null,
            !resourceLoading && resources.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "div",
                {
                  style: {
                    border: "1px solid #e1e3e5",
                    borderRadius: "8px",
                    overflow: "hidden"
                  },
                  children: [
                    paginatedResources.map((item) => {
                      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                        "div",
                        {
                          onClick: () => toggleResource(item.id),
                          style: {
                            padding: "12px 16px",
                            borderBottom: "1px solid #e1e3e5",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            cursor: "pointer"
                          },
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", alignItems: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                              "s-checkbox",
                              {
                                value: item.id,
                                checked: selectedResourceIds.includes(item.id),
                                onChange: (e) => {
                                  e.stopPropagation();
                                  toggleResource(item.id);
                                }
                              }
                            ) }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { width: "40px", height: "40px", flexShrink: 0 }, children: [
                              injectTarget === "specific_products" && item.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-thumbnail", { size: "small", src: item.imageUrl, alt: item.title }) : null,
                              injectTarget === "specific_products" && !item.imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-thumbnail", { size: "small", alt: item.title }) : null
                            ] }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "4px", flex: 1, minWidth: 0 }, children: [
                              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { fontWeight: "600", fontSize: "14px" }, children: item.title }),
                              injectTarget === "specific_products" && item.price ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { color: "#6d7175", fontSize: "12px" }, children: item.price }) : null,
                              (injectTarget === "specific_pages" || injectTarget === "specific_blogs") && item.url ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { color: "#6d7175", fontSize: "12px" }, children: item.url }) : null
                            ] })
                          ]
                        },
                        item.id
                      );
                    }),
                    paginatedResources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { tone: "subdued", style: { padding: "12px 16px" }, children: "No matches found." }) : null
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", gap: "base", alignItems: "center", justifyContent: "space-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", gap: "base", alignItems: "center", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "s-button",
                    {
                      variant: "secondary",
                      onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
                      disabled: safePage <= 1,
                      children: "Previous"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-text", { children: [
                    "Page ",
                    safePage,
                    " of ",
                    totalPages
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "s-button",
                    {
                      variant: "secondary",
                      onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
                      disabled: safePage >= totalPages,
                      children: "Next"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-paragraph", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: selectedResourceIds.length }),
                  " ",
                  resourceTypeLabel,
                  "(s) selected"
                ] })
              ] })
            ] }) : null,
            !resourceLoading && resources.length === 0 && !resourceError && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-paragraph", { tone: "subdued", children: [
              "No ",
              resourceTypeLabel,
              "s found."
            ] })
          ] }) : null,
          injectTarget === "all_pages" || injectTarget === "all_products" || injectTarget === "all_blogs" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-banner", { tone: "info", children: [
            "This will inject the schema into all ",
            resourceTypeLabel,
            "s automatically."
          ] }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", gap: "base", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-button", { variant: "primary", onClick: handleSaveTarget, children: "Save Target" }),
            savedTarget ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-banner", { tone: "success", onDismiss: () => setSavedTarget(null), children: [
              "Target saved as: ",
              injectTargetLabel(savedTarget)
            ] }) : null
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-section", { heading: "3. Add Schema Data", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { children: "Add one or more schemas. Choose a Schema Type and the matching fields appear automatically. Toggle Direct JSON mode to paste raw JSON-LD." }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-stack", { direction: "block", gap: "base", children: addedSchemas.map((schema) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              style: {
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e1e3e5",
                backgroundColor: "#ffffff",
                marginBottom: "16px"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { justifyContent: "space-between" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "s-text-field",
                    {
                      label: "Schema Name",
                      value: schema.label || "",
                      onChange: (e) => handleSchemaLabelChange(schema.id, e.target.value),
                      placeholder: "e.g., localbusiness schema",
                      autoComplete: "off"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-button", { variant: "secondary", tone: "critical", onClick: () => handleRemoveSchema(schema.id), children: "Remove" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "16px", marginTop: "12px", marginBottom: "12px", flexWrap: "wrap" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "Schema Type" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                      "select",
                      {
                        value: schema.type,
                        onChange: (e) => handleSchemaTypeChange(schema.id, e.target.value),
                        style: { padding: "6px 12px", borderRadius: "6px", border: "1px solid #c9cccf", background: "#fff", fontSize: "14px" },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", disabled: true, children: "Select a schema type..." }),
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("optgroup", { label: "Business", children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "local_business", children: "Local Business" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "organization", children: "Organization" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "service", children: "Service" })
                          ] }),
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("optgroup", { label: "Commerce", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "product", children: "Product" }) }),
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("optgroup", { label: "Content", children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "article", children: "Article" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "event", children: "Event" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "faq_page", children: "FAQ Page" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "person", children: "Person" })
                          ] }),
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("optgroup", { label: "Site", children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "breadcrumb_list", children: "Breadcrumb List" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "web_page", children: "Web Page" }),
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "web_site", children: "Web Site" })
                          ] })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Mode" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", background: "#eef0f2", padding: "3px", borderRadius: "6px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleSchemaModeChange(schema.id, "form"),
                          style: {
                            padding: "6px 14px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            background: schema.mode === "form" ? "#000000" : "transparent",
                            color: schema.mode === "form" ? "#ffffff" : "#303030",
                            fontWeight: "bold"
                          },
                          children: "Form"
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleSchemaModeChange(schema.id, "json"),
                          style: {
                            padding: "6px 14px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                            background: schema.mode === "json" ? "#000000" : "transparent",
                            color: schema.mode === "json" ? "#ffffff" : "#303030",
                            fontWeight: "bold"
                          },
                          children: "Direct JSON"
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { tone: "subdued", children: getSchemaDescription(toSchemaType(schema.type)) }),
                schema.mode === "json" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", style: { marginTop: "12px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { tone: "subdued", children: "Paste complete JSON-LD below. It is injected exactly as written." }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "textarea",
                    {
                      value: schema.data?.json || "",
                      onChange: (e) => handleSchemaFieldChange(schema.id, "json", e.target.value),
                      rows: 12,
                      style: {
                        width: "100%",
                        minHeight: "260px",
                        fontFamily: "monospace, 'Fira Code', 'Courier New', monospace",
                        fontSize: "13px",
                        lineHeight: "1.5",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #c9cccf",
                        backgroundColor: "#fafafa",
                        whiteSpace: "pre",
                        overflowX: "auto",
                        boxSizing: "border-box",
                        resize: "vertical"
                      },
                      placeholder: `{ "@context": "https://schema.org", "@type": "${toSchemaType(schema.type) || "LocalBusiness"}", "name": "My Business" }`
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", style: { marginTop: "12px" }, children: [
                  schema.type === "local_business" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Business Name", value: schema.data?.name || "", onChange: (e) => handleSchemaFieldChange(schema.id, "name", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Website URL", value: schema.data?.url || "", onChange: (e) => handleSchemaFieldChange(schema.id, "url", e.target.value) }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Business Description", value: schema.data?.description || "", onChange: (e) => handleSchemaFieldChange(schema.id, "description", e.target.value), multiline: 3 }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Logo / Image URL", value: schema.data?.logoUrl || "", onChange: (e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Telephone", value: schema.data?.telephone || "", onChange: (e) => handleSchemaFieldChange(schema.id, "telephone", e.target.value) }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Price Range", value: schema.data?.priceRange || "", onChange: (e) => handleSchemaFieldChange(schema.id, "priceRange", e.target.value), placeholder: "e.g., $" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Street Address", value: schema.data?.street || "", onChange: (e) => handleSchemaFieldChange(schema.id, "street", e.target.value) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 30%", minWidth: "150px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "City", value: schema.data?.city || "", onChange: (e) => handleSchemaFieldChange(schema.id, "city", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 30%", minWidth: "150px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "State / Region", value: schema.data?.state || "", onChange: (e) => handleSchemaFieldChange(schema.id, "state", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 30%", minWidth: "150px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Postal Code", value: schema.data?.postalCode || "", onChange: (e) => handleSchemaFieldChange(schema.id, "postalCode", e.target.value) }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Country", value: schema.data?.country || "", onChange: (e) => handleSchemaFieldChange(schema.id, "country", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Latitude", value: schema.data?.latitude || "", onChange: (e) => handleSchemaFieldChange(schema.id, "latitude", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Longitude", value: schema.data?.longitude || "", onChange: (e) => handleSchemaFieldChange(schema.id, "longitude", e.target.value) }) })
                    ] })
                  ] }),
                  schema.type === "product" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Product Name", value: schema.data?.name || "", onChange: (e) => handleSchemaFieldChange(schema.id, "name", e.target.value), placeholder: "Product Name" }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Product URL", value: schema.data?.url || "", onChange: (e) => handleSchemaFieldChange(schema.id, "url", e.target.value), placeholder: "https://" }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Description", value: schema.data?.description || "", onChange: (e) => handleSchemaFieldChange(schema.id, "description", e.target.value), placeholder: "Description", multiline: 3 }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Image URL", value: schema.data?.imageUrl || "", onChange: (e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value), placeholder: "https://" }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Brand", value: schema.data?.brand || "", onChange: (e) => handleSchemaFieldChange(schema.id, "brand", e.target.value), placeholder: "Brand" }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "SKU", value: schema.data?.sku || "", onChange: (e) => handleSchemaFieldChange(schema.id, "sku", e.target.value), placeholder: "SKU" }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Price", value: schema.data?.price || "", onChange: (e) => handleSchemaFieldChange(schema.id, "price", e.target.value), placeholder: "" }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Currency", value: schema.data?.currency || "", onChange: (e) => handleSchemaFieldChange(schema.id, "currency", e.target.value), placeholder: "Currency", helperText: "ISO 4217 e.g., USD, EUR, BDT" })
                  ] }),
                  schema.type === "organization" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Organization Name", value: schema.data?.name || "", onChange: (e) => handleSchemaFieldChange(schema.id, "name", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Website URL", value: schema.data?.url || "", onChange: (e) => handleSchemaFieldChange(schema.id, "url", e.target.value) }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Description", value: schema.data?.description || "", onChange: (e) => handleSchemaFieldChange(schema.id, "description", e.target.value), multiline: 3 }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Logo / Image URL", value: schema.data?.logoUrl || "", onChange: (e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 45%", minWidth: "200px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Logo URL", value: schema.data?.logoUrl || "", onChange: (e) => handleSchemaFieldChange(schema.id, "logoUrl", e.target.value) }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Telephone", value: schema.data?.telephone || "", onChange: (e) => handleSchemaFieldChange(schema.id, "telephone", e.target.value) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Street Address", value: schema.data?.street || "", onChange: (e) => handleSchemaFieldChange(schema.id, "street", e.target.value) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "inline", blockAlign: "center", gap: "base", style: { flexWrap: "wrap" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 30%", minWidth: "150px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "City", value: schema.data?.city || "", onChange: (e) => handleSchemaFieldChange(schema.id, "city", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 30%", minWidth: "150px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "State / Region", value: schema.data?.state || "", onChange: (e) => handleSchemaFieldChange(schema.id, "state", e.target.value) }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { flex: "1 1 30%", minWidth: "150px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Postal Code", value: schema.data?.postalCode || "", onChange: (e) => handleSchemaFieldChange(schema.id, "postalCode", e.target.value) }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Country", value: schema.data?.country || "", onChange: (e) => handleSchemaFieldChange(schema.id, "country", e.target.value) })
                  ] }),
                  schema.type === "service" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Service Name", value: schema.data?.name || "", onChange: (e) => handleSchemaFieldChange(schema.id, "name", e.target.value) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "URL", value: schema.data?.url || "", onChange: (e) => handleSchemaFieldChange(schema.id, "url", e.target.value) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Description", value: schema.data?.description || "", onChange: (e) => handleSchemaFieldChange(schema.id, "description", e.target.value), multiline: 3 }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text-field", { label: "Image URL", value: schema.data?.imageUrl || "", onChange: (e) => handleSchemaFieldChange(schema.id, "imageUrl", e.target.value) })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-box", { padding: "base", borderWidth: "base", borderRadius: "base", background: "subdued", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("s-stack", { direction: "block", gap: "base", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-text", { type: "strong", children: "Custom Properties (optional JSON)" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { tone: "subdued", children: "Merged into the schema. Use for anything the form does not cover." }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                      "s-text-field",
                      {
                        label: "JSON",
                        value: schema.data?.customJson || "",
                        onChange: (e) => handleSchemaFieldChange(schema.id, "customJson", e.target.value),
                        multiline: 4,
                        style: { fontFamily: "monospace" }
                      }
                    )
                  ] }) })
                ] }),
                ")}"
              ] })
            },
            schema.id
          )) }),
          addedSchemas.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-paragraph", { tone: "subdued", children: "No schemas yet. Click + Add Schema, pick a type (e.g., FAQ Page), and fill in the fields." }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-stack", { direction: "inline", gap: "base", style: { marginTop: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("s-button", { variant: "primary", onClick: handleAddSchema, children: "+ Add Schema" }) })
        ] }) })
      ] }) : null
    ] });
  }
  var headers = (headersArgs) => {
    return boundary.headers(headersArgs);
  };
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@prisma/client/runtime/index-browser.js:
  (*! Bundled license information:
  
  decimal.js/decimal.mjs:
    (*!
     *  decimal.js v10.5.0
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Licence
     *)
  *)

react-router/dist/development/chunk-62JRHF6Z.mjs:
react-router/dist/development/index.mjs:
  (**
   * react-router v7.18.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
