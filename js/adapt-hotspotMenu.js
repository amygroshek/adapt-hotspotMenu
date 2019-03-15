define([
	"core/js/views/menuView",
	"./adapt-hotspotMenuItemView",
	"core/js/adapt",
], function(MenuView, HotspotMenuItemView, Adapt) {

	var HotspotMenuView = MenuView.extend({

		className: function() {
			return MenuView.prototype.className.call(this) + " hotspot-menu";
		},

		postRender: function() {
			this.setBackgroundImage();
			this.setUpItems();
		},

		setBackgroundImage: function() {
			var config = this.model.get("_hotspotMenu");
			var src = config && config._backgroundSrc;
            var styles = {
                "background-image" : "url(" + config._backgroundSrc + ")",
                "width": config._backgroundWidth,
                "height": config._backgroundHeight
            };
			// if (src) this.$el.find('.hotspot-menu-item-container').css("background-image", "url(" + src + ")");
            if (src) this.$el.find('.hotspot-menu-item-container').css( styles );
		},

		setUpItems: function() {
			var items = this.model.getAvailableChildModels();
			var $items = this.$(".hotspot-menu-item-container");

			for (var i = 0, j = items.length; i < j; i++) {
				$items.append(new HotspotMenuItemView({ model: items[i] }).$el);
			}
		}

	}, { template: "hotspotMenu" });

	Adapt.on("router:menu", function(model) {
		$("#wrapper").append(new HotspotMenuView({ model: model }).$el);
	});

});
