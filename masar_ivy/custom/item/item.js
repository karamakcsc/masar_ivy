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