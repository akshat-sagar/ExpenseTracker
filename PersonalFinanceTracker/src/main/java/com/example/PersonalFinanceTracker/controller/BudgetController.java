package com.example.PersonalFinanceTracker.controller;

import com.example.PersonalFinanceTracker.model.Budget;
import com.example.PersonalFinanceTracker.model.User;
import com.example.PersonalFinanceTracker.service.BudgetService;
import com.example.PersonalFinanceTracker.service.ExpenseService;
import com.example.PersonalFinanceTracker.config.JwtService;
import com.example.PersonalFinanceTracker.repository.AppUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/budget")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;
    private final ExpenseService expenseService;
    private final JwtService jwtService;
    private final AppUserRepository userRepo;

    private User getLoggedInUser(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String email = jwtService.extractUsername(token);
        return userRepo.findByEmail(email).orElseThrow();
    }

    @PostMapping("/set")
    public ResponseEntity<?> setBudget(@RequestBody Budget budget, HttpServletRequest request) {
        budget.setUser(getLoggedInUser(request));
        return ResponseEntity.ok(budgetService.setBudget(budget));
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getBudgetSummary(
            @RequestParam int year,
            @RequestParam int month,
            HttpServletRequest request) {

        User user = getLoggedInUser(request);
        double spent = expenseService.getTotalSpentByMonth(user, year, month);
        Budget budget = budgetService.getBudget(user, year, month).orElse(null);

        double planned = (budget != null) ? budget.getAmount() : 0;
        double remaining = planned - spent;

        return ResponseEntity.ok(Map.of(
                "planned", planned,
                "spent", spent,
                "remaining", remaining
        ));
    }
}
