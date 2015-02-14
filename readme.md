Ditto
=====

Ditto is a command line tool for generating text files from an CSV and a Handlebars.js template.

Examples
--------

**Batch: Creating Multiple Files From an CSV**

```
ditto batch -i data.csv -t template.txt -o "{{Name}}.csv"
```

data.csv
```
Name,PhoneNumber,Email
John,0412345678,john@mail.com
Bob,9876 5432,bob@mail.com
```

template.txt
```
String name = "{{Name}}";
String phoneNumber = "{{PhoneNumber}}";
String email = "{{Email}}";
```

*The resulting output is:*

John.txt
```
String name = "John";
String phoneNumber = "0412345678";
String email = "john@mail.com";
```

Bob.txt
```
String name = "Bob";
String phoneNumber = "9876 5432";
String email = "bob@mail.com";
```

**Single: Creating a File From an CSV**

```
ditto single -i data.csv -t template.txt -o "output.txt"
```

data.csv
```
Name,Colour
Alexis,Red
Thierry,White
Theo,Blue
```

template.txt
```
{{#each records}}
Name: {{Name}}
Colour: {{Colour}}
{{/each}}
```

*The resulting output is:*
output.txt
```
Name: Alexis
Colour: Red
Name: Thierry
Colour: White
Name: Theo
Colour: Blue
```
