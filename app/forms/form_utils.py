from wtforms import ValidationError
from wtforms.validators import StopValidation
from datetime import datetime

class NotEqual(object):
    """
    Compares the values of two fields. Based on WTForms's EqualTo validator.

    :param fieldname:
        The name of the other field to compare to.
    :param message:
        Error message.
    """
    def __init__(self, fieldname, message):
        self.fieldname = fieldname
        self.message = message

    def __call__(self, form, field):
        other = form[self.fieldname]
        if field.data == other.data:
            message = self.message
            raise ValidationError(message)

class RequiredIf(object):
    """
    Requires a field when another field has any value

    """
    def __init__(self, fieldname, message):
        self.fieldname = fieldname
        self.message = message

    def __call__(self, form, field):
        other = form[self.fieldname]
        if not other.data:
            raise StopValidation()
        if other.data and not field.data:
            message = self.message
            raise StopValidation(message)

class RequiredWhen(object):
    """
    Requires a field when another field has a given value

    """
    def __init__(self, fieldname, value, message):
        self.fieldname = fieldname
        self.message = message
        self.value = value

    def __call__(self, form, field):
        other = form[self.fieldname]
        value = self.value
        if not other.data:
            raise StopValidation()
        if other.data == value and not field.data:
            message = self.message
            raise StopValidation(message)
        else:
            raise StopValidation()

class IsInt(object):
    """
    Requires a field to be an integer

    """
    def __init__(self, message):
        self.message = message

    def __call__(self, form, field):

        try:
            int(field.data)
        except:
            message = self.message
            raise StopValidation(message)

class InRange(object):
    """
    Requires a field to be an integer

    """
    def __init__(self, min, max, message):
        self.message = message
        self.min = min
        self.max = max + 1

    def __call__(self, form, field):

        num = int(field.data)
        if num not in range(self.min, self.max):
            message = self.message
            raise StopValidation(message)

class IsValidDate(object):
    """
    Checks a date field against a month field. Pretty limited use cases.

    """
    def __init__(self, fieldname, message):
        self.fieldname = fieldname
        self.message = message

    def __call__(self, form, field):
        month = form[self.fieldname]
        message = self.message
        num = int(field.data)
        if not month.data:
            raise StopValidation()
        try:
            int(month.data)
        except:
            raise StopValidation()
        if int(month.data) == 1:
            if num not in range(1,32):
                raise StopValidation(message)
        if int(month.data) == 2:
            if num not in range(1,30):
                raise StopValidation(message)
        if int(month.data) == 3:
            if num not in range(1,32):
                raise StopValidation(message)
        if int(month.data) == 4:
            if num not in range(1,31):
                raise StopValidation(message)
        if int(month.data) == 5:
            if num not in range(1,32):
                raise StopValidation(message)
        if int(month.data) == 6:
            if num not in range(1,31):
                raise StopValidation(message)
        if int(month.data) == 7:
            if num not in range(1,32):
                raise StopValidation(message)
        if int(month.data) == 8:
            if num not in range(1,32):
                raise StopValidation(message)
        if int(month.data) == 9:
            if num not in range(1,31):
                raise StopValidation(message)
        if int(month.data) == 10:
            if num not in range(1,32):
                raise StopValidation(message)
        if int(month.data) == 11:
            if num not in range(1,31):
                raise StopValidation(message)
        if int(month.data) == 12:
            if num not in range(1,32):
                raise StopValidation(message)

class IsValidYear(object):
    """
    Checks a date field against a month field. Pretty limited use cases.

    """
    def __init__(self, fieldname1, fieldname2):
        self.fieldname1 = fieldname1
        self.fieldname2 = fieldname2

    def __call__(self, form, field):
        today = datetime.now()
        current_year = today.year
        current_month = today.month
        current_day = today.day
        thirteen_years_ago = current_year - 13
        year = int(field.data)
        if form[self.fieldname1].data:
            try:
                int(form[self.fieldname1].data)
            except:
                raise StopValidation()
            month = int(form[self.fieldname1].data)
        if form[self.fieldname2].data:
            try:
                int(form[self.fieldname2].data)
            except:
                raise StopValidation()
            day = int(form[self.fieldname2].data)
        if not form[self.fieldname1].data or not form[self.fieldname2].data:
            raise StopValidation()
        if year < 1900 or year > current_year:
            raise StopValidation(f'Per regulations handed down by the Time Council, time travelers are not permitted to use this app (Please enter a year between 1900 and {thirteen_years_ago})')
        if year <= current_year and year > thirteen_years_ago:
            raise StopValidation('Must be at least 13 years of age to use this app')
        if year == thirteen_years_ago and month == current_month and day > current_day:
            raise StopValidation('Must be at least 13 years of age to use this app')

def validate_birthday(form, field):
    #Checking if birthday is valid
    today = datetime.now()
    current_year = today.year
    current_month = today.month
    current_day = today.day
    thirteen_years_ago = current_year - 13
    birthday = field.data
    print('birthday')
    parts = birthday.split('/')
    emptyErrors = 0
    intErrors = 0
    if not parts[1]:
        field.errors.append('Please enter a month')
        emptyErrors += 1
    if not parts[2]:
        field.errors.append('Please enter a day')
        emptyErrors += 1
    if not parts[0]:
        field.errors.append('Please enter a year')
        emptyErrors += 1
    if emptyErrors > 0:
        return
    try:
        int(parts[1])
    except ValueError:
        field.errors.append('Month must be an integer')
        intErrors += 1
    try:
        int(parts[2])
    except ValueError:
        field.errors.append('Day must be an integer')
        intErrors += 1
    try:
        int(parts[0])
    except ValueError:
        field.errors.append('Year must be an integer')
        intErrors += 1
    if intErrors > 0:
        return
    year = int(parts[0])
    month = int(parts[1])
    day = int(parts[2])
    if month not in range(1,13):
        field.errors.append('Month must be a number between 1 and 12')
    if month == 1:
        if day not in range(1,32):
            field.errors.append('Please select a valid date')
    if month == 2:
        if day not in range(1,30):
            field.errors.append('Please select a valid date')
    if month == 3:
        if day not in range(1,32):
            field.errors.append('Please select a valid date')
    if month == 4:
        if day not in range(1,31):
            field.errors.append('Please select a valid date')
    if month == 5:
        if day not in range(1,32):
            field.errors.append('Please select a valid date')
    if month == 6:
        if day not in range(1,31):
            field.errors.append('Please select a valid date')
    if month == 7:
        if day not in range(1,32):
            field.errors.append('Please select a valid date')
    if month == 8:
        if day not in range(1,32):
            field.errors.append('Please select a valid date')
    if month == 9:
        if day not in range(1,31):
            field.errors.append('Please select a valid date')
    if month == 10:
        if day not in range(1,32):
            field.errors.append('Please select a valid date')
    if month == 11:
        if day not in range(1,31):
            field.errors.append('Please select a valid date')
    if month == 12:
        if day not in range(1,32):
            field.errors.append('Please select a valid date')
    if year < 1900 or year > current_year:
        field.errors.append(f'Per regulations handed down by the Time Council, time travelers are not permitted to use this app (Please enter a year between 1900 and {thirteen_years_ago})')
    if year <= current_year and year > thirteen_years_ago:
        field.errors.append('Must be at least 13 years of age to use this app')
    if year == thirteen_years_ago and month > current_month:
        field.errors.append('Must be at least 13 years of age to use this app')
    if year == thirteen_years_ago and month == current_month and day > current_day:
        field.errors.append('Must be at least 13 years of age to use this app')



offered_languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Russian',
    'Mandarin',
    'Japanese',
    'Arabic',
    'Korean',
    'Vietnamese',
    'Armenian',
    'Azerbaijani',
    'Bengali',
    'Bulgarian',
    'Cantonese',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'Finnish',
    'Farsi',
    'Gujarati',
    'Greek',
    'Ganda',
    'Hindi',
    'Hebrew',
    'Hungarian',
    'Hawaiian',
    'Indonesian',
    'Irish',
    'Kashmiri',
    'Latin',
    'Lakota',
    'Malayalam',
    'Maya',
    'Navajo',
    'Norwegian',
    'Pashto',
    'Punjabi',
    'Portuguese',
    'Polish',
    'Romanian',
    'Serbian',
    'Swahili',
    'Swedish',
    'Samoan',
    'Tamil',
    'Telugu',
    'Tagalog',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Welsh',
    'Esperanto',
    'Elvish',
    'Klingon'
]

valid_levels = [
    'A1: Beginner',
    'A2: Elementary',
    'B1: Intermediate',
    'B2: Upper Intermediate',
    'C1: Advanced',
    'C2: Proficient',
    'Native'
]

provided_countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'The Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Democratic Republic of the Congo',
    'Republic of the Congo',
    'Costa Rica',
    'Côte d\'Ivoire',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'North Korea',
    'South Korea',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Federated States of Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'South Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
    'Other'
]

valid_states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
]

provided_timezones = [
    'Greenwich Mean Time (GMT)',
    'Central European Time (GMT+1:00)',
    'Eastern European Time (GMT+2:00)',
    'Eastern African Time (GMT+3:00)',
    'Middle East Time (GMT+3:30)',
    'Near East Time (GMT+4:00)',
    'Afghanistan Time (GMT+4:30)',
    'Pakistan Lahore Time (GMT+5:00)',
    'India Standard Time (GMT+5:30)',
    'Nepal Standard Time (GMT+5:45)',
    'Bangladesh Standard Time (GMT+6:00)',
    'Myanmar Standard Time (GMT+6:30)',
    'Vietnam Standard Time (GMT+7:00)',
    'China Taiwan Time (GMT+8:00)',
    'Japan Standard Time (GMT+9:00)',
    'Australia Central Time (GMT+9:30)',
    'Australia Eastern Time (GMT+10:00)',
    'Solomon Standard Time (GMT+11:00)',
    'New Zealand Standard Time (GMT+12:00)',
    'Midway Islands Time (GMT-11:00)',
    'Hawaii Standard Time (GMT-10:00)',
    'Alaska Standard Time (GMT-9:00)',
    'Pacific Standard Time (GMT-8:00)',
    'Phoenix Standard Time (GMT-7:00)',
    'Mountain Standard Time (GMT-7:00)',
    'Central Standard Time (GMT-6:00)',
    'Eastern Standard Time (GMT-5:00)',
    'Indiana Eastern Standard Time (GMT-5:00)',
    'Puerto Rico Time (GMT-4:00)',
    'Argentina Standard Time (GMT-3:00)',
    'Brazil Eastern Time (GMT-3:00)',
    'Central African Time (GMT-1:00)'
]
