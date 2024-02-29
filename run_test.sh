#!/bin/bash

# Set Node.js binary path in the PATH variable
export PATH="/Users/flaviosilva/.nvm/versions/node/v16.15.1/bin:$PATH"

# Run Selenium test
mocha /Users/flaviosilva/Documents/automation/checkAvailabity.spec.js
#selenium-side-runner -c "browserName=firefox moz:firefoxOptions.args=[-headless]" /Users/flaviosilva/Documents/automation/Siga-en.side
# selenium-side-runner /Users/flaviosilva/Documents/automation/Siga-en.side
# Get the current date and time

# Check the exit code of the previous command
if [ $? -eq 0 ]; then
    # The test passed, so don't send an email alert
    echo "Tests passed" 
    
else
    # The test failed, handle it accordingly
    curl --url 'smtps://smtp.gmail.com:465' --ssl-reqd \
      --mail-from 'flaviotokos@gmail.com' \
      --mail-rcpt 'flaviotokos@gmail.com' \
      --user 'flaviotokos@gmail.com:xvcvoqvoyxuacnqc' \
      -T <(echo -e 'From: flaviotokos@gmail.com\nTo: flaviotokos@gmail.com\nSubject: SIGA Verificação de vagas para agendamentos\n\nVagas disponíveis ou a automação está quebrada. Por favor, verifique assim que possível!')

    curl --url 'smtps://smtp.gmail.com:465' --ssl-reqd \
      --mail-from 'flaviotokos@gmail.com' \
      --mail-rcpt 'flaviotokos@gmail.com' \
      --user 'flaviotokos@gmail.com:xvcvoqvoyxuacnqc' \
      -T <(echo -e 'From: flaviotokos@gmail.com\nTo: rdantas.almeida18@gmail.com\nSubject: Siga Verificação de vagas para agendamentos\n\nVagas disponíveis ou a automação está quebrada. Por favor, verifique assim que possível!')

    echo "Email notification sent."
fi
current_datetime=$(date '+%Y-%m-%d %H:%M:%S')
echo "Logged at: $current_datetime" 


