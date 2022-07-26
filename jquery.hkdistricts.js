;
(function($, window, document, undefined) {
	'use strict';
	var data = {
		'香港島': {
			'西營盤': '',
			'堅尼地城': '',
			'上環': '',
			'大坑': '',
			'山頂': '',
			'中環': '',
			'天后': '',
			'太古城': '',
			'北角': '',
			'半山': '',
			'石澳': '',
			'西環': '',
			'赤柱': '',
			'金鐘': '',
			'柴灣': '',
			'灣仔': '',
			'西灣河': '',
			'杏花村': '',
			'淺水灣': '',
			'深水灣': '',
			'跑馬地': '',
			'筲箕灣': '',
			'銅鑼灣': '',
			'鴨利洲': '',
			'薄扶林': '',
			'鰂魚涌': '',
			'小西灣': ''
		},
		'九龍': {
			'太子': '',			
			'佐敦': '',			
			'旺角': '',			
			'紅磡': '',			
			'油塘': '',			
			'美孚': '',			
			'彩虹': '',			
			'樂富': '',			
			'橫頭磡': '',
			'藍田': '',			
			'觀塘': '',			
			'九龍城': '',
			'九龍塘': '',
			'土瓜灣': '',
			'大角咀': '',
			'牛頭角': '',
			'石峽尾': '',
			'尖沙咀': '',
			'何文田': '',
			'油麻地': '',
			'長沙灣': '',
			'荔枝角': '',
			'深水埗': '',
			'黃大仙': '',
			'慈雲山': '',
			'新蒲崗': '',
			'鯉魚門': '',
			'鑽石山': '',
			'牛池灣': '',
			'筆架山': '',
			'秀茂坪': ''			
		},
		'新界': {
			'調景嶺': '',
			'深井': '',
			'葵芳': '',
			'葵涌': '',
			'上水': '',
			'大圍': '',
			'元朗': '',
			'太和': '',
			'屯門': '',
			'火炭': '',
			'西貢': '',
			'沙田': '',
			'青衣': '',
			'粉嶺': '',
			'荃灣': '',
			'天水圍': '',
			'流浮山': '',
			'馬鞍山': '',
			'將軍澳': '',
			'落馬洲': '',
			'烏溪沙': '',
			'大埔': ''
		},
		'離島': {
			'大澳': '',
			'坪洲': '',
			'東涌': '',
			'長洲': '',
			'大嶼山': '',
			'南丫島': '',
			'愉景灣': '',
			'蒲台島': '',
			'馬灣': ''
		},
		'澳門': {
			'門半島': '',
			'氹仔': '',
			'路環': ''
		},
		'內地': {
			'': ''
		}
	};

	function transfer(value) {
		return value;
	}

	function TWzipcode(container, options) {
		var defaults = {
			'countyName': 'county',
			'css': [],
			'detect': false,
			'districtName': 'district',
			'googleMapsKey': '',
			'hideCounty': [],
			'hideDistrict': [],
			'onCountySelect': null,
			'onDistrictSelect': null,
			'onZipcodeKeyUp': null,
			'readonly': false,
			'zipcodeName': 'zipcode',
			'zipcodePlaceholder': '區域',
			'zipcodeIntoDistrict': false,
		};
		this.container = $(container);
		this.options = $.extend({}, defaults, options);
		this.init();
	}
	TWzipcode.prototype = {
		VERSION: '1.7.15',
		data: function() {
			var wrap = this.wrap;
			return 'undefined' !== typeof data[wrap.county.val()] ? data[wrap.county.val()] : data;
		},
		serialize: function() {
			var result = [],
				obj = {},
				ele = {},
				s = {};
			obj = this.container.find('select,input');
			if (obj.length) {
				obj.each(function() {
					ele = $(this);
					result.push(ele.attr('name') + '=' + ele.val());
				});
			} else {
				$(this).children().each(function() {
					s = $(this);
					result.push(s.attr('name') + '=' + s.val());
				});
			}
			return result.join('&');
		},
		destroy: function() {
			$.data(this.container.get(0), 'twzipcode', null);
			if (this.container.length) {
				return this.container.empty().off('change.twzipcode keyup.twzipcode blur.twzipcode');
			}
		},
		get: function(callback) {
			var self = this,
				result = [],
				n;

			function putin(o) {
				if ('undefined' !== typeof self.wrap[o]) {
					result.push(self.wrap[o].val());
				}
			}
			if ('function' === typeof callback) {
				callback.call(this, this.wrap.county.val(), this.wrap.district.val(), this.wrap.zipcode.val());
			} else if ('string' === typeof callback) {
				callback.split(',').forEach(putin);
			} else if (Array.isArray(callback)) {
				callback.forEach(putin);
			} else {
				result = this.wrap;
			}
			return result;
		},
		set: function(opts) {
			var self = this,
				def = {
					'county': '',
					'district': '',
					'zipcode': ''
				},
				opt = $.extend({}, def, opts);
			try {
				if ('string' === typeof opts || 'number' === typeof opts) {
					self.wrap.zipcode.val(opts).trigger('blur.twzipcode');
				} else {
					if (opt.zipcode) {
						self.wrap.zipcode.val(opt.zipcode).trigger('blur.twzipcode');
					}
					if (opt.county) {
						self.wrap.county.val(opt.county).trigger('change.twzipcode');
					}
					if (opt.district) {
						self.wrap.district.val(opt.district).trigger('change.twzipcode');
					}
				}
			} catch (ignore) {
				console.warn(ignore.message);
			} finally {
				return self.container;
			}
		},
		reset: function(container, obj) {
			var self = this,
				wrap = self.wrap,
				opts = self.options,
				county = '',
				list = {
					'county': '<option value="">區域</option>',
					'district': '<option value="">地區</option>'
				},
				tpl = [];
			switch (obj) {
				case 'district':
					wrap.district.html(list.district);
					break;
				default:
					wrap.county.html(list.county);
					wrap.district.html(list.district);
					for (county in data) {
						if ('undefined' !== typeof data[county] && -1 === opts.hideCounty.indexOf(county)) {
							tpl.push('<option value="' + county + '">' + county + '</option>');
						}
					}
					$(tpl.join('')).appendTo(wrap.county);
					break;
			}
			wrap.zipcode.val('');
		},
		bindings: function() {
			var self = this,
				opts = self.options,
				wrap = self.wrap,
				dz = '',
				dc = '',
				dd = '';
			wrap.county.on('change.twzipcode', function() {
				var val = $(this).val(),
					district = '',
					tpl = [];
				wrap.district.empty();
				if (val) {
					if (true === opts.zipcodeIntoDistrict) {
						for (district in data[val]) {
							if ('undefined' !== typeof data[val][district] && (-1 === opts.hideDistrict.indexOf(district) && -1 === opts.hideDistrict.indexOf(data[val][district]))) {
								tpl.push('<option value="' + district + '">');
								tpl.push(data[val][district] + ' ' + district);
								tpl.push('</option>');
							}
						}
					} else {
						for (district in data[val]) {
							if ('undefined' !== typeof data[val][district] && (-1 === opts.hideDistrict.indexOf(district) && -1 === opts.hideDistrict.indexOf(data[val][district]))) {
								tpl.push('<option value="' + district + '">');
								tpl.push(district);
								tpl.push('</option>');
							}
						}
					}
					wrap.district.append(tpl.join('')).trigger('change.twzipcode');
				} else {
					wrap.county.find('option:first').prop('selected', true);
					self.reset('district');
				}
				if ('function' === typeof opts.onCountySelect) {
					opts.onCountySelect.call(this);
				}
			});
			wrap.district.on('change.twzipcode', function() {
				var val = $(this).val(),
					cv = transfer(wrap.county.val());
				if (cv) {
					wrap.zipcode.val(data[cv][val]);
				}
				if ('function' === typeof opts.onDistrictSelect) {
					opts.onDistrictSelect.call(this);
				}
			});
			wrap.zipcode.on('keyup.twzipcode blur.twzipcode', function() {
				var obj = $(this),
					val = '',
					i = '',
					j = '';
				obj.val(obj.val().replace(/[^0-9]/g, ''));
				val = obj.val().toString();
				if (3 === val.length) {
					for (i in data) {
						if ('undefined' !== typeof data[i]) {
							for (j in data[i]) {
								if ('undefined' !== typeof data[i][j] && val === data[i][j]) {
									wrap.county.val(i).trigger('change.twzipcode');
									wrap.district.val(j).trigger('change.twzipcode');
									break;
								}
							}
						}
					}
				}
				if ('function' === typeof opts.onZipcodeKeyUp) {
					opts.onZipcodeKeyUp.call(this);
				}
			});
			(function() {
				var zip = self.role.zipcode.data(),
					county = self.role.county.data(),
					district = self.role.district.data(),
					n;
				for (n in zip) {
					if ('role' !== n) {
						self.role.zipcode.find(':input').attr(n, zip[n]);
					}
				}
				for (n in county) {
					if ('role' !== n) {
						self.role.county.find('select').attr(n, county[n]);
					}
				}
				for (n in district) {
					if ('role' !== n) {
						self.role.district.find('select').attr(n, district[n]);
					}
				}
			}());
			dz = 'undefined' !== typeof opts.zipcodeSel ? opts.zipcodeSel : ('undefined' !== typeof self.role.zipcode.data('value') ? self.role.zipcode.data('value') : opts.zipcodeSel);
			dc = 'undefined' !== typeof opts.countySel ? opts.countySel : ('undefined' !== typeof self.role.county.data('value') ? self.role.county.data('value') : opts.countySel);
			dd = 'undefined' !== typeof opts.districtSel ? opts.districtSel : ('undefined' !== typeof self.role.district.data('value') ? self.role.district.data('value') : opts.districtSel);
			if (dc) {
				dc = transfer(dc);
				self.wrap.county.val(dc).trigger('change.twzipcode');
				if ('undefined' !== typeof data[dc] && 'undefined' !== typeof data[dc][dd]) {
					self.wrap.district.val(dd).trigger('change.twzipcode');
				}
			}
			if (dz && 3 === dz.toString().length) {
				self.wrap.zipcode.val(dz).trigger('blur.twzipcode');
			}
		},
		geoLocation: function(callback) {
			var self = this,
				geolocation = navigator.geolocation,
				options = {
					'maximumAge': 600000,
					'timeout': 3000,
					'enableHighAccuracy': false
				},
				opts = self.options;
			if (!geolocation || !callback) {
				return;
			}
			geolocation.getCurrentPosition(function(loc) {
				var latlng = {};
				if (('coords' in loc) && ('latitude' in loc.coords) && ('longitude' in loc.coords)) {
					latlng = [loc.coords.latitude, loc.coords.longitude];
					$.getJSON('https://maps.googleapis.com/maps/api/geocode/json', {
						'key': opts.googleMapsKey,
						'sensor': false,
						'latlng': latlng.join(',')
					}, function(data) {
						var postal = '';
						if (data && 'undefined' !== typeof data.results && 'undefined' !== typeof data.results[0].address_components && 'undefined' !== typeof data.results[0].address_components[0]) {
							postal = data.results[0].address_components[data.results[0].address_components.length - 1].long_name;
							if (postal) {
								self.wrap.zipcode.val(postal.toString()).trigger('blur.twzipcode');
							}
						}
						if ('function' === typeof callback) {
							callback.call(self, loc);
						}
					});
				}
			}, function(error) {
				console.error(error);
			}, options);
		},
		init: function() {
			var self = this,
				container = self.container,
				opts = self.options,
				role = {
					county: container.find('[data-role=county]:first'),
					district: container.find('[data-role=district]:first'),
					zipcode: container.find('[data-role=zipcode]:first')
				},
				countyName = role.county.data('name') || opts.countyName,
				districtName = role.district.data('name') || opts.districtName,
				zipcodeName = role.zipcode.data('name') || opts.zipcodeName,
				zipcodePlaceholder = role.zipcode.data('placeholder') || opts.zipcodePlaceholder,
				readonly = role.zipcode.data('readonly') || opts.readonly;
			$('<select/>').attr('name', countyName).addClass(role.county.data('style') || ('undefined' !== typeof opts.css[0] ? opts.css[0] : '')).appendTo(role.county.length ? role.county : container);
			$('<select/>').attr('name', districtName).addClass(role.district.data('style') || ('undefined' !== typeof opts.css[1] ? opts.css[1] : '')).appendTo(role.district.length ? role.district : container);
			$('<input/>').attr({
				'type': 'text',
				'name': zipcodeName,
				'placeholder': zipcodePlaceholder
			}).prop('readonly', readonly).addClass(role.zipcode.data('style') || ('undefined' !== typeof opts.css[2] ? opts.css[2] : '')).appendTo(role.zipcode.length ? role.zipcode : container);
			self.wrap = {
				'county': container.find('select[name="' + countyName + '"]:first'),
				'district': container.find('select[name="' + districtName + '"]:first'),
				'zipcode': container.find('input[type=text][name="' + zipcodeName + '"]:first')
			};
		//	if (true === opts.zipcodeIntoDistrict) {
				self.wrap.zipcode.hide();
		//	}
			self.role = role;
			self.reset();
			self.bindings();
			self.geoLocation(opts.detect);
		}
	};
	$.fn.twzipcode = function(options) {
		var instance = {},
			result = [],
			args = arguments,
			id = 'twzipcode';
		if ('string' === typeof options) {
			this.each(function() {
				instance = $.data(this, id);
				if (instance instanceof TWzipcode && 'function' === typeof instance[options]) {
					result = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}
			});
			return 'undefined' !== typeof result ? result : this;
		} else {
			return this.each(function() {
				if (!$.data(this, id)) {
					$.data(this, id, new TWzipcode(this, options));
				}
			});
		}
	};
})(window.jQuery || {}, window, document);