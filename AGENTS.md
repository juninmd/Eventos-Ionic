```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines outline the principles and constraints for all development of AGENTS.md.  Adherence to these will ensure a maintainable, robust, and scalable codebase.

## 1. DRY (Don't Repeat Yourself)

*   **Single Responsibility Principle:** Each agent should have a single, well-defined purpose.  Avoid creating multiple agents with overlapping functionality.
*   **Generic Components:**  Use generic components (e.g., message handlers, data processing routines) to minimize code duplication.
*   **Abstraction:**  Abstract common patterns and behaviors into reusable components.
*   **Documentation:** Clearly document all components and their interactions.

## 2. KISS (Keep It Simple, Stupid)

*   **Simplicity:** Favor simple, easy-to-understand code over complex solutions, unless demonstrable performance benefits justify the increased complexity.
*   **Readability:**  Use clear naming conventions and consistent formatting.
*   **Minimalism:** Keep the code base lean and efficient – avoid unnecessary elements.

## 3. SOLID Principles

*   **Single Responsibility:** (As above)
*   **Open/Closed Principle:**  The agent's core logic should be easily adaptable through interfaces and well-defined APIs.  Changes to the core logic shouldn't require changes to the agent’s public interface.
*   **Liskov Substitution Principle:**  Subclasses should be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:**  Clients shouldn't be required to know or use over-the-top implementations of an interface.
*   **Dependency Inversion Principle:**  High-level modules (agents) should not depend on low-level modules (implementation details); they should depend on abstractions.

## 4. YAGNI (You Aren't Gonna Need It)

*   **Avoid premature implementation:**  Do not write functionality solely because it *might* be useful later.  Focus on solving the current problem.
*   **Future-proofing:** Design agents with flexibility in mind, allowing for future expansion and adaptation.

## 5. Code Length Constraints

*   **Maximum Code Length:** 180 lines of code total. This is a strict limit.
*   **Line Length:**  Maximum 120 characters per line for code clarity.

## 6. Test Coverage Requirements

*   **Minimum Coverage:** 85%
*   **Test Case Structure:** Each agent shall have a dedicated test suite covering all critical functionality.
*   **Test Suite Design:**  Tests must clearly define expected inputs, outputs, and validation logic.
*   **Test Data Management:** Use realistic and diverse test data to ensure thorough coverage.

## 7. Development Workflow

1.  **Analysis:** Understand requirements and design the agent’s core functionality.
2.  **Implementation:** Write code, following SOLID principles and best practices.
3.  **Testing:**  Write unit tests and integration tests.
4.  **Review:** Peer review of code and test cases.
5.  **Refactor:** Improve code structure and readability.
6.  **Continuous Integration:**  Automate testing and build processes.

## 8.  Documentation Requirements

*   **Comments:** Include clear and concise comments to explain complex logic.
*   **README:** A detailed README with installation instructions and usage examples should be included.

## 9.  Error Handling

*   **Logging:** Use appropriate logging to track errors and debugging information.
*   **Error Reporting:** Implement robust error handling to provide informative error messages.
*   **Exception Handling:** Use exception handling to prevent crashes and provide graceful recovery.

## 10.  Version Control

*   **Git:** Use Git for version control.
*   **Branching Strategy:** Implement a branching strategy to manage feature development and bug fixes.

## 11.  Security Considerations**

*   **Input Validation:**  Validate all inputs to prevent injection attacks.
*   **Authentication/Authorization:** Implement appropriate authentication and authorization mechanisms.
*   **Data Sanitization:**  Sanitize all data inputs to prevent vulnerabilities.

## 12.  Future Considerations**

*   **Extensibility:** Design the agent structure to easily accommodate future features and integrations.
*   **Modular Design:**  Promote a modular design approach to facilitate future changes.

These guidelines are intended as a starting point and may be refined as the AGENTS.md project evolves.  Compliance with these principles is mandatory for all development efforts.
```