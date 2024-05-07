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
    ///////Siam////////
frappe.ui.form.on("Payment Entry", {
  setup: function(frm) {
      frm.set_query("paid_to", function() {
          frm.events.validate_company(frm);

          var account_types = in_list(["Receive", "Internal Transfer"], frm.doc.payment_type) ?
              [] : [];
          return {
              filters: {
                  // "account_type": ["in", account_types],
                  "is_group": 0,
                  "company": frm.doc.company
              }
          };
      });
  }
});

frappe.ui.form.on("Payment Entry", {
  setup: function(frm) {
      frm.set_query("paid_from", function() {
          frm.events.validate_company(frm);

          var account_types = in_list(["Receive", "Internal Transfer"], frm.doc.payment_type) ?
              [] : [];
          return {
              filters: {
                  // "account_type": ["in", account_types],
                  "is_group": 0,
                  "company": frm.doc.company
              }
          };
      });
  }
});



frappe.ui.form.on("Payment Entry", "party", function(frm) {
  if (frm.doc.party_type == "Employee") {
    frm.set_value('paid_to', '10104010006 - الموظفين - IVY');
    frm.refresh_fields();
  }
});
