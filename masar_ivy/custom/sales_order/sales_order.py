import frappe
from frappe.model.document import Document
#Stop SO ##SIAM
def on_submit(self,name):
    get_reserved_qty(self.name)

@frappe.whitelist()
def get_reserved_qty(name):
    # Fetching the length of the table matching the sales order name and item code
    data = frappe.db.sql("""
        SELECT tsoi.item_code, tsoi.warehouse, tsoi.qty, tsoi.actual_qty
        FROM `tabSales Order` tso 
        INNER JOIN `tabSales Order Item` tsoi ON tsoi.parent = tso.name
        WHERE tso.name = %s
    """, (name), as_dict=True)
    # frappe.msgprint (str(data),"siam")
    for item in data:
        reserved_stock = frappe.db.sql("""
            SELECT tb.reserved_stock
            FROM `tabBin` tb
            WHERE tb.item_code = %s AND tb.warehouse = %s
        """, (item.get('item_code'), item.get('warehouse')), as_list=True)
        # frappe.throw(str(reserved_stock))
        if reserved_stock:
            reserved_stock = float(reserved_stock[0][0])
        else:
            frappe.throw(f"Waring: {item.get('item_code')} should have Reservered Stock .")

        if item.get('qty') > (item.get('actual_qty') - reserved_stock):
            frappe.throw(f"STOP: Quantity should not exceed actual quantity {item.get('item_code')}.")
        else:
            None





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

  