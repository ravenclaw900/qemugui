# Usage

## Creating a VM

To create a Virtual Machine, click the "New" button on the top toolbar.  Enter the name, architecture, memory, etc. in the respective boxes.  Then, select one of "Do not add a virtual hard disk", "Boot off of an installer image and create a virtual hard disk", "Convert a virtual hard disk", or "Use an existing virtual hard disk".

### Do not add a virtual hard disk

Use this option if you have no disk image currently, though note that you will have to manually edit the VM "run" file later.  On certain architectures, this will also let you boot from network.

### Boot off of an installer image and create a virtual hard disk

Use this option if you have an installer disk image.  It will bring up a select box, which you can then use to select said installer image.  Clicking "Create" will take you to the Images page, which can also be accessed from the top toolbar, to create a blank disk image.  Click Create on that page, and fill in the boxes.  Make sure to select your newly created VM in the "For VM" box.

### Convert a virtual hard disk

Use this option if you have some other type of disk image, like say one for VirtualBox or VMWare.  Clicking "Create" will take you to the Images page.  Click "Add" to add your disk image to the list.  You can then convert it by using the "Type" box.  Make sure to select your newly created VM in the "For VM" box.

### Use an existing virtual hard disk

Use this option if you have a QCOW2 or raw disk image (though QCOW2 is recommended, you could convert the raw disk image using the option above).  It will bring up a select box, which you can then use to select said disk image.

## Starting a VM

Just double-click on the VM in the list to start it.  If that doesn't work, it usually means that there is a problem with the VM's "run" file, or if it doesn't have a disk image, that it doesn't support booting with no hard drive.  The "run" file can be found at `~/Documents/QEMU/<VM NAME>/run`.  It should be in the format `qemu-system-<PLATFORM> -machine <MACHINE> -m <MEMORY>`.  It could also have `-cdrom <INSTALLER IMAGE>`, `-boot <C or D>`, and `-hda <VIRTUAL HARD DRIVE>`
