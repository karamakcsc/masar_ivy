cur_frm.fields_dict['custom_item_sub_group'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}
cur_frm.fields_dict['custom_item_system'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}
cur_frm.fields_dict['custom_item_type'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}

frappe.ui.form.on("Item", {
    onload: function (frm) {
        main_stock_qty(frm);
    }
});

function main_stock_qty(frm) {
        frappe.call({
            method: "masar_ivy.custom.item.item.get_main_stock_qty",
            args: {
                item_code: frm.doc.item_code,
                warehouse: "Main Stock - IVY"
            },
            async: false,
            callback: function (r) {
                frm.doc.custom_available_qty = r.message;
                frm.refresh_field('custom_available_qty');
            }
        });
}
