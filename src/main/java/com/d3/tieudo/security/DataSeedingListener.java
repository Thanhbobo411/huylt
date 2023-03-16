package com.d3.tieudo.security;

import com.d3.tieudo.entity.Account;
import com.d3.tieudo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent arg0) {
        // Member account
        if (accountRepository.findAll().isEmpty()) {
            Account account = new Account();
            account.setEmail("member@gmail.com");
            account.setLogin("admin");
            account.setPassword(passwordEncoder.encode("123456"));
            accountRepository.save(account);
        }
    }
}

