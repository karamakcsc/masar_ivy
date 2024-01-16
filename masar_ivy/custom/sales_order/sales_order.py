import frappe

@frappe.whitelist()
def get_reserved_qty(item_code, warehouse):
    reserved_qty = frappe.db.get_value('Bin', {'item_code': item_code, 'warehouse': warehouse}, 'reserved_stock')
    return reserved_qty

# //////////// mahmoud code to select item code 
# @frappe.whitelist()
# def select_item(doctype, txt, searchfield, start, page_len, filters):
#     result =  frappe.db.sql("""
#         SELECT tip.item_code , tip.item_description 
#             FROM `tabSales Order` tso 
#             INNER JOIN `tabItem Price` tip on tip.price_list  = tso.selling_price_list 
#             WHERE tso.selling_price_list  = %s
#     """, (filters.get('selling_price_list')))
#     unique_result = list(set(result))
#     return unique_result


# @frappe.whitelist()
# def check_item(item_code , selling_price_list):
#     sql = frappe.db.sql("""
#     SELECT price_list , item_description 
#     FROM `tabItem Price`
#     WHERE item_code = %s
#     """ , (item_code) , as_dict = True )
    

#     price_list = [price['price_list'] for price  in sql]
    
#     result = selling_price_list  in price_list
  
#     if  not result:
#         frappe.msgprint('Item validation failed. Please check the item.')
#         return result

  