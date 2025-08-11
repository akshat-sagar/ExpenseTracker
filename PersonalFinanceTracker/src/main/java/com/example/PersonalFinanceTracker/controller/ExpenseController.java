package com.example.PersonalFinanceTracker.controller;

import com.example.PersonalFinanceTracker.model.Expense;
import com.example.PersonalFinanceTracker.model.User;
import com.example.PersonalFinanceTracker.repository.AppUserRepository;
import com.example.PersonalFinanceTracker.repository.BudgetRepository;
import com.example.PersonalFinanceTracker.service.ExpenseService;
import com.example.PersonalFinanceTracker.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;
    private final AppUserRepository userRepo;
    private final JwtService jwtService;
    private final BudgetRepository budgetRepo;

    private User getLoggedInUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);
        String email = jwtService.extractUsername(token);
        return userRepo.findByEmail(email).orElseThrow();
    }

    @PostMapping("/add")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, HttpServletRequest request) {
        expense.setUser(getLoggedInUser(request));
        return ResponseEntity.ok(expenseService.addExpense(expense));
    }


    @GetMapping("/all")
    public ResponseEntity<List<Expense>> getAllExpenses(HttpServletRequest request) {
        return ResponseEntity.ok(expenseService.getUserExpenses(getLoggedInUser(request)));
    }

    @GetMapping("/month")
    public ResponseEntity<List<Expense>> getExpensesByMonth(
            @RequestParam int year,
            @RequestParam int month,
            HttpServletRequest request) {
        return ResponseEntity.ok(expenseService.getExpensesByMonth(getLoggedInUser(request), year, month));
    }

    @GetMapping("/category")
    public ResponseEntity<List<Expense>> getExpensesByCategory(
            @RequestParam String category,
            HttpServletRequest request) {
        return ResponseEntity.ok(expenseService.getExpensesByCategory(getLoggedInUser(request), category));
    }
    @GetMapping("/summary/month")
    public ResponseEntity<?> getMonthlyTotal(
            @RequestParam int year,
            @RequestParam int month,
            HttpServletRequest request) {

        Double total = expenseService.getTotalSpentByMonth(getLoggedInUser(request), year, month);
        return ResponseEntity.ok(Map.of("total", total != null ? total : 0.0));
    }

    @GetMapping("/summary/category")
    public ResponseEntity<?> getCategorySummary(HttpServletRequest request) {
        List<Object[]> raw = expenseService.getTotalSpentByCategory(getLoggedInUser(request));
        Map<String, Double> result = new HashMap<>();
        for (Object[] obj : raw) {
            result.put((String) obj[0], (Double) obj[1]);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/overspending-check")
    public ResponseEntity<?> checkOverspending(
            @RequestParam int year,
            @RequestParam int month,
            HttpServletRequest request) {
        User user = getLoggedInUser(request);
        boolean overspending = expenseService.isUserOverspending(user, year, month);

        Double totalSpent = expenseService.getTotalSpentByMonth(user, year, month);
        Double budget = budgetRepo.findByUserAndMonthAndYear(user, month, year)
                .map(b -> b.getAmount())
                .orElse(null);

        Map<String, Object> response = new HashMap<>();
        response.put("overspending", overspending);
        response.put("totalSpent", totalSpent != null ? totalSpent : 0.0);
        response.put("budget", budget);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/summary")
    public ResponseEntity<?> getSummaryByRange(
            @RequestParam String range,
            HttpServletRequest request
    ) {
        User user = getLoggedInUser(request);
        LocalDate today = LocalDate.now();
        LocalDate startDate;

        switch (range.toLowerCase()) {
            case "today":
                startDate = today;
                break;
            case "yesterday":
                startDate = today.minusDays(1);
                break;
            case "7days":
                startDate = today.minusDays(6); // includes today
                break;
            case "total":
                double total = expenseService.getUserExpenses(user)
                        .stream()
                        .mapToDouble(Expense::getAmount)
                        .sum();
                int totalCount = expenseService.getUserExpenses(user).size();
                return ResponseEntity.ok(Map.of("total", total, "count", totalCount));
            default:
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid range"));
        }

        double total = expenseService.getTotalSpentBetween(user, startDate, today);
        int count = expenseService.getExpenseCountBetween(user, startDate, today);

        return ResponseEntity.ok(Map.of("total", total, "count", count));
    }

    @GetMapping("/top-category")
    public ResponseEntity<?> getTopCategory(HttpServletRequest request) {
        User user = getLoggedInUser(request);
        Object[] top = expenseService.getTopSpendingCategory(user);

        if (top == null) {
            return ResponseEntity.ok(Map.of("name", "None", "amount", 0.0));
        }

        String name = (String) top[0];
        Double amount = (Double) top[1];

        return ResponseEntity.ok(Map.of("name", name, "amount", amount));
    }
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id, HttpServletRequest request) {
        expenseService.deleteExpense(id, getLoggedInUser(request));
        return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense,
            HttpServletRequest request) {
        Expense updated = expenseService.updateExpense(id, expense, getLoggedInUser(request));
        return ResponseEntity.ok(updated);
    }



    @GetMapping("/test")
    public ResponseEntity<String> test(Authentication authentication) {
        return ResponseEntity.ok("Authenticated as: " + authentication.getName());
    }

}
