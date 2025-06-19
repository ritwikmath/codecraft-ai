from google.adk.agents import Agent, SequentialAgent, LlmAgent
from google.adk.models.lite_llm import LiteLlm
# from google.adk.code_executors import BuiltInCodeExecutor
from .tools import read_file_from_github_raw


MODEL_GPT_4O = "openai/gpt-4.1"
MODEL_CLAUDE_SONNET = "anthropic/claude-sonnet-4-20250514"

file_read_agent = Agent(
    name="read_git_file_agent",
    model="gemini-2.0-flash",
    description="This agent reads the content of a specified file from a public GitHub repository.",
    instruction="To get the content of a file, you need to provide the GitHub repository owner, the repository name, the branch name, and the full path to the file within the repository. For example, if you want to read 'README.md' from 'octocat/Spoon-Knife' on the 'main' branch, you would provide 'octocat' for owner, 'Spoon-Knife' for repo, 'main' for branch, and 'README.md' for filepath. The agent will then return the raw file content.",
    tools=[read_file_from_github_raw],
    output_key="file_content"
)

code_refactor_agent = LlmAgent(
    name="code_refactoring_agent",
    model=LiteLlm(model=MODEL_CLAUDE_SONNET),
    description="Read the code and find out potential syntax issue, weak logic or possibility of make the code effecient.",
    instruction="""You are a code refactoring mechanism.
Your goal is to study the code and identofy areas of imporevement.
 **Original Code:**
  ```python
  {file_content}
  ``` 
  **Task:**
  Carefully rafactor the code to make sure it is syntactically correct. Find possible areas of improvement. Do not add additional unncessary logic to the code.
  If the original code failed to cover all possible scenarios update the code to catch the potential issue.

  **Output:**
  Replace the original content with the original code. Then output the entire code base enclosed in triple backticks (```python ... ```). 
Do not add any other text before or after the code block.

    """,
    output_key="refactored_code"
)

code_documentation_agent = LlmAgent(
    name="code_documenting_agent",
    model=LiteLlm(model=MODEL_GPT_4O),
    description="Read the code and add proper documentation to the code. The documentation should be able to explain logically comlex areas easily. Add docstring to wherever appropriate.",
    instruction="""You are a code documentation agent.
Your goal is to study the code and identofy where docstring and comments can be added to explain the code.
 **Refactored Code:**
  ```python
  {refactored_code}
  ``` 
  **Task:**
  Carefully document the code so it can be understood by anyone. This documentation will be used by another LLM agent so the documentation should be easy to understand and elaborative.
  For docstring use proper and standard format.

  **Output:**
  Replace the original content with the refactored code. Then output the entire code base enclosed in triple backticks (```python ... ```). 
Do not add any other text before or after the code block.

    """,
    output_key="documented_code"
)

unit_test_agent = LlmAgent(
    name="unit_test_generate_agent",
    model="gemini-2.0-flash",
    description="Creates unit test based on code written in file",
    instruction="""You are a unit test code generator.
Your goal is to generate unit test cases for the Python code.
 **Documented Code:**
  ```python
  {documented_code}
  ``` 
  **Task:**
  Carefully generate unit test cases that are approprite, logically and syntactically correct. Cover most of the scenarios, if code base is small and simple then cover all.

  **Output:**
  Merge the unit test cases along with the documented code. Then output the entire code base enclosed in triple backticks (```python ... ```). 
Do not add any other text before or after the code block.
    """,
    output_key="final_code"
)

# code_execute_agent = LlmAgent(
#     name="python_code_executer",
#     model="gemini-2.0-flash",
#     code_executor=BuiltInCodeExecutor(),
#     instruction="""You are a code executer.
# Your goal is to execute unit test cases for the Python code. And find out if the code has any issue. Issue can be in the unit test or main code.
#  **Final Code:**
#   ```python
#   {final_code}
#   ``` 
#   **Task:**
#   Execute the Final Code and list the issues in the code. For unit tests and main code list the issues seperately for better understanding. If no issue found then output the final code.

#   **Output:**
#   If no issue found consider the final code. Then output the entire code base enclosed in triple backticks (```python ... ```). 
# Do not add any other text before or after the code block. If the code execution failed, then output the list of issues labeled as main code and unit test scenarios.
#     """,
#     description="Executes Python code to identify if any issue exists.",
#     output_key=""
# )

code_pipeline_agent = SequentialAgent(
    name="CodePipelineAgent",
    sub_agents=[file_read_agent, code_refactor_agent, code_documentation_agent, unit_test_agent],
    description="Executes a sequence of code fetch from git, refactoring, and generating unit test.",
    # The agents will run in the order provided: Writer -> Reviewer -> Refactorer
)

root_agent = code_pipeline_agent