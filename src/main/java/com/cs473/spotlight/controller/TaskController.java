package com.cs473.spotlight.controller;

import com.cs473.spotlight.model.Project;
import com.cs473.spotlight.model.Task;
import com.cs473.spotlight.repository.ProjectRepository;
import com.cs473.spotlight.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("/api")
public class TaskController {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<?> getAllTasksByProjectId(@PathVariable("projectId") Long projectId, Principal principal) {
        Project project = projectRepository.findByIdAndUsersId(projectId, principal.getName()).orElse(null);
        if (project != null) {
            List<Task> tasks = taskRepository.findByProjectId(project.getId());
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @GetMapping("/projects/{projectId}/tasks/{taskId}")
    public ResponseEntity<?> getCommentById(@PathVariable("projectId") Long projectId,
                                            @PathVariable("taskId") Long taskId, Principal principal) {
        Project project = projectRepository.findByIdAndUsersId(projectId, principal.getName()).orElse(null);
        if (project != null) {
            Optional<Task> task = taskRepository.findByIdAndProjectId(taskId, project.getId());
            return task.map(response -> new ResponseEntity<>(response, HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<?> createTask(@PathVariable("projectId") Long projectId, @RequestBody Task task,
                                           Principal principal) {
        Project project = projectRepository.findByIdAndUsersId(projectId, principal.getName()).orElse(null);
        if (project != null) {
            task.setProject(project);
            return new ResponseEntity<>(taskRepository.save(task), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PutMapping("/projects/{projectId}/tasks")
    public ResponseEntity<?> updateTask(@PathVariable("projectId") Long projectId, @RequestBody Task task,
                                        Principal principal) {
        Project project = projectRepository.findByIdAndUsersId(projectId, principal.getName()).orElse(null);
        if (project != null) {
            return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @DeleteMapping("/projects/{projectId}/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable("projectId") Long projectId,
                                        @PathVariable("taskId") Long taskId, Principal principal) {
        Project project = projectRepository.findByIdAndUsersId(projectId, principal.getName()).orElse(null);
        if (project != null) {
            taskRepository.deleteById(taskId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }
}
