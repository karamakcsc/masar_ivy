cur_frm.fields_dict['custom_customer_classification'].get_query = function(doc) {
	return {
		filters: {
			"is_enable": 1
		}
	}
}
//