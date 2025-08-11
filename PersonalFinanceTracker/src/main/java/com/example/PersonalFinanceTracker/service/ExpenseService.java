//package com.example.PersonalFinanceTracker.service;
//
//import com.example.PersonalFinanceTracker.model.Expense;
//import com.example.PersonalFinanceTracker.model.User;
//import com.example.PersonalFinanceTracker.repository.ExpenseRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class ExpenseService {
//
//    private final ExpenseRepository expenseRepo;
//
//    public Expense addExpense(Expense expense) {
//        return expenseRepo.save(expense);
//    }
//
//
//    public List<Expense> getUserExpenses(User user) {
//        return expenseRepo.findByUser(user);
//    }
//
//    public List<Expense> getExpensesByMonth(User user, int year, int month) {
//        LocalDate start = LocalDate.of(year, month, 1);
//        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
//        return expenseRepo.findByUserAndDateBetween(user, start, end);
//    }
//
//    public List<Expense> getExpensesByCategory(User user, String category) {
//        return expenseRepo.findByUserAndCategory(user, category);
//    }
//    public Double getTotalSpentByMonth(User user, int year, int month) {
//        return expenseRepo.getTotalSpentByMonth(user, month, year);
//    }
//
//    public List<Object[]> getTotalSpentByCategory(User user) {
//        return expenseRepo.getTotalSpentByCategory(user);
//    }
//
//}
package com.example.PersonalFinanceTracker.service;

import com.example.PersonalFinanceTracker.model.Budget;
import com.example.PersonalFinanceTracker.model.Expense;
import com.example.PersonalFinanceTracker.model.User;
import com.example.PersonalFinanceTracker.repository.BudgetRepository;
import com.example.PersonalFinanceTracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final BudgetRepository budgetRepo; // Inject budget repo

    public Expense addExpense(Expense expense) {
        Expense savedExpense = expenseRepo.save(expense);

        // Overspending check
        User user = expense.getUser();
        LocalDate date = expense.getDate();
        int month = date.getMonthValue();
        int year = date.getYear();

        Optional<Budget> budgetOpt = budgetRepo.findByUserAndMonthAndYear(user, month,year);

        if (budgetOpt.isPresent()) {
            double budgetLimit = budgetOpt.get().getAmount();
            double totalSpent = expenseRepo.getTotalSpentByMonth(user, month, year);

            if (totalSpent > budgetLimit) {
                System.out.println("⚠️ Budget Alert: You have exceeded your budget for " + month + "/" + year);
                // Optionally: send email or notification
            }
        }

        return savedExpense;
    }
    public boolean isUserOverspending(User user, int year, int month) {
        double totalSpent = getTotalSpentByMonth(user, year, month);
        return budgetRepo.findByUserAndMonthAndYear(user, month, year)
                .map(b -> totalSpent > b.getAmount())
                .orElse(false);
    }


    public List<Expense> getUserExpenses(User user) {
        return expenseRepo.findByUser(user);
    }

    public List<Expense> getExpensesByMonth(User user, int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return expenseRepo.findByUserAndDateBetween(user, start, end);
    }

    public List<Expense> getExpensesByCategory(User user, String category) {
        return expenseRepo.findByUserAndCategory(user, category);
    }

    public Double getTotalSpentByMonth(User user, int year, int month) {
        return expenseRepo.getTotalSpentByMonth(user, month, year);
    }

    public List<Object[]> getTotalSpentByCategory(User user) {
        return expenseRepo.getTotalSpentByCategory(user);
    }
    public double getTotalSpentBetween(User user, LocalDate from, LocalDate to) {
        Double total = expenseRepo.getTotalSpentBetween(user, from, to);
        return total != null ? total : 0.0;
    }

    // Get count of expenses between two dates
    public int getExpenseCountBetween(User user, LocalDate from, LocalDate to) {
        return expenseRepo.getCountBetween(user, from, to);
    }

    // Get top spending category
    public Object[] getTopSpendingCategory(User user) {
        List<Object[]> result = expenseRepo.getTopSpendingCategory(user);
        return result.isEmpty() ? null : result.get(0);
    }
    public void deleteExpense(Long id, User user) {
        Expense expense = expenseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        if (!expense.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized");
        }
        expenseRepo.deleteById(id);
    }

    public Expense updateExpense(Long id, Expense updatedExpense, User user) {
        Expense existing = expenseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        if (!existing.getUser().equals(user)) {
            throw new RuntimeException("Unauthorized");
        }

        existing.setCategory(updatedExpense.getCategory());
        existing.setAmount(updatedExpense.getAmount());
        existing.setDate(updatedExpense.getDate());

        return expenseRepo.save(existing);
    }


}
