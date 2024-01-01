// frappe.ui.form.on('Sales Order', {
//     on_submit: function (frm) {
//         create_stock_reservation_entries(frm);
//     }
// });

// function create_stock_reservation_entries(frm) {
//     const dialog = new frappe.ui.Dialog({
//         title: __("Stock Reservation"),
//         size: "extra-large",
//         fields: [
//             {
//                 fieldname: "set_warehouse",
//                 fieldtype: "Link",
//                 label: __("Set Warehouse"),
//                 options: "Warehouse",
//                 default: frm.doc.set_warehouse,
//                 get_query: () => {
//                     return {
//                         filters: [
//                             ["Warehouse", "is_group", "!=", 1]
//                         ]
//                     };
//                 },
//                 onchange: () => {
//                     if (dialog.get_value("set_warehouse")) {
//                         dialog.fields_dict.items.df.data.forEach((row) => {
//                             row.warehouse = dialog.get_value("set_warehouse");
//                         });
//                         dialog.fields_dict.items.grid.refresh();
//                     }
//                 },
//             },
//             { fieldtype: "Column Break" },
//             {
//                 fieldname: "add_item",
//                 fieldtype: "Link",
//                 label: __("Add Item"),
//                 options: "Sales Order Item",
//                 get_query: () => {
//                     return {
//                         query: "erpnext.controllers.queries.get_filtered_child_rows",
//                         filters: {
//                             "parenttype": frm.doc.doctype,
//                             "parent": frm.doc.name,
//                             "reserve_stock": 1,
//                         }
//                     };
//                 },
//                 onchange: () => {
//                     let sales_order_item = dialog.get_value("add_item");

//                     if (sales_order_item) {
//                         frm.doc.items.forEach(item => {
//                             if (item.name === sales_order_item) {
//                                 let unreserved_qty = (flt(item.stock_qty) - (item.stock_reserved_qty ? flt(item.stock_reserved_qty) : (flt(item.delivered_qty) * flt(item.conversion_factor)))) / flt(item.conversion_factor);

//                                 if (unreserved_qty > 0) {
//                                     dialog.fields_dict.items.df.data.forEach((row) => {
//                                         if (row.sales_order_item === sales_order_item) {
//                                             unreserved_qty -= row.qty_to_reserve;
//                                         }
//                                     });
//                                 }

//                                 dialog.fields_dict.items.df.data.push({
//                                     'sales_order_item': item.name,
//                                     'item_code': item.item_code,
//                                     'warehouse': dialog.get_value("set_warehouse") || item.warehouse,
//                                     'qty_to_reserve': Math.max(unreserved_qty, 0)
//                                 });
//                                 dialog.fields_dict.items.grid.refresh();
//                                 dialog.set_value("add_item", undefined);
//                             }
//                         });
//                     }
//                 },
//             },
//             { fieldtype: "Section Break" },
//             {
//                 fieldname: "items",
//                 fieldtype: "Table",
//                 label: __("Items to Reserve"),
//                 allow_bulk_edit: false,
//                 cannot_add_rows: true,
//                 data: [],
//                 fields: [
//                     {
//                         fieldname: "sales_order_item",
//                         fieldtype: "Link",
//                         label: __("Sales Order Item"),
//                         options: "Sales Order Item",
//                         reqd: 1,
//                         in_list_view: 1,
//                         get_query: () => {
//                             return {
//                                 query: "erpnext.controllers.queries.get_filtered_child_rows",
//                                 filters: {
//                                     "parenttype": frm.doc.doctype,
//                                     "parent": frm.doc.name,
//                                     "reserve_stock": 1,
//                                 }
//                             };
//                         },
//                         onchange: (event) => {
//                             if (event) {
//                                 let name = $(event.currentTarget).closest(".grid-row").attr("data-name");
//                                 let item_row = dialog.fields_dict.items.grid.grid_rows_by_docname[name].doc;

//                                 frm.doc.items.forEach(item => {
//                                     if (item.name === item_row.sales_order_item) {
//                                         item_row.item_code = item.item_code;
//                                     }
//                                 });
//                                 dialog.fields_dict.items.grid.refresh();
//                             }
//                         }
//                     },
//                     {
//                         fieldname: "item_code",
//                         fieldtype: "Link",
//                         label: __("Item Code"),
//                         options: "Item",
//                         reqd: 1,
//                         read_only: 1,
//                         in_list_view: 1,
//                     },
//                     {
//                         fieldname: "warehouse",
//                         fieldtype: "Link",
//                         label: __("Warehouse"),
//                         options: "Warehouse",
//                         reqd: 1,
//                         in_list_view: 1,
//                         get_query: () => {
//                             return {
//                                 filters: [
//                                     ["Warehouse", "is_group", "!=", 1]
//                                 ]
//                             };
//                         },
//                     },
//                     {
//                         fieldname: "qty_to_reserve",
//                         fieldtype: "Float",
//                         label: __("Qty"),
//                         reqd: 1,
//                         in_list_view: 1
//                     }
//                 ],
//             },
//         ],
//         primary_action_label: __("Reserve Stock"),
//         primary_action: () => {
//             var data = { items: dialog.fields_dict.items.grid.data };

//             if (data.items && data.items.length > 0) {
//                 frappe.call({
//                     doc: frm.doc,
//                     method: "create_stock_reservation_entries",
//                     args: {
//                         items_details: data.items,
//                         notify: true
//                     },
//                     freeze: true,
//                     freeze_message: __("Reserving Stock..."),
//                     callback: (r) => {
//                         frm.doc.__onload.has_unreserved_stock = false;
//                         frm.reload_doc();
//                     }
//                 });
//             }

//             dialog.hide();
//         },
//     });

//     frm.doc.items.forEach(item => {
//         if (item.reserve_stock) {
//             let unreserved_qty = (flt(item.stock_qty) - (item.stock_reserved_qty ? flt(item.stock_reserved_qty) : (flt(item.delivered_qty) * flt(item.conversion_factor)))) / flt(item.conversion_factor);

//             if (unreserved_qty > 0) {
//                 dialog.fields_dict.items.df.data.push({
//                     'sales_order_item': item.name,
//                     'item_code': item.item_code,
//                     'warehouse': item.warehouse,
//                     'qty_to_reserve': unreserved_qty
//                 });
//             }
//         }
//     });

//     dialog.fields_dict.items.grid.refresh();
//     dialog.show();
// }


frappe.ui.form.on("Sales Order","after_save", function(frm) {
    if(frm.doc.docstatus !=1){
      var df=frappe.meta.get_docfield("Sales Order", "reserve_stock",frm.doc.name);
      df.read_only=1;
    frm.set_value('reserve_stock', 1);
    }
});



// frappe.ui.form.on('Sales Order', 'onload', function(frm,cdt, cdn) {
//     cur_frm.fields_dict['items'].grid.get_field("item_code").get_query = function(frm,cdt,cdn){
//     var d = locals[cdt][cdn];
//     var price_list = cur_frm.selling_price_list;
//     return {
//     filters:{ "price_list": selling_price_list}
//     }
//     }
//     });
