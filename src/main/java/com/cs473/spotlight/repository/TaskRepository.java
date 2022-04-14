package com.cs473.spotlight.repository;

import com.cs473.spotlight.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long id);
    Optional<Task> findByIdAndProjectId(Long taskId, Long projectId);
}
