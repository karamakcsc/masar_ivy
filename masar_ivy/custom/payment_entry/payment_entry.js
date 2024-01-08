frappe.ui.form.on("Payment Entry","payment_type", function(frm) {
    if (frm.doc.payment_type == "Receive") {
      frm.set_value('naming_series', 'ACC-RV-.YYYY.-')
      frm.refresh_fields();
    }
    else if (frm.doc.payment_type == "Pay"){
      frm.set_value('naming_series', 'ACC-PAY-.YYYY.-')
      frm.refresh_fields();
    }
    else if (frm.doc.payment_type == "CN"){
      frm.set_value('naming_series', 'ACC-CN-.YYYY.-')
      frm.refresh_fields();
    }
    });

    frappe.ui.form.on("Payment Entry",{ before_load:function(frm) {
      var df=frappe.meta.get_docfield("Payment Entry", "naming_series",frm.doc.name);
      df.read_only=1;
    frm.refresh_fields();
    }
    });
    ///////Siam///////