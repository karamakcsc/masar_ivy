frappe.ui.form.on("Journal Entry","Eentry_type", function(frm) {
    if (frm.doc.payment_type == "Credit Note"){
      frm.set_value('naming_series', 'ACC-CN-.YYYY.-')
      frm.refresh_fields();
    }
    });