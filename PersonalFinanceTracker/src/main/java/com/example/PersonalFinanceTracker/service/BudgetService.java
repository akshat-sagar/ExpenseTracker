package com.example.PersonalFinanceTracker.service;

import com.example.PersonalFinanceTracker.model.Budget;
import com.example.PersonalFinanceTracker.model.User;
import com.example.PersonalFinanceTracker.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepo;

    public Budget setBudget(Budget budget) {
        return budgetRepo.save(budget);
    }

    public Optional<Budget> getBudget(User user, int year, int month) {
        return budgetRepo.findByUserAndMonthAndYear(user, month, year);
    }
}
