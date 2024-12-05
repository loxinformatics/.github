import importlib.util
import os
import random
import shutil
import string
import subprocess
import sys
import zipfile
from pathlib import Path


def generate_secret_key(length=50):
    characters = string.ascii_letters + string.digits + string.punctuation
    return "".join(random.choice(characters) for _ in range(length))


def install_requests():
    if importlib.util.find_spec("requests") is None:
        print("The 'requests' library is not installed. Installing now...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
        print("Installation complete.")


def install_termcolor():
    if importlib.util.find_spec("termcolor") is None:
        print("The 'termcolor' library is not installed. Installing now...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "termcolor"])
        print("Installation complete.")


def download_and_unzip_repo(github_url, extract_to="."):
    # Ensure the libraries are installed
    install_requests()
    install_termcolor()

    # Import requests only after checking its availability
    import requests
    from termcolor import colored

    # Parse the URL to get the zipball URL
    if github_url.endswith("/"):
        github_url = github_url[:-1]
    repo_name = github_url.split("/")[-1]
    zip_url = f"{github_url}/archive/refs/heads/main.zip"

    # Determine the zip file name and download location
    zip_file_name = f"{repo_name}.zip"
    zip_file_path = Path(extract_to) / zip_file_name

    # Download the zipped repo
    print(colored(f"Downloading {zip_url}...", "yellow"))
    response = requests.get(zip_url, stream=True)
    response.raise_for_status()

    # Save the zip file
    with open(zip_file_path, "wb") as file:
        for chunk in response.iter_content(chunk_size=8192):
            file.write(chunk)
    print(colored(f"Download completed: {zip_file_path}", "green"))

    # Create a new folder to extract the contents
    new_folder = Path(extract_to) / "website_template-main"
    new_folder.mkdir(parents=True, exist_ok=True)

    # Unzip the file into the new folder
    print(colored(f"Unzipping {zip_file_name} into {new_folder}...", "yellow"))
    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
        zip_ref.extractall(extract_to)
    print(colored("Extraction completed.", "green"))

    # Optionally remove the zip file
    os.remove(zip_file_path)
    print(colored(f"Removed zip file: {zip_file_path}", "red"))

    return new_folder


def move_lox_contents_to_template(template_dir):
    install_termcolor()

    from termcolor import colored

    current_dir = Path(__file__).parent.resolve()
    script_name = os.path.basename(__file__)

    target_lox_dir = template_dir / "lox"

    if target_lox_dir.exists():
        print(colored(f"Directory '{target_lox_dir}' already exists.", "cyan"))
    else:
        target_lox_dir.mkdir(parents=True, exist_ok=True)
        for item in current_dir.iterdir():
            if item.name != script_name and item.name != "website_template-main":
                target_path = target_lox_dir / item.name
                shutil.move(str(item), str(target_path))

        # Copy the script file to the target directory
        script_target_path = target_lox_dir / script_name
        shutil.copy2(script_name, script_target_path)
        print(
            colored(
                f"Script file '{script_name}' copied to '{script_target_path}'.",
                "green",
            )
        )

        # Delete the original script file
        os.remove(script_name)
        print(colored(f"Original script file '{script_name}' deleted.", "red"))

        print(
            colored(
                f"'lox' directory has been created and contents have been moved to '{target_lox_dir}'.",
                "green",
            )
        )


def create_dotenv_file(template_dir):
    dotenv_path = template_dir / ".env"
    secret_key = generate_secret_key()

    env_variables = {
        # Required / A must
        "SECRET_KEY": secret_key,
        "NEXT_PUBLIC_DEBUG": True,
        # Base
        "NEXT_PUBLIC_FULL_NAME": "",
        "NEXT_PUBLIC_SHORT_NAME": "",
        "NEXT_PUBLIC_THEME_COLOR": "",
        "NEXT_PUBLIC_DOMAIN": "example.com",
        "NEXT_PUBLIC_IP_ADDRESS": "",
        # Database
        "DB_ENGINE": "django.db.backends.sqlite3",
        "DB_NAME": "db.sqlite3",
        "DB_USER": "",
        "DB_PASSWORD": "",
        "DB_HOST": "",
        "DB_PORT": "",
        # Email
        "EMAIL_HOST": "smtp.ionos.com",
        "EMAIL_PORT": 587,
        "EMAIL_USE_TLS": True,
        "EMAIL_USE_SSL": False,
        "EMAIL_HOST_USER": "mail@company.com",
        "EMAIL_HOST_PASSWORD": "",
        # Versions
        "NEXT_PUBLIC_SERVICES_VERSION": "V1",
        "NEXT_PUBLIC_CONTACT_VERSION": "V1",
        "NEXT_PUBLIC_THEME_TOGGLER_VERSION": "V1",
        "NEXT_PUBLIC_PRELOADER_VERSION": "V1",
        "NEXT_PUBLIC_SCROLL_TOP_BUTTON_VERSION": "V1",
        "NEXT_PUBLIC_SECTION_TITLE_VERSION": "V1",
        "NEXT_PUBLIC_FORWARD_BUTTON_VERSION": "V1",
        "NEXT_PUBLIC_LOGO_VERSION": "V1",
        "NEXT_PUBLIC_SOCIAL_LINKS_VERSION": "V1",
        "NEXT_PUBLIC_USERS_VERSION": "V1",
    }

    with open(dotenv_path, "w") as dotenv_file:
        for key, value in env_variables.items():
            if isinstance(value, bool):
                value = "True" if value else "False"
            dotenv_file.write(f'{key}="{value}"\n')

    print(f".env file created at {dotenv_path}")


if __name__ == "__main__":
    # Replace with the actual URL of the template repo
    github_repo_url = "https://github.com/Lox-Informatics/website_template"

    # Extract to the parent folder of the script
    extract_to = Path(__file__).parent

    # Download and unzip the repo, and get the path to the new folder
    parent_folder = download_and_unzip_repo(github_repo_url, extract_to)

    # Move the 'lox' folder into the new folder
    move_lox_contents_to_template(parent_folder)

    # Create .env file
    create_dotenv_file(parent_folder)
