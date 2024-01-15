import frappe

@frappe.whitelist()
def get_reserved_qty(item_code, warehouse):
    reserved_qty = frappe.db.get_value('Bin', {'item_code': item_code, 'warehouse': warehouse}, 'reserved_stock')
    return reserved_qty

# //////////// mahmoud code to select item code 
# @frappe.whitelist()
# def select_item(doctype, txt, searchfield, start, page_len, filters):
#     return frappe.db.sql("""
#         SELECT tip.item_code 
#         FROM `tabSales Order` tso 
#         INNER JOIN `tabItem Price` tip on tip.price_list  = tso.selling_price_list 
#         WHERE tso.selling_price_list  = %s
# """, (filters.get('selling_price_list')))


# @frappe.whitelist()
# def check_item(item_code , selling_price_list):
#     sql = frappe.db.sql("""
#     SELECT price_list 
#     FROM `tabItem Price`
#     WHERE item_code = %s
#     """ , (item_code) , as_dict = True )
    

#     price_list = [price['price_list'] for price  in sql]
    
#     result = selling_price_list  in price_list
#     # frappe.msgprint(f"  {result} ,,,,,, {selling_price_list} ,,,, {str(price_list)}")

#     if  not result:
#         frappe.throw(f"The Item  {item_code} Is Not For Customer {selling_price_list}")

#     # for row in sql:
#     #     if (row.get('price_list'))

#     # for row in range(sql):
#     #     if (sql[0][row+1] != selling_val):
#     #         frappe.msgprint( f" if condition {row}  ,, , ,{sql[0][row+1]} ")
#     #     else :
#     #         return("ok") 
   