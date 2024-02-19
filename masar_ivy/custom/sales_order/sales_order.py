
from __future__ import unicode_literals
import frappe
from erpnext.stock.stock_balance import get_balance_qty_from_sle
from frappe import _

def validate_stock_availability(doc, method):
    for item in doc.items:
        item_code = item.item_code
        warehouse = item.warehouse or doc.set_warehouse
        actual_qty = get_balance_qty_from_sle(item_code, warehouse)
        reserved_stock = frappe.db.get_value('Bin', {'item_code': item_code, 'warehouse': warehouse}, 'reserved_stock') or 0

        if actual_qty - reserved_stock <= 0:
            frappe.throw(_("Item {0} in warehouse {1} does not have enough stock. Actual Qty: {2}, Reserved Stock: {3}").format(
                frappe.bold(item_code), frappe.bold(warehouse), actual_qty, reserved_stock))
            
# //////////// mahmoud code to select item code 
@frappe.whitelist()
def select_item(doctype, txt, searchfield, start, page_len, filters):
    result =  frappe.db.sql("""
        SELECT tip.item_code , tip.item_description 
            FROM `tabSales Order` tso 
            INNER JOIN `tabItem Price` tip on tip.price_list  = tso.selling_price_list 
            WHERE tso.selling_price_list  = %s
    """, (filters.get('selling_price_list')))
    unique_result = list(set(result))
    return unique_result


@frappe.whitelist()
def check_item(item_code , selling_price_list):
    sql = frappe.db.sql("""
    SELECT price_list , item_description 
    FROM `tabItem Price`
    WHERE item_code = %s
    """ , (item_code) , as_dict = True )
    

    price_list = [price['price_list'] for price  in sql]
    
    result = selling_price_list  in price_list
  
    if  not result:
        frappe.msgprint('Item validation failed. Please check the item.')
        return result

  