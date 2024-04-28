import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ name: "", colorCode: "" });
  const toast = useToast();

  const handleAddMaterial = () => {
    if (!newMaterial.name || !newMaterial.colorCode) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setMaterials([...materials, newMaterial]);
    setNewMaterial({ name: "", colorCode: "" });
    toast({
      title: "Success",
      description: "Material added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setMaterials(updatedMaterials);
    toast({
      title: "Deleted",
      description: "Material removed successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEditMaterial = (index, material) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = material;
    setMaterials(updatedMaterials);
  };

  return (
    <Box p={5}>
      <Flex gap="20px" mb={5}>
        <FormControl>
          <FormLabel htmlFor="material-name">Material Name</FormLabel>
          <Input id="material-name" value={newMaterial.name} onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="color-code">Color Code</FormLabel>
          <Input id="color-code" value={newMaterial.colorCode} onChange={(e) => setNewMaterial({ ...newMaterial, colorCode: e.target.value })} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddMaterial}>
          Add Material
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Material Name</Th>
            <Th>Color Code</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {materials.map((material, index) => (
            <Tr key={index}>
              <Td>{material.name}</Td>
              <Td>{material.colorCode}</Td>
              <Td>
                <IconButton aria-label="Edit material" icon={<FaEdit />} onClick={() => handleEditMaterial(index, material)} />
                <IconButton aria-label="Delete material" icon={<FaTrash />} onClick={() => handleDeleteMaterial(index)} ml={2} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;