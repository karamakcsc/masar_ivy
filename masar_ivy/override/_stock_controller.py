import json
from collections import defaultdict
from typing import List, Tuple

import frappe
from frappe import _, bold
from frappe.utils import cint, flt, get_link_to_form, getdate

import erpnext
from erpnext.accounts.general_ledger import (
	make_gl_entries,
	make_reverse_gl_entries,
	process_gl_map,
)
from erpnext.accounts.utils import cancel_exchange_gain_loss_journal, get_fiscal_year
from erpnext.controllers.accounts_controller import AccountsController
from erpnext.stock import get_warehouse_account_map
from erpnext.stock.doctype.inventory_dimension.inventory_dimension import (
	get_evaluated_inventory_dimension,
)
from erpnext.stock.stock_ledger import get_items_to_be_repost
from erpnext.controllers.stock_controller import StockController


def check_expense_account(self, item):
	if not item.get("expense_account"):
		msg = _("Please set an Expense Account in the Items table")
		frappe.throw(
			_("Row #{0}: Expense Account not set for the Item {1}. {2}").format(
				item.idx, frappe.bold(item.item_code), msg
			),
			title=_("Expense Account Missing"),
		)

	# else:
	# 	is_expense_account = (
	# 		frappe.get_cached_value("Account", item.get("expense_account"), "report_type")
	# 		== "Profit and Loss"
	# 	)
		# if (
		# 	self.doctype
		# 	not in (
		# 		"Purchase Receipt",
		# 		"Purchase Invoice",
		# 		"Stock Reconciliation",
		# 		"Stock Entry",
		# 		"Subcontracting Receipt",
		# 	)
		# 	and not is_expense_account
		# ):
		# 	frappe.throw(
		# 		_("Expense / Difference account ({0}) must be a 'Profit or Loss' account").format(
		# 			item.get("expense_account")
		# 		)
		# 	)
		# if is_expense_account and not item.get("cost_center"):
		# 	frappe.throw(
		# 		_("{0} {1}: Cost Center is mandatory for Item {2}").format(
		# 			_(self.doctype), self.name, item.get("item_code")
		# 		)
		# 	)