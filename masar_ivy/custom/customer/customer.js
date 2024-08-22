cur_frm.fields_dict['custom_customer_classification'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}


frappe.ui.form.on('Customer', {
    onload: function (frm) {
		frm.toggle_display("account_manager", false);
    },
    setup: function (frm) {
		frm.toggle_display("account_manager", false);
    },
	refresh: function (frm) {
		frm.toggle_display("account_manager", false);
    }
});