package com.example.PersonalFinanceTracker.repository;

import com.example.PersonalFinanceTracker.model.Budget;
import com.example.PersonalFinanceTracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByUserAndMonthAndYear(User user, int month, int year);
}
