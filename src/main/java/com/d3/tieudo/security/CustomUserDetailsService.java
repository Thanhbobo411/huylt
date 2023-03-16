package com.d3.tieudo.security;

import com.d3.tieudo.entity.Account;
import com.d3.tieudo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * The type Custom user details service.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    /**
     * The Account repository.
     */
    @Autowired
    AccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String login){
        // Let people login with login
        Account account = accountRepository.findByLogin(login)
                .orElseThrow(() ->
                        new UsernameNotFoundException("validation.account.invalid")
        );
        return UserPrincipal.create(account);
    }
}