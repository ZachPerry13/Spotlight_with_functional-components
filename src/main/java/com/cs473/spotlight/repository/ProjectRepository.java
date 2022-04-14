package com.cs473.spotlight.repository;

import com.cs473.spotlight.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByUsersId(String id);
    Optional<Project> findByIdAndUsersId(Long projectId, String userId);
}
