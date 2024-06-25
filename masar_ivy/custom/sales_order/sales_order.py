
from __future__ import unicode_literals
import frappe
from frappe import _

def on_submit(self, method):
    validate_stock_availability(self)

def validate_stock_availability(self):
    false_qty = False
    
    for item in self.items:
        item_code = item.item_code 
        idx = item.idx
        if item.warehouse:
            warehouse = item.warehouse
        else:
            warehouse = self.set_warehouse
        actual_qty = float(get_main_stock_qty(item_code, warehouse))
        try:
            if actual_qty:
                item_qty = item.qty
                if item_qty > actual_qty:
                    false_qty = True
                    break  
        except Exception as e:
            frappe.throw(f'No Actual Qty: {e}')
    if false_qty:
            frappe.throw(_("""Item {0} (Row {4}) in warehouse {1} does not have enough stock.       
                     Qty: {2}, Available Qty: {3}""").format(
                frappe.bold(item_code), frappe.bold(warehouse), frappe.bold(item_qty), frappe.bold(actual_qty),
                frappe.bold(idx)))
            
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

  

def get_main_stock_qty(item_code, warehouse):
    bin_data = frappe.db.sql("""
            SELECT actual_qty , reserved_stock 
            FROM `tabBin` 
            WHERE item_code = %s  AND  warehouse = %s
        """ , (item_code , warehouse) , as_dict = True)
    actual_qty = float(bin_data[0]['actual_qty'] if bin_data and  bin_data[0] and  bin_data[0]['actual_qty'] else 0)
    reserved_stock = float(bin_data[0]['reserved_stock'] if bin_data  and bin_data[0] and bin_data[0]['reserved_stock']else 0)
    result = actual_qty - reserved_stock
    if result == 0:
        return 0
    else:
        return result