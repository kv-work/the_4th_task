!function(e,a){"object"==typeof exports&&"object"==typeof module?module.exports=a():"function"==typeof define&&define.amd?define("my-mvp-range-slider",[],a):"object"==typeof exports?exports["my-mvp-range-slider"]=a():e["my-mvp-range-slider"]=a()}(window,(function(){return function(e){var a={};function n(c){if(a[c])return a[c].exports;var t=a[c]={i:c,l:!1,exports:{}};return e[c].call(t.exports,t,t.exports,n),t.l=!0,t.exports}return n.m=e,n.c=a,n.d=function(e,a,c){n.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:c})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,a){if(1&a&&(e=n(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(n.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var t in e)n.d(c,t,function(a){return e[a]}.bind(null,t));return c},n.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(a,"a",a),a},n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},n.p="",n(n.s=7)}({5:function(e,a,n){},7:function(e,a,n){"use strict";n.r(a);n(5);var c=function(){function e(a){this.$container=a,this.slider=this.$container.find(".js-slider").data("myMVPSlider"),this.$configPanel=this.$container.find(".js-config-form"),this.$callbackIndicators=this.$container.find(".js-callback-indicators"),this.presets=e.createPresets(),this.currentPreset=0,this.inputs=this.initInputs(),this.setInputValues(),this.addCallbacks(),this.attachEventHandlers()}return e.prototype.initInputs=function(){var e=this.$configPanel;return{$maxValInput:e.find(".js-config__model-input_named-max-val"),$minValInput:e.find(".js-config__model-input_named-min-val"),$stepInput:e.find(".js-config__model-input_named-step"),$valInput:e.find(".js-config__model-input_named-val"),$secondValInput:e.find(".config__model-input_named-second-val"),$secondValCheck:e.find(".js-config__model-checkbox"),$lockMaxValCheck:e.find(".js-config__lock-checkbox_named-max-val"),$lockMinValCheck:e.find(".js-config__lock-checkbox_named-min-val"),$lockStepCheck:e.find(".js-config__lock-checkbox_named-step"),$lockValCheck:e.find(".js-config__lock-checkbox_named-val"),$lockSecondValCheck:e.find(".js-config__lock-checkbox_named-second-val"),$lockAllCheck:e.find(".js-config__lock-checkbox_named-all"),$orientationRadio:e.find(".js-config__orientation-radio"),$rangeCheck:e.find(".js-config__view-checkbox_named-range"),$dragIntervalCheck:e.find(".js-config__view-checkbox_named-drag-interval"),$barCheck:e.find(".js-config__view-checkbox_named-bar"),$runnerCheck:e.find(".js-config__view-checkbox_named-runner"),$scaleCheck:e.find(".js-config__view-checkbox_named-scale"),$displayValCheck:e.find(".js-config__view-checkbox_named-display-value"),$displayScaleValCheck:e.find(".js-config__view-checkbox_named-scale-value"),$numScaleValRange:e.find(".js-config__view-checkbox_named-num-scale-val"),$displayMaxValCheck:e.find(".js-config__view-checkbox_named-display-max"),$displayMinValCheck:e.find(".js-config__view-checkbox_named-display-min"),$prefixInput:e.find(".js-config__view-input_named-prefix"),$postfixInput:e.find(".js-config__view-input_named-postfix"),$presetsRadio:e.find(".js-config__presets-radio")}},e.prototype.setInputValues=function(){var e=this.slider,a=this.inputs,n=a.$maxValInput,c=a.$minValInput,t=a.$stepInput,i=a.$valInput,l=a.$secondValInput,o=a.$lockMaxValCheck,s=a.$lockMinValCheck,r=a.$lockStepCheck,d=a.$lockValCheck,u=a.$lockSecondValCheck,p=a.$lockAllCheck,h=a.$orientationRadio,k=a.$rangeCheck,f=a.$dragIntervalCheck,m=a.$barCheck,_=a.$runnerCheck,v=a.$scaleCheck,g=a.$displayValCheck,$=a.$displayScaleValCheck,b=a.$numScaleValRange,V=a.$displayMaxValCheck,C=a.$displayMinValCheck,x=a.$prefixInput,y=a.$postfixInput,I=a.$presetsRadio,j=e.getModelData(),S=j.maxValue,M=j.minValue,w=j.step,P=j.value,O=j.secondValue,R=j.lockedValues,H=e.getViewData(),F=H.isHorizontal,D=void 0===F||F,A=H.range,N=H.dragInterval,T=H.bar,z=H.runner,U=H.scale,J=H.displayValue,q=H.displayScaleValue,B=H.numOfScaleVal,E=H.displayMax,W=H.displayMin,G=H.prefix,K=H.postfix;if(n.val(S),c.val(M),t.val(w),i.val(P),void 0!==O?l.val(O):l.val(""),0!==R.length){o.prop("checked",R.includes("maxValue")),s.prop("checked",R.includes("minValue")),r.prop("checked",R.includes("step")),d.prop("checked",R.includes("value")),u.prop("checked",R.includes("secondValue"));var L=[R.includes("maxValue"),R.includes("minValue"),R.includes("step"),R.includes("value"),R.includes("secondValue")].reduce((function(e,a){return e&&a}),!0);p.prop("checked",L)}if(D?h.eq(0).prop("checked",!0):h.eq(1).prop("checked",!0),this.changeOrientation(D),k.prop("checked",A),f.prop("checked",N),m.prop("checked",T),_.prop("checked",z),v.prop("checked",U),g.prop("checked",J),$.prop("checked",q),B&&b.val(B),V.prop("checked",E),C.prop("checked",W),""!==G&&void 0!==G&&x.val(G),""!==K&&void 0!==K&&y.val(K),this.currentPreset){var Q='input[value="'+this.currentPreset+'"]';I.closest(Q).prop("checked",!0)}else I.find('[value="0"]').prop("checked",!0)},e.prototype.addCallbacks=function(){var e=this,a={onStart:function(){e.lightIndicator("onStart")},onChange:function(){e.lightIndicator("onChange"),e.onChangeSlider()},onFinish:function(){e.lightIndicator("onFinish"),e.onChangeSlider()},onUpdate:function(){e.lightIndicator("onUpdate"),e.onChangeSlider()}};this.slider.update(a)},e.prototype.attachEventHandlers=function(){var e=this.inputs,a=e.$maxValInput,n=e.$minValInput,c=e.$stepInput,t=e.$valInput,i=e.$secondValInput,l=e.$secondValCheck,o=e.$lockMaxValCheck,s=e.$lockMinValCheck,r=e.$lockStepCheck,d=e.$lockValCheck,u=e.$lockSecondValCheck,p=e.$lockAllCheck,h=e.$orientationRadio,k=e.$rangeCheck,f=e.$dragIntervalCheck,m=e.$barCheck,_=e.$runnerCheck,v=e.$scaleCheck,g=e.$displayValCheck,$=e.$displayScaleValCheck,b=e.$numScaleValRange,V=e.$displayMaxValCheck,C=e.$displayMinValCheck,x=e.$prefixInput,y=e.$postfixInput,I=e.$presetsRadio,j=a.add(n).add(c).add(t).add(i).add(x).add(y),S=o.add(l).add(s).add(r).add(d).add(u).add(p).add(k).add(f).add(m).add(_).add(v).add(g).add($).add(V).add(C),M=this.makeCheckboxChangeHandler(),w=this.makeRangeChangeHandler(),P=this.makeRadioChangeHandler();j.on("blur",this.handleInputBlur.bind(this)),S.on("change",M),b.on("change",w),h.on("change",P),I.on("change",P)},e.prototype.handleInputBlur=function(e){var a=this.slider,n=e.target,c=$(n).val(),t=n.name;if(c)switch(t){case"max-value":a.update({maxValue:+c});break;case"min-value":a.update({minValue:+c});break;case"step":a.update({step:+c});break;case"value":a.update({value:+c});break;case"second-value":a.update({secondValue:+c});break;case"prefix":a.update({prefix:c.toString()});break;case"postfix":a.update({postfix:c.toString()})}else this.setInputValues()},e.prototype.makeCheckboxChangeHandler=function(){var e=this.slider,a=this.inputs.$secondValInput;return function(n){var c=n.target,t=$(c).prop("checked");switch(c.name){case"second-value":if(t){a.prop("disabled",!1);var i=e.getModelData().secondValue;e.update({secondValue:i})}else a.prop("disabled",!0),e.update({secondValue:void 0});break;case"lock_max":t?e.lockValues(["maxValue"]):e.unlockValues(["maxValue"]);break;case"lock_min":t?e.lockValues(["minValue"]):e.unlockValues(["minValue"]);break;case"lock_step":t?e.lockValues(["step"]):e.unlockValues(["step"]);break;case"lock_val":t?e.lockValues(["value"]):e.unlockValues(["value"]);break;case"lock_second_val":t?e.lockValues(["secondValue"]):e.unlockValues(["secondValue"]);break;case"lock_all":t?e.lockValues("all"):e.unlockValues("all");break;case"range":e.update({range:t});break;case"drag_interval":e.update({dragInterval:t});break;case"runner":e.update({runner:t});break;case"bar":e.update({bar:t});break;case"scale":e.update({scale:t});break;case"display_value":e.update({displayValue:t});break;case"scale_value":e.update({displayScaleValue:t});break;case"display_min":e.update({displayMin:t});break;case"display_max":e.update({displayMax:t})}}},e.prototype.makeRangeChangeHandler=function(){var e=this.slider;return function(a){var n=$(a.target).val();if(n){var c=+n;e.update({numOfScaleVal:c})}}},e.prototype.makeRadioChangeHandler=function(){var e=this,a=this.slider;return function(n){var c=n.target,t=c.name,i=c.value;switch(t){case"presets":e.currentPreset=+i,e.setPreset(),e.addCallbacks();break;case"orientation":a.update({isHorizontal:!a.getViewData().isHorizontal}),e.changeOrientation("0"===i)}}},e.prototype.changeOrientation=function(e){e&&this.$container.hasClass("demo-slider_vertical")&&(this.$container.removeClass("demo-slider_vertical"),this.$configPanel.removeClass("config-form_vertical")),e||this.$container.hasClass("demo-slider_vertical")||(this.$container.addClass("demo-slider_vertical"),this.$configPanel.addClass("config-form_vertical"))},e.prototype.lightIndicator=function(e){var a;switch(e){case"onStart":a=this.$callbackIndicators.find(".js-callback-indicators__indicator_on-start").css({"background-color":"lime"});break;case"onChange":a=this.$callbackIndicators.find(".js-callback-indicators__indicator_on-change").css({"background-color":"lime"});break;case"onFinish":a=this.$callbackIndicators.find(".js-callback-indicators__indicator_on-finish").css({"background-color":"lime"});break;case"onUpdate":a=this.$callbackIndicators.find(".js-callback-indicators__indicator_on-update").css({"background-color":"lime"})}setTimeout((function(){a.css({"background-color":""})}),500)},e.prototype.onChangeSlider=function(){this.setInputValues()},e.prototype.setPreset=function(){var e,a=this.currentPreset;this.slider.setUserData(this.presets[a]),e=this.presets[a].length>1&&this.presets[a].length<12?this.presets[a].length-2:10,this.inputs.$numScaleValRange.attr("max",e)},e.createPresets=function(){var e=[[]];return e.push(["Mon","Tue","Wen","Thu","Fri","Sat","Sun"]),e.push(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),e},e}();$(".js-slider").each((function(){var e=$(this);if(e.hasClass("slider_default"))e.myMVPSlider();else{var a={maxValue:Number((1e5*Math.random()).toFixed()),minValue:-1*Number((1e5*Math.random()).toFixed()),step:Number((100*Math.random()).toFixed(2)),value:1e5*Math.random()-123,isHorizontal:!0,scale:!0,numOfScaleVal:Number((10*Math.random()).toFixed())};e.myMVPSlider(a)}})),$(".js-demo-slider").each((function(){new c($(this))}))}})}));