node ../ditto batch -i csv-batch/data.csv -t csv-batch/template.txt -o {{Name}}.csv
node ../ditto single -i csv-single/data.csv -t csv-single/template.txt -o hello.csv