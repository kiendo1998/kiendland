package com.kiendland.propertyservice;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.kiendland.propertyservice");

        noClasses()
            .that()
                .resideInAnyPackage("com.kiendland.propertyservice.service..")
            .or()
                .resideInAnyPackage("com.kiendland.propertyservice.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.kiendland.propertyservice.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
