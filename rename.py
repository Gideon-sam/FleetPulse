import os

root_dir = r'c:\Users\gideonsamuel\Music\version 2\NeuroFleetX-main'

replacements = {
    'NeuroFleetX': 'FleetPulse',
    'NeurofleetX': 'FleetPulse',
    'Neurofleetx': 'Fleetpulse',
    'neurofleetx': 'fleetpulse',
    'Neuro Fleet': 'FleetPulse',
    'neuro-fleet': 'fleetpulse',
    'NeuroFleet': 'FleetPulse',
    'neurofleet': 'fleetpulse'
}

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for k, v in replacements.items():
            new_content = new_content.replace(k, v)
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated: {filepath}')
    except Exception as e:
        pass

for root, dirs, files in os.walk(root_dir):
    if '.git' in root or 'node_modules' in root or '.antigravityignore' in root:
        continue
    for file in files:
        if file.endswith(('.java', '.jsx', '.js', '.html', '.css', '.md', '.properties', '.xml', '.sql', '.json')):
            filepath = os.path.join(root, file)
            replace_in_file(filepath)

# Now rename files and folders (bottom up to avoid path invalidation)
for root, dirs, files in os.walk(root_dir, topdown=False):
    if '.git' in root or 'node_modules' in root:
        continue
    for name in files + dirs:
        if name == 'rename.py':
            continue
        new_name = name
        for k, v in replacements.items():
            new_name = new_name.replace(k, v)
        if new_name != name:
            old_path = os.path.join(root, name)
            new_path = os.path.join(root, new_name)
            os.rename(old_path, new_path)
            print(f'Renamed: {old_path} -> {new_path}')
