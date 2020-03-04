# Make sure the python-pip is installed first you can run procedure install
# sudo apt-get install python-pip -y
pip install dnspython

cd Divi/divi/contrib/seeds

python3 makeseeds.py < seeds_main.txt > nodes_main.txt
python3 generate-seeds.py . > ../../src/chainparamsseeds.h

exit
