package com.example.PersonalFinanceTracker.repository;

import com.example.PersonalFinanceTracker.model.Expense;
import com.example.PersonalFinanceTracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUser(User user);

    List<Expense> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);

    List<Expense> findByUserAndCategory(User user, String category);


    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user = :user AND MONTH(e.date) = :month AND YEAR(e.date) = :year")
    Double getTotalSpentByMonth(@Param("user") User user, @Param("month") int month, @Param("year") int year);

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e WHERE e.user = :user GROUP BY e.category")
    List<Object[]> getTotalSpentByCategory(@Param("user") User user);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user = :user AND e.date BETWEEN :from AND :to")
    Double getTotalSpentBetween(@Param("user") User user, @Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("SELECT COUNT(e) FROM Expense e WHERE e.user = :user AND e.date BETWEEN :from AND :to")
    int getCountBetween(@Param("user") User user, @Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("SELECT e.category, SUM(e.amount) as total FROM Expense e WHERE e.user = :user GROUP BY e.category ORDER BY total DESC")
    List<Object[]> getTopSpendingCategory(@Param("user") User user);


}
