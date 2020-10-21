!function(e,a){"object"==typeof exports&&"object"==typeof module?module.exports=a():"function"==typeof define&&define.amd?define("my-mvp-range-slider",[],a):"object"==typeof exports?exports["my-mvp-range-slider"]=a():e["my-mvp-range-slider"]=a()}(window,(function(){return function(e){var a={};function n(t){if(a[t])return a[t].exports;var i=a[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=a,n.d=function(e,a,t){n.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,a){if(1&a&&(e=n(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var i in e)n.d(t,i,function(a){return e[a]}.bind(null,i));return t},n.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(a,"a",a),a},n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},n.p="",n(n.s=7)}({5:function(e,a,n){},7:function(e,a,n){"use strict";n.r(a);n(5);var t=function(){function e(a){this.$container=a,this.slider=this.$container.find(".js-slider").data("myMVPSlider"),this.$configPanel=this.$container.find(".js-config_panel"),this.$callbackIndicators=this.$container.find(".callback_indicators"),this.presets=e.createPresets(),this.currentPreset=0,this.inputs=this.initInputs(),this.setInputValues(),this.addCallbacks(),this.attachEventHandlers()}return e.prototype.initInputs=function(){var e=this.$configPanel;return{$maxValInput:e.find(".input_max_val"),$minValInput:e.find(".input_min_val"),$stepInput:e.find(".input_step"),$valInput:e.find(".input_val"),$secondValInput:e.find(".input_second_val"),$secondValCheck:e.find(".input_second_val_check"),$lockMaxValCheck:e.find(".input_lock_max"),$lockMinValCheck:e.find(".input_lock_min"),$lockStepCheck:e.find(".input_lock_step"),$lockValCheck:e.find(".input_lock_val"),$lockSecondValCheck:e.find(".input_lock_second_val"),$lockAllCheck:e.find(".input_lock_all"),$orientationRadio:e.find(".input_orientation"),$rangeCheck:e.find(".input_range"),$dragIntervalCheck:e.find(".input_drag_interval"),$barCheck:e.find(".input_bar"),$runnerCheck:e.find(".input_runner"),$scaleCheck:e.find(".input_scale"),$displayValCheck:e.find(".input_display_value"),$displayScaleValCheck:e.find(".input_scale_value"),$numScaleValRange:e.find('input[name="num_scale_val"]'),$displayMaxValCheck:e.find(".input_display_max"),$displayMinValCheck:e.find(".input_display_min"),$prefixInput:e.find(".input_prefix"),$postfixInput:e.find(".input_postfix"),$presetsRadio:e.find('[name="presets"]')}},e.prototype.setInputValues=function(){var e=this.slider,a=this.inputs,n=a.$maxValInput,t=a.$minValInput,i=a.$stepInput,l=a.$valInput,c=a.$secondValInput,r=a.$lockMaxValCheck,o=a.$lockMinValCheck,s=a.$lockStepCheck,d=a.$lockValCheck,u=a.$lockSecondValCheck,p=a.$lockAllCheck,h=a.$orientationRadio,k=a.$rangeCheck,f=a.$dragIntervalCheck,$=a.$barCheck,v=a.$runnerCheck,V=a.$scaleCheck,_=a.$displayValCheck,m=a.$displayScaleValCheck,g=a.$numScaleValRange,C=a.$displayMaxValCheck,b=a.$displayMinValCheck,y=a.$prefixInput,x=a.$postfixInput,I=a.$presetsRadio,S=e.getModelData(),M=S.maxValue,P=S.minValue,j=S.step,H=S.value,O=S.secondValue,R=S.lockedValues,w=e.getViewData(),F=w.isHorizontal,D=void 0===F||F,A=w.range,T=w.dragInterval,z=w.bar,U=w.runner,J=w.scale,q=w.displayValue,E=w.displayScaleValue,N=w.numOfScaleVal,W=w.displayMax,B=w.displayMin,G=w.prefix,K=w.postfix;if(n.val(M),t.val(P),i.val(j),l.val(H),void 0!==O?c.val(O):c.val(""),0!==R.length){r.prop("checked",R.includes("maxValue")),o.prop("checked",R.includes("minValue")),s.prop("checked",R.includes("step")),d.prop("checked",R.includes("value")),u.prop("checked",R.includes("secondValue"));var L=[R.includes("maxValue"),R.includes("minValue"),R.includes("step"),R.includes("value"),R.includes("secondValue")].reduce((function(e,a){return e&&a}),!0);p.prop("checked",L)}if(D?h.eq(0).prop("checked",!0):h.eq(1).prop("checked",!0),this.changeOrientation(D),k.prop("checked",A),f.prop("checked",T),$.prop("checked",z),v.prop("checked",U),V.prop("checked",J),_.prop("checked",q),m.prop("checked",E),N&&g.val(N),C.prop("checked",W),b.prop("checked",B),""!==G&&void 0!==G&&y.val(G),""!==K&&void 0!==K&&x.val(K),this.currentPreset){var Q='input[value="'+this.currentPreset+'"]';I.closest(Q).prop("checked",!0)}else I.find('[value="0"]').prop("checked",!0)},e.prototype.addCallbacks=function(){var e=this,a={onStart:function(){e.lightIndicator("onStart")},onChange:function(){e.lightIndicator("onChange"),e.onChangeSlider()},onFinish:function(){e.lightIndicator("onFinish"),e.onChangeSlider()},onUpdate:function(){e.lightIndicator("onUpdate"),e.onChangeSlider()}};this.slider.update(a)},e.prototype.attachEventHandlers=function(){var e=this.inputs,a=e.$maxValInput,n=e.$minValInput,t=e.$stepInput,i=e.$valInput,l=e.$secondValInput,c=e.$secondValCheck,r=e.$lockMaxValCheck,o=e.$lockMinValCheck,s=e.$lockStepCheck,d=e.$lockValCheck,u=e.$lockSecondValCheck,p=e.$lockAllCheck,h=e.$orientationRadio,k=e.$rangeCheck,f=e.$dragIntervalCheck,$=e.$barCheck,v=e.$runnerCheck,V=e.$scaleCheck,_=e.$displayValCheck,m=e.$displayScaleValCheck,g=e.$numScaleValRange,C=e.$displayMaxValCheck,b=e.$displayMinValCheck,y=e.$prefixInput,x=e.$postfixInput,I=e.$presetsRadio,S=a.add(n).add(t).add(i).add(l).add(y).add(x),M=r.add(c).add(o).add(s).add(d).add(u).add(p).add(k).add(f).add($).add(v).add(V).add(_).add(m).add(C).add(b),P=this.createChangeHandler(),j=this.createChangeRangeHandler(),H=this.createChangeRadioHandler();S.on("blur",this.unfocusHandler.bind(this)),M.on("change",P),g.on("change",j),h.on("change",H),I.on("change",H)},e.prototype.unfocusHandler=function(e){var a=this.slider,n=e.target,t=$(n).val(),i=n.name;if(t)switch(i){case"max-value":a.update({maxValue:+t});break;case"min-value":a.update({minValue:+t});break;case"step":a.update({step:+t});break;case"value":a.update({value:+t});break;case"second-value":t?a.update({secondValue:+t}):a.update({secondValue:void 0});break;case"prefix":a.update({prefix:t.toString()});break;case"postfix":a.update({postfix:t.toString()})}},e.prototype.createChangeHandler=function(){var e=this.slider,a=this.inputs.$secondValInput;return function(n){var t=n.target,i=$(t).prop("checked");switch(t.name){case"second-value":if(i){a.prop("disabled",!1);var l=e.getModelData().secondValue;e.update({secondValue:l})}else a.prop("disabled",!0),e.update({secondValue:void 0});break;case"lock_max":i?e.lockValues(["maxValue"]):e.unlockValues(["maxValue"]);break;case"lock_min":i?e.lockValues(["minValue"]):e.unlockValues(["minValue"]);break;case"lock_step":i?e.lockValues(["step"]):e.unlockValues(["step"]);break;case"lock_val":i?e.lockValues(["value"]):e.unlockValues(["value"]);break;case"lock_second_val":i?e.lockValues(["secondValue"]):e.unlockValues(["secondValue"]);break;case"lock_all":i?e.lockValues("all"):e.unlockValues("all");break;case"range":e.update({range:i});break;case"drag_interval":e.update({dragInterval:i});break;case"runner":e.update({runner:i});break;case"bar":e.update({bar:i});break;case"scale":e.update({scale:i});break;case"display_value":e.update({displayValue:i});break;case"scale_value":e.update({displayScaleValue:i});break;case"display_min":e.update({displayMin:i});break;case"display_max":e.update({displayMax:i})}}},e.prototype.createChangeRangeHandler=function(){var e=this.slider;return function(a){var n=$(a.target).val();if(n){var t=+n;e.update({numOfScaleVal:t})}}},e.prototype.createChangeRadioHandler=function(){var e=this,a=this.slider;return function(n){var t=n.target,i=t.name,l=t.value;switch(i){case"presets":e.currentPreset=+l,e.setPreset(),e.addCallbacks();break;case"orientation":a.update({isHorizontal:!a.getViewData().isHorizontal}),e.changeOrientation("0"===l)}}},e.prototype.changeOrientation=function(e){e&&this.$container.hasClass("demo_slider_vertical")&&(this.$container.removeClass("demo_slider_vertical"),this.$configPanel.removeClass("config_form_vertical")),e||this.$container.hasClass("demo_slider_vertical")||(this.$container.addClass("demo_slider_vertical"),this.$configPanel.addClass("config_form_vertical"))},e.prototype.lightIndicator=function(e){var a,n;switch(e){case"onStart":a=".indicator__on-start",n=this.$callbackIndicators.find(a).css({"background-color":"lime"});break;case"onChange":a=".indicator__on-change",n=this.$callbackIndicators.find(a).css({"background-color":"lime"});break;case"onFinish":a=".indicator__on-finish",n=this.$callbackIndicators.find(a).css({"background-color":"lime"});break;case"onUpdate":a=".indicator__on-update",n=this.$callbackIndicators.find(a).css({"background-color":"lime"})}setTimeout((function(){n.css({"background-color":""})}),500)},e.prototype.onChangeSlider=function(){this.setInputValues()},e.prototype.setPreset=function(){var e,a=this.currentPreset;this.slider.setUserData(this.presets[a]),e=this.presets[a].length>1&&this.presets[a].length<12?this.presets[a].length-2:10,this.inputs.$numScaleValRange.attr("max",e)},e.createPresets=function(){var e=[[]];return e.push(["Mon","Tue","Wen","Thu","Fri","Sat","Sun"]),e.push(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),e},e}();$(".js-slider").each((function(){var e=$(this);if(e.hasClass("slider_default"))e.myMVPSlider();else{var a={maxValue:+(1e5*Math.random()).toFixed(),minValue:-1*+(1e5*Math.random()).toFixed(),step:+(100*Math.random()).toFixed(2),value:1e5*Math.random()-123,isHorizontal:!0,scale:!0,numOfScaleVal:+(10*Math.random()).toFixed()};e.myMVPSlider(a)}})),$(".js-demo_slider").each((function(){new t($(this))}))}})}));